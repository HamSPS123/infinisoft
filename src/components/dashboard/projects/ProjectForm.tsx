import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSave, FiImage, FiPlus, FiX, FiLoader, FiFileText } from "react-icons/fi";
import { projectService } from "../../../services/projectService";
import type { Project, ProjectFormData } from "../../../types/project";
import { ProjectStatus } from "../../../types/project";
import { useAuthStore } from "../../../stores/authStore";
import RichText from "../../common/RichText";
import ImageLibraryDialog, {
  type ImageData,
} from "../../common/ImageLibraryDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { z } from "zod";
import type { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
}

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  onSuccess: () => void;
}

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  cover: z.string().optional(),
  imageGalleries: z.array(z.string()).optional(),
  status: z.nativeEnum(ProjectStatus),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const ProjectForm: React.FC<ProjectFormProps> = ({ open, onClose, project, onSuccess }) => {
  const { user } = useAuthStore();
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
    watch,
    reset,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      content: "",
      cover: "",
      imageGalleries: [],
      status: ProjectStatus.DRAFT,
    },
  });

  useEffect(() => {
    if (project && open) {
      reset({
        title: project.title,
        description: project.description || "",
        content: project.content,
        cover: project.cover || "",
        imageGalleries: project.imageGalleries || [],
        status: project.status,
      });

      if (project.cover) {
        setImagePreview(project.cover);
      }

      if (project.imageGalleries && project.imageGalleries.length > 0) {
        setGalleryImages(project.imageGalleries);
      }
    } else if (!project && open) {
      reset({
        title: "",
        description: "",
        content: "",
        cover: "",
        imageGalleries: [],
        status: ProjectStatus.DRAFT,
      });
      setImagePreview("");
      setGalleryImages([]);
    }
  }, [project, open, reset]);

  const handleImageSelect = (imageData: ImageData) => {
    setValue("cover", imageData.src, { shouldValidate: true });
    setImagePreview(imageData.src);
    setImageDialogOpen(false);
  };

  const handleGalleryImageSelect = (imageData: ImageData) => {
    const newGalleryImages = [...galleryImages, imageData.src];
    setGalleryImages(newGalleryImages);
    setValue("imageGalleries", newGalleryImages, { shouldValidate: true });
    setGalleryDialogOpen(false);
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGalleryImages = [...galleryImages];
    newGalleryImages.splice(index, 1);
    setGalleryImages(newGalleryImages);
    setValue("imageGalleries", newGalleryImages, { shouldValidate: true });
  };

  const closeDialog = () => {
    setImagePreview("");
    setGalleryImages([]);
    setLoading(false);
    reset();
    onClose();
  };

  const onSubmit = async (data: ProjectFormValues) => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const dataToSubmit: ProjectFormData = {
        ...data,
        authorId: user.id,
      };

      if (project) {
        await projectService.updateProject(project.id, dataToSubmit);
        toast.success("Project updated successfully!");
      } else {
        await projectService.createProject(dataToSubmit);
        toast.success("Project created successfully!");
      }

      closeDialog();
      onSuccess();
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      const axiosError = err as AxiosError<ErrorResponse>;
      const errMessage = axiosError?.response?.data?.message || "Failed to save project";
      toast.error(errMessage, {
        toastId: 'project-form-error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
      <DialogContent className="w-[95vw] max-w-[1600px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 bg-white z-10 border-b px-6 py-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent">
            {project ? "Edit Project" : "Create New Project"}
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
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <FiFileText className="text-gray-500" />
                Basic Information
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Project Title *
                  </label>
                  <Input
                    {...register("title")}
                    placeholder="Enter project title"
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Short Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    placeholder="Enter project description"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.description ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Select
                    value={watch("status")?.toString()}
                    onValueChange={(value) => setValue("status", Number(value) as ProjectStatus)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ProjectStatus.DRAFT.toString()}>Draft</SelectItem>
                      <SelectItem value={ProjectStatus.PUBLIC.toString()}>Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <FiImage className="text-gray-500" />
                Project Images
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Cover Image</label>
                  <div className="flex items-center gap-4">
                    {imagePreview ? (
                      <div className="relative group">
                        <img
                          src={imagePreview}
                          alt="Project Cover"
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
                  <input type="hidden" {...register("cover")} />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Image Gallery
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

          <hr className="border-gray-200" />

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <h3 className="text-base font-semibold text-gray-700">Detailed Content</h3>
            </div>
            <div className="p-6">
              <RichText name="content" control={control} label="Content" />
              {errors.content && (
                <p className="text-sm text-red-500 mt-2">{errors.content.message}</p>
              )}
            </div>
          </div>

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
                  Save Project
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>

      <ImageLibraryDialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        onInsert={handleImageSelect}
      />

      <ImageLibraryDialog
        open={galleryDialogOpen}
        onClose={() => setGalleryDialogOpen(false)}
        onInsert={handleGalleryImageSelect}
      />
    </Dialog>
  );
};

export default ProjectForm;
