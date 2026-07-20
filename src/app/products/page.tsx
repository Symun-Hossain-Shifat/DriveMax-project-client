
import { GetAllProducts } from "@/lib/Actions/GetProduct";
import ProductGridClient from "./subProdutspage";



export interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  image: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default async function ProductGrid() {
  
  const data: Product[] = await GetAllProducts();
  return <ProductGridClient products={data ?? []} />;
}