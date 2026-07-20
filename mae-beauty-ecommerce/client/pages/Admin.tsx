import { Layout } from "@/components/Layout";
import {
  BarChart3,
  Package,
  Users,
  Settings,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your cosmetics store and inventory
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: BarChart3, label: "Revenue", value: "$0", color: "text-blue-500" },
            { icon: Package, label: "Products", value: "0", color: "text-green-500" },
            { icon: Users, label: "Customers", value: "0", color: "text-purple-500" },
            { icon: Settings, label: "Orders", value: "0", color: "text-orange-500" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-lg border border-border p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground/70">
                  {stat.label}
                </h3>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              title: "Products Management",
              description: "Add, edit, and manage your product catalog",
              icon: Package,
            },
            {
              title: "Orders",
              description: "View and process customer orders",
              icon: BarChart3,
            },
            {
              title: "Customers",
              description: "Manage customer accounts and loyalty programs",
              icon: Users,
            },
            {
              title: "Settings",
              description: "Configure store settings and preferences",
              icon: Settings,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-lg border border-border p-8 hover:border-accent transition-colors cursor-pointer space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.description}
                  </p>
                </div>
                <item.icon className="w-6 h-6 text-accent flex-shrink-0" />
              </div>
              <button className="flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-all">
                Open
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-foreground to-foreground/80 rounded-lg p-8 text-background">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Admin Features Coming Soon</h2>
            <p className="text-background/80">
              Let us know which admin features you'd like to prioritize, and
              we'll build them next!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors mt-4"
            >
              Return to Store
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
