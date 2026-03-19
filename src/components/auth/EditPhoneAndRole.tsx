"use client";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { AiOutlineUser, AiOutlineTool, AiOutlineShop } from "react-icons/ai";
import {
  UpdatePhoneAndRoleData,
  updatePhoneAndRoleSchema,
} from "@/features/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EditPhoneAndRoleAction } from "@/features/auth/auth.action";

// Define form schema type

const EditPhoneAndRole = ({ isAdmin }: { isAdmin: boolean }) => {
  // 1. Setup React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePhoneAndRoleData>({
    resolver: zodResolver(updatePhoneAndRoleSchema),
    defaultValues: {
      phone: "",
      role: "user",
    },
  });

  const isAdminExists = isAdmin;

  const roles = [
    {
      id: "admin",
      label: "Admin",
      icon: <AiOutlineTool />,
      disabled: isAdminExists, // Disabled if admin already exists
      error: isAdminExists ? "Admin already exists" : null,
    },
    {
      id: "vendor",
      label: "Vendor",
      icon: <AiOutlineShop />,
      disabled: false,
    },
    {
      id: "user",
      label: "User",
      icon: <AiOutlineUser />,
      disabled: false,
    },
  ];

  const router = useRouter();

  const onSubmit = async (data: UpdatePhoneAndRoleData) => {
    console.log("Form Data:", data);
    const res = await EditPhoneAndRoleAction(data);
    if (res.status === "error") {
      toast.error(res.message);
    } else if (res.status === "success") {
      toast.success(res.message);
      router.push("/");
      router.refresh();
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0e0a] relative overflow-hidden">
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md px-2"
      >
        <Card className="bg-[#1c1b14] border-stone-800 rounded-2xl shadow-2xl">
          <CardHeader className="text-center">
            <h1 className="text-yellow-400 text-3xl font-bold italic tracking-tighter">
              Choose Your Role
            </h1>
            <h2 className="text-white text-sm font-semibold">
              Select your role and enter your phone number to continue
            </h2>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Phone Number"
                      type="text"
                      inputMode="numeric"
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                      maxLength={10}
                      className={cn(
                        "border-stone-700 text-white h-12 focus:border-yellow-500 transition-colors",
                        errors.phone && "border-red-500",
                      )}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-[10px] text-red-500 pt-2 font-semibold tracking-wider uppercase">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Role Grid with Controller */}
              <div className="space-y-2">
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-3 gap-4">
                      {roles.map((role) => {
                        const isSelected = field.value === role.id;

                        return (
                          <button
                            key={role.id}
                            type="button" // Important: prevents form submission on click
                            disabled={role.disabled}
                            onClick={() => field.onChange(role.id)}
                            className={cn(
                              "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 aspect-square group relative",
                              role.disabled
                                ? "bg-[#14130d] border-[#222] opacity-40 cursor-not-allowed"
                                : isSelected
                                  ? "bg-yellow-500/10 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                                  : "bg-[#1e1e1e] border-[#333] hover:border-yellow-500/50",
                            )}
                          >
                            <div
                              className={cn(
                                "text-2xl mb-2 transition-colors",
                                isSelected
                                  ? "text-yellow-500"
                                  : "text-stone-400 group-hover:text-yellow-500",
                              )}
                            >
                              {role.icon}
                            </div>
                            <span
                              className={cn(
                                "font-semibold text-sm transition-colors",
                                isSelected
                                  ? "text-yellow-400"
                                  : "text-stone-300 group-hover:text-yellow-400",
                              )}
                            >
                              {role.label}
                            </span>

                            {role.error && (
                              <span className="text-[9px] text-red-500 mt-2 leading-tight text-center font-medium">
                                {role.error}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
                {errors.role && (
                  <p className="text-[10px] text-red-500 pt-1 font-semibold tracking-wider uppercase text-center">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-yellow-400 text-black font-bold text-md hover:bg-yellow-300 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Submit Now"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EditPhoneAndRole;
