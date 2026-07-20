'use client';

import { Eye } from "lucide-react";
import Link from "next/link";
import { Editpage } from "./EditProduct";
import { DeletePage } from "./DeleteProduct";

export interface Product {
  _id: string;
  title: string;
  category: string; // এখানে '?' চিহ্নটি বাদ দিয়ে শুধু string করে দিন
  shortDescription: string;
  description: string;
  price: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
interface ProductManageTableProps {
  products: Product[];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ProductManageTable({ products }: ProductManageTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-black py-12 text-zinc-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-black shadow-md">
      <table className="min-w-full divide-y divide-zinc-800 text-sm">
        <thead className="bg-zinc-950">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-zinc-400">ID</th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-400">Title</th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-400">Price</th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-400">Created At</th>
            <th className="px-4 py-3 text-right font-semibold text-zinc-400">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-900 bg-black">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-zinc-950/50 transition-colors">
              <td className="max-w-[120px] truncate px-4 py-3 text-zinc-500">
                {product._id}
              </td>
              <td className="px-4 py-3 font-medium text-white">
                {product.title}
              </td>
              <td className="px-4 py-3 text-zinc-300">
                ${product.price}
              </td>
              <td className="px-4 py-3 text-zinc-400">
                {formatDate(product.createdAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/products/${product._id}`}
                    className="rounded-md p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
                  >
                    <Eye size={16} />
                  </Link>


                  <Editpage product={product} />

                  <DeletePage id={product._id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManageTable;