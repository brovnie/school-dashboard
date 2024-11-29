"use client";
import Image from "next/image";
import React, { useState } from "react";

type Form = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
};

function FormModal({ table, type, data, id }: Form) {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-customYellow"
      : type === "update"
      ? "bg-sky"
      : "bg-customPurple";
  const [open, setOpen] = useState(false);

  const SingleForm = () => {
    return type == "delete" && id ? (
      <form className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All the data will be lost? Are you sure you want to delete this
          {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : (
      <p>Nope</p>
    );
  };
  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] x2l:w-[40%]">
            <SingleForm />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/close.png"
                alt="Close button"
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FormModal;
