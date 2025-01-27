"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { FormTypes } from "./types";
import { classSchema, ClassSchema } from "@/lib/formValidationSchema";
import { createClass, updateClass } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClassForm = ({
  setOpen,
  type,
  data,
  relatedData,
}: FormTypes & { relatedData: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({ resolver: zodResolver(classSchema) });
  const [state, formAction] = useFormState(
    type === "create" ? createClass : updateClass,
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
      toast(`Subject has been ${type === "create" ? "created" : "updated"}`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const { teachers, grades } = relatedData;
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h2 className="text-xl font-semibold">
        {type == "create" ? "Create new class" : "Update class"}
      </h2>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-between">
          <InputField
            label="Class name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors.name}
          />
          <InputField
            label="Capacity"
            name="capacity"
            defaultValue={data?.capacity}
            register={register}
            error={errors?.capacity}
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
              Sepervisor
            </label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("supervisorId")}
              defaultValue={data?.supervisorId}
            >
              {teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option
                    value={teacher.id}
                    key={teacher.id}
                    selected={data && teacher.id === data.supervisorId}
                  >
                    {teacher.name + " " + teacher.surname}
                  </option>
                )
              )}
            </select>
            {errors?.supervisorId?.message && (
              <p className="text-xs text-red-400">
                {errors.supervisorId.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-1/4">
            <label htmlFor="teacher" className="text-xs text-gray-500">
              Grade
            </label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("gradeId")}
              defaultValue={data?.greadId}
            >
              {grades.map((grade: { id: string; level: number }) => (
                <option
                  value={grade.id}
                  key={grade.id}
                  selected={data && grade.id === data.gradeId}
                >
                  {grade.level}
                </option>
              ))}
            </select>
            {errors?.gradeId?.message && (
              <p className="text-xs text-red-400">
                {errors.gradeId.message.toString()}
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

export default ClassForm;
