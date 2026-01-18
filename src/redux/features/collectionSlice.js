import { createSlice } from "@reduxjs/toolkit";

// ✅ Load from localStorage on page load
const loadFromStorage = () => {
    try {
        const saved = localStorage.getItem('collectionState')
        if (saved) {
            return JSON.parse(saved)
        }
    } catch (err) {
        console.error('Load error:', err)
    }
    return {
        collection: [],
        counter: 0
    }
}

export const collectionSlice = createSlice({
    name: "Collection",
    initialState: loadFromStorage(), // ✅ localStorage se load karo
    reducers: {
        setCollection: (state, actions) => {
            state.collection.push(actions.payload)
        },
        setCounter: (state) => {
            state.counter = state.collection.length
        },
        removeFromCollection: (state, actions) => {
            state.collection = state.collection.filter(item => item.id !== actions.payload)
        }
    }
})

export const { setCollection, setCounter, removeFromCollection } = collectionSlice.actions
export default collectionSlice.reducer