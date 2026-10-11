import React from 'react';
import { COMBOS } from '../data/products';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';

interface CombosSectionProps {
  onAddCombo: (combo: typeof COMBOS[0]) => void;
  addedComboId: string | null;
}

export const CombosSection: React.FC<CombosSectionProps> = ({
  onAddCombo,
  addedComboId,
}) => {
  return (
    <section className="bg-gradient-to-b from-[#FAF7F2] to-[#F1E5D5] py-12 px-4 sm:px-6 lg:px-8 border-y border-[#E3D3C2]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Promociones del Horno</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
            Combos & Promos Familiares
          </h2>
          <p className="text-sm sm:text-base text-[#6E4B35]">
            Ahorrá con nuestras combinaciones predilectas de panadería, confitería y rotisería criolla.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMBOS.map((combo) => {
            const isAdded = addedComboId === combo.id;

            return (
              <div
                key={combo.id}
                className="bg-white rounded-3xl border border-[#E2D2BF] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-900">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8C271E] text-white shadow-md">
                        {combo.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-[#2C1810]">
                      {combo.name}
                    </h3>
                    <p className="text-xs text-[#8C271E] font-semibold bg-rose-50 p-2 rounded-xl border border-rose-100">
                      Incluye: {combo.items}
                    </p>
                    <p className="text-xs text-[#735542] leading-relaxed">
                      {combo.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#F2E8DC] mt-2 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-stone-400 line-through font-mono block">
                      ${combo.originalPrice.toLocaleString('es-AR')}
                    </span>
                    <span className="font-mono text-xl font-bold text-[#8C271E]">
                      ${combo.price.toLocaleString('es-AR')}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddCombo(combo)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#D97724] hover:bg-[#BF641B] text-white shadow-sm'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>¡Agregado!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Pedir Combo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
