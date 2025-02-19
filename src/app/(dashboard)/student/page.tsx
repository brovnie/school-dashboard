import Announcements from "@/components/Announcements";
import { BigCalendarContainer } from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import React from "react";

const StudentPage = async () => {
  const userId = await getUserId();
  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h2 className="text-xl font-semibold">Schedule (4A)</h2>
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
