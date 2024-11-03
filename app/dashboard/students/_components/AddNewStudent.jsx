"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { LoaderIcon, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import GlobalApi from '@/app/_services/GlobalApi';
import { index } from 'drizzle-orm/pg-core';
import { toast } from 'sonner';

function AddNewStudent({ refreshData }) {
    const [open, setOpen] = useState(false);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        GetAllGradesList();
    }, [])

    const GetAllGradesList = () => {
        GlobalApi.GetAllGrades().then(resp => {
            setGrades(resp.data);
        })
    }

    const onSubmit = (data) => {
        setLoading(true)
        GlobalApi.CreateNewStudent(data).then(resp => {
            console.log("--", resp);
            if (resp.data) {
                reset();
                refreshData();
                setOpen(false);
                toast('New Student Added 😊')
            }
            setLoading(false)
        })
    }
    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                            Fill in the student's information below
                        </DialogDescription>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <Input placeholder='Ex. Fortune Ademola'
                                    {...register('name', { required: true })}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className="block text-sm font-medium mb-2">Select Grade</label>
                                <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register('grade', { required: true })}
                                >
                                    {grades.map((item, index) => (
                                        <option key={index} value={item.grade}>{item.grade}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-2">Contact Number</label>
                                <Input type='number' placeholder='Ex. 12345678920'
                                    {...register('contact')}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-2">Address</label>
                                <Input placeholder='Ex. Old Trafford Stadium, M16 0RA'
                                    {...register('address')}
                                />
                            </div>
                            <div className='flex gap-3 items-center justify-end mt-5'>
                                <Button type="button"
                                    onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? <LoaderIcon className='animate-spin' /> :
                                        'Save'}</Button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewStudent