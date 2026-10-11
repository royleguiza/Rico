import React, { useState } from 'react';
import {
  VIVI_PHOTO,
  VIVI_TABLE_PHOTO,
  VIVI_SELLER_PHOTO,
  VIVI_SALON_WALLS_FLOORS,
  VIVI_TABLES_PHOTO,
  VIVI_OVEN_WORKSHOP,
} from '../data/products';
import {
  Heart,
  Sparkles,
  ShoppingBag,
  Check,
  Award,
  Store,
  Users,
  Grid,
  Maximize2,
  X,
  Layers,
  Flame,
  Coffee,
  Palette,
} from 'lucide-react';

interface ViviShowcaseProps {
  onBuyMesaSpecialty: () => void;
  isMesaAdded: boolean;
  onExploreMenu: () => void;
}

type TabKey = 'todos' | 'personas' | 'paredes' | 'pisos' | 'mesas' | 'horno';

interface PlaceFeature {
  id: string;
  category: TabKey;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  badge: string;
  details: {
    paredes?: string;
    pisos?: string;
    mesas?: string;
    personas?: string;
  };
}

export const ViviShowcase: React.FC<ViviShowcaseProps> = ({
  onBuyMesaSpecialty,
  isMesaAdded,
  onExploreMenu,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('todos');
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<PlaceFeature | null>(null);

  const features: PlaceFeature[] = [
    {
      id: 'salon-principal',
      category: 'todos',
      title: 'El Salón Principal de Panadería Vivi',
      subtitle: 'Mostradores de madera, paredes de ladrillo y piso en damero',
      image: VIVI_SALON_WALLS_FLOORS,
      badge: '🏛️ Salón & Mostradores',
      description:
        'El salón principal combina paredes de ladrillo a la vista con estanterías de pino macizo cargadas de canastos con panes calientes. El piso luce un clásico damero blanco y negro entrelazado con baldosas de terracota rústica, y al fondo se divisan las mesas de madera donde los clientes meriendan.',
      details: {
        paredes: 'Ladrillos centenarios con estantes rústicos, pizarra con el menú y arco al horno.',
        pisos: 'Pisos en damero blanco y negro combinados con baldosas de terracota.',
        mesas: 'Mostradores de madera maciza acristalados y mesas para los clientes.',
        personas: 'Doña Vivi y el equipo atienden con delantal y sonrisa detrás de la caja.',
      },
    },
    {
      id: 'personas-que-venden',
      category: 'personas',
      title: 'Las Personas que Venden: Doña Vivi y su Familia',
      subtitle: 'Atención cálida, recetas tradicionales y dedicación diaria',
      image: VIVI_SELLER_PHOTO || VIVI_PHOTO,
      badge: '👩‍🍳 La Persona que Vende',
      description:
        'Doña Viviana (Vivi) y su equipo familiar reciben a los vecinos de toda la vida desde las 6:30 de la mañana. Con mate en mano, delantal de panadera y toda la paciencia para armarte la docena de facturas más fresca o recomendarte el mejor pernil del día.',
      details: {
        personas: 'Doña Vivi atiende con calidez, siempre atenta a preparar cada pedido a gusto.',
        mesas: 'Mostrador de madera con canastitas de degustación y servilleteros.',
        paredes: 'Paredes cálidas con azulejos de cocina y diplomas de maestros pasteleros.',
        pisos: 'Pisos impecables, listos para la faena desde la madrugada.',
      },
    },
    {
      id: 'las-mesas-y-cafe',
      category: 'mesas',
      title: 'Las Mesas de Panadería Vivi',
      subtitle: 'Madera noble rústica, café con leche humeante y panera abundante',
      image: VIVI_TABLES_PHOTO,
      badge: '🪑 Las Mesas & El Rincón de Café',
      description:
        'Nuestras mesas de madera maciza artesanal invitan a sentarse sin apuro. Sobre cada mesa descansa una canastita de mimbre con panes de campo recién tostados, medialunas y café caliente. Alrededor, sillas de madera de campo con mantas tejidas para los días frescos.',
      details: {
        mesas: 'Mesas y bancos de madera noble rústica, trabajadas a mano con acabado encerado.',
        paredes: 'Paredes de ladrillo a la vista con cuadros antiguos de la panadería y pizarrón de tiza.',
        pisos: 'Piso de mosaico colonial y terracota artesanal de época.',
        personas: 'Lugar de encuentro para vecinos, familias y amantes del buen pan.',
      },
    },
    {
      id: 'la-mesa-especial-vivi',
      category: 'mesas',
      title: 'La Mesa de Doña Vivi con su Mantel',
      subtitle: 'La mesa donde reposan los panes, empanadas y churros del día',
      image: VIVI_TABLE_PHOTO,
      badge: '🌟 La Mesa de Doña Vivi',
      description:
        'Sobre la icónica mesa con mantel descansan las joyas recién horneadas: panes de campo redondos con masa madre, empanadas doradas en horno a leña y churros crocantes rebosantes de dulce de leche.',
      details: {
        mesas: 'Mesa de campo amplia donde Doña Vivi dispone las muestras y combos del día.',
        paredes: 'Ambiente acogedor iluminado por lámparas colgantes de cobre.',
        pisos: 'Piso de baldosas rústicas con pátina histórica.',
        personas: 'El punto de encuentro donde Doña Vivi prepara los pedidos especiales.',
      },
    },
    {
      id: 'obrador-paredes-horno',
      category: 'horno',
      title: 'El Gran Obrador: El Horno a Leña y las Paredes de Ladrillo',
      subtitle: 'La gran mesa de amasar, pisos enharinados y fuego de leña',
      image: VIVI_OVEN_WORKSHOP,
      badge: '🔥 Horno a Leña & Gran Mesa',
      description:
        'En el fondo de Panadería Vivi late el gran horno de barro y ladrillos refractarios alimentado con leña de quebracho. Frente a él, la colosal mesa de amasar de madera dura enharinada donde se leudan y forman los panes sellados con el sello de "P. Vivi".',
      details: {
        paredes: 'Paredes macizas de piedra y ladrillo rústico, con palas panaderas y balanzas de bronce.',
        pisos: 'Pisos de losetas de terracota con el polvillo blanco de la harina recién tamizada.',
        mesas: 'Enorme mesa de trabajo de madera enharinada donde se bolean y estiran las masas.',
        personas: 'Maestros panaderos trabajando con palas al horno ardiente.',
      },
    },
    {
      id: 'paredes-y-pisos-detalle',
      category: 'paredes',
      title: 'Las Paredes, Sus Pisos y Sus Cosas',
      subtitle: 'Detalles auténticos: ladrillo visto, pisos damero y atmósfera de barrio',
      image: VIVI_SALON_WALLS_FLOORS,
      badge: '🧱 Paredes & Pisos',
      description:
        'Cada rincón de Panadería Vivi fue pensado para evocar las panaderías de tradición: las paredes de ladrillo rojo quemado a la vista, las repisas flotantes con canastas de mimbre, el contraste del piso en damero y las luces tenues que resaltan el dorado de las costras.',
      details: {
        paredes: 'Ladrillos a la vista con junta rústica, pizarras con precios y repisas de pino.',
        pisos: 'Pisos de damero negro y blanco combinados con baldosas de barro cocido.',
        mesas: 'Vitrinas de mostrador con repisas de cristal templado y marcos de madera lustrada.',
        personas: 'Todo atendido con el corazón por Vivi y sus panaderos de oficio.',
      },
    },
  ];

  const filteredFeatures =
    activeTab === 'todos'
      ? features
      : features.filter((f) => {
          if (activeTab === 'personas') return f.category === 'personas' || f.id === 'personas-que-venden';
          if (activeTab === 'paredes') return f.category === 'paredes' || f.id === 'obrador-paredes-horno' || f.id === 'salon-principal';
          if (activeTab === 'pisos') return f.category === 'paredes' || f.id === 'salon-principal' || f.id === 'obrador-paredes-horno';
          if (activeTab === 'mesas') return f.category === 'mesas' || f.id === 'la-mesa-especial-vivi' || f.id === 'las-mesas-y-cafe';
          if (activeTab === 'horno') return f.category === 'horno';
          return true;
        });

  return (
    <section className="bg-gradient-to-b from-[#FAF7F2] via-[#F4EADE] to-[#FAF7F2] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#E3D3C2]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Title with Persona, Mesas, Paredes & Pisos */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C271E]/10 border border-[#8C271E]/30 text-[#8C271E] text-xs font-bold tracking-wide">
            <Heart className="w-4 h-4 fill-[#8C271E]" />
            <span>El Encanto Auténtico de Panadería Vivi</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810]">
            Así es Panadería Vivi: Las Personas, Sus Mesas, Paredes y Pisos
          </h2>

          <p className="text-sm sm:text-base text-[#6E4B35] leading-relaxed">
            Te abrimos las puertas de nuestro local: conocé a las personas que te atienden cada mañana,
            nuestras mesas de madera donde saborear facturas calientes, las paredes de ladrillo con olor a leña y los pisos tradicionales en damero.
          </p>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              type="button"
              onClick={() => setActiveTab('todos')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                activeTab === 'todos'
                  ? 'bg-[#8C271E] text-white shadow-md'
                  : 'bg-white text-[#5C3E2D] hover:bg-amber-100/70 border border-[#E0CFBD]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Ver Todo el Local</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('personas')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                activeTab === 'personas'
                  ? 'bg-[#8C271E] text-white shadow-md'
                  : 'bg-white text-[#5C3E2D] hover:bg-amber-100/70 border border-[#E0CFBD]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Las Personas que Venden (Vivi)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('mesas')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                activeTab === 'mesas'
                  ? 'bg-[#8C271E] text-white shadow-md'
                  : 'bg-white text-[#5C3E2D] hover:bg-amber-100/70 border border-[#E0CFBD]'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Las Mesas & Mostradores</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('paredes')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                activeTab === 'paredes'
                  ? 'bg-[#8C271E] text-white shadow-md'
                  : 'bg-white text-[#5C3E2D] hover:bg-amber-100/70 border border-[#E0CFBD]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Las Paredes de Ladrillo & Pizarras</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pisos')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                activeTab === 'pisos'
                  ? 'bg-[#8C271E] text-white shadow-md'
                  : 'bg-white text-[#5C3E2D] hover:bg-amber-100/70 border border-[#E0CFBD]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Los Pisos en Damero & Terracota</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('horno')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                activeTab === 'horno'
                  ? 'bg-[#8C271E] text-white shadow-md'
                  : 'bg-white text-[#5C3E2D] hover:bg-amber-100/70 border border-[#E0CFBD]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>El Horno a Leña & Obrador</span>
            </button>
          </div>
        </div>

        {/* Highlight Banner: De la Mesa de Doña Vivi a tu Casa */}
        <div className="bg-gradient-to-r from-[#2C1810] to-[#452718] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Especial de Doña Vivi</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
              Combo "De la Mesa de Vivi a Tu Casa"
            </h3>
            <p className="text-sm text-stone-300 max-w-2xl">
              1 Pan de Campo de masa madre + 1/2 Docena de Churros con Dulce de Leche + 6 Empanadas Criollas al horno de barro. ¡Preparado especialmente sobre nuestra mesa!
            </p>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-300">$14.800</span>
              <span className="text-sm text-stone-400 line-through">$17.200</span>
              <span className="text-xs bg-emerald-700/80 text-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                Ahorrás $2.400
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={onBuyMesaSpecialty}
              className={`px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 ${
                isMesaAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#D97724] hover:bg-[#BF641B] text-white'
              }`}
            >
              {isMesaAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>¡Agregado a la Canasta!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Comprar Combo de la Mesa</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onExploreMenu}
              className="px-5 py-3.5 rounded-2xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-amber-100 border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Ver Menú Completo</span>
            </button>
          </div>
        </div>

        {/* Interactive Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFeatures.map((feat) => (
            <div
              key={feat.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E2D2BF] shadow-lg shadow-amber-950/5 hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col group"
            >
              {/* Photo Header */}
              <div
                className="relative aspect-4/3 overflow-hidden bg-stone-900 cursor-pointer"
                onClick={() => setSelectedPhotoModal(feat)}
              >
                <img
                  src={feat.image}
                  alt={feat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8C271E] text-white shadow-md flex items-center gap-1.5">
                    {feat.badge}
                  </span>
                </div>

                {/* Zoom icon hint */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhotoModal(feat);
                  }}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center opacity-80 group-hover:opacity-100 hover:scale-110 transition-all"
                  title="Ver en grande"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Content Card */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#2C1810] group-hover:text-[#8C271E] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#D97724]">
                    {feat.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5C3E2D] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Specific architectural breakdown pills */}
                <div className="space-y-1.5 pt-2 border-t border-[#F0E4D5] text-xs text-[#523321]">
                  {feat.details.paredes && (
                    <div className="flex items-start gap-1.5 bg-[#FAF5EE] p-2 rounded-xl">
                      <span className="font-bold text-[#8C271E] shrink-0">🧱 Paredes:</span>
                      <span className="text-stone-700">{feat.details.paredes}</span>
                    </div>
                  )}

                  {feat.details.pisos && (
                    <div className="flex items-start gap-1.5 bg-[#FAF5EE] p-2 rounded-xl">
                      <span className="font-bold text-[#8C271E] shrink-0">🏁 Pisos:</span>
                      <span className="text-stone-700">{feat.details.pisos}</span>
                    </div>
                  )}

                  {feat.details.mesas && (
                    <div className="flex items-start gap-1.5 bg-[#FAF5EE] p-2 rounded-xl">
                      <span className="font-bold text-[#8C271E] shrink-0">🪑 Mesas:</span>
                      <span className="text-stone-700">{feat.details.mesas}</span>
                    </div>
                  )}

                  {feat.details.personas && (
                    <div className="flex items-start gap-1.5 bg-[#FAF5EE] p-2 rounded-xl">
                      <span className="font-bold text-[#8C271E] shrink-0">👥 Personas:</span>
                      <span className="text-stone-700">{feat.details.personas}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPhotoModal(feat)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#F4EADE] text-[#5C3E2D] hover:bg-[#EADDCC] hover:text-[#2C1810] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Ver Detalles & Foto Completa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Full View */}
      {selectedPhotoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-700 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#2C1810] text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-300 block">
                  {selectedPhotoModal.badge}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold">
                  {selectedPhotoModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhotoModal(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-16/9 bg-stone-900 overflow-hidden shrink-0">
              <img
                src={selectedPhotoModal.image}
                alt={selectedPhotoModal.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Modal Content Scrollable */}
            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-sm sm:text-base text-[#4A2D1B] leading-relaxed">
                {selectedPhotoModal.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {selectedPhotoModal.details.paredes && (
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                    <span className="font-bold text-xs text-[#8C271E] block uppercase">
                      🧱 Paredes
                    </span>
                    <p className="text-xs text-stone-700 mt-1">
                      {selectedPhotoModal.details.paredes}
                    </p>
                  </div>
                )}

                {selectedPhotoModal.details.pisos && (
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                    <span className="font-bold text-xs text-[#8C271E] block uppercase">
                      🏁 Pisos
                    </span>
                    <p className="text-xs text-stone-700 mt-1">
                      {selectedPhotoModal.details.pisos}
                    </p>
                  </div>
                )}

                {selectedPhotoModal.details.mesas && (
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                    <span className="font-bold text-xs text-[#8C271E] block uppercase">
                      🪑 Mesas
                    </span>
                    <p className="text-xs text-stone-700 mt-1">
                      {selectedPhotoModal.details.mesas}
                    </p>
                  </div>
                )}

                {selectedPhotoModal.details.personas && (
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                    <span className="font-bold text-xs text-[#8C271E] block uppercase">
                      👥 Personas que Venden
                    </span>
                    <p className="text-xs text-stone-700 mt-1">
                      {selectedPhotoModal.details.personas}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onBuyMesaSpecialty}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#D97724] hover:bg-[#BF641B] text-white flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Comprar Combo de la Mesa ($14.800)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPhotoModal(null)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
