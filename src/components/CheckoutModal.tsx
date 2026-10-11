import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { BAKERY_INFO } from '../data/products';
import {
  X,
  Store,
  Bike,
  Banknote,
  CreditCard,
  QrCode,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryType: 'takeaway' | 'delivery';
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  onOrderCompleted: (order: OrderDetails, sendWhatsAppNow: boolean) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  deliveryType,
  subtotal,
  discount,
  deliveryFee,
  total,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressNotes, setAddressNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'transferencia' | 'tarjeta'>('efectivo');
  const [cashAmount, setCashAmount] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Por favor ingresá tu nombre';
    if (!phone.trim() || phone.trim().length < 8) errs.phone = 'Ingresá un número de teléfono / WhatsApp válido';
    if (deliveryType === 'delivery' && !address.trim()) {
      errs.address = 'La dirección de entrega es obligatoria para envíos a domicilio';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmOrder = (sendWhatsApp: boolean) => {
    if (!validate()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `VIVI-${randomSuffix}`;

    const orderData: OrderDetails = {
      orderId,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerAddress: deliveryType === 'delivery' ? `${address.trim()} ${addressNotes ? `(${addressNotes.trim()})` : ''}` : undefined,
      deliveryType,
      paymentMethod,
      notes: generalNotes.trim() || undefined,
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      createdAt: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      status: 'confirmado',
    };

    onOrderCompleted(orderData, sendWhatsApp);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E0D2C3] flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E6D7C7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D97724] text-white flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C1810]">
                Finalizar Pedido
              </h3>
              <p className="text-xs text-[#8C6D58]">
                {deliveryType === 'delivery' ? 'Envío a domicilio' : 'Retiro en Panadería Vivi'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Order Summary Pill */}
          <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 flex items-center justify-between text-xs sm:text-sm">
            <div>
              <span className="font-semibold text-amber-900 block">
                Total del Pedido ({items.length} {items.length === 1 ? 'producto' : 'productos'})
              </span>
              <span className="text-amber-700 text-xs">
                {deliveryType === 'delivery' ? 'Incluye costo de envío' : 'Listo para retirar en el local'}
              </span>
            </div>
            <span className="font-mono text-xl font-bold text-[#8C271E]">
              ${total.toLocaleString('es-AR')}
            </span>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C271E]">
              1. Tus Datos de Contacto
            </h4>

            <div>
              <label className="text-xs font-semibold text-[#4A2D1B] block mb-1">
                Nombre y Apellido *
              </label>
              <input
                type="text"
                placeholder="Ej. Martín Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3.5 py-2.5 bg-white border rounded-2xl text-sm placeholder-stone-400 text-[#2C1810] focus:outline-hidden focus:ring-2 ${
                  errors.name ? 'border-rose-500 focus:ring-rose-200' : 'border-[#E0D2C3] focus:ring-amber-400'
                }`}
              />
              {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-[#4A2D1B] block mb-1">
                Teléfono o WhatsApp * (para avisarte cuando esté listo)
              </label>
              <input
                type="tel"
                placeholder="Ej. 11 4589-2040"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-3.5 py-2.5 bg-white border rounded-2xl text-sm placeholder-stone-400 text-[#2C1810] focus:outline-hidden focus:ring-2 ${
                  errors.phone ? 'border-rose-500 focus:ring-rose-200' : 'border-[#E0D2C3] focus:ring-amber-400'
                }`}
              />
              {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Delivery Address (if Delivery) */}
          {deliveryType === 'delivery' ? (
            <div className="space-y-3 pt-2 border-t border-[#EADBCC]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C271E] flex items-center gap-1.5">
                <Bike className="w-4 h-4" />
                <span>2. Dirección de Entrega</span>
              </h4>

              <div>
                <label className="text-xs font-semibold text-[#4A2D1B] block mb-1">
                  Calle y Altura *
                </label>
                <input
                  type="text"
                  placeholder="Ej. Av. Corrientes 3450"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-2xl text-sm placeholder-stone-400 text-[#2C1810] focus:outline-hidden focus:ring-2 ${
                    errors.address ? 'border-rose-500 focus:ring-rose-200' : 'border-[#E0D2C3] focus:ring-amber-400'
                  }`}
                />
                {errors.address && <p className="text-xs text-rose-600 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-[#4A2D1B] block mb-1">
                  Piso / Depto / Entre Calles / Timbre (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Piso 4 B, entre Billinghurst y Sánchez de Bustamante"
                  value={addressNotes}
                  onChange={(e) => setAddressNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E0D2C3] rounded-2xl text-sm placeholder-stone-400 text-[#2C1810] focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-[#FAF0E4] rounded-2xl border border-[#E8D6C3] flex items-start gap-2.5 text-xs text-[#523522]">
              <Store className="w-4 h-4 text-[#D97724] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Punto de Retiro: Panadería Vivi</span>
                <span>{BAKERY_INFO.address}. Tu pedido estará listo en aproximadamente 20 a 30 minutos.</span>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="space-y-3 pt-2 border-t border-[#EADBCC]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C271E]">
              {deliveryType === 'delivery' ? '3. Forma de Pago' : '2. Forma de Pago'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('efectivo')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'efectivo'
                    ? 'bg-white border-[#8C271E] ring-2 ring-[#8C271E]/20 text-[#2C1810]'
                    : 'bg-white/60 hover:bg-white border-[#E0D2C3] text-[#5C3F2E]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold">Efectivo</span>
                </div>
                <span className="text-[11px] text-stone-500">Al recibir / retirar</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('transferencia')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'transferencia'
                    ? 'bg-white border-[#8C271E] ring-2 ring-[#8C271E]/20 text-[#2C1810]'
                    : 'bg-white/60 hover:bg-white border-[#E0D2C3] text-[#5C3F2E]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <QrCode className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold">Transferencia</span>
                </div>
                <span className="text-[11px] text-stone-500">Mercado Pago / Alias</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('tarjeta')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'tarjeta'
                    ? 'bg-white border-[#8C271E] ring-2 ring-[#8C271E]/20 text-[#2C1810]'
                    : 'bg-white/60 hover:bg-white border-[#E0D2C3] text-[#5C3F2E]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold">Tarjeta</span>
                </div>
                <span className="text-[11px] text-stone-500">Débito o Crédito</span>
              </button>
            </div>

            {/* Payment details helper */}
            {paymentMethod === 'efectivo' && (
              <div className="p-3 bg-white rounded-2xl border border-stone-200">
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  ¿Con cuánto vas a pagar? (Para preparar el vuelto)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Pago justo / Pago con $20.000"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#2C1810]"
                />
              </div>
            )}

            {paymentMethod === 'transferencia' && (
              <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 text-xs text-blue-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-blue-600" />
                  <span>Datos de Transferencia Bancaria</span>
                </div>
                <p><strong>Alias MP:</strong> <code className="bg-white px-2 py-0.5 rounded font-mono border border-blue-200">panaderia.vivi.mp</code></p>
                <p><strong>Titular:</strong> Viviana S. Martínez - Panadería Vivi</p>
                <p className="text-[11px] text-blue-800">Al confirmar, podrás enviar el comprobante por WhatsApp.</p>
              </div>
            )}
          </div>

          {/* General Notes */}
          <div className="space-y-1 pt-2 border-t border-[#EADBCC]">
            <label className="text-xs font-semibold text-[#4A2D1B] block">
              Notas adicionales para Panadería Vivi (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej. Por favor enviar servilletas, tocar timbre fuerte..."
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-[#E0D2C3] rounded-2xl text-xs placeholder-stone-400 text-[#2C1810]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E6D7C7] flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => handleConfirmOrder(true)}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 active:scale-98 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Confirmar y Enviar a WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => handleConfirmOrder(false)}
            className="py-3.5 px-5 rounded-2xl bg-[#8C271E] hover:bg-[#721F18] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <span>Confirmar en la Web</span>
          </button>
        </div>
      </div>
    </div>
  );
};
