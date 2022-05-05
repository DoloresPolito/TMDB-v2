import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Mapeo = function ({ movies }) {
  const baseURL = "https://image.tmdb.org/t/p/w185";
  const notImage =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2F%25C3%25A1rbol-cerca-del-r%25C3%25ADo-paisaje-esc%25C3%25A9nico-de-la-naturaleza-image131862406&psig=AOvVaw08mPJHYY-LD0ZORgDPEKCO&ust=1645823436302000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiJ6qqgmfYCFQAAAAAdAAAAABAJ";

  return (
    <section className="personFavorites pb-6">
      <ul>
        {movies?.map((data) => (
          <div className="is-flex eachFav" key={data.id}>
            <img
              className="is-inline-block"
              src={data.imgUrl ? `${baseURL}${data.imgUrl}` : notImage}
              alt=""
              style={{ width: "210px", height: "270px" }}
            />
            <p className=" singleTitle is-size-4">{data.title}</p>
          </div>
        ))}
      </ul>
    </section>
  );
};

const UserProfile = function () {
  const people = useSelector((state) => state.people);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/people/${people.id}/movies`)
      .then((res) => res.data)
      .then((result) => {
        setMovies(result);
      });
  }, [people.id]);

  return (
    <div className="layoutPerfil">
      {people.id ? (
        <>
          <h2 className="mail">FAVORITE MOVIES</h2>
          <h1 className="nombre">{people.completeName}</h1>
          <h2 className="mail">{people.email}</h2>

          <Mapeo movies={movies} />
        </>
      ) : (
        <>
          <h1 className="noEncontrado">USUARIO NO ENCONTRADO</h1>
        </>
      )}
    </div>
  );
};

export default UserProfile;
