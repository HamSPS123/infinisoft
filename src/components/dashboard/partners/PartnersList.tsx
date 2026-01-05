import React, { useEffect, useState } from "react";
import { usePartnerStore } from "../../../stores/partnerStore";
import { useNavigate } from "react-router";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiLoader, FiExternalLink } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Partner } from "../../../types/partner";
import { formatDateTime } from "../../../lib/date-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PartnersList: React.FC = () => {
  const navigate = useNavigate();
  const {
    partners,
    isLoading,
    error,
    fetchPartners,
    deletePartner,
    clearError,
  } = usePartnerStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);

  // Load partners when component mounts
  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  // Filter partners based on search term
  useEffect(() => {
    if (!partners) return;

    if (!searchTerm.trim()) {
      setFilteredPartners(partners);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = partners.filter(
      (partner) =>
        partner.name.toLowerCase().includes(lowercasedSearch) ||
        (partner.website &&
          partner.website.toLowerCase().includes(lowercasedSearch)) ||
        (partner.description &&
          partner.description.toLowerCase().includes(lowercasedSearch))
    );

    setFilteredPartners(filtered);
  }, [partners, searchTerm]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
      clearError();
    }
  }, [error, clearError]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Fixed page size
  const [sortField, setSortField] = useState<keyof Partner>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Sort and paginate data
  const sortedPartners = [...filteredPartners].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === undefined || bValue === undefined) return 0;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      return sortDirection === "asc"
        ? aValue === bValue
          ? 0
          : aValue
          ? 1
          : -1
        : aValue === bValue
        ? 0
        : bValue
        ? 1
        : -1;
    }

    // Handle Date objects (createdAt, updatedAt)
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    // Handle date strings
    if (sortField === "createdAt" || sortField === "updatedAt") {
      const dateA = new Date(aValue as string).getTime();
      const dateB = new Date(bValue as string).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedPartners.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPartners = sortedPartners.slice(startIndex, endIndex);

  const handleSort = (field: keyof Partner) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle delete
  const handleDeleteClick = (partner: Partner) => {
    setPartnerToDelete(partner);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (partnerToDelete) {
      try {
        await deletePartner(partnerToDelete.id);
        toast.success("Partner deleted successfully");
      } catch (error) {
        console.error("Error deleting partner:", error);
        toast.error("Failed to delete partner");
      } finally {
        setDeleteDialogOpen(false);
        setPartnerToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPartnerToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-sky-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Section with Gradient */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent mb-2">
              Partners Management
            </h1>
            <p className="text-gray-600">
              Manage your business partners and collaborations
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <Input
              type="search"
              placeholder="Search by name, website, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-11 bg-white shadow-sm border-gray-200 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>
          <Button
            onClick={() => navigate("/admin/partners/create")}
            className="h-11 bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <FiPlus className="mr-2" />
            Add New Partner
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-96">
            <FiLoader className="animate-spin text-5xl text-blue-600 mb-4" />
            <p className="text-gray-600">Loading partners...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <TableHead className="w-20 text-center font-semibold text-gray-700">
                      #
                    </TableHead>
                    <TableHead className="w-20 font-semibold text-gray-700">
                      Logo
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-200 transition-colors font-semibold text-gray-700"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-2">
                        Partner Name
                        {sortField === "name" && (
                          <span className="text-blue-600">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-200 transition-colors font-semibold text-gray-700"
                      onClick={() => handleSort("website")}
                    >
                      <div className="flex items-center gap-2">
                        Website
                        {sortField === "website" && (
                          <span className="text-blue-600">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-200 transition-colors font-semibold text-gray-700"
                      onClick={() => handleSort("isActive")}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        {sortField === "isActive" && (
                          <span className="text-blue-600">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-200 transition-colors font-semibold text-gray-700"
                      onClick={() => handleSort("createdAt")}
                    >
                      <div className="flex items-center gap-2">
                        Created At
                        {sortField === "createdAt" && (
                          <span className="text-blue-600">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-200 transition-colors font-semibold text-gray-700"
                      onClick={() => handleSort("updatedAt")}
                    >
                      <div className="flex items-center gap-2">
                        Updated At
                        {sortField === "updatedAt" && (
                          <span className="text-blue-600">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-right font-semibold text-gray-700">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPartners.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-16">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <FiSearch className="text-gray-400 text-3xl" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            No partners found
                          </h3>
                          <p className="text-gray-500 mb-4">
                            Try adjusting your search criteria
                          </p>
                          {searchTerm && (
                            <Button
                              variant="outline"
                              onClick={() => setSearchTerm("")}
                            >
                              Clear Search
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedPartners.map((partner, index) => (
                      <TableRow
                        key={partner.id}
                        className="hover:bg-blue-50/50 transition-colors group"
                      >
                        <TableCell className="text-center">
                          {index + 1 + startIndex}
                        </TableCell>
                        <TableCell>
                          <div className="relative">
                            <img
                              src={partner.logo || "/placeholder-logo.png"}
                              alt={partner.name}
                              className="w-12 h-12 rounded-xl object-cover shadow-sm border-2 border-gray-100 group-hover:border-blue-300 transition-all"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {partner.name}
                            </span>
                            {partner.description && (
                              <span className="text-xs text-gray-500 line-clamp-1 mt-1">
                                {partner.description}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {partner.website ? (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                            >
                              <span className="line-clamp-1">
                                {partner.website}
                              </span>
                              <FiExternalLink className="text-sm flex-shrink-0" />
                            </a>
                          ) : (
                            <span className="text-gray-400 italic">
                              No website
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={partner.isActive ? "success" : "secondary"}
                            className="shadow-sm"
                          >
                            <span className="flex items-center gap-1">
                              {partner.isActive ? (
                                <>
                                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                  Active
                                </>
                              ) : (
                                <>
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                  Inactive
                                </>
                              )}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDateTime(partner.createdAt)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDateTime(partner.updatedAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon-sm"
                              onClick={() =>
                                navigate(`/admin/partners/edit/${partner.id}`)
                              }
                              className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all"
                            >
                              <FiEdit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon-sm"
                              onClick={() => handleDeleteClick(partner)}
                              className="hover:shadow-lg transition-all"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200">
                <div className="text-sm text-gray-600 font-medium">
                  Showing{" "}
                  <span className="text-blue-600 font-bold">
                    {startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="text-blue-600 font-bold">
                    {Math.min(endIndex, sortedPartners.length)}
                  </span>{" "}
                  of{" "}
                  <span className="text-blue-600 font-bold">
                    {sortedPartners.length}
                  </span>{" "}
                  results
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="hover:bg-blue-50 hover:border-blue-300"
                  >
                    Previous
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 ${
                            currentPage === page
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                              : "hover:bg-blue-50 hover:border-blue-300"
                          }`}
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="hover:bg-blue-50 hover:border-blue-300"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Partner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete partner <strong>{partnerToDelete?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel} disabled={isLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <FiLoader className="mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PartnersList;
