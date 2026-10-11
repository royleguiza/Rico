import React from 'react';
import { HERO_IMAGE, VIVI_PHOTO } from '../data/products';
import { Flame, Clock, Award, HeartHandshake, ArrowDown, Heart } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onExploreCombos: () => void;
  onExploreVivi?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onExploreCombos, onExploreVivi }) => {
  return (
    <section className="relative overflow-hidden bg-[#2D1B13] text-white">
      {/* Background with warm overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img
          src={HERO_IMAGE}
          alt="Mostrador y horno de Panadería Vivi"
          className="w-full h-full object-cover object-center filter saturate-150 contrast-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#21110A] via-[#2D1B13]/90 to-[#21110A]/60 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8883B]/20 border border-[#E8883B]/50 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs">
              <Flame className="w-4 h-4 text-[#F39C12] animate-bounce" />
              <span>Tradición de Barrio · Horneados con Masa Madre & Fuego a Leña</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Bienvenidos a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6BA6F] via-[#F4A261] to-[#E76F51]">
                Panadería Vivi
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#EBD9C8] font-light max-w-xl leading-relaxed">
              El aroma inconfundible del pan crujiente, las bolitas de fraile con dulce de leche, churros dorados, tartas caseras, auténtica sopa paraguaya, pernil asado y empanadas jugosas al horno.
            </p>

            {/* Quick badges of all the signature items */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-[#FAD59E]">
                🥖 Panes Criollos (1 a 100 un.)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-[#FAD59E]">
                🥐 Facturas de Manteca
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-[#FAD59E]">
                🍩 Churros & Bolitas
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-[#FAD59E]">
                🍗 Pernil & Pollo al Spiedo
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-[#FAD59E]">
                🌽 Sopa Paraguaya
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-[#FAD59E]">
                🍕 Pizzas & Matambre
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D97724] to-[#C05D17] hover:from-[#E68532] hover:to-[#CF6A21] text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-950/40 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Hacer Mi Pedido Ahora</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onExploreCombos}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-[#FFF2DF] font-semibold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <span>Ver Combos Familiares</span>
              </button>

              {onExploreVivi && (
                <button
                  onClick={onExploreVivi}
                  className="px-4 py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>Ver a Vivi, Mesas, Paredes & Pisos</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Hero Spotlight Card with Doña Vivi */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF7F2]/10 backdrop-blur-md border border-white/15 rounded-3xl p-5 sm:p-6 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

              {/* Doña Vivi Personal Greeting Chip */}
              <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl border border-white/15 mb-4">
                <img
                  src={VIVI_PHOTO}
                  alt="Doña Vivi"
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-300 shrink-0"
                />
                <div className="text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    <span>Doña Vivi atendiendo en su mesa</span>
                  </div>
                  <p className="text-stone-300 italic text-[11px] mt-0.5">
                    "Te esperamos con el pan caliente recién salido del horno."
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-semibold tracking-wide text-emerald-300">
                    Atención al Público y Envíos
                  </span>
                </div>
                <span className="text-xs bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded-md border border-amber-400/30">
                  En directo
                </span>
              </div>

              <div className="space-y-3.5 text-sm text-[#F0DFD1]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-xs sm:text-sm">Horarios de Horneadas Calientes</h2>
                    <p className="text-xs text-stone-300 mt-0.5">
                      07:00 hs (Desayuno) · 11:30 hs (Rotisería & Pan) · 17:30 hs (Merienda & Churros)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-xs sm:text-sm">Ingredientes 100% Genuinos</h2>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Manteca pura de primera, dulce de leche repostero colonial y carnes seleccionadas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-xs sm:text-sm">Retiro sin Espera o Envío Rápido</h2>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Armamos tu pedido recién sacado del horno para que llegue humeante a tu mesa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Promo code quick callout */}
              <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-amber-600/30 to-rose-600/30 border border-amber-400/30 text-center">
                <span className="text-xs text-amber-200 block">¿Primera compra online?</span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  Usá el cupón <code className="bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded-sm border border-amber-500/40 font-mono">VIVI10</code> para un 10% OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

