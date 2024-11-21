"use client"
import Image from 'next/image';
import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Girls',
      count: 47,
      fill: '#FAE27C',
    },
    {
      name: 'Boys',
      count: 53,
      fill: '#C3EBFA',
    },
    {
        name: 'total',
        count: 100,
        fill: 'white',
      },
  ];
  
  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

function CountChart() {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
        <div className="flex justify-between items-center">
            <h1 className="tewt-lg font-semibold">Students</h1>
            <Image src="/moreDark.png" alt="" width={20} height={20} />
        </div>
        <div className="relative w-full h-[75%]">
            <ResponsiveContainer>
                <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                    <RadialBar
                        background
                        dataKey="count"
                    />
                </RadialBarChart>
        </ResponsiveContainer>
        <Image 
          src="/maleFemale.png" 
          alt="" 
          width={50} 
          height={50} 
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
        </div>
        <div className="flex justify-center gap-16">
            <div className="flex flex-col gap-1">
                <div className="w-5 h-5 bg-sky rounded-full"></div>  
                <p className='font-bold'>1,234</p>
                <p className="text-sm text-gray-300">Boys (55%)</p> 
            </div>
            <div className="flex flex-col gap-1">
                <div className="w-5 h-5 bg-customYellow rounded-full"></div>  
                <p className='font-bold'>1,234</p>
                <p className="text-sm text-gray-300">Girls (45%)</p> 
            </div>
        </div>
    </div>
  )
}

export default CountChart