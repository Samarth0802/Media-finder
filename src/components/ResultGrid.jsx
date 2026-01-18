import React, { useEffect } from 'react'
import { getPhotos, getVideos, getGif } from '../api/mediaApi'
import { setLoading, setError, setResultsPhotos, setResultsVideos, setResultsGifs } from '../redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import loadingVideo from '../videos/loading.webm'
import errorVideo from '../videos/Error 404.webm'


const ResultGrid = () => {
    const dispatch = useDispatch()
    const { query, activeTab, resultsPhotos, resultsVideos, resultsGifs, loading, error } = useSelector((store) => store.search)

    const getData = async () => {
        if (!query) return
        
        dispatch(setLoading())
        try {
            if (activeTab === 'Photos') {
                const data = await getPhotos(query)
                dispatch(setResultsPhotos(data.results))
            }
            else if (activeTab === 'Videos') {
                const data = await getVideos(query)
                dispatch(setResultsVideos(data.videos))
            }
            else {
                const data = await getGif(query)
                dispatch(setResultsGifs(data.data))
            }
        } catch (err) {
            dispatch(setError(err.message))
        }
    }

    useEffect(() => {
        if (query) {
            getData()
        }
    }, [activeTab, query])

    const getCurrentResults = () => {
        if (activeTab === 'Photos') return resultsPhotos
        if (activeTab === 'Videos') return resultsVideos
        return resultsGifs
    }

    const currentResults = getCurrentResults()

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <video className='w-full max-w-md h-auto object-cover' autoPlay loop muted playsInline>
                    <source src={loadingVideo} type="video/webm" />
                </video>
            </div>
        )
    }

    if (error || currentResults.length === 0) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center'>
                <video className='w-full max-w-md h-auto object-cover' autoPlay loop muted playsInline>
                    <source src={errorVideo} type="video/webm" />
                </video>
                <p className='text-white text-xl mt-4'>{error || 'No results found!'}</p>
                <button 
                    className='text-white px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg mt-4 active:scale-95 transition-all' 
                    onClick={getData}
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div className='p-4 min-h-screen'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {/* Photos */}
                {activeTab === 'Photos' && resultsPhotos.map((photo) => (
                    <div key={photo.id} className='relative group overflow-hidden rounded-lg shadow-lg'>
                        <img 
                            src={photo.urls.small} 
                            alt={photo.alt_description}
                            className='w-full h-64 object-cover hover:scale-110 transition-transform duration-300'
                        />

                    </div>
                ))}

                {/* Videos */}
                {activeTab === 'Videos' && resultsVideos.map((video) => (
                    <div key={video.id} className='relative group overflow-hidden rounded-lg shadow-lg'>
                        <video 
                            src={video.video_files[0].link}
                            className='w-full h-64 object-cover'
                            controls
                        />
                    </div>
                ))}

                {/* Gifs */}
                {activeTab === 'Gifs' && resultsGifs.map((gif) => (
                    <div key={gif.id} className='relative group overflow-hidden rounded-lg shadow-lg'>
                        <img 
                            src={gif.images.fixed_height.url}
                            alt={gif.title}
                            className='w-full h-64 object-cover'
                        />

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResultGrid