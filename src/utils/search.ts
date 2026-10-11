import { Product } from '../types';

/**
 * Normalizes text: lowercase, remove diacritics / accents, and trim.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Checks if a product matches the query with fuzzy synonyms and Spanish normalization.
 */
export function matchesSearchQuery(product: Product, rawQuery: string): boolean {
  if (!rawQuery || !rawQuery.trim()) return true;

  const query = normalizeText(rawQuery);

  // If user searched for generic food terms, everything in our bakery is food!
  if (
    query === 'comida' ||
    query === 'comidas' ||
    query.startsWith('comida ') ||
    query.startsWith('comidas ') ||
    query === 'alimento' ||
    query === 'alimentos' ||
    query === 'menu' ||
    query === 'rico' ||
    query === 'ricas' ||
    query === 'todo' ||
    query === 'todas las comidas'
  ) {
    // If it's pure "comida" or "comidas", return all
    if (query === 'comida' || query === 'comidas' || query === 'todo' || query === 'todas las comidas') {
      return true;
    }
  }

  // Handle common Argentine phonetic/spelling and colloquial variations
  let normalizedQuery = query;
  if (normalizedQuery.includes('matanbre')) {
    normalizedQuery = normalizedQuery.replace(/matanbre/g, 'matambre');
  }
  if (normalizedQuery.includes('sanguche') || normalizedQuery.includes('sanguchito') || normalizedQuery.includes('sandw')) {
    normalizedQuery = normalizedQuery.replace(/sanguch(e|ito|itos)?/g, 'sandwich');
  }
  normalizedQuery = normalizedQuery.replace(/\bmila(s|nga|ngas)?\b/g, 'milanesa');
  normalizedQuery = normalizedQuery.replace(/\bempanad(ita|itas)\b/g, 'empanada');
  normalizedQuery = normalizedQuery.replace(/\bfactur(ita|itas)\b/g, 'factura');
  normalizedQuery = normalizedQuery.replace(/\bmedialun(ita|itas)\b/g, 'medialuna');
  normalizedQuery = normalizedQuery.replace(/\bchurr(ito|itos)\b/g, 'churros');
  normalizedQuery = normalizedQuery.replace(/\bbizcoch(ito|itos)\b/g, 'bizcocho');
  if (normalizedQuery.includes('fugaza') || normalizedQuery.includes('fuga')) {
    normalizedQuery = normalizedQuery.replace(/fugaz[a-z]*/g, 'fugazzeta');
  }

  // Searchable corpus for the product
  const searchableParts = [
    product.name,
    product.description,
    product.category,
    product.unit,
    ...(product.tags || []),
    ...(product.options?.map((o) => o.name + ' ' + o.choices.map((c) => c.label).join(' ')) || []),
    // If bread supports 1-100 units, add quantity tags to corpus
    ...(product.maxQuantity ? ['1 a 100', '100 unidades', '100', 'unidades'] : []),
  ];

  const normalizedCorpus = normalizeText(searchableParts.join(' '));

  // If query is an exact substring of the normalized corpus
  if (normalizedCorpus.includes(normalizedQuery)) {
    return true;
  }

  // Split query into tokens (e.g. "pan con chicharron" -> ["pan", "con", "chicharron"])
  const tokens = normalizedQuery
    .split(/\s+/)
    .filter((t) => t.length > 1 && !['de', 'la', 'el', 'en', 'y', 'con', 'del', 'los', 'las', 'un', 'una'].includes(t));

  if (tokens.length === 0) {
    return normalizedCorpus.includes(normalizedQuery);
  }

  const GENERIC_FOOD_TERMS = ['comida', 'comidas', 'alimento', 'alimentos', 'rico', 'rica', 'ricos', 'ricas', 'menu', 'plato', 'platos'];

  // Check if all meaningful tokens match somewhere in the product (or singular/plural)
  const allTokensMatch = tokens.every((token) => {
    // If token is generic, match automatically
    if (GENERIC_FOOD_TERMS.includes(token)) return true;

    // Direct match
    if (normalizedCorpus.includes(token)) return true;

    // Singular / Plural variation
    if (token.endsWith('es') && normalizedCorpus.includes(token.slice(0, -2))) return true;
    if (token.endsWith('s') && normalizedCorpus.includes(token.slice(0, -1))) return true;
    if (normalizedCorpus.includes(token + 's')) return true;
    if (normalizedCorpus.includes(token + 'es')) return true;

    return false;
  });

  return allTokensMatch;
}
