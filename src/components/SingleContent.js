import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { UserContext } from "../index";
import { GrFavorite } from "react-icons/gr";
import { postFavorite } from "../states/favorites";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getFavorites } from "../states/userFavorites";

const config = function (id) {
  const APIKEY = "2b91346f39a3585b7133b47e7cdc1dff";
  const baseURL = "https://api.themoviedb.org/3/movie/";
  const urlKeyId = "".concat(baseURL, id, "?api_key=", APIKEY);
  return urlKeyId;
};

const SingleContent = () => {
  const baseURL = "https://image.tmdb.org/t/p/w185";
  const notImage =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2F%25C3%25A1rbol-cerca-del-r%25C3%25ADo-paisaje-esc%25C3%25A9nico-de-la-naturaleza-image131862406&psig=AOvVaw08mPJHYY-LD0ZORgDPEKCO&ust=1645823436302000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiJ6qqgmfYCFQAAAAAdAAAAABAJ";

  const { id } = useParams();
  const [data, setData] = useState({});
  const urlKeyIdEnv = config(id);
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToFav = function (data) {
    data.email = user.email;
    data.userId = user.id;
    dispatch(postFavorite(data));
    dispatch(getFavorites(id))
    navigate("/api/favoritos")
  };

  const goBack = function(){
    navigate("/api/inicio")
  }

  useEffect(() => {
    axios
      .get(urlKeyIdEnv)
      .then((res) => res.data)
      .then((data) => setData(data))
      .catch((err) => {
        console.log("Error", err);
      });
  }, [data]);

  return (
    <section key={data.id} className="single">
      <div className="box ">
        <img
          className="imagen"
          src={data.poster_path ? `${baseURL}${data.poster_path}` : notImage}
          alt=""
          style={{ width: "300px", height: "450px" }}
        />

        <div className="div_single">
          <div>
            <p className="singleTitle ">{data.title}</p>
            <div className="content">
              <p>
                <strong className="strong">Description:</strong> {data.overview}
              </p>
              <p className="details ">
                <strong className="strong">Original Language:</strong>{" "}
                {data.original_language}
                <br></br>
                <strong className="strong">Vote Average:</strong>{" "}
                {data.vote_average}
              </p>
            </div>
          </div>
        </div>

        <div>
          {user.id ? (
            <button className="button" onClick={() => addToFav(data)}>
              <p>
                Add <GrFavorite />
              </p>
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <button className="button" onClick={() => goBack()}>
              <p>
                Back to Movies 
              </p>
            </button>
    </section>
  );
};

export default SingleContent;
