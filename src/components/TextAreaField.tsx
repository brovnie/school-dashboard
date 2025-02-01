import React from "react";
import { FieldError } from "react-hook-form";

type TextareaFieldType = {
  label: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  rows?: number; // Optional: To control the height of the textarea
  cols?: number; // Optional: To control the width of the textarea
  fullWidth?: boolean; // Optional: For full width, similar to InputField
};

const TextareaField = ({
  label,
  register,
  name,
  defaultValue,
  error,
  hidden,
  rows = 4, // Default row size
  cols = 50, // Default column size
  fullWidth,
}: TextareaFieldType) => {
  return (
    <div
      className={
        hidden
          ? "hidden"
          : `flex flex-col gap-2 ${fullWidth ? "w-full" : "w-1/4"}`
      }
    >
      <label htmlFor={name} className="text-xs text-gray-500">
        {label}
      </label>
      <textarea
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        rows={rows}
        cols={cols}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default TextareaField;
