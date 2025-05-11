import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import type { defaultValues } from "../../formSchema";

type QualificationsTabProps = {
  onPrevious: () => void;
  isPending: boolean;
};

export const QualificationsTab = ({
  onPrevious,
  isPending,
}: QualificationsTabProps) => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<typeof defaultValues>();
  const { fields } = useFieldArray({ control, name: "tradeParams" });
  const tradeParams = useWatch({ control, name: "tradeParams" });

  // Calculate select all state
  const allChecked = tradeParams.every((item) => item.checked);
  const someChecked = tradeParams.some((item) => item.checked);
  const selectAllState = allChecked
    ? true
    : someChecked
    ? "indeterminate"
    : false;

  // Toggle select all
  const toggleSelectAll = () => {
    fields.forEach((_, index) => {
      setValue(`tradeParams.${index}.checked`, !allChecked);
    });
  };

  useEffect(() => {
    if (errors?.tradeParams?.root?.message) {
      toast.error(errors?.tradeParams?.root?.message);
    }
  }, [errors]);

  return (
    <CardContent className="p-6 space-y-4">
      <h3 className="text-2xl font-semibold">Qualifications</h3>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-1">
                <Checkbox
                  checked={selectAllState}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-36">Param Name</TableHead>
              <TableHead className="w-20">Weightage</TableHead>
              {/* <TableHead>Disqualification</TableHead> */}
              <TableHead>Qualification</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => {
              return (
                <TableRow key={field.id} className="align-top">
                  <TableCell className="align-top">
                    <Controller
                      control={control}
                      name={`tradeParams.${index}.checked`}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell className="align-top">{field.name}</TableCell>
                  <TableCell className="align-top">
                    <div>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        {...register(`tradeParams.${index}.weightage`)}
                      />
                      {errors.tradeParams?.[index]?.weightage && (
                        <p className="text-red-500 text-sm">
                          {errors.tradeParams[index].weightage.message}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  {/* <TableCell className="align-top">
                      <div>
                        <Input
                          {...register(`tradeParams.${index}.disqualification`)}
                        />
                        {errors.tradeParams?.[index]?.disqualification && (
                          <p className="text-red-500 text-sm">
                            {errors.tradeParams[index].disqualification.message}
                          </p>
                        )}
                      </div>
                    </TableCell> */}

                  <TableCell className="align-top">
                    <div>
                      <Input
                        {...register(`tradeParams.${index}.qualification`)}
                      />
                      {errors.tradeParams?.[index]?.qualification && (
                        <p className="text-red-500 text-sm">
                          {errors.tradeParams[index].qualification.message}
                        </p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          className="hover:bg-blue-700 border border-blue-700 hover:text-white text-blue-700 bg-white"
          variant="outline"
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          className="bg-blue-700 border border-blue-700 text-white hover:text-blue-700 hover:bg-white"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </CardContent>
  );
};
