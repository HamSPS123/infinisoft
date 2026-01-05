import { useState, type FC } from "react";
import { type User, UserRole } from "../../../stores/authTypes";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserSchemaType } from "../../../types/users.interface";
import useUserStore from "../../../stores/users.store";
import { FiSave, FiLoader } from "react-icons/fi";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
}

const UserForm: FC<UserFormProps> = ({
  open,
  onClose,
  selectedUser,
}) => {
  const { createUser, updateUser } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    defaultValues: {
      name: selectedUser?.name || "",
      email: selectedUser?.email || "",
      role: selectedUser?.role || UserRole.USER,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };
  
  const onSubmit = async (data: UserSchemaType) => {
    setLoading(true);
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
        toast.success("User updated successfully!", { toastId: 'user-form-success' });
        handleClose();
      } else {
        await createUser(data);
        toast.success("User created successfully!", { toastId: 'user-form-success' });
        handleClose();
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const errMessage = axiosError?.response?.data?.message || "Failed to save user";
      toast.error(errMessage, { toastId: 'user-form-error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent">
            {selectedUser ? "Edit User" : "Create New User"}
          </DialogTitle>
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={handleClose}
          >
            <FiX className="h-5 w-5" />
          </Button> */}
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Name *
                </label>
                <Input
                  {...register("name")}
                  placeholder="Enter user name"
                  className={errors.name ? "border-red-500" : ""}
                  disabled={loading}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email *
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="user@example.com"
                  className={errors.email ? "border-red-500" : ""}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Role */}
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Role *
                    </label>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={loading}
                    >
                      <SelectTrigger className={`w-full ${errors.role ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(UserRole).map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-sm text-red-500">{errors.role.message}</p>
                    )}
                  </div>
                )}
              />
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
    </Dialog>
  );
};

export default UserForm;