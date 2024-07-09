'use client'
import React, { useEffect, useState } from 'react'
import { createPosts, deletePost, getUserPosts, setTimeForAddComment } from '@/lib/posts';
import { changeProfilePhoto, getUserInfo } from '@/lib/user';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '@/lib/posts';
import { Alert, Box, Button, Grid, TextField } from '@mui/material';
import { deleteComment, setTimeForDelete, setTimeForUpdate, updateComment } from '@/lib/comments';
import CheckIcon from '@mui/icons-material/Check';



export default function Profile() {

    let { userInfo, userPhoto, isUpload } = useSelector((state): any => state.users);
    let { userPosts, isCreate, addedComment } = useSelector((state): any => state.posts);
    let { isUpdateComment, isDeleteComment } = useSelector((state): any => state.comments);
    console.log(userPosts);
    let dispatch = useDispatch()
    const [btn, setBtn] = useState(true)
    const [updatebtn, setUpdatebtnBtn] = useState(false)
    const [updatevalue, setUpdateValue] = useState()
    const [content, setContent] = useState()

    function handleSubmit(e: Event): any {
        e.preventDefault();
        let formData = new FormData();
        let content = e.target.content.value;
        let photo = e.target.image.files[0];
        formData.append('body', content)
        formData.append('image', photo)
        dispatch<any>(createPosts<any>(formData))
        console.log(content, photo);
    }

    function handleProfilePhoto(e: Event) {
        e.preventDefault();
        let formData = new FormData()
        let photo = e.target.image.files[0];
        formData.append('photo', photo);
        dispatch(changeProfilePhoto(formData));
    }

    function makeComment(e: Event): any {
        e.preventDefault()
        let data = {
            content: e.target.content.value,
            post: e.target.id.value
        }
        dispatch<any>(createComment(data))
        setTimeout(() => { dispatch(setTimeForAddComment()) }, 2000)

    }

    function prepareUpdate(commentId: any): any {
        setBtn(false)
        setUpdatebtnBtn(true)
        setUpdateValue(commentId)
    }

    function test(e: Event) {
        // console.log(e.target.value);
        setContent(e.target.value)
    }

    function updateContact() {
        setBtn(true);
        setUpdatebtnBtn(false)
        let dataa = {
            updatevalue: updatevalue,
            content: content
        }
        dispatch(updateComment(dataa));
        setTimeout(() => { dispatch(setTimeForUpdate()) }, 2000)
    }

    function closeUpdate() {
        setUpdatebtnBtn(false);
        setBtn(true);
    }

    function deleteContent(commentId) {
        dispatch(deleteComment(commentId))
        setTimeout(() => { dispatch(setTimeForDelete()) }, 2000)
    }


    function deletePosts(postId) {
        dispatch<any>(deletePost(postId))
    }

    useEffect(() => {
        dispatch<any>(getUserInfo())
    }, [userPhoto])

    useEffect(() => {
        dispatch<any>(getUserPosts(userInfo?._id))
    }, [userInfo?._id, userPosts])


    return (
        <div>
            {/* <h1 className='text-3xl p-3 tracking-wider inline border-b-2 ml-5'>Profile</h1> */}
            <div className='flex flex-wrap gap-5 justify-between p-5'>
                <div className='w-full lg:w-1/2 mx-auto'>
                    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center pb-10">
                            {isUpload ? <Alert sx={{ mt: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                                Prodile Photo Upload Successfull
                            </Alert> : null}
                            <img className="w-24 h-24 my-3 rounded-full shadow-lg" src={userInfo?.photo} alt="Bonnie image" />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userInfo?.name}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{userInfo?.email}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{userInfo?.gender}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{userInfo?.dateOfBirth}</span>
                            <form onSubmit={handleProfilePhoto} className="flex items-center justify-center gap-5 mt-4 lg:mt-6 flex-col">
                                <div className='flex gap-3'>
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            </div>
                                            <input name='image' id="dropzone-file" type="file" className="hidden" />
                                        </label>
                                    </div>
                                    <Button type='submit' variant="contained">Submit</Button>
                                </div>
                                <Link href={'/changepassword'} className="py-2 w-full px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Change Password</Link>
                            </form>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='w-full lg:w-2/4 flex flex-col gap-5 mx-auto'>
                    <h3 className='text-center text-3xl border-b-2'>Add Post</h3>
                    {isCreate ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Post Added Successfull
                    </Alert> : null}
                    <textarea name='content' className='w-full resize-none h-40 border-2'></textarea>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="postPhoto" className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            </div>
                            <input name='image' id="postPhoto" type="file" className="hidden" />
                        </label>
                    </div>
                    <Button type='submit' sx={{ width: '100%' }} variant="outlined">Add Post</Button>
                </form>
            </div>
            <div className='flex flex-col items-center'>
                <h3 className='text-center my-5 p-3 rounded-lg bg-slate-300'>Your Posts</h3>
                {userPosts?.map((post: any) => <Card key={post._id} sx={{ maxWidth: 545, my: '10px' }}>
                    <div className='flex items-center justify-between'><CardHeader
                        avatar={
                            <Avatar src={post?.user?.photo} sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
                        }
                        title={post?.user.name}
                        subheader={post?.createdAt}
                    />
                        {userInfo?._id == post?.user?._id ? <Button onClick={() => deletePosts(post?._id)} sx={{ bgcolor: 'tomato', mr: '5px' }} variant="contained">Delete</Button> : null}
                    </div>
                    <CardMedia
                        component="img"
                        height="194"
                        image={post?.image}
                        alt="post image"
                    />
                    <CardContent>
                        <Typography sx={{ fontSize: '25px', color: 'black', fontWeight: '700' }} variant="body2">
                            {post?.body}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography sx={{ marginBottom: '5px', p: '10px' }}>Comments :</Typography>
                        {post.comments.map((comment: any) => <Box sx={{ bgcolor: 'grey', p: '10px', borderRadius: '10px', color: 'white', marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }} key={comment._id}>
                            <div className='flex justify-start items-center gap-x-3'>
                                <Avatar src={comment?.commentCreator?.photo}></Avatar>
                                <Typography>{comment?.content}</Typography>
                            </div>
                            {comment?.commentCreator?._id == userInfo._id ? <div className='flex gap-x-3'>
                                <Button onClick={() => deleteContent(comment?._id)} sx={{ bgcolor: 'tomato', ml: 'auto' }} variant="contained">Delete</Button>
                                <Button onClick={() => prepareUpdate(comment?._id)} sx={{ bgcolor: 'skyblue', ml: 'auto' }} variant="contained">Update</Button>
                            </div> : null}
                        </Box>)}
                        <form onSubmit={makeComment}>
                            {isUpdateComment ? <Alert sx={{ mt: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                                Comment Updated Successfull
                            </Alert> : null}
                            {isDeleteComment ? <Alert sx={{ mt: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                                Comment Deleted Successfull
                            </Alert> : null}
                            <TextField onChange={test} name='content' sx={{ width: '100%', mt: '10px' }} id="outlinedBasic" placeholder='Add Comment...' variant="outlined" />
                            {addedComment ? <Alert sx={{ mt: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                                Comment Added Successfull
                            </Alert> : null}
                            {btn ? <button name='id' value={post?._id} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 my-5 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Comment</button> : null}

                            {/* <Button id='addBtn' name='id' value={post?._id} type='submit' sx={{ mt: '10px' }} variant="contained">Add Comment</Button> */}
                            {/* <Button id='updateBtn' value={post?._id} type='submit' sx={{ mt: '10px', bgcolor: 'skyblue', display: 'none' }} variant="contained">Update Comment</Button> */}
                        </form>
                        {updatebtn ? <div className='flex items-center justify-between'><button onClick={() => updateContact()} id='updateBtn' className="text-white bg-sky-300 hover:bg-sky-300 focus:ring-4 my-5 focus:ring-sky-bg-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-300 dark:hover:bg-sky-300 focus:outline-none dark:focus:ring-sky-bg-sky-300">Update Comment</button> <h1 onClick={closeUpdate} className='text-3xl cursor-pointer'>✖️</h1></div> : null}

                    </CardContent>
                </Card>)}
            </div>

        </div >

    )
}
