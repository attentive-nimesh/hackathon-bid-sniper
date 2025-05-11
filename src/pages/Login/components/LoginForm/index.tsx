import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FormField from "../FormField";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/utils/auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  const onLogin = (data: LoginInputs) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
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
      <Button
        type="submit"
        className="w-full bg-blue-700 border border-blue-600 text-white hover:text-blue-700 hover:bg-white"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
