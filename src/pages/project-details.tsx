import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { projectService } from '../services/projectService';
import type { Project } from '../types/project';
import { RichTextEditor } from '../components/RichTextEditor';
import { format } from 'date-fns';

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id]);

  const loadProject = async (projectId: string) => {
    try {
      setLoading(true);
      const data = await projectService.getProjectById(projectId);
      setProject(data);
    } catch (error) {
      console.error('Failed to load project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="text-sky-600 hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-sky-600 to-sky-800 overflow-hidden">
        {project.cover && (
          <>
            <img 
              src={project.cover} 
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
          </>
        )}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-white hover:text-sky-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <div className="flex items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{project.author?.name || 'Unknown'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{format(new Date(project.createdAt), 'MMMM dd, yyyy')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto">
          {/* Description */}
          {project.description && (
            <div className="p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {/* Main Content */}
          <div className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Project Details</h2>
            <div className="prose max-w-none">
              <RichTextEditor
                content={project.content}
                onChange={() => {}}
                editable={false}
              />
            </div>
          </div>

          {/* Image Gallery */}
          {project.imageGalleries && project.imageGalleries.length > 0 && (
            <div className="p-6">
              {/* <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="w-6 h-6 text-sky-600" />
                <h2 className="text-2xl font-bold">Gallery</h2>
              </div> */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.imageGalleries.map((image, index) => (
                  <div 
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold"
            >
              ✕ Close
            </button>
            <img 
              src={selectedImage} 
              alt="Gallery preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;