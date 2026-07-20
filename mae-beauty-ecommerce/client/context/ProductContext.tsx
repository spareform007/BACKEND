import React, { createContext, useContext, useState } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  description: string;
  benefits?: string[];
  ingredients?: string[];
  inStock: boolean;
  bestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Radiant Glow Foundation",
    category: "Foundation",
    price: 48,
    originalPrice: 60,
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    description: "Flawless finish foundation with SPF 20 protection",
    benefits: ["Smooth finish", "Long-lasting", "SPF 20 protection"],
    inStock: true,
    bestseller: true,
  },
  {
    id: "2",
    name: "Velvet Luxe Lipstick",
    category: "Lipstick",
    price: 32,
    rating: 4.8,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1599994474481-d1c69a7c2f41?w=400&h=400&fit=crop",
    description: "Comfortable matte lipstick with rich pigment",
    benefits: ["Matte finish", "Long-wearing", "12-hour wear"],
    inStock: true,
    bestseller: true,
  },
  {
    id: "3",
    name: "Golden Hour Highlighter",
    category: "Highlighter",
    price: 38,
    originalPrice: 50,
    rating: 4.7,
    reviews: 345,
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&h=400&fit=crop",
    description: "Luminous powder highlighter for that perfect glow",
    benefits: ["Luminous glow", "Blendable", "Pigmented"],
    inStock: true,
    bestseller: true,
  },
  {
    id: "4",
    name: "Midnight Mascara",
    category: "Mascara",
    price: 28,
    rating: 4.6,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1516724122222-5e7a9e2e8bf8?w=400&h=400&fit=crop",
    description: "Volumizing mascara for dramatic lashes",
    benefits: ["Volumizing", "Waterproof", "All-day wear"],
    inStock: true,
  },
  {
    id: "5",
    name: "Silk Touch Blush",
    category: "Blush",
    price: 26,
    rating: 4.4,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1596724122222-5e7a9e2e8bf8?w=400&h=400&fit=crop",
    description: "Lightweight blush for a natural flush",
    benefits: ["Buildable coverage", "Smooth texture"],
    inStock: true,
  },
  {
    id: "6",
    name: "Hydra Glow Moisturizer",
    category: "Skincare",
    price: 45,
    rating: 4.9,
    reviews: 512,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    description: "Deep hydrating moisturizer with hyaluronic acid",
    benefits: ["Hydrating", "Anti-aging", "Lightweight"],
    inStock: true,
    bestseller: true,
  },
  {
    id: "7",
    name: "Crystal Clear Serum",
    category: "Skincare",
    price: 55,
    rating: 4.7,
    reviews: 398,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    description: "Brightening serum for radiant skin",
    benefits: ["Brightening", "Vitamin C", "Antioxidants"],
    inStock: true,
  },
  {
    id: "8",
    name: "Night Bloom Face Mask",
    category: "Skincare",
    price: 34,
    originalPrice: 45,
    rating: 4.5,
    reviews: 276,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    description: "Nourishing night mask for repair",
    benefits: ["Nourishing", "Anti-aging", "Night repair"],
    inStock: true,
  },
  {
    id: "9",
    name: "Rose Perfume",
    category: "Fragrance",
    price: 75,
    rating: 4.6,
    reviews: 224,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    description: "Elegant floral fragrance with rose notes",
    benefits: ["Long-lasting", "Floral notes", "Premium"],
    inStock: true,
  },
  {
    id: "10",
    name: "Brush Set Deluxe",
    category: "Tools & Accessories",
    price: 85,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1596724122222-5e7a9e2e8bf8?w=400&h=400&fit=crop",
    description: "Professional 10-piece makeup brush set",
    benefits: ["Professional quality", "Soft bristles", "Premium handles"],
    inStock: true,
  },
  {
    id: "11",
    name: "Eye Shadow Palette",
    category: "Eye Shadow",
    price: 42,
    originalPrice: 55,
    rating: 4.7,
    reviews: 389,
    image: "https://images.unsplash.com/photo-1599994474481-d1c69a7c2f41?w=400&h=400&fit=crop",
    description: "12-shade eyeshadow palette with matte and shimmer",
    benefits: ["Highly pigmented", "Blendable", "Long-wearing"],
    inStock: true,
  },
  {
    id: "12",
    name: "Lip Gloss Shine",
    category: "Lipstick",
    price: 24,
    rating: 4.3,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1599994474481-d1c69a7c2f41?w=400&h=400&fit=crop",
    description: "High-shine lip gloss with vanilla flavor",
    benefits: ["High shine", "Long-lasting", "Moisturizing"],
    inStock: true,
  },
];

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <ProductContext.Provider
      value={{
        products: mockProducts,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
}
