import React, { useState, useEffect } from 'react';
import { OrderDetails, CartItem } from '../types';
import { BAKERY_INFO } from '../data/products';
import {
  X,
  CheckCircle2,
  Flame,
  Package,
  Bike,
  Store,
  MessageCircle,
  Copy,
  Sparkles,
  Smartphone,
  Edit3,
  Save,
  Phone,
  Plus,
  Minus,
  Trash2,
  RotateCcw,
  AlertCircle,
  Check,
  Send,
  MapPin,
} from 'lucide-react';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  onClose: () => void;
  onNewOrder: () => void;
  onUpdateOrder?: (updatedOrder: OrderDetails) => void;
  onEditOrderInCart?: (order: OrderDetails) => void;
  initialTab?: 'ticket' | 'modificar_celular';
}

const ORDER_STEPS = [
  { id: 'confirmado', label: 'Pedido Recibido', icon: CheckCircle2, desc: 'Doña Vivi confirmó tu pedido en cocina.' },
  { id: 'en_horno', label: 'En el Horno / Cocina', icon: Flame, desc: 'Tus productos se están horneando y preparando bien calientes.' },
  { id: 'empaquetando', label: 'Empaquetando con Amor', icon: Package, desc: 'Empacamos todo con cuidado para conservar el calor y aroma.' },
  { id: 'listo', label: 'Listo para Disfrutar', icon: Bike, desc: 'Tu pedido está listo para retirar o en camino a tu domicilio.' },
];

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onNewOrder,
  onUpdateOrder,
  onEditOrderInCart,
  initialTab = 'ticket',
}) => {
  if (!order) return null;

  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'ticket' | 'modificar_celular'>(initialTab);

  // Sync tab if initialTab changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Modification State for the Phone / Order
  const [editPhone, setEditPhone] = useState(order.customerPhone || '');
  const [editName, setEditName] = useState(order.customerName || '');
  const [editAddress, setEditAddress] = useState(order.customerAddress || '');
  const [editNotes, setEditNotes] = useState(order.notes || '');
  const [editItems, setEditItems] = useState<CartItem[]>(order.items || []);
  const [modificationSaved, setModificationSaved] = useState(false);

  // Sync state if order changes
  useEffect(() => {
    if (order) {
      setEditPhone(order.customerPhone || '');
      setEditName(order.customerName || '');
      setEditAddress(order.customerAddress || '');
      setEditNotes(order.notes || '');
      setEditItems(order.items || []);
    }
  }, [order]);

  // Auto-progress simulated steps for delight
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStepIndex(2); // Empaquetando
    }, 15000);

    const timer2 = setTimeout(() => {
      setCurrentStepIndex(3); // Listo
    }, 30000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Recalculate edited order financials
  const editSubtotal = editItems.reduce((acc, it) => acc + it.itemTotalPrice, 0);
  const editTotal = Math.max(0, editSubtotal - (order.discount || 0) + (order.deliveryFee || 0));

  const handleUpdateItemQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setEditItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
      return;
    }
    setEditItems((prev) =>
      prev.map((it) => {
        if (it.cartItemId === cartItemId) {
          const unitPrice = it.itemTotalPrice / it.quantity;
          const clamped = Math.min(100, newQty);
          return {
            ...it,
            quantity: clamped,
            itemTotalPrice: unitPrice * clamped,
          };
        }
        return it;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setEditItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  // Save changes to current order
  const handleSaveModification = () => {
    const updatedOrder: OrderDetails = {
      ...order,
      customerPhone: editPhone.trim(),
      customerName: editName.trim(),
      customerAddress: editAddress.trim(),
      notes: editNotes.trim(),
      items: editItems,
      subtotal: editSubtotal,
      total: editTotal,
    };

    if (onUpdateOrder) {
      onUpdateOrder(updatedOrder);
    }

    setModificationSaved(true);
    setTimeout(() => {
      setModificationSaved(false);
      setActiveTab('ticket');
    }, 1800);
  };

  // Format WhatsApp modification message
  const generateModificationWhatsApp = () => {
    const itemsList = editItems
      .map((it) => `• ${it.quantity}x ${it.product.name} ($${it.itemTotalPrice.toLocaleString('es-AR')})`)
      .join('\n');

    const msg = `⚠️ *¡MODIFICACIÓN DE PEDIDO EN PANADERÍA VIVI!* 📱\n\n` +
      `*Web Oficial:* https://panaderia-vivi.com\n` +
      `*Orden Original:* #${order.orderId}\n` +
      `*Cliente:* ${editName}\n` +
      `*Nuevo Celular de Contacto:* ${editPhone}\n` +
      (editAddress ? `*Dirección Actualizada:* ${editAddress}\n` : '') +
      `\n*Pedido Modificado en el Celular:*\n${itemsList}\n\n` +
      `*NUEVO TOTAL:* $${editTotal.toLocaleString('es-AR')}\n` +
      (editNotes ? `*Cambios / Aclaraciones:* ${editNotes}\n\n` : '\n') +
      `Por favor confirmar la modificación en el local. ¡Muchas gracias Doña Vivi! 🙏`;

    return encodeURIComponent(msg);
  };

  // Format standard WhatsApp message
  const generateWhatsAppMessage = () => {
    const itemsList = order.items
      .map((it) => `• ${it.quantity}x ${it.product.name} ($${it.itemTotalPrice.toLocaleString('es-AR')})`)
      .join('\n');

    const msg = `🥖 *¡NUEVO PEDIDO EN PANADERÍA VIVI!* 🥐\n\n` +
      `*Web Oficial:* https://panaderia-vivi.com\n` +
      `*Orden:* #${order.orderId}\n` +
      `*Cliente:* ${order.customerName}\n` +
      `*Teléfono:* ${order.customerPhone}\n` +
      `*Modalidad:* ${order.deliveryType === 'delivery' ? 'Envío a Domicilio' : 'Retiro en Panadería Vivi'}\n` +
      (order.customerAddress ? `*Dirección:* ${order.customerAddress}\n` : '') +
      `*Forma de pago:* ${order.paymentMethod.toUpperCase()}\n\n` +
      `*Detalle del Pedido:*\n${itemsList}\n\n` +
      `*TOTAL:* $${order.total.toLocaleString('es-AR')}\n\n` +
      `¡Muchas gracias Doña Vivi!`;

    return encodeURIComponent(msg);
  };

  const handleCopySummary = () => {
    const textToCopy = `Orden #${order.orderId} en Panadería Vivi (https://panaderia-vivi.com) - Celular: ${order.customerPhone} - Total: $${order.total.toLocaleString('es-AR')} - Cliente: ${order.customerName}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E0D2C3] flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200">
        {/* Header with Switcher Tabs */}
        <div className="bg-gradient-to-r from-[#8C271E] to-[#B3392B] p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-amber-200 text-xs font-semibold backdrop-blur-xs mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Orden Registrada en Panadería Vivi</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            ¡Gracias, {order.customerName.split(' ')[0]}!
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 mt-0.5">
            Orden <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">#{order.orderId}</span> · Celular: <strong className="font-mono">{order.customerPhone}</strong>
          </p>

          {/* Navigation Tabs between Ticket & Phone Modification */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-white/20">
            <button
              type="button"
              onClick={() => setActiveTab('ticket')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'ticket'
                  ? 'bg-white text-[#8C271E] shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Estado & Ticket</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('modificar_celular')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'modificar_celular'
                  ? 'bg-amber-300 text-[#8C271E] shadow-md ring-2 ring-white/30'
                  : 'bg-white/20 text-amber-200 hover:bg-white/30 font-bold'
              }`}
            >
              <Smartphone className="w-4 h-4 animate-bounce" />
              <span>📱 Modificación en el Celular</span>
            </button>
          </div>
        </div>

        {/* TAB 1: TICKET & TRACKER VIEW */}
        {activeTab === 'ticket' && (
          <>
            {/* Tracking Live Timeline */}
            <div className="p-4 sm:p-5 bg-white border-b border-[#E8DACB]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C271E] mb-3 flex items-center justify-between">
                <span>Estado del Pedido en Tiempo Real</span>
                <span className="font-mono text-stone-500 font-normal">Hora: {order.createdAt}</span>
              </h3>

              <div className="grid grid-cols-4 gap-2 relative">
                {ORDER_STEPS.map((step, idx) => {
                  const isPassed = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.id} className="flex flex-col items-center text-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          isCurrent
                            ? 'bg-[#D97724] text-white ring-4 ring-[#D97724]/20 scale-110'
                            : isPassed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-200 text-stone-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-[11px] font-bold mt-2 leading-tight ${
                          isPassed ? 'text-[#2C1810]' : 'text-stone-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Current Step Explanation */}
              <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
                <span>{ORDER_STEPS[currentStepIndex].desc}</span>
              </div>
            </div>

            {/* Scrollable Receipt Details */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
              {/* Quick modification banner */}
              <div className="p-3.5 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-2xl flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D97724] text-white flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#8C271E] block">
                      ¿Necesitás cambiar algo de tu compra?
                    </span>
                    <span className="text-stone-700">
                      Podés modificar tu celular, dirección, notas o comida pedida.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('modificar_celular')}
                  className="px-3.5 py-2 bg-[#8C271E] hover:bg-[#701E17] text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Modificar en Celular</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#EADBCC] p-4 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Resumen del Pedido
                  </span>
                  <span className="text-xs font-medium text-stone-500">
                    {order.deliveryType === 'delivery' ? 'Envío a Domicilio' : 'Retiro en Panadería Vivi'}
                  </span>
                </div>

                {/* Items list */}
                <div className="space-y-2 text-xs">
                  {order.items.map((it) => (
                    <div key={it.cartItemId} className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <span className="font-semibold text-[#2C1810]">
                          {it.quantity}x {it.product.name}
                        </span>
                        {it.selectedOptions && Object.keys(it.selectedOptions).length > 0 && (
                          <p className="text-[11px] text-stone-500">
                            {Object.values(it.selectedOptions).join(' · ')}
                          </p>
                        )}
                        {it.specialInstructions && (
                          <p className="text-[10px] text-amber-700 italic">
                            "{it.specialInstructions}"
                          </p>
                        )}
                      </div>
                      <span className="font-mono font-bold text-stone-800">
                        ${it.itemTotalPrice.toLocaleString('es-AR')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financials */}
                <div className="border-t border-stone-100 pt-2.5 space-y-1 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-mono">${order.subtotal.toLocaleString('es-AR')}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Descuento aplicado</span>
                      <span className="font-mono">-${order.discount.toLocaleString('es-AR')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>{order.deliveryType === 'delivery' ? 'Costo de envío' : 'Retiro en local'}</span>
                    <span className="font-mono">{order.deliveryFee === 0 ? 'Gratis' : `$${order.deliveryFee.toLocaleString('es-AR')}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#8C271E] pt-2 border-t border-stone-200">
                    <span>Total</span>
                    <span className="font-mono text-base">${order.total.toLocaleString('es-AR')}</span>
                  </div>
                </div>
              </div>

              {/* Details info */}
              <div className="text-xs text-[#6B4E3C] space-y-1.5 bg-[#FAF0E4] p-3.5 rounded-2xl border border-[#E9D7C3]">
                <div className="flex items-center justify-between">
                  <p>
                    <strong>Celular de Contacto:</strong> <span className="font-mono font-bold text-[#8C271E]">{order.customerPhone}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('modificar_celular')}
                    className="text-[11px] font-bold text-[#8C271E] underline cursor-pointer"
                  >
                    Cambiar Celular
                  </button>
                </div>
                <p><strong>Destinatario:</strong> {order.customerName}</p>
                {order.customerAddress && (
                  <p><strong>Dirección:</strong> {order.customerAddress}</p>
                )}
                <p><strong>Forma de Pago:</strong> {order.paymentMethod.toUpperCase()}</p>
                {order.notes && <p><strong>Nota:</strong> {order.notes}</p>}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#E6D7C7] flex flex-col sm:flex-row gap-2.5">
              <a
                href={`https://wa.me/5491145892040?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Pedido a WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setActiveTab('modificar_celular')}
                className="py-3 px-4 rounded-2xl bg-amber-100 hover:bg-amber-200 text-[#8C271E] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-amber-300"
              >
                <Smartphone className="w-4 h-4" />
                <span>Modificar en Celular</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </>
        )}

        {/* TAB 2: INTERACTIVE SMARTPHONE SCREEN FOR MODIFYING THE ORDER & PHONE */}
        {activeTab === 'modificar_celular' && (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 bg-[#F6EDE2]">
            {/* Phone Screen Mockup Container */}
            <div className="max-w-md mx-auto bg-stone-900 rounded-[2.5rem] p-3 sm:p-4 shadow-2xl border-4 border-stone-800 text-stone-900">
              {/* Smartphone Speaker Notch & Top bar */}
              <div className="flex justify-between items-center px-4 py-1.5 text-[11px] text-stone-400 font-mono">
                <span>9:41</span>
                <div className="w-20 h-4 bg-stone-950 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-stone-800" />
                </div>
                <div className="flex items-center gap-1">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Smartphone Inner Screen Content */}
              <div className="bg-[#FAF7F2] rounded-3xl overflow-hidden p-4 sm:p-5 space-y-4 border border-stone-300">
                {/* Phone screen header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DACB]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2C1810]">
                        Doña Vivi (Panadería)
                      </h4>
                      <span className="text-[10px] text-emerald-600 font-medium">● En línea en el horno</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-bold">
                    Orden #{order.orderId}
                  </span>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Hacé tu modificación en este celular:</strong> Actualizá tu número de teléfono, ajustá las cantidades de comida o cambiá los datos. Al guardar, se actualiza en el local.
                  </p>
                </div>

                {/* Form fields on the phone */}
                <div className="space-y-3 text-xs">
                  {/* Customer Cell Phone */}
                  <div>
                    <label className="font-bold text-[#8C271E] flex items-center gap-1.5 mb-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Número de Celular / WhatsApp:</span>
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="Ej: 11 4589-2040"
                      className="w-full px-3 py-2 bg-white border border-[#DECDBB] rounded-xl text-sm font-mono font-bold text-[#2C1810] focus:ring-2 focus:ring-[#D97724] focus:outline-hidden"
                    />
                    <span className="text-[10px] text-stone-500 mt-0.5 block">
                      Doña Vivi se comunicará a este número celular para avisarte cuando esté listo.
                    </span>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="font-bold text-[#5C3F2E] block mb-1">
                      Nombre del Cliente:
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#DECDBB] rounded-xl text-xs text-[#2C1810] focus:ring-2 focus:ring-[#D97724] focus:outline-hidden"
                    />
                  </div>

                  {/* Customer Address */}
                  {order.deliveryType === 'delivery' && (
                    <div>
                      <label className="font-bold text-[#5C3F2E] flex items-center gap-1 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8C271E]" />
                        <span>Dirección de Entrega:</span>
                      </label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="Calle, número, piso o depto..."
                        className="w-full px-3 py-2 bg-white border border-[#DECDBB] rounded-xl text-xs text-[#2C1810] focus:ring-2 focus:ring-[#D97724] focus:outline-hidden"
                      />
                    </div>
                  )}

                  {/* Food items editable list on the phone */}
                  <div className="space-y-2 pt-2 border-t border-[#E8DACB]">
                    <label className="font-bold text-[#8C271E] block">
                      Modificar Comidas del Pedido:
                    </label>

                    {editItems.length === 0 ? (
                      <div className="p-3 text-center text-xs text-rose-700 bg-rose-50 rounded-xl border border-rose-200">
                        No hay comidas en el pedido. Por favor agregá productos.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {editItems.map((it) => (
                          <div
                            key={it.cartItemId}
                            className="bg-white p-2.5 rounded-xl border border-[#DECDBB] flex items-center justify-between gap-2 shadow-2xs"
                          >
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-xs text-[#2C1810] block truncate">
                                {it.product.name}
                              </span>
                              <span className="font-mono text-[11px] text-[#8C271E] font-semibold">
                                ${it.itemTotalPrice.toLocaleString('es-AR')}
                              </span>
                            </div>

                            {/* Quantity controls inside phone */}
                            <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-lg border border-stone-200 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleUpdateItemQuantity(it.cartItemId, it.quantity - 1)}
                                className="w-5 h-5 rounded flex items-center justify-center bg-white text-stone-700 hover:bg-stone-200 cursor-pointer"
                                title="Restar"
                              >
                                <Minus className="w-3 h-3" />
                              </button>

                              <span className="w-6 text-center font-mono font-bold text-xs">
                                {it.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleUpdateItemQuantity(it.cartItemId, it.quantity + 1)}
                                className="w-5 h-5 rounded flex items-center justify-center bg-white text-stone-700 hover:bg-stone-200 cursor-pointer"
                                title="Sumar"
                              >
                                <Plus className="w-3 h-3" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRemoveItem(it.cartItemId)}
                                className="w-5 h-5 rounded flex items-center justify-center text-rose-500 hover:bg-rose-50 cursor-pointer ml-0.5"
                                title="Quitar"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 font-bold text-xs">
                      <span>Total Modificado:</span>
                      <span className="font-mono text-sm text-[#8C271E]">
                        ${editTotal.toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>

                  {/* Notes / Modifications explanation */}
                  <div className="pt-2 border-t border-[#E8DACB]">
                    <label className="font-bold text-[#5C3F2E] block mb-1">
                      Aclaraciones o Cambios para Doña Vivi:
                    </label>
                    <textarea
                      rows={2}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Ej: Modifiqué el celular porque cambié de chip; enviar salsa criolla picante aparte..."
                      className="w-full px-3 py-2 bg-white border border-[#DECDBB] rounded-xl text-xs text-[#2C1810] focus:ring-2 focus:ring-[#D97724] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Smartphone Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-[#E8DACB]">
                  {/* Save button */}
                  <button
                    type="button"
                    onClick={handleSaveModification}
                    className="w-full py-3 px-4 rounded-xl bg-[#8C271E] hover:bg-[#701E17] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    {modificationSaved ? (
                      <>
                        <Check className="w-4 h-4 text-amber-300" />
                        <span>¡Modificación Guardada con Éxito!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Guardar Modificación en la App</span>
                      </>
                    )}
                  </button>

                  {/* WhatsApp send modification button */}
                  <a
                    href={`https://wa.me/5491145892040?text=${generateModificationWhatsApp()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar Modificación por WhatsApp</span>
                  </a>

                  {/* Return button */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('ticket')}
                    className="w-full py-2 text-stone-600 hover:text-stone-900 text-xs font-semibold cursor-pointer text-center"
                  >
                    ← Volver al ticket y seguimiento
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
