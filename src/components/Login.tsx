import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import type { LoginSchema } from "../types/login.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../types/login.type";
import { useAuthStore } from "../stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const {isAuthenticated} = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginSchema) => {
    const { email, password } = data;
    const success = await login({ email, password });
    if (success) {
      // Redirect to dashboard on successful login
      navigate("/admin");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50/30 to-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-sky-100 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 pb-6 border-b border-gray-100">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-center"
            >
              {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-sky-500/30">
                <FiShield size={28} className="text-white" />
              </div> */}
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-500">
                Sign in to continue to your dashboard
              </p>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="p-8 pt-6">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiMail size={18} />
                  </div>
                  <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className={`pl-12 h-12 border-2 rounded-xl transition-all ${
                      errors.email 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                        : "border-gray-200 focus:border-sky-500 focus:ring-sky-500/20"
                    }`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiLock size={18} />
                  </div>
                  <Input
                    id="password"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`pl-12 pr-12 h-12 border-2 rounded-xl transition-all ${
                      errors.password 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                        : "border-gray-200 focus:border-sky-500 focus:ring-sky-500/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-600 transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </form>

            {/* Footer */}
            {/* <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Protected by <span className="font-semibold text-sky-600">InfiniSoft Security</span>
              </p>
            </div> */}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600">
            © 2025 InfiniSoft Solutions. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
