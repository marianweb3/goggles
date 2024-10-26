import React, { useState } from "react";
import BlockHeader from "../../common/block-header";
import { LeftArrowIcon, RightArrowIcon } from "../../common/icons";
import useScrollbar from "../../../hooks/useScrollbar";
import { imageDownload } from "../../../helpers/imageDownload";
import { useRectangles } from "../../../hooks/useRectangles";

interface Image {
  id: number;
  src: string;
}

export const glasses: Image[] = [
  { id: 1, src: "/glasses/1.PNG" },
  { id: 2, src: "/glasses/2.PNG" },
  { id: 3, src: "/glasses/3.PNG" },
  { id: 4, src: "/glasses/4.PNG" },
  { id: 5, src: "/glasses/5.PNG" },
  { id: 6, src: "/glasses/6.png" },
  { id: 7, src: "/glasses/7.png" },
  { id: 8, src: "/glasses/8.png" },
];

interface EditImageSectionProps {
  selectedImage: string | null;
  setSelectedImage: (value: string | null) => void;
  stageReferenceState: any;
  addRectangle: () => void;
  setRectangles: (value: any[]) => void;
  isGenerated: boolean;
  setIsGenerated: (value: boolean) => void;

  setSelectedId: (value: string | null) => void;

  setSelectedSmallImage: (value: number) => void;
  selectedSmallImage: number;
  addText: (tex: string, position: "top" | "bottom") => void;
}

const EditImageSection = ({
  selectedImage,
  setSelectedImage,
  stageReferenceState,
  addRectangle,
  isGenerated,
  setIsGenerated,
  setSelectedId,
  setRectangles,
  setSelectedSmallImage,
  selectedSmallImage,
  addText,
}: EditImageSectionProps) => {
  const [text, setText] = useState<string>("");

  const {
    scrollContainerRef,
    scrollbarTrackRef,
    scrollbarThumbRef,
    handleScrollbarMouseDown,
    updateScrollbarPosition,
  } = useScrollbar();

  const handleGenerateClick = () => {
    setIsGenerated(true);
    setSelectedId(null);
  };

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
            {glasses.map((img, index) => (
              <div
                key={img.id}
                className={`flex-shrink-0 w-[143px] h-[128px] border-4 border-black cursor-pointer ${
                  index === selectedSmallImage ? "ring ring-black" : ""
                }`}
                onClick={() => setSelectedSmallImage(index)}
              >
                <img
                  className="w-full h-full"
                  src={img.src} // Set the image source
                  alt={`Image ${img.id}`}
                ></img>
              </div>
            ))}
          </div>
          <div className="flex items-center bg-[#D9D9D9] h-[23px] border-t-4 border-black relative">
            <LeftArrowIcon />
            <div
              ref={scrollbarTrackRef}
              className="absolute left-5 right-5 h-[23px] top-1/2 transform -translate-y-1/2 cursor-pointer overflow-auto touch-pan-x"
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
        <div className="flex flex-wrap justify-end gap-4">
          <button
            disabled={!selectedImage}
            className={`btn-primary     ${
              !selectedImage && "cursor-not-allowed"
            } `}
            onClick={() => {
              setSelectedImage(null);
              setRectangles([]);
              setIsGenerated(false);
            }}
          >
            Reset
          </button>

          {isGenerated ? (
            <button
              className={`btn-download     ${
                !selectedImage && "cursor-not-allowed"
              } `}
              disabled={!selectedImage}
              onClick={() => imageDownload(stageReferenceState)}
            >
              Download
            </button>
          ) : (
            <>
              <button
                className={`btn-primary     ${
                  !selectedImage && "cursor-not-allowed"
                } `}
                disabled={!selectedImage}
                onClick={addRectangle}
              >
                Add glass
              </button>

              <button
                className={`btn-primary     ${
                  !selectedImage && "cursor-not-allowed"
                } `}
                disabled={!selectedImage}
                onClick={() => addText(text, "top")}
              >
                Top
              </button>
              <button
                className={`btn-primary     ${
                  !selectedImage && "cursor-not-allowed"
                } `}
                disabled={!selectedImage}
                onClick={() => addText(text, "bottom")}
              >
                Bottom
              </button>

              <button
                className={`btn-download     ${
                  !selectedImage && "cursor-not-allowed"
                } `}
                disabled={!selectedImage}
                onClick={handleGenerateClick}
              >
                Generate
              </button>
            </>
          )}

          {/*fdf*/}
          {/*fdf*/}
          {/*fdf*/}
          {/*fdf*/}
          {/*fdf*/}
        </div>
      </div>
    </div>
  );
};

export default EditImageSection;
