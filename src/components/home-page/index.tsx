import React, { useState } from "react";
import Layout from "../layout";
import ViewImageSection from "./view-image-section";
import EditImageSection, { glasses } from "./edit-image-section";
import { useRectangles } from "../../hooks/useRectangles";
import useImage from "use-image";

import trashcanImageSrc from "../../assets/trash.svg";

const HomePage = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [stageReferenceState, setStageReferenceState] = useState<any>(null); // State for stage ref

  const [selectedSmallImage, setSelectedSmallImage] = useState<number>(0);

  const [billyImage] = useImage(glasses[selectedSmallImage].src); // Placeholder for the small image

  const [trashcanImage] = useImage(trashcanImageSrc); // Placeholder for the trashcan icon image

  const {
    addText,
    rectangles,
    setRectangles,
    addRectangle,
    handleDelete,
    handleRectClick,
    handleRectDragMove,
    handleRectDragEnd,
    handleRectTransform,
  } = useRectangles({
    billyImage,
    trashcanImage,
    isGenerated,
    setSelectedId,
  });

  // console.log(billyImage, status);
  console.log(rectangles);

  return (
    <Layout>
      <img
        src="/background.png"
        alt="Background Color"
        className="w-full h-full object-cover fixed top-0 left-0 "
      />
      <div className="relative max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8">
        <div className="min-h-[calc(100vh-79.17px)] flex items-center justify-center text-center flex-col max-w-[1361px] mx-auto w-full gap-8 md:gap-[54px] py-8">
          <img src="/title.png" alt="Title" className="max-w-full h-auto" />

          <div className="w-full flex flex-col 2xl:flex-row items-center gap-8 lg:gap-16">
            <ViewImageSection
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              setStageReferenceState={setStageReferenceState}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              handleDelete={handleDelete}
              handleRectClick={handleRectClick}
              handleRectDragMove={handleRectDragMove}
              handleRectDragEnd={handleRectDragEnd}
              handleRectTransform={handleRectTransform}
              rectangles={rectangles}
              isGenerated={isGenerated}
              setIsGenerated={setIsGenerated}
            />
            <EditImageSection
              stageReferenceState={stageReferenceState}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              addRectangle={addRectangle}
              setRectangles={setRectangles}
              setSelectedId={setSelectedId}
              isGenerated={isGenerated}
              setIsGenerated={setIsGenerated}
              selectedSmallImage={selectedSmallImage}
              setSelectedSmallImage={setSelectedSmallImage}
              addText={addText}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
