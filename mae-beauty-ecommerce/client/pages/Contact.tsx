import { Layout } from "@/components/Layout";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">
              We'd love to hear from you. Reach out to us anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Mail, label: "Email", value: "hello@maebeauty.com" },
              { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
              { icon: MapPin, label: "Address", value: "Coming Soon" },
            ].map((contact) => (
              <div
                key={contact.label}
                className="bg-card rounded-lg border border-border p-6 space-y-3"
              >
                <contact.icon className="w-6 h-6 text-accent" />
                <h3 className="font-semibold text-foreground">{contact.label}</h3>
                <p className="text-muted-foreground text-sm">{contact.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-lg border border-border p-12 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Contact Form Coming Soon
            </h2>
            <p className="text-muted-foreground">
              Our contact form is being developed. You can reach us via email
              or phone in the meantime!
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
