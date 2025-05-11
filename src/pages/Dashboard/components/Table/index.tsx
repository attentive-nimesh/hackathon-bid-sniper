import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCustomDate } from "@/utils/helper";
import type { ResultItem } from "@/hooks/useResults";
import { BidType } from "@/constants";
import { Link } from "react-router-dom";
import { LinkIcon, ChartSplineIcon } from "lucide-react";
import Loader from "../Loader";
import { useState } from "react";
import { AnalysisModal } from "../AnalysisModal";

interface ResultsTableProps {
  projects: ResultItem[];
  isLoading: boolean;
  page: number;
  itemsPerPage: number;
  onView: (project: ResultItem) => void;
  activeTab: BidType;
}

export default function ResultsTable({
  projects,
  isLoading,
  page,
  itemsPerPage,
  onView,
  activeTab,
}: ResultsTableProps) {
  const [selectedParams, setSelectedParams] = useState<
    | {
        name: string;
        score: number;
        contribution: string;
        explanation: string;
      }[]
    | null
  >(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            <TableHead className="w-[80px]">#</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="w-[100px]">Score</TableHead>
            <TableHead className="w-[200px]">Email Received Date</TableHead>
            <TableHead className="w-[200px] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project, i) => (
              <TableRow key={i}>
                <TableCell>{(page - 1) * itemsPerPage + i + 1}</TableCell>
                <TableCell>{project?.email_subject || ""}</TableCell>
                <TableCell>{project?.score}</TableCell>
                <TableCell>{formatCustomDate(project?.email_date)}</TableCell>
                <TableCell className="text-right">
                  <div className="space-x-3">
                    {activeTab === BidType.PUBLIC ? (
                      <Link
                        to={project?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        <LinkIcon
                          height={16}
                          width={16}
                          className="inline-block mr-2"
                        />
                        Open Link
                      </Link>
                    ) : (
                      <Button
                        className="bg-blue-700 border border-blue-700 text-white hover:text-blue-700 hover:bg-white"
                        onClick={() => onView(project)}
                      >
                        View
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const params = Object.entries(
                          project?.parameter_scores || {}
                        )
                          .filter(([, val]) => val?.score > 0)
                          .map(([key, val]) => ({
                            name: key,
                            score: val.score,
                            contribution: val.contribution,
                            explanation: val.explanation,
                          }));
                        setSelectedParams(params);
                        setIsAnalysisModalOpen(true);
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <ChartSplineIcon />
                        <span>Analysis</span>
                      </div>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {isAnalysisModalOpen && selectedParams && (
        <AnalysisModal
          isAnalysisModalOpen={isAnalysisModalOpen}
          onAnalysisModalChange={setIsAnalysisModalOpen}
          selectedParams={selectedParams}
        />
      )}
    </>
  );
}
