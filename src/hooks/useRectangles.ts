import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface UseRectanglesProps {
  billyImage?: HTMLImageElement | null;
  trashcanImage?: HTMLImageElement | null;
  isGenerated: boolean;
  setSelectedId: (id: string | null) => void;
}

export const useRectangles = ({
  billyImage,
  trashcanImage,
  isGenerated,
  setSelectedId,
}: UseRectanglesProps) => {
  const [rectangles, setRectangles] = useState<any[]>([]);

  const addRectangle = () => {
    // Get the original dimensions of the image
    const originalWidth = billyImage?.width || 1; // Get the original width
    const originalHeight = billyImage?.height || 1; // Get the original height

    // Calculate the scale factor to resize to 50 pixels
    const desiredSize = 100;
    const scaleX = desiredSize / originalWidth;
    const scaleY = desiredSize / originalHeight;

    const newRect = {
      id: uuidv4(),
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      rotation: 0,
      scaleX: 1, // Set the calculated scaleX
      scaleY: 1, // Set the calculated scaleY
      fillPatternImage: billyImage,
      fillPatternRepeat: "no-repeat",
      fillPatternScale: { x: scaleX, y: scaleY }, // Use the calculated scale values
      deleteIconImage: trashcanImage,
      draggable: !isGenerated,
    };
    setRectangles([...rectangles, newRect]);
    setSelectedId(newRect.id);
  };

  const addText = (text: string, position: "top" | "bottom") => {
    // Determine if the device is mobile
    const isMobile = window.innerWidth < 768;

    // Set y position based on device type
    const xPosition = isMobile
      ? position === "top"
        ? 110
        : 110 // Adjust these values based on your layout needs
      : position === "top"
      ? 160
      : 160;

    // Set y position based on device type
    const yPosition = isMobile
      ? position === "top"
        ? 20
        : 250 // Adjust these values based on your layout needs
      : position === "top"
      ? 20
      : 400;

    const newTextRect = {
      id: uuidv4(),
      x: xPosition,
      y: yPosition, // Adjust the y position based on the text position
      width: 300,
      height: 50,
      color: "yellow",
      text, // Store the input text here
      fontSize: 42,
      fontFamily: "Darumadrop One",
      draggable: !isGenerated,
    };
    setRectangles([...rectangles, newTextRect]);
  };

  const handleDelete = (id: string) => {
    if (rectangles.length > 1) {
      setRectangles(rectangles.filter((rect) => rect.id !== id));
      setSelectedId(null);
    }
  };

  const handleRectClick = (rect: any) => {
    setSelectedId(rect.id);
  };

  const handleRectDragMove = (event: any, rect: any) => {
    const index = rectangles.findIndex((r) => r.id === rect.id);
    const updatedRectangles = [...rectangles];
    updatedRectangles[index] = {
      ...updatedRectangles[index],
      x: event.target.x(),
      y: event.target.y(),
    };
    setRectangles(updatedRectangles);
  };

  const handleRectTransform = (event: any, rect: any) => {
    const index = rectangles.findIndex((r) => r.id === rect.id);
    const node = event.target;

    const updatedRectangles = [...rectangles];
    updatedRectangles[index] = {
      ...updatedRectangles[index],
      x: node.x(),
      y: node.y(),
      rotation: node.rotation(),
      scaleX: node.scaleX(),
      scaleY: node.scaleY(),
    };
    setRectangles(updatedRectangles);
  };

  const handleRectDragEnd = (rect: any) => {
    setSelectedId(rect.id);
  };

  useEffect(() => {
    setRectangles((prevState) =>
      prevState.map((rectangle) => ({
        ...rectangle,
        draggable: false,
      }))
    );
  }, [isGenerated]);

  return {
    addText,
    rectangles,
    setRectangles,
    addRectangle,
    handleDelete,
    handleRectClick,
    handleRectDragMove,
    handleRectTransform,
    handleRectDragEnd,
  };
};
