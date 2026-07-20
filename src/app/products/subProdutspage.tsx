"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Label, ListBox, Select } from "@heroui/react";
import { Product } from "./page";
import ProductImage from "@/components/productimage";

export const CATEGORIES = [
  { value: "cars", label: "Cars" },
  { value: "bikes", label: "Bikes" },
  { value: "electric-vehicles", label: "Electric Vehicles" },
  { value: "commercial-vehicles", label: "Commercial Vehicles" },
  { value: "spare-parts", label: "Spare Parts" },
  { value: "accessories", label: "Accessories" },
];

const PRICE_RANGES = [
  { value: "0-500000", label: "৳0 - ৳500,000" },
  { value: "500000-1000000", label: "৳500,000 - ৳1,000,000" },
  { value: "1000000-2000000", label: "৳1,000,000 - ৳2,000,000" },
  { value: "2000000-5000000", label: "৳2,000,000 - ৳5,000,000" },
  { value: "over-5000000", label: "Over ৳5,000,000" },
];
export default function ProductGridClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        product.title?.toLowerCase().includes(q) ||
        product.shortDescription?.toLowerCase().includes(q);

      const matchesCategory = !category || product.category === category;

      let matchesPrice = true;
      if (priceRange) {
        const numericPrice = parseFloat(product.price);
        if (!isNaN(numericPrice)) {
          if (priceRange === "over-100000") {
            matchesPrice = numericPrice > 100000;
          } else {
            const [min, max] = priceRange.split("-").map(Number);
            matchesPrice = numericPrice >= min && numericPrice <= max;
          }
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, category, priceRange]);

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <p className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--dm-text)]">
          THE LOT IS EMPTY
        </p>
        <p className="mt-2 max-w-sm text-sm text-[var(--dm-muted)]">
          No vehicles are listed right now. Check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--dm-bg)]">
      {/* Local design tokens + fonts, scoped to this page */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        :root {
          --dm-bg: #0a0c0f;
          --dm-panel: #15181d;
          --dm-panel-hover: #1b1f25;
          --dm-border: #262b32;
          --dm-text: #f2efe9;
          --dm-muted: #8b929b;
          --dm-amber: #f5a623;
          --dm-teal: #16d6c4;
          --font-display: 'Rajdhani', sans-serif;
          --font-body: 'Inter', sans-serif;
        }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--dm-border)] px-4 py-16 sm:py-20 lg:py-24">


        <div className="relative mx-auto max-w-7xl">
          <span className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.3em] text-[var(--dm-teal)]">
            DriveMax &middot; Inventory
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-semibold uppercase leading-[0.95] tracking-wide text-[var(--dm-text)] sm:text-6xl lg:text-7xl">
            Find your
            <br />
            next drive
          </h1>
          <p className="mt-4 max-w-xl font-[family-name:var(--font-body)] text-sm text-[var(--dm-muted)] sm:text-base">
            Browse verified listings, compare by category and budget, and get straight to the details that matter.
          </p>
        </div>
      </section>

      {/* Search */}
      <div className="mx-auto -mt-6 w-full max-w-3xl px-4 sm:-mt-7">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-[var(--dm-muted)]"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.603z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by make, model, or keyword..."
            className="w-full rounded-lg border border-[var(--dm-border)] bg-[var(--dm-panel)] py-3 pl-12 pr-16 font-[family-name:var(--font-body)] text-sm text-[var(--dm-text)] placeholder-[var(--dm-muted)] shadow-[0_0_0_1px_rgba(0,0,0,0.2)] transition-all focus:border-[var(--dm-amber)] focus:outline-none focus:ring-2 focus:ring-[var(--dm-amber)]/30"
          />

          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-3 sm:flex">
            <kbd className="inline-flex items-center rounded border border-[var(--dm-border)] bg-[var(--dm-bg)] px-1.5 py-0.5 font-[family-name:var(--font-body)] text-xs text-[var(--dm-muted)]">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="w-full space-y-2 sm:max-w-xs">
            <Select
              fullWidth
              placeholder="Select by Category"
              selectedKey={category}
              onSelectionChange={(key) => setCategory(key ? String(key) : null)}
            >
              <Label className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-wider text-[var(--dm-muted)]">
                Category
              </Label>
              <Select.Trigger className="mt-1 flex w-full items-center justify-between rounded-lg border border-[var(--dm-border)] bg-[var(--dm-panel)] px-4 py-2.5 font-[family-name:var(--font-body)] text-sm text-[var(--dm-text)] transition-all focus:border-[var(--dm-amber)] focus:outline-none focus:ring-2 focus:ring-[var(--dm-amber)]/30">
                <Select.Value />
                <Select.Indicator className="text-[var(--dm-muted)]" />
              </Select.Trigger>
              <Select.Popover className="z-50 mt-2 w-[--trigger-width] overflow-hidden rounded-lg border border-[var(--dm-border)] bg-[var(--dm-panel)] shadow-xl">
                <ListBox className="py-1">
                  {CATEGORIES.map((cat) => (
                    <ListBox.Item
                      key={cat.value}
                      id={cat.value}
                      textValue={cat.label}
                      className="flex cursor-pointer items-center justify-between px-4 py-2 font-[family-name:var(--font-body)] text-sm text-[var(--dm-text)] transition-colors hover:bg-[var(--dm-panel-hover)] focus:bg-[var(--dm-panel-hover)]"
                    >
                      {cat.label}
                      <ListBox.ItemIndicator className="text-[var(--dm-amber)]" />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            {category && (
              <button
                onClick={() => setCategory(null)}
                className="font-[family-name:var(--font-body)] text-xs text-[var(--dm-muted)] underline underline-offset-2 hover:text-[var(--dm-text)]"
              >
                Clear category filter
              </button>
            )}
          </div>

          <div className="w-full space-y-2 sm:max-w-xs">
            <Select
              fullWidth
              placeholder="Select by Price"
              selectedKey={priceRange}
              onSelectionChange={(key) => setPriceRange(key ? String(key) : null)}
            >
              <Label className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-wider text-[var(--dm-muted)]">
                Price Range
              </Label>
              <Select.Trigger className="mt-1 flex w-full items-center justify-between rounded-lg border border-[var(--dm-border)] bg-[var(--dm-panel)] px-4 py-2.5 font-[family-name:var(--font-body)] text-sm text-[var(--dm-text)] transition-all focus:border-[var(--dm-amber)] focus:outline-none focus:ring-2 focus:ring-[var(--dm-amber)]/30">
                <Select.Value />
                <Select.Indicator className="text-[var(--dm-muted)]" />
              </Select.Trigger>
              <Select.Popover className="z-50 mt-2 w-[--trigger-width] overflow-hidden rounded-lg border border-[var(--dm-border)] bg-[var(--dm-panel)] shadow-xl">
                <ListBox className="py-1">
                  {PRICE_RANGES.map((range) => (
                    <ListBox.Item
                      key={range.value}
                      id={range.value}
                      textValue={range.label}
                      className="flex cursor-pointer items-center justify-between px-4 py-2 font-[family-name:var(--font-body)] text-sm text-[var(--dm-text)] transition-colors hover:bg-[var(--dm-panel-hover)] focus:bg-[var(--dm-panel-hover)]"
                    >
                      {range.label}
                      <ListBox.ItemIndicator className="text-[var(--dm-amber)]" />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            {priceRange && (
              <button
                onClick={() => setPriceRange(null)}
                className="font-[family-name:var(--font-body)] text-xs text-[var(--dm-muted)] underline underline-offset-2 hover:text-[var(--dm-text)]"
              >
                Clear price filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[var(--dm-text)]">
              NO MATCHES FOUND
            </p>
            <p className="mt-1 text-sm text-[var(--dm-muted)]">
              Try a different search term or clear a filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group flex h-full min-h-[440px] flex-col overflow-hidden rounded-xl border border-[var(--dm-border)] bg-[var(--dm-panel)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--dm-amber)]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              >
                <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden bg-[var(--dm-bg)]">
                  <ProductImage src={product.image} alt={product.title} />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="mb-1 line-clamp-1 font-[family-name:var(--font-display)] text-lg font-semibold uppercase tracking-wide text-[var(--dm-text)]">
                    {product.title || "Untitled Listing"}
                  </h3>

                  <p className="mb-4 flex-1 line-clamp-2 font-[family-name:var(--font-body)] text-sm text-[var(--dm-muted)]">
                    {product.shortDescription || "No description available."}
                  </p>

                  <div className="mb-4 flex items-center justify-between border-t border-[var(--dm-border)] pt-3">
                    <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--dm-amber)]">
                      ৳{product.price || "N/A"}
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-xs text-[var(--dm-muted)]">
                      {product.createdAt
                        ? new Date(product.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : "—"}
                    </span>
                  </div>

                  <Link
                    href={`/products/${product._id}`}
                    className="mt-auto w-full rounded-lg bg-[var(--dm-teal)] py-2.5 text-center font-[family-name:var(--font-body)] text-sm font-semibold text-[#062622] transition-colors hover:bg-[var(--dm-amber)] hover:text-[#2a1a02]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}