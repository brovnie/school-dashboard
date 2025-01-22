import prisma from "@/lib/prisma";
import React from "react";

const StudentAttendanceChart = async ({ id }: { id: string }) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: id,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1),
      },
    },
  });

  const totalDays = attendance.length;
  const presentDays = attendance.filter((day) => day.present).length;
  const percentage = (presentDays / totalDays) * 100;
  return (
    <div>
      <p className="text-xl font-semibold">{percentage}%</p>
      <h2 className="text-sm text-gray-500">Attendance</h2>
    </div>
  );
};

export default StudentAttendanceChart;
