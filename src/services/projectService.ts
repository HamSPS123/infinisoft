import api from '../config/axios';
import type { Project, ProjectFormData } from '../types/project';

const API_TIMEOUT = 10000;

export const projectService = {
  async getProjects(params?: { search?: string; status?: string; authorId?: string }): Promise<Project[]> {
    const response = await api.get<Project[]>('/projects', {
      params,
      timeout: API_TIMEOUT
    });
    return response.data;
  },

  async getProjectById(id: string): Promise<Project> {
    const response = await api.get<Project>(`/projects/${id}`, {
      timeout: API_TIMEOUT
    });
    return response.data;
  },

  async createProject(projectData: ProjectFormData): Promise<Project> {
    const response = await api.post<Project>('/projects', projectData, {
      timeout: API_TIMEOUT
    });
    return response.data;
  },

  async updateProject(id: string, projectData: Partial<ProjectFormData>): Promise<Project> {
    const response = await api.patch<Project>(`/projects/${id}`, projectData, {
      timeout: API_TIMEOUT
    });
    return response.data;
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`, {
      timeout: API_TIMEOUT
    });
  }
};
