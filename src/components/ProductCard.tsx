import React from 'react';
import { Product } from '../types';
import { Plus, ShoppingCart, Check, SlidersHorizontal } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  justAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  justAdded = false,
}) => {
  const isBread = product.category === 'panes';
  const hasOptions = Boolean(product.options && product.options.length > 0);
  const shouldOpenModal = hasOptions || isBread || Boolean(product.maxQuantity);

  return (
    <div className="group bg-white rounded-3xl border border-[#E9DCCF] hover:border-[#D5BEA8] shadow-xs hover:shadow-xl hover:shadow-amber-950/8 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div
        className="relative aspect-4/3 w-full overflow-hidden bg-[#EFE8DD] cursor-pointer"
        onClick={() => onSelect(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge Overlay */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#8C271E] text-white shadow-md shadow-black/20 flex items-center gap-1 backdrop-blur-xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Stock/Fresh Status */}
        {product.stockStatus === 'recien_salido' && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-600/90 text-white shadow-xs backdrop-blur-xs">
              ✨ Recién Horneado
            </span>
          </div>
        )}

        {/* Quick Customize Hint */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-[#331C0E] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <ShoppingCart className="w-3.5 h-3.5 text-[#D97724]" />
            Ver detalles & Comprar
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3
              onClick={() => onSelect(product)}
              className="font-serif text-base sm:text-lg font-bold text-[#2C1810] group-hover:text-[#8C271E] transition-colors cursor-pointer leading-snug line-clamp-2"
            >
              {product.name}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#735542] line-clamp-2 mb-4 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-[#F2E8DC] flex items-center justify-between gap-2">
          <div>
            <div className="text-xs text-[#8C6D58] font-medium leading-none mb-1">
              {product.unit}
            </div>
            <div className="font-mono text-lg sm:text-xl font-bold text-[#8C271E]">
              ${product.price.toLocaleString('es-AR')}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {shouldOpenModal ? (
              <button
                type="button"
                onClick={() => onSelect(product)}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D97724] hover:bg-[#BF641B] text-white shadow-sm hover:shadow-md active:scale-95'
                }`}
                title={isBread ? 'Elegí desde 1 hasta 100 unidades' : 'Personalizar y comprar'}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Agregado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>{isBread ? 'Pedir (1-100 un.)' : 'Comprar'}</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onQuickAdd(product)}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D97724] hover:bg-[#BF641B] text-white shadow-sm hover:shadow-md active:scale-95'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Agregado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Comprar</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
