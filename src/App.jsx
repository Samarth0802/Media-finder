import React from 'react'
import { getGif, getPhotos, getVideos } from './api/mediaApi'

const App = () => {

  async function photosData() {
    const data = await getPhotos('cat')
    console.log(data)
  }

  async function videosData() {
    const data = await getVideos('Cat')
    console.log(data)
  }

  async function gifData() {
    const data = await getGif('cat')
    console.log(data)
  }


  return (
    <div className='w-full min-h-screen bg-zinc-700'>
      <div className='flex gap-10'>
        <button className='px-4 py-2 bg-orange-200 text-black rounded-2xl' onClick={()=>photosData()}>Get Photos</button>
        <button className='px-4 py-2 bg-orange-200 text-black rounded-2xl' onClick={()=>{videosData()}}>Get Videos</button>
        <button className='px-4 py-2 bg-orange-200 text-black rounded-2xl' onClick={()=>{gifData()}}>Get gif</button>
      </div>
    </div>
  )
}

export default App