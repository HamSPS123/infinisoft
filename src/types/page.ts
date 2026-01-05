export interface Page {
  id: string;
  title: string;
  slug: string;
  content: Record<string, any>;
  languageId: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PageFormData {
  title: string;
  slug: string;
  content: Record<string, any>;
  languageId: string;
  isActive: boolean;
}

export interface PageListResponse {
  pages: Page[];
  total: number;
}

export interface PageResponse {
  page: Page;
}
