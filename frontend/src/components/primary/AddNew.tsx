"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Camera, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemFormData, itemSchema } from "@/lib/ItemSchema";
import AddButton from "../secondary/AddButton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function AddNew() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      itemType: "lost",
      name: "",
      description: "",
      contact: "",
      location: "Current Location",
    },
  });

  const onSubmit = (data: ItemFormData) => {
    console.log("Form submitted", data);
    setOpen(false);
    toast({
      title: "Item Added",
      description: "Your item has been successfully added.",
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      handleFileSelection(acceptedFiles[0]);
    },
    [form]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleFileSelection = (file: File) => {
    setPreview(URL.createObjectURL(file));
    form.setValue("picture", file);
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No image was selected or captured. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    form.resetField("picture");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="itemType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Type</FormLabel>
              <FormDescription>
                Specify whether the item is lost or found
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="lost" />
                    </FormControl>
                    <FormLabel className="font-normal">Lost</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="found" />
                    </FormControl>
                    <FormLabel className="font-normal">Found</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormDescription>
                Provide a short, descriptive name for the item
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormDescription>
                Describe the item in detail, including any identifying features
              </FormDescription>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Information</FormLabel>
              <FormDescription>
                Provide a way for people to contact you about this item
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormDescription>
                Where the item was lost or found
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="picture"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormDescription>
                Upload {isMobile && "or take"} a photo of the item
              </FormDescription>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer relative">
                  <input {...getInputProps()} {...field} />
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto max-h-40 object-contain"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-4 h-4 mb-2" />
                      <p className="text-xs">
                        Drag & drop an image here, or click to select one
                      </p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isMobile && (
          <>
            <div className="flex py-2 w-full items-center justify-center">
              <span className="">or</span>
            </div>
            <div className="mt-2 flex justify-center">
              <Button
                type="button"
                variant="outline"
                className="flex items-center"
                onClick={handleCameraCapture}>
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
            </div>
          </>
        )}

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );

  const content = (
    <ScrollArea className="h-[80vh] px-2">
      <div className="px-1 pb-4">{formContent}</div>
    </ScrollArea>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <AddButton onClick={() => setOpen(true)} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl py-2">
          <DialogHeader className="border-b py-4">
            <DialogTitle>Add New Lost or Found Item</DialogTitle>
            <DialogDescription className="text-xs">
              Please fill out the details of the lost or found item.
            </DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <AddButton onClick={() => setOpen(true)} />
      </DrawerTrigger>
      <DrawerContent className="py-2 max-h-[90vh]">
        <DrawerHeader className="text-left border-b mb-6">
          <DrawerTitle>Add New Lost or Found Item</DrawerTitle>
          <DrawerDescription className="text-xs">
            Please fill out the details of the lost or found item.
          </DrawerDescription>
        </DrawerHeader>
        {content}
      </DrawerContent>
    </Drawer>
  );
}
