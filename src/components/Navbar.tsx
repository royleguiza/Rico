import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Phone,
  Clock,
  MapPin,
  Sparkles,
  ChefHat,
  Plus,
  Check,
  ArrowRight,
  Smartphone,
  Globe,
  Copy,
} from 'lucide-react';
import { BAKERY_INFO, VIVI_PHOTO } from '../data/products';
import { Product } from '../types';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenInfo: () => void;
  activeOrderCount?: number;
  onViewActiveOrder?: () => void;
  searchResults: Product[];
  onQuickBuy: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onScrollToMenu: () => void;
  onScrollToVivi?: () => void;
  justAddedProductId: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onOpenInfo,
  activeOrderCount = 0,
  onViewActiveOrder,
  searchResults,
  onQuickBuy,
  onSelectProduct,
  onScrollToMenu,
  onScrollToVivi,
  justAddedProductId,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null);

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('https://panaderia-vivi.com');
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // Close dropdown on click outside (handles both desktop and mobile containers)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetNode = event.target as Node;
      const isInsideDesktop = searchContainerRef.current?.contains(targetNode);
      const isInsideMobile = mobileSearchContainerRef.current?.contains(targetNode);

      if (!isInsideDesktop && !isInsideMobile) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as unknown as EventListener);
    };
  }, []);

  const showDropdown = isSearchFocused && searchQuery.trim().length > 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    onScrollToMenu();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADDCD] shadow-xs">
      {/* Top micro banner */}
      <div className="bg-[#8C271E] text-[#FFF6E9] px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wide">¡Horno a leña encendido!</span>
            <span className="hidden sm:inline text-amber-200">Facturas calientes y panes crocantes cada 30 min.</span>
          </div>

          {/* Official URL & Contact */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/20 hover:bg-black/30 text-amber-200 hover:text-white transition-colors cursor-pointer border border-white/10"
              title="Copiar dirección web oficial"
            >
              <Globe className="w-3 h-3 text-emerald-300" />
              <span className="font-mono font-bold tracking-tight">https://panaderia-vivi.com</span>
              {copiedUrl ? (
                <span className="text-[10px] text-emerald-300 font-bold">¡Copiado!</span>
              ) : (
                <Copy className="w-2.5 h-2.5 opacity-70" />
              )}
            </button>

            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" /> Abierto hasta 21:00 hs
            </span>
            <a
              href={`https://wa.me/5491145892040?text=Hola%20Panaderia%20Vivi,%20quisiera%20hacer%20un%20pedido`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-amber-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> {BAKERY_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D97724] to-[#8C271E] text-white flex items-center justify-center shadow-md shadow-amber-900/15">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#3A1E11]">
                Panadería Vivi
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                Artesanal
              </span>
            </div>
            <div className="flex items-center gap-2 -mt-0.5">
              <p className="text-xs text-[#8C6D58] hidden sm:block">
                Panes (1 a 100 un.) · Rotisería · Comidas Caseras
              </p>
              <span className="hidden md:inline-block text-[#D97724] font-mono text-[11px] font-semibold">
                · panaderia-vivi.com
              </span>
            </div>
          </div>
        </div>

        {/* Live Search Desktop */}
        <div ref={searchContainerRef} className="flex-1 max-w-md hidden md:block relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-[#9C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar comida: panes, churros, sopa paraguaya, pizza..."
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setIsSearchFocused(true);
              }}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#E0D2C3] rounded-full text-sm placeholder-[#A88C78] text-[#331C0E] focus:outline-hidden focus:ring-2 focus:ring-[#D97724]/40 focus:border-[#D97724] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </form>

          {/* Quick Search Dropdown Menu */}
          {showDropdown && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-[#E6D7C7] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 bg-[#FAF7F2] border-b border-[#EEDBCC] flex items-center justify-between text-xs">
                <span className="font-bold text-[#8C271E]">
                  {searchResults.length === 0
                    ? 'No se encontraron comidas'
                    : `${searchResults.length} ${searchResults.length === 1 ? 'comida encontrada' : 'comidas encontradas'}`}
                </span>
                <span className="text-stone-500 text-[11px]">Hacé clic para comprar o personalizar</span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-xs text-stone-500 space-y-1">
                    <p className="font-semibold text-stone-700">Sin resultados para "{searchQuery}"</p>
                    <p>Probá buscando: pan, factura, churros, pernil, pollo, pizza o empanada.</p>
                  </div>
                ) : (
                  searchResults.slice(0, 6).map((item) => {
                    const isJustAdded = justAddedProductId === item.id;
                    return (
                      <div
                        key={item.id}
                        className="p-3 hover:bg-[#FDF9F4] flex items-center justify-between gap-3 transition-colors"
                      >
                        <div
                          onClick={() => {
                            onSelectProduct(item);
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 bg-stone-100"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#2C1810] truncate">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-mono text-xs font-bold text-[#8C271E]">
                                ${item.price.toLocaleString('es-AR')}
                              </span>
                              <span className="text-[10px] text-stone-500">
                                {item.unit}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Direct Buy / Add Button */}
                        <div className="shrink-0 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              if (item.category === 'panes' || (item.options && item.options.length > 0)) {
                                onSelectProduct(item);
                                setIsSearchFocused(false);
                              } else {
                                onQuickBuy(item);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                              isJustAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#D97724] hover:bg-[#BF641B] text-white shadow-2xs'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>¡Listo!</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>{item.category === 'panes' ? 'Pedir (1-100 un.)' : 'Comprar'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {searchResults.length > 0 && (
                <div className="p-2.5 bg-[#FAF7F2] border-t border-[#EEDBCC] text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchFocused(false);
                      onScrollToMenu();
                    }}
                    className="text-xs font-bold text-[#8C271E] hover:underline flex items-center justify-center gap-1 w-full py-1 cursor-pointer"
                  >
                    <span>Ver todas las {searchResults.length} comidas en el menú</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Doña Vivi Avatar Button */}
          {onScrollToVivi && (
            <button
              onClick={onScrollToVivi}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 rounded-2xl border border-amber-200 transition-colors cursor-pointer text-left shrink-0"
              title="Conocé a Doña Vivi y su mesa"
            >
              <div className="relative">
                <img
                  src={VIVI_PHOTO}
                  alt="Doña Vivi"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-amber-400"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div className="hidden lg:block text-left leading-tight">
                <span className="text-[10px] uppercase font-bold text-amber-800 block">El Local</span>
                <span className="text-xs font-bold text-[#3A1E11]">Vivi, Mesas & Pisos</span>
              </div>
            </button>
          )}

          {/* Active order badge */}
          {activeOrderCount > 0 && (
            <button
              onClick={onViewActiveOrder}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-semibold hover:bg-amber-200 transition-colors animate-pulse cursor-pointer shadow-xs"
              title="Ver estado y modificar pedido o celular"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#8C271E]" />
              <span>Pedido en curso (Modificar)</span>
            </button>
          )}

          {/* Info & Location trigger */}
          <button
            onClick={onOpenInfo}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#5C3F2E] hover:text-[#2C1810] hover:bg-[#EFE8DC] rounded-xl transition-colors cursor-pointer"
            title="Ubicación y horarios"
          >
            <MapPin className="w-4 h-4 text-[#D97724]" />
            <span>Sucursal</span>
          </button>

          {/* Cart button */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir carrito de compras"
            className="relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 bg-[#D97724] hover:bg-[#BF641B] active:scale-95 text-white rounded-2xl font-medium shadow-md shadow-[#D97724]/20 transition-all cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#8C271E] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-100">
                Tu Canasta
              </span>
              <span className="text-xs font-bold font-mono">
                ${cartTotal.toLocaleString('es-AR')}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile search bar with dropdown */}
      <div ref={mobileSearchContainerRef} className="px-4 pb-3 md:hidden relative">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 text-[#9C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar comida: pan, pernil, churros..."
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsSearchFocused(true);
            }}
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#E0D2C3] rounded-full text-sm placeholder-[#A88C78] text-[#331C0E] focus:outline-hidden focus:ring-2 focus:ring-[#D97724]/40 focus:border-[#D97724]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 bg-stone-100 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
          )}
        </form>

        {/* Mobile dropdown */}
        {showDropdown && (
          <div className="absolute left-4 right-4 top-full mt-1 bg-white rounded-2xl shadow-2xl border border-[#E6D7C7] overflow-hidden z-50">
            <div className="p-2.5 bg-[#FAF7F2] border-b border-[#EEDBCC] flex items-center justify-between text-xs">
              <span className="font-bold text-[#8C271E]">
                {searchResults.length} {searchResults.length === 1 ? 'comida encontrada' : 'comidas encontradas'}
              </span>
              <span className="text-stone-500 text-[11px]">Tocá para ordenar</span>
            </div>
            <div className="max-h-60 overflow-y-auto divide-y divide-stone-100">
              {searchResults.slice(0, 5).map((item) => {
                const isJustAdded = justAddedProductId === item.id;
                return (
                  <div
                    key={item.id}
                    className="p-2.5 flex items-center justify-between gap-2"
                  >
                    <div
                      onClick={() => {
                        onSelectProduct(item);
                        setIsSearchFocused(false);
                      }}
                      className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#2C1810] truncate">{item.name}</p>
                        <p className="text-xs font-mono font-bold text-[#8C271E]">
                          ${item.price.toLocaleString('es-AR')}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (item.category === 'panes' || (item.options && item.options.length > 0)) {
                          onSelectProduct(item);
                          setIsSearchFocused(false);
                        } else {
                          onQuickBuy(item);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#D97724] text-white hover:bg-[#BF641B]'
                      }`}
                    >
                      {isJustAdded ? '¡Listo!' : item.category === 'panes' ? '1-100 un.' : 'Comprar'}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="p-2 bg-[#FAF7F2] border-t border-[#EEDBCC] text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSearchFocused(false);
                  onScrollToMenu();
                }}
                className="text-xs font-bold text-[#8C271E] py-1 cursor-pointer"
              >
                Ver todos los resultados ({searchResults.length})
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
