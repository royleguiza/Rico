import React from 'react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/products';
import {
  Sparkles,
  Wheat,
  Croissant,
  Flame,
  Drumstick,
  Pizza,
  Sandwich,
  PieChart,
  Cookie
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  productCounts: Record<CategoryId, number>;
  activeTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4" />,
  Wheat: <Wheat className="w-4 h-4" />,
  Croissant: <Croissant className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  Drumstick: <Drumstick className="w-4 h-4" />,
  Pizza: <Pizza className="w-4 h-4" />,
  Sandwich: <Sandwich className="w-4 h-4" />,
  PieChart: <PieChart className="w-4 h-4" />,
  Cookie: <Cookie className="w-4 h-4" />,
};

const FILTER_TAGS = [
  { label: '🔥 Recién Horneado', tag: 'recien_salido' },
  { label: '⭐ Favoritos de Doña Vivi', tag: 'popular' },
  { label: '🧉 Para el Mate', tag: 'mate' },
  { label: '🍖 Rotisería Criolla', tag: 'rotiseria' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  productCounts,
  activeTag,
  onSelectTag,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = productCounts[cat.id as CategoryId] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id as CategoryId);
                onSelectTag(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#8C271E] text-white shadow-md shadow-[#8C271E]/25 scale-[1.02]'
                  : 'bg-white hover:bg-[#F3EADE] text-[#4F3323] border border-[#E3D3C2] hover:border-[#D5BEA8]'
              }`}
            >
              <span className={isSelected ? 'text-amber-200' : 'text-[#D97724]'}>
                {CATEGORY_ICONS[cat.icon]}
              </span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold font-mono ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-[#EFE5D7] text-[#6E4B35]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Tag Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-[#523321]">
        <span className="font-semibold text-stone-500 uppercase tracking-wider text-[11px] shrink-0 mr-1">
          Filtros rápidos:
        </span>
        {FILTER_TAGS.map((item) => {
          const isTagActive = activeTag === item.tag;
          return (
            <button
              key={item.tag}
              onClick={() => onSelectTag(isTagActive ? null : item.tag)}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-all shrink-0 cursor-pointer ${
                isTagActive
                  ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                  : 'bg-white/70 hover:bg-white border-[#E0D2C3] text-[#593925]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
        {activeTag && (
          <button
            onClick={() => onSelectTag(null)}
            className="text-xs text-[#8C271E] hover:underline font-semibold ml-2 shrink-0 cursor-pointer"
          >
            Limpiar filtro
          </button>
        )}
      </div>
    </div>
  );
};
