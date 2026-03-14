import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Ban,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Pencil,
  Plus,
  Search,
  TestTube,
  Upload,
} from "lucide-react";
import type React from "react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { TestError, type TestInput, type TestOutput } from "../../backend";
import AddTestModal from "../../components/admin/AddTestModal";
import DisableTestConfirmDialog from "../../components/admin/DisableTestConfirmDialog";
import EditTestModal from "../../components/admin/EditTestModal";
import PageHeroHeader from "../../components/shared/PageHeroHeader";
import {
  useBulkAddTests,
  useGetAllTests,
  useSetTestStatus,
} from "../../hooks/useQueries";
import {
  computeProfitPerTest,
  getProfitStatusColor,
} from "../../utils/profitUtils";

const PAGE_SIZE = 20;

interface TestManagementPageProps {
  role: "superAdmin" | "labAdmin";
}

interface ParsedCSVRow {
  testName: string;
  testCode: string;
  sampleType: string;
  mrp: number;
}

function parseCSV(content: string): {
  rows: ParsedCSVRow[];
  parseErrors: number;
} {
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return { rows: [], parseErrors: 0 };

  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().toLowerCase().replace(/['"]/g, ""));

  const colIndex = (names: string[]): number => {
    for (const name of names) {
      const idx = headers.indexOf(name);
      if (idx !== -1) return idx;
    }
    return -1;
  };

  const nameIdx = colIndex(["testname", "test name", "name"]);
  const codeIdx = colIndex(["testcode", "test code", "code"]);
  const sampleIdx = colIndex(["sampletype", "sample type", "sample"]);
  const mrpIdx = colIndex(["mrp", "price"]);

  const rows: ParsedCSVRow[] = [];
  let parseErrors = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cells = line
      .split(",")
      .map((c) => c.trim().replace(/^["']|["']$/g, ""));

    const testName = nameIdx !== -1 ? (cells[nameIdx] ?? "").trim() : "";
    const testCode =
      codeIdx !== -1 ? (cells[codeIdx] ?? "").trim().toUpperCase() : "";
    const sampleType = sampleIdx !== -1 ? (cells[sampleIdx] ?? "").trim() : "";
    const mrpRaw = mrpIdx !== -1 ? (cells[mrpIdx] ?? "").trim() : "";
    const mrp = Number.parseFloat(mrpRaw);

    if (
      !testName ||
      !testCode ||
      !sampleType ||
      !mrpRaw ||
      Number.isNaN(mrp) ||
      mrp < 0
    ) {
      parseErrors++;
      continue;
    }

    rows.push({ testName, testCode, sampleType, mrp });
  }

  return { rows, parseErrors };
}

// Profit status colour dot
function ProfitDot({ color }: { color: "green" | "yellow" | "red" }) {
  const cls =
    color === "green"
      ? "bg-green-500"
      : color === "yellow"
        ? "bg-yellow-500"
        : "bg-red-500";
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${cls}`}
      title={
        color === "green"
          ? "Profitable (>30%)"
          : color === "yellow"
            ? "Low profit (10–30%)"
            : "Loss / <10%"
      }
    />
  );
}

// Status badge component for test active/inactive state
function TestStatusBadge({ isActive }: { isActive: boolean }) {
  if (isActive) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      Inactive
    </span>
  );
}

export default function TestManagementPage({ role }: TestManagementPageProps) {
  const isSuperAdmin = role === "superAdmin";

  const { data: tests = [], isLoading, isError } = useGetAllTests();
  const bulkAddMutation = useBulkAddTests();
  const setTestStatusMutation = useSetTestStatus();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  // Track which test IDs are currently being toggled for per-row loading state
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<TestOutput | null>(null);
  const [disableDialogOpen, setDisableDialogOpen] = useState(false);
  const [testToDisable, setTestToDisable] = useState<TestOutput | null>(null);

  const csvInputRef = useRef<HTMLInputElement>(null);

  // Filter tests by search query
  const filteredTests = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tests;
    return tests.filter(
      (t) =>
        t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q),
    );
  }, [tests, searchQuery]);

  // Reset to page 1 when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredTests.length / PAGE_SIZE));
  const paginatedTests = filteredTests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleEditClick = (test: TestOutput) => {
    setSelectedTest(test);
    setEditModalOpen(true);
  };

  const handleDisableClick = (test: TestOutput) => {
    setTestToDisable(test);
    setDisableDialogOpen(true);
  };

  const handleToggleStatus = async (test: TestOutput, newIsActive: boolean) => {
    const testId = test.id;
    setTogglingIds((prev) => new Set(prev).add(testId));
    try {
      const result = await setTestStatusMutation.mutateAsync({
        testId,
        isActive: newIsActive,
      });
      if (result.__kind__ === "err") {
        toast.error("Failed to update test status.");
      } else {
        toast.success(
          `Test "${test.name}" marked as ${newIsActive ? "Active" : "Inactive"}.`,
        );
      }
    } catch (err: any) {
      toast.error(
        `Failed to update test status: ${err?.message ?? String(err)}`,
      );
    } finally {
      setTogglingIds((prev) => {
        const next = new Set(prev);
        next.delete(testId);
        return next;
      });
    }
  };

  const formatMRP = (price: bigint) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  const handleCSVUploadClick = () => {
    if (csvInputRef.current) {
      csvInputRef.current.value = "";
      csvInputRef.current.click();
    }
  };

  const handleCSVFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (!content) {
        toast.error("Could not read the CSV file.");
        return;
      }

      const { rows: parsedRows, parseErrors } = parseCSV(content);

      const existingCodes = new Set(tests.map((t) => t.code.toUpperCase()));

      let skippedDuplicates = 0;
      const validInputs: TestInput[] = [];

      for (const row of parsedRows) {
        if (existingCodes.has(row.testCode.toUpperCase())) {
          skippedDuplicates++;
          continue;
        }
        validInputs.push({
          name: row.testName,
          code: row.testCode,
          sampleType: row.sampleType,
          price: BigInt(Math.round(row.mrp)),
          isActive: true,
        });
      }

      const totalSkipped = parseErrors + skippedDuplicates;

      if (validInputs.length === 0) {
        toast.warning("0 tests added successfully.");
        if (totalSkipped > 0) {
          toast.error(`${totalSkipped} rows skipped due to errors.`);
        }
        return;
      }

      setIsUploading(true);
      try {
        const added = await bulkAddMutation.mutateAsync(validInputs);
        toast.success(
          `${added.length} test${added.length !== 1 ? "s" : ""} added successfully.`,
        );
        if (totalSkipped > 0) {
          toast.warning(
            `${totalSkipped} row${totalSkipped !== 1 ? "s" : ""} skipped (duplicates or invalid data).`,
          );
        }
      } catch (err: any) {
        toast.error(`Upload failed: ${err?.message ?? String(err)}`);
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-4 space-y-4">
      <PageHeroHeader
        title="🧪 Test Management"
        description="Manage diagnostic tests, pricing, and availability"
        actionLabel="Add Test"
        onAction={() => setAddModalOpen(true)}
      />
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <TestTube className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">
            Test Management
          </h1>
        </div>
        {isSuperAdmin && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCSVUploadClick}
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-1.5 h-4 w-4" />
              )}
              Upload CSV
            </Button>
            <Button size="sm" onClick={() => setAddModalOpen(true)}>
              <Plus className="mr-1.5 h-4 w-4" />
              Add Test
            </Button>
          </div>
        )}
      </div>

      {/* Hidden CSV input */}
      <input
        ref={csvInputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleCSVFileChange}
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or code…"
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Test Name</TableHead>
              <TableHead className="font-semibold">Code</TableHead>
              <TableHead className="font-semibold">Sample Type</TableHead>
              <TableHead className="font-semibold">MRP</TableHead>
              {isSuperAdmin && (
                <TableHead className="font-semibold">Lab Cost</TableHead>
              )}
              {isSuperAdmin && (
                <TableHead className="font-semibold">Commission %</TableHead>
              )}
              {isSuperAdmin && (
                <TableHead className="font-semibold text-right">
                  Profit (₹)
                </TableHead>
              )}
              <TableHead className="font-semibold">Status</TableHead>
              {isSuperAdmin && (
                <TableHead className="font-semibold text-center">
                  Active
                </TableHead>
              )}
              {isSuperAdmin && (
                <TableHead className="font-semibold text-right">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }, (_, i) => `skel-row-${i}`).map(
                (key) => (
                  <TableRow key={key}>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    {isSuperAdmin && (
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                    )}
                    {isSuperAdmin && (
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                    )}
                    {isSuperAdmin && (
                      <TableCell>
                        <Skeleton className="h-4 w-14 ml-auto" />
                      </TableCell>
                    )}
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    {isSuperAdmin && (
                      <TableCell>
                        <Skeleton className="h-4 w-10 mx-auto" />
                      </TableCell>
                    )}
                    {isSuperAdmin && (
                      <TableCell>
                        <Skeleton className="h-4 w-20 ml-auto" />
                      </TableCell>
                    )}
                  </TableRow>
                ),
              )
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={isSuperAdmin ? 10 : 5}
                  className="text-center text-destructive py-8"
                >
                  Failed to load tests. Please try again.
                </TableCell>
              </TableRow>
            ) : paginatedTests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isSuperAdmin ? 10 : 5}
                  className="text-center text-muted-foreground py-8"
                >
                  {searchQuery
                    ? "No tests match your search."
                    : "No tests found. Add your first test."}
                </TableCell>
              </TableRow>
            ) : (
              paginatedTests.map((test) => {
                const isToggling = togglingIds.has(test.id);
                const labCost = (test as any).labCost ?? 0;
                const commissionPct = (test as any).doctorCommission ?? 0;
                const mrpNum = Number(test.price);
                const profit = computeProfitPerTest(
                  mrpNum,
                  labCost,
                  commissionPct,
                );
                const profitColor = getProfitStatusColor(mrpNum, profit);
                const isLoss = profit < 0;
                return (
                  <TableRow
                    key={test.id}
                    className={`hover:bg-muted/30 transition-colors ${isLoss ? "bg-red-50" : ""}`}
                  >
                    <TableCell className="font-medium">
                      {isSuperAdmin ? (
                        <div className="flex items-center gap-2">
                          <ProfitDot color={profitColor} />
                          {test.name}
                        </div>
                      ) : (
                        test.name
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">
                        {test.code}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {test.sampleType}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatMRP(test.price)}
                    </TableCell>
                    {isSuperAdmin && (
                      <TableCell className="text-muted-foreground">
                        ₹{labCost}
                      </TableCell>
                    )}
                    {isSuperAdmin && (
                      <TableCell className="text-muted-foreground">
                        {commissionPct}%
                      </TableCell>
                    )}
                    {isSuperAdmin &&
                      (() => {
                        const flatProfit =
                          mrpNum - Number(labCost) - Number(commissionPct);
                        return (
                          <TableCell
                            className={`text-right font-semibold ${
                              flatProfit >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                            data-ocid={`tests.profit.item.${paginatedTests.indexOf(test) + 1}`}
                          >
                            {flatProfit >= 0 ? "+" : ""}₹{flatProfit.toFixed(0)}
                          </TableCell>
                        );
                      })()}
                    <TableCell>
                      <TestStatusBadge isActive={test.isActive} />
                    </TableCell>
                    {isSuperAdmin && (
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          {isToggling ? (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          ) : (
                            <Switch
                              checked={test.isActive}
                              onCheckedChange={(checked) =>
                                handleToggleStatus(test, checked)
                              }
                              aria-label={`Toggle ${test.name} ${test.isActive ? "inactive" : "active"}`}
                              className="data-[state=checked]:bg-emerald-500"
                            />
                          )}
                        </div>
                      </TableCell>
                    )}
                    {isSuperAdmin && (
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditClick(test)}
                            title="Edit test"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDisableClick(test)}
                            title="Disable test"
                            disabled={!test.isActive}
                          >
                            <Ban className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, filteredTests.length)} of{" "}
            {filteredTests.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-2">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddTestModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      <EditTestModal
        open={editModalOpen}
        test={selectedTest}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedTest(null);
        }}
      />
      <DisableTestConfirmDialog
        open={disableDialogOpen}
        test={testToDisable}
        onClose={() => {
          setDisableDialogOpen(false);
          setTestToDisable(null);
        }}
      />
    </div>
  );
}
