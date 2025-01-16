import prisma from "@/lib/prisma";
import { getRole, getUserId } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Announcements = async () => {
  const role = await getRole();
  const userId = await getUserId();
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId } } },
    studnt: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId } } },
  };
  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof role] || {} },
        ],
      }),
    },
  });
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Announcements</h2>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data[0] && (
          <div className="bg-sky rounded-md p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{data[0].title}</h3>
              <span className="text-xs text-gray-400 bg-white rounded-md py-1 px-1">
                {new Intl.DateTimeFormat("nl-BE").format(data[0].date)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{data[0].description}</p>
          </div>
        )}
        {data[1] && (
          <div className="bg-purpleLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{data[1].title}</h3>
              <span className="text-xs text-gray-400 bg-white rounded-md py-1 px-1">
                {new Intl.DateTimeFormat("nl-BE").format(data[1].date)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{data[1].description}</p>
          </div>
        )}
        {data[2] && (
          <div className="bg-yellowLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{data[2].title}</h3>
              <span className="text-xs text-gray-400 bg-white rounded-md py-1 px-1">
                {new Intl.DateTimeFormat("nl-BE").format(data[2].date)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{data[2].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
