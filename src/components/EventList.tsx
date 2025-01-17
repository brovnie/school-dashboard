import prisma from "@/lib/prisma";
import React from "react";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });
  console.log("data is", data);
  if (data.length === 0) {
    return (
      <p className="text-sm text-gray-400 ">No events found for this date.</p>
    );
  }
  return data.map((event) => (
    <div
      className="p-5 rounded-md border-gray-100 border-2 border-t-4 odd:border-t-sky even:border-t-customPurple"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-600">{event.title}</h3>
        <span className="text-gray-300 text-xs">
          {event.startTime.toLocaleTimeString("nl-BE", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
    </div>
  ));
};

export default EventList;
