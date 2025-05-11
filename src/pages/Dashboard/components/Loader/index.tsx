import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const Loader = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-800">
          <TableHead className="w-[80px]">#</TableHead>
          <TableHead className="w-full">Subject</TableHead>
          <TableHead className="w-[100px]">Score</TableHead>
          <TableHead className="w-[200px] text-right">
            Email Received Date
          </TableHead>
          <TableHead className="w-[200px] text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
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
      </TableBody>
    </Table>
  );
};

export default Loader;
