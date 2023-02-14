import './listList.scss';
import {DataGrid} from '@mui/x-data-grid'
import { DeleteOutline } from '@mui/icons-material';
import {productRows} from "../../dummyData"
import {Link} from "react-router-dom"
import { useState } from 'react';
import { useContext } from 'react';
import {ListContext} from "../../context/listContext/ListContext"
import { useEffect } from 'react';
import {deleteList, getLists} from "../../context/listContext/apiCalls"

export default function ListList() {
  
  const {lists, dispatch}=useContext(ListContext);

  useEffect(()=>{
    getLists(dispatch);
  },[dispatch]);

  const handleDelete = (id) => {
    deleteList(id,dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 120 },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "type", headerName: "Type", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/lists/" + params.row.id}}>
              <button className="productListEdit" onClick={()=>localStorage.setItem("list", JSON.stringify(params.row))}>Edit</button>
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
        rows={lists}
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
