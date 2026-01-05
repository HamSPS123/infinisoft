import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import useUploadStore from '../../stores/uploader.store';

// Types for the image library
export interface ImageData {
  src: string;
  alt?: string;
  title?: string;
  width?: string;
  height?: string;
}

export interface LibraryImage {
  id: string;
  url: string;
  filename: string;
  createdAt: string;
  alt?: string;
  title?: string;
}

interface ImageLibraryDialogProps {
  open: boolean;
  onClose: () => void;
  onInsert: (imageData: ImageData) => void;
}

const ImageLibraryDialog: React.FC<ImageLibraryDialogProps> = ({ open, onClose, onInsert }) => {
  const [activeTab, setActiveTab] = useState('library');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<LibraryImage | null>(null);
  const [imageAlt, setImageAlt] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeight, setImageHeight] = useState('');

  const { getUploadFile, uploads, uploadFile, loading } = useUploadStore();
  
  // Load images when dialog opens
  useEffect(() => {
    if (open) {
      getUploadFile();
    }
  }, [open]);
  
  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setActiveTab('library');
      setImageUrl('');
      setSelectedImage(null);
      setImageAlt('');
      setImageTitle('');
      setImageWidth('');
      setImageHeight('');
      setError(null);
    }
  }, [open]);
  
  const loadImages = async () => {
    setError(null);
    try {
      await getUploadFile();
    } catch (error) {
      console.error('Error loading images:', error);
      setError('Failed to load images. Please try again.');
    }
  };
  
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploading(true);
      setError(null);
      
      try {
        const uploadedImage = await uploadFile(file);
        if (uploadedImage?.status === 201) {
          // Refresh the image list
          await loadImages();
          // Select the newly uploaded image
          setSelectedImage(uploadedImage?.data);
        } else {
          setError('Failed to upload image. Please try again.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('An error occurred during upload. Please try again.');
      } finally {
        setUploading(false);
      }
    }
  };
  
  const handleImageSelect = (image: LibraryImage) => {
    setSelectedImage(image);
    // Pre-fill alt and title if available
    if (image.alt) setImageAlt(image.alt);
    if (image.title) setImageTitle(image.title);
  };
  
  const handleInsert = () => {
    if (activeTab === 'library' && selectedImage) {
      // Insert from library
      onInsert({
        src: selectedImage.url,
        alt: imageAlt,
        title: imageTitle,
        width: imageWidth,
        height: imageHeight,
      });
    } else if (activeTab === 'url' && imageUrl) {
      // Insert by URL
      onInsert({
        src: imageUrl,
        alt: imageAlt,
        title: imageTitle,
        width: imageWidth,
        height: imageHeight,
      });
    }
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Image Library</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="library">Library</TabsTrigger>
              <TabsTrigger value="url">Image URL</TabsTrigger>
            </TabsList>
            
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <TabsContent value="library" className="space-y-4 mt-0">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Select an image from the library</p>
                <Button
                  variant="default"
                  disabled={uploading}
                  asChild
                >
                  <label className="cursor-pointer">
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Upload New'
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                  </label>
                </Button>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : uploads.length === 0 ? (
                <p className="text-center text-muted-foreground p-8">
                  No images found in the library. Upload your first image.
                </p>
              ) : (
                <div className="border rounded-md p-4 max-h-[250px] overflow-y-auto">
                  <div className="grid grid-cols-4 gap-4">
                    {uploads.map((image) => (
                      <div
                        key={image.id}
                        onClick={() => handleImageSelect(image)}
                        className={`
                          border-2 rounded-md p-2 h-24 flex items-center justify-center cursor-pointer
                          transition-colors hover:border-primary
                          ${selectedImage?.id === image.id ? 'border-primary' : 'border-border'}
                        `}
                      >
                        <img
                          src={image.url}
                          alt={image.filename}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </TabsContent>
            
            {/* <div className="grid grid-cols-2 gap-4 mt-4 pb-4">
              <div className="space-y-2">
                <Label htmlFor="altText">Alt Text</Label>
                <Input
                  id="altText"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Image description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  placeholder="Image title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  value={imageWidth}
                  onChange={(e) => setImageWidth(e.target.value)}
                  placeholder="e.g., 300px or 50%"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  value={imageHeight}
                  onChange={(e) => setImageHeight(e.target.value)}
                  placeholder="e.g., 200px"
                />
              </div>
            </div> */}
          </Tabs>
        </ScrollArea>
        
        <DialogFooter className="px-6 pb-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button 
            onClick={handleInsert}
            disabled={
              (activeTab === 'library' && !selectedImage) || 
              (activeTab === 'url' && !imageUrl)
            }
          >
            Insert Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLibraryDialog;
