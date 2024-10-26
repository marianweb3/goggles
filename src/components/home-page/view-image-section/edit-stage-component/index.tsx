//@ts-nocheck

import {
  Stage,
  Layer,
  Rect,
  Transformer,
  Image as KonvaImage,
  Group,
  Text,
} from "react-konva";
import { useEffect, useRef, useState } from "react";

interface EditStageComponentProps {
  backgroundImage?: HTMLImageElement | null;
  rectangles: any[];
  stageRef: any;
  trRef: any;
  selectedId: string | null;
  handleRectClick: (rect: any) => void;
  handleRectDragMove: (event: any, rect: any) => void;
  handleRectDragEnd: (rect: any) => void;
  handleDelete: (id: string) => void;
  handleRectTransform: (event: any, rect: any) => void;
}

const EditStageComponent = ({
  backgroundImage,
  rectangles,
  stageRef,
  trRef,
  selectedId,
  handleRectClick,
  handleRectDragMove,
  handleRectDragEnd,
  handleRectTransform,
  handleDelete,
}: EditStageComponentProps) => {
  const deleteIconRef = useRef<any>(null);
  const containerRef = useRef(null); // Reference to parent container
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  // Fixed aspect ratio of the stage (based on your original width/height)
  const ASPECT_RATIO = 1.09; // height / width (470px by 465px initially)

  // Update the size of the Stage based on container size, maintaining aspect ratio
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;

        // Maintain aspect ratio (like object-fit: cover)
        let newWidth = containerWidth;
        let newHeight = newWidth * ASPECT_RATIO;

        // If the height exceeds the container, adjust the width accordingly
        if (newHeight > containerHeight) {
          newHeight = containerHeight;
          newWidth = newHeight / ASPECT_RATIO;
        }

        setStageSize({
          width: newWidth,
          height: newHeight,
        });
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Set initial size

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const calculateDeleteIconPosition = (rect: any) => {
    const rectWidth = rect.width * rect.scaleX;
    // const rectHeight = rect.height * rect.scaleY;

    const padding = 35;

    // Calculate the top-right corner position before rotation
    const topRightCornerX = rect.x + rectWidth;
    const topRightCornerY = rect.y - padding;

    // Translate the top-right corner to the origin for rotation
    const translatedX = topRightCornerX - rect.x;
    const translatedY = topRightCornerY - rect.y;

    // Apply rotation
    const radians = (Math.PI / 180) * rect.rotation;
    const rotatedX =
      translatedX * Math.cos(radians) - translatedY * Math.sin(radians);
    const rotatedY =
      translatedX * Math.sin(radians) + translatedY * Math.cos(radians);

    // Translate back to the original position
    const finalX = rect.x + rotatedX;
    const finalY = rect.y + rotatedY;

    // Add padding to position the delete icon slightly outside the top-right corner
    return {
      x: finalX,
      y: finalY,
    };
  };

  return (
    <div
      ref={containerRef}
      className="flex justify-center relative h-[300px] md:h-[498px]"
    >
      {/* The container should adapt to the available space */}
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        style={{ border: "1px solid black" }} // Optional border for visualization
      >
        <Layer>
          {backgroundImage && (
            <KonvaImage
              image={backgroundImage}
              width={stageSize.width}
              height={stageSize.height}
            />
          )}
          {rectangles.map((rect) => (
            <Group key={rect.id}>
              <Rect
                id={rect.id}
                {...rect}
                onClick={() => handleRectClick(rect)}
                onDragMove={(e) => handleRectDragMove(e, rect)}
                onDragEnd={() => handleRectDragEnd(rect)}
                onTransform={(e) => handleRectTransform(e, rect)}
              />
              {selectedId === rect.id && rectangles.length > 1 && (
                <KonvaImage
                  ref={deleteIconRef}
                  image={rect.deleteIconImage}
                  {...calculateDeleteIconPosition(rect)}
                  width={20}
                  height={20}
                  onClick={() => handleDelete(rect.id)}
                />
              )}
              {/* Render text if the rectangle has text */}
              {rect.text && (
                <Text
                  text={rect.text}
                  x={rect.x}
                  y={rect.y}
                  fontSize={rect.fontSize}
                  fontFamily={rect.fontFamily} // Apply the font family
                  fill={rect.color}
                  draggable={rect.draggable} // Allow text dragging
                  onDragMove={(e) => handleRectDragMove(e, rect)}
                />
              )}
            </Group>
          ))}
          <Transformer ref={trRef} />
        </Layer>
      </Stage>
    </div>
  );
};

export default EditStageComponent;
