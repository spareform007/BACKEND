import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ShoppingBag, Sparkles, Heart, TrendingUp } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-foreground via-foreground to-background pt-20 pb-32 text-background">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gold-light rounded-full mix-blend-multiply filter blur-3xl animation-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <p className="text-accent text-sm font-semibold uppercase tracking-wide">
                  ✨ Luxury Cosmetics
                </p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Elevate Your
                  <span className="block text-accent">Natural Beauty</span>
                </h1>
                <p className="text-lg text-background/80 max-w-md">
                  Discover our curated collection of premium cosmetics. Crafted with
                  care, designed for confidence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                </Link>
                <button className="px-6 py-3 bg-background text-foreground rounded-md font-semibold hover:bg-background/90 transition-all border border-background/30">
                  Learn More
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <div>
                  <p className="text-2xl font-bold text-accent">500+</p>
                  <p className="text-sm text-background/70">Products</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">50K+</p>
                  <p className="text-sm text-background/70">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">100%</p>
                  <p className="text-sm text-background/70">Authentic</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-gold-dark/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-accent to-gold-dark rounded-2xl h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Sparkles className="w-24 h-24 mx-auto text-background opacity-90" />
                  <p className="text-background text-lg font-semibold">
                    Premium Collection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-accent text-sm font-semibold uppercase tracking-wide">
              Our Best Sellers
            </p>
            <h2 className="section-title">Trending This Season</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Discover the products our customers love most
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Radiant Glow Foundation",
                category: "Foundation",
                price: "$48",
                image: "bg-gradient-to-br from-orange-100 to-orange-200",
              },
              {
                name: "Velvet Luxe Lipstick",
                category: "Lipstick",
                price: "$32",
                image: "bg-gradient-to-br from-rose-100 to-rose-200",
              },
              {
                name: "Golden Hour Highlighter",
                category: "Highlighter",
                price: "$38",
                image: "bg-gradient-to-br from-yellow-100 to-amber-200",
              },
              {
                name: "Midnight Mascara",
                category: "Mascara",
                price: "$28",
                image: "bg-gradient-to-br from-slate-100 to-slate-200",
              },
            ].map((product) => (
              <div
                key={product.name}
                className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-border"
              >
                <div className={`${product.image} h-48 flex items-end justify-end p-4`}>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-accent text-accent-foreground p-2 rounded-full">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-accent font-semibold uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-foreground mt-2 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-accent">
                      {product.price}
                    </span>
                    <button className="bg-accent text-accent-foreground px-3 py-1 rounded text-sm font-medium hover:opacity-90 transition-opacity">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="btn-primary inline-flex items-center gap-2"
            >
              View All Products
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-background to-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-accent text-sm font-semibold uppercase tracking-wide">
              Shop by Category
            </p>
            <h2 className="section-title">Find What You Need</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Skincare", icon: "🌿", items: "45 Products" },
              { name: "Makeup", icon: "💄", items: "120 Products" },
              { name: "Fragrance", icon: "🌸", items: "35 Products" },
            ].map((category) => (
              <button
                key={category.name}
                className="group relative bg-card rounded-lg p-8 border border-border hover:border-accent transition-colors overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <div className="relative space-y-4">
                  <div className="text-5xl">{category.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {category.items}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Premium Quality",
                description: "Handpicked products from trusted international brands",
              },
              {
                icon: TrendingUp,
                title: "Latest Trends",
                description: "Stay ahead with our curated seasonal collections",
              },
              {
                icon: Heart,
                title: "Customer Care",
                description: "24/7 support and 30-day money-back guarantee",
              },
            ].map((item) => (
              <div key={item.title} className="space-y-4 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-foreground to-foreground/80 text-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Get Exclusive Offers
            </h2>
            <p className="text-lg text-background/80">
              Subscribe to our newsletter for insider access to new collections and special discounts
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background text-foreground rounded-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
