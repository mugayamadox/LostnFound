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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Camera, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemFormData, itemSchema } from "@/lib/ItemSchema";
import AddButton from "../secondary/AddButton";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function AddItemForm() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [location, setLocation] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
  });

  React.useEffect(() => {
    setLocation("Current Location");
    setValue("location", "Current Location");
  }, [setValue]);

  const onSubmit = (data: ItemFormData) => {
    console.log("Form submitted", data);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));
      setValue("picture", file);
    },
    [setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        variant: "destructive",
        title: "Camera Access Error",
        description:
          "Unable to access the camera. Please check your permissions.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "captured_image.jpg", {
              type: "image/jpeg",
            });
            setPreview(URL.createObjectURL(file));
            setValue("picture", file);
          }
        }, "image/jpeg");
      }
    }
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="itemType">Item Type</Label>
        <p className="text-xs text-muted-foreground mb-2">
          Specify whether the item is lost or found
        </p>
        <RadioGroup defaultValue="lost" {...register("itemType")}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lost" id="lost" />
            <Label htmlFor="lost">Lost</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="found" id="found" />
            <Label htmlFor="found">Found</Label>
          </div>
        </RadioGroup>
        {errors.itemType && (
          <p className="text-xs text-red-500">{errors.itemType.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Item Name</Label>
        <p className="text-xs text-muted-foreground">
          Provide a short, descriptive name for the item
        </p>
        <div className="relative">
          <Input
            className="shadow-none w-full"
            id="name"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <p className="text-xs text-muted-foreground">
          Describe the item in detail, including any identifying features
        </p>
        <div className="relative">
          <Textarea
            className="w-full shadow-none"
            id="description"
            {...register("description")}
          />
        </div>
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact">Contact Information</Label>
        <p className="text-xs text-muted-foreground">
          Provide a way for people to contact you about this item
        </p>
        <div className="relative">
          <Input
            className="shadow-none w-full"
            id="contact"
            {...register("contact")}
          />
        </div>
        {errors.contact && (
          <p className="text-xs text-red-500">{errors.contact.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <p className="text-xs text-muted-foreground">
          Where the item was lost or found
        </p>
        <div className="relative">
          <Input
            className="shadow-none w-full"
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setValue("location", e.target.value);
            }}
          />
        </div>
        {errors.location && (
          <p className="text-xs text-red-500">{errors.location.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Picture</Label>
        <p className="text-xs text-muted-foreground">
          Upload or take a photo of the item
        </p>
        {!isCameraActive && (
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer">
            <input className="shadow-none" {...getInputProps()} />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-40 object-contain"
              />
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-4 h-4 mb-2" />
                <p className="text-xs">
                  Drag & drop an image here, or click to select one
                </p>
              </div>
            )}
          </div>
        )}
        {isCameraActive && (
          <div className="relative">
            <video ref={videoRef} autoPlay className="w-full" />
            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
              width="640"
              height="480"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Button onClick={capturePhoto} variant="secondary">
                Capture
              </Button>
            </div>
          </div>
        )}
        <div className="flex py-2 w-full items-center justify-center">
          <span className="">or</span>
        </div>
        <div className="mt-2 flex justify-center">
          <Button
            type="button"
            variant="outline"
            className="flex items-center"
            onClick={isCameraActive ? stopCamera : startCamera}>
            <Camera className="w-4 h-4 mr-2" />
            {isCameraActive ? "Stop Camera" : "Take Photo"}
          </Button>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );

  const content = (
    <ScrollArea className="h-[80vh] px-2">
      <div className="px-1">{formContent}</div>
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
