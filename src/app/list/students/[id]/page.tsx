import { BigCalendarContainer } from "@/components/BigCalendarContainer";
import prisma from "@/lib/prisma";
import { getRole, getUserId } from "@/lib/utils";
import { Class, Student } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { parsePhoneNumber } from "awesome-phonenumber";
import Link from "next/link";
import PerformanceChart from "@/components/PerformanceChart";
import Announcements from "@/components/Announcements";
import StudentAttendanceChart from "@/components/StudentAttendanceChart";
import { Suspense } from "react";
import FormContainter from "@/components/FormContainter";

async function SingleStudentPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const role = await getRole();
  const userId = await getUserId();
  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
      })
    | null = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
    },
  });

  if (!student) {
    return notFound();
  }
  let phone = "-";
  if (student.phone) {
    const parsedPhone = parsePhoneNumber(student.phone, { regionCode: "BE" });
    phone = parsedPhone.number?.e164 ?? "-";
  }

  return (
    <div className="p-4 flex flex-col xl:flex-row gap-4 flex-1">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-sky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={student.img || "/noAvatar.png"}
                alt="Students picture"
                width={144}
                height={144}
                className="rounded-full  aspect-square object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex gap-1">
                <h1 className="text-xl font-semibold">
                  {student.name + " " + student.surname}
                </h1>
                {role === "admin" && (
                  <FormContainter
                    table="student"
                    type="update"
                    data={student}
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
                  <span>{student.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>
                    {new Intl.DateTimeFormat("nl-BE").format(student.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/mail.png"
                    alt="Email address"
                    width={14}
                    height={14}
                  />
                  <span>{student.email || "-"}</span>
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
              <Suspense fallback="loading...">
                <StudentAttendanceChart id={student.id} />
              </Suspense>
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
                  {student.class.name.charAt(0)}th
                </p>
                <h2 className="text-sm text-gray-500">Grade</h2>
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
                  {student.class._count.lessons}
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
                <p className="text-xl font-semibold">{student.class.name}</p>
                <h2 className="text-sm text-gray-500">Class</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 bg-white rounded-md h-[800px]">
          <h2>Student&apos;s schedule</h2>
          <BigCalendarContainer type="classId" id={student.class.id} />
        </div>
      </div>
      {/*Right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-xl font-semibold">Shortcuts</h2>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              href={`/list/lessons?classId=${2}`}
              className="p-3 rounded-md bg-skyLight"
            >
              Student&apos;s Lessons
            </Link>
            <Link
              href={`/list/teachers?classId=${2}`}
              className="p-3 rounded-md bg-purpleLight"
            >
              Student&apos;s Teachers
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?classId=${2}`}
            >
              Student&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-skyLight"
              href={`/list/assignments?classId=${2}`}
            >
              Student&apos;s Assignments
            </Link>
            <Link
              className="p-3 rounded-md bg-yellowLight"
              href={`/list/results?studentId=${"student2"}`}
            >
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
}

export default SingleStudentPage;
