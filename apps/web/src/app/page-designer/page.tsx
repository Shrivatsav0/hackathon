"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DndContext, DragEndEvent, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PageBlock, PageDesign, BlockType } from "@/lib/types/page-builder";
import BlockRenderer from "@/components/page-builder/block-renderer";
import BlockEditor from "@/components/page-builder/block-editor";
import {
  Heading1,
  Type,
  Image,
  Link,
  Square,
  Minus,
  Divide,
  Video,
  Code,
  Quote,
  List,
  Columns,
  CreditCard,
  GripVertical,
  Edit,
  Trash2,
  Eye,
  Save,
  Download,
  Upload,
  Plus,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

interface SortableBlockProps {
  block: PageBlock;
  onEdit: (block: PageBlock) => void;
  onDelete: (id: string) => void;
}

const SortableBlock: React.FC<SortableBlockProps> = ({ block, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const blockIcons: Record<BlockType, React.ReactNode> = {
    heading: <Heading1 className="h-4 w-4" />,
    paragraph: <Type className="h-4 w-4" />,
    image: <Image className="h-4 w-4" />,
    link: <Link className="h-4 w-4" />,
    button: <Square className="h-4 w-4" />,
    spacer: <Minus className="h-4 w-4" />,
    divider: <Divide className="h-4 w-4" />,
    video: <Video className="h-4 w-4" />,
    code: <Code className="h-4 w-4" />,
    quote: <Quote className="h-4 w-4" />,
    list: <List className="h-4 w-4" />,
    columns: <Columns className="h-4 w-4" />,
    card: <CreditCard className="h-4 w-4" />,
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <Card className="mb-3 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <button
              className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-2 flex-1">
              {blockIcons[block.type]}
              <span className="font-medium capitalize">{block.type}</span>
              <Badge variant="outline" className="ml-2">#{block.order}</Badge>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="ghost" onClick={() => onEdit(block)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onDelete(block.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function PageDesigner() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<PageBlock | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const createBlock = (type: BlockType): PageBlock => {
    const baseBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      order: blocks.length,
    };

    const defaultBlocks: Record<BlockType, PageBlock> = {
      heading: { ...baseBlock, type: 'heading', level: 2, content: 'New Heading', style: {} },
      paragraph: { ...baseBlock, type: 'paragraph', content: 'Enter your text here...', style: {} },
      image: { ...baseBlock, type: 'image', url: '', alt: 'Image description', alignment: 'center' },
      link: { ...baseBlock, type: 'link', text: 'Click here', url: '#', openInNewTab: false, style: {} },
      button: { ...baseBlock, type: 'button', text: 'Button', url: '#', variant: 'default', size: 'default', alignment: 'left' },
      spacer: { ...baseBlock, type: 'spacer', height: '40px' },
      divider: { ...baseBlock, type: 'divider', style: 'solid', thickness: '1px' },
      video: { ...baseBlock, type: 'video', url: '', width: '100%', height: '400px' },
      code: { ...baseBlock, type: 'code', content: '// Your code here', language: 'javascript' },
      quote: { ...baseBlock, type: 'quote', content: 'Inspiring quote...', style: {} },
      list: { ...baseBlock, type: 'list', items: ['Item 1', 'Item 2', 'Item 3'], ordered: false, style: {} },
      columns: { ...baseBlock, type: 'columns', columns: [[], []], columnCount: 2, gap: '1rem' },
      card: { ...baseBlock, type: 'card', content: 'Card content...', style: {} },
    };

    return defaultBlocks[type];
  };

  const addBlock = (type: BlockType) => {
    const newBlock = createBlock(type);
    setBlocks([...blocks, newBlock]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const reordered = arrayMove(items, oldIndex, newIndex);
        return reordered.map((block, index) => ({ ...block, order: index }));
      });
    }
  };

  const handleUpdateBlock = (updatedBlock: PageBlock) => {
    setBlocks(blocks.map((block) => (block.id === updatedBlock.id ? updatedBlock : block)));
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id).map((block, index) => ({ ...block, order: index })));
  };

  const handleEditBlock = (block: PageBlock) => {
    setSelectedBlock(block);
    setIsEditorOpen(true);
  };

  const exportDesign = () => {
    const design: PageDesign = {
      version: '1.0.0',
      blocks,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(design, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `page-design-${Date.now()}.json`;
    link.click();
  };

  const importDesign = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const design: PageDesign = JSON.parse(e.target?.result as string);
          setBlocks(design.blocks);
        } catch (error) {
          alert('Invalid design file');
        }
      };
      reader.readAsText(file);
    }
  };

  const saveToDatabase = () => {
    const design: PageDesign = {
      version: '1.0.0',
      blocks,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // TODO: Save to your database
    console.log('Design to save:', design);
    alert('Design saved! (Check console for JSON)');
  };

  const blockTypes: { type: BlockType; icon: React.ReactNode; label: string }[] = [
    { type: 'heading', icon: <Heading1 className="h-5 w-5" />, label: 'Heading' },
    { type: 'paragraph', icon: <Type className="h-5 w-5" />, label: 'Paragraph' },
    { type: 'image', icon: <Image className="h-5 w-5" />, label: 'Image' },
    { type: 'link', icon: <Link className="h-5 w-5" />, label: 'Link' },
    { type: 'button', icon: <Square className="h-5 w-5" />, label: 'Button' },
    { type: 'video', icon: <Video className="h-5 w-5" />, label: 'Video' },
    { type: 'code', icon: <Code className="h-5 w-5" />, label: 'Code' },
    { type: 'quote', icon: <Quote className="h-5 w-5" />, label: 'Quote' },
    { type: 'list', icon: <List className="h-5 w-5" />, label: 'List' },
    { type: 'card', icon: <CreditCard className="h-5 w-5" />, label: 'Card' },
    { type: 'spacer', icon: <Minus className="h-5 w-5" />, label: 'Spacer' },
    { type: 'divider', icon: <Divide className="h-5 w-5" />, label: 'Divider' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Page Designer</h1>
            <p className="text-sm text-muted-foreground">Create custom page layouts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <label>
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </span>
              </Button>
              <input type="file" accept=".json" onChange={importDesign} className="hidden" />
            </label>
            <Button variant="outline" size="sm" onClick={exportDesign}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={saveToDatabase}>
              <Save className="h-4 w-4 mr-2" />
              Save Design
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Block Library */}
          <div className="col-span-3">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Blocks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-240px)]">
                  <div className="grid grid-cols-2 gap-2">
                    {blockTypes.map((blockType) => (
                      <Button
                        key={blockType.type}
                        variant="outline"
                        className="h-auto flex-col gap-2 p-3"
                        onClick={() => addBlock(blockType.type)}
                      >
                        {blockType.icon}
                        <span className="text-xs">{blockType.label}</span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Editor Area */}
          <div className="col-span-9">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList className="mb-4">
                <TabsTrigger value="editor">
                  <Edit className="h-4 w-4 mr-2" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Page Blocks ({blocks.length})</CardTitle>
                      {blocks.length > 0 && (
                        <Button variant="outline" size="sm" onClick={() => setBlocks([])}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Clear All
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[calc(100vh-280px)]">
                      {blocks.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <Type className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No blocks yet. Add blocks from the sidebar to get started.</p>
                        </div>
                      ) : (
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                            {blocks.map((block) => (
                              <SortableBlock
                                key={block.id}
                                block={block}
                                onEdit={handleEditBlock}
                                onDelete={handleDeleteBlock}
                              />
                            ))}
                          </SortableContext>
                        </DndContext>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[calc(100vh-280px)]">
                      <div className="max-w-4xl mx-auto space-y-6 p-6 bg-muted/30 rounded-lg">
                        {blocks.length === 0 ? (
                          <div className="text-center py-12 text-muted-foreground">
                            <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Preview will appear here once you add blocks</p>
                          </div>
                        ) : (
                          blocks
                            .sort((a, b) => a.order - b.order)
                            .map((block) => <BlockRenderer key={block.id} block={block} isPreview />)
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Editor Sheet */}
      <Sheet open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <SheetContent className="w-[500px] sm:w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Block</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {selectedBlock && (
              <BlockEditor
                block={selectedBlock}
                onUpdate={handleUpdateBlock}
                onClose={() => setIsEditorOpen(false)}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}