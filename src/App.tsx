/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Product, CartItem, CategoryId, OrderDetails } from './types';
import { PRODUCTS, COMBOS, BAKERY_INFO } from './data/products';
import { matchesSearchQuery } from './utils/search';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BakeryStatus } from './components/BakeryStatus';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CombosSection } from './components/CombosSection';
import { ViviShowcase } from './components/ViviShowcase';
import { AboutAndFooter } from './components/AboutAndFooter';
import { Sparkles, ShoppingBag, Search, CheckCircle2, X, Utensils, Smartphone } from 'lucide-react';

const STORAGE_KEY_CART = 'panaderia_vivi_cart_v1';
const STORAGE_KEY_ACTIVE_ORDER = 'panaderia_vivi_active_order_v1';

export default function App() {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active placed order state
  const [activeOrder, setActiveOrder] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_ORDER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todos');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const [orderConfirmationTab, setOrderConfirmationTab] = useState<'ticket' | 'modificar_celular'>('ticket');
  const [deliveryType, setDeliveryType] = useState<'takeaway' | 'delivery'>('takeaway');
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Quick feedback state
  const [justAddedProductId, setJustAddedProductId] = useState<string | null>(null);
  const [justAddedComboId, setJustAddedComboId] = useState<string | null>(null);
  const [isMesaAdded, setIsMesaAdded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Refs for smooth scroll
  const menuSectionRef = useRef<HTMLDivElement>(null);
  const combosSectionRef = useRef<HTMLDivElement>(null);
  const viviSectionRef = useRef<HTMLDivElement>(null);
  const infoSectionRef = useRef<HTMLDivElement>(null);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save active order to local storage
  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem(STORAGE_KEY_ACTIVE_ORDER, JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem(STORAGE_KEY_ACTIVE_ORDER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeOrder]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3000);
  };

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToVivi = () => {
    viviSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuyMesaCombo = () => {
    const mesaSpecialty: Product = {
      id: 'combo-mesa-de-vivi',
      name: 'Combo "De la Mesa de Vivi a Tu Casa"',
      category: 'rotiseria',
      price: 14800,
      unit: 'surtido especial de la mesa',
      description: '1 Pan de Campo de masa madre + 1/2 Docena de Churros con DDL + 6 Empanadas Criollas al horno',
      badge: '👑 De la Mesa de Vivi',
      image: PRODUCTS.find((p) => p.id === 'pan-artesanal-surtido')?.image || PRODUCTS[0].image,
      tags: ['combo', 'mesa', 'vivi', 'pan', 'churros', 'empanadas', 'comida'],
    };

    const cartItemId = `mesa-vivi-${Date.now()}`;
    const newItem: CartItem = {
      cartItemId,
      product: mesaSpecialty,
      quantity: 1,
      selectedOptions: {
        'Selección Especial': 'Pan de campo + 6 Churros DDL + 6 Empanadas criollas',
      },
      itemTotalPrice: 14800,
    };

    setCart((prev) => [...prev, newItem]);
    setIsMesaAdded(true);
    setTimeout(() => setIsMesaAdded(false), 2500);
    showToast('¡El combo de la Mesa de Vivi fue agregado a tu canasta!');
  };

  // When search query is entered, auto-reset category to 'todos' and scroll down
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setSelectedCategory('todos');
      setSelectedTag(null);
    }
  };

  // Deduplicate products to guarantee strictly unique keys across the application
  const uniqueProducts = useMemo(() => {
    const map = new Map<string, Product>();
    PRODUCTS.forEach((p) => {
      if (!map.has(p.id)) {
        map.set(p.id, p);
      }
    });
    return Array.from(map.values());
  }, []);

  // Product counts per category
  const productCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      todos: uniqueProducts.length,
      panes: 0,
      facturas: 0,
      'churros-bolitas': 0,
      rotiseria: 0,
      'pizzas-empanadas': 0,
      tartas: 0,
      sandwiches: 0,
      dulces: 0,
    };

    uniqueProducts.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });

    return counts;
  }, [uniqueProducts]);

  // Search results across ALL products (for dropdown and catalog)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return uniqueProducts;
    return uniqueProducts.filter((product) => matchesSearchQuery(product, searchQuery));
  }, [uniqueProducts, searchQuery]);

  // Filtered products for catalog
  const filteredProducts = useMemo(() => {
    return uniqueProducts.filter((product) => {
      // 1. Search Query filter (matchesSearchQuery handles "comida", accents, synonyms, etc.)
      if (searchQuery.trim() && !matchesSearchQuery(product, searchQuery)) {
        return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'todos' && product.category !== selectedCategory) {
        return false;
      }

      // 3. Tag filter
      if (selectedTag) {
        if (selectedTag === 'recien_salido' && product.stockStatus !== 'recien_salido') {
          return false;
        }
        if (selectedTag === 'popular' && !product.popular) {
          return false;
        }
        if (
          selectedTag === 'mate' &&
          !product.tags.includes('mate') &&
          !product.tags.includes('desayuno') &&
          !product.tags.includes('merienda')
        ) {
          return false;
        }
        if (selectedTag === 'rotiseria' && product.category !== 'rotiseria') {
          return false;
        }
      }

      return true;
    });
  }, [uniqueProducts, selectedCategory, searchQuery, selectedTag]);

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, it) => acc + it.itemTotalPrice, 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, it) => acc + it.quantity, 0);
  }, [cart]);

  // Recalculate discount if coupon applied
  useEffect(() => {
    if (discountCode === 'VIVI10') {
      setDiscountAmount(Math.round(cartSubtotal * 0.1));
    } else if (discountCode === 'BIENVENIDA') {
      setDiscountAmount(Math.min(cartSubtotal, 1500));
    } else {
      setDiscountAmount(0);
    }
  }, [cartSubtotal, discountCode]);

  // Add to cart from modal
  const handleAddToCartFromModal = (
    product: Product,
    quantity: number,
    selectedOptions: Record<string, string>,
    specialInstructions: string,
    calculatedTotal: number
  ) => {
    const cartItemId = `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    const newItem: CartItem = {
      cartItemId,
      product,
      quantity,
      selectedOptions,
      specialInstructions: specialInstructions.trim() || undefined,
      itemTotalPrice: calculatedTotal,
    };

    setCart((prev) => [...prev, newItem]);
    setJustAddedProductId(product.id);
    setTimeout(() => setJustAddedProductId(null), 2000);
    showToast(`¡${product.name} agregado a tu canasta!`);
  };

  // Quick buy / add from card or search dropdown
  const handleQuickAdd = (product: Product) => {
    // If product has complex options, open modal so user can choose what they want
    if (product.options && product.options.length > 0) {
      setSelectedProductForModal(product);
      return;
    }

    const cartItemId = `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newItem: CartItem = {
      cartItemId,
      product,
      quantity: 1,
      selectedOptions: {},
      itemTotalPrice: product.price,
    };

    setCart((prev) => [...prev, newItem]);
    setJustAddedProductId(product.id);
    setTimeout(() => setJustAddedProductId(null), 2000);
    showToast(`¡${product.name} agregado a tu canasta!`);
  };

  // Add combo
  const handleAddCombo = (combo: (typeof COMBOS)[0]) => {
    const dummyProduct: Product = {
      id: combo.id,
      name: combo.name,
      category: 'rotiseria',
      price: combo.price,
      unit: 'combo promocional',
      description: combo.items,
      badge: combo.badge,
      image: combo.image,
      tags: ['combo', 'promo', 'comida'],
    };

    const cartItemId = `${combo.id}-${Date.now()}`;
    const newItem: CartItem = {
      cartItemId,
      product: dummyProduct,
      quantity: 1,
      selectedOptions: { 'Contenido del Combo': combo.items },
      itemTotalPrice: combo.price,
    };

    setCart((prev) => [...prev, newItem]);
    setJustAddedComboId(combo.id);
    setTimeout(() => setJustAddedComboId(null), 2000);
    showToast(`¡${combo.name} añadido a tu canasta!`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }

    const cappedQty = Math.min(100, Math.max(1, newQty));

    setCart((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const singleItemPrice = item.itemTotalPrice / item.quantity;
          return {
            ...item,
            quantity: cappedQty,
            itemTotalPrice: singleItemPrice * cappedQty,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  const handleApplyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (upper === 'VIVI10') {
      setDiscountCode('VIVI10');
      setDiscountAmount(Math.round(cartSubtotal * 0.1));
      return true;
    }
    if (upper === 'BIENVENIDA') {
      setDiscountCode('BIENVENIDA');
      setDiscountAmount(Math.min(cartSubtotal, 1500));
      return true;
    }
    return false;
  };

  const handleOrderCompleted = (order: OrderDetails, sendWhatsAppNow: boolean) => {
    setActiveOrder(order);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsOrderConfirmationOpen(true);

    if (sendWhatsAppNow) {
      const itemsList = order.items
        .map((it) => `• ${it.quantity}x ${it.product.name} ($${it.itemTotalPrice.toLocaleString('es-AR')})`)
        .join('\n');

      const msg = `🥖 *¡NUEVO PEDIDO EN PANADERÍA VIVI!* 🥐\n\n` +
        `*Web Oficial:* https://panaderia-vivi.com\n` +
        `*Orden:* #${order.orderId}\n` +
        `*Cliente:* ${order.customerName}\n` +
        `*Teléfono:* ${order.customerPhone}\n` +
        `*Modalidad:* ${order.deliveryType === 'delivery' ? 'Envío a Domicilio' : 'Retiro en Local'}\n` +
        (order.customerAddress ? `*Dirección:* ${order.customerAddress}\n` : '') +
        `*Forma de pago:* ${order.paymentMethod.toUpperCase()}\n\n` +
        `*Detalle:*\n${itemsList}\n\n` +
        `*TOTAL:* $${order.total.toLocaleString('es-AR')}\n\n` +
        `¡Muchas gracias Doña Vivi!`;

      const waUrl = `https://wa.me/5491145892040?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    }
  };

  const handleUpdateActiveOrder = (updatedOrder: OrderDetails) => {
    setActiveOrder(updatedOrder);
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_ORDER, JSON.stringify(updatedOrder));
    } catch (e) {
      console.error(e);
    }
    showToast('¡Modificación en el celular guardada con éxito!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C1810]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#8C271E] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation with Instant Search & Direct Buy */}
      <Navbar
        cartCount={totalCartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onOpenInfo={() => {
          infoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        activeOrderCount={activeOrder ? 1 : 0}
        onViewActiveOrder={() => {
          setOrderConfirmationTab('ticket');
          setIsOrderConfirmationOpen(true);
        }}
        searchResults={searchResults}
        onQuickBuy={handleQuickAdd}
        onSelectProduct={(p) => setSelectedProductForModal(p)}
        onScrollToMenu={scrollToMenu}
        onScrollToVivi={scrollToVivi}
        justAddedProductId={justAddedProductId}
      />

      {/* Hero Storefront Banner */}
      <Hero
        onExploreMenu={scrollToMenu}
        onExploreCombos={() => {
          combosSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreVivi={scrollToVivi}
      />

      {/* Bakery Status & Live Oven Schedule */}
      <BakeryStatus />

      {/* Doña Vivi & Her Signature Table */}
      <div ref={viviSectionRef}>
        <ViviShowcase
          onBuyMesaSpecialty={handleBuyMesaCombo}
          isMesaAdded={isMesaAdded}
          onExploreMenu={scrollToMenu}
        />
      </div>

      {/* Main Catalog Section */}
      <main
        ref={menuSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 flex-1 w-full"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EADDCD] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold tracking-wide mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Nuestras Especialidades Diarias</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
              La Vidriera de Panadería Vivi
            </h2>
            <p className="text-xs sm:text-sm text-[#7D614E] mt-1">
              Seleccioná tus comidas favoritas: panes crocantes, bolitas de fraile, churros con dulce de leche, tartas caseras, pollo a la parrilla, pernil y más.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            {/* Inline search bar in catalog */}
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-[#9C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar en la vidriera..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border border-[#E0D2C3] rounded-xl text-xs placeholder-[#A88C78] text-[#331C0E] focus:outline-hidden focus:ring-2 focus:ring-[#D97724]/40 focus:border-[#D97724] shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                  title="Limpiar"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2">
              <span className="font-medium bg-amber-50 px-3 py-2 rounded-xl border border-amber-200 text-amber-900 text-xs font-semibold whitespace-nowrap">
                Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'comida' : 'comidas'}
              </span>
            </div>
          </div>
        </div>

        {/* Active Search Banner if Query Present */}
        {searchQuery.trim() && (
          <div className="bg-amber-100/80 border border-amber-300 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#D97724] text-white flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#8C271E] uppercase tracking-wide">
                  Búsqueda Activa de Comida
                </p>
                <p className="text-sm font-semibold text-[#2C1810]">
                  Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'} para: <span className="underline decoration-[#D97724] decoration-2">"{searchQuery}"</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
                setSelectedTag(null);
              }}
              className="px-3.5 py-1.5 bg-white hover:bg-stone-50 text-[#8C271E] border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Ver todo el menú</span>
            </button>
          </div>
        )}

        {/* Categories & Filter Pills */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSearchQuery('');
          }}
          productCounts={productCounts}
          activeTag={selectedTag}
          onSelectTag={setSelectedTag}
        />

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-14 text-center space-y-5 bg-white rounded-3xl border border-[#E9DDCF] p-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
              <Search className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810]">
                No encontramos comidas con "{searchQuery}"
              </h3>
              <p className="text-xs sm:text-sm text-[#8C6D58] max-w-md mx-auto">
                Probá haciendo clic en alguno de los platos y panes más pedidos por nuestros clientes:
              </p>
            </div>

            {/* Clickable Quick Suggestion Chips */}
            <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto pt-2">
              {[
                'Pan Casero',
                'Milanesas',
                'Pastel de Papas',
                'Churros',
                'Facturas',
                'Pollo al Spiedo',
                'Pizzas',
                'Empanadas',
                'Sopa Paraguaya',
                'Canelones',
                'Chipá',
                'Pernil'
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSearchChange(suggestion)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-[#8C271E] border border-amber-200 transition-colors cursor-pointer"
                >
                  🔍 {suggestion}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('todos');
                  setSelectedTag(null);
                }}
                className="px-5 py-2.5 bg-[#D97724] hover:bg-[#BF641B] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Ver Todas las Comidas Disponibles
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProductForModal}
                onQuickAdd={handleQuickAdd}
                justAdded={justAddedProductId === product.id}
              />
            ))}
          </div>
        )}
      </main>

      {/* Curated Combos Section */}
      <div ref={combosSectionRef}>
        <CombosSection
          onAddCombo={handleAddCombo}
          addedComboId={justAddedComboId}
        />
      </div>

      {/* Floating Cart Trigger for Mobile */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-5 right-5 sm:hidden z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 bg-[#8C271E] text-white rounded-full shadow-2xl font-bold text-sm border-2 border-white animate-bounce cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Ver Canasta ({totalCartCount})</span>
            <span className="font-mono bg-white/20 px-2 py-0.5 rounded-full text-xs">
              ${cartSubtotal.toLocaleString('es-AR')}
            </span>
          </button>
        </div>
      )}

      {/* About & Footer */}
      <div ref={infoSectionRef}>
        <AboutAndFooter />
      </div>

      {/* Customization Modal */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCartFromModal}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        deliveryType={deliveryType}
        onSelectDeliveryType={setDeliveryType}
        discountCode={discountCode}
        discountAmount={discountAmount}
        onApplyCoupon={handleApplyCoupon}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        deliveryType={deliveryType}
        subtotal={cartSubtotal}
        discount={discountAmount}
        deliveryFee={deliveryType === 'delivery' ? 1200 : 0}
        total={Math.max(0, cartSubtotal - discountAmount + (deliveryType === 'delivery' ? 1200 : 0))}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Confirmation Modal with Mobile Phone Modification */}
      <OrderConfirmationModal
        order={activeOrder}
        initialTab={orderConfirmationTab}
        onClose={() => setIsOrderConfirmationOpen(false)}
        onNewOrder={() => {
          setActiveOrder(null);
          setIsOrderConfirmationOpen(false);
          menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        onUpdateOrder={handleUpdateActiveOrder}
      />

      {/* Floating Active Order Notification & Mobile Modification Bar */}
      {activeOrder && !isOrderConfirmationOpen && (
        <aside
          aria-label="Modificación de pedido activo en celular"
          className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-40 max-w-md bg-[#2C1810]/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-500/40 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-300 ring-2 ring-amber-500/20"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-[#D97724] text-stone-900 flex items-center justify-center shrink-0 shadow-md">
              <Smartphone className="w-5 h-5 animate-bounce" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white truncate">
                  Orden #{activeOrder.orderId}
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                  En Horno
                </span>
              </div>
              <p className="text-[11px] text-amber-200 truncate mt-0.5">
                Modificá tu celular, dirección o comidas pedidas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setOrderConfirmationTab('modificar_celular');
                setIsOrderConfirmationOpen(true);
              }}
              className="px-3.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Modificar en Celular</span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
