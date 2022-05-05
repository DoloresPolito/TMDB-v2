import { useContext, useEffect, useState } from "react";
import { UserContext } from "../index";
import { getFavorites } from "../states/userFavorites";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteFavorite } from "../states/favorites";
import { GrFavorite } from "react-icons/gr";

const Favourites = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const idParametro = user.id;
  const favoritos = useSelector((state) => state.favorites);
  const [event, setEvent] = useState("");

  const baseURL = "https://image.tmdb.org/t/p/w185";
  const notImage =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2F%25C3%25A1rbol-cerca-del-r%25C3%25ADo-paisaje-esc%25C3%25A9nico-de-la-naturaleza-image131862406&psig=AOvVaw08mPJHYY-LD0ZORgDPEKCO&ust=1645823436302000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiJ6qqgmfYCFQAAAAAdAAAAABAJ";

  const removeFav = function (data) {
    dispatch(deleteFavorite(data));
    setEvent(data.title);

    navigate("/api/favoritos");
  };

  const details = function (data) {
    navigate(`/api/inicio/${data.id}`);
  };

  useEffect(() => {
    dispatch(getFavorites(idParametro));
  }, [event]);

  return (
    <section className="favorites">
      <ul>
        {favoritos?.map((data) => (
          <section key={data.id} className="eachFav is-flex">
            <img
              src={data.imgUrl ? `${baseURL}${data.imgUrl}` : notImage}
              alt=""
              style={{ width: "150px", height: "200px" }}
            />

            <div>
              <p className="singleTitle">{data.title}</p>
              {user.id ? (
                <>
                  <button className="button" onClick={() => removeFav(data)}>
                    <p>
                      Remove <GrFavorite />
                    </p>
                  </button>
                  <button className="button" onClick={() => details(data)}>
                    <p>Details</p>
                  </button>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </section>
        ))}
      </ul>
    </section>
  );
};

export default Favourites;
