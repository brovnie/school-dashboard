"use client";
import Image from "next/image";
import React, { Dispatch, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useFormState } from "react-dom";
import {
  deleteAssignment,
  deleteClass,
  deleteExam,
  deleteLesson,
  deleteResult,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormContainerTabs } from "./types";

const deleteActionMap = {
  teacher: deleteTeacher,
  student: deleteStudent,
  subject: deleteSubject,
  class: deleteClass,
  exam: deleteExam,
  lesson: deleteLesson,
  assignment: deleteAssignment,
  result: deleteResult,
  parent: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};

const Loading = <p>Loading</p>;

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => Loading,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => Loading,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => Loading,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => Loading,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => Loading,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => Loading,
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: () => Loading,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => Loading,
});
const forms: {
  [key: string]: (
    setOpen: Dispatch<React.SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      setOpen={setOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      setOpen={setOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      setOpen={setOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      setOpen={setOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  exam: (setOpen, type, data, relatedData) => (
    <ExamForm
      setOpen={setOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  lesson: (setOpen, type, data, relatedData) => (
    <LessonForm
      setOpen={setOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  assignment: (setOpen, type, data, relatedData) => (
    <AssignmentForm
      setOpen={setOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  result: (setOpen, type, data, relatedData) => (
    <ResultForm
      setOpen={setOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
};

function FormModal({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerTabs & { relatedData: any }) {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-customYellow"
      : type === "update"
      ? "bg-sky"
      : "bg-customPurple";
  const [open, setOpen] = useState(false);

  const SingleForm = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });
    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`${table} has been deleted`);
        setOpen(false);
        router.refresh();
      }
    }, [state]);

    return type == "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium">
          All the data will be lost? Are you sure you want to delete this
          {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not found"
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
