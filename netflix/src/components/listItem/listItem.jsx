import { Add } from "@mui/icons-material";
import { ThumbDownOutlined } from "@mui/icons-material";
import { ThumbUpAltOutlined } from "@mui/icons-material";
import { PlayArrow } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import "./listItem.scss";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const ListItem = ({index, item}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjYxNTQ3NWMwZDBlNDNjZjlkZmMwOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2OTIzMTYyMywiZXhwIjoyNTMzMjMxNjIzfQ.PBibyNQnxuwtGS85pnVBa1nBdenZbt5og0UB3zqyz5k",
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to={{pathname:"/watch"}}>
      <div onClick={()=>{localStorage.setItem("movie", JSON.stringify(movie))}}
        className="listItem"
        style={{
          left: isHovered && index.index * 225 - 50 + index.index * 2.5,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>

              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+16</span>
                <span>{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
     </Link>
  );
};

export default ListItem;