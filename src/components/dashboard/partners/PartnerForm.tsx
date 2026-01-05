import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import type { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
}
import "react-toastify/dist/ReactToastify.css";
import { FiArrowLeft, FiSave, FiImage, FiLoader, FiUser, FiGlobe, FiMail, FiPhone, FiMapPin, FiUsers } from "react-icons/fi";
import {
  partnerFormSchema,
  type PartnerFormData,
} from "../../../types/partner";
import { usePartnerStore } from "../../../stores/partnerStore";
import RichText from "../../common/RichText";
import ImageLibraryDialog, {
  type ImageData,
} from "../../common/ImageLibraryDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";

const PartnerForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  // State for image library dialog
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  // Use partner store
  const {
    currentPartner,
    fetchPartnerById,
    createPartner,
    updatePartner,
  } = usePartnerStore();

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<PartnerFormData>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      name: "",
      website: "",
      description: "",
      logo: "",
      content: "",
      isActive: true,
      contactInfo: {
        email: "",
        phone: "",
        address: "",
        contactPerson: "",
      },
    },
  });

  // Destructure for easier access
  const { register, formState: { errors, isSubmitting }, reset, setValue, getValues, control } = form;

  // Fetch partner data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      fetchPartnerById(id);
    }
  }, [id, isEditMode, fetchPartnerById]);

  // Reset form when currentPartner changes
  useEffect(() => {
    if (currentPartner && isEditMode) {
      // Use setValue for each field to ensure the form updates
      setValue('name', currentPartner.name);
      setValue('logo', currentPartner.logo || "");
      setValue('description', currentPartner.description || "");
      setValue('website', currentPartner.website || "");
      setValue('contactInfo', currentPartner.contactInfo || {});
      setValue('isActive', currentPartner.isActive);
      
      // Set logo preview if available
      if (currentPartner.logo) {
        setLogoPreview(currentPartner.logo);
      }
    }
  }, [currentPartner, isEditMode, setValue, reset]);

  // Remove this useEffect - we'll handle errors in the form submission

  // Handle image selection from the image library
  const handleImageSelect = (imageData: ImageData) => {
    console.log(imageData);
    // Update the form value for logo
    form.setValue("logo", imageData.src, { shouldValidate: true });
    // Update the logo preview
    setLogoPreview(imageData.src);
    // Close the dialog
    setImageDialogOpen(false);
  };

  // Open the image library dialog
  const openImageLibrary = () => {
    setImageDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = async (data: PartnerFormData) => {
    try {
      setLoading(true);
      // Ensure contactInfo is properly formatted
      if (!data.contactInfo) {
        data.contactInfo = {};
      }
      
      // Make sure all contactInfo fields are defined to prevent null/undefined issues
      data.contactInfo = {
        email: data.contactInfo.email || '',
        phone: data.contactInfo.phone || '',
        address: data.contactInfo.address || '',
        contactPerson: data.contactInfo.contactPerson || '',
        ...data.contactInfo // Preserve any other fields that might exist
      };
      
      // Process the data
      if (isEditMode && id) {
        await updatePartner(id, data);
        toast.success("Partner updated successfully", { toastId: 'partner-form-success' });
        setTimeout(() => navigate("/admin/partners"), 1500);
      } else {
        await createPartner(data);
        toast.success("Partner created successfully", { toastId: 'partner-form-success' });
        reset();
        setTimeout(() => navigate("/admin/partners"), 1500);
      }
    } catch (err: unknown) {
      console.error('Error submitting partner form:', err);
      const axiosError = err as AxiosError<ErrorResponse>;
      const errMessage = axiosError?.response?.data?.message || "Failed to save partner";
      toast.error(errMessage, { toastId: 'partner-form-error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <FiLoader className="animate-spin text-5xl text-sky-600 mb-4" />
        <p className="text-gray-600">Loading partner data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-sky-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Image Library Dialog */}
      <ImageLibraryDialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        onInsert={handleImageSelect}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/partners")}
            className="hover:bg-sky-50"
          >
            <FiArrowLeft className="mr-2" />
            Back to Partners
          </Button>
          <Badge variant="secondary" className="text-sm">
            {isEditMode ? "Edit Mode" : "Create Mode"}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent">
          {isEditMode ? "Edit Partner" : "Create New Partner"}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEditMode ? "Update partner information and details" : "Add a new business partner to your network"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-600 to-sky-600 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FiUser className="text-2xl" />
              Basic Information
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Partner Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiUsers className="text-sky-600" />
                  Partner Name *
                </label>
                <Input
                  {...register("name")}
                  placeholder="Enter partner name"
                  className={`h-11 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiGlobe className="text-sky-600" />
                  Website
                </label>
                <Input
                  {...register("website")}
                  placeholder="https://example.com"
                  className={`h-11 ${errors.website ? "border-red-500" : ""}`}
                />
                {errors.website && (
                  <p className="text-sm text-red-500">{errors.website.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Enter partner description"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  errors.description ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Logo Section */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FiImage className="text-sky-600" />
                Partner Logo
              </label>
              <div className="flex items-center gap-6">
                {logoPreview ? (
                  <div className="relative group">
                    <img
                      src={logoPreview}
                      alt="Partner Logo"
                      className="w-24 h-24 rounded-xl object-cover border-2 border-gray-200 shadow-sm group-hover:border-sky-300 transition-all"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all" />
                  </div>
                ) : (
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                    <FiImage className="text-gray-400 text-2xl" />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={openImageLibrary}
                    className="hover:bg-sky-50 hover:border-sky-300"
                  >
                    <FiImage className="mr-2" />
                    {logoPreview ? "Change Logo" : "Add Logo"}
                  </Button>
                  {logoPreview && (
                    <p className="text-xs text-gray-500">Click to change the logo</p>
                  )}
                </div>
              </div>
              <input type="hidden" {...register("logo")} />
              {errors.logo && (
                <p className="text-sm text-red-500">{errors.logo.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FiMail className="text-2xl" />
              Contact Information
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiMail className="text-emerald-600" />
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="contact@example.com"
                  className="h-11"
                  onChange={(e) => {
                    const newContactInfo = { ...getValues('contactInfo') || {} };
                    newContactInfo.email = e.target.value;
                    setValue('contactInfo', newContactInfo);
                  }}
                  defaultValue={(currentPartner?.contactInfo?.email && typeof currentPartner.contactInfo.email === 'string') ? currentPartner.contactInfo.email : ""}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiPhone className="text-emerald-600" />
                  Phone
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="h-11"
                  onChange={(e) => {
                    const newContactInfo = { ...getValues('contactInfo') || {} };
                    newContactInfo.phone = e.target.value;
                    setValue('contactInfo', newContactInfo);
                  }}
                  defaultValue={(currentPartner?.contactInfo?.phone && typeof currentPartner.contactInfo.phone === 'string') ? currentPartner.contactInfo.phone : ""}
                />
              </div>

              {/* Contact Person */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiUser className="text-emerald-600" />
                  Contact Person
                </label>
                <Input
                  placeholder="John Doe"
                  className="h-11"
                  onChange={(e) => {
                    const newContactInfo = { ...getValues('contactInfo') || {} };
                    newContactInfo.contactPerson = e.target.value;
                    setValue('contactInfo', newContactInfo);
                  }}
                  defaultValue={(currentPartner?.contactInfo?.contactPerson && typeof currentPartner.contactInfo.contactPerson === 'string') ? currentPartner.contactInfo.contactPerson : ""}
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiMapPin className="text-emerald-600" />
                  Address
                </label>
                <textarea
                  rows={2}
                  placeholder="123 Business St, City, Country"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) => {
                    const newContactInfo = { ...getValues('contactInfo') || {} };
                    newContactInfo.address = e.target.value;
                    setValue('contactInfo', newContactInfo);
                  }}
                  defaultValue={(currentPartner?.contactInfo?.address && typeof currentPartner.contactInfo.address === 'string') ? currentPartner.contactInfo.address : ""}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Editor Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
            <h2 className="text-xl font-semibold text-white">
              Detailed Content
            </h2>
          </div>
          <div className="p-6">
            <RichText name="content" control={control} label="Content" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/partners")}
            className="hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 shadow-lg hover:shadow-xl transition-all duration-200 min-w-[150px]"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FiSave className="mr-2" />
                Save Partner
              </>
            )}
          </Button>
        </div>
      </form>
      </Form>
    </div>
  );
};

export default PartnerForm;
