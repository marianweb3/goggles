import React, { useState, useRef, ChangeEvent } from "react";
import BlockHeader from "../common/block-header";

const VideImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-[#FFFFFF] border-[6px] border-[#000000] left-card-shadow w-full max-w-[538px]">
      <BlockHeader />
      <div className="p-4 md:p-[26px]">
        <div className="border-[4px] border-black relative">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Uploaded"
              className="w-full h-[300px] md:h-[498px] object-cover"
            />
          ) : (
            <div className="bg-gray-200 h-[300px] md:h-[458px] flex items-center justify-center text-gray-500">
              No image selected
            </div>
          )}
        </div>
      </div>
      <div
        className="flex items-center gap-1 pt-2 px-4 md:px-[26px] pb-[14px] cursor-pointer"
        onClick={handleChooseImage}
      >
        <p className="border-b-[2px] border-solid border-[#001AFF] text-[16px] md:text-[20px] leading-[28px] text-[#001AFF]">
          Choose image from your computer
        </p>
        <img
          src="/memory_arrow-up.svg"
          alt="Icon"
          className="w-4 h-4 md:w-auto md:h-auto"
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default VideImage;
