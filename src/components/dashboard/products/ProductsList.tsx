import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiLoader, FiPackage } from "react-icons/fi";
import type { Product } from "../../../types/product";
import { useProductStore } from "../../../stores/productStore";
import { formatDateTime } from "../../../lib/date-utils";
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
import ProductForm from "./ProductForm";
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

const ProductsList: React.FC = () => {
  const {
    products,
    isLoading,
    error,
    fetchProducts,
    deleteProduct,
    clearError,
    setOpenDialog,
    setCurrentProduct,
  } = useProductStore();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortField, setSortField] = useState<keyof Product>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Load products when component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on search term
  useEffect(() => {
    if (!products) return;

    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedSearch) ||
        product.brand?.toLowerCase().includes(lowercasedSearch) ||
        product.model?.toLowerCase().includes(lowercasedSearch) ||
        product.sku?.toLowerCase().includes(lowercasedSearch) ||
        product.category?.name?.toLowerCase().includes(lowercasedSearch) ||
        product.partner?.name?.toLowerCase().includes(lowercasedSearch) ||
        product.description?.toLowerCase().includes(lowercasedSearch)
    );

    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  // Show error toast if there's an error
  const onCreate = () => {
    setOpenDialog(true);
    setCurrentProduct(null);
  };

  const onUpdate = (product: Product) => {
    setOpenDialog(true);
    setCurrentProduct(product);
  };

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
      clearError();
    }
  }, [error, clearError]);

  // Sort and paginate data
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle delete
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete.id);
        toast.success("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      } finally {
        setDeleteDialogOpen(false);
        setProductToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-sky-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent mb-2">
              Products Management
            </h1>
            <p className="text-gray-600">Manage your product catalog and inventory</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <Input
              type="search"
              placeholder="Search by name, brand, model, SKU, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-11 bg-white shadow-sm border-gray-200 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>
          <Button
            onClick={() => onCreate()}
            className="h-11 bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <FiPlus className="mr-2" />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-96">
            <FiLoader className="animate-spin text-5xl text-sky-600 mb-4" />
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <TableHead className="w-16 text-center font-semibold text-gray-700">#</TableHead>
                    <TableHead className="w-20 font-semibold text-gray-700">Image</TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-200 transition-colors font-semibold text-gray-700"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-2">
                        Product Name
                        {sortField === "name" && (
                          <span className="text-sky-600">{sortDirection === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-200 transition-colors font-semibold text-gray-700"
                      onClick={() => handleSort("brand")}
                    >
                      <div className="flex items-center gap-2">
                        Brand
                        {sortField === "brand" && (
                          <span className="text-sky-600">{sortDirection === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">Category</TableHead>
                    <TableHead className="font-semibold text-gray-700">Partner</TableHead>
                    <TableHead className="font-semibold text-gray-700">SKU</TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-200 transition-colors font-semibold text-gray-700"
                      onClick={() => handleSort("isActive")}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        {sortField === "isActive" && (
                          <span className="text-sky-600">{sortDirection === "asc" ? "↑" : "↓"}</span>
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
                          <span className="text-sky-600">{sortDirection === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-200 transition-colors font-semibold text-gray-700"
                      onClick={() => handleSort("updatedAt")}
                    >
                      <div className="flex items-center gap-2">
                        Last Modify
                        {sortField === "updatedAt" && (
                          <span className="text-sky-600">{sortDirection === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-16">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <FiPackage className="text-gray-400 text-3xl" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
                          <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                          {searchTerm && (
                            <Button variant="outline" onClick={() => setSearchTerm("")}>
                              Clear Search
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedProducts.map((product, index) => (
                      <TableRow key={product.id} className="hover:bg-sky-50/50 transition-colors group">
                        <TableCell className="text-center text-gray-600">
                          {index + 1 + startIndex}
                        </TableCell>
                        <TableCell>
                          <img
                            src={product.image || "/placeholder-product.png"}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover border-2 border-gray-100 group-hover:border-sky-300 transition-all"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                              {product.name}
                            </span>
                            <span className="text-xs text-gray-500">{product.model}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-gray-700">{product.brand}</TableCell>
                        <TableCell>
                          {product.category?.name ? (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                              {product.category.name}
                            </Badge>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {product.partner?.name ? (
                            <span className="text-gray-700">{product.partner.name}</span>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{product.sku}</code>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.isActive ? "success" : "secondary"} className="shadow-sm">
                            <span className="flex items-center gap-1">
                              {product.isActive ? (
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
                          {formatDateTime(product.createdAt)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDateTime(product.updatedAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon-sm"
                              onClick={() => onUpdate(product)}
                              className="hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-all"
                            >
                              <FiEdit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon-sm"
                              onClick={() => handleDeleteClick(product)}
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
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200">
                <div className="text-sm text-gray-600 font-medium">
                  Showing <span className="text-sky-600 font-bold">{startIndex + 1}</span> to{" "}
                  <span className="text-sky-600 font-bold">{Math.min(endIndex, sortedProducts.length)}</span> of{" "}
                  <span className="text-sky-600 font-bold">{sortedProducts.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="hover:bg-sky-50 hover:border-sky-300"
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
                              ? "bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700"
                              : "hover:bg-sky-50 hover:border-sky-300"
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
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="hover:bg-sky-50 hover:border-sky-300"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ProductForm />

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete product <strong>{productToDelete?.name}</strong>? This action cannot be undone.
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

export default ProductsList;
