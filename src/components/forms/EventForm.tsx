"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { FormTypes } from "./types";
import { eventSchema, EventSchema } from "@/lib/formValidationSchema";
import { createEvent, updateEvent } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatDate } from "./LessonForm";

const EventForm = ({
  setOpen,
  type,
  data,
  relatedData,
}: FormTypes & { relatedData: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });
  const [state, formAction] = useFormState(
    type === "create" ? createEvent : updateEvent,
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

  const { classes } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h2 className="text-xl font-semibold">
        {type == "create" ? "Create new announcement" : "Update announcement"}
      </h2>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row w-full flex-wrap gap-8">
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
          <InputField
            label="Title"
            name="title"
            defaultValue={data?.title}
            register={register}
            error={errors.title}
          />
          <InputField
            label="Short Description"
            name="description"
            defaultValue={data?.description}
            register={register}
            error={errors.description}
            fullWidth
          />
          <InputField
            label="Start time"
            name="startTime"
            defaultValue={formatDate(data?.startTime) || ""}
            register={register}
            error={errors.startTime}
            type="datetime-local"
          />
          <InputField
            label="End time"
            name="endTime"
            defaultValue={formatDate(data?.endTime) || ""}
            register={register}
            error={errors.endTime}
            type="datetime-local"
          />

          <div className="flex flex-col gap-2 w-1/4">
            <label htmlFor="class" className="text-xs text-gray-500">
              Class
            </label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("classId")}
              defaultValue={data?.classId}
            >
              {classes.map((classItem: { id: number; name: string }) => (
                <option
                  value={classItem.id}
                  key={classItem.id}
                  selected={data && classItem.id === data.classId}
                >
                  {classItem.name}
                </option>
              ))}
            </select>
            {errors?.classId?.message && (
              <p className="text-xs text-red-400">
                {errors.classId.message.toString()}
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

export default EventForm;
