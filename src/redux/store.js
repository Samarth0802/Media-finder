// redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/searchSlice'
import collectionReducer from './features/collectionSlice'

export const store = configureStore({
    reducer: {
        search: searchReducer,
        collection: collectionReducer
    }
})

// ✅ Save to localStorage on every change
store.subscribe(() => {
    try {
        const state = store.getState()
        
        // Search - sessionStorage (temporary)
        sessionStorage.setItem('searchState', JSON.stringify(state.search))
        
        // Collection - localStorage (permanent)
        localStorage.setItem('collectionState', JSON.stringify(state.collection))
        
    } catch (err) {
        console.error('Save error:', err)
    }
})