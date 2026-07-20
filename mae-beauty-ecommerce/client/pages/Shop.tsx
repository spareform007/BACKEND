import { Layout } from "@/components/Layout";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Search, Star, Heart } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

export default function Shop() {
  const navigate = useNavigate();
  const { products, isInWishlist, addToWishlist, removeFromWishlist } =
    useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("featured");

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      filtered = filtered.reverse();
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy, products]);

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Shop</h1>
          <p className="text-muted-foreground">
            Discover our complete collection of {filteredProducts.length} premium cosmetics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Search Products
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Category
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    !selectedCategory
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Price Range
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory || priceRange[1] < 200) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setPriceRange([0, 200]);
                  setSortBy("featured");
                }}
                className="w-full py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors text-sm font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const inWishlist = isInWishlist(product.id);
                  const discount = product.originalPrice
                    ? Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )
                    : 0;

                  return (
                    <div
                      key={product.id}
                      className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-border flex flex-col"
                    >
                      {/* Image */}
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="bg-gradient-to-br from-orange-100 to-orange-200 h-48 flex items-center justify-center overflow-hidden relative"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {product.bestseller && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                              BEST
                            </span>
                          </div>
                        )}
                        {discount > 0 && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              -{discount}%
                            </span>
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart
                            className={`w-6 h-6 ${
                              inWishlist
                                ? "fill-red-500 text-red-500"
                                : "text-white drop-shadow"
                            }`}
                          />
                        </button>
                      </button>

                      {/* Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <p className="text-xs text-accent font-semibold uppercase tracking-wide">
                          {product.category}
                        </p>
                        <button
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="font-semibold text-foreground mt-2 group-hover:text-accent transition-colors text-left"
                        >
                          {product.name}
                        </button>

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
                        <div className="flex items-center gap-2 mt-auto">
                          <span className="text-lg font-bold text-accent">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="w-full bg-accent text-accent-foreground py-2 font-semibold hover:opacity-90 transition-opacity"
                      >
                        View Details
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-card rounded-lg border border-border p-12 text-center space-y-4">
                <Filter className="w-12 h-12 mx-auto text-muted-foreground" />
                <h2 className="text-2xl font-bold text-foreground">
                  No products found
                </h2>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find what you're looking for
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                    setPriceRange([0, 200]);
                  }}
                  className="btn-primary inline-block"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
