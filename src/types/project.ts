export enum ProjectStatus {
  PUBLIC = 0,
  DRAFT = 1
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  content: string;
  cover?: string;
  imageGalleries?: string[];
  authorId: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ProjectFormData {
  title: string;
  description?: string;
  content: string;
  cover?: string;
  imageGalleries?: string[];
  authorId: string;
  status?: ProjectStatus;
}
