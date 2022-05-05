import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../index";
import Formulario from "./FormMovies";
import FormPeople from "./FormPeople";

const NewNavbar = function () {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = function () {
    axios
      .post("/api/logout")
      .then(() => {
        setUser({});
        console.log("success logout");
        navigate("/api/login");
      })
      .catch((err) => console.log("Ocurrió un error", err));
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <h3 class="navbar-brand">TMDB</h3>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <Formulario />

          <ul class="navbar-nav mr-auto">
            <li class="nav-item active ml-6">
              <Link to="/api/inicio">
                <h2 className="navText mt-3" >MOVIES</h2>
              </Link>
            </li>
          </ul>
          <FormPeople />
        </div>

        <div
          className="navbar-item navbar-end mt-2"
          id="navbarSupportedContent"
        >
          <div className="navbar-item navbar-end mt-2 ml-4">
            <h1 className="nombreNavbar">{user.completeName}</h1>
          </div>

          {user.id ? (
            <div>
              <div className="navbar-item navbar-end mt-1 ml-4">
                <Link to="/api/favoritos">
                  <h2 className="navText">FAVORITOS</h2>
                </Link>
                <Link to="/api/login">
                  <h2 onClick={handleLogout} className="ml-5 navText">
                    LOGOUT
                  </h2>
                </Link>
              </div>
            </div>
          ) : (
            <div className="navbar-item navbar-end mt-1 ml-4">
              <Link to="/api/login">
                <h2 className="navText">LOGIN</h2>
              </Link>
              <Link to="/api/register">
                <h2  className="navText ml-5">REGISTER</h2>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NewNavbar;
