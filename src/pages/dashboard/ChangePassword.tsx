import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema, type ChangePasswordSchemaType } from '../../types/profile.interface';
import { useAuthStore } from '../../stores/authStore';
import { toast } from 'react-toastify';
import { FiLock, FiSave, FiLoader, FiShield, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ChangePassword = () => {
  const { changePassword, isLoading, error, clearError } = useAuthStore();
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    try {
      clearError();
      setSuccess(null);
      await changePassword(data);
      setSuccess('Password changed successfully');
      toast.success('Password changed successfully');
      reset(); // Clear form after successful password change
    } catch (error) {
      console.error('Error changing password:', error);
      // Error is handled by the store and displayed in the component
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-sky-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <FiLock className="text-sky-600" />
            Change Password
          </h1>
          <p className="text-gray-600">Update your password to keep your account secure</p>
        </div>

        <Card className="border-sky-200">
          <CardHeader className="bg-gradient-to-r from-sky-50 to-sky-100 border-b">
            <CardTitle className="flex items-center gap-2">
              <FiShield className="text-sky-600" />
              Security Settings
            </CardTitle>
            <CardDescription>Choose a strong password to protect your account</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <FiAlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
                <FiCheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiLock className="text-gray-500" />
                    Current Password *
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    {...register('currentPassword')}
                    className={errors.currentPassword ? 'border-red-500' : ''}
                    disabled={isLoading}
                  />
                  {errors.currentPassword && (
                    <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
                  )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiShield className="text-gray-500" />
                    New Password *
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...register('newPassword')}
                    className={errors.newPassword ? 'border-red-500' : ''}
                    disabled={isLoading}
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                  )}
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <h4 className="font-semibold text-sky-900 mb-2">Password Requirements:</h4>
                <ul className="text-sm text-sky-700 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Include at least one number</li>
                  <li>• Include at least one special character</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 min-w-[180px]"
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="mr-2 animate-spin" />
                      Changing Password...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" />
                      Change Password
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChangePassword;