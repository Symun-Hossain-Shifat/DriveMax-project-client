"use client";

import PostProduct from "@/lib/Actions/Post";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";

interface ItemFormData {
  title: string;
  category: string;
  authoremail: string;
  shortDescription: string;
  description: string;
  price: string;
  image: string;
}

export const CATEGORIES = [
  { value: "cars", label: "Cars" },
  { value: "bikes", label: "Bikes" },
  { value: "electric-vehicles", label: "Electric Vehicles" },
  { value: "commercial-vehicles", label: "Commercial Vehicles" },
  { value: "spare-parts", label: "Spare Parts" },
  { value: "accessories", label: "Accessories" },
];

export default function AddItemForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState<ItemFormData>({
    title: "",
    authoremail: "", // শুরুতে খালি থাকবে
    category: "",
    shortDescription: "",
    description: "",
    price: "",
    image: "",
  });

  // ফিক্স: সেশন ডাটা লোড হওয়ার পর authoremail স্টেট আপডেট করার জন্য useEffect
  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        authoremail: session.user.email,
      }));
    }
  }, [session]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!formData.category) {
      toast.error("Please select a product category");
      return;
    }

    // ব্যাকএন্ডে পাঠানোর আগে ইমেইল ভ্যালিডেশন
    if (!formData.authoremail) {
      toast.error("User session not found. Please log in again.");
      return;
    }

    const result = await PostProduct(formData);
    console.log(result);
    if (result) {
      toast.success("Product Published Successfully");
      router.push("/Dashboard/User");
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-[90%] max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl space-y-6"
      >
        <h1 className="text-center text-3xl font-bold text-white">
          Add New Item
        </h1>

        {/* Title */}
        <div>
          <label className="mb-2 block font-medium text-white">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter item title"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500"
          />
        </div>

        {/* Category Select Field */}
        <div>
          <label className="mb-2 block font-medium text-white">
            Category
          </label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white outline-none transition focus:border-orange-500 cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '16px'
            }}
          >
            <option value="" disabled className="text-zinc-500">
              Select a category
            </option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-zinc-900 text-white">
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Short Description */}
        <div>
          <label className="mb-2 block font-medium text-white">
            Short Description
          </label>
          <input
            type="text"
            name="shortDescription"
            required
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Write a short description"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500"
          />
        </div>

        {/* Full Description */}
        <div>
          <label className="mb-2 block font-medium text-white">
            Full Description
          </label>
          <textarea
            name="description"
            required
            rows={6}
            value={formData.description}
            onChange={handleChange}
            placeholder="Write full description..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 resize-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="mb-2 block font-medium text-white">
            Price
          </label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter item price"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="mb-2 block font-medium text-white">
            Image URL (Optional)
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-orange-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}