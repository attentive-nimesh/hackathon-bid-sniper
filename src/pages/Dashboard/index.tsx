import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { formatCustomDate } from "@/utils/helper";

const ITEMS_PER_PAGE = 20;

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHtml, setSelectedHtml] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  const { data, isLoading } = useResults(page, ITEMS_PER_PAGE, {
    min_score: 50,
    max_score: 100,
    sort_order: "desc",
  });

  const totalPages = data ? Math.ceil(data.total_results / ITEMS_PER_PAGE) : 1;

  const projects = data?.results || [];

  const handleView = (project: (typeof projects)[0]) => {
    if (project.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    } else if (project.html_content) {
      setSelectedHtml(project.html_content);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="p-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Dashboard</CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableHead className="w-[80px]">#</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="w-[100px]">Score</TableHead>
                    <TableHead className="w-[200px] text-right">
                      Email Received Date
                    </TableHead>
                    <TableHead className="w-[200px] text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading && (
                    <>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <TableRow key={`loading-${i}`}>
                          <TableCell>
                            <Skeleton className="h-4 w-8" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-32" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-20" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-20" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-8 w-16" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                  {!isLoading && projects.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                  {!isLoading &&
                    projects.length !== 0 &&
                    projects?.map((project, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="w-[80px]">
                          {(page - 1) * ITEMS_PER_PAGE + i + 1}
                        </TableCell>
                        <TableCell>{project?.email_subject || ""}</TableCell>
                        <TableCell className="w-[100px]">
                          {project?.score}
                        </TableCell>
                        <TableCell className="text-right w-[200px]">
                          {formatCustomDate(project?.email_date)}
                        </TableCell>
                        <TableCell className="text-right w-[200px]">
                          <Button
                            className="bg-blue-700 border border-blue-700 text-white hover:text-blue-700 hover:bg-white"
                            onClick={() => handleView(project)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
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
    </>
  );
}
