import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toPascalCase } from "@/utils/helper";

type AnalysisModalProps = {
  isAnalysisModalOpen: boolean;
  onAnalysisModalChange: (open: boolean) => void;
  selectedParams: {
    name: string;
    score: number;
    contribution: string;
    explanation: string;
  }[];
};

export const AnalysisModal = ({
  isAnalysisModalOpen,
  onAnalysisModalChange,
  selectedParams,
}: AnalysisModalProps) => {
  return (
    <Dialog open={isAnalysisModalOpen} onOpenChange={onAnalysisModalChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Parameter Score Analysis</DialogTitle>
        </DialogHeader>
        <div className="overflow-hidden rounded-lg border border-gray-300">
          {selectedParams?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Parameter</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Contribution</TableHead>
                  <TableHead>Explanation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedParams.map((val) => (
                  <TableRow key={val.name}>
                    <TableCell>{toPascalCase(val.name)}</TableCell>
                    <TableCell>{val.score}</TableCell>
                    <TableCell>{val.contribution}</TableCell>
                    <TableCell className="w-[400px] break-words">
                      {val.explanation}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No parameter with score greater than 0.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
