import * as z from "zod";
import { TRADE_PARAMS, AVAILABLE_PLATFORMS } from "@/constants";

// Define the schema
export const formSchema = z.object({
  sourceEmail: z
    .string()
    .min(1, { message: "Source email is required." })
    .email("Invalid email address."),
  sharedSubscriptions: z.array(
    z
      .object({
        email: z.string().optional(),
        password: z.string().optional(),
      })
      .refine(
        ({ email, password }) => {
          const hasEmail = email?.trim() !== "";
          const hasPassword = password?.trim() !== "";
          return (!hasEmail && !hasPassword) || (hasEmail && hasPassword);
        },
        {
          message: "Both email and password must be filled if one is provided.",
          path: ["email"],
        }
      )
      .refine(
        ({ email }) => {
          const trimmed = email?.trim() || "";
          return trimmed === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
        },
        {
          message: "Invalid email address.",
          path: ["email"],
        }
      )
  ),
  tradeParams: z
    .array(
      z
        .object({
          name: z.string(),
          weightage: z.string().optional(),
          qualification: z.string().optional(),
          //   disqualification: z.string().optional(),
          checked: z.boolean(),
        })
        .refine(
          (data) => {
            // If weightage is provided, qualification and disqualification must be present
            if (data.weightage && data.qualification === "") {
              return false;
            }
            return true;
          },
          {
            message:
              "If weightage is provided, qualification  must be provided.",
            path: ["qualification"],
          }
        )
    )
    .refine(
      (params) => {
        const total = params.reduce((sum, param) => {
          if (param.checked && param.weightage) {
            const num = parseFloat(param.weightage);
            return sum + (isNaN(num) ? 0 : num);
          }
          return sum;
        }, 0);
        return total <= 100;
      },
      {
        message: "Sum of weightage for checked items must not exceed 100.",
      }
    ),
});

// Default values to initialize the form
export const defaultValues = {
  sourceEmail: "",
  sharedSubscriptions: AVAILABLE_PLATFORMS.map((platform) => ({
    platform,
    email: "",
    password: "",
  })),
  tradeParams: TRADE_PARAMS.map((param) => ({
    name: param,
    weightage: "",
    qualification: "",
    // disqualification: "",
    checked: false,
  })),
};

type TradeParam = {
  name: string;
  checked: boolean;
  weightage?: string;
  qualification?: string;
  // disqualification?: string;
};

export type TradeParamsFormFields = {
  sourceEmail: string;
  sharedSubscriptions: {
    email?: string;
    password?: string;
    platform?: string;
  }[];
  tradeParams: TradeParam[];
};
