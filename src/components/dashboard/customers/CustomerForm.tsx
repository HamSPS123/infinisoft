import { useState, type FC } from "react";
import type {
  Customer,
  CustomerSchemaType,
} from "../../../types/customers.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema } from "../../../types/customers.interface";
import ImageLibraryDialog, {
  type ImageData,
} from "../../common/ImageLibraryDialog";
import RichText from "../../common/RichText";
import useCustomerStore from "../../../stores/customers.store";
import { FiImage, FiSave, FiLoader, FiUser, FiX, FiPlus } from "react-icons/fi";
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

interface CustomerFormProps {
  open: boolean;
  onClose: () => void;
  selectedCustomer: Customer | null;
}

const CustomerForm: FC<CustomerFormProps> = ({
  open,
  onClose,
  selectedCustomer,
}) => {
  const { createCustomer, updateCustomer } = useCustomerStore();
  const [logoDialogOpen, setLogoDialogOpen] = useState<boolean>(false);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    reset,
  } = useForm<CustomerSchemaType>({
    resolver: zodResolver(customerSchema),
    mode: "onSubmit",
    values: {
      name: selectedCustomer?.name || "",
      description: selectedCustomer?.description || "",
      logo: selectedCustomer?.logo || "",
      website: selectedCustomer?.website || "",
      galleries: selectedCustomer?.galleries || [],
    },
  });
  const logoPreview = watch("logo");
  const galleriesPreview = watch("galleries");

  const handleClose = () => {
    reset();
    onClose();
  };
  
  const onSubmit = async (data: CustomerSchemaType) => {
    setLoading(true);
    try {
      if (selectedCustomer) {
        await updateCustomer(selectedCustomer.id, data);
        toast.success("Customer updated successfully!", { toastId: 'customer-form-success' });
        handleClose();
      } else {
        await createCustomer(data);
        toast.success("Customer created successfully!", { toastId: 'customer-form-success' });
        handleClose();
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const errMessage = axiosError?.response?.data?.message || "Failed to save customer";
      toast.error(errMessage, { toastId: 'customer-form-error' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoSelect = (imageData: ImageData) => {
    setValue("logo", imageData.src, { shouldValidate: true });
    setLogoDialogOpen(false);
  };

  const handleGallerySelect = (imageData: ImageData) => {
    setValue("galleries", [...galleriesPreview!, imageData.src], {
      shouldValidate: true,
    });
    setGalleryDialogOpen(false);
  };

  const handleRemoveGallery = (index: number) => {
    const newGalleries = [...galleriesPreview!];
    newGalleries.splice(index, 1);
    setValue("galleries", newGalleries, { shouldValidate: true });
  };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent">
            {selectedCustomer ? "Edit Customer" : "Add New Customer"}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={handleClose}
          >
            <FiX className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <FiUser className="text-gray-500" />
                Customer Information
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Customer Name *
                  </label>
                  <Input
                    {...register("name")}
                    placeholder="Enter customer name"
                    className={errors.name ? "border-red-500" : ""}
                    disabled={loading}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <Input
                    {...register("website")}
                    placeholder="https://example.com"
                    className={errors.website ? "border-red-500" : ""}
                    disabled={loading}
                  />
                  {errors.website && (
                    <p className="text-sm text-red-500">{errors.website.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <FiImage className="text-gray-500" />
                Images
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Logo</label>
                  <div className="flex items-center gap-4">
                    {logoPreview ? (
                      <div className="relative group">
                        <img
                          src={logoPreview}
                          alt="Logo"
                          className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200 group-hover:border-sky-300 transition-all cursor-pointer"
                          onClick={() => setLogoDialogOpen(true)}
                        />
                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all" />
                      </div>
                    ) : (
                      <div
                        className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-sky-300 transition-colors"
                        onClick={() => setLogoDialogOpen(true)}
                      >
                        <FiImage className="text-gray-400 text-2xl" />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLogoDialogOpen(true)}
                      disabled={loading}
                    >
                      <FiImage className="mr-2" />
                      {logoPreview ? "Change" : "Add"} Logo
                    </Button>
                  </div>
                </div>

                {/* Galleries */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Galleries (Max 5)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {galleriesPreview &&
                      galleriesPreview.map((gallery, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={gallery}
                            alt={`Gallery ${index + 1}`}
                            className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200 group-hover:border-sky-300 transition-all"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveGallery(index)}
                          >
                            <FiX className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    {galleriesPreview!.length < 5 && (
                      <div
                        className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-sky-300 transition-colors"
                        onClick={() => setGalleryDialogOpen(true)}
                      >
                        <FiPlus className="text-gray-400 text-2xl" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <h3 className="text-base font-semibold text-gray-700">Description</h3>
            </div>
            <div className="p-6">
              <RichText
                name="description"
                control={control}
                label="Description"
                error={errors.description?.message}
                disabled={loading}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 min-w-[120px]"
            >
              {loading ? (
                <>
                  <FiLoader className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>

      <ImageLibraryDialog
        open={logoDialogOpen}
        onClose={() => setLogoDialogOpen(false)}
        onInsert={handleLogoSelect}
      />

      <ImageLibraryDialog
        open={galleryDialogOpen}
        onClose={() => setGalleryDialogOpen(false)}
        onInsert={handleGallerySelect}
      />
    </Dialog>
  );
};
export default CustomerForm;
