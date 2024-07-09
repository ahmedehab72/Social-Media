'use client'

import { Alert, Button, TextField, Typography } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import { Context } from '@/context/UserContext';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import CachedIcon from '@mui/icons-material/Cached';
import Link from 'next/link';



export default function Register() {

    const { userToken, setUserToken } = useContext<any>(Context);
    const [apierror, setApiError] = useState()
    let router = useRouter()
    const [isloading, setIsLoading] = useState(false)

    let formik = useFormik<any>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: register

    })

    function register(formValues: object[]) {
        setIsLoading(true)
        axios.post(`https://linked-posts.routemisr.com/users/signin`, formValues)
            .then((responce) => {
                // console.log(responce);
                setIsLoading(false)
                if (responce?.data.message === 'success') {
                    localStorage.setItem('userToken', responce?.data?.token)
                    setUserToken(responce?.data?.token)
                    router.push('/')
                }

            })
            .catch((err) => {
                // console.log(err);
                setIsLoading(false)
                setApiError(err?.response?.data?.error)
                formik.values.password == null
            })
    }


    return (
        <form onSubmit={formik.handleSubmit} className='flex shadow-md p-5 gap-5 w-full flex-col justify-center items-center lg:w-2/3 mx-auto mt-52 my-20'>
            {apierror ? <Alert severity="error">{apierror}</Alert> : null}
            <h1 className='text-5xl font-bold my-5 text-slate-800'>Login here</h1>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <TextField name='email' type='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} label='Enter Your Email' fullWidth />
            </div>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <TextField type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} label='Enter Your Password' fullWidth />
            </div>
            <Button type='submit' variant="outlined" color='success'>{isloading ? <CachedIcon></CachedIcon> : 'Login'}</Button>
            <span>didt have account yet ?<Link href={'/register'} className='font-semibold'> register now</Link></span>
        </form >
    )
}