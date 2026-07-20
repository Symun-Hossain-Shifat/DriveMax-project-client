"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation"; // UI রিফ্রেশ করার জন্য
import { Button, Modal } from "@heroui/react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Editproduct } from "@/lib/Actions/EditProduct";


export interface Product {
  _id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  price: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface EditProductModalProps {
  product: Product;
}

type ProductFormData = {
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  price: string;
  image: string;
};

const CATEGORIES = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "shoes", label: "Shoes" },
  { value: "home", label: "Home & Kitchen" },
  { value: "books", label: "Books & Stationery" },
  { value: "software", label: "Software & Services" },
];

export function Editpage({ product }: EditProductModalProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    title: product.title,
    category: product.category || "",
    shortDescription: product.shortDescription,
    description: product.description,
    price: product.price,
    image: product.image,
  });

  useEffect(() => {
    setFormData({
      title: product.title,
      category: product.category || "",
      shortDescription: product.shortDescription,
      description: product.description,
      price: product.price,
      image: product.image,
    });
  }, [product]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>, closeModal: () => void) => {
    e.preventDefault();
    setIsUpdating(true);

    const Data = {
      title: formData.title,
      category: formData.category,
      shortDescription: formData.shortDescription,
      description: formData.description,
      price: formData.price,
      image: formData.image,
    };

    const id = product._id;

    try {
      const result = await Editproduct(Data, id);
      console.log(result)
      if (result) {
        toast.success('Product Updated Successfully 🎉');
        closeModal();
        router.refresh();
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal>
      {/* মোডাল ওপেন করার ট্রিগার বাটন */}
      <Button
        variant="secondary"
        className="rounded-md p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors border border-transparent hover:border-zinc-800"
        aria-label="Edit product"
      >
        <Pencil size={16} />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-2xl border-0 bg-transparent p-0 shadow-none">

            {({ close }) => (
              <>
                <Modal.CloseTrigger />

                <form
                  id={`edit-form-${product._id}`}
                  onSubmit={(e) => HandleSubmit(e, close)}
                  className="mx-auto w-full max-w-2xl space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700"
                >
                  <h1 className="text-center text-3xl font-bold text-white">
                    Edit Item
                  </h1>

                  {/* Title */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-400">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter item title"
                      className="w-full rounded-lg border border-zinc-800 bg-black p-3 text-white placeholder:text-zinc-600 outline-none transition duration-200 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                    />
                  </div>

                  {/* Category Select Field */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-400">
                      Category
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-800 bg-black p-3 text-white outline-none transition duration-200 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 cursor-pointer appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        backgroundSize: '16px'
                      }}
                    >
                      <option value="" disabled className="text-zinc-600 bg-zinc-950">
                        Select a category
                      </option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value} className="bg-zinc-950 text-white">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-400">
                      Short Description
                    </label>
                    <input
                      type="text"
                      name="shortDescription"
                      required
                      value={formData.shortDescription}
                      onChange={handleChange}
                      placeholder="Write a short description"
                      className="w-full rounded-lg border border-zinc-800 bg-black p-3 text-white placeholder:text-zinc-600 outline-none transition duration-200 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                    />
                  </div>

                  {/* Full Description */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-400">
                      Full Description
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={6}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Write full description..."
                      className="w-full resize-none rounded-lg border border-zinc-800 bg-black p-3 text-white placeholder:text-zinc-600 outline-none transition duration-200 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-400">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter item price"
                      className="w-full rounded-lg border border-zinc-800 bg-black p-3 text-white placeholder:text-zinc-600 outline-none transition duration-200 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-400">
                      Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full rounded-lg border border-zinc-800 bg-black p-3 text-white placeholder:text-zinc-600 outline-none transition duration-200 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      slot="close"
                      variant="secondary"
                      type="button"
                      // 🛠️ ফিক্স ১: 'disabled' এর জায়গায় 'isDisabled' ব্যবহার করা হয়েছে
                      isDisabled={isUpdating}
                      className="w-full rounded-lg py-3 text-lg font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 transition duration-200"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      // 🛠️ ফিক্স ২: 'isLoading' এবং 'disabled' প্রপ তুলে দিয়ে কাস্টম টেক্সট এবং 'isDisabled' ব্যবহার করা হয়েছে
                      isDisabled={isUpdating}
                      className="w-full rounded-lg bg-orange-500 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-orange-600 active:scale-[0.99] shadow-md border-none"
                    >
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}