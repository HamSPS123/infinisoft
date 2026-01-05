import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileSchemaType } from '../../types/profile.interface';
import { useAuthStore } from '../../stores/authStore';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiSave, FiLoader, FiAlertCircle, FiCheckCircle, FiShield } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const { user, updateProfile, isLoading, error, clearError } = useAuthStore();
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const onSubmit = async (data: ProfileSchemaType) => {
    try {
      clearError();
      setSuccess(null);
      await updateProfile(data);
      setSuccess('Profile updated successfully');
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Error is handled by the store and displayed in the component
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-sky-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <FiUser className="text-sky-600" />
            My Profile
          </h1>
          <p className="text-gray-600">Manage your personal information and account settings</p>
        </div>

        {/* User Info Card */}
        <Card className="border-sky-200 mb-6">
          <CardHeader className="bg-gradient-to-r from-sky-50 to-sky-100 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FiUser className="text-sky-600" />
                  Account Information
                </CardTitle>
                <CardDescription>Your current account details</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-sky-100 text-sky-700">
                <FiShield className="mr-1 h-3 w-3" />
                {user?.role || 'User'}
              </Badge>
            </div>
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
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiUser className="text-gray-500" />
                    Full Name *
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiMail className="text-gray-500" />
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <h4 className="font-semibold text-sky-900 mb-2 flex items-center gap-2">
                  <FiAlertCircle className="text-sky-600" />
                  Important Information
                </h4>
                <p className="text-sm text-sky-700">
                  Changing your email address may require verification. Make sure you have access to the new email address.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 min-w-[150px]"
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" />
                      Save Changes
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

export default Profile;