import { useState, useRef, useEffect } from "react";

interface ScrollbarRefs {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  scrollbarTrackRef: React.RefObject<HTMLDivElement>;
  scrollbarThumbRef: React.RefObject<HTMLDivElement>;
}

const useScrollbar = () => {
  const [isDraggingScrollbar, setIsDraggingScrollbar] =
    useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement | null>(null);
  const scrollbarThumbRef = useRef<HTMLDivElement | null>(null);

  const updateScrollPosition = (clientX: number): void => {
    if (
      scrollbarTrackRef.current &&
      scrollContainerRef.current &&
      scrollbarThumbRef.current
    ) {
      const { left, width } = scrollbarTrackRef.current.getBoundingClientRect();
      const thumbWidth = scrollbarThumbRef.current.offsetWidth;
      const scrollPercentage =
        (clientX - left - thumbWidth / 2) / (width - thumbWidth);
      const scrollPosition =
        scrollPercentage *
        (scrollContainerRef.current.scrollWidth -
          scrollContainerRef.current.clientWidth);
      scrollContainerRef.current.scrollLeft = scrollPosition;
    }
  };

  const handleScrollbarMouseDown = (
    e: React.MouseEvent<HTMLDivElement>
  ): void => {
    setIsDraggingScrollbar(true);
    updateScrollPosition(e.clientX);
  };

  const handleScrollbarMouseMove = (e: MouseEvent): void => {
    if (isDraggingScrollbar) {
      updateScrollPosition(e.clientX);
    }
  };

  const handleScrollbarMouseUp = (): void => {
    setIsDraggingScrollbar(false);
  };

  const updateScrollbarPosition = (): void => {
    if (
      scrollContainerRef.current &&
      scrollbarThumbRef.current &&
      scrollbarTrackRef.current
    ) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const trackWidth = scrollbarTrackRef.current.clientWidth;
      const thumbWidth = (clientWidth / scrollWidth) * trackWidth;
      const thumbPosition =
        (scrollLeft / (scrollWidth - clientWidth)) * (trackWidth - thumbWidth);
      scrollbarThumbRef.current.style.width = `${thumbWidth}px`;
      scrollbarThumbRef.current.style.transform = `translateX(${thumbPosition}px)`;
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollbarPosition);
      updateScrollbarPosition();
    }
    document.addEventListener("mousemove", handleScrollbarMouseMove);
    document.addEventListener("mouseup", handleScrollbarMouseUp);
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollbarPosition);
      }
      document.removeEventListener("mousemove", handleScrollbarMouseMove);
      document.removeEventListener("mouseup", handleScrollbarMouseUp);
    };
  }, [isDraggingScrollbar]);

  return {
    scrollContainerRef,
    scrollbarTrackRef,
    scrollbarThumbRef,
    handleScrollbarMouseDown,
    updateScrollbarPosition,
  };
};

export default useScrollbar;
