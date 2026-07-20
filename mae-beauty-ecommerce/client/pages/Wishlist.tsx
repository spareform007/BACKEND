import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, ChevronRight, Star } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

export default function Wishlist() {
  const { wishlist, addToCart, removeFromWishlist } = useProducts();

  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <Heart className="w-24 h-24 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Your wishlist is empty</h1>
              <p className="text-muted-foreground">
                Save your favorite products to wishlist
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
        <h1 className="text-4xl font-bold text-foreground mb-8">My Wishlist</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-border flex flex-col"
            >
              {/* Product Image */}
              <Link
                to={`/product/${product.id}`}
                className="bg-gradient-to-br from-orange-100 to-orange-200 h-48 flex items-center justify-center overflow-hidden relative group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.bestseller && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                      BEST
                    </span>
                  </div>
                )}
              </Link>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-accent font-semibold uppercase tracking-wide">
                  {product.category}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  className="font-semibold text-foreground mt-2 group-hover:text-accent transition-colors"
                >
                  {product.name}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-muted"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-accent">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2 mt-auto">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-2 rounded-md font-semibold hover:opacity-90 transition-opacity"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="w-full py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
