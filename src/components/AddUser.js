import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/action";

const AddUser = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (!values.name || !values.email || !values.address || !values.contact) {
      setError("Please input all the input field");
    } else {
      dispatch(addUser(values));
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
          <h5 className="grey-text text-darken-3">Add User</h5>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input type="name" id="name" onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" onChange={handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
