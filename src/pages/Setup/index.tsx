import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { AVAILABLE_PLATFORMS, TRADE_PARAMS } from "@/constants";
import {
  getOnboarding,
  patchSourceEmail,
  postOnboarding,
} from "@/utils/onboarding";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { SetupGuideTabs } from "./components/SetupGuideTab";
import { BidSourcesTab } from "./components/BidSourcesTab";
import { QualificationsTab } from "./components/Qualifications";
import {
  formSchema,
  defaultValues,
  type TradeParamsFormFields,
} from "./formSchema";

type SetupTabType = "shared" | "form" | "guide";

const Setup = () => {
  const [activeTab, setActiveTab] = useState<SetupTabType>("shared");

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["onboarding"],
    queryFn: getOnboarding,
    retry: false,
    refetchOnReconnect: false,
  });

  const { mutate: submitOnboarding, isPending: isPendingOnboarding } =
    useMutation({
      mutationFn: postOnboarding,
      onSuccess: () => {
        toast.success("Onboarding data saved successfully");
      },
      onError: () => {
        toast.error("Failed to save onboarding data");
      },
    });

  const { mutate: submitSourceEmail, isPending: isSubmittingSourceEmail } =
    useMutation({
      mutationFn: patchSourceEmail,
      onSuccess: (data) => {
        toast.success("Email source set successfully");
        localStorage.setItem("user", JSON.stringify(data?.user));
      },
      onError: () => {
        toast.error("Failed to set email source");
      },
    });

  const isPending = isSubmittingSourceEmail || isPendingOnboarding;

  useEffect(() => {
    if (data) {
      const sharedSubscriptions = AVAILABLE_PLATFORMS.map((platform) => {
        const account = data?.onboarding?.accounts?.find(
          (a) => a.accountType.toLowerCase() === platform.toLowerCase()
        );
        return {
          email: account?.accountEmail || "",
          password: account?.accountPassword || "",
          platform: account?.accountType || "",
        };
      });

      const tradeParams = TRADE_PARAMS.map((param) => {
        const matched = data?.onboarding?.parameters?.find(
          (p) => p.paramName.toLowerCase() === param.toLowerCase()
        );
        return {
          name: param,
          weightage: matched?.weight.toString() || "",
          qualification: matched?.qualification || "",
          // disqualification: matched?.disqualification || "",
          checked: matched?.checked || false,
        };
      });

      const user = localStorage.getItem("user");
      let sourceEmail = "";
      if (user) {
        const parsedData = JSON.parse(user);
        sourceEmail = parsedData.source_email || "";
      }

      methods.reset({
        sharedSubscriptions,
        tradeParams,
        sourceEmail,
      });
    }
  }, [data, methods]);

  const handleNext = () => setActiveTab("form");
  const handlePrevious = () => setActiveTab("shared");
  const handleTabsChange = (tab: string) => setActiveTab(tab as SetupTabType);

  const onSubmit = (data: TradeParamsFormFields) => {
    // Filter out the params where weightage is not provided
    const filteredTradeParams = data.tradeParams.filter(
      (param) => param.checked && param.weightage !== ""
    );

    // Filter out shared subscriptions where either email or password is missing
    const filteredSubscriptions = data.sharedSubscriptions.filter(
      (sub) => sub.email && sub.password
    );
    const payload = {
      onboarding: {
        accounts: filteredSubscriptions.map((sub) => ({
          accountType: sub.platform!,
          accountEmail: sub.email!,
          accountPassword: sub.password!,
        })),
        parameters: filteredTradeParams.map((param) => ({
          paramName: param.name,
          weight: Number(param.weightage),
          qualification: param.qualification!,
          // disqualification: param.disqualification!,
          checked: param.checked,
        })),
      },
    };
    submitSourceEmail({ source_email: data.sourceEmail });
    submitOnboarding(payload);
  };

  if (isLoading)
    return (
      <div className="p-6 space-y-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="space-y-6">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-10 w-24 mt-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );

  if (error)
    return (
      <div className="p-6 space-y-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-red-500">Failed to load onboarding data.</p>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6 space-y-6">
        <Card>
          <Tabs value={activeTab} onValueChange={handleTabsChange}>
            <CardHeader>
              <TabsList className="space-x-2">
                <TabsTrigger
                  className="w-[200px] bg-white text-black data-[state=active]:bg-blue-700 data-[state=active]:text-white transition"
                  value="shared"
                >
                  Bid Sources
                </TabsTrigger>
                <TabsTrigger
                  className="bg-white text-black data-[state=active]:bg-blue-700 data-[state=active]:text-white transition"
                  value="form"
                >
                  Qualifications
                </TabsTrigger>
                <TabsTrigger
                  className="bg-white text-black data-[state=active]:bg-blue-700 data-[state=active]:text-white transition"
                  value="guide"
                >
                  Setup Guide
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            <TabsContent value="shared">
              <BidSourcesTab onNext={handleNext} />
            </TabsContent>

            <TabsContent value="form">
              <QualificationsTab
                onPrevious={handlePrevious}
                isPending={isPending}
              />
            </TabsContent>

            <TabsContent value="guide">
              <SetupGuideTabs />
            </TabsContent>
          </Tabs>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Setup;
