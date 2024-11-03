import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/services';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50, 100];

function AttendanceGrid({ attendanceList, selectedMonth }) {

    const [rowData, setRowData] = useState([])
    const [colDefs, setColDefs] = useState([])

    const numberOfDays = moment(selectedMonth).daysInMonth()
    const daysArray = useMemo(() => Array.from({ length: numberOfDays }, (_, i) => i + 1), [numberOfDays])

    const isPresent = useCallback((studentId, day) => {
        const result = attendanceList.find(item => item.day == day && item.studentId == studentId)
        return result ? true : false
    }, [attendanceList])

    useEffect(() => {
        if (attendanceList) {
            const userList = getUniqueRecord(attendanceList);
            const newColDefs = [
                { field: 'studentId', filter: true },
                { field: 'name', filter: true },
            ];

            daysArray.forEach((date) => {
                newColDefs.push({
                    field: date.toString(),
                    width: 50,
                    editable: true
                });
            });

            setColDefs(newColDefs);

            userList.forEach(obj => {
                daysArray.forEach((date) => {
                    obj[date] = isPresent(obj.studentId, date)
                })
            });

            setRowData(userList);
        }
    }, [attendanceList])


    const onMarkAttendance = (day, studentId, presentStatus) => {

        const date = moment(selectedMonth).format('MM/yyyy')
        if (presentStatus) {
            const data = {
                day: day,
                studentId: studentId,
                present: presentStatus,
                date: date
            }

            GlobalApi.MarkAttendance(data).then(resp => {
                console.log(resp);
                toast("Student Id:" + studentId + " marked Present ")
            })
        }
        else {
            GlobalApi.MarkAbsent(studentId, day, date)
                .then(resp => {
                    toast("Student Id:" + studentId + " marked Absent ")
                })
        }
    }

    return (
        <div>
            <div
                className="ag-theme-quartz"
                style={{ height: 500 }}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    )
}

export default AttendanceGrid