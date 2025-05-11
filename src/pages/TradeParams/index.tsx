import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formSchema,
  defaultValues,
  type TradeParamsFormFields,
} from "./formSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SetupGuideTabs } from "./components/SetupGuideTab";
import { SharedSubscriptionTab } from "./components/SharedSubscription";
import { TradeParamsFormTab } from "./components/TradeParamsForm";
import { useEffect, useState } from "react";
import { AVAILABLE_PLATFORMS, TRADE_PARAMS } from "@/constants";
import {
  getOnboarding,
  patchSourceEmail,
  postOnboarding,
} from "@/utils/onboarding";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type TradeParamsTabType = "shared" | "form" | "guide";

const TradeParams = () => {
  const [activeTab, setActiveTab] = useState<TradeParamsTabType>("shared");

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
    const user = localStorage.getItem("user");
    if (user) {
      const parsedData = JSON.parse(user);
      methods.reset({
        sourceEmail: parsedData.source_email || "",
      });
    }
  }, [methods]);

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

      methods.reset({
        sharedSubscriptions,
        tradeParams,
      });
    }
  }, [data, methods]);

  const handleNext = () => setActiveTab("form");
  const handlePrevious = () => setActiveTab("shared");
  const handleTabsChange = (tab: string) =>
    setActiveTab(tab as TradeParamsTabType);

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
        <Tabs value={activeTab} onValueChange={handleTabsChange}>
          <TabsList className="mb-6">
            <TabsTrigger
              className="bg-white text-black data-[state=active]:bg-blue-700 data-[state=active]:text-white transition"
              value="shared"
            >
              Shared Subscription
            </TabsTrigger>
            <TabsTrigger
              className="bg-white text-black data-[state=active]:bg-blue-700 data-[state=active]:text-white transition"
              value="form"
            >
              Trade Params
            </TabsTrigger>
            <TabsTrigger
              className="bg-white text-black data-[state=active]:bg-blue-700 data-[state=active]:text-white transition"
              value="guide"
            >
              Setup Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shared">
            <SharedSubscriptionTab onNext={handleNext} />
          </TabsContent>

          <TabsContent value="form">
            <TradeParamsFormTab
              onPrevious={handlePrevious}
              isPending={isPending}
            />
          </TabsContent>

          <TabsContent value="guide">
            <SetupGuideTabs />
          </TabsContent>
        </Tabs>
      </form>
    </FormProvider>
  );
};

export default TradeParams;
