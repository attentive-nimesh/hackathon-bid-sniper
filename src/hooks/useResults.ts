// hooks/useResults.ts
import { useQuery } from "@tanstack/react-query";
import request from "@/utils/api";
import type { BidType } from "@/constants";
import { useAuth } from "@/context/AuthContext";

interface Filters {
  date?: string;
  url?: string;
  content_type?: string;
  status?: string;
  min_score?: number;
  max_score?: number;
  sort_order?: string;
  bid_type?: BidType;
}

export interface ResultItem {
  id: number;
  email: string;
  email_date: string;
  url?: string;
  html_content?: string;
  content_type: string;
  status: string;
  email_subject: string;
  score: number;
  dueDate: string;
}

export interface ResultsEmailResponse {
  total_results: number;
  page: number;
  page_size: number;
  results: ResultItem[];
}

export const useResults = (
  page: number,
  pageSize: number,
  filters: Filters
) => {
  const { user } = useAuth();
  const { source_email: email } = user || { source_email: "" };

  return useQuery<ResultsEmailResponse>({
    queryKey: ["results", email, page, pageSize, filters],
    queryFn: async () => {
      const res = await request.post("api/results/email", {
        email,
        page,
        page_size: pageSize,
        filters,
      });
      return res.data;
    },
    enabled: !!email,
    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 10000,
  });
};
