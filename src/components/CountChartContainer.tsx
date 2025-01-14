import React from "react";
import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({ by: ["sex"], _count: true });
  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="tewt-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      <CountChart boys={boys} girls={girls} />

      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-sky rounded-full"></div>
          <p className="font-bold">{boys}</p>
          <p className="text-sm text-gray-300">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-customYellow rounded-full"></div>
          <p className="font-bold">{girls}</p>
          <p className="text-sm text-gray-300">
            Girls ({Math.round((girls / (boys + girls)) * 100)}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
