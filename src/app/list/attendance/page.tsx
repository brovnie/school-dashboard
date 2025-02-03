import FormContainter from "@/components/FormContainter";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getRole, getUserId } from "@/lib/utils";
import { Attendance, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import React from "react";

type AttendanceList = Attendance & { student: Student };

const fetchColumns = async () => {
  const role = await getRole();
  return [
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Present",
      accessor: "present",
    },
    {
      header: "Lesson",
      accessor: "lesson",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "actions",
          },
        ]
      : []),
  ];
};

const renderRow = async (item: AttendanceList) => {
  const role = await getRole();
  const student = await prisma.student.findFirst({
    where: { id: item.studentId },
    select: { name: true, surname: true },
  });
  const lesson = await prisma.lesson.findFirst({
    where: { id: item.lessonId },
    select: { name: true },
  });

  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        {student?.name + " " + student?.surname}
      </td>
      <td className="md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.date)}
      </td>
      <td>{item.present ? "Present" : "Absent"}</td>
      <td>{lesson?.name || ""}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainter table="attendance" type="update" data={item} />
              <FormContainter table="attendance" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
async function AnnouncementListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.AttendanceWhereInput = {};

  const role = await getRole();
  const columns = await fetchColumns();

  const isValidDate = (dateString: string): boolean => {
    const parsedDate = new Date(dateString);
    return !isNaN(parsedDate.getTime());
  };

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.OR = [
              {
                student: {
                  name: { contains: value.trim(), mode: "insensitive" },
                  surname: { contains: value.trim(), mode: "insensitive" },
                },
              },
              {
                date: isValidDate(value)
                  ? { equals: new Date(value) }
                  : { equals: undefined }, // if it's not a valid date, don't use it
              },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  const currentUserId = await getUserId();

  const [data, count] = await prisma.$transaction([
    prisma.attendance.findMany({
      where: query,
      include: {
        student: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.attendance.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Attendance
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-customYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-customYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormContainter table="attendance" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
}

export default AnnouncementListPage;
