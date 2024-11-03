"use client"
import React, { useState, useEffect } from 'react'
import GlobalApi from '../_services/GlobalApi';

function GradeSelect({ selectedGrade }) {

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        GetAllGradesList();
    }, [])

    const GetAllGradesList = () => {
        GlobalApi.GetAllGrades().then(resp => {
            setGrades(resp.data);
        })
    }
    return (
        <div><select className="w-50 p-2 h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onChange={(e) => selectedGrade(e.target.value)}
        >
            {grades.map((item, index) => (
                <option key={index} value={item.grade}>{item.grade}</option>
            ))}
        </select></div>
    )
}

export default GradeSelect