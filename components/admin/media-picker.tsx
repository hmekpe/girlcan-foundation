"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploader } from "./image-uploader";
import { getMediaAssets } from "@/app/actions/admin";
import { ImageIcon, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MediaPickerProps {
  name?: string;
  value?: string;
  onChange?: (url: string) => void;
  label?: string;
}

export function MediaPicker({ name, value: externalValue, onChange, label = "Cover Image" }: MediaPickerProps) {
  const [internalValue, setInternalValue] = useState(externalValue || "");
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<{ id: string; url: string; altText: string; album: string | null }[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const currentValue = externalValue !== undefined ? externalValue : internalValue;

  const handleSelect = (url: string) => {
    setInternalValue(url);
    if (onChange) onChange(url);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      getMediaAssets()
        .then(setAssets)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [open]);

  const filteredAssets = assets.filter(
    (a) => a.altText.toLowerCase().includes(search.toLowerCase()) || (a.album && a.album.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-text">{label}</label>}
      {name && <input type="hidden" name={name} value={currentValue} />}
      <div>
        {currentValue ? (
          <div className="relative group rounded-xl overflow-hidden border border-rose/20 bg-plum/5 max-w-sm aspect-video mb-2 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentValue} alt="Selected" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-deep/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <Button type="button" size="sm" onClick={() => setOpen(true)} className="bg-white text-text hover:bg-cream">
                Change Image
              </Button>
              <Button type="button" variant="destructive" size="sm" onClick={() => handleSelect("")} className="bg-rose hover:bg-rose-dark text-white">
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <Button type="button" variant="outline" onClick={() => setOpen(true)} className="border-dashed border-rose/30 hover:border-rose hover:bg-rose/5 text-muted hover:text-text">
            <ImageIcon className="w-4 h-4 mr-2" /> Choose Image
          </Button>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0 bg-cream overflow-hidden border-rose/20">
            <DialogHeader className="p-6 pb-4 border-b border-rose/10 bg-white">
              <DialogTitle className="text-xl font-display text-text">Select Media</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="library" className="flex-1 flex flex-col min-h-0">
              <div className="px-6 border-b border-rose/10 bg-white">
                <TabsList className="bg-transparent h-12 p-0 w-full justify-start">
                  <TabsTrigger
                    value="library"
                    className="data-[state=active]:bg-transparent data-[state=active]:text-rose data-[state=active]:border-b-2 data-[state=active]:border-rose rounded-none h-full px-4 text-muted hover:text-text transition-colors"
                  >
                    From Library
                  </TabsTrigger>
                  <TabsTrigger
                    value="upload"
                    className="data-[state=active]:bg-transparent data-[state=active]:text-rose data-[state=active]:border-b-2 data-[state=active]:border-rose rounded-none h-full px-4 text-muted hover:text-text transition-colors"
                  >
                    Upload New
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="library" className="flex-1 overflow-y-auto p-6 m-0 outline-none">
                <div className="mb-6 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <Input 
                    placeholder="Search alt text or albums..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 bg-white border-rose/20 focus-visible:ring-rose"
                  />
                </div>

                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="w-8 h-8 animate-spin text-rose" />
                  </div>
                ) : filteredAssets.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="w-12 h-12 mx-auto text-muted/30 mb-4" />
                    <p className="text-muted">No media found.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredAssets.map((asset) => (
                      <div 
                        key={asset.id} 
                        className="group relative rounded-xl overflow-hidden border border-rose/20 aspect-square bg-white cursor-pointer hover:border-rose transition-colors"
                        onClick={() => handleSelect(asset.url)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={asset.url} alt={asset.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                          <p className="text-white text-xs truncate font-medium">{asset.altText}</p>
                          {asset.album && <p className="text-rose-pale text-[10px] truncate">{asset.album}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upload" className="flex-1 overflow-y-auto p-6 m-0 outline-none">
                <ImageUploader onUpload={handleSelect} />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
