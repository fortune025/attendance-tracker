import { getUniqueRecord } from '@/app/_services/services';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({ attendanceList, selectedMonth }) {
    const [totalStudent, setTotalStudent] = useState(0);
    const [overallAttendancePercentage, setPresentPerc] = useState(0);

    useEffect(() => {
        if (attendanceList) {
            const totalSt = getUniqueRecord(attendanceList);
            setTotalStudent(totalSt.length);

            const numberOfDays = moment(selectedMonth).daysInMonth();
            const totalPossibleAttendances = totalSt.length * numberOfDays;
            const actualAttendances = attendanceList.filter(record => record.present).length;

            const overallAttendancePercentage = (actualAttendances / totalPossibleAttendances) * 100;
            setPresentPerc(overallAttendancePercentage);
        }
    }, [attendanceList, selectedMonth]);

    return (
        <div className='grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
            <Card icon={<GraduationCap />} title='Total Student' value={totalStudent} />
            <Card icon={<TrendingUp />} title='Attedance Percentage' value={overallAttendancePercentage.toFixed(1) + " %"} />
            <Card icon={<TrendingDown />} title='Absent Percentage' value={(100 - overallAttendancePercentage).toFixed(1) + " %"} />

        </div>
    );
}

export default StatusList;


// <h2>Status List</h2>
// <p>Total Students: {totalStudent}</p>
// <p>Attendance Percentage: {presentPerc.toFixed(2)}%</p>