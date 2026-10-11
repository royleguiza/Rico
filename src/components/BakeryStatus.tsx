import React from 'react';
import { Flame, Bell, MapPin, Sparkles, Coffee } from 'lucide-react';
import { BAKERY_HOURS, BAKERY_INFO } from '../data/products';

export const BakeryStatus: React.FC = () => {
  return (
    <div className="bg-[#F6EDE2] border-y border-[#E2D2BF] py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Oven Alert */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-[#D97724]/15 text-[#C05D17] flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 fill-[#D97724] text-[#D97724]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A24810]">
                Cronograma de Horneadas
              </span>
              <span className="text-[11px] bg-[#E8883B]/20 text-[#8C271E] font-medium px-2 py-0.2 rounded-full">
                En vivo
              </span>
            </div>
            <p className="text-xs text-[#523321] font-medium">
              Pan caliente cada 40 minutos · Rotisería al mediodía (11:30 a 14:00) · Churros calentitos desde las 16:30
            </p>
          </div>
        </div>

        {/* Oven Schedule chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs w-full md:w-auto justify-start md:justify-end">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-[#DAC6B2] text-[#472E1E] shadow-2xs font-medium">
            <Coffee className="w-3.5 h-3.5 text-[#D97724]" />
            <span>Desayuno: Facturas tibias</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-[#DAC6B2] text-[#472E1E] shadow-2xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Almuerzo: Sopa Paraguaya & Pernil</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-[#DAC6B2] text-[#472E1E] shadow-2xs font-medium">
            <Bell className="w-3.5 h-3.5 text-rose-600" />
            <span>Tarde: Churros & Bolitas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
