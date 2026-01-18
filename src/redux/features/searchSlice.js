// searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Session storage se initial state load karo
const loadFromSession = () => {
    try {
        const serializedState = sessionStorage.getItem('searchState')
        if (serializedState === null) {
            return {
                query: '',
                activeTab: 'Photos',
                resultsPhotos: [],
                resultsVideos: [],
                resultsGifs: [],
                loading: false,
                error: null
            }
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return {
            query: '',
            activeTab: 'Photos',
            resultsPhotos: [],
            resultsVideos: [],
            resultsGifs: [],
            loading: false,
            error: null
        }
    }
}

export const searchSlice = createSlice({
    name: "search",
    initialState: loadFromSession(), 
    reducers: {
        setQuery: (state, actions) => {
            state.query = actions.payload
        },
        setActiveTab: (state, actions) => {
            state.activeTab = actions.payload
        },
        setResultsPhotos: (state, actions) => {
            state.resultsPhotos = actions.payload
            state.loading = false
        },
        setResultsVideos: (state, actions) => {
            state.resultsVideos = actions.payload
            state.loading = false
        },
        setResultsGifs: (state, actions) => {
            state.resultsGifs = actions.payload
            state.loading = false
        },
        setLoading: (state) => {
            state.loading = true
            state.error = null
        },
        setError: (state, actions) => {
            state.error = actions.payload
            state.loading = false
        },
        clearResults: (state) => {
            state.resultsPhotos = []
            state.resultsVideos = []
            state.resultsGifs = []
        }
    }
})

export const { setQuery, setActiveTab, setError, setLoading, setResultsVideos, setResultsGifs, setResultsPhotos, clearResults } = searchSlice.actions

export default searchSlice.reducer