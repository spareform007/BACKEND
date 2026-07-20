import { Layout } from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">About MAE' BEAUTY</h1>
            <p className="text-xl text-muted-foreground">
              Our story of luxury, quality, and beautiful confidence.
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border p-12 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Coming Soon
            </h2>
            <p className="text-muted-foreground">
              We're crafting our brand story. Tell us what you'd like to know
              about MAE' BEAUTY, and we'll add it to our about page!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 btn-primary"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
