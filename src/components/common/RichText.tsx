import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';

// Create a custom image extension with resizing and alignment capabilities
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: 'auto',
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
          };
        },
      },
      alignment: {
        default: 'center',
        renderHTML: (attributes) => {
          const alignment = attributes.alignment;
          let style = '';
          
          switch (alignment) {
            case 'left':
              style = 'float: left; margin-right: 1rem; margin-bottom: 0.5rem;';
              break;
            case 'right':
              style = 'float: right; margin-left: 1rem; margin-bottom: 0.5rem;';
              break;
            case 'center':
            default:
              style = 'display: block; margin: 0 auto 0.5rem auto;';
              break;
          }
          
          return { style };
        },
      },
    };
  },
});
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Code2,
  RemoveFormatting,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Image as ImageIcon,
  Link as LinkIcon,
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Maximize,
  Minimize,
} from 'lucide-react';
import ImageLibraryDialog from './ImageLibraryDialog';
import type { ImageData } from './ImageLibraryDialog';

interface RichTextProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

interface MenuBarProps {
  editor: Editor | null;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor, isFullscreen, toggleFullscreen }) => {
  const [imageLibraryOpen, setImageLibraryOpen] = useState(false);
  
  if (!editor) {
    return null;
  }


  const addImage = () => {
    setImageLibraryOpen(true);
  };
  
  const handleImageInsert = (imageData: ImageData) => {
    // For TipTap Image extension, we need to pass only the standard attributes
    // The custom attributes will be handled by our ResizableImage component
    editor.chain().focus().setImage({
      src: imageData.src,
      alt: imageData.alt || '',
      title: imageData.title || '',
      // We'll set these attributes via the node view later
    }).run();
    
    // Select the image node we just inserted to apply additional attributes
    const imageNode = editor.state.doc.nodeAt(editor.state.selection.from - 1);
    if (imageNode && imageNode.type.name === 'image') {
      editor.commands.updateAttributes('image', {
        width: imageData.width || '100%',
        height: imageData.height,
        alignment: 'center',
      });
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter the URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  };

  return (
    <>
      {/* Image Library Dialog */}
      <ImageLibraryDialog 
        open={imageLibraryOpen} 
        onClose={() => setImageLibraryOpen(false)} 
        onInsert={handleImageInsert} 
      />
      
      <div className="menu-bar mb-2 p-2 bg-gray-100 rounded-lg flex flex-wrap gap-2">
        <div className="flex gap-1">
          <Button
            type="button"
            variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('heading', { level: 4 }) ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            title="Heading 4"
          >
            <Heading4 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('heading', { level: 5 }) ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            title="Heading 5"
          >
            <Heading5 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('heading', { level: 6 }) ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            title="Heading 6"
          >
            <Heading6 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-1">
          <Button
            type="button"
            variant={editor.isActive('bold') ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('italic') ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('underline') ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          <Button
            type="button"
            variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            title="Code Block"
          >
            <Code2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          <Button
            type="button"
            variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            title="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            title="Clear Formatting"
          >
            <RemoveFormatting className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={addImage}
            title="Insert Image"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={setLink}
            title="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Image alignment and resizing controls - only visible when an image is selected */}
        {editor.isActive('image') && (
          <div className="flex gap-1">
            <Button
              type="button"
              variant={editor.isActive('image', { alignment: 'left' }) ? 'default' : 'ghost'}
              size="icon-sm"
              onClick={() => editor.chain().focus().updateAttributes('image', { alignment: 'left' }).run()}
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('image', { alignment: 'center' }) ? 'default' : 'ghost'}
              size="icon-sm"
              onClick={() => editor.chain().focus().updateAttributes('image', { alignment: 'center' }).run()}
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('image', { alignment: 'right' }) ? 'default' : 'ghost'}
              size="icon-sm"
              onClick={() => editor.chain().focus().updateAttributes('image', { alignment: 'right' }).run()}
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().updateAttributes('image', { width: '25%' }).run()}
              title="Resize to 25%"
            >
              25%
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().updateAttributes('image', { width: '50%' }).run()}
              title="Resize to 50%"
            >
              50%
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().updateAttributes('image', { width: '75%' }).run()}
              title="Resize to 75%"
            >
              75%
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().updateAttributes('image', { width: '100%' }).run()}
              title="Resize to 100%"
            >
              100%
            </Button>
          </div>
        )}

        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </>
  );
};

const TipTapEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}> = ({ value, onChange, placeholder, disabled, error }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      CustomImage,
      Link,
      Placeholder.configure({
        placeholder: placeholder || 'Write something...',
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Update editor content when value changes from external sources
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [editor, value]);

  // Effect to handle fullscreen mode keyboard shortcuts (Escape key to exit)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    <div 
      className={`
        border rounded-lg p-2
        ${error ? 'border-red-500' : 'border-gray-300'}
        ${disabled ? 'opacity-70 bg-gray-50' : ''}
        ${isFullscreen ? 'fixed inset-0 z-[9999] rounded-none flex flex-col overflow-hidden' : ''}
        prose-editor
      `}
    >
      <style>{`
        .prose-editor .ProseMirror h1 { font-size: 2em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0.5em; }
        .prose-editor .ProseMirror h2 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0.5em; }
        .prose-editor .ProseMirror h3 { font-size: 1.3em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0.5em; }
        .prose-editor .ProseMirror h4 { font-size: 1.2em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0.5em; }
        .prose-editor .ProseMirror h5 { font-size: 1.1em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0.5em; }
        .prose-editor .ProseMirror h6 { font-size: 1em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0.5em; }
        .prose-editor .ProseMirror ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 0.5em; margin-top: 0.5em; }
        .prose-editor .ProseMirror ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 0.5em; margin-top: 0.5em; }
        .prose-editor .ProseMirror ul ul { list-style-type: circle; }
        .prose-editor .ProseMirror ul ul ul { list-style-type: square; }
        .prose-editor .ProseMirror ol ol { list-style-type: lower-alpha; }
        .prose-editor .ProseMirror ol ol ol { list-style-type: lower-roman; }
        .prose-editor .ProseMirror li { margin: 0.2em 0; }
        .prose-editor .ProseMirror { min-height: 150px; padding: 0.5rem; }
        .prose-editor .ProseMirror:focus { outline: none; }
        ${isFullscreen ? '.prose-editor .ProseMirror { flex: 1; overflow-y: auto; max-height: calc(100vh - 100px); }' : ''}
      `}</style>
      <MenuBar editor={editor} isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
      <div className="border-t border-gray-200 my-2" />
      <div className={`min-h-[150px] ${isFullscreen ? 'flex-1 flex flex-col overflow-auto' : ''}`}>
        <EditorContent 
          editor={editor} 
          disabled={disabled} 
          style={{ height: isFullscreen ? '100%' : 'auto', display: 'flex', flexDirection: 'column' }}
        />
      </div>
    </div>
  );
};

export const RichText = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = 'Write something...',
  error,
  disabled = false,
}: RichTextProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="mb-4">
          {label && (
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
          )}
          <TipTapEditor
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
          />
          {error && (
            <p className="text-sm text-red-500 mt-1">{error}</p>
          )}
        </div>
      )}
    />
  );
};

export default RichText;
