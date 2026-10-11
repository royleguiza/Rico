import { Product } from '../types';

import heroImg from '../assets/images/panaderia_vivi_hero_1791509535278.jpg';
import sopaPernilImg from '../assets/images/sopa_paraguaya_pernil_1791509551093.jpg';
import churrosBolitasImg from '../assets/images/churros_bolitas_fraile_1791509574733.jpg';
import polloPizzaMatambreImg from '../assets/images/pollo_pizza_matambre_1791509589489.jpg';
import donasTartasGalletitasImg from '../assets/images/donas_tartas_galletitas_1791509612167.jpg';
import sandwichesFacturasImg from '../assets/images/sandwiches_facturas_1791509643315.jpg';
import viviDuenaImg from '../assets/images/vivi_duena_panaderia_1791511311032.jpg';
import laMesaDeViviImg from '../assets/images/la_mesa_de_vivi_1791511255792.jpg';
import donaViviAtendiendoImg from '../assets/images/dona_vivi_atendiendo_1791511228293.jpg';
import salonParedesPisosImg from '../assets/images/panaderia_paredes_pisos_1791512366599.jpg';
import mesasSalonImg from '../assets/images/mesas_salon_vivi_1791512395340.jpg';
import hornoObradorImg from '../assets/images/horno_paredes_obrador_1791512426432.jpg';

export const HERO_IMAGE = heroImg;
export const VIVI_PHOTO = viviDuenaImg;
export const VIVI_TABLE_PHOTO = laMesaDeViviImg;
export const VIVI_SELLER_PHOTO = donaViviAtendiendoImg;
export const VIVI_SALON_WALLS_FLOORS = salonParedesPisosImg;
export const VIVI_TABLES_PHOTO = mesasSalonImg;
export const VIVI_OVEN_WORKSHOP = hornoObradorImg;

export const CATEGORIES = [
  { id: 'todos', label: 'Todo el Menú', icon: 'Sparkles' },
  { id: 'panes', label: 'Panes Caseros', icon: 'Wheat' },
  { id: 'facturas', label: 'Facturas', icon: 'Croissant' },
  { id: 'churros-bolitas', label: 'Churros & Bolitas', icon: 'Flame' },
  { id: 'rotiseria', label: 'Rotisería & Asados', icon: 'Drumstick' },
  { id: 'pizzas-empanadas', label: 'Pizzas & Empanadas', icon: 'Pizza' },
  { id: 'sandwiches', label: 'Sándwiches de Miga', icon: 'Sandwich' },
  { id: 'tartas', label: 'Tartas & Cheesecake', icon: 'PieChart' },
  { id: 'dulces', label: 'Donas & Galletitas', icon: 'Cookie' },
] as const;

export const PRODUCTS: Product[] = [
  // 1. FACTURAS
  {
    id: 'facturas-surtidas',
    name: 'Facturas Artesanales de Manteca y Grasa',
    category: 'facturas',
    price: 6800,
    unit: 'docena (12 un.)',
    description: 'Medialunas de manteca almibaradas, medialunas de grasa crocantes, vigilantes, cañoncitos con dulce de leche y tortitas negras recién horneadas.',
    badge: '🔥 Recién Horneadas',
    popular: true,
    image: sandwichesFacturasImg,
    tags: ['desayuno', 'merienda', 'medialunas', 'manteca', 'factura', 'facturas', 'dulce', 'comida', 'panaderia'],
    stockStatus: 'recien_salido',
    options: [
      {
        name: 'Selección de Variedad',
        choices: [
          { label: 'Surtidas clásicas de la casa (recomendado)' },
          { label: '100% Medialunas de Manteca almibaradas' },
          { label: '100% Medialunas de Grasa crocantes' },
          { label: 'Solo Cañoncitos & Vigilantes con Pastelera y DDL' },
        ]
      },
      {
        name: 'Cantidad',
        choices: [
          { label: '1 Docena (12 unidades)', extraPrice: 0 },
          { label: 'Media Docena (6 unidades)', extraPrice: -3200 },
          { label: '2 Docenas (24 unidades) [Promo]', extraPrice: 6200 },
        ]
      }
    ]
  },

  // 2. BOLITAS DE FRAILE
  {
    id: 'bolitas-de-fraile',
    name: 'Bolitas de Fraile (Berlinesas Caseras)',
    category: 'churros-bolitas',
    price: 7200,
    unit: 'docena (12 un.)',
    description: 'Bolas de fraile bien esponjosas, fritas en aceite limpio, rebozadas en azúcar fina y rebosantes de dulce de leche colonial o crema pastelera artesanal.',
    badge: '⭐ Especialidad de Vivi',
    popular: true,
    image: churrosBolitasImg,
    tags: ['bolitas', 'bolita', 'fraile', 'berlinesas', 'dulce de leche', 'pastelera', 'fritas', 'dulce', 'comida', 'merienda'],
    stockStatus: 'recien_salido',
    options: [
      {
        name: 'Relleno',
        choices: [
          { label: 'Rellenas de Dulce de Leche Repostero' },
          { label: 'Rellenas de Crema Pastelera casera con vainilla' },
          { label: 'Mixtas (Mitad DDL y Mitad Pastelera)' },
          { label: 'Sin relleno (Simples azucaradas tradicionales)' },
        ]
      },
      {
        name: 'Presentación',
        choices: [
          { label: '1 Docena (12 un.)', extraPrice: 0 },
          { label: 'Media Docena (6 un.)', extraPrice: -3400 },
        ]
      }
    ]
  },

  // 3. CHURROS
  {
    id: 'churros-artesanales',
    name: 'Churros Crocantes Tradicionales',
    category: 'churros-bolitas',
    price: 6900,
    unit: 'docena (12 un.)',
    description: 'Churros dorados y súper crocantes por fuera, tiernos por dentro. Rellenos con generoso dulce de leche repostero o bañados en chocolate semiamargo.',
    badge: '⭐ Bien Calientes',
    popular: true,
    image: churrosBolitasImg,
    tags: ['churros', 'churro', 'chocolate', 'mate', 'merienda', 'dulce de leche', 'comida', 'fritos'],
    stockStatus: 'recien_salido',
    options: [
      {
        name: 'Tipo de Churro',
        choices: [
          { label: 'Rellenos con Dulce de Leche' },
          { label: 'Bañados en Chocolate Semiamargo con DDL', extraPrice: 1200 },
          { label: 'Simples tradicionales azucarados' },
          { label: 'Surtido (4 DDL, 4 Bañados, 4 Simples)', extraPrice: 800 },
        ]
      },
      {
        name: 'Presentación',
        choices: [
          { label: '1 Docena (12 un.)', extraPrice: 0 },
          { label: 'Media Docena (6 un.)', extraPrice: -3300 },
        ]
      }
    ]
  },

  // 4. PANES INDIVIDUALES Y POR KILO (1 HASTA 100 UNIDADES)
  {
    id: 'pan-flauta-individual',
    name: 'Pan Flauta Criollo / Francés Crocante',
    category: 'panes',
    price: 600,
    unit: 'unidad (1 a 100 un.)',
    description: 'Pan flauta crocante horneado a la leña, con miga esponjosa y corteza dorada. Ideal para comidas familiares, asados, sándwiches o eventos. Pedí desde 1 hasta 100 unidades al máximo.',
    badge: '🥖 1 a 100 Unidades',
    popular: true,
    image: heroImg,
    tags: ['pan', 'panes', 'flauta', 'frances', 'flautas', 'criollo', 'comida', 'panaderia', 'asado', '1 a 100'],
    stockStatus: 'recien_salido',
    minQuantity: 1,
    maxQuantity: 100,
    options: [
      {
        name: 'Punto de Cocción',
        choices: [
          { label: 'Bien dorado y crocante (estándar)' },
          { label: 'Blanquito y tierno' },
        ]
      }
    ]
  },
  {
    id: 'pan-figacitas-artesanal',
    name: 'Figacitas de Manteca para Pernil & Picadas',
    category: 'panes',
    price: 450,
    unit: 'unidad (1 a 100 un.)',
    description: 'Figacitas suaves y tiernas amasadas con manteca pura. Ideales para armar sándwiches de pernil, matambre o picadas. Seleccioná de 1 a 100 unidades al máximo.',
    badge: '✨ Ideales Pernil (1 a 100)',
    popular: true,
    image: sandwichesFacturasImg,
    tags: ['pan', 'panes', 'figacitas', 'manteca', 'sandwiches', 'pernil', 'comida', '1 a 100'],
    stockStatus: 'recien_salido',
    minQuantity: 1,
    maxQuantity: 100,
    options: [
      {
        name: 'Variedad',
        choices: [
          { label: 'Figacitas de manteca clásicas' },
          { label: 'Figacitas con semillas de sésamo y lino' },
        ]
      }
    ]
  },
  {
    id: 'pan-baguette-individual',
    name: 'Baguette Francesa Rústica Artesanal',
    category: 'panes',
    price: 1300,
    unit: 'unidad (1 a 100 un.)',
    description: 'Baguette de masa madre de larga fermentación con corteza crocante y alvéolos grandes. Horneada en piso de ladrillo refractario. Podés pedir desde 1 hasta 100 unidades.',
    badge: '🌾 Corteza Crocante (1 a 100)',
    popular: true,
    image: heroImg,
    tags: ['pan', 'panes', 'baguette', 'baguettes', 'frances', 'masa madre', 'comida', '1 a 100'],
    stockStatus: 'recien_salido',
    minQuantity: 1,
    maxQuantity: 100,
  },
  {
    id: 'pan-artesanal-surtido',
    name: 'Pan Casero de Campo & Flautas (x Kilo)',
    category: 'panes',
    price: 2400,
    unit: 'x kilo / unidad (1 a 100 un.)',
    description: 'Pan criollo de miga aireada y corteza crocante. Amasado todos los días con masa madre y horneado en piso a leña. Podés encargar desde 1 hasta 100 unidades.',
    badge: '🌾 Masa Madre (1 a 100)',
    popular: true,
    image: heroImg,
    tags: ['pan', 'panes', 'baguette', 'baguettes', 'flauta', 'flautas', 'criollo', 'comida', 'panaderia', '1 a 100'],
    stockStatus: 'recien_salido',
    minQuantity: 1,
    maxQuantity: 100,
    options: [
      {
        name: 'Variedad de Pan',
        choices: [
          { label: 'Pan Flauta tradicional (4 tiras)' },
          { label: 'Pan de Campo redondo con corteza rústica' },
          { label: 'Baguettes francesas crocantes (3 un.)' },
          { label: 'Pan Criollo miñón de manteca' },
        ]
      },
      {
        name: 'Corte',
        choices: [
          { label: 'Entero sin cortar' },
          { label: 'Rebanado para tostadas / sándwich' },
        ]
      }
    ]
  },

  // 5. PAN CON CHICHARRÓN
  {
    id: 'pan-con-chicharron',
    name: 'Pan con Chicharrón Criollo Calentito',
    category: 'panes',
    price: 3200,
    unit: 'hogaza grande (1 a 100 un.)',
    description: 'La joya de la tarde: pan casero rústico recién horneado, cargado con chicharrones de cerdo crujientes y sabrosos dorados a fuego lento. Pedí desde 1 hasta 100 unidades.',
    badge: '🔥 Receta de la Casa (1 a 100)',
    popular: true,
    image: sopaPernilImg,
    tags: ['chicharron', 'chicharrones', 'pan', 'panes', 'pan casero', 'tradicional', 'cerdo', 'salado', 'comida', '1 a 100'],
    stockStatus: 'recien_salido',
    minQuantity: 1,
    maxQuantity: 100,
    options: [
      {
        name: 'Tamaño de Hogaza',
        choices: [
          { label: '1 Hogaza grande individual (600g)', extraPrice: 0 },
          { label: '2 Hogazas grandes [Promo ahorro]', extraPrice: 2800 },
        ]
      }
    ]
  },
  {
    id: 'pan-salvado-semillas',
    name: 'Pan Casero Integral de Salvado & Semillas',
    category: 'panes',
    price: 750,
    unit: 'unidad (1 a 100 un.)',
    description: 'Pan integral esponjoso elaborado con harina de trigo entera, salvado puro, semillas de lino, chía, girasol y sésamo tostado. Ideal para desayunos saludables y tostadas. Pedí de 1 a 100 unidades.',
    badge: '🌾 100% Integral (1 a 100)',
    popular: false,
    image: heroImg,
    tags: ['pan', 'panes', 'integral', 'salvado', 'semillas', 'saludable', 'comida', 'panaderia', '1 a 100'],
    stockStatus: 'disponible',
    minQuantity: 1,
    maxQuantity: 100,
    options: [
      {
        name: 'Presentación',
        choices: [
          { label: 'Panes individuales tipo miñón (1 a 100 un.)' },
          { label: 'Formato pan de molde rebanado' },
        ]
      }
    ]
  },
  {
    id: 'chipa-almidon-mandioca',
    name: 'Chipá Calentito de Puro Queso Marplatense',
    category: 'panes',
    price: 550,
    unit: 'unidad / docena (1 a 100 un.)',
    description: 'Bocaditos de almidón de mandioca con doble porción de queso marplatense y sardo estacionado. Crocantes por fuera, esponjosos y elásticos por dentro. ¡Insuperables con el mate! Pedí de 1 a 100 unidades.',
    badge: '🧀 Puro Queso (1 a 100)',
    popular: true,
    image: sopaPernilImg,
    tags: ['chipa', 'chipas', 'pan', 'panes', 'queso', 'mandioca', 'mate', 'merienda', 'comida', '1 a 100'],
    stockStatus: 'recien_salido',
    minQuantity: 1,
    maxQuantity: 100,
    options: [
      {
        name: 'Punto del Chipá',
        choices: [
          { label: 'Recién salidos del horno, bien calientes' },
          { label: 'Pre-congelados listos para hornear en casa en 15 minutos' },
        ]
      }
    ]
  },
  {
    id: 'cremona-libritos-grasa',
    name: 'Cremonas Hojaldradas & Libritos de Grasa',
    category: 'panes',
    price: 1800,
    unit: 'unidad grande (1 a 100 un.)',
    description: 'Hojaldre criollo crocante que se desarma en mil capas doradas. Elaboradas con grasa fina de pella seleccionada. La compañía infaltable de los mates de la tarde. Pedí de 1 a 100 unidades.',
    badge: '🥐 Hojaldre Criollo (1 a 100)',
    popular: true,
    image: heroImg,
    tags: ['cremona', 'cremonas', 'libritos', 'pan', 'panes', 'hojaldre', 'grasa', 'mate', 'comida', 'panaderia', '1 a 100'],
    stockStatus: 'recien_salido',
    minQuantity: 1,
    maxQuantity: 100,
    options: [
      {
        name: 'Variedad',
        choices: [
          { label: 'Cremona grande tradicional con picos dorados' },
          { label: 'Libritos de grasa hojaldrados (bolsa x 6 un.)' },
        ]
      }
    ]
  },

  // 6. SOPA PARAGUAYA
  {
    id: 'sopa-paraguaya-tradicional',
    name: 'Sopa Paraguaya Tradicional al Horno',
    category: 'rotiseria',
    price: 4900,
    unit: 'porción generosa (450g)',
    description: 'Receta auténtica de la abuela Vivi: harina de maíz tierna, cebollas caramelizadas, abundante queso criollo y queso Paraguay gratinado hasta quedar bien dorada.',
    badge: '⭐ Orgullo de Vivi',
    popular: true,
    image: sopaPernilImg,
    tags: ['sopa paraguaya', 'sopa', 'paraguaya', 'maiz', 'queso', 'tradicion', 'almuerzo', 'comida', 'rotiseria', 'salado'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Tamaño de la Fuente',
        choices: [
          { label: 'Porción individual generosa (450g)', extraPrice: 0 },
          { label: 'Bandeja mediana familiar (rinde 3 personas)', extraPrice: 4600 },
          { label: 'Fuente entera grande (rinde 6 personas)', extraPrice: 9400 },
        ]
      },
      {
        name: 'Temperatura de entrega',
        choices: [
          { label: 'Caliente lista para disfrutar' },
          { label: 'Para calentar en horno antes del almuerzo/cena' },
        ]
      }
    ]
  },

  // 7. PERNILES
  {
    id: 'pernil-de-cerdo-asado',
    name: 'Pernil de Cerdo Asado Braseado con Salsas',
    category: 'rotiseria',
    price: 18500,
    unit: 'combo para 4-5 personas',
    description: 'Pata de pernil de cerdo adobada durante 24 horas y cocinada a baja temperatura durante 6 horas. Incluye 20 panes figacitas caseros, salsa criolla y chimichurri artesanal.',
    badge: '👑 Festín Especial',
    popular: true,
    image: sopaPernilImg,
    tags: ['pernil', 'perniles', 'cerdo', 'asado', 'evento', 'salsas', 'carne', 'almuerzo', 'cena', 'comida', 'rotiseria'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Presentación',
        choices: [
          { label: 'Combo Pernil Desmechado con 20 figacitas + 2 salsas', extraPrice: 0 },
          { label: 'Pernil Entero con hueso braseado (rinde 15 pers) + 60 figacitas + 4 salsas', extraPrice: 24500 },
          { label: 'Porción individual en caja con 4 pancitos y salsas', extraPrice: -11000 },
        ]
      },
      {
        name: 'Salsas incluidas',
        choices: [
          { label: 'Salsa Criolla + Chimichurri casero' },
          { label: 'Mayonesa de ajo asado + Mostaza y miel' },
          { label: 'Combinación mixta (las 4 salsas)', extraPrice: 1200 },
        ]
      }
    ]
  },

  // 8. POLLO A LA PARRILLA
  {
    id: 'pollo-a-la-parrilla',
    name: 'Pollo a la Parrilla al Limón con Papas Rústicas',
    category: 'rotiseria',
    price: 14500,
    unit: 'pollo entero con guarnición',
    description: 'Pollo de campo dorado a las brasas con piel crocante, marinado con limón fresco, ajo, romero y finas hierbas. Acompañado de papas doradas al horno con orégano.',
    badge: '🍗 Rotisería Estrella',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['pollo', 'pollos', 'parrilla', 'papas', 'almuerzo', 'cena', 'carne', 'comida', 'rotiseria'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Porción',
        choices: [
          { label: 'Pollo Entero con guarnición de papas rústicas', extraPrice: 0 },
          { label: 'Medio Pollo con papas rústicas', extraPrice: -6500 },
        ]
      },
      {
        name: 'Guarnición adicional',
        choices: [
          { label: 'Solo papas rústicas (incluidas)' },
          { label: 'Sumar ensalada rusa de la casa', extraPrice: 2800 },
          { label: 'Sumar porción de Sopa Paraguaya', extraPrice: 3800 },
        ]
      }
    ]
  },

  // 9. MATAMBRE
  {
    id: 'matambre-arrollado-casero',
    name: 'Matambre Arrollado Casero al Horno',
    category: 'rotiseria',
    price: 9800,
    unit: 'porción gourmet (400g)',
    description: 'Tierno matambre vacuno arrollado con zanahorias en juliana, morrones asados, espinaca fresca, huevo duro y mezcla secreta de condimentos criollos.',
    badge: '🥩 Casero Gourmet',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['matambre', 'matanbre', 'carne', 'arrollado', 'rotiseria', 'comida', 'almuerzo', 'cena'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Preparación',
        choices: [
          { label: 'Matambre arrollado frío en rodajas (ideal para sándwich o picada)' },
          { label: 'Matambre a la pizza caliente gratinado con muzzarella y tomate', extraPrice: 1800 },
          { label: 'Pieza de 1 kg entera envasada', extraPrice: 11000 },
        ]
      }
    ]
  },
  {
    id: 'milanesa-napolitana-completa',
    name: 'Milanesa Napolitana de Ternera con Papas Fritas',
    category: 'rotiseria',
    price: 11900,
    unit: 'plato abundante para 2 personas',
    description: 'Milanesa gigante de bife de chorizo o nalga empanada con pan casero rallado de la casa, coronada con jamón cocido natural, salsa filetto casera, abundante mozzarella gratinada y orégano. Servida con papas fritas crocantes.',
    badge: '🍟 Para Compartir',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['milanesa', 'milanesas', 'napolitana', 'papas', 'fritas', 'carne', 'almuerzo', 'cena', 'comida', 'rotiseria'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Guarnición',
        choices: [
          { label: 'Papas fritas bastón crocantes de la casa' },
          { label: 'Puré de papas cremoso con nuez moscada' },
          { label: 'Ensalada mixta (lechuga, tomate, cebolla)' },
        ]
      },
      {
        name: 'Huevos Fritos',
        choices: [
          { label: 'Sin huevos adicionales' },
          { label: 'A caballo (2 huevos fritos a punto)', extraPrice: 1200 },
        ]
      }
    ]
  },
  {
    id: 'pastel-de-papas-criollo',
    name: 'Pastel de Papas Tradicional al Horno a Leña',
    category: 'rotiseria',
    price: 7800,
    unit: 'porción generosa (500g)',
    description: 'Clásico pastel de papas criollo: base de carne picada a cuchillo salteada con cebollas, morrones, aceitunas y huevo duro picado, cubierta con suave puré de papas gratinado con queso parmesano.',
    badge: '🥔 Receta de Doña Vivi',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['pastel de papas', 'pastel', 'papas', 'carne', 'almuerzo', 'cena', 'comida', 'rotiseria', 'casero'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Tamaño',
        choices: [
          { label: 'Porción individual grande (500g)', extraPrice: 0 },
          { label: 'Bandeja familiar para 4 personas', extraPrice: 13500 },
        ]
      }
    ]
  },
  {
    id: 'canelones-caseros-scarparo',
    name: 'Canelones Caseros de Espinaca, Ricota y Carne',
    category: 'rotiseria',
    price: 8400,
    unit: 'porción de 3 canelones grandes',
    description: 'Masa fina de panqueque casero rellena de espinaca fresca salteada, ricota cremosa y ternera picada. Cubiertos con salsa scarparo (tuco casero y crema) y gratinados con queso sardo.',
    badge: '🍝 Pasta Casera de Domingo',
    popular: false,
    image: polloPizzaMatambreImg,
    tags: ['canelones', 'pasta', 'pastas', 'salsa', 'ricota', 'espinaca', 'almuerzo', 'comida', 'rotiseria'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Salsa',
        choices: [
          { label: 'Salsa Scarparo (mixta de tuco y crema)' },
          { label: 'Boloñesa casera con ternera' },
          { label: 'Salsa Blanca Bechamel y queso gratinado' },
        ]
      }
    ]
  },
  {
    id: 'tortilla-de-papas-espanola',
    name: 'Tortilla de Papas Española al Estilo Vivi',
    category: 'rotiseria',
    price: 7200,
    unit: 'tortilla entera (rinde 4 porciones)',
    description: 'Papas pochadas lentamente en aceite de oliva, cebolla caramelizada dulce y huevos de campo. Dorada por fuera y jugosa por dentro.',
    badge: '🍳 Bien Babé o Cocida',
    popular: true,
    image: sopaPernilImg,
    tags: ['tortilla', 'tortilla de papas', 'papas', 'huevo', 'espanola', 'almuerzo', 'cena', 'comida', 'rotiseria'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Punto del Huevo',
        choices: [
          { label: 'Jugosa / Babé (centro cremoso)' },
          { label: 'Punto medio cocido' },
          { label: 'Bien cocida y firme' },
        ]
      },
      {
        name: 'Ingrediente adicional',
        choices: [
          { label: 'Clásica con cebolla' },
          { label: 'Con chorizo colorado y morrones', extraPrice: 1400 },
          { label: 'Con jamón cocido y queso mozzarella', extraPrice: 1200 },
        ]
      }
    ]
  },

  // 10. PIZZA
  {
    id: 'pizza-artesanal',
    name: 'Pizza Artesanal al Molde de Vivi',
    category: 'pizzas-empanadas',
    price: 8900,
    unit: 'grande (8 porciones)',
    description: 'Masa madre leudada lentamente durante 48 horas, salsa de tomate perita natural, 400g de queso muzzarella fundido, orégano de la huerta y aceitunas negras.',
    badge: '🍕 Masa Fermentada',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['pizza', 'pizzas', 'muzzarella', 'fugazzeta', 'cena', 'comida', 'salado'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Variedad de Pizza',
        choices: [
          { label: 'Muzzarella Clásica con aceitunas y orégano' },
          { label: 'Fugazzeta Rellena con cebollas caramelizadas y doble queso', extraPrice: 2200 },
          { label: 'Especial con Jamón Cocido y Morrones Asados', extraPrice: 1800 },
          { label: 'Calabresa con cantimpalo y provolone', extraPrice: 2100 },
        ]
      },
      {
        name: 'Cocción',
        choices: [
          { label: 'Caliente y lista para comer' },
          { label: 'Pre-pizza lista para hornear en casa (5 min)' },
        ]
      }
    ]
  },

  // 11. EMPANADAS
  {
    id: 'empanadas-artesanales',
    name: 'Empanadas Caseras al Horno de Barro',
    category: 'pizzas-empanadas',
    price: 11500,
    unit: 'docena (12 un.)',
    description: 'Empanadas de hojaldre criollo bien doraditas. Jugosas y con abundante relleno cocinado a fuego lento.',
    badge: '🥟 Relleno Jugoso',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['empanadas', 'empanada', 'carne', 'jamon y queso', 'pollo', 'almuerzo', 'cena', 'comida', 'rotiseria'],
    stockStatus: 'recien_salido',
    options: [
      {
        name: 'Gusto Predominante o Surtido',
        choices: [
          { label: 'Surtidas de la casa (Carne, JyQ, Pollo, Humita)' },
          { label: 'Carne Suave cortada a cuchillo' },
          { label: 'Carne Criolla Picante cortada a cuchillo' },
          { label: 'Jamón Natural y Queso derretido' },
          { label: 'Pollo al verdeo y morrones' },
          { label: 'Humita dulce norteña con queso criollo' },
        ]
      },
      {
        name: 'Presentación',
        choices: [
          { label: '1 Docena (12 un.)', extraPrice: 0 },
          { label: 'Media Docena (6 un.)', extraPrice: -5500 },
          { label: '2 Docenas (24 un.) [Promo Fiesta]', extraPrice: 10500 },
        ]
      }
    ]
  },

  // 12. SÁNDWICHES DE MIGA & PERNIL
  {
    id: 'sandwiches-de-miga-triples',
    name: 'Sándwiches de Miga Triples Surtidos',
    category: 'sandwiches',
    price: 12800,
    unit: 'docena (12 triples)',
    description: 'Pan de miga ultra fresco y húmedo elaborado en nuestro obrador. Rellenos con jamón cocido natural, queso tybo premium, huevo, tomate y aceituna.',
    badge: '🥪 Clásico Inolvidable',
    popular: true,
    image: sandwichesFacturasImg,
    tags: ['sandwiches', 'sandwich', 'sandwiche', 'sanguche', 'miga', 'triples', 'reunion', 'comida', 'almuerzo'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Variedad de Sándwiches',
        choices: [
          { label: 'Surtido Clásico (Jamón y Queso, Jamón y Tomate, Jamón y Huevo)' },
          { label: 'Especiales (Jamón y Morrones, Jamón y Choclo, Queso y Aceituna)' },
          { label: '100% Jamón Cocido y Queso Tybo' },
          { label: 'Sándwich de Pernil de Cerdo en Pan Figaza (4 unidades)', extraPrice: 1500 },
          { label: 'Sándwich de Matambre casero con lechuga y tomate (4 unidades)', extraPrice: 1800 },
        ]
      },
      {
        name: 'Presentación',
        choices: [
          { label: '1 Docena (12 triples)', extraPrice: 0 },
          { label: 'Media Docena (6 triples)', extraPrice: -6000 },
          { label: 'Bandeja Fiesta (24 triples)', extraPrice: 11800 },
        ]
      }
    ]
  },

  // 13. TARTA DE QUESO (CHEESECAKE ARTESANAL)
  {
    id: 'tarta-de-queso',
    name: 'Tarta de Queso Artesanal (Cheesecake al Horno)',
    category: 'tartas',
    price: 8500,
    unit: 'tarta entera (1.2 kg)',
    description: 'Tarta de queso crema suave y aireada horneada a la perfección sobre crocante base de galletitas de manteca. Coronada con compota de frutos rojos o hilo de dulce de leche.',
    badge: '🍰 Cremosa y Suave',
    popular: true,
    image: donasTartasGalletitasImg,
    tags: ['tarta de queso', 'tarta', 'queso', 'cheesecake', 'postre', 'dulce', 'comida'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Cobertura',
        choices: [
          { label: 'Coulis casero de Frutos Rojos y arándanos' },
          { label: 'Dulce de Leche Colonial tibio' },
          { label: 'Estilo Vasca quemada natural sin cobertura' },
        ]
      },
      {
        name: 'Porción',
        choices: [
          { label: 'Tarta Entera (1.2 kg - rinde 8 a 10 porciones)', extraPrice: 0 },
          { label: 'Porción individual generosa con frutos frescos', extraPrice: -5500 },
        ]
      }
    ]
  },

  // 14. TARTAS DULCES & SALADAS
  {
    id: 'tartas-artesanales-vivi',
    name: 'Tartas Caseras (Pascualina & Tarta de Frutillas)',
    category: 'tartas',
    price: 7600,
    unit: 'tarta entera grande',
    description: 'Elaboradas con masa brisé crujiente y mantecosa. Opciones saladas nutritivas de acelga y huevo duro o dulces cargadas de crema y frutillas frescas.',
    badge: '🥧 Masa Casera',
    popular: false,
    image: donasTartasGalletitasImg,
    tags: ['tarta', 'tartas', 'pascualina', 'frutilla', 'dulce', 'salada', 'almuerzo', 'cena', 'comida'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Variedad de Tarta',
        choices: [
          { label: 'Tarta Pascualina clásica (espinaca, ricota y huevo duro)' },
          { label: 'Tarta de Jamón, Queso cremoso y Choclo dulce' },
          { label: 'Tarta Dulce de Frutillas con Crema pastelera y gelatina', extraPrice: 1200 },
          { label: 'Tarta Crumble de Manzanas canela y nueces', extraPrice: 900 },
        ]
      }
    ]
  },

  // 15. DONAS
  {
    id: 'donas-glaseadas-gourmet',
    name: 'Donas Glaseadas & Rellenas Gourmet',
    category: 'dulces',
    price: 5900,
    unit: 'media docena (6 un.)',
    description: 'Donas tiernísimas de masa brioche esponjosa, fritas a la perfección con glaseados coloridos de frambuesa, chocolate belga, dulce de leche y chispas crocantes.',
    badge: '🍩 Coloridas & Tiernas',
    popular: true,
    image: donasTartasGalletitasImg,
    tags: ['dona', 'donas', 'donuts', 'glaseada', 'merienda', 'dulce', 'comida', 'panaderia'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Variedad de Donas',
        choices: [
          { label: 'Caja Surtida (2 Chocolate, 2 Frutilla glaseada, 2 Dulce de Leche)' },
          { label: '100% Bañadas en Chocolate con chispas' },
          { label: '100% Glaseadas Clásicas con azúcar cristal' },
          { label: 'Rellenas con explosión de Nutella / DDL', extraPrice: 1000 },
        ]
      },
      {
        name: 'Cantidad',
        choices: [
          { label: 'Caja x 6 unidades', extraPrice: 0 },
          { label: 'Caja x 12 unidades (Docena) [Promo]', extraPrice: 4900 },
        ]
      }
    ]
  },

  // 16. GALLETITAS
  {
    id: 'galletitas-artesanales',
    name: 'Galletitas Secas & Pepas de Membrillo',
    category: 'dulces',
    price: 3600,
    unit: 'caja / bolsa (500g)',
    description: 'Las auténticas galletitas de panadería: clásicas pepas rellenas con dulce de membrillo casero brillante, galletitas de manteca con chips de chocolate y masitas secas con granas.',
    badge: '🍪 Para el Mate',
    popular: false,
    image: donasTartasGalletitasImg,
    tags: ['galletitas', 'galletita', 'galletas', 'pepas', 'membrillo', 'masas secas', 'dulce', 'comida', 'mate'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Surtido',
        choices: [
          { label: 'Mix de Panadería (Pepas + Masitas con chocolate + Vainilla)' },
          { label: 'Solo Pepas artesanales de Membrillo rubí' },
          { label: 'Galletitas de Manteca con Chips de Chocolate' },
          { label: 'Alfajorcitos de Maicena con coco y DDL (12 un.)', extraPrice: 1200 },
        ]
      },
      {
        name: 'Peso',
        choices: [
          { label: '500 gramos', extraPrice: 0 },
          { label: '1 Kilogramo [Promo ahorro]', extraPrice: 3100 },
        ]
      }
    ]
  },

  // 17. FUGAZZETA RELLENA & CALZONE
  {
    id: 'fugazzeta-rellena-especial',
    name: 'Fugazzeta Rellena con 1 Kg de Mozzarella & Jamón',
    category: 'pizzas-empanadas',
    price: 12500,
    unit: 'grande (8 porciones pesadas)',
    description: 'La reina de las pizzas: masa al molde rellena con 1 kilo de queso mozzarella y jamón cocido seleccionado, cubierta con cebollas dulces doradas al horno, orégano y provolone gratinado.',
    badge: '👑 Gigante & Cargada',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['fugazzeta', 'pizza', 'pizzas', 'cebolla', 'queso', 'mozzarella', 'jamon', 'cena', 'comida'],
    stockStatus: 'disponible',
  },
  {
    id: 'calzone-italiano-artesanal',
    name: 'Calzone Rústico de Jamón, Ricota & Mozzarella',
    category: 'pizzas-empanadas',
    price: 9200,
    unit: 'calzone grande para 2 personas',
    description: 'Empanada gigante italiana cerrada en trenza: rellena de jamón cocido natural en cubos, ricota suave condimentada, mozzarella fundida y albahaca fresca con salsa de tomate.',
    badge: '🇮🇹 Tradición Italiana',
    popular: false,
    image: polloPizzaMatambreImg,
    tags: ['calzone', 'pizza', 'ricota', 'jamon', 'almuerzo', 'cena', 'comida', 'salado'],
    stockStatus: 'disponible',
  },

  // 18. BOLLERÍA DULCE Y SALADA
  {
    id: 'medialunas-gigantes-tostadas',
    name: 'Medialunas Gigantes Rellenas de Jamón & Queso',
    category: 'facturas',
    price: 4800,
    unit: 'porción (2 medialunas gigantes tostadas)',
    description: 'Medialunas de manteca artesanales tamaño XL, tostadas al horno con abundante jamón cocido natural y queso dambo derretido. Contraste agridulce perfecto con toque de almíbar.',
    badge: '🥪 Agridulce Caliente',
    popular: true,
    image: sandwichesFacturasImg,
    tags: ['medialuna', 'medialunas', 'facturas', 'jamon y queso', 'tostadas', 'desayuno', 'merienda', 'comida'],
    stockStatus: 'recien_salido',
  },
  {
    id: 'canoncitos-hojaldre-ddl',
    name: 'Cañoncitos de Hojaldre con Dulce de Leche',
    category: 'facturas',
    price: 6400,
    unit: 'docena (12 unidades)',
    description: 'Cañoncitos de hojaldre crocante de manteca pura, rellenos con copete gigante de dulce de leche repostero colonial y espolvoreados con azúcar impalpable.',
    badge: '🔥 Hojaldre Crocante',
    popular: true,
    image: churrosBolitasImg,
    tags: ['canoncitos', 'hojaldre', 'facturas', 'dulce de leche', 'merienda', 'dulce', 'comida'],
    stockStatus: 'recien_salido',
    options: [
      {
        name: 'Presentación',
        choices: [
          { label: '1 Docena (12 unidades)', extraPrice: 0 },
          { label: 'Media Docena (6 unidades)', extraPrice: -3100 },
        ]
      }
    ]
  },

  // 19. SÁNDWICHES COMPLETOS
  {
    id: 'sandwich-milanesa-completo',
    name: 'Sándwich de Milanesa Completo en Pan Flauta',
    category: 'sandwiches',
    price: 8200,
    unit: 'sándwich gigante (30 cm)',
    description: 'En pan flauta crocante recién horneado: milanesa tierna de ternera recién frita, jamón cocido, queso tybo derretido, huevo frito, lechuga crocante, tomate y mayonesa casera de Doña Vivi.',
    badge: '⭐ Clásico Argentino',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['sandwich', 'sandwiches', 'milanesa', 'pan flauta', 'completo', 'almuerzo', 'cena', 'comida'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Tipo de Carne',
        choices: [
          { label: 'Milanesa de Ternera tradicional' },
          { label: 'Suprema de Pollo crocante' },
        ]
      },
      {
        name: 'Aderezos',
        choices: [
          { label: 'Mayonesa casera con mostaza dulce' },
          { label: 'Chimichurri y salsa criolla' },
          { label: 'Sin aderezos (sólo oliva)' },
        ]
      }
    ]
  },
  {
    id: 'sandwich-pernil-figaza',
    name: 'Sándwich de Pernil de Cerdo Braseado en Figaza',
    category: 'sandwiches',
    price: 7500,
    unit: 'combo 2 sándwiches con papas',
    description: 'Carne desmechada de pernil de cerdo cocinada a fuego lento con cerveza rubia y especias. Servida en dos panes figacitas caseros con cebollitas asadas y salsa de mostaza y miel.',
    badge: '👑 Pernil Desmechado',
    popular: true,
    image: sopaPernilImg,
    tags: ['sandwich', 'sandwiches', 'pernil', 'cerdo', 'figaza', 'almuerzo', 'comida'],
    stockStatus: 'disponible',
  },

  // 20. TARTAS DULCES & REPOSTERÍA
  {
    id: 'lemon-pie-merengue',
    name: 'Lemon Pie Clásico con Merengue Italiano',
    category: 'tartas',
    price: 7900,
    unit: 'tarta entera (1 kg)',
    description: 'Masa sablée crocante, curd de limón fresco con la acidez justa y una generosa corona de merengue italiano tostado al soplete. Fresco y delicioso.',
    badge: '🍋 Limón & Merengue',
    popular: true,
    image: donasTartasGalletitasImg,
    tags: ['lemon pie', 'limon', 'tarta', 'merengue', 'postre', 'dulce', 'comida'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Porción',
        choices: [
          { label: 'Tarta Entera (1 kg - rinde 8 porciones)', extraPrice: 0 },
          { label: 'Porción individual generosa', extraPrice: -5100 },
        ]
      }
    ]
  },
  {
    id: 'tarta-tofi-chocolate',
    name: 'Tarta Tofi de Dulce de Leche & Chocolate Belga',
    category: 'tartas',
    price: 8200,
    unit: 'tarta entera (1.1 kg)',
    description: 'Base de masa de cacao amargo crocante, relleno con abundante dulce de leche repostero colonial y cubierta con ganache espejeada de chocolate semiamargo.',
    badge: '🍫 Puro Chocolate & DDL',
    popular: true,
    image: donasTartasGalletitasImg,
    tags: ['tarta tofi', 'tofi', 'chocolate', 'dulce de leche', 'tarta', 'postre', 'dulce', 'comida'],
    stockStatus: 'disponible',
  },

  // 21. TRADICIONALES DULCES (PASTA FROLA & ALFAJORES)
  {
    id: 'pasta-frola-artesanal',
    name: 'Pasta Frola Tradicional de Membrillo o Batata',
    category: 'dulces',
    price: 6200,
    unit: 'tarta entera grande',
    description: 'Masa frola aromatizada con ralladura de naranja y vainilla natural, enrejado dorado tradicional y generoso relleno de dulce de membrillo rubí o dulce de batata con chocolate.',
    badge: '🥧 Receta Abuela Vivi',
    popular: true,
    image: donasTartasGalletitasImg,
    tags: ['pastafrola', 'pasta frola', 'membrillo', 'batata', 'mate', 'merienda', 'dulce', 'comida'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Gusto de Dulce',
        choices: [
          { label: '100% Dulce de Membrillo artesanal rubí' },
          { label: '100% Dulce de Batata con vainilla' },
          { label: 'Dulce de Batata con Chocolate' },
        ]
      }
    ]
  },
  {
    id: 'alfajores-artesanales-vivi',
    name: 'Alfajores Artesanales Marplatenses & Maicena',
    category: 'dulces',
    price: 6800,
    unit: 'caja x 12 unidades (docena)',
    description: 'Los famosos alfajores de Doña Vivi: suaves alfajorcitos de maicena con coco rallado y abundante dulce de leche, o alfajores estilo marplatense bañados en chocolate con masa especiada.',
    badge: '⭐ Hechos a Mano',
    popular: true,
    image: donasTartasGalletitasImg,
    tags: ['alfajor', 'alfajores', 'maicena', 'chocolate', 'dulce de leche', 'merienda', 'dulce', 'comida'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Variedad',
        choices: [
          { label: 'Caja Mixta (6 Maicena + 6 Chocolate Marplatense)' },
          { label: '100% Alfajores de Maicena con coco' },
          { label: '100% Alfajores de Chocolate cobertura' },
        ]
      },
      {
        name: 'Cantidad',
        choices: [
          { label: 'Caja de 12 unidades (Docena)', extraPrice: 0 },
          { label: 'Media Docena (6 unidades)', extraPrice: -3200 },
        ]
      }
    ]
  },

  // 22. COMIDAS CALIENTES Y ROTISERÍA CASERA
  {
    id: 'milanesa-napolitana-a-caballo',
    name: 'Milanesa a la Napolitana con Papas Fritas a Caballo',
    category: 'rotiseria',
    price: 9800,
    unit: 'porción súper abundante (comen 2)',
    description: 'Carne de ternera de primera, tierna y bien empanada, bañada en salsa de tomates frescos de la huerta, jamón cocido seleccionado, abundante queso mozzarella fundido y 2 huevos fritos sobre colchón de papas fritas doradas.',
    badge: '⭐ Clásico Rotisero',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['milanesa', 'napolitana', 'milanesas', 'papas fritas', 'papas', 'carne', 'almuerzo', 'cena', 'comida', 'comidas', 'rotiseria'],
    stockStatus: 'recien_salido',
    options: [
      {
        name: 'Tipo de Carne',
        choices: [
          { label: 'Milanesa de Ternera tradicional' },
          { label: 'Suprema de Pollo crocante a la napolitana' },
        ]
      },
      {
        name: 'Guarnición',
        choices: [
          { label: 'Papas fritas bastón a caballo (2 huevos fritos)' },
          { label: 'Puré de papas casero mantecoso y cremoso' },
          { label: 'Ensalada mixta fresca (lechuga, tomate y cebolla)' },
        ]
      }
    ]
  },
  {
    id: 'pastel-de-papas-dona-vivi',
    name: 'Pastel de Papas Criollo Gratinado de Doña Vivi',
    category: 'rotiseria',
    price: 8900,
    unit: 'porción generosa en cazuela (800g)',
    description: 'La receta madre de Doña Vivi: base sabrosa de ternera picada a cuchillo con cebollita de verdeo, pimientos dulces, huevo duro y aceitunas, cubierta con puré de papas bien mantecoso y gratinada al horno a leña con queso reggianito.',
    badge: '👑 Receta Tradicional de Doña Vivi',
    popular: true,
    image: sopaPernilImg,
    tags: ['pastel de papas', 'pastel', 'carne', 'papas', 'pure', 'almuerzo', 'cena', 'comida', 'comidas', 'rotiseria', 'casero'],
    stockStatus: 'recien_salido',
    options: [
      {
        name: 'Toque de Doña Vivi',
        choices: [
          { label: 'Con pasas de uva rubias y azúcar para dorar (estilo criollo clásico)' },
          { label: '100% Salado con extra queso parmesano gratinado' },
        ]
      }
    ]
  },
  {
    id: 'canelones-caseros-ricota',
    name: 'Canelones Caseros de Espinaca & Ricota con Salsa Mixta',
    category: 'rotiseria',
    price: 8400,
    unit: 'fuente x 3 canelones gigantes',
    description: 'Panqueques finos amasados a mano en la panadería, rellenos con abundante espinaca salteada con ajo suave, ricota fresca de campo y nuez moscada. Bañados con salsa bolognesa de cocción lenta y bechamel cremosa gratinada.',
    badge: '🍝 Pasta Casera de Rotisería',
    popular: true,
    image: sopaPernilImg,
    tags: ['canelones', 'pasta', 'pastas', 'ricota', 'espinaca', 'salsa', 'almuerzo', 'cena', 'comida', 'comidas', 'rotiseria'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Salsa a Elección',
        choices: [
          { label: 'Salsa Mixta (Bolognesa casera y Salsa Blanca Bechamel)' },
          { label: 'Solo Pomodoro casero con albahaca fresca' },
          { label: 'Solo Bechamel gratinada con cuatro quesos' },
        ]
      }
    ]
  },
  {
    id: 'guiso-de-lentejas-criollo',
    name: 'Guiso de Lentejas Criollo al Disco con Chorizo Colorado & Panceta',
    category: 'rotiseria',
    price: 8600,
    unit: 'porción caliente en fuente térmica (750g)',
    description: 'Plato reconfortante cocinado a fuego lento en la cocina de Vivi: lentejas seleccionadas, chorizo colorado español, panceta ahumada dorada, roast beef tierno, papas, zanahorias y pimentón dulce.',
    badge: '🔥 Caliente & Enérgico',
    popular: true,
    image: sopaPernilImg,
    tags: ['guiso', 'lentejas', 'chorizo', 'panceta', 'caliente', 'invierno', 'almuerzo', 'cena', 'comida', 'comidas', 'rotiseria'],
    stockStatus: 'recien_salido',
  },
  {
    id: 'tortilla-de-papas-rellena',
    name: 'Tortilla Española Babé Rellena de Jamón & Queso Fundido',
    category: 'rotiseria',
    price: 7900,
    unit: 'tortilla entera alta (para 3 a 4 personas)',
    description: 'Papas pochadas pacientemente con cebollas dulces, huevos de campo batidos al punto justo para lograr un interior jugoso ("babé") y corazón derretido de jamón cocido y mozzarella.',
    badge: '🥔 Interior Jugoso Babé',
    popular: true,
    image: sopaPernilImg,
    tags: ['tortilla', 'tortilla de papas', 'papas', 'queso', 'jamon', 'huevo', 'almuerzo', 'cena', 'comida', 'comidas', 'rotiseria'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Punto de Cocción',
        choices: [
          { label: 'Babé (jugosa por dentro, la preferida)' },
          { label: 'Cocida completa / punto medio' },
        ]
      }
    ]
  },
  {
    id: 'pollo-al-spiedo-dorado',
    name: 'Pollo al Spiedo Dorado a la Leña con Papas Rústicas',
    category: 'rotiseria',
    price: 13900,
    unit: 'pollo entero con guarnición de papas',
    description: 'Pollo fresco adobado con limón, romero, provenzal y pimentón ahumado. Dorado lentamente girando al calor del fuego y la leña. Piel crocante y carne súper jugosa con papas rústicas doradas.',
    badge: '🍗 A la Leña & Jugoso',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['pollo', 'pollo al spiedo', 'spiedo', 'papas', 'asado', 'almuerzo', 'cena', 'comida', 'comidas', 'rotiseria'],
    stockStatus: 'recien_salido',
    options: [
      {
        name: 'Presentación',
        choices: [
          { label: 'Pollo Entero con Papas Rústicas (comen 3 a 4)', extraPrice: 0 },
          { label: 'Medio Pollo con Papas Rústicas (comen 2)', extraPrice: -6000 },
        ]
      }
    ]
  },
  {
    id: 'lasagna-rellena-bolognesa',
    name: 'Lasagna Boloñesa Casera al Horno de Barro',
    category: 'rotiseria',
    price: 9200,
    unit: 'porción grande (para 2 personas)',
    description: 'Capas intercaladas de masa al huevo fina, salsa boloñesa con carne de ternera molida fresca, jamón cocido en fetas, ricota sazonada y abundante queso mozzarella fundido con lluvia de queso provolone rallado.',
    badge: '🧀 Gratinada al Fuego',
    popular: false,
    image: sopaPernilImg,
    tags: ['lasagna', 'lasaña', 'pasta', 'pastas', 'queso', 'carne', 'almuerzo', 'cena', 'comida', 'comidas', 'rotiseria'],
    stockStatus: 'disponible',
  },
  {
    id: 'vitel-tone-artesanal',
    name: 'Vitel Toné Clásico Rotisero de Peceto con Alcaparras',
    category: 'rotiseria',
    price: 9500,
    unit: 'fuente x 450g (láminas de peceto con abundante salsa)',
    description: 'El plato tradicional preferido de los domingos: peceto cortado en láminas bien finas con suave emulsión de atún, anchoas seleccionadas, crema, mayonesa casera y alcaparras baby.',
    badge: '⭐ Clásico Festivo',
    popular: true,
    image: sopaPernilImg,
    tags: ['vitel tone', 'peceto', 'atun', 'carne', 'fiesta', 'domingo', 'almuerzo', 'cena', 'comida', 'comidas', 'rotiseria'],
    stockStatus: 'disponible',
  },

  // 23. MÁS PANES CASEROS (SELECCIÓN DE 1 HASTA 100 UNIDADES AL MÁXIMO)
  {
    id: 'pan-criollitos-grasa',
    name: 'Criollitos Cordobeses de Grasa Hojaldrados',
    category: 'panes',
    price: 350,
    unit: 'unidad (1 a 100 un.)',
    description: 'Pancitos hojaldrados tradicionales doraditos al horno con capas finitas y crujientes de masa con grasa vacuna purificada. Ideales para acompañar el mate amargo. Podés pedir desde 1 hasta 100 unidades.',
    badge: '🧉 Para el Mate (1 a 100 un.)',
    popular: true,
    image: heroImg,
    tags: ['criollitos', 'criollo', 'pan', 'panes', 'grasa', 'hojaldre', 'mate', 'comida', '1 a 100'],
    stockStatus: 'recien_salido',
    minQuantity: 1,
    maxQuantity: 100,
  },
  {
    id: 'pan-chipa-cuatro-quesos',
    name: 'Chipá de Almidón & Cuatro Quesos Calentito',
    category: 'panes',
    price: 550,
    unit: 'unidad (1 a 100 un.)',
    description: 'Auténticos chipacitos del Litoral horneados sin parar a lo largo del día. Amasados con almidón de mandioca, queso mar del plata, sardo picante, dambo y manteca. Crocantes por fuera y gomosos por dentro. Pedí de 1 a 100 unidades.',
    badge: '🧀 Puro Queso (1 a 100 un.)',
    popular: true,
    image: sopaPernilImg,
    tags: ['chipa', 'chipas', 'pan', 'panes', 'queso', 'mandioca', 'caliente', 'comida', '1 a 100'],
    stockStatus: 'recien_salido',
    minQuantity: 1,
    maxQuantity: 100,
  },
  {
    id: 'pan-cremonas-hojaldre',
    name: 'Cremonas Hojaldradas Tradicionales de Grasa',
    category: 'panes',
    price: 1800,
    unit: 'unidad (1 a 100 un.)',
    description: 'La reina de las panaderías de barrio: cremona circular hojaldrada con cortes dentados crocantes, dorada y saladita. Pedí de 1 hasta 100 unidades al máximo.',
    badge: '🌾 Hojaldre Crocante (1 a 100 un.)',
    popular: true,
    image: heroImg,
    tags: ['cremona', 'cremonas', 'pan', 'panes', 'hojaldre', 'grasa', 'mate', 'comida', '1 a 100'],
    stockStatus: 'recien_salido',
    minQuantity: 1,
    maxQuantity: 100,
  },
  {
    id: 'pan-pebete-manteca',
    name: 'Pan Pebete Suave de Manteca para Sándwich',
    category: 'panes',
    price: 450,
    unit: 'unidad (1 a 100 un.)',
    description: 'Panecillo alargado dorado brillante y ultra suave al tacto. Ideal para armar sándwiches de jamón y queso, salame o hamburguesas caseras. Seleccioná de 1 a 100 unidades.',
    badge: '🥪 Extra Suave (1 a 100 un.)',
    popular: false,
    image: sandwichesFacturasImg,
    tags: ['pebete', 'pebetes', 'pan', 'panes', 'sandwiches', 'manteca', 'comida', '1 a 100'],
    stockStatus: 'disponible',
    minQuantity: 1,
    maxQuantity: 100,
  },
  {
    id: 'pan-campo-salvado-multicereal',
    name: 'Pan de Campo de Salvado & Semillas Multicereal',
    category: 'panes',
    price: 2600,
    unit: 'hogaza grande / unidad (1 a 100 un.)',
    description: 'Pan saludable de harina integral y salvado con masa madre, rebozado con semillas de chía, girasol tostado, sésamo blanco y lino dorado. Pedí desde 1 hasta 100 unidades al máximo.',
    badge: '🌱 Integral & Saludable (1 a 100 un.)',
    popular: false,
    image: heroImg,
    tags: ['pan', 'panes', 'integral', 'salvado', 'semillas', 'saludable', 'comida', '1 a 100'],
    stockStatus: 'disponible',
    minQuantity: 1,
    maxQuantity: 100,
  },
  {
    id: 'pan-ciabatta-oliva',
    name: 'Pan Ciabatta Rústico al Aceite de Oliva Extra Virgen',
    category: 'panes',
    price: 900,
    unit: 'unidad (1 a 100 un.)',
    description: 'Pan italiano de alta hidratación con grandes alvéolos de aire, corteza fina pero crujiente y aroma sutil a aceite de oliva virgen extra. Disponible de 1 a 100 unidades.',
    badge: '🫒 Estilo Italiano (1 a 100 un.)',
    popular: false,
    image: heroImg,
    tags: ['ciabatta', 'pan', 'panes', 'oliva', 'italiano', 'comida', '1 a 100'],
    stockStatus: 'disponible',
    minQuantity: 1,
    maxQuantity: 100,
  },

  // 24. MÁS PIZZAS Y EMPANADAS CASERAS
  {
    id: 'empanadas-vacio-provolone',
    name: 'Empanadas de Vacío Braseado al Malbec & Provolone',
    category: 'pizzas-empanadas',
    price: 13500,
    unit: 'docena (12 unidades)',
    description: 'Empanadas rellenas con carne de vacío braseada durante 4 horas con vino tinto Malbec, cebollas caramelizadas y dados de queso provolone ahumado derretido.',
    badge: '🍷 Braseadas al Malbec',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['empanadas', 'empanada', 'vacio', 'carne', 'vino', 'almuerzo', 'cena', 'comida', 'comidas'],
    stockStatus: 'recien_salido',
    options: [
      {
        name: 'Presentación',
        choices: [
          { label: '1 Docena (12 unidades)', extraPrice: 0 },
          { label: 'Media Docena (6 unidades)', extraPrice: -6700 },
        ]
      }
    ]
  },
  {
    id: 'empanadas-humita-nortena',
    name: 'Empanadas de Humita y Choclo Cremoso Norteño',
    category: 'pizzas-empanadas',
    price: 11000,
    unit: 'docena (12 unidades)',
    description: 'Relleno suave de granos de choclo tierno cocidos con salsa blanca espesa, cebolla de verdeo rehogada, nuez moscada y queso cuartirolo derretido en masa casera.',
    badge: '🌽 Choclo & Queso',
    popular: false,
    image: sopaPernilImg,
    tags: ['empanadas', 'humita', 'choclo', 'vegetariano', 'cena', 'comida', 'comidas'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Presentación',
        choices: [
          { label: '1 Docena (12 unidades)', extraPrice: 0 },
          { label: 'Media Docena (6 unidades)', extraPrice: -5500 },
        ]
      }
    ]
  },
  {
    id: 'pizza-calabresa-artesanal',
    name: 'Pizza Calabresa al Horno de Barro con Longaniza',
    category: 'pizzas-empanadas',
    price: 11800,
    unit: 'pizza grande (8 porciones)',
    description: 'Masa madre al molde con piso crocante, salsa de tomates triturados, abundante mozzarella fundida, rodajas generosas de longaniza calabresa ahumada, ají molido y aceitunas negras.',
    badge: '🍕 Picantita & Ahumada',
    popular: true,
    image: polloPizzaMatambreImg,
    tags: ['pizza', 'pizzas', 'calabresa', 'longaniza', 'cena', 'comida', 'comidas'],
    stockStatus: 'recien_salido',
  },
  {
    id: 'pizza-cuatro-quesos-vivi',
    name: 'Pizza Cuatro Quesos Artesanal con Orégano Silvestre',
    category: 'pizzas-empanadas',
    price: 12200,
    unit: 'pizza grande (8 porciones)',
    description: 'Combinación perfecta de quesos fundidos en horno a leña: mozzarella fresca, queso azul roquefort intenso, provolone rallado crocante y suave queso dambo.',
    badge: '🧀 Cuatro Quesos',
    popular: false,
    image: polloPizzaMatambreImg,
    tags: ['pizza', 'pizzas', 'cuatro quesos', 'roquefort', 'provolone', 'cena', 'comida', 'comidas'],
    stockStatus: 'disponible',
  },

  // 25. MÁS DULCES, POSTRES Y FACTURAS
  {
    id: 'palmeritas-gigantes-manteca',
    name: 'Palmeritas Gigantes Hojaldradas Caramelizadas',
    category: 'dulces',
    price: 3400,
    unit: 'bandeja x 4 unidades gigantes',
    description: 'Hojaldre 100% de manteca con doble vuelta de azúcar cristalizado que se carameliza en el horno creando una textura crujiente y dorada inigualable.',
    badge: '🥐 Hojaldre Puro',
    popular: false,
    image: churrosBolitasImg,
    tags: ['palmeritas', 'palmeras', 'hojaldre', 'dulce', 'mate', 'merienda', 'comida'],
    stockStatus: 'recien_salido',
  },
  {
    id: 'vigilantes-pastelera-membrillo',
    name: 'Vigilantes Tradicionales con Crema Pastelera & Membrillo',
    category: 'facturas',
    price: 6400,
    unit: 'docena (12 unidades)',
    description: 'Facturas alargadas de manteca cubiertas con tiras generosas de crema pastelera perfumada con vainilla y dulce de membrillo brillante casero.',
    badge: '🔥 Clásico de Panadería',
    popular: true,
    image: sandwichesFacturasImg,
    tags: ['vigilantes', 'facturas', 'factura', 'pastelera', 'membrillo', 'desayuno', 'merienda', 'dulce', 'comida'],
    stockStatus: 'recien_salido',
    options: [
      {
        name: 'Presentación',
        choices: [
          { label: '1 Docena (12 unidades)', extraPrice: 0 },
          { label: 'Media Docena (6 unidades)', extraPrice: -3200 },
        ]
      }
    ]
  },
  {
    id: 'chocotorta-artesanal-vivi',
    name: 'Chocotorta Tradicional de Chocolinas & Dulce de Leche',
    category: 'tartas',
    price: 8800,
    unit: 'torta entera en molde (1.2 kg)',
    description: 'Capas de galletitas Chocolinas embebidas en café suave o leche con licor, intercaladas con la legendaria mezcla argentina de dulce de leche repostero colonial y queso crema suave.',
    badge: '⭐ Postre Favorito Argentino',
    popular: true,
    image: donasTartasGalletitasImg,
    tags: ['chocotorta', 'postre', 'chocolinas', 'dulce de leche', 'torta', 'dulce', 'comida'],
    stockStatus: 'disponible',
    options: [
      {
        name: 'Presentación',
        choices: [
          { label: 'Torta Entera (1.2 kg - rinde 8 a 10 porciones)', extraPrice: 0 },
          { label: 'Copa / Porción individual generosa', extraPrice: -5500 },
        ]
      }
    ]
  },
  {
    id: 'torta-rogel-hojaldre',
    name: 'Torta Rogel Tradicional de 8 Capas con Dulce de Leche',
    category: 'tartas',
    price: 8900,
    unit: 'torta entera mediana (1.1 kg)',
    description: 'Ocho finas capas de masa crocante y quebradiza, repletas con dulce de leche repostero entre cada una y coronada con copos altos de merengue italiano suave tostado.',
    badge: '👑 Postre de Fiesta',
    popular: false,
    image: donasTartasGalletitasImg,
    tags: ['rogel', 'torta', 'dulce de leche', 'merengue', 'postre', 'dulce', 'comida'],
    stockStatus: 'disponible',
  },
  {
    id: 'brownies-chocolate-nueces',
    name: 'Brownies de Chocolate Belga con Nueces & Dulce de Leche',
    category: 'dulces',
    price: 4600,
    unit: 'caja x 6 porciones cuadradas grandes',
    description: 'Cuadrados de brownie húmedos y chocolatosos con trozos de nueces tostadas y un generoso copete de dulce de leche.',
    badge: '🍫 Puro Chocolate Belga',
    popular: false,
    image: donasTartasGalletitasImg,
    tags: ['brownie', 'brownies', 'chocolate', 'nueces', 'dulce de leche', 'merienda', 'dulce', 'comida'],
    stockStatus: 'disponible',
  }
];

export const COMBOS = [
  {
    id: 'combo-merienda-feliz',
    name: 'Combo Merienda Patriótica',
    items: '1 Docena de Facturas de Manteca + 1 Docena de Churros con DDL + 500g Galletitas',
    price: 14900,
    originalPrice: 17300,
    badge: 'Ahorrá $2.400',
    image: churrosBolitasImg,
    description: 'El combo definitivo para una merienda inolvidable con familia o amigos.',
    targetProductIds: ['facturas-surtidas', 'churros-artesanales', 'galletitas-artesanales']
  },
  {
    id: 'combo-domingo-familiar',
    name: 'Combo Almuerzo Criollo Vivi',
    items: 'Pollo a la Parrilla con Papas + Fuente de Sopa Paraguaya + 1 Pan con Chicharrón',
    price: 20500,
    originalPrice: 22600,
    badge: 'Ahorrá $2.100',
    image: sopaPernilImg,
    description: 'Pollo crujiente al limón, la cremosa sopa paraguaya de la casa y pan con chicharrón caliente.',
    targetProductIds: ['pollo-a-la-parrilla', 'sopa-paraguaya-tradicional', 'pan-con-chicharron']
  },
  {
    id: 'combo-evento-pernil',
    name: 'Combo Picada & Pernil Party',
    items: 'Pernil de Cerdo Asado (20 pancitos) + 1 Docena Sándwiches de Miga + 1 Docena Empanadas',
    price: 37900,
    originalPrice: 42800,
    badge: 'Ahorrá $4.900',
    image: sandwichesFacturasImg,
    description: 'Ideal para cumpleaños y reuniones: pernil braseado con salsas, triples frescos y empanadas.',
    targetProductIds: ['pernil-de-cerdo-asado', 'sandwiches-de-miga-triples', 'empanadas-artesanales']
  }
];

export const BAKERY_HOURS = {
  weekdays: '06:30 - 21:00 hs',
  sundays: '07:00 - 14:00 hs',
  ovenTimes: ['07:00 hs (Facturas & Medialunas)', '11:30 hs (Panes & Rotisería)', '17:30 hs (Churros & Bolitas de Fraile)']
};

export const BAKERY_INFO = {
  name: 'Panadería Vivi',
  tagline: 'Sabor de hogar, tradición y horneadas calientes todo el día',
  address: 'Av. San Martín 1420 (esq. Los Aromos), Buenos Aires',
  whatsapp: '+54 9 11 4589-2040',
  phone: '(011) 4589-2040',
  instagram: '@panaderiavivi.artesanal',
  website: 'https://panaderia-vivi.com',
  canonicalUrl: 'https://panaderia-vivi.com',
  domain: 'panaderia-vivi.com',
};

