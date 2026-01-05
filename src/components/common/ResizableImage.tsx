import React, { useState, useEffect } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Trash2,
} from 'lucide-react';

interface ResizableImageAttributes {
  src: string;
  alt?: string;
  title?: string;
  width?: string;
  height?: string;
  alignment?: 'left' | 'center' | 'right';
}

const ResizableImage: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  deleteNode,
}) => {
  const attrs = node.attrs as ResizableImageAttributes;
  const [showControls, setShowControls] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [imageSize, setImageSize] = useState<number>(parseInt(attrs.width || '100') || 100);

  // Set initial alignment style
  useEffect(() => {
    if (!attrs.alignment) {
      updateAttributes({ alignment: 'center' });
    }
  }, [attrs.alignment, updateAttributes]);

  const handleSizeChange = (_event: Event, newValue: number | number[]) => {
    const size = newValue as number;
    setImageSize(size);
  };

  const handleSizeChangeCommitted = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    const size = newValue as number;
    updateAttributes({ width: `${size}%` });
  };

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    updateAttributes({ alignment });
  };

  const handleOpenSizeControls = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const open = Boolean(anchorEl);

  // Determine alignment style
  const getAlignmentStyle = () => {
    switch (attrs.alignment) {
      case 'left':
        return { float: 'left' as const, marginRight: '1rem', marginBottom: '0.5rem' };
      case 'right':
        return { float: 'right' as const, marginLeft: '1rem', marginBottom: '0.5rem' };
      case 'center':
      default:
        return { display: 'block', margin: '0 auto 0.5rem auto' };
    }
  };

  return (
    <NodeViewWrapper>
      <div 
        className="resizable-image-wrapper relative inline-block max-w-full"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <img
          src={attrs.src}
          alt={attrs.alt || ''}
          title={attrs.title || ''}
          width={attrs.width || '100%'}
          height={attrs.height}
          style={{
            ...getAlignmentStyle(),
            maxWidth: '100%',
          }}
        />
        
        {showControls && (
          <div className="absolute top-0 left-0 right-0 flex justify-center p-1 bg-black/50 rounded-t">
            <div className="flex gap-1">
              <Button
                type="button"
                variant={attrs.alignment === 'left' ? 'default' : 'secondary'}
                size="icon-sm"
                onClick={() => handleAlignmentChange('left')}
                title="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant={attrs.alignment === 'center' ? 'default' : 'secondary'}
                size="icon-sm"
                onClick={() => handleAlignmentChange('center')}
                title="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant={attrs.alignment === 'right' ? 'default' : 'secondary'}
                size="icon-sm"
                onClick={() => handleAlignmentChange('right')}
                title="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                onClick={handleOpenSizeControls}
                title="Resize Image"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                onClick={() => deleteNode()}
                title="Delete Image"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {open && anchorEl && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-4 bg-white border rounded-lg shadow-lg w-64 z-50">
            <p className="text-sm font-medium mb-2">
              Image Size: {imageSize}%
            </p>
            <input
              type="range"
              value={imageSize}
              onChange={(e) => handleSizeChange(e as unknown as Event, parseInt(e.target.value))}
              onMouseUp={(e) => handleSizeChangeCommitted(e as unknown as React.SyntheticEvent, imageSize)}
              onTouchEnd={(e) => handleSizeChangeCommitted(e as unknown as React.SyntheticEvent, imageSize)}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default ResizableImage;
