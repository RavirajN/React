import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getSingleUser, updateUser } from "../redux/action";

const EditUser = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.data);

  let { id } = useParams();
  const [state, setstate] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  useEffect(() => {
    setstate(user);
  }, [user]);

  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (!state.name || !state.email || !state.address || !state.contact) {
      setError("Please input all the input field");
    } else {
      dispatch(updateUser(state, id));
      navigate("/");
      setError("");
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>

      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      
      <div className="container">
        <form className="white" onSubmit={handleSubmit}>
          <h5 className="grey-text text-darken-3">Update User</h5>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              value={state.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email"
              value={state.email || ""}
               onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" value={state.contact || ""} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={state.address || ""}  onChange={handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
