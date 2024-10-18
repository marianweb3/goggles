import React, { useState } from "react";
import BlockHeader from "../common/block-header";
import { LeftArrowIcon, RightArrowIcon } from "../common/icons";
import useScrollbar from "../../hooks/useScrollbar";

interface Image {
  id: number;
  src: string;
}

const images: Image[] = [
  { id: 1, src: "#FCFF3D" },
  { id: 2, src: "#FCFF3D" },
  { id: 3, src: "#FCFF3D" },
  { id: 4, src: "#FCFF3D" },
  { id: 5, src: "#FCFF3D" },
  { id: 6, src: "#FCFF3D" },
  { id: 7, src: "#FCFF3D" },
  { id: 8, src: "#FCFF3D" },
];

const EditImage = () => {
  const [text, setText] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const {
    scrollContainerRef,
    scrollbarTrackRef,
    scrollbarThumbRef,
    handleScrollbarMouseDown,
    updateScrollbarPosition,
  } = useScrollbar();

  return (
    <div className="bg-[#FFFFFF] border-[6px] border-[#000000] left-card-shadow w-full mx-auto max-w-[759px]">
      <BlockHeader />

      <div className="py-[18px] px-4">
        <div className="border-4 border-black mb-6">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-[14px] pt-[21px] scrollbar-hide no-scrollbar px-2"
            onScroll={updateScrollbarPosition}
          >
            {images.map((img, index) => (
              <div
                key={img.id}
                className={`flex-shrink-0 w-[143px] h-[128px] border-4 border-black cursor-pointer ${
                  index === selectedImage ? "ring ring-black" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: img.src }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex items-center bg-[#D9D9D9] h-[23px] border-t-4 border-black relative">
            <LeftArrowIcon />
            <div
              ref={scrollbarTrackRef}
              className="absolute left-5 right-5 h-[23px] top-1/2 transform -translate-y-1/2 cursor-pointer"
              onMouseDown={handleScrollbarMouseDown}
            >
              <div
                ref={scrollbarThumbRef}
                className="absolute top-0 bg-black h-full cursor-pointer"
              ></div>
            </div>
            <RightArrowIcon />
          </div>
        </div>

        <div className="border-4 border-black mb-3">
          <textarea
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            placeholder="Your text.."
            className="w-full h-[108px] resize-none bg-[#EDEDED] p-2 text-gray-700"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button className="btn-primary">Top</button>
          <button className="btn-primary">Bottom</button>
          <button className="btn-download">Download</button>
        </div>
      </div>
    </div>
  );
};

export default EditImage;
