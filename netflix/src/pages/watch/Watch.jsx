import { ArrowBackOutlined } from "@mui/icons-material";
import "./Watch.scss";

import { useLocation, Link, json } from "react-router-dom";

const Watch = () => {
  const movie=JSON.parse(localStorage.getItem("movie"));
  // let location = useLocation();
  // console.log(location.search);
  
  // const movie = location.movie;
  return (
    <div className="watch">
      <Link to="/">
        <div className="back" onClick={()=>localStorage.clear()}>
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay={true}
        onProgress={true}
        controls
        src={movie.video}
      />
    </div>
  );
};

export default Watch;
