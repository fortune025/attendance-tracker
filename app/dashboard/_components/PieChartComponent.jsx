// PieChartComponent.jsx
import { getUniqueRecord } from '@/app/_services/services';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

function PieChartComponent({ attendanceList, selectedMonth }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (attendanceList && selectedMonth) {
            try {
                const totalSt = getUniqueRecord(attendanceList);
                const numberOfDays = moment(selectedMonth).daysInMonth();
                const totalPossibleAttendances = totalSt.length * numberOfDays;
                const actualAttendances = attendanceList.filter((record) => record.present).length;

                const overallAttendancePercentage = (actualAttendances / totalPossibleAttendances) * 100;
                setData([
                    {
                        name: 'Total Present',
                        value: Number(overallAttendancePercentage.toFixed(1)),
                        fill: '#4c8cf8'
                    },
                    {
                        name: 'Total Absent',
                        value: (100 - Number(overallAttendancePercentage.toFixed(1))),
                        fill: '#1fe6d1'
                    },
                ]);
            } catch (error) {
                setError(error.message);
            }
        }
    }, [attendanceList, selectedMonth]);

    return (
        <div className="border p-5 rounded-lg">
            <h2 className="font-bold text-lg text-left mb-5">Monthly Attendance</h2>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div className="flex justify-center items-center">
                    <ResponsiveContainer width={'100%'} height={300}>
                        <PieChart width={330} height={250}>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}

                                label
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

export default PieChartComponent;