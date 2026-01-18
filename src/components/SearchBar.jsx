import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { setQuery } from '../redux/features/searchSlice';
import Tabs from './Tabs';
import ResultGrid from './ResultGrid';
const SearchBar = () => {

    let dispatch = useDispatch()

    const [text, setText] = useState('')
    function formSubmit(e){
        e.preventDefault()
        setText('')
        dispatch(setQuery(text))
    }
    
  return (
    <div className='flex flex-col gap-10'>
        <div className='w-full min-h-16 flex justify-between px-4 pt-7'>
        <div className='flex gap-60 items-center justify-center'>
            <div className=' ml-10 text-4xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent'>
                Media Finder
            </div>
            <form className='flex gap-5' onSubmit={(e)=>{
                formSubmit(e);
            }}>
                <input type="text" placeholder='Enter text to find gif, photos or videos...' className='h-fit w-128 px-2 py-3 border-zinc-600 text-white border-2 border-white rounded-sm flex items-center justify-center outline-none' value={text} onChange={(e)=>{setText(e.target.value)}}/>
                <button className='text-white font-2xl px-4 py-2 bg-gray-900 rounded-lg active:scale-95 cursor-pointer text-xl'
                >Search</button>
            </form>
        </div>
        <div className='text-white mr-10 flex items-center justify-center'>   
            <Link className="ri-save-line text-3xl bg-red-800 px-4 py-3 rounded-[50%]" to={'/collectionPage'}></Link>
        </div>
        </div>
        <Tabs/>
        <ResultGrid/>
    </div>
  )
}

export default SearchBar