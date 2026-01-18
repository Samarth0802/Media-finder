import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice'
import ResultGrid from './ResultGrid'

const Tabs = () => {
    const tabs = ['Photos','Videos','Gifs']
    const activeTab = useSelector((state)=>state.search.activeTab)
    const dispatch = useDispatch()

  return (
    <div className='text-white mt-10 ml-15 flex gap-5'>
        {
            tabs.map((elem)=>{
                return (
                    <>
                        <button className={`${activeTab===elem?'bg-emerald-400':'bg-gray-500'} px-4 py-2 rounded-xl active:scale-97 cursor-pointer text-lg`} onClick={()=>{
                            dispatch(setActiveTab(elem))
                            console.log(elem)
                            console.log(activeTab)
                        }}>{elem}</button>
                    </>
                )
            })
        }
    </div>
  )
}

export default Tabs