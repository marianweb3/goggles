//@ts-nocheck
import {
  Group,
  Layer,
  Rect,
  Stage,
  Image as KonvaImage,
  Transformer,
  Text,
} from "react-konva";
import { useEffect, useRef, useState } from "react";

interface FinalStageComponent {
  backgroundImage?: HTMLImageElement | null;
  rectangles: any[];
  stageRef: any;
  trRef: any;
}

const FinalStageComponent = ({
  backgroundImage,
  rectangles,
  stageRef,
  trRef,
}: FinalStageComponent) => {
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

  return (
    <div
      ref={containerRef}
      className="flex justify-center relative h-[300px] md:h-[498px]"
    >
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        style={{ border: "1px solid black" }}
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
              <Rect {...rect} />
              {rect.text && (
                <Text
                  text={rect.text}
                  x={rect.x}
                  y={rect.y}
                  fontSize={rect.fontSize}
                  fontFamily={rect.fontFamily}
                  fill={rect.color}
                  draggable={rect.draggable} // Allow text dragging
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

export default FinalStageComponent;
