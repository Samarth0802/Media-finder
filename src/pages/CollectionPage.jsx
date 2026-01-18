import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCollection, setCounter } from '../redux/features/collectionSlice'

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.collection)
  const dispatch  = useDispatch()
  //const counter = useSelector((state)=>state.collection.counter)
  return (
    <div className='text-white px-5 py-5 w-full min-h-screen'>
      <div className='w-full h-auto text-4xl font-medium border-b-2 border-b-gray-500 py-5'>
        My Collection ({collection.length})
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6'>
        {collection.map((item) => (
          <div key={item.id} className='rounded-lg overflow-hidden shadow-lg'>
            {/* Photo */}
            <div>
              
                {item.urls && (
              <img
                src={item.urls.small}
                alt={item.alt_description}
                className='w-full h-64 object-cover'
              />
            )}  
            </div>

            {/* Video */}
            <div>
              {item.video_files && (
              <video
                src={item.video_files[0].link}
                className='w-full h-64 object-cover'
                controls
              />
            )}
            {/* <button className='px-4 py-1 border-2 mt-3 ml-1 rounded-lg active:scale-95 cursor-pointer' onClick={()=>dispatch(removeFromCollection(item.id),setCounter())}>Remove</button> */}
            </div>

            {/* GIF */}
            <div>
              {item.images && (
              <img
                src={item.images.fixed_height.url}
                alt={item.title}
                className='w-full h-64 object-cover'
              />
            )}
            {/* <button className='px-4 py-1 border-2 mt-3 ml-1 rounded-lg active:scale-95 cursor-pointer' onClick={()=>dispatch(removeFromCollection(item.id),setCounter())}>Remove</button> */}
            </div>
            <button className='px-4 py-1 border-2 mt-3 ml-1 rounded-lg active:scale-95 cursor-pointer mb-5' onClick={()=>dispatch(removeFromCollection(item.id),setCounter())}>Remove</button>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default CollectionPage