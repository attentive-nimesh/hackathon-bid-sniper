import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signupUser } from "@/utils/auth";
import FormField from "../FormField";
import type { AxiosError } from "axios";

const signupSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupInputs = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success("Account created successfully!");
      navigate("/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message =
        error.response?.data?.message ||
        error?.message ||
        "Signup failed. Please try again.";
      toast.error(message);
    },
  });

  const onSignup = (data: SignupInputs) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSignup)} className="space-y-4">
      <FormField
        type="email"
        name="email"
        placeholder="Email"
        register={register}
        error={errors.email?.message}
      />
      <FormField
        type="password"
        name="password"
        placeholder="Password"
        register={register}
        error={errors.password?.message}
      />
      <FormField
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        register={register}
        error={errors.confirmPassword?.message}
      />
      <Button
        type="submit"
        variant="outline"
        className="w-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
        disabled={isPending}
      >
        {isPending ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
