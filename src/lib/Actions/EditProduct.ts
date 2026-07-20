import { authHeader } from "./GetToken";


// Product Interface
interface Product {
    title: string,
    category: string,
    shortDescription: string,
    description: string,
    price: string,
    image: string,

}



export const Editproduct = async (Data: Product, id: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products/${id}`,
        {
            method: "PATCH",
            headers: {
                ...await authHeader(),
                "content-type": "application/json",


            },
            body: JSON.stringify(Data),
        }
    );

    return await res.json();
};