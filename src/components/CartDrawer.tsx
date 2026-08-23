'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBag, X, Plus, Minus, Trash2, Send } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice,
    toastMessage,
  } = useCart();

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = `Hello Yellow River Restaurant! 🍜\nI would like to place an order:\n\n`;
    cart.forEach((item, idx) => {
      message += `${idx + 1}. ${item.name} ${item.chineseName ? `(${item.chineseName})` : ''} x${item.quantity} - KSh ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `\n*Total Amount:* KSh ${totalPrice.toLocaleString()}\n\nPlease confirm availability and estimated delivery/pickup time. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/254706546644?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="cart-toast">
          <ShoppingBag size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cart Backdrop */}
      {isCartOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={22} color="var(--primary-red)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your Order Cart</h3>
            {totalCount > 0 && (
              <span className="cart-badge-count">{totalCount}</span>
            )}
          </div>
          <button
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} color="var(--text-muted)" style={{ opacity: 0.5 }} />
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '1rem' }}>
                Your cart is empty.
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Click any food image on the menu to add it to your order!
              </p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    {item.chineseName && (
                      <span className="cart-item-cn">{item.chineseName}</span>
                    )}
                    <span className="cart-item-price">
                      KSh {item.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="qty-btn"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="qty-btn"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="cart-remove-btn"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Total Price:</span>
              <span className="cart-total-val">KSh {totalPrice.toLocaleString()}</span>
            </div>

            <button className="btn-primary cart-checkout-btn" onClick={handleWhatsAppOrder}>
              <Send size={18} />
              Send Order via WhatsApp
            </button>

            <button className="cart-clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
