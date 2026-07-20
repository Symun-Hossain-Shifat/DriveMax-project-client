import {
  ShoppingCart,
  Truck,
  ShieldCheck,
  Star,
  CalendarDays,
} from "lucide-react";
import { GetSpecificProduct } from "@/lib/Actions/GetProduct";
import ProductImage from "@/components/productimage";



// ─── TYPES & INTERFACES ─────────────────────────────────────────────────────

interface DetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

interface ProductData {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  price: string | number;
  image: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
}

// ─── UTILITY FUNCTIONS ───────────────────────────────────────────────────────

function formatPrice(price: string | number): string {
  const value = typeof price === "number" ? price : parseFloat(price);
  return Number.isFinite(value) ? value.toFixed(2) : String(price);
}

function getAverageRating(reviews?: Review[]): number | null {
  if (!reviews || reviews.length === 0) return null;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return total / reviews.length;
}

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="text-xs font-bold uppercase tracking-widest text-[#D7263D]">
        {label}
      </span>
      <span className="h-px flex-1 bg-black/10" />
    </div>
  );
}

// ─── MAIN ROUTE PAGE (SERVER COMPONENT) ──────────────────────────────────────

const DetailPage = async ({ params }: DetailPageProps) => {
  const { id } = await params;
  const product: ProductData = await GetSpecificProduct(id);
  // console.log(product)
  // 404 Fallback layout if product data isn't returned
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#111111] px-6 text-center text-white">
        <span className="text-6xl font-black tracking-tighter opacity-20">404</span>
        <p className="text-lg font-semibold">Product out of bounds.</p>
        <p className="text-sm text-white/50">
          The sports gear you&apos;re looking for doesn&apos;t exist or was removed.
        </p>
      </div>
    );
  }

  const avgRating = getAverageRating(product.reviews);
  const reviewCount = product.reviews?.length ?? 0;

  return (
    <main className="bg-white text-[#111111] pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-12">

        {/* ── Product Hero Section ───────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-14">

          {/* Media Gallery (Client Component Side-Loaded) */}
          <ProductImage
            src={product.image}
            alt={product.title}
          />

          {/* Pricing & Checkout Actions Box */}
          <div className="md:sticky md:top-8 md:self-start">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-black/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-black/50">
                SKU {product.id || id}
              </span>
              {avgRating !== null && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-black/60">
                  <Star size={13} className="fill-[#F5A623] text-[#F5A623]" />
                  {avgRating.toFixed(1)}{" "}
                  <span className="text-black/40">
                    ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
                  </span>
                </span>
              )}
            </div>

            <h1 className="mb-2 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              {product.title}
            </h1>
            <p className="mb-6 text-base leading-relaxed text-black/55 sm:text-lg">
              {product.shortDescription}
            </p>

            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-3xl font-black sm:text-4xl">
                ${formatPrice(product.price)}
              </span>
              <span className="text-sm font-medium text-black/40">incl. taxes</span>
            </div>

            {/* Desktop Add to Cart */}
            <button
              type="button"
              className="mb-4 hidden w-full items-center justify-center gap-2 rounded-xl bg-[#D7263D] py-4 text-base font-bold text-white shadow-sm transition-transform active:scale-[0.99] hover:bg-[#b81f33] md:inline-flex"
            >
              <ShoppingCart size={19} strokeWidth={2.5} />
              Add to Cart
            </button>

            {/* Value Highlights */}
            <div className="mb-8 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-black/[0.03] px-3 py-2.5 text-xs font-medium text-black/60">
                <Truck size={16} className="shrink-0 text-[#D7263D]" />
                Fast shipping
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-black/[0.03] px-3 py-2.5 text-xs font-medium text-black/60">
                <ShieldCheck size={16} className="shrink-0 text-[#D7263D]" />
                Authentic Product
              </div>
            </div>

            {/* Key Information / Specifications Section */}
            <div className="rounded-2xl border border-black/10 p-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-black/40">
                Key Information
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-black/55">Availability</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    In Stock
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-black/55">
                    <CalendarDays size={14} />
                    Release Date
                  </span>
                  <span className="font-semibold">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-black/55">Item Classification</span>
                  <span className="font-semibold">Performance Footwear</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Description / Overview Section ─────────────────────────── */}
        <section className="mt-14 max-w-3xl md:mt-20">
          <SectionEyebrow label="Overview" />
          <h2 className="mb-4 text-2xl font-black">Description &amp; Details</h2>
          <p className="text-[15px] leading-relaxed text-black/65 whitespace-pre-line">
            {product.description}
          </p>
        </section>

        {/* ── Reviews / Ratings Section ──────────────────────────────── */}
        <section className="mt-14 md:mt-20">
          <SectionEyebrow label="Feedback" />
          <h2 className="mb-6 text-2xl font-black">Customer Reviews</h2>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {product.reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-black/5 bg-[#FAFAFA] p-5"
                >
                  <div className="mb-2.5 flex items-start justify-between">
                    <h4 className="font-bold">{review.user}</h4>
                    <span className="font-mono text-[10px] text-black/30">
                      ID: {review.id}
                    </span>
                  </div>
                  <div className="mb-3 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={
                          i < review.rating
                            ? "fill-[#F5A623] text-[#F5A623]"
                            : "fill-transparent text-black/15"
                        }
                      />
                    ))}
                    <span className="ml-1.5 text-xs font-semibold text-black/40">
                      {review.rating}/5
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-black/60">
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-10 text-center">
              <p className="mb-1 font-semibold text-black/70">No reviews yet</p>
              <p className="text-sm text-black/45">
                Be the first to share your experience with these running shoes.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* ── Mobile Sticky Checkout Bar ──────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <span className="text-xl font-black">${formatPrice(product.price)}</span>
        <button
          type="button"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D7263D] py-3 text-sm font-bold text-white active:scale-[0.99]"
        >
          <ShoppingCart size={17} strokeWidth={2.5} />
          Add to Cart
        </button>
      </div>
    </main>
  );
};

export default DetailPage;