import { getUniqueRecord } from '@/app/_services/services'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartComponent({ attendanceList, totalPresentData }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        formatAttendanceListCount();
    }, [attendanceList || totalPresentData])

    const formatAttendanceListCount = () => {
        const totalStudent = getUniqueRecord(attendanceList);

        const result = totalPresentData.map((item => ({
            day: item.day,
            presentCount: item.presentCount,
            absentCount: Number(totalStudent?.length) - Number(item.presentCount)
        })));
        console.log(result);
        setData(result)
    }

    // Generate ticks in increments of 2
    const generateTicks = (data) => {
        if (!data || data.length === 0) return [0, 2, 4, 6, 8, 10];

        const maxValue = Math.max(
            ...data.map(item => Math.max(item.presentCount, item.absentCount))
        );
        const ticks = [];
        for (let i = 0; i <= Math.ceil(maxValue / 2) * 2; i += 2) {
            ticks.push(i);
        }
        return ticks;
    }

    return (
        <div className='p-5 border rounded-lg shadow-sm'>
            <h2 className='my-2 font-bold text-lg'>Attendance</h2>
            <ResponsiveContainer width={'100%'} height={300}>
                <BarChart width={630} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis ticks={generateTicks(data)} />
                    <Tooltip />
                    <Legend />
                    <Bar key="present" dataKey="presentCount" name="Total Present" fill="#4c8cf8" />
                    <Bar key="absent" dataKey="absentCount" name="Total Absent" fill="#1fe6d1" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartComponent