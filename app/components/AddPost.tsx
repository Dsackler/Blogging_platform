'use client';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [isDisabled, setIsDIsabled] = useState(false);

  //create a post
  const { mutate } = useMutation(
    async (title: string) => await axios.post('/api/posts/addPost', { title }),
    {
      onError: (error) => {
        const errorMessage = (error as Error).message;
        console.log('Axios error:', errorMessage);
        toast.error(error?.response?.data.message); //this goes to toaster in the querywrapper file
      },
      onSuccess: (data) => {
        console.log(data);
        setTitle(''); //reset the title
        setIsDIsabled(false);
      },
    }
  );
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault(); //stops page from refreshing when you press the button
    setIsDIsabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className='bg-white my-8 p-8 rounded-md'>
      <div className='flex flex-col my-4'>
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name='title'
          value={title}
          placeholder="What's on your mind?"
          className='p-4 text-lg rounded-md my-2 bg-gray-200'
        ></textarea>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? 'text-red-700' : 'text-grey-700'
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className='text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25'
          type='submit'
        >
          Create a post
        </button>
      </div>
    </form>
  );
}
