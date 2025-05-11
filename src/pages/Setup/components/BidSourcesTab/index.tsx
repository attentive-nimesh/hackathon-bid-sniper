import { useFormContext, useFieldArray } from "react-hook-form";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AVAILABLE_PLATFORMS } from "@/constants";
import type { TradeParamsFormFields } from "../../formSchema";

type BidSourcesTabProps = {
  onNext: () => void;
};

export const BidSourcesTab = ({ onNext }: BidSourcesTabProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TradeParamsFormFields>();
  const { fields } = useFieldArray({
    control,
    name: "sharedSubscriptions",
  });

  return (
    <CardContent className="p-6 space-y-6">
      <h3 className="text-2xl font-semibold">Bid Sources</h3>
      <div className="flex flex-col gap-2">
        <Label htmlFor="sourceEmail">Source Email (for forwarding)</Label>
        <Input
          id="sourceEmail"
          type="email"
          placeholder="example@domain.com"
          {...register("sourceEmail")}
        />
        {errors.sourceEmail && (
          <span className="text-red-500 text-sm">
            {errors.sourceEmail.message}
          </span>
        )}
      </div>
      <Label>Shared Subscriptions</Label>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col md:flex-row gap-4 items-start w-full"
        >
          <Label className="w-48 pt-1">{AVAILABLE_PLATFORMS[index]}</Label>
          <div className="flex flex-col gap-2 w-full">
            <Input
              {...register(`sharedSubscriptions.${index}.email`)}
              placeholder="Email"
              type="email"
            />
            {errors.sharedSubscriptions?.[index]?.email && (
              <span className="text-red-500 text-sm">
                {errors.sharedSubscriptions[index]?.email?.message}
              </span>
            )}
            <Input
              {...register(`sharedSubscriptions.${index}.password`)}
              placeholder="Password"
              type="password"
            />
            {errors.sharedSubscriptions?.[index]?.password && (
              <span className="text-red-500 text-sm">
                {errors.sharedSubscriptions[index]?.password?.message}
              </span>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          className="bg-blue-700 border border-blue-700 text-white hover:text-blue-700 hover:bg-white"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </CardContent>
  );
};
