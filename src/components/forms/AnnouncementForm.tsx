"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { FormTypes } from "./types";
import {
  announcementSchema,
  AnnouncementSchema,
} from "@/lib/formValidationSchema";
import {
  createAnnouncement,
  createClass,
  updateAnnouncement,
  updateClass,
} from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AnnouncementForm = ({
  setOpen,
  type,
  data,
  relatedData,
}: FormTypes & { relatedData: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnnouncementSchema>({
    resolver: zodResolver(announcementSchema),
  });
  const [state, formAction] = useFormState(
    type === "create" ? createAnnouncement : updateAnnouncement,
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
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-between">
          <InputField
            label="Title"
            name="title"
            defaultValue={data?.title}
            register={register}
            error={errors.title}
          />
          <div className={"flex flex-col gap-2 w-1/4"}>
            <label htmlFor="description" className="text-xs text-gray-500">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={data?.description}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            ></textarea>
            {errors.description && (
              <p className="text-xs text-red-400">
                {errors.description.toString()}
              </p>
            )}
          </div>
          <InputField
            label="Date"
            name="date"
            defaultValue={data?.date.toISOString().split("T")[0]}
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

export default AnnouncementForm;
