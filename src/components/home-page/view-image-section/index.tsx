import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import BlockHeader from "../../common/block-header";
import { imageUpload } from "../../../helpers/imageUpload";
import EditStageComponent from "./edit-stage-component";
import useImage from "use-image";
import FinalStageComponent from "./final-stage-component";

interface ViewImageSectionProps {
  selectedImage: string | null;
  setSelectedImage: (value: string | null) => void;
  setSelectedId: (value: string | null) => void;
  selectedId: string | null;
  setStageReferenceState: (value: any) => void;

  handleDelete: (id: string) => void;
  handleRectClick: (rect: any) => void;
  handleRectDragEnd: (rect: any) => void;
  handleRectDragMove: (event: any, rect: any) => void;
  handleRectTransform: (event: any, rect: any) => void;
  rectangles: any;

  isGenerated: boolean;
  setIsGenerated: (value: boolean) => void;
}

const ViewImageSection = ({
  setSelectedId,
  selectedImage,
  selectedId,
  setStageReferenceState,
  setSelectedImage,
  handleDelete,
  handleRectClick,
  handleRectTransform,
  handleRectDragEnd,
  handleRectDragMove,
  rectangles,
  isGenerated,
}: ViewImageSectionProps) => {
  //

  const [backgroundImage] = useImage(selectedImage ?? "");

  const stageRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (trRef.current) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      trRef.current.nodes(selectedNode ? [selectedNode] : []);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId, rectangles]);

  useEffect(() => {
    // console.log(stageRef, stageReferenceState);
    setStageReferenceState(stageRef.current); // Set the stage ref for parent component
  }, [stageRef.current]);

  return (
    <div className="bg-[#FFFFFF] border-[6px] border-[#000000] left-card-shadow w-full max-w-[538px]">
      <BlockHeader />
      <div className="p-4 md:p-[26px]">
        <div className="border-[4px] border-black relative">
          {isGenerated ? (
            <FinalStageComponent
              backgroundImage={backgroundImage}
              rectangles={rectangles}
              stageRef={stageRef}
              trRef={trRef}
            />
          ) : selectedImage ? (
            <EditStageComponent
              backgroundImage={backgroundImage}
              handleDelete={handleDelete}
              handleRectClick={handleRectClick}
              handleRectDragEnd={handleRectDragEnd}
              handleRectDragMove={handleRectDragMove}
              rectangles={rectangles}
              selectedId={selectedId}
              stageRef={stageRef}
              trRef={trRef}
              handleRectTransform={handleRectTransform}
            />
          ) : (
            <div className="bg-gray-200 h-[300px] md:h-[458px] flex items-center justify-center text-gray-500">
              No image selected
            </div>
          )}
        </div>
      </div>
      <label className="flex items-center gap-1 pt-2 px-4 md:px-[26px] pb-[14px] cursor-pointer">
        <p className="border-b-[2px] border-solid border-[#001AFF] text-[16px] md:text-[20px] leading-[28px] text-[#001AFF]">
          Choose image from your computer
        </p>
        <img
          src="/memory_arrow-up.svg"
          alt="Icon"
          className="w-4 h-4 md:w-auto md:h-auto"
        />
        <input
          type="file"
          accept="image/*"
          onClick={(event: any) => (event.target.value = "")}
          onChange={(event) => imageUpload(event, setSelectedImage)}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ViewImageSection;
