'use client'

import { Button, TextField, Typography } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CachedIcon from '@mui/icons-material/Cached';



export default function Register() {

    const [isloading, setIsLoading] = useState(false)
    let router = useRouter();

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            dateOfBirth: '',
            gender: '',
        },
        onSubmit: register

    })

    function register(formValues: object[]) {
        setIsLoading(true)
        console.log(formValues);

        axios.post(`https://linked-posts.routemisr.com/users/signup`, formValues)
            .then((responce) => {
                console.log(responce);
                setIsLoading(false);
                if (responce?.data.message === 'success') {
                    router.push('/login')
                }

            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            })
    }

 

    return (
        
        <form onSubmit={formik.handleSubmit} className='flex shadow-md p-5 gap-5 w-full flex-col justify-center items-center lg:w-2/3 mx-auto mt-52 my-20'>
            <h1 className='text-5xl font-bold my-5 text-slate-800'>Register here</h1>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <TextField name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} label='Enter Your Name' fullWidth />
            </div>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <TextField name='email' type='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} label='Enter Your Email' fullWidth />
            </div>
            <div className='w-full flex items-center justify-center flex-col gap-y-5 lg:flex-row'>
                <div className='w-full md:w-1/2  lg:w-2/6'>
                    <TextField type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} label='Enter Your Password' fullWidth />
                </div>
                <div className='w-full md:w-1/2 lg:w-2/6'>
                    <TextField type='password' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} label='Enter Your Repassword' fullWidth />
                </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <TextField type='date' name='dateOfBirth' value={formik.values.dateOfBirth} onChange={formik.handleChange} onBlur={formik.handleBlur} label='Enter Your dateOfBirth' fullWidth />
            </div>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </div>
            <Button type='submit'  variant="outlined" color='success'>{isloading ? <CachedIcon></CachedIcon> : 'Register'}</Button>
            <span>have account ?<Link href={'/login'} className='font-semibold'> login now</Link></span>
        </form >
    )
}