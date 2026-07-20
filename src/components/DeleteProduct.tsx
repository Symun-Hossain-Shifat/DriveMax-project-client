"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "@heroui/react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { DeleteProduct } from "@/lib/Actions/Delete";


interface DeletePageProps {
  id: string;
}

interface DeleteResponse {
  success?: boolean;
  deletedCount?: number;
  message?: string;
}

export function DeletePage({ id }: DeletePageProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (close: () => void) => {
    setIsDeleting(true);

    try {
      const result = (await DeleteProduct(id)) as DeleteResponse;

      const deleted =
        result.success === true || (result.deletedCount ?? 0) > 0;

      if (deleted) {
        toast.success("Product deleted successfully");
        close();
        router.refresh();
      } else {
        toast.error(result.message ?? "Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal>
      <Button
        variant="secondary"
        aria-label="Delete Product"
        className="rounded-md border border-transparent p-2 text-zinc-400 transition-colors hover:border-red-900/50 hover:bg-red-950/30 hover:text-red-500"
      >
        <Trash2 size={16} />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            {({ close }) => (
              <>
                <Modal.CloseTrigger />

                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-red-500">
                    Delete Product?
                  </h2>

                  <p className="text-sm text-zinc-400">
                    This action will permanently delete this product. This
                    action cannot be undone.
                  </p>

                  <div className="flex justify-end gap-3">
                    <Button
                      slot="close"
                      variant="secondary"
                      isDisabled={isDeleting}
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={() => handleDelete(close)}
                      isDisabled={isDeleting}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      {isDeleting ? "Deleting..." : "Delete Product"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}