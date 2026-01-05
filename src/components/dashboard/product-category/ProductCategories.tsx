import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiFolder } from "react-icons/fi";
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
import ProductCategoryForm from "./ProductCategoryForm";
import useProductCategoryStore from "../../../stores/productCategoryStore";
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
import type { Category } from "../../../types/categories.interface";

const ProductCategories: React.FC = () => {
  const { categories, fetchCategories, deleteCategory, setCurrentCategory } = useProductCategoryStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditClick = (category: Category) => {
    setOpenDialog(true);
    setCurrentCategory(category);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category.id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCategory(categoryToDelete!);
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    } finally {
      setConfirmDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Filter and sort categories by createdAt DESC (newest first)
  const filteredCategories = categories
    .filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // DESC order (newest first)
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-sky-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent mb-2">
              Product Categories
            </h1>
            <p className="text-gray-600">Manage your product categories and classifications</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <Input
              type="search"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-11 bg-white shadow-sm border-gray-200 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>
          <Button
            onClick={() => handleOpenDialog()}
            className="h-11 bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <FiPlus className="mr-2" />
            Add Category
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
                    <FiFolder className="text-sky-600" />
                    Category Name
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Description</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Created At</TableHead>
                <TableHead className="font-semibold text-gray-700">Last Modify</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FiFolder className="text-gray-400 text-3xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No categories found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your search or create a new category</p>
                      {searchTerm && (
                        <Button variant="outline" onClick={() => setSearchTerm("")}>
                          Clear Search
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category, index) => (
                  <TableRow key={category.id} className="hover:bg-sky-50/50 transition-colors group">
                    <TableCell className="text-center text-gray-600">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {category.description || <span className="text-gray-400 italic">No description</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={category.isActive ? "success" : "secondary"} className="shadow-sm">
                        <span className="flex items-center gap-1">
                          {category.isActive ? (
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
                      {formatDateTime(category.createdAt)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDateTime(category.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => handleEditClick(category)}
                          className="hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-all"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon-sm"
                          onClick={() => handleDeleteClick(category)}
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
      </div>

      {/* Category Form Dialog */}
      <ProductCategoryForm 
        openDialog={openDialog}
        onHide={handleCloseDialog}
      />

      {/* Confirm Delete Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductCategories;
