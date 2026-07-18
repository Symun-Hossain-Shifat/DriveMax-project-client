import React from "react";
import { GetAllProducts } from "@/lib/Actions/GetProduct";
import ProductManageTable from "@/app/Components/ProductManageTable";





const ManageProductPage = async () => {
  try {
    const products = await GetAllProducts();

    return (
      <div className="mx-auto w-11/12 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manage Products</h1>
            <p className="mt-2 text-default-500">
              View, edit and delete all products.
            </p>
          </div>

          <span className="rounded-lg bg-default-100 px-4 py-2 text-sm font-medium">
            Total Products: {products?.length || 0}
          </span>
        </div>

        {products && products.length > 0 ? (
          <ProductManageTable products={products}  />
        ) : (
          <div className="rounded-xl border border-dashed py-20 text-center">
            <h2 className="text-xl font-semibold">No Products Found</h2>
            <p className="mt-2 text-default-500">
              There are no products available.
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className="flex min-h-[400px] items-center justify-center">
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