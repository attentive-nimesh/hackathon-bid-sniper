import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useResults } from "@/hooks/useResults";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import ResultsTable from "./components/Table";
import { BidType } from "@/constants";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ITEMS_PER_PAGE = 20;

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHtml, setSelectedHtml] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(BidType.PUBLIC);

  const [page, setPage] = useState(1);

  const { data, isLoading } = useResults(page, ITEMS_PER_PAGE, {
    min_score: 50,
    max_score: 100,
    sort_order: "desc",
    bid_type: activeTab as BidType,
  });

  const handleTabsChange = (value: string) => {
    setActiveTab(value);
    setPage(1);
  };

  const totalPages = data ? Math.ceil(data.total_results / ITEMS_PER_PAGE) : 1;

  const projects = data?.results || [];

  const handleView = (project: (typeof projects)[0]) => {
    if (project.html_content) {
      setSelectedHtml(project.html_content);
      setIsModalOpen(true);
    } else if (project.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div className="p-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 pt-0">
            <Tabs value={activeTab} onValueChange={handleTabsChange}>
              <TabsList className="mb-2 space-x-2">
                <TabsTrigger
                  className="bg-white text-black data-[state=active]:bg-blue-700 data-[state=active]:text-white transition w-[110px]"
                  value={BidType.PUBLIC}
                >
                  Public
                </TabsTrigger>
                <TabsTrigger
                  className="bg-white text-black data-[state=active]:bg-blue-700 data-[state=active]:text-white transition w-[110px]"
                  value={BidType.PRIVATE}
                >
                  Private
                </TabsTrigger>
              </TabsList>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <ResultsTable
                  projects={projects}
                  isLoading={isLoading}
                  page={page}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onView={handleView}
                  activeTab={activeTab as BidType}
                />
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center pt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      isActive={page === i + 1}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-5xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detail View</DialogTitle>
            </DialogHeader>
            {selectedHtml ? (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedHtml }}
              />
            ) : (
              <p>No content available.</p>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
