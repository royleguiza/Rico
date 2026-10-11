import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  MessageSquare,
  Wheat,
  Sliders,
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    selectedOptions: Record<string, string>,
    specialInstructions: string,
    calculatedTotal: number
  ) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const isBread = product.category === 'panes';
  const minLimit = product.minQuantity || 1;
  const maxLimit = product.maxQuantity || 100;

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Initialize default options
  useEffect(() => {
    if (product.options) {
      const defaults: Record<string, string> = {};
      product.options.forEach((opt) => {
        if (opt.choices.length > 0) {
          defaults[opt.name] = opt.choices[0].label;
        }
      });
      setSelectedOptions(defaults);
    } else {
      setSelectedOptions({});
    }
    setQuantity(1);
    setSpecialInstructions('');
  }, [product]);

  // Calculate unit price with options extras
  const calculateUnitPrice = () => {
    let price = product.price;
    if (product.options) {
      product.options.forEach((opt) => {
        const selectedChoiceLabel = selectedOptions[opt.name];
        const choice = opt.choices.find((c) => c.label === selectedChoiceLabel);
        if (choice && choice.extraPrice) {
          price += choice.extraPrice;
        }
      });
    }
    return Math.max(0, price);
  };

  const unitPrice = calculateUnitPrice();
  const totalPrice = unitPrice * quantity;

  const handleOptionChange = (optionName: string, choiceLabel: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: choiceLabel,
    }));
  };

  const handleQuantityChange = (val: number) => {
    const clamped = Math.max(minLimit, Math.min(maxLimit, isNaN(val) ? minLimit : val));
    setQuantity(clamped);
  };

  const handleConfirm = () => {
    onAddToCart(product, quantity, selectedOptions, specialInstructions, totalPrice);
    onClose();
  };

  const breadPresets = [1, 6, 12, 25, 50, 100];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E0D2C3] flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header Image */}
        <div className="relative h-52 sm:h-60 bg-stone-900 shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/40" />

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8C271E] text-white shadow-md">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 -mt-6 relative z-10 bg-[#FAF7F2] rounded-t-3xl">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810]">
                {product.name}
              </h2>
              <span className="font-mono text-lg font-bold text-[#8C271E] shrink-0">
                ${unitPrice.toLocaleString('es-AR')}
                <span className="text-xs text-stone-500 font-sans block text-right font-normal">
                  {product.unit}
                </span>
              </span>
            </div>
            <p className="text-sm text-[#735542] mt-1.5 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Special Banner for Breads: 1 to 100 units */}
          {isBread && (
            <div className="bg-amber-100/90 border border-amber-300 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#D97724] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Wheat className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-[#8C271E] block">
                  🥖 Panes Frescos: Desde 1 hasta 100 unidades al máximo
                </span>
                <p className="text-stone-700">
                  Amasados a diario y horneados a la leña. Podés encargar desde 1 unidad para la mesa diaria hasta 100 unidades para asados, cumpleaños o eventos.
                </p>
              </div>
            </div>
          )}

          {/* Interactive Quantity Selector & Presets */}
          <div className="bg-white rounded-2xl p-4 border border-[#EADBCC] space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8C271E] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>Cantidad: {quantity} {quantity === 1 ? 'unidad' : 'unidades'} (Máx: {maxLimit})</span>
              </label>
              <span className="text-xs text-stone-500 font-mono font-semibold">
                1 a {maxLimit} máx.
              </span>
            </div>

            {/* Stepper + Direct numeric input */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#DECDBB] rounded-2xl bg-[#FAF7F2] p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= minLimit}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-stone-100 disabled:opacity-40 text-[#4A2D1B] flex items-center justify-center font-bold transition-colors cursor-pointer"
                  title="Restar 1"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <input
                  type="number"
                  min={minLimit}
                  max={maxLimit}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
                  className="w-16 text-center font-mono font-bold text-lg text-[#2C1810] bg-transparent focus:outline-hidden"
                />

                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= maxLimit}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-stone-100 disabled:opacity-40 text-[#4A2D1B] flex items-center justify-center font-bold transition-colors cursor-pointer"
                  title="Sumar 1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Fast Jump buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 5)}
                  disabled={quantity + 5 > maxLimit}
                  className="px-2.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-bold text-amber-900 transition-colors disabled:opacity-30 cursor-pointer"
                >
                  +5
                </button>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 10)}
                  disabled={quantity + 10 > maxLimit}
                  className="px-2.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-bold text-amber-900 transition-colors disabled:opacity-30 cursor-pointer"
                >
                  +10
                </button>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(100)}
                  className="px-2.5 py-2 rounded-xl bg-[#8C271E]/10 hover:bg-[#8C271E]/20 border border-[#8C271E]/30 text-xs font-bold text-[#8C271E] transition-colors cursor-pointer"
                  title="Seleccionar 100 unidades al máximo"
                >
                  100 (Máx)
                </button>
              </div>
            </div>

            {/* Range Slider for fast adjustment from 1 to 100 */}
            <div className="space-y-1 pt-1">
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
                className="w-full accent-[#D97724] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>1 un.</span>
                <span>25 un.</span>
                <span>50 un.</span>
                <span>75 un.</span>
                <span className="font-bold text-[#8C271E]">100 un. (Máx)</span>
              </div>
            </div>

            {/* Quick preset chips for Bread quantities */}
            <div className="pt-2 border-t border-stone-100 space-y-1">
              <span className="text-[11px] font-semibold text-stone-500 block">
                Accesos rápidos de cantidad:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {breadPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleQuantityChange(preset)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      quantity === preset
                        ? 'bg-[#8C271E] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {preset === 1 && '1 unidad'}
                    {preset === 6 && '6 un.'}
                    {preset === 12 && '12 un. (Docena)'}
                    {preset === 25 && '25 un.'}
                    {preset === 50 && '50 un. (Medio ciento)'}
                    {preset === 100 && '100 un. (Máximo)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bulk event notice if quantity >= 25 */}
            {quantity >= 25 && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>¡Pedido especial para asado o evento ({quantity} panes)!</strong> Doña Vivi separará una hornada exclusiva para garantizar que estén crocantes y calientes.
                </span>
              </div>
            )}
          </div>

          {/* Options Groups */}
          {product.options && product.options.map((optionGroup) => (
            <div key={optionGroup.name} className="space-y-2 pt-2 border-t border-[#EADBCC]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8C271E] block">
                {optionGroup.name}
              </label>

              <div className="grid grid-cols-1 gap-2">
                {optionGroup.choices.map((choice) => {
                  const isChecked = selectedOptions[optionGroup.name] === choice.label;
                  return (
                    <label
                      key={choice.label}
                      onClick={() => handleOptionChange(optionGroup.name, choice.label)}
                      className={`flex items-center justify-between p-3 rounded-2xl border text-sm font-medium transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-white border-[#8C271E] ring-2 ring-[#8C271E]/20 text-[#2C1810] shadow-xs'
                          : 'bg-white/60 hover:bg-white border-[#E0D2C3] text-[#5C3F2E]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isChecked
                              ? 'border-[#8C271E] bg-[#8C271E] text-white'
                              : 'border-stone-300'
                          }`}
                        >
                          {isChecked && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <span>{choice.label}</span>
                      </div>
                      {choice.extraPrice !== undefined && choice.extraPrice !== 0 && (
                        <span className="text-xs font-mono font-semibold text-[#8C271E]">
                          {choice.extraPrice > 0 ? `+$${choice.extraPrice.toLocaleString('es-AR')}` : `-$${Math.abs(choice.extraPrice).toLocaleString('es-AR')}`}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Special Instructions */}
          <div className="space-y-1.5 pt-2 border-t border-[#EADBCC]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#8C271E] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Instrucciones Especiales (Opcional)</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Bien dorado, separar en bolsas de 10 unidades, cortar..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#E0D2C3] rounded-2xl text-sm placeholder-[#9C8271] text-[#331C0E] focus:outline-hidden focus:ring-2 focus:ring-[#D97724]/40"
            />
          </div>
        </div>

        {/* Footer with Quantity & Add Button */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E6D7C8] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-600">
            <span className="block font-semibold text-[#2C1810]">
              Total ({quantity} {quantity === 1 ? 'unidad' : 'unidades'}):
            </span>
            <span className="font-mono text-2xl font-bold text-[#8C271E]">
              ${totalPrice.toLocaleString('es-AR')}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 min-w-[220px] py-3.5 px-5 rounded-2xl bg-[#D97724] hover:bg-[#C05D17] text-white font-bold text-sm sm:text-base flex items-center justify-between shadow-lg shadow-amber-950/20 active:scale-98 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Agregar {quantity} al Pedido</span>
            </span>
            <span className="font-mono text-base font-bold">
              ${totalPrice.toLocaleString('es-AR')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
