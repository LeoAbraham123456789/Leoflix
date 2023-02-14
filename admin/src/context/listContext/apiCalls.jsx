import axios from "axios";
import {
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
  createListStart,
  createListSuccess,
  createListFailure,
  getListsFailure,
  deleteListStart,
  deleteListSuccess,
  deleteListFailure,
  getListsStart,
  getListsSuccess,
} from "./ListActions";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("https://leoflix.onrender.com/api/lists", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

export const createList=async(list,dispatch)=>{
    dispatch(createListStart());
    try{
        const res=await axios.post("/lists",list,{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
        },});
        dispatch(createListSuccess(res.data));
    }catch(err){
        dispatch(createListFailure());
    }
}

// export const updateMovies=async(movie, id,dispatch)=>{
//     dispatch(updateMovieStart());
//     try{
//         const res=await axios.put("/movies/"+id,movie,{headers: {
//             token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
//         },});
//         dispatch(updateMovieSuccess(res.data));
//     }catch(err){
//         dispatch(updateMovieFailure());
//     }
// }

export const deleteList=async(id,dispatch)=>{
    dispatch(deleteListStart());
    try{
        await axios.delete("https://leoflix.onrender.com/api/lists/"+id,{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
        },});
        dispatch(deleteListSuccess(id));
    }catch(err){
        dispatch(deleteListFailure());
    }
}
