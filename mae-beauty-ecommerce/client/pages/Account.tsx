import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User, Mail, Phone, MapPin, Edit2, LogOut } from "lucide-react";

export default function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>

            <div className="space-y-2">
              <button className="w-full py-2 px-4 rounded-lg border border-border hover:bg-muted transition-colors text-foreground text-sm font-semibold flex items-center justify-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full py-2 px-4 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground">Personal Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <p className="text-foreground font-semibold">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="text-foreground font-semibold">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <p className="text-foreground font-semibold">{user.phone || "Not added"}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-foreground">Shipping Address</h3>
                <button className="text-accent hover:text-accent/80 text-sm font-semibold flex items-center gap-1">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>

              {user.address ? (
                <div className="space-y-2">
                  <p className="text-foreground font-semibold">{user.address}</p>
                  <p className="text-foreground">
                    {user.city}, {user.pincode}
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">No address added</p>
              )}
            </div>

            {/* Orders */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground">Recent Orders</h3>

              <div className="text-center py-8 text-muted-foreground">
                <p>No orders yet</p>
                <p className="text-sm">Your purchases will appear here</p>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground">Preferences</h3>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Receive promotional emails</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Receive order updates</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-foreground">Subscribe to newsletter</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
