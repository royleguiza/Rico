import React, { useState } from 'react';
import {
  BAKERY_INFO,
  BAKERY_HOURS,
  VIVI_PHOTO,
  VIVI_TABLE_PHOTO,
  VIVI_SALON_WALLS_FLOORS,
  VIVI_TABLES_PHOTO,
} from '../data/products';
import {
  Heart,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  HelpCircle,
  ChefHat,
  Award,
  Sparkles,
  Globe,
  Copy,
  Check,
} from 'lucide-react';

export const AboutAndFooter: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('https://panaderia-vivi.com');
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const reviews = [
    {
      author: 'Graciela Fernández',
      text: 'Los mejores churros y bolitas de fraile con dulce de leche de toda la zona. Salen calentitos a las cinco de la tarde y la masa es súper suave.',
      rating: 5,
      item: 'Churros & Bolitas de Fraile'
    },
    {
      author: 'Esteban Morales',
      text: 'Encargué un pernil asado con los pancitos y las salsas para el cumpleaños de mi papá. La carne tiernísima, se deshacía sola. Un 10 rotundo.',
      rating: 5,
      item: 'Pernil de Cerdo Braseado'
    },
    {
      author: 'Noelia Romero',
      text: 'La sopa paraguaya es idéntica a la que hacía mi abuela en Misiones: queso abundante y bien doradita. Y el pan con chicharrón es adictivo.',
      rating: 5,
      item: 'Sopa Paraguaya & Pan con Chicharrón'
    }
  ];

  const faqs = [
    {
      q: '¿A qué hora salen las facturas y panes más calientes?',
      a: 'Nuestra primera horneada de facturas sale a las 07:00 hs de la mañana. Al mediodía (11:30 hs) sale el pan criollo y la rotisería, y a las 16:30 hs los churros y bolitas recién fritas.'
    },
    {
      q: '¿Con cuánta anticipación debo pedir el Pernil para eventos?',
      a: 'Recomendamos encargar los perniles enteros para 15 a 20 personas con al menos 24 a 48 hs de antelación para asegurar su adobado prolongado de 24 horas y cocción lenta.'
    },
    {
      q: '¿Hacen envíos a domicilio los fines de semana?',
      a: '¡Sí! Realizamos envíos de lunes a sábados durante todo el día, y los domingos de 07:00 a 14:00 hs para acompañar tu almuerzo o desayuno familiar.'
    }
  ];

  return (
    <footer className="bg-[#261710] text-[#EFE4D8] border-t border-[#3D251A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#341F16] rounded-3xl p-6 sm:p-10 border border-white/5">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Nuestra Historia & Pasión Artesanal</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Panadería Vivi: El auténtico sabor de familia
            </h2>
            <p className="text-sm text-[#D7C3B3] leading-relaxed">
              Nacimos con el sueño de Doña Vivi de rescatar las recetas de panadería tradicional: medialunas con manteca de verdad almibaradas al salir de la chapa, bolitas de fraile con abundante dulce de leche colonial, masa madre con lenta fermentación y platos de rotisería criolla que unen a la mesa familiar, como nuestra célebre sopa paraguaya y el matambre casero al horno.
            </p>
            <p className="text-xs text-amber-200/90 italic bg-black/25 p-3 rounded-xl border border-white/10">
              "En mi mesa se amasa todos los días con cariño para que en tu casa nunca falte el pan caliente." — Doña Vivi
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-md group">
              <img
                src={VIVI_PHOTO}
                alt="Doña Vivi atendiendo en su panadería"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded font-bold">
                Doña Vivi (Dueña)
              </span>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-md group">
              <img
                src={VIVI_TABLE_PHOTO}
                alt="La mesa de Vivi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded font-bold">
                La Mesa Especial
              </span>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-md group">
              <img
                src={VIVI_SALON_WALLS_FLOORS}
                alt="Las paredes de ladrillo y pisos de Panadería Vivi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded font-bold">
                Paredes & Pisos Damero
              </span>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-md group">
              <img
                src={VIVI_TABLES_PHOTO}
                alt="Las mesas de madera rústica del salón de Vivi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded font-bold">
                Mesas & Salón de Café
              </span>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              La Opinión de Nuestros Clientes
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Lo que dice el barrio sobre Vivi
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-[#311D14] p-5 rounded-2xl border border-white/5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#DCCBC0] italic">
                    "{r.text}"
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{r.author}</span>
                  <span className="text-amber-300 font-mono text-[11px]">{r.item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Dudas Frecuentes
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Preguntas sobre pedidos y horneadas
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-[#2D1B13] p-5 rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <h4 className="text-xs font-bold text-white">{f.q}</h4>
                </div>
                <p className="text-xs text-[#B8A395] leading-relaxed pl-6">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Store Info Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-white/10 text-xs text-[#B8A395]">
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-white">Panadería Vivi</h4>
            <p className="leading-relaxed">
              Panadería, confitería y rotisería criolla. Horneamos a diario con materias primas nobles y recetas de toda la vida.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold uppercase tracking-wider text-amber-400 text-[11px]">
              Horarios de Atención
            </h5>
            <p className="flex items-center gap-1.5 text-white">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Lun a Sáb: {BAKERY_HOURS.weekdays}
            </p>
            <p className="flex items-center gap-1.5 text-white">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Domingos: {BAKERY_HOURS.sundays}
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold uppercase tracking-wider text-amber-400 text-[11px]">
              Ubicación & Local
            </h5>
            <p className="flex items-start gap-1.5 text-white">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{BAKERY_INFO.address}</span>
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold uppercase tracking-wider text-amber-400 text-[11px]">
              Contacto Directo
            </h5>
            <p className="flex items-center gap-1.5 text-white">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> {BAKERY_INFO.phone}
            </p>
            <a
              href={`https://wa.me/5491145892040?text=Hola%20Panaderia%20Vivi`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Directo
            </a>
          </div>
        </div>

        {/* Official Website Banner */}
        <div className="bg-[#2D1B13] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Sitio Web Oficial de Panadería Vivi</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Verificado SSL
                </span>
              </div>
              <p className="text-[#B8A395] text-[11px] font-mono mt-0.5">
                https://panaderia-vivi.com
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 rounded-xl font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs"
          >
            {copiedUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>¡URL Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar https://panaderia-vivi.com</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center pt-4 border-t border-white/5 text-stone-500 text-xs">
          © {new Date().getFullYear()} Panadería Vivi (<strong>https://panaderia-vivi.com</strong>). Todos los derechos reservados. Sabor artesanal, hornadas calientes y calidez familiar.
        </div>
      </div>
    </footer>
  );
};
