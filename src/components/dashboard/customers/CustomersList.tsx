import useCustomerStore from "../../../stores/customers.store";
import { useEffect, useState } from "react";
import type { Customer } from "../../../types/customers.interface";
import CustomerForm from "./CustomerForm";
import { formatDateTime } from "../../../lib/date-utils";
import { Link } from "react-router";
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
import { toast } from "react-toastify";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiLoader, FiUsers, FiExternalLink } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const CustomersList = () => {
  const { customers, loading, getCustomers, deleteCustomer } = useCustomerStore();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Customer[]>([]);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Customer | null>(null);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleConfirmDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteCustomer(selected!.id);
    } catch (error) {
      const errorResponse = error as { response: { data: { message: string } } };
      toast.error(errorResponse.response.data.message);
    } finally {
      setConfirmLoading(false);
      handleCloseConfirmDialog();
    }
  };

  const handleCloseConfirmDialog = () => {
    setSelected(null);
    setConfirmDialogOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  useEffect(() => {
    if (search) {
      setPage(1);
    }
  }, [search]);

  useEffect(() => {
    const filteredCustomers = customers
      .filter((customer) => {
        return customer.name.toLowerCase().includes(search.toLowerCase());
      })
      .sort((a, b) => {
        // Sort by createdAt DESC (newest first)
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      })
      .slice((page - 1) * rowsPerPage, page * rowsPerPage);
    setFilter(filteredCustomers);
  }, [customers, search, page, rowsPerPage]);

  const totalPages = Math.ceil(customers.filter((customer) => 
    customer.name.toLowerCase().includes(search.toLowerCase())
  ).length / rowsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-sky-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent mb-2">
              Customers Management
            </h1>
            <p className="text-gray-600">Manage your customer relationships and information</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <Input
              type="search"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-11 bg-white shadow-sm border-gray-200 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>
          <Button
            onClick={handleOpen}
            className="h-11 bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <FiPlus className="mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <TableHead className="w-16 text-center font-semibold text-gray-700">#</TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <FiUsers className="text-sky-600" />
                    Customer Name
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Logo</TableHead>
                <TableHead className="font-semibold text-gray-700">Website</TableHead>
                <TableHead className="font-semibold text-gray-700">Created At</TableHead>
                <TableHead className="font-semibold text-gray-700">Last Modify</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={7} className="text-center py-4">
                      <div className="flex items-center justify-center gap-2">
                        <FiLoader className="animate-spin text-sky-600" />
                        <span className="text-gray-600">Loading...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filter.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FiUsers className="text-gray-400 text-3xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No customers found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your search or add a new customer</p>
                      {search && (
                        <Button variant="outline" onClick={() => setSearch("")}>
                          Clear Search
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filter.map((customer, index) => (
                  <TableRow key={customer.id} className="hover:bg-sky-50/50 transition-colors group">
                    <TableCell className="text-center text-gray-600">
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                      {customer.name}
                    </TableCell>
                    <TableCell>
                      <img
                        src={customer.logo}
                        alt={customer.name}
                        className="w-12 h-12 rounded-lg object-cover border-2 border-gray-100 group-hover:border-sky-300 transition-all"
                      />
                    </TableCell>
                    <TableCell>
                      <Link
                        to={customer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1"
                      >
                        {customer.website}
                        <FiExternalLink className="h-3 w-3" />
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDateTime(customer.createdAt)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDateTime(customer.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => {
                            setSelected(customer);
                            handleOpen();
                          }}
                          className="hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-all"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon-sm"
                          onClick={() => {
                            setSelected(customer);
                            setConfirmDialogOpen(true);
                          }}
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

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 font-medium">
                Showing <span className="text-sky-600 font-bold">{(page - 1) * rowsPerPage + 1}</span> to{" "}
                <span className="text-sky-600 font-bold">{Math.min(page * rowsPerPage, customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())).length)}</span> of{" "}
                <span className="text-sky-600 font-bold">{customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())).length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="hover:bg-sky-50 hover:border-sky-300"
              >
                Previous
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                      className={`w-10 ${
                        page === pageNum
                          ? "bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700"
                          : "hover:bg-sky-50 hover:border-sky-300"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="hover:bg-sky-50 hover:border-sky-300"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <CustomerForm open={open} onClose={handleClose} selectedCustomer={selected} />
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete customer <strong>{selected?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseConfirmDialog} disabled={confirmLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={confirmLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {confirmLoading ? (
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
export default CustomersList;
