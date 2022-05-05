import { useNavigate } from "react-router";
import { useInput } from "../hooks/useInput";
import { useDispatch} from "react-redux";
import { getMovie } from "../states/searchMovie";

const config = function (input) {
  const APIKEY = "2b91346f39a3585b7133b47e7cdc1dff";
  const baseURL = "https://api.themoviedb.org/3/";
  const urlKeyWord = "".concat(
    baseURL,
    "search/movie?api_key=",
    APIKEY,
    "&query=",
    input
  );
  return urlKeyWord;
};

const FormMovies = function () {
  const dispatch = useDispatch();
  // const searchedMovies = useSelector((state) => state.movie);

  const input = useInput("");
  const navigate = useNavigate("");

  const handleSubmit = function (e) {
    e.preventDefault();
    const urlKeyWordEnv = config(input.value);
    dispatch(getMovie(urlKeyWordEnv));
    navigate(`/api/peliculas/busqueda/${input.value}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} class="form-inline my-2 my-lg-0">
        <input
          placeholder="Search movies"
          onChange={input.onChange}
          value={input.value}
          class="form-control mr-sm-2"
          type="search"
        ></input>

      </form>

    </>
  );
};

export default FormMovies;
