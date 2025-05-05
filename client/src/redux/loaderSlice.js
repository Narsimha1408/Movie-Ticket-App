import {createSlice} from '@reduxjs/toolkit'

const loaderSlice=createSlice({
    name : 'loader',

    initialState : {
        loading : true
    },

    reducers : {   //if the state is true, show the loader else hide the loader
        showLoading : (state)=>{
            state.loading = true
        },

        hideLoading : (state)=>{
            state.loading = false
        },
    }

})

export const {showLoading, hideLoading} = loaderSlice.actions; //we have to use these to dispatch them from the component
export default loaderSlice.reducer //we have  to export this to assign this in store