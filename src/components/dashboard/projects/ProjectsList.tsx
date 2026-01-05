import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiLoader, FiFolder, FiEye } from "react-icons/fi";
import type { Project } from "../../../types/project";
import { ProjectStatus } from "../../../types/project";
import { projectService } from "../../../services/projectService";
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
import ProjectForm from "./ProjectForm";
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

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortField, setSortField] = useState<keyof Project>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (!projects) return;

    if (!searchTerm.trim()) {
      setFilteredProjects(projects);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(lowercasedSearch) ||
        project.description?.toLowerCase().includes(lowercasedSearch) ||
        project.author?.name?.toLowerCase().includes(lowercasedSearch)
    );

    setFilteredProjects(filtered);
  }, [projects, searchTerm]);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectService.getProjects({});
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCreate = () => {
    setOpenDialog(true);
    setCurrentProject(null);
  };

  const onUpdate = (project: Project) => {
    setOpenDialog(true);
    setCurrentProject(project);
  };

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === undefined || bValue === undefined) return 0;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (sortField === "createdAt" || sortField === "updatedAt") {
      const dateA = new Date(aValue as string).getTime();
      const dateB = new Date(bValue as string).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedProjects.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProjects = sortedProjects.slice(startIndex, endIndex);

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (projectToDelete) {
      try {
        await projectService.deleteProject(projectToDelete.id);
        toast.success("Project deleted successfully");
        loadProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project");
      } finally {
        setDeleteDialogOpen(false);
        setProjectToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const handleFormSuccess = () => {
    loadProjects();
    setOpenDialog(false);
    setCurrentProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-sky-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="mb-8">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent mb-2">
              Projects Management
            </h1>
            <p className="text-gray-600">Manage your project portfolio and content</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <Input
              type="search"
              placeholder="Search by title, description, author..."
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
            Add New Project
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-96">
            <FiLoader className="animate-spin text-5xl text-sky-600 mb-4" />
            <p className="text-gray-600">Loading projects...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <TableHead className="w-16 text-center font-semibold text-gray-700">#</TableHead>
                    <TableHead className="w-20 font-semibold text-gray-700">Cover</TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-200 transition-colors font-semibold text-gray-700"
                      onClick={() => handleSort("title")}
                    >
                      <div className="flex items-center gap-2">
                        Project Title
                        {sortField === "title" && (
                          <span className="text-sky-600">{sortDirection === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">Description</TableHead>
                    <TableHead className="font-semibold text-gray-700">Author</TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-200 transition-colors font-semibold text-gray-700"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        {sortField === "status" && (
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
                  {paginatedProjects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-16">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <FiFolder className="text-gray-400 text-3xl" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">No projects found</h3>
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
                    paginatedProjects.map((project, index) => (
                      <TableRow key={project.id} className="hover:bg-sky-50/50 transition-colors group">
                        <TableCell className="text-center text-gray-600">
                          {index + 1 + startIndex}
                        </TableCell>
                        <TableCell>
                          <img
                            src={project.cover || "/placeholder-project.png"}
                            alt={project.title}
                            className="w-12 h-12 rounded-lg object-cover border-2 border-gray-100 group-hover:border-sky-300 transition-all"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                              {project.title}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600 line-clamp-2">
                            {project.description || "-"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-700">{project.author?.name || "Unknown"}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={project.status === ProjectStatus.PUBLIC ? "success" : "secondary"} className="shadow-sm">
                            <span className="flex items-center gap-1">
                              {project.status === ProjectStatus.PUBLIC ? (
                                <>
                                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                  Public
                                </>
                              ) : (
                                <>
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                  Draft
                                </>
                              )}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDateTime(project.createdAt)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDateTime(project.updatedAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon-sm"
                              onClick={() => window.open(`/projects/${project.id}`, '_blank')}
                              className="hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-all"
                            >
                              <FiEye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon-sm"
                              onClick={() => onUpdate(project)}
                              className="hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-all"
                            >
                              <FiEdit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon-sm"
                              onClick={() => handleDeleteClick(project)}
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

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200">
                <div className="text-sm text-gray-600 font-medium">
                  Showing <span className="text-sky-600 font-bold">{startIndex + 1}</span> to{" "}
                  <span className="text-sky-600 font-bold">{Math.min(endIndex, sortedProjects.length)}</span> of{" "}
                  <span className="text-sky-600 font-bold">{sortedProjects.length}</span> results
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

      <ProjectForm
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setCurrentProject(null);
        }}
        project={currentProject}
        onSuccess={handleFormSuccess}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete project <strong>{projectToDelete?.title}</strong>? This action cannot be undone.
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

export default ProjectsList;
