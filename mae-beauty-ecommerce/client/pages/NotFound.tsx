import { Layout } from "@/components/Layout";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-7xl font-bold text-foreground">404</h1>
            <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
            <p className="text-lg text-muted-foreground">
              The page you're looking for doesn't exist, but our products do!
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 btn-primary"
          >
            Return Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
