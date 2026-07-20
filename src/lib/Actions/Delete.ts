import { authHeader } from "./GetToken";




interface DeleteResponse {
    success: boolean;
    message?: string;
    deletedCount?: number;
    [key: string]: any;
}

export const DeleteProduct = async (id: string): Promise<DeleteResponse> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products/${id}`,
        {
            method: "DELETE",
            headers: {
                ...await authHeader()
            },
        }
    );

    return await res.json();
};