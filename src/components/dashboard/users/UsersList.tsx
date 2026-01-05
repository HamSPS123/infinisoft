import useUserStore from "../../../stores/users.store";
import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { formatDateTime } from "../../../lib/date-utils";
import { toast } from "react-toastify";
import type { User } from "../../../stores/authTypes";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiLoader, FiUsers, FiShield } from "react-icons/fi";
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

const UsersList = () => {
  const { users, isLoading, getUsers, deleteUser } = useUserStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<User[]>([]);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleConfirmDelete = async () => {
    if (!selected) return;
    
    setConfirmLoading(true);
    try {
      const result = await deleteUser(selected.id);
      if (result.status !== 200) {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      const errorResponse = error as { response: { data: { message: string } } };
      toast.error(errorResponse.response?.data?.message || "An error occurred");
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
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (search) {
      setPage(0);
    }
  }, [search]);

  useEffect(() => {
    const filteredUsers = users
      .filter((user) => {
        return (
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        );
      })
      .sort((a, b) => {
        // Sort by createdAt DESC (newest first)
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    setFilter(filteredUsers);
  }, [users, search]);

  // Calculate the users to display based on pagination
  const displayedUsers = filter.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const totalPages = Math.ceil(filter.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-sky-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent mb-2">
              Users Management
            </h1>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <Input
              type="search"
              placeholder="Search by name or email..."
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
            Add User
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
                    Name
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Email</TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <FiShield className="text-sky-600" />
                    Role
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Created At</TableHead>
                <TableHead className="font-semibold text-gray-700">Last Modify</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
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
              ) : displayedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FiUsers className="text-gray-400 text-3xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No users found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your search or add a new user</p>
                      {search && (
                        <Button variant="outline" onClick={() => setSearch("")}>
                          Clear Search
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                displayedUsers.map((user, index) => (
                  <TableRow key={user.id} className="hover:bg-sky-50/50 transition-colors group">
                    <TableCell className="text-center text-gray-600">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-gray-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-sky-100 text-sky-700">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDateTime(user.createdAt)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDateTime(user.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => {
                            setSelected(user);
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
                            setSelected(user);
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
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 font-medium">
                Showing <span className="text-sky-600 font-bold">{page * rowsPerPage + 1}</span> to{" "}
                <span className="text-sky-600 font-bold">{Math.min((page + 1) * rowsPerPage, filter.length)}</span> of{" "}
                <span className="text-sky-600 font-bold">{filter.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setPage(0);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="hover:bg-sky-50 hover:border-sky-300"
              >
                Previous
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i;
                  } else if (page <= 2) {
                    pageNum = i;
                  } else if (page >= totalPages - 3) {
                    pageNum = totalPages - 5 + i;
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
                      {pageNum + 1}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="hover:bg-sky-50 hover:border-sky-300"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <UserForm open={open} onClose={handleClose} selectedUser={selected} />
      
      {/* Alert Dialog for Delete Confirmation */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete user <strong>{selected?.name}</strong>? This action cannot be undone.
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

export default UsersList;