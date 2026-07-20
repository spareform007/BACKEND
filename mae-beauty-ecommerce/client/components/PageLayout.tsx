import { Layout } from "@/components/Layout";
import { useProducts } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { cart, wishlist } = useProducts();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <Layout
      cartCount={cart.length}
      wishlistCount={wishlist.length}
      isAuthenticated={isAuthenticated}
      userName={user?.name}
      onLogout={logout}
    >
      {children}
    </Layout>
  );
}
