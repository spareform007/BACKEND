import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Heart, User, LogOut } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  cartCount?: number;
  wishlistCount?: number;
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export function Layout({
  children,
  cartCount = 0,
  wishlistCount = 0,
  isAuthenticated = false,
  userName = "",
  onLogout,
}: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold hidden sm:inline">MAE' BEAUTY</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "text-accent border-b-2 border-accent pb-1"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className={`text-sm font-medium transition-colors ${
                  isActive("/shop")
                    ? "text-accent border-b-2 border-accent pb-1"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors ${
                  isActive("/about")
                    ? "text-accent border-b-2 border-accent pb-1"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-medium transition-colors ${
                  isActive("/contact")
                    ? "text-accent border-b-2 border-accent pb-1"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="hidden sm:inline text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
              >
                Admin
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 hover:bg-muted rounded-lg transition-colors group"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2">
                      <Link
                        to="/account"
                        className="block px-4 py-2 hover:bg-muted text-foreground text-sm"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      <button
                        onClick={() => {
                          if (onLogout) onLogout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-muted text-foreground text-sm flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:inline text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden border-t border-border py-4 space-y-3">
              <Link
                to="/"
                className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/wishlist"
                className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist ({wishlistCount})
              </Link>
              <Link
                to="/cart"
                className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart ({cartCount})
              </Link>
              <Link
                to="/about"
                className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="block text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              <Link
                to="/admin"
                className="block text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Panel
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-background mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-bold">M</span>
                </div>
                <span className="font-bold">MAE' BEAUTY</span>
              </div>
              <p className="text-background/80 text-sm">
                Premium cosmetics for the modern, confident you.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-background/80">
                <li>
                  <Link to="/shop" className="hover:text-background transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Skincare
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Makeup
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Fragrance
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-background/80">
                <li>
                  <Link to="/about" className="hover:text-background transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-background transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-background/80">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Shipping
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-background/20 mt-12 pt-8 text-center text-sm text-background/70">
            <p>&copy; 2024 MAE' BEAUTY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
