import './movieList.scss';
import {DataGrid} from '@mui/x-data-grid'
import { DeleteOutline } from '@mui/icons-material';
import {productRows} from "../../dummyData"
import {Link} from "react-router-dom"
import { useState } from 'react';
import { useContext } from 'react';
import {MovieContext} from "../../context/movieContext/MovieContext"
import { useEffect } from 'react';
import { deleteMovies, getMovies } from '../../context/movieContext/apiCalls';

export default function MovieList() {
  
  const {movies, dispatch}=useContext(MovieContext);

  useEffect(()=>{
    getMovies(dispatch);
  },[dispatch]);

  const handleDelete = (id) => {
    deleteMovies(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/movies/" + params.row.id}}>
              <button className="productListEdit" onClick={()=>localStorage.setItem("movie", JSON.stringify(params.row))}>Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        // pageSize={8}
        // rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(r)=>r._id}
      />
    </div>
  );
}
