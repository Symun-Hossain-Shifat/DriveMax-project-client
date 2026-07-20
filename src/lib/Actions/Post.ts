import { authHeader } from "./GetToken";


interface Product {
    title: string;
    shortDescription: string;
    description: string;
    price: string;
    image: string;
}
const URL = process.env.NEXT_PUBLIC_SERVER_URI

const PostProduct = async (formData: Product) => {

    const res = await fetch(
        `${URL}/api/products`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...await authHeader()
            },
            body: JSON.stringify(formData),
        }
    );

    const result = await res.json();
    return result;
};

export default PostProduct;