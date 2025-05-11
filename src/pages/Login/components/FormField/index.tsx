import { Input } from "@/components/ui/input";
import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  type?: string;
  name: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
}

export default function FormField<T extends FieldValues>({
  type = "text",
  name,
  placeholder,
  register,
  error,
}: FormFieldProps<T>) {
  return (
    <div>
      <Input className="bg-white" type={type} placeholder={placeholder} {...register(name)} />
      {error && <p className="font-semibold text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
