import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/searchSlice'

export const store = configureStore({
    reducer: {
        search: searchReducer
    }
})

// ✅ Subscribe to save state
store.subscribe(() => {
    try {
        const state = store.getState().search
        sessionStorage.setItem('searchState', JSON.stringify(state))
        console.log('💾 Saved to session:', state) // Debug log
    } catch (err) {
        console.error('❌ Save error:', err)
    }
})