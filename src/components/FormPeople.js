import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router";
import { useDispatch} from "react-redux";
import { getPeople } from "../states/searchPeople";

const FormPeople = function () {
  const input = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(getPeople(input.value));
    navigate(`/api/people/${input.value}`)
  };

  return (
    <>
      <form onSubmit={handleSubmit} class="form-inline my-2 my-lg-0">
        <input
          placeholder="Search users"
          onChange={input.onChange}
          value={input.value}
          class="form-control mr-sm-2"
          type="search"
        ></input>
      </form>
    </>
  );
};

export default FormPeople;
