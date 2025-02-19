import Announcements from "@/components/Announcements";
import { BigCalendarContainer } from "@/components/BigCalendarContainer";
import FormContainter from "@/components/FormContainter";
import PerformanceChart from "@/components/PerformanceChart";
import prisma from "@/lib/prisma";
import { getRole, getUserId } from "@/lib/utils";
import { Teacher } from "@prisma/client";
import { parsePhoneNumber } from "awesome-phonenumber";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function SingleTeacherPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const role = await getRole();
  const userId = await getUserId();
  const teacher:
    | (Teacher & {
        _count: { subjects: number; classes: number; lessons: number };
      })
    | null = await prisma.teacher.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          subjects: true,
          classes: true,
          lessons: true,
        },
      },
    },
  });

  if (!teacher) {
    return notFound();
  }
  let phone = "-";
  if (teacher.phone) {
    const parsedPhone = parsePhoneNumber(teacher.phone, { regionCode: "BE" });
    phone = parsedPhone.number?.e164 ?? "-";
  }

  return (
    <div className="p-4 flex flex-col xl:flex-row gap-4 flex-1 ">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-sky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={teacher.img || "/noAvatar.png"}
                alt="Teacher picture"
                width={144}
                height={144}
                className="rounded-full  aspect-square object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex gap-1">
                <h1 className="text-xl font-semibold">
                  {teacher.name + " " + teacher.surname}
                </h1>
                {role === "admin" && (
                  <FormContainter
                    table="teacher"
                    type="update"
                    data={teacher}
                  />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetu adipisicing elit. Eaque,
                illo.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/blood.png"
                    alt="Blood type"
                    width={14}
                    height={14}
                  />
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>
                    {new Intl.DateTimeFormat("nl-BE").format(teacher.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/mail.png"
                    alt="Email address"
                    width={14}
                    height={14}
                  />
                  <span>{teacher.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/phone.png"
                    alt="Phone number"
                    width={14}
                    height={14}
                  />
                  <span>{phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <div className="w-full bg-white p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <p className="text-xl font-semibold">90%</p>
                <h2 className="text-sm text-gray-500">Attendance</h2>
              </div>
            </div>
            <div className="w-full bg-white p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <p className="text-xl font-semibold">
                  {teacher._count.subjects}
                </p>
                <h2 className="text-sm text-gray-500">Branches</h2>
              </div>
            </div>
            <div className="w-full bg-white p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <p className="text-xl font-semibold">
                  {teacher._count.lessons}
                </p>
                <h2 className="text-sm text-gray-500">Lessons</h2>
              </div>
            </div>
            <div className="w-full bg-white p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <p className="text-xl font-semibold">
                  {teacher._count.classes}
                </p>
                <h2 className="text-sm text-gray-500">Classes</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-5 my-4 bg-white rounded-md ">
          <h2>Teacher&apos;s schedule</h2>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>
      {/*Right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-xl font-semibold">Shortcuts</h2>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              href={`/list/classes?supervisorId=${"teacher2"}`}
              className="p-3 rounded-md bg-skyLight"
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              href={`/list/students?teacherId=${"teacher2"}`}
              className="p-3 rounded-md bg-purpleLight"
            >
              Teacher&apos;s Students
            </Link>
            <Link
              href={`/list/lessons?teacherId=${"teacher2"}`}
              className="p-3 rounded-md bg-yellowLight"
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-skyLight"
              href={`/list/assignments?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
}

export default SingleTeacherPage;
