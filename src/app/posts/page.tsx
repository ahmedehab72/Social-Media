'use client'
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, deletePost, getAllPosts, setTimeForAddComment } from '@/lib/posts';
import { Alert, Box, Button, Grid, TextField } from '@mui/material';
import { deleteComment, setTimeForDelete, setTimeForUpdate, updateComment } from '@/lib/comments';
import { getUserInfo } from '@/lib/user';
import CheckIcon from '@mui/icons-material/Check';


export default function Posts() {

    const [btn, setBtn] = useState(true)
    const [updatebtn, setUpdatebtnBtn] = useState(false)
    const [updatevalue, setUpdateValue] = useState()
    const [content, setContent] = useState()

    let { allPosts, addedComment ,isLoading } = useSelector((state: any) => state.posts)
    let { userInfo } = useSelector((state => state.users))
    let { isUpdateComment, isDeleteComment } = useSelector((state): any => state.comments);

    // console.log(allPosts);
    let dispatch = useDispatch()

    function makeComment(e: Event): any {
        e.preventDefault()
        let data = {
            content: e.target.content.value,
            post: e.target.id.value
        }
        dispatch<any>(createComment(data))
        setTimeout(() => { dispatch(setTimeForAddComment()) }, 2000)
    }

    function prepareUpdate(commentId) {
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

    function deleteContent(commentId) {
        dispatch(deleteComment(commentId))
        setTimeout(() => { dispatch(setTimeForDelete()) }, 2000)
    }

    function deletePosts(postId) {
        dispatch<any>(deletePost(postId))
    }

    useEffect(() => {
        dispatch(getUserInfo())
    })
    useEffect(() => {
        dispatch<any>(getAllPosts())
    }, [allPosts, userInfo])


    return (<>
    
{/* 
        // <div className='flex flex-col items-center gap-5 my-5'>
        //     <h1 className='text-3xl p-3 tracking-wider inline border-b-2 ml-5 font-semibold'>Welcome To Home Page
        //     </h1> */}

            {allPosts?.map((post: any) => <Grid item key={post._id} padding={'10px'} xs={12} sm={6} md={4} lg={3} >
              <Card  sx={{ maxWidth: 545 }}>
                <div className='flex items-center justify-between'><CardHeader
                    avatar={
                        <Avatar src={post?.user?.photo} sx={{ bgcolor: red[500] }}></Avatar>
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
                        <div className='flex items-center gap-3'> <Avatar src={comment?.commentCreator?.photo}></Avatar>
                            <Typography paragraph>{comment?.content}</Typography>
                        </div>
                        {comment?.commentCreator?._id == userInfo?._id ? <div className='flex gap-3'>
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
                        <TextField onChange={test} name='content' sx={{ width: '100%', mt: '10px' }} id="outlined-basic" placeholder='Add Comment...' variant="outlined" />
                        {/* <button name='id' value={post._id} type='submit' className='p-3 bg-slate-200 rounded-lg mt-5'>Add Comment</button> */}
                        {addedComment ? <Alert sx={{ mt: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                            Comment Added Successfull
                        </Alert> : null}
                        {btn ? <Button name='id' value={post?._id} type='submit' sx={{ mt: '10px' }} variant="contained">Add Comment</Button> : null}
                    </form>
                    {updatebtn ? <Button onClick={updateContact} sx={{ mt: '10px', bgcolor: 'skyblue' }} variant="contained">Update Comment</Button> : null}
                </CardContent>
            </Card>
            </Grid>)
            }
        {/* // </div > */}
        </>)
}
