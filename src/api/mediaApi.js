import axios from 'axios'

const unsplash_key = import.meta.env.VITE_UNSPLASH_KEY
const pexels_key = import.meta.env.VITE_PEXELS_KEY
const giphy_key = import.meta.env.VITE_GIPHY_KEY

console.log(unsplash_key,pexels_key)

export async function getPhotos(query,page=1,per_page=30){
    console.log(JSON.stringify(unsplash_key))
    let response = await axios.get('https://api.unsplash.com/search/photos',{
        params:{
            query,
            page,
            per_page
        },
        headers:{
            Authorization: `Client-ID ${unsplash_key}`
        }
    })
    return response.data
}

export async function getVideos(query,page=1,per_page=40){
    //console.log(pexels_key)
    let response = await axios.get('https://api.pexels.com/videos/search',{
        params:{
            query,
            page,
            per_page
        },
        headers:{
            Authorization:pexels_key
        }
    })

    return response.data
}

export async function getGif(query,limit=25){
    let response = await axios.get('https://api.giphy.com/v1/gifs/search',{
        params:{
            query,
            apikey:giphy_key,
            limit,
        }
    })
    return response.data
}