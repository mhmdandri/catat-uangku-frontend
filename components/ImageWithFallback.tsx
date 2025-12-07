"use client";
import Image from "next/image";
import React, { useState } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const [didError, setDidError] = useState(false);

  const { alt = "", width, height, ...restProps } = props;
  const resolvedWidth = Number.isFinite(Number(width))
    ? Number(width)
    : DEFAULT_WIDTH;
  const resolvedHeight = Number.isFinite(Number(height))
    ? Number(height)
    : DEFAULT_HEIGHT;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 dark:bg-zinc-900 text-center align-middle ${
        props.className ?? ""
      }`}
      style={props.style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <Image
          src={ERROR_IMG_SRC}
          alt="Error loading image"
          width={resolvedWidth}
          height={resolvedHeight}
          data-original-url={props.src}
        />
      </div>
    </div>
  ) : (
    <Image
      {...restProps}
      alt={alt}
      width={resolvedWidth}
      height={resolvedHeight}
      src={props.src as string}
      onError={() => setDidError(true)}
    />
  );
}
