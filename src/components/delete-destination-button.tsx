"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

// Deletes the destination from the details page, then goes back to the list.
export function DeleteDestinationButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleClick = async () => {
    // A second click while the request is in flight is a no-op.
    if (deleting) return;

    if (
      !window.confirm(
        "Delete this destination permanently? This cannot be undone.",
      )
    ) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:4000/destination/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      toast.add({
        title: "Data delete successful",
        type: "success",
      });
      router.push("/destination");
    } catch (err) {
      console.error(err);
      toast.add({
        title: "Could not delete the destination. Please try again.",
        type: "error",
      });
      setDeleting(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={deleting}
      variant="outline"
      className="h-10 gap-2 rounded-md border-red-200 px-4 text-red-500 hover:bg-red-50 hover:text-red-600"
    >
      <Trash2 className="size-4" />
      {deleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
