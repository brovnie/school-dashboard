import React from "react";
import { FieldError } from "react-hook-form";

type InputFieldType = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  fullWidth?: boolean;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
  fullWidth,
}: InputFieldType) => {
  return (
    <div
      className={
        hidden
          ? "hidden"
          : `flex flex-col gap-2 ${fullWidth ? "w-4/6" : "w-1/4"}`
      }
    >
      <label htmlFor={name} className="text-xs text-gray-500">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
