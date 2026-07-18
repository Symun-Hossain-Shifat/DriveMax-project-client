import AddItemForm from "@/components/AddProduct";



export default function AddItemPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10 rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-6 py-12 text-center shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          Add New Item
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm text-orange-100 sm:text-base md:text-lg">
          Fill in the details below to add a new item to your collection. Make sure
          the information is accurate so others can easily discover your item.
        </p>
      </div>

      <AddItemForm />
    </div>
  );
}