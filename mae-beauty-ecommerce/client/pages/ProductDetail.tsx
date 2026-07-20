import { Layout } from "@/components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Heart, ShoppingBag, Star, ChevronRight } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, isInWishlist, addToWishlist, removeFromWishlist } =
    useProducts();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Product not found</h1>
            <button
              onClick={() => navigate("/shop")}
              className="btn-primary inline-flex items-center gap-2"
            >
              Back to Shop
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button
            onClick={() => navigate("/shop")}
            className="hover:text-foreground transition-colors"
          >
            Shop
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg h-96 md:h-[500px] flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Badges */}
            <div className="space-y-3">
              <p className="text-accent text-sm font-semibold uppercase">
                {product.category}
              </p>
              {product.bestseller && (
                <div className="inline-block">
                  <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded">
                    BESTSELLER
                  </span>
                </div>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-foreground font-semibold">{product.rating}</span>
              <span className="text-muted-foreground text-sm">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-accent">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-700 text-sm font-bold px-2 py-1 rounded">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Benefits */}
            {product.benefits && (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-foreground/80">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-foreground">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border border-border rounded-lg px-2 py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-5 h-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <button
                onClick={handleWishlist}
                className={`px-6 py-3 rounded-md font-semibold transition-all border ${
                  inWishlist
                    ? "bg-accent/10 border-accent text-accent"
                    : "bg-background border-border text-foreground hover:border-accent"
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Stock Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-foreground/80">
                {product.inStock ? (
                  <span className="text-green-600 font-semibold">✓ In Stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Details */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Category</p>
                  <p className="font-semibold text-foreground">{product.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Availability</p>
                  <p className="font-semibold text-foreground">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20 pt-20 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <button
                  key={relatedProduct.id}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-border text-left"
                >
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 h-48 flex items-center justify-center">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-accent font-semibold uppercase">
                      {relatedProduct.category}
                    </p>
                    <h3 className="font-semibold text-foreground mt-2 group-hover:text-accent transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold text-accent">
                        ₹{relatedProduct.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-xs font-semibold text-foreground">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
