import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSave, FiImage, FiPlus, FiX, FiTrash2, FiLoader, FiPackage, FiTag, FiGrid } from "react-icons/fi";
import { useProductStore } from "../../../stores/productStore";
import RichText from "../../common/RichText";
import ImageLibraryDialog, {
  type ImageData,
} from "../../common/ImageLibraryDialog";
import {
  productFormSchema,
  type ProductFormData,
} from "../../../types/product";
import { usePartnerStore } from "../../../stores/partnerStore";
import useProductCategoryStore from "../../../stores/productCategoryStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AxiosError } from "axios";

// Define the error response structure from the backend
interface ErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
}

const ProductForm: React.FC = () => {
  // Get dialog state from Zustand store
  const {
    openDialog,
    currentProduct,
    createProduct,
    updateProduct,
    setOpenDialog,
    setCurrentProduct,
  } = useProductStore();

  // State for image library dialog
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newTag, setNewTag] = useState("");
  const [specifications, setSpecifications] = useState<
    Array<{ title: string; value: string | boolean | number }>
  >([]);
  const [newSpecTitle, setNewSpecTitle] = useState("");
  const [newSpecValue, setNewSpecValue] = useState<string | boolean | number>(
    ""
  );

  // Use product stor

  const { partners, fetchPartners } = usePartnerStore();

  const { categories, fetchCategories } = useProductCategoryStore();

  // Initialize form with React Hook Form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    mode: "onSubmit",
    values: {
      name: currentProduct?.name || "",
      model: currentProduct?.model || "",
      brand: currentProduct?.brand || "",
      sku: currentProduct?.sku || "",
      description: currentProduct?.description || "",
      isActive: currentProduct?.isActive || true,
      image: currentProduct?.image || "",
      productGalleries: currentProduct?.productGalleries || [],
      specifications: currentProduct?.specifications || [],
      tags: currentProduct?.tags || [],
      content: currentProduct?.content || "",
      categoryId: currentProduct?.category?.id || "",
      partnerId: currentProduct?.partner?.id || "",
    },
  });

  // Handle adding a new specification
  const handleAddSpecification = () => {
    // Check if title is valid
    if (
      newSpecTitle.trim() &&
      newSpecValue !== undefined &&
      newSpecValue !== null
    ) {
      // Create new specification object with proper type handling
      const newSpec = {
        title: newSpecTitle.trim(),
        value:
          typeof newSpecValue === "string" ? newSpecValue.trim() : newSpecValue,
      };

      // Add new specification to the list
      const updatedSpecs = [...specifications, newSpec];
      setSpecifications(updatedSpecs);

      // Update the form value for specifications
      setValue("specifications", updatedSpecs);

      // Clear the input fields
      setNewSpecTitle("");
      setNewSpecValue("");
    }
  };

  // Handle removing a specification
  const handleRemoveSpecification = (index: number) => {
    const newSpecs = [...specifications];
    newSpecs.splice(index, 1);
    setSpecifications(newSpecs);
    setValue("specifications", newSpecs);
  };

  // Fetch categories and partners
  useEffect(() => {
    // Fetch partners
    fetchPartners();

    // Fetch categories
    fetchCategories();
  }, [fetchPartners, fetchCategories]);

  // Update form when currentProduct changes
  useEffect(() => {
    if (currentProduct && openDialog) {
      // Set image preview if available
      if (currentProduct.image) {
        setImagePreview(currentProduct.image);
      }

      // Set gallery images if available
      if (currentProduct.productGalleries && currentProduct.productGalleries.length > 0) {
        setGalleryImages(currentProduct.productGalleries);
      }

      // Convert specifications to array format if needed
      if (currentProduct.specifications) {
        const specsArray = Array.isArray(currentProduct.specifications)
          ? currentProduct.specifications
          : Object.entries(currentProduct.specifications).map(([title, value]) => ({
              title,
              value: value?.toString() || ""
            }));
        setSpecifications(specsArray);
      }
    }
  }, [currentProduct, openDialog]);

  // Show error toast if there's an error
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     clearError();
  //   }
  // }, [error, clearError]);

  // Handle image selection from the image library
  const handleImageSelect = (imageData: ImageData) => {
    // Update the form value for image
    setValue("image", imageData.src, { shouldValidate: true });
    // Update the image preview
    setImagePreview(imageData.src);
    // Close the dialog
    setImageDialogOpen(false);
  };

  // Handle gallery image selection
  const handleGalleryImageSelect = (imageData: ImageData) => {
    const newGalleryImages = [...galleryImages, imageData.src];
    setGalleryImages(newGalleryImages);
    setValue("productGalleries", newGalleryImages, { shouldValidate: true });
    setGalleryDialogOpen(false);
  };

  // Handle removing a gallery image
  const handleRemoveGalleryImage = (index: number) => {
    const newGalleryImages = [...galleryImages];
    newGalleryImages.splice(index, 1);
    setGalleryImages(newGalleryImages);
    setValue("productGalleries", newGalleryImages, { shouldValidate: true });
  };

  // Handle adding a new tag
  const handleAddTags = () => {
    if (newTag.trim()) {
      // Split by comma and trim each tag
      const tags = newTag
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      setValue("tags", [...(watch("tags") || []), ...tags]);
      setNewTag("");
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setImagePreview("");
    setGalleryImages([]);
    setSpecifications([]);
    setCurrentProduct(null);
    setLoading(false);
  };

  // Handle form submission
  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      if (openDialog && currentProduct) {
        await updateProduct(currentProduct.id, data);
      } else {
        await createProduct(data);
      }

      // If we reach here, the operation was successful
      toast.success(
        `Product ${openDialog ? "updated" : "created"} successfully!`
      );
      closeDialog();
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      const axiosError = err as AxiosError<ErrorResponse>;
      const errMessage = axiosError?.response?.data?.message || "Failed to save product";
      toast.error(errMessage, {
        toastId: 'product-form-error', // Prevent duplicate toasts
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="w-[95vw] max-w-[1600px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 bg-white z-10 border-b px-6 py-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent">
            {currentProduct ? "Edit Product" : "Create New Product"}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={closeDialog}
          >
            <FiX className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <FiPackage className="text-gray-500" />
                Basic Information
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Product Name *
                  </label>
                  <Input
                    {...register("name")}
                    placeholder="Enter product name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Partner */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Partner *
                  </label>
                  <Select
                    value={watch("partnerId")}
                    onValueChange={(value) => setValue("partnerId", value)}
                  >
                    <SelectTrigger className={`w-full ${errors.partnerId ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select partner" />
                    </SelectTrigger>
                    <SelectContent>
                      {partners.map((partner) => (
                        <SelectItem key={partner.id} value={partner.id}>
                          {partner.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.partnerId && (
                    <p className="text-sm text-red-500">{errors.partnerId.message}</p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <Select
                    value={watch("categoryId")}
                    onValueChange={(value) => setValue("categoryId", value)}
                  >
                    <SelectTrigger className={`w-full ${errors.categoryId ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <p className="text-sm text-red-500">{errors.categoryId.message}</p>
                  )}
                </div>

                {/* Model */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Model</label>
                  <Input
                    {...register("model")}
                    placeholder="Enter model"
                    className={errors.model ? "border-red-500" : ""}
                  />
                  {errors.model && (
                    <p className="text-sm text-red-500">{errors.model.message}</p>
                  )}
                </div>

                {/* Brand */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Brand</label>
                  <Input
                    {...register("brand")}
                    placeholder="Enter brand"
                    className={errors.brand ? "border-red-500" : ""}
                  />
                  {errors.brand && (
                    <p className="text-sm text-red-500">{errors.brand.message}</p>
                  )}
                </div>

                {/* SKU */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">SKU</label>
                  <Input
                    {...register("sku")}
                    placeholder="Enter SKU"
                    className={errors.sku ? "border-red-500" : ""}
                  />
                  {errors.sku && (
                    <p className="text-sm text-red-500">{errors.sku.message}</p>
                  )}
                </div>
                {/* Tags */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiTag className="text-sky-600" />
                    Tags
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTags();
                        }
                      }}
                      placeholder="Enter tags separated by commas"
                    />
                    <Button type="button" onClick={handleAddTags} className="shrink-0">
                      <FiPlus className="mr-2" />
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {watch("tags")?.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 cursor-pointer hover:bg-red-100"
                        onClick={() => {
                          const currentTags = [...(watch("tags") || [])];
                          currentTags.splice(index, 1);
                          setValue("tags", currentTags);
                        }}
                      >
                        {tag}
                        <FiX className="ml-2 h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Short Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    placeholder="Enter product description"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.description ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                {/* Active Status */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={watch("isActive")}
                    onChange={(e) => setValue("isActive", e.target.checked)}
                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Active Product
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Images Card */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <FiImage className="text-gray-500" />
                Product Images
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Image */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Main Product Image</label>
                  <div className="flex items-center gap-4">
                    {imagePreview ? (
                      <div className="relative group">
                        <img
                          src={imagePreview}
                          alt="Product"
                          className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200 group-hover:border-sky-300 transition-all cursor-pointer"
                          onClick={() => setImageDialogOpen(true)}
                        />
                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all" />
                      </div>
                    ) : (
                      <div
                        className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-sky-300 transition-colors"
                        onClick={() => setImageDialogOpen(true)}
                      >
                        <FiImage className="text-gray-400 text-2xl" />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setImageDialogOpen(true)}
                    >
                      <FiImage className="mr-2" />
                      {imagePreview ? "Change" : "Add"} Image
                    </Button>
                  </div>
                  <input type="hidden" {...register("image")} />
                  {errors.image && (
                    <p className="text-sm text-red-500">{errors.image.message}</p>
                  )}
                </div>

                {/* Gallery */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Product Gallery
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {galleryImages.length > 0 &&
                      galleryImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200 group-hover:border-sky-300 transition-all"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveGalleryImage(index)}
                          >
                            <FiX className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    <div
                      className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-sky-300 transition-colors"
                      onClick={() => setGalleryDialogOpen(true)}
                    >
                      <FiPlus className="text-gray-400 text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Specifications Card */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <FiGrid className="text-gray-500" />
                Specifications
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Specification Title"
                  value={newSpecTitle}
                  onChange={(e) => setNewSpecTitle(e.target.value)}
                />
                <Input
                  placeholder="Specification Value"
                  value={String(newSpecValue)}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={handleAddSpecification}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <FiPlus className="mr-2" />
                  Add Spec
                </Button>
              </div>

              {specifications.length > 0 ? (
                <div className="border border-gray-200 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-gray-700 mb-3">Product Specifications</h4>
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded"
                    >
                      <span className="font-semibold text-gray-700 flex-1">{spec.title}</span>
                      <span className="text-gray-600 flex-1">{String(spec.value)}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleRemoveSpecification(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No specifications added yet. Add technical details about your product.
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Content Editor */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <h3 className="text-base font-semibold text-gray-700">Detailed Content</h3>
            </div>
            <div className="p-6">
              <RichText name="content" control={control} label="Content" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white pb-4">
            <Button type="button" variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 min-w-[150px]"
            >
              {isSubmitting || loading ? (
                <>
                  <FiLoader className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Save Product
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>

      {/* Image library dialog for main image */}
      <ImageLibraryDialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        onInsert={handleImageSelect}
      />

      {/* Image library dialog for gallery images */}
      <ImageLibraryDialog
        open={galleryDialogOpen}
        onClose={() => setGalleryDialogOpen(false)}
        onInsert={handleGalleryImageSelect}
      />
    </Dialog>
  );
};

export default ProductForm;
