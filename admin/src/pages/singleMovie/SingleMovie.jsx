import { Link, useLocation } from "react-router-dom";
import "./singleMovie.scss";
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

export default function Product() {
  const movie = JSON.parse(localStorage.getItem("movie"));
  const [updateMovie, setMovie] = useState(movie);
  const [img, setImg] = useState(movie.img);
  const [trailer, setTrailer] = useState(movie.trailer);
  const [video, setVideo] = useState(movie.video);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...updateMovie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, "/items/" + fileName);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot.bytesTransferred);
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is : " + progress + "%");
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovies(updateMovie, movie._id, dispatch);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/movies/new">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              name="title"
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={movie.year}
              name="year"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              name="genre"
              onChange={handleChange}
            />
            <label>Limit</label>
            <input
              type="text"
              placeholder={movie.limit}
              name="limit"
              onChange={handleChange}
            />
            <label>Trailer</label>
            <input
              type="file"
              placeholder={movie.trailer}
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
            <label>Video</label>
            <input
              type="file"
              placeholder={movie.video}
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            {/* <button className="productButton" onClick={handleUpdate}>
              Update
            </button> */}
            {uploaded === 3 ? (
              <button className="productButton" onClick={handleSubmit}>
                Create
              </button>
            ) : (
              <button className="productButton" onClick={handleUpdate}>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
