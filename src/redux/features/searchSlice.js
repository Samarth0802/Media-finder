import { createSlice } from '@reduxjs/toolkit'

// ✅ Load from session on init
const loadFromSession = () => {
    try {
        const saved = sessionStorage.getItem('searchState')
        if (saved) {
            const parsed = JSON.parse(saved)
            console.log('✅ Loaded from session:', parsed) // Debug log
            return parsed
        }
    } catch (err) {
        console.error('❌ Load error:', err)
    }
    
    console.log('📝 Using default state') // Debug log
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