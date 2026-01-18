import React from 'react'
import SearchBar from './components/SearchBar'
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import CollectionPage from './pages/CollectionPage'


const App = () => {


  return (
    <div className='w-full min-h-screen bg-black'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<SearchBar/>}/>
        <Route path='/collectionPage' element={<CollectionPage/>}/>
      </Routes>
    </div>
  )
}

export default App