import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = ({ previewImages, setPreviewImages }) => {
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const removeImage = (index) => {
    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);
    setPreviewImages(updatedPreviewImages);
  };

  const getCroppedImage = (image, crop) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to crop image."));
          return;
        }
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleCropImage = async (crop) => {
    if (completedCrop && previewImages.length > 0) {
      try {
        const croppedImage = await getCroppedImage(
          previewImages[0],
          completedCrop
        );
        setPreviewImages([croppedImage]);
      } catch (error) {
        console.log("Error cropping image:", error);
      }
    }
  };

  return (
    <div className="flex flex-wrap -mx-1">
      {previewImages.map((preview, index) => (
        <div key={index} className="w-52 h-52 flex justify-end">
          <ReactCrop
            src={preview}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onImageLoaded={(image) => {
              const aspectRatio = image.width / image.height;
              setCrop({ unit: "%", width: 30, aspect: aspectRatio });
            }}
            onComplete={(c) => setCompletedCrop(c)}
            className="w-52 h-52 object-cover object-top rounded-md mr-1"
          />
          <button
            className="text-white bg-red-500 rounded hover:bg-red-700 focus:bg-red-700 focus:outline-none absolute"
            onClick={() => removeImage(index)}
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageCropper;
