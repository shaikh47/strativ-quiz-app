import * as React from "react";
import { useState, useRef } from "react";
import clsx from "clsx";

export type TextInputProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string;
    placeholder?: string;
    hoverEffect?: boolean;
    value?: string;
    dynamicHeight?: boolean;
  };

export const TextInput = ({
  className = "",
  placeholder = "",
  hoverEffect = true,
  value = "",
  dynamicHeight = false,
  ...props
}: TextInputProps) => {
  return (
    <textarea
      className={clsx(
        className,
        "w-full resize-none px-2 py-1 text-black h-full bg-white/20",
        "rounded-sm outline-1 focus:outline-none focus:outline-gray-400",
        hoverEffect && "hover:outline-gray-400 hover:outline-none"
      )}
      id="review-text"
      placeholder={placeholder}
      value={value}
      {...props}
    />
  );
};
