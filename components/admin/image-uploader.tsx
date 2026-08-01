"use client";

import { useState, useEffect, useRef } from "react";
import { uploadImageAction } from "@/app/actions/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link as LinkIcon, ClipboardPaste, X, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  label?: string;
  currentUrl?: string;
  className?: string;
}

export function ImageUploader({ onUpload, label, currentUrl, className }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [activeTab, setActiveTab] = useState("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewLocalUrl, setPreviewLocalUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert("File exceeds 10MB limit");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed.");
      return;
    }
    setSelectedFile(file);
    setPreviewLocalUrl(URL.createObjectURL(file));
    setUploadSuccess(false);
  };

  const handleUploadSelected = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await uploadImageAction(formData);
      if (res.success && res.url) {
        setUploadSuccess(true);
        setTimeout(() => {
          onUpload(res.url!);
          setSelectedFile(null);
          setPreviewLocalUrl(null);
          setUploadSuccess(false);
        }, 1500);
      } else {
        alert(res.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onUpload(urlInput.trim());
      setUrlInput("");
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      if (activeTab !== "paste" && activeTab !== "file") return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handleGlobalPaste);
    return () => window.removeEventListener("paste", handleGlobalPaste);
  }, [activeTab]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className={cn("space-y-4", className)}>
      {label && <label className="text-sm font-medium text-text">{label}</label>}
      
      {currentUrl && !selectedFile ? (
        <div className="relative group rounded-xl overflow-hidden border border-rose/20 bg-plum/5 max-w-sm aspect-video flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-deep/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onUpload("")}
              className="bg-rose hover:bg-rose-dark text-white"
            >
              <X className="w-4 h-4 mr-2" /> Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-rose/20 bg-plum/5 overflow-hidden shadow-sm transition-all duration-300">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b border-rose/10 bg-white/50 h-14 p-0">
              <TabsTrigger
                value="file"
                className="data-[state=active]:bg-white data-[state=active]:text-rose data-[state=active]:border-b-2 data-[state=active]:border-rose data-[state=active]:shadow-sm rounded-none h-full px-6 flex-1 sm:flex-none text-muted hover:text-text transition-all"
              >
                <Upload className="w-4 h-4 mr-2" /> <span className="font-medium">File</span>
              </TabsTrigger>
              <TabsTrigger
                value="paste"
                className="data-[state=active]:bg-white data-[state=active]:text-rose data-[state=active]:border-b-2 data-[state=active]:border-rose data-[state=active]:shadow-sm rounded-none h-full px-6 flex-1 sm:flex-none text-muted hover:text-text transition-all"
              >
                <ClipboardPaste className="w-4 h-4 mr-2" /> <span className="font-medium">Paste</span>
              </TabsTrigger>
              <TabsTrigger
                value="url"
                className="data-[state=active]:bg-white data-[state=active]:text-rose data-[state=active]:border-b-2 data-[state=active]:border-rose data-[state=active]:shadow-sm rounded-none h-full px-6 flex-1 sm:flex-none text-muted hover:text-text transition-all"
              >
                <LinkIcon className="w-4 h-4 mr-2" /> <span className="font-medium">URL</span>
              </TabsTrigger>
            </TabsList>

            <div className="p-6 bg-white/50">
              {isUploading ? (
                <div className="py-12 flex flex-col items-center justify-center text-rose">
                  <Loader2 className="w-8 h-8 animate-spin mb-4" />
                  <p className="text-sm font-medium text-text">Uploading image...</p>
                </div>
              ) : uploadSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-state-success animate-in zoom-in duration-300">
                  <CheckCircle2 className="w-12 h-12 mb-4" />
                  <p className="text-lg font-medium text-text">Upload Complete!</p>
                </div>
              ) : selectedFile ? (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border border-cream-300 bg-cream aspect-video flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {previewLocalUrl && <img src={previewLocalUrl} alt="Local preview" className="w-full h-full object-contain" />}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button type="button" variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-rose backdrop-blur shadow-sm" onClick={() => { setSelectedFile(null); setPreviewLocalUrl(null); }}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-cream-300">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-rose/10 rounded-md text-rose">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink-900 truncate">{selectedFile.name}</p>
                        <p className="text-xs text-ink-500">{formatSize(selectedFile.size)} • {selectedFile.type.split('/')[1]?.toUpperCase()}</p>
                      </div>
                    </div>
                    <Button onClick={handleUploadSelected} className="bg-rose hover:bg-rose-600 text-white shadow-sm ml-4 shrink-0">
                      Upload Now
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <TabsContent value="file" className="mt-0 outline-none">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                      className={cn(
                        "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group",
                        isDragOver ? "border-rose bg-rose/10 scale-[1.02] shadow-[0_0_20px_rgba(232,69,90,0.15)]" : "border-rose/30 bg-white hover:border-rose hover:bg-rose/5"
                      )}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={onFileChange}
                      />
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300",
                        isDragOver ? "bg-rose text-white scale-110 shadow-lg shadow-rose/20" : "bg-rose/10 text-rose group-hover:scale-110 group-hover:bg-rose/20"
                      )}>
                        <Upload className={cn("w-8 h-8", isDragOver && "animate-bounce")} />
                      </div>
                      <p className="text-lg font-medium text-ink-900 mb-1">
                        {isDragOver ? "Drop image here" : "Click to browse or drag and drop"}
                      </p>
                      <p className="text-sm text-ink-500">Supports JPG, PNG, WEBP, GIF up to 10MB</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="paste" className="mt-0 outline-none">
                    <div className="border-2 border-dashed border-rose/30 bg-white rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
                      <div className="w-16 h-16 rounded-full bg-rose/10 flex items-center justify-center mb-4 shadow-inner">
                        <ClipboardPaste className="w-8 h-8 text-rose" />
                      </div>
                      <p className="text-lg font-medium text-ink-900 mb-2">Copy an image and press Ctrl+V here</p>
                      <p className="text-sm text-ink-500">Image will appear for preview before upload</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="url" className="mt-0 outline-none">
                    <div className="flex gap-3 bg-white p-4 rounded-xl border border-rose/20 shadow-sm">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleUrlSubmit())}
                          className="pl-9 bg-cream-50 border-cream-300 focus-visible:ring-rose/30 w-full"
                        />
                      </div>
                      <Button onClick={handleUrlSubmit} type="button" className="bg-rose hover:bg-rose-600 text-white shadow-sm px-6">
                        Use URL
                      </Button>
                    </div>
                  </TabsContent>
                </>
              )}
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
}
