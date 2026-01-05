import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  categoryFormSchema,
  type CategoryFormData,
} from "../../../types/categories.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import useProductCategoryStore from "../../../stores/productCategoryStore";
import { FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductCategoryFormProps {
  openDialog: boolean;
  onHide: () => void;
}

const ProductCategoryForm: FC<ProductCategoryFormProps> = ({
  openDialog,
  onHide,
}) => {
  const { currentCategory, createCategory, updateCategory } =
    useProductCategoryStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    values: {
      name: currentCategory?.name || "",
      description: currentCategory?.description || "",
      isActive: currentCategory?.isActive || true,
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (currentCategory) {
        // Update existing category
        await updateCategory(currentCategory.id, data);
        toast.success("Category updated successfully!", { toastId: 'category-form-success' });
        onHide();
      } else {
        // Create new category
        const newCategory: CategoryFormData = {
          name: data.name,
          description: data.description,
          isActive: data.isActive,
        };
        await createCategory(newCategory);
        toast.success("Category created successfully!", { toastId: 'category-form-success' });
        onHide();
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const errMessage = axiosError?.response?.data?.message || "Failed to save category";
      toast.error(errMessage, { toastId: 'category-form-error' });
    }
  };

  const handleCloseDialog = () => {
    reset();
    onHide();
  };

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => !open && handleCloseDialog()}
    >
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent">
            {currentCategory ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={handleCloseDialog}
          >
            <FiX className="h-5 w-5" />
          </Button> */}
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
          <div className="space-y-4">
            {/* Category Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Category Name *
                  </label>
                  <Input
                    {...field}
                    placeholder="Enter category name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Enter category description"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.description ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700"
            >
              <FiSave className="mr-2" />
              {currentCategory ? "Update" : "Create"} Category
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ProductCategoryForm;
