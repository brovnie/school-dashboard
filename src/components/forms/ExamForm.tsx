"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { FormTypes } from "./types";
import { examSchema, ExamSchema } from "@/lib/formValidationSchema";
import { createExam, updateExam } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ExamForm = ({
  setOpen,
  type,
  data,
  relatedData,
}: FormTypes & { relatedData: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamSchema>({ resolver: zodResolver(examSchema) });
  const [state, formAction] = useFormState(
    type === "create" ? createExam : updateExam,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Exam has been ${type === "create" ? "created" : "updated"}`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);
  const { lessons } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h2 className="text-xl font-semibold">
        {type == "create" ? "Create new exam" : "Update exam"}
      </h2>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-between">
          <InputField
            label="Exam title"
            name="title"
            defaultValue={data?.title}
            register={register}
            error={errors.title}
          />
          <InputField
            label="Start date"
            name="startTime"
            defaultValue={data?.startTime}
            register={register}
            error={errors.startTime}
            type="datetime-local"
          />
          <InputField
            label="End date"
            name="endTime"
            defaultValue={data?.endTime}
            register={register}
            error={errors.endTime}
            type="datetime-local"
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
            <label htmlFor="teacher" className="text-xs text-gray-500">
              Lesson
            </label>
            <select
              multiple
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("lessonId")}
              defaultValue={data?.lessons}
            >
              {lessons.map((lesson: { id: number; name: string }) => (
                <option value={lesson.id} key={lesson.id}>
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

export default ExamForm;
