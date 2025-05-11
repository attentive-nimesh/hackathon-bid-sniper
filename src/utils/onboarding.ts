import request from "./api"; // make sure this includes token via interceptor

type Account = {
  accountType: string;
  accountEmail: string;
  accountPassword: string;
};

type Parameter = {
  paramName: string;
  weight: number;
  qualification: string;
  // disqualification: string;
  checked: boolean;
};

type OnboardingResponse = {
  onboarding: {
    accounts: Account[];
    parameters: Parameter[];
  };
};

export async function getOnboarding(): Promise<OnboardingResponse> {
  const res = await request.get("/api/onboarding");
  return res.data;
}

type PostOnboardingPayload = {
  onboarding: {
    accounts: Account[];
    parameters: Parameter[];
  };
};

export async function postOnboarding(payload: PostOnboardingPayload) {
  const res = await request.post("/api/onboarding", payload);
  return res.data;
}

export async function patchSourceEmail(payload: { source_email: string }) {
  const res = await request.patch("/api/user/source-email", payload);
  return res.data;
}
