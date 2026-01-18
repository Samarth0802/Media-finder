import React, { useEffect } from 'react'
import { getPhotos, getVideos, getGif } from '../api/mediaApi'
import { setLoading, setError, setResultsPhotos, setResultsVideos, setResultsGifs } from '../redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import loadingVideo from '../videos/loading.webm'
import errorVideo from '../videos/Error 404.webm'
import { Download } from 'lucide-react' // Icon ke liye

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

    // Download function
    // ResultGrid.jsx mein downloadMedia function ko update karo

const downloadMedia = async (url, filename) => {
    try {
        // Check if it's a GIF from Giphy
        if (url.includes('giphy.com') || url.includes('.gif')) {
            // Direct download for GIFs (CORS bypass)
            const link = document.createElement('a')
            link.href = url
            link.download = filename
            link.target = '_blank'
            link.rel = 'noopener noreferrer'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else {
            // Fetch method for other media
            const response = await fetch(url)
            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)
            
            const link = document.createElement('a')
            link.href = blobUrl
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)
        }
    } catch (error) {
        console.error('Download failed:', error)
        // Fallback - open in new tab
        window.open(url, '_blank')
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
                        {/* Download button */}
                        <button
                            onClick={() => downloadMedia(photo.urls.full, `photo-${photo.id}.jpg`)}
                            className='absolute bottom-2 right-2 bg-purple-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-600'
                        >
                            <Download size={20} />
                        </button>
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
                        <button
                            onClick={() => downloadMedia(gif.images.original.url, `gif-${gif.id}.gif`)}
                            className='absolute bottom-2 right-2 bg-purple-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-600'
                        >
                            <Download size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResultGrid