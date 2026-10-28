"use client";

import { PackageCheck, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import type { ApiDestination } from "@/lib/destination";

// Simple list of categories the user can pick from.
const categories = ["Beach", "Mountain", "City", "Countryside", "Island"];

// This object holds empty values for every field.
// We use it to fill the inputs, and to reset the form later.
const initialForm = {
  name: "",
  country: "",
  category: "Beach",
  price: "",
  duration: "",
  departure: "",
  imageUrl: "",
  description: "",
};

// This long Tailwind string is used by every input,
// so we save it here instead of repeating it 7 times.
const fieldClassName =
  "h-11 rounded-md border-0 bg-muted px-3.5 text-sm text-ink placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 dark:bg-input/30";

// Same form for adding and editing: without a destination it POSTs a new
// package, with one it prefills the fields and PUTs the changes instead.
export function DestinationForm({
  destination,
}: {
  destination?: ApiDestination;
}) {
  const isEdit = destination !== undefined;

  const [form, setForm] = useState(() => {
    if (!destination) return initialForm;
    return {
      name: destination.name,
      country: destination.country,
      category: destination.category,
      price: String(destination.price),
      duration: destination.duration,
      departure: destination.departure,
      imageUrl: destination.imageUrl,
      description: destination.description,
    };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // ONE helper for all inputs: give it the field name and the new value.
  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // stop the browser from reloading the page

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // The backend expects "price" as a number, not a string.
      const body = {
        ...form,
        price: Number(form.price),
      };

      const res = await fetch(
        isEdit
          ? `http://localhost:4000/destination/${destination._id}`
          : "http://localhost:4000/add-destination",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      // If the server replied with a problem (like 404 or 500),
      // jump to the catch block below.
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      console.log("Server response:", data);

      if (isEdit) {
        toast.add({
          title: "Changes saved successfully",
          type: "success",
        });
        // Back to the details page, now showing the updated package.
        router.push(`/destination/${destination._id}`);
      } else {
        setSuccess("Travel package added successfully!");
        toast.add({
          title: "Data submit successful",
          type: "success",
        });
        setForm(initialForm); // clear the inputs for the next package
      }
    } catch (err) {
      console.error(err);
      setError(
        isEdit
          ? "Could not save the changes. Please try again."
          : "Could not add the package. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Cancel should leave the form: back to the destination we were editing,
  // or a clean slate when adding a new package.
  const handleCancel = () => {
    if (isEdit) {
      router.push(`/destination/${destination._id}`);
      return;
    }
    setForm(initialForm);
    setError("");
    setSuccess("");
  };

  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-md border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Destination Name */}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="name" className="text-sm text-ink">
              Destination Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Bali Paradise"
              className={fieldClassName}
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              required
            />
          </div>

          {/* Country + Category */}
          <div className="grid gap-2">
            <Label htmlFor="country" className="text-sm text-ink">
              Country <span className="text-red-500">*</span>
            </Label>
            <Input
              id="country"
              placeholder="Indonesia"
              className={fieldClassName}
              value={form.country}
              onChange={(event) => update("country", event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm text-ink">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={form.category}
              onValueChange={(value) => update("category", value ?? "")}
            >
              <SelectTrigger className="h-11 w-full rounded-md border-0 bg-muted px-3.5 text-sm text-ink focus-visible:ring-2 focus-visible:ring-ring/40 dark:bg-input/30">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price + Duration */}
          <div className="grid gap-2">
            <Label htmlFor="price" className="text-sm text-ink">
              Price (USD) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="e.g., 1299"
              className={fieldClassName}
              value={form.price}
              onChange={(event) => update("price", event.target.value)}
              required
              min="0"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration" className="text-sm text-ink">
              Duration <span className="text-red-500">*</span>
            </Label>
            <Input
              id="duration"
              placeholder="e.g., 7 Days/6 Nights"
              className={fieldClassName}
              value={form.duration}
              onChange={(event) => update("duration", event.target.value)}
              required
            />
          </div>

          {/* Departure Date */}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="departure" className="text-sm text-ink">
              Departure Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="departure"
              type="date"
              className={fieldClassName}
              value={form.departure}
              onChange={(event) => update("departure", event.target.value)}
              required
            />
          </div>

          {/* Image URL */}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="imageUrl" className="text-sm text-ink">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              className={fieldClassName}
              value={form.imageUrl}
              onChange={(event) => update("imageUrl", event.target.value)}
            />
          </div>

          {/* Description */}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="description" className="text-sm text-ink">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the travel experience..."
              rows={6}
              className="resize-y rounded-md border-0 bg-muted px-3.5 py-3 text-sm text-ink placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 dark:bg-input/30"
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
              required
            />
          </div>
        </div>

        {/* Simple feedback messages */}
        {error && (
          <p className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-6 rounded-md bg-brand/5 px-4 py-3 text-sm text-brand">
            {success}
          </p>
        )}

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <Button
            type="button"
            onClick={handleCancel}
            className="h-11 gap-2 rounded-md border border-destructive/30 bg-white px-5 text-destructive hover:bg-destructive/5 hover:text-destructive"
          >
            <Trash2 className="size-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="h-11 gap-2 rounded-md bg-brand px-5 text-white hover:bg-brand/90"
          >
            {isEdit ? (
              <>
                <Save className="size-4" />
                {loading ? "Saving..." : "Save Changes"}
              </>
            ) : (
              <>
                <PackageCheck className="size-4" />
                {loading ? "Saving..." : "Add Travel Package"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
