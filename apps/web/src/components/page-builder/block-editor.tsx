"use client";

import React, { useState } from "react";
import { PageBlock, TextStyle } from "@/lib/types/page-builder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

interface BlockEditorProps {
  block: PageBlock;
  onUpdate: (block: PageBlock) => void;
  onClose: () => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ block, onUpdate, onClose }) => {
  const [editedBlock, setEditedBlock] = useState<PageBlock>(block);

  const updateBlock = (updates: Partial<PageBlock>) => {
    setEditedBlock({ ...editedBlock, ...updates });
  };

  const updateStyle = (styleUpdates: Partial<TextStyle>) => {
    const currentStyle = (editedBlock as any).style || {};
    updateBlock({ style: { ...currentStyle, ...styleUpdates } } as any);
  };

  const handleSave = () => {
    onUpdate(editedBlock);
    onClose();
  };

  const renderStyleControls = () => {
    const style = (editedBlock as any).style || {};
    
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={style.bold ? "default" : "outline"}
            size="sm"
            onClick={() => updateStyle({ bold: !style.bold })}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant={style.italic ? "default" : "outline"}
            size="sm"
            onClick={() => updateStyle({ italic: !style.italic })}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant={style.underline ? "default" : "outline"}
            size="sm"
            onClick={() => updateStyle({ underline: !style.underline })}
          >
            <Underline className="h-4 w-4" />
          </Button>
          <Button
            variant={style.strikethrough ? "default" : "outline"}
            size="sm"
            onClick={() => updateStyle({ strikethrough: !style.strikethrough })}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant={style.textAlign === 'left' ? "default" : "outline"}
            size="sm"
            onClick={() => updateStyle({ textAlign: 'left' })}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={style.textAlign === 'center' ? "default" : "outline"}
            size="sm"
            onClick={() => updateStyle({ textAlign: 'center' })}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant={style.textAlign === 'right' ? "default" : "outline"}
            size="sm"
            onClick={() => updateStyle({ textAlign: 'right' })}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            variant={style.textAlign === 'justify' ? "default" : "outline"}
            size="sm"
            onClick={() => updateStyle({ textAlign: 'justify' })}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Text Color</Label>
            <Input
              type="color"
              value={style.color || "#000000"}
              onChange={(e) => updateStyle({ color: e.target.value })}
            />
          </div>
          <div>
            <Label>Background Color</Label>
            <Input
              type="color"
              value={style.backgroundColor || "#ffffff"}
              onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label>Font Size</Label>
          <Select
            value={style.fontSize || "16px"}
            onValueChange={(value) => updateStyle({ fontSize: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12px">12px</SelectItem>
              <SelectItem value="14px">14px</SelectItem>
              <SelectItem value="16px">16px</SelectItem>
              <SelectItem value="18px">18px</SelectItem>
              <SelectItem value="20px">20px</SelectItem>
              <SelectItem value="24px">24px</SelectItem>
              <SelectItem value="32px">32px</SelectItem>
              <SelectItem value="48px">48px</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  const renderEditor = () => {
    switch (editedBlock.type) {
      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              <Label>Heading Level</Label>
              <Select
                value={String((editedBlock as any).level)}
                onValueChange={(value) => updateBlock({ level: Number(value) } as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <SelectItem key={level} value={String(level)}>
                      H{level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Content</Label>
              <Input
                value={(editedBlock as any).content}
                onChange={(e) => updateBlock({ content: e.target.value } as any)}
              />
            </div>
            {renderStyleControls()}
          </div>
        );

      case 'paragraph':
        return (
          <div className="space-y-4">
            <div>
              <Label>Content</Label>
              <Textarea
                value={(editedBlock as any).content}
                onChange={(e) => updateBlock({ content: e.target.value } as any)}
                rows={4}
              />
            </div>
            {renderStyleControls()}
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label>Image URL</Label>
              <Input
                value={(editedBlock as any).url}
                onChange={(e) => updateBlock({ url: e.target.value } as any)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label>Alt Text</Label>
              <Input
                value={(editedBlock as any).alt}
                onChange={(e) => updateBlock({ alt: e.target.value } as any)}
              />
            </div>
            <div>
              <Label>Caption (Optional)</Label>
              <Input
                value={(editedBlock as any).caption || ''}
                onChange={(e) => updateBlock({ caption: e.target.value } as any)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Width</Label>
                <Input
                  value={(editedBlock as any).width || ''}
                  onChange={(e) => updateBlock({ width: e.target.value } as any)}
                  placeholder="auto, 100%, 500px"
                />
              </div>
              <div>
                <Label>Height</Label>
                <Input
                  value={(editedBlock as any).height || ''}
                  onChange={(e) => updateBlock({ height: e.target.value } as any)}
                  placeholder="auto, 100%, 300px"
                />
              </div>
            </div>
            <div>
              <Label>Alignment</Label>
              <Select
                value={(editedBlock as any).alignment || 'center'}
                onValueChange={(value) => updateBlock({ alignment: value } as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={(editedBlock as any).rounded}
                onCheckedChange={(checked) => updateBlock({ rounded: checked } as any)}
              />
              <Label>Rounded Corners</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={(editedBlock as any).border}
                onCheckedChange={(checked) => updateBlock({ border: checked } as any)}
              />
              <Label>Show Border</Label>
            </div>
          </div>
        );

      case 'link':
        return (
          <div className="space-y-4">
            <div>
              <Label>Link Text</Label>
              <Input
                value={(editedBlock as any).text}
                onChange={(e) => updateBlock({ text: e.target.value } as any)}
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={(editedBlock as any).url}
                onChange={(e) => updateBlock({ url: e.target.value } as any)}
                placeholder="https://example.com"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={(editedBlock as any).openInNewTab}
                onCheckedChange={(checked) => updateBlock({ openInNewTab: checked } as any)}
              />
              <Label>Open in New Tab</Label>
            </div>
            {renderStyleControls()}
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <Label>Button Text</Label>
              <Input
                value={(editedBlock as any).text}
                onChange={(e) => updateBlock({ text: e.target.value } as any)}
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={(editedBlock as any).url}
                onChange={(e) => updateBlock({ url: e.target.value } as any)}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <Label>Variant</Label>
              <Select
                value={(editedBlock as any).variant || 'default'}
                onValueChange={(value) => updateBlock({ variant: value } as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Size</Label>
              <Select
                value={(editedBlock as any).size || 'default'}
                onValueChange={(value) => updateBlock({ size: value } as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Alignment</Label>
              <Select
                value={(editedBlock as any).alignment || 'left'}
                onValueChange={(value) => updateBlock({ alignment: value } as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'spacer':
        return (
          <div className="space-y-4">
            <div>
              <Label>Height</Label>
              <Input
                value={(editedBlock as any).height}
                onChange={(e) => updateBlock({ height: e.target.value } as any)}
                placeholder="20px, 2rem, 5vh"
              />
            </div>
          </div>
        );

      case 'divider':
        return (
          <div className="space-y-4">
            <div>
              <Label>Style</Label>
              <Select
                value={(editedBlock as any).style || 'solid'}
                onValueChange={(value) => updateBlock({ style: value } as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Color</Label>
              <Input
                type="color"
                value={(editedBlock as any).color || "#000000"}
                onChange={(e) => updateBlock({ color: e.target.value } as any)}
              />
            </div>
            <div>
              <Label>Thickness</Label>
              <Input
                value={(editedBlock as any).thickness || '1px'}
                onChange={(e) => updateBlock({ thickness: e.target.value } as any)}
                placeholder="1px, 2px, 3px"
              />
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <Label>Video URL</Label>
              <Input
                value={(editedBlock as any).url}
                onChange={(e) => updateBlock({ url: e.target.value } as any)}
                placeholder="YouTube or Vimeo URL"
              />
            </div>
            <div>
              <Label>Caption (Optional)</Label>
              <Input
                value={(editedBlock as any).caption || ''}
                onChange={(e) => updateBlock({ caption: e.target.value } as any)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Width</Label>
                <Input
                  value={(editedBlock as any).width || '100%'}
                  onChange={(e) => updateBlock({ width: e.target.value } as any)}
                />
              </div>
              <div>
                <Label>Height</Label>
                <Input
                  value={(editedBlock as any).height || '400px'}
                  onChange={(e) => updateBlock({ height: e.target.value } as any)}
                />
              </div>
            </div>
          </div>
        );

      case 'code':
        return (
          <div className="space-y-4">
            <div>
              <Label>Code</Label>
              <Textarea
                value={(editedBlock as any).content}
                onChange={(e) => updateBlock({ content: e.target.value } as any)}
                rows={6}
                className="font-mono"
              />
            </div>
            <div>
              <Label>Language</Label>
              <Input
                value={(editedBlock as any).language || ''}
                onChange={(e) => updateBlock({ language: e.target.value } as any)}
                placeholder="javascript, python, etc."
              />
            </div>
          </div>
        );

      case 'quote':
        return (
          <div className="space-y-4">
            <div>
              <Label>Quote</Label>
              <Textarea
                value={(editedBlock as any).content}
                onChange={(e) => updateBlock({ content: e.target.value } as any)}
                rows={3}
              />
            </div>
            <div>
              <Label>Author (Optional)</Label>
              <Input
                value={(editedBlock as any).author || ''}
                onChange={(e) => updateBlock({ author: e.target.value } as any)}
              />
            </div>
            {renderStyleControls()}
          </div>
        );

      case 'list':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={(editedBlock as any).ordered}
                onCheckedChange={(checked) => updateBlock({ ordered: checked } as any)}
              />
              <Label>Ordered List (Numbers)</Label>
            </div>
            <div>
              <Label>List Items (one per line)</Label>
              <Textarea
                value={(editedBlock as any).items.join('\n')}
                onChange={(e) => updateBlock({ items: e.target.value.split('\n').filter(Boolean) } as any)}
                rows={5}
              />
            </div>
            {renderStyleControls()}
          </div>
        );

      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title (Optional)</Label>
              <Input
                value={(editedBlock as any).title || ''}
                onChange={(e) => updateBlock({ title: e.target.value } as any)}
              />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={(editedBlock as any).content}
                onChange={(e) => updateBlock({ content: e.target.value } as any)}
                rows={4}
              />
            </div>
            <div>
              <Label>Image URL (Optional)</Label>
              <Input
                value={(editedBlock as any).imageUrl || ''}
                onChange={(e) => updateBlock({ imageUrl: e.target.value } as any)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {renderStyleControls()}
          </div>
        );

      default:
        return <div>Editor not available for this block type</div>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Edit {editedBlock.type} Block</h3>
      </div>
      {renderEditor()}
      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={handleSave} className="flex-1">Save Changes</Button>
        <Button onClick={onClose} variant="outline">Cancel</Button>
      </div>
    </div>
  );
};

export default BlockEditor;