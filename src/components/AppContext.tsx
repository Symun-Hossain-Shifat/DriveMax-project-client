"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./Toast";

export interface Vehicle {
  id: string;
  year: string;
  make: string;
  model: string;
  type: "Car" | "Bike";
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  compatVehicle?: { make: string; model: string }[];
  isBikePart?: boolean;
}

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  cart: { product: Product; quantity: number }[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  garage: Vehicle[];
  addVehicle: (v: Omit<Vehicle, "id">) => void;
  removeVehicle: (id: string) => void;
  activeVehicle: Vehicle | null;
  setActiveVehicle: (v: Vehicle | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [garage, setGarage] = useState<Vehicle[]>([
    { id: "1", year: "2021", make: "Yamaha", model: "YZF-R1", type: "Bike" },
    { id: "2", year: "2022", make: "Toyota", model: "Supra", type: "Car" },
  ]);
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);

  const { showToast } = useToast();

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added to Cart`, "success", `${product.name} has been added to your shopping cart.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Removed from Cart", "info", "Item was removed from your shopping cart.");
  };

  const clearCart = () => {
    setCart([]);
    showToast("Cart Cleared", "info", "All items removed from your shopping cart.");
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast("Removed from Wishlist", "info", `${product.name} removed.`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast("Added to Wishlist", "success", `${product.name} added to your wishlist.`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const addVehicle = (v: Omit<Vehicle, "id">) => {
    const newVehicle: Vehicle = {
      ...v,
      id: Math.random().toString(36).substring(2, 9),
    };
    setGarage((prev) => [...prev, newVehicle]);
    setActiveVehicle(newVehicle);
    showToast("Vehicle Added", "success", `${newVehicle.year} ${newVehicle.make} ${newVehicle.model} added to My Garage.`);
  };

  const removeVehicle = (id: string) => {
    setGarage((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      if (activeVehicle?.id === id) {
        setActiveVehicle(filtered[0] || null);
      }
      return filtered;
    });
    showToast("Vehicle Removed", "info", "Vehicle removed from your garage.");
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        garage,
        addVehicle,
        removeVehicle,
        activeVehicle,
        setActiveVehicle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
