import React from "react";
import { GetSpecificProductbyauthoremail } from "@/lib/Actions/GetProduct";


import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProductManageTableuser from "@/app/Components/productmanageforuser";

const ManageProductPage = async () => {
  let session = null;
  let user = null;

  // FIX: getSession-কে try-catch ব্লকের ভেতরে আনা হয়েছে যেন Unauthorized এরর পুরো পেজ ক্রাশ না করায়
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
    user = session?.user;
  } catch (error) {
    console.log("Session authentication failed or user not logged in.");
    // এখানে এরর ক্যাচ হয়ে যাবে, ফলে Next.js আর ক্রাশ করবে না। user ভ্যালু null থাকবে।
  }

  // 1. Guard clause: Handle unauthenticated or missing user state immediately
  if (!user || !user.email) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-500">Access Denied</h2>
          <p className="mt-2 text-default-500">
            Please log in to manage your products.
          </p>
        </div>
      </div>
    );
  }

  try {
    // 2. Fetch products safely now that user.email is guaranteed to exist
    const products = await GetSpecificProductbyauthoremail(user.email);

    return (
      <div className="mx-auto w-11/12 max-w-7xl py-6 md:py-8">
        {/* Responsive Header */}
        <div className="mb-6 md:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Manage Products</h1>
            <p className="mt-1 md:mt-2 text-sm md:text-base text-default-500">
              View, edit and delete all products.
            </p>
          </div>

          <span className="self-start sm:self-auto rounded-lg bg-default-100 px-4 py-2 text-xs md:text-sm font-medium">
            Total Products: {products?.length || 0}
          </span>
        </div>

        {products && products.length > 0 ? (
          <div className="w-full overflow-x-auto rounded-xl shadow-sm">
            <ProductManageTableuser products={products} />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-16 md:py-20 text-center px-4">
            <h2 className="text-lg md:text-xl font-semibold">No Products Found</h2>
            <p className="mt-2 text-sm md:text-base text-default-500">
              There are no products available.
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);

    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-danger">
            Failed to load products
          </h2>
          <p className="mt-2 text-default-500">
            Something went wrong while fetching products.
          </p>
        </div>
      </div>
    );
  }
};

export default ManageProductPage;