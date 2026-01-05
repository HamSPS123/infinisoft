import axios from 'axios';

// Using a direct URL instead of process.env to avoid type issues
const API_URL = 'http://localhost:3000/api';

export interface UploadResponse {
  url: string;
  filename: string;
  mimetype: string;
  size: number;
}

export const uploadService = {
  /**
   * Upload a file to the server
   * @param file The file to upload
   * @param folder Optional folder path to store the file in
   * @returns Promise with the uploaded file URL
   */
  async uploadFile(file: File, folder = 'partners'): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      
      const response = await axios.post<UploadResponse>(
        `${API_URL}/uploads`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to upload file');
    }
  },
};
