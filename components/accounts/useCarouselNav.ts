"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Dir = "left" | "right";

export function useCarouselNav(itemCount: number) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);

  const [slidesToShow, setSlidesToShow] = useState(3);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const useCarousel = useMemo(
    () => itemCount > slidesToShow,
    [itemCount, slidesToShow]
  );

  const updateNavState = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft < maxScrollLeft - 2);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);

      requestAnimationFrame(updateNavState);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateNavState]);

  useEffect(() => {
    if (!useCarousel) return;
    const el = viewportRef.current;
    if (!el) return;

    el.scrollTo({ left: 0 });
    requestAnimationFrame(updateNavState);
  }, [itemCount, slidesToShow, useCarousel, updateNavState]);

  const scrollByCard = useCallback(
    (dir: Dir) => {
      const el = viewportRef.current;
      const cardWidth =
        firstCardRef.current?.getBoundingClientRect().width ||
        (el ? el.clientWidth / slidesToShow : 0);

      if (!el || !cardWidth) return;

      const nextLeft =
        dir === "left" ? el.scrollLeft - cardWidth : el.scrollLeft + cardWidth;

      el.scrollTo({ left: nextLeft, behavior: "smooth" });
      requestAnimationFrame(updateNavState);
    },
    [slidesToShow, updateNavState]
  );

  return {
    viewportRef,
    firstCardRef,
    slidesToShow,
    useCarousel,
    canPrev,
    canNext,
    updateNavState,
    scrollByCard,
  };
}
