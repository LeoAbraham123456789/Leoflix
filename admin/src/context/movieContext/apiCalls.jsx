import axios from 'axios'
import { updateMovieStart, updateMovieSuccess, updateMovieFailure, createMovieStart, createMovieSuccess, createMovieFailure, getMovieFailure, deleteMovieStart, deleteMovieSuccess, deleteMovieFailure, getMovieStart, getMovieSuccess } from './MovieActions'

export const getMovies=async(dispatch)=>{
    dispatch(getMovieStart());
    try{
        const res=await axios.get("https://leoflix.onrender.com/api/movies",{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
        },});
        dispatch(getMovieSuccess(res.data));
    }catch(err){
        dispatch(getMovieFailure());
    }
}

export const createMovies=async(movie,dispatch)=>{
    dispatch(createMovieStart());
    try{
        const res=await axios.post("https://leoflix.onrender.com/api/movies",movie,{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
        },});
        dispatch(createMovieSuccess(res.data));
    }catch(err){
        dispatch(createMovieFailure());
    }
}

export const updateMovies=async(movie, id,dispatch)=>{
    dispatch(updateMovieStart());
    try{
        const res=await axios.put("https://leoflix.onrender.com/api/movies/"+id,movie,{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
        },});
        dispatch(updateMovieSuccess(res.data));
    }catch(err){
        dispatch(updateMovieFailure());
    }
}

export const deleteMovies=async(id,dispatch)=>{
    dispatch(deleteMovieStart());
    try{
        await axios.delete("https://leoflix.onrender.com/api/movies/"+id,{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
        },});
        dispatch(deleteMovieSuccess(id));
    }catch(err){
        dispatch(deleteMovieFailure());
    }
}