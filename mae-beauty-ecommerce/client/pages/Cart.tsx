import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ChevronRight } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useProducts();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const shipping = cart.length > 0 ? 50 : 0;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Your cart is empty</h1>
              <p className="text-muted-foreground">
                Discover our amazing collection of premium cosmetics
              </p>
            </div>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              Start Shopping
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-lg border border-border p-6 flex gap-6"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-foreground text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <p className="font-bold text-accent text-lg">₹{item.price}</p>
                </div>

                {/* Quantity & Remove */}
                <div className="space-y-4 flex flex-col items-end">
                  <div className="flex items-center gap-2 border border-border rounded-lg">
                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-3 py-1 hover:bg-muted"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-lg border border-border p-6 h-fit sticky top-24 space-y-4">
            <h2 className="text-lg font-bold text-foreground">Order Summary</h2>

            <div className="space-y-3 border-b border-border pb-4">
              <div className="flex justify-between text-foreground/80">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground/80">
                <span>Tax (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground/80">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn-primary w-full block text-center">
              Proceed to Checkout
            </Link>

            <Link
              to="/shop"
              className="w-full py-3 border border-accent text-accent font-semibold rounded-md hover:bg-accent/10 transition-colors text-center"
            >
              Continue Shopping
            </Link>

            {/* Promo Code */}
            <div className="space-y-2 border-t border-border pt-4">
              <label className="block text-sm font-semibold text-foreground">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
