import React, { useState } from 'react';
import { CartItem } from '../types';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  Store,
  Bike
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  deliveryType: 'takeaway' | 'delivery';
  onSelectDeliveryType: (type: 'takeaway' | 'delivery') => void;
  discountCode: string;
  discountAmount: number;
  onApplyCoupon: (code: string) => boolean;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  deliveryType,
  onSelectDeliveryType,
  discountCode,
  discountAmount,
  onApplyCoupon,
  onProceedToCheckout,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const deliveryFee = deliveryType === 'delivery' ? 1200 : 0;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const success = onApplyCoupon(couponInput.trim());
    if (success) {
      setCouponSuccess(true);
      setCouponError('');
    } else {
      setCouponError('Cupón inválido. Probá con "VIVI10"');
      setCouponSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5D7C7] animate-in slide-in-from-right duration-300"
        role="dialog"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E6D7C7] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#8C271E] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2C1810]">Tu Canasta</h2>
              <p className="text-xs text-[#8C6D58]">
                {items.length === 1 ? '1 producto seleccionado' : `${items.length} productos seleccionados`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar canasta"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item List / Empty state */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border-2 border-dashed border-amber-200">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C1810]">
                Tu canasta está vacía
              </h3>
              <p className="text-xs sm:text-sm text-[#7D6352] max-w-xs mx-auto">
                Elegí panes recién horneados, facturas, churros, sopa paraguaya o pernil asado para comenzar tu pedido.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#D97724] text-white rounded-xl text-xs font-bold hover:bg-[#BF641B] transition-colors cursor-pointer"
              >
                Ver Menú
              </button>
            </div>
          ) : (
            <>
              {/* Delivery method toggle */}
              <div className="p-1 bg-[#EFE6DA] rounded-2xl grid grid-cols-2 gap-1 mb-4">
                <button
                  type="button"
                  onClick={() => onSelectDeliveryType('takeaway')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    deliveryType === 'takeaway'
                      ? 'bg-white text-[#2C1810] shadow-xs'
                      : 'text-[#6E4E39] hover:text-[#2C1810]'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-[#D97724]" />
                  <span>Retiro en Local (Gratis)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectDeliveryType('delivery')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    deliveryType === 'delivery'
                      ? 'bg-white text-[#2C1810] shadow-xs'
                      : 'text-[#6E4E39] hover:text-[#2C1810]'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5 text-[#8C271E]" />
                  <span>Envío ($1.200)</span>
                </button>
              </div>

              {/* Items list */}
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white p-3.5 rounded-2xl border border-[#EADBCC] flex gap-3 shadow-2xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-100"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-bold text-[#2C1810] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          aria-label="Quitar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Display custom options */}
                      {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <div className="mt-1 space-y-0.5">
                          {Object.entries(item.selectedOptions).map(([key, val]) => (
                            <div key={key} className="text-[11px] text-[#8C6D58] line-clamp-1">
                              <span className="font-medium text-[#593925]">{key}:</span> {val}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Special instruction notes */}
                      {item.specialInstructions && (
                        <div className="text-[11px] text-amber-800 italic bg-amber-50 px-2 py-0.5 rounded-md mt-1">
                          "{item.specialInstructions}"
                        </div>
                      )}
                    </div>

                    {/* Quantity & Item price */}
                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-stone-100">
                      <div className="flex items-center gap-1.5 border border-stone-200 rounded-xl bg-stone-50 p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-white disabled:opacity-30 rounded-lg transition-colors cursor-pointer"
                          title="Restar 1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val)) {
                              onUpdateQuantity(item.cartItemId, Math.min(100, Math.max(1, val)));
                            }
                          }}
                          className="font-mono text-xs font-bold w-9 text-center bg-transparent focus:outline-hidden"
                          title="Cantidad (1 a 100)"
                        />
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, Math.min(100, item.quantity + 1))}
                          disabled={item.quantity >= 100}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-white disabled:opacity-30 rounded-lg transition-colors cursor-pointer"
                          title="Sumar 1 (máximo 100)"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-[#8C271E] block">
                          ${item.itemTotalPrice.toLocaleString('es-AR')}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          (${Math.round(item.itemTotalPrice / item.quantity).toLocaleString('es-AR')} c/u)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer with promo and checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#E6D7C7] space-y-3.5">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Código promocional (ej. VIVI10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-[#FAF7F2] border border-[#E0D2C3] rounded-xl text-xs uppercase font-mono tracking-wider text-[#2C1810] placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </div>

              {couponSuccess && discountAmount > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>¡Cupón {discountCode} aplicado! Ahorro de ${discountAmount.toLocaleString('es-AR')}</span>
                </div>
              )}
              {couponError && (
                <p className="text-xs text-rose-600 font-medium">{couponError}</p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#6B4E3C] pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal de productos:</span>
                <span className="font-mono font-medium">${subtotal.toLocaleString('es-AR')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Descuento aplicado:</span>
                  <span className="font-mono">-${discountAmount.toLocaleString('es-AR')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>
                  {deliveryType === 'delivery' ? 'Costo de envío a domicilio:' : 'Retiro en sucursal:'}
                </span>
                <span className="font-mono font-medium">
                  {deliveryFee === 0 ? 'Gratis' : `$${deliveryFee.toLocaleString('es-AR')}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#2C1810] pt-2 border-t border-stone-200">
                <span>Total a pagar:</span>
                <span className="font-mono text-lg text-[#8C271E]">
                  ${total.toLocaleString('es-AR')}
                </span>
              </div>
            </div>

            {/* Proceed to checkout button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#D97724] hover:bg-[#BF641B] text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-950/20 flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
            >
              <span>Continuar con el Pedido</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
