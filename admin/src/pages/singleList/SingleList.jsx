import { Link, useLocation } from "react-router-dom";
import "./singleList.scss";
import { Publish } from "@mui/icons-material";
import { useState } from "react";
import storage from "../../firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovies } from "../../context/movieContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";

export default function List() {
  const list = JSON.parse(localStorage.getItem("list"));
  // const [updateMovie, setMovie] = useState(movie);
  // const [img, setImg] = useState(movie.img);
  // const [trailer, setTrailer] = useState(movie.trailer);
  // const [video, setVideo] = useState(movie.video);
  // const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(ListContext);

  const handleChange = (e) => {
    // const value = e.target.value;
    // setMovie({ ...updateMovie, [e.target.name]: value });
  };

  // const upload = (items) => {
  //   items.forEach((item) => {
  //     const fileName = new Date().getTime() + item.label + item.file.name;
  //     const storageRef = ref(storage, "/items/" + fileName);
  //     const uploadTask = uploadBytesResumable(storageRef, item.file);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         console.log(snapshot.bytesTransferred);
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         console.log("Upload is : " + progress + "%");
  //       },
  //       (err) => {
  //         console.log(err);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //           setMovie((prev) => {
  //             return { ...prev, [item.label]: url };
  //           });
  //           setUploaded((prev) => prev + 1);
  //         });
  //       }
  //     );
  //   });
  // };
  const handleUpdate = (e) => {
    // e.preventDefault();
    // upload([
    //   { file: img, label: "img" },
    //   { file: trailer, label: "trailer" },
    //   { file: video, label: "video" },
    // ]);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   updateMovies(updateMovie, movie._id, dispatch);
  // };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/lists/new">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              placeholder={list.title}
              name="title"
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={list.type}
              name="year"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={list.genre}
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
              <button className="productButton" onClick={handleUpdate}>
                Update
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}
