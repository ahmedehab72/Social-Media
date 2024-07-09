'use client'

import { Context } from '@/context/UserContext';
import { changePassword } from '@/lib/user';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function ChangePassword() {

    let { setUserToken } = useContext(Context)
    let dispatch = useDispatch()
    let router = useRouter()
    let { responesData } = useSelector((state) => state.users)
    console.log(responesData);
    if (responesData?.message === 'success') {
        localStorage.removeItem('userToken')
        router.push('/login')
        setUserToken(null)
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        let data = {
            password: e.target.password.value,
            newPassword: e.target.rePassword.value,
        }
        // console.log(data);
        dispatch(changePassword(data));
    }

    return (<>
        <h1 className='text-3xl p-3 tracking-wider inline border-b-2 ml-5'>Change Password</h1>
        <div>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto border-2 p-5 rounded-lg mt-20">
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                    <input name='password' type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your New Password</label>
                    <input name='rePassword' type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Password</button>
            </form>
        </div>
    </>)
}
