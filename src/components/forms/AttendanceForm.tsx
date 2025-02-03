"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { FormTypes } from "./types";
import { attendanceSchema, AttendanceSchema } from "@/lib/formValidationSchema";
import { createAttendance, updateAttendance } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ReactSwitch from "react-switch";

const AttendanceForm = ({
  setOpen,
  type,
  data,
  relatedData,
}: FormTypes & { relatedData: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AttendanceSchema>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      present: data?.present ?? true,
    },
  });
  const [state, formAction] = useFormState(
    type === "create" ? createAttendance : updateAttendance,
    {
      success: false,
      error: false,
    }
  );
  const [isPresent, setIsPresent] = useState<boolean>(data?.present ?? true);

  const handleSwitch = (checked: boolean) => {
    setIsPresent(checked);
    setValue("present", checked);
  };
  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });
  const router = useRouter();
  const formatDateToHMD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  };

  useEffect(() => {
    if (state.success) {
      toast(`Attendance has been ${type === "create" ? "created" : "updated"}`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const { students, lessons } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h2 className="text-xl font-semibold">
        {type == "create" ? "Create new attendance" : "Update attendance"}
      </h2>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-between items-center">
          <div className="flex flex-col gap-2 w-1/4">
            <label htmlFor="student" className="text-xs text-gray-500">
              Student
            </label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("studentId")}
              defaultValue={data?.studentId}
            >
              {students.map(
                (student: { id: string; name: string; surname: string }) => (
                  <option
                    value={student.id}
                    key={student.id}
                    selected={data && student.id === data.studentId}
                  >
                    {student.name + " " + student.surname}
                  </option>
                )
              )}
            </select>
            {errors?.studentId?.message && (
              <p className="text-xs text-red-400">
                {errors.studentId.message.toString()}
              </p>
            )}
          </div>
          <div className="flex gap-2 flex-col">
            <label htmlFor="present" className="text-xs text-gray-500">
              Present
            </label>
            <ReactSwitch onChange={handleSwitch} checked={isPresent} />
          </div>
          <InputField
            label="Date"
            name="date"
            defaultValue={formatDateToHMD(data.date)}
            register={register}
            error={errors.date}
            type="date"
          />
          {data && (
            <InputField
              label="Id"
              name="id"
              defaultValue={data?.id}
              register={register}
              error={errors.id}
              hidden
            />
          )}

          <div className="flex flex-col gap-2 w-1/4">
            <label htmlFor="lesson" className="text-xs text-gray-500">
              Lesson
            </label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("lessonId")}
              defaultValue={data?.lessonId}
            >
              {lessons.map((lesson: { id: number; name: string }) => (
                <option
                  value={lesson.id}
                  key={lesson.id}
                  selected={data && lesson.id === data.lessonId}
                >
                  {lesson.name}
                </option>
              ))}
            </select>
            {errors?.lessonId?.message && (
              <p className="text-xs text-red-400">
                {errors.lessonId.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AttendanceForm;
