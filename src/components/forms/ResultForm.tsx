"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { FormTypes } from "./types";
import { resultSchema, ResultSchema } from "@/lib/formValidationSchema";
import { createResult, updateResult } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ResultForm = ({
  setOpen,
  type,
  data,
  relatedData,
}: FormTypes & { relatedData: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResultSchema>({ resolver: zodResolver(resultSchema) });
  const [state, formAction] = useFormState(
    type === "create" ? createResult : updateResult,
    {
      success: false,
      error: false,
    }
  );
  const [taskType, setTaskType] = useState("exam");
  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Result has been ${type === "create" ? "created" : "updated"}`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const { exams, assignments, students } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h2 className="text-xl font-semibold">
        {type == "create" ? "Create new result" : "Update result"}
      </h2>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-between">
          <InputField
            label="Score"
            name="score"
            defaultValue={data?.score}
            register={register}
            error={errors.score}
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
            <label htmlFor="exam" className="text-xs text-gray-500">
              Type
            </label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              onChange={(e) => setTaskType(e.target.value)}
            >
              <option value="exam">Exam</option>
              <option value="assignment">Assignment</option>
            </select>
          </div>
          {taskType === "exam" && (
            <div className="flex flex-col gap-2 w-1/4">
              <label htmlFor="exam" className="text-xs text-gray-500">
                Exam
              </label>
              <select
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                {...register("examId")}
                defaultValue={data?.examId || null}
              >
                <option value="">-</option>
                {exams.map((exam: { id: string; title: string }) => (
                  <option
                    value={exam.id}
                    key={exam.id}
                    selected={data && exam.title === data.title}
                  >
                    {exam.title}
                  </option>
                ))}
              </select>
              {errors?.examId?.message && (
                <p className="text-xs text-red-400">
                  {errors.examId.message.toString()}
                </p>
              )}
            </div>
          )}
          {taskType === "assignment" && (
            <div className="flex flex-col gap-2 w-1/4">
              <label htmlFor="assignment" className="text-xs text-gray-500">
                Assignment
              </label>
              <select
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                {...register("assignmentId")}
                defaultValue={data?.assignmentId || ""}
              >
                <option value="">-</option>
                {assignments.map(
                  (assignment: { id: string; title: string }) => (
                    <option
                      value={assignment.id}
                      key={assignment.id}
                      selected={data && assignment.title === data.title}
                    >
                      {assignment.title}
                    </option>
                  )
                )}
              </select>
              {errors?.assignmentId?.message && (
                <p className="text-xs text-red-400">
                  {errors.assignmentId.message.toString()}
                </p>
              )}
            </div>
          )}
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
                    selected={data && student.name === data.studentName}
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

export default ResultForm;
