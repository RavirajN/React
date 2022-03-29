import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loaderUsers } from "../redux/action";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    marginTop: 100,
    minWidth: 900,
  },
});

const Home = () => {
  let navigate = useNavigate();
  const classes = useStyles();
  let dispactch = useDispatch();

  const { users } = useSelector((state) => state.data);
  useEffect(() => {
    dispactch(loaderUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the users?")) {
      debugger;
      dispactch(deleteUser(id));
    }
  };

  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/adduser")}
        >
          Add User
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name </TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.contact}</TableCell>
                <TableCell align="center">{user.address}</TableCell>
                <TableCell align="center">
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => navigate(`/edituser/${user.id}`)}
                    >
                      Edit
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
