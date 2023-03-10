import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminQueries() {
  const [data, setData] = useState([]);

  const [newData, setNewData] = useState(data);

  const [updateAdminResponse, setUpdateAdminResponse] = useState("");

  const [deleteQResponse, setDeleteQResponse] = useState("");

  const [uniqueUsers, setUniqueUsers] = useState([]);

  const [allAdmins, setAllAdmins] = useState([]);
  const [delAdmin, setDelAdmin] = useState("");
  const [addAdmin, setAddAdmin] = useState("");

  useEffect(() => {
    (async () => {
      await axios.get(`${serverUrl}/uniqueusers`).then((response) => {
        setUniqueUsers(response.data.usersnoadmin);
        setAllAdmins(response.data.allAdmins);
        console.log(response.data.usersAdmin);
      });
    })();
  }, [addAdmin, delAdmin]);

  async function One(name) {
    await axios
      .put(`${serverUrl}/addadmin/${name}`)
      .then((response) => alert("admin added"));
  }

  async function Two(name) {
    await axios
      .put(`${serverUrl}/deladmin/${name}`)
      .then((response) => alert("admin deleted"));
  }

  console.log(uniqueUsers);

  const adminName = window.localStorage.getItem("user");

  useEffect(() => {
    (async () => {
      await axios
        .get(`${serverUrl}/allissues`)
        .then((response) => {
          setData(response.data);
          setNewData(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    })();
  }, [updateAdminResponse, deleteQResponse]);

  useEffect(() => {
    (async () => {
      const users = await axios
        .get(`${serverUrl}/uniqueusers`)
        .then((response) => {
          setUniqueUsers(response.data.users);
          console.log(response.data);
        });
      console.log(users);
    })();
  }, []);

  function createData(
    id,
    name,
    issueType,
    issueTitle,
    issueDescription,
    status,
    date
  ) {
    return { id, name, issueType, issueTitle, issueDescription, status, date };
  }

  const rows = newData.map((ele) =>
    createData(
      ele._id,
      ele.name,
      ele.issueType,
      ele.issueTitle,
      ele.issueDescription,
      ele.status,
      ele.date
    )
  );

  async function ChangeStatus(id) {
    const statusResponse = await axios
      .put(`${serverUrl}/updateissue/${id}`, {
        status: "resolved",
      })
      .then((response) => {
        setUpdateAdminResponse(response);
      });
    console.log(statusResponse);
  }

  async function deleteQueries() {
    const queriesDelete = await axios
      .delete(`${serverUrl}/deleteresolved`)
      .then((response) => setDeleteQResponse(response));
    console.log(queriesDelete);
  }
  console.log(data);

  const [filterName, setFilterName] = useState("");

  return (
    <div>
      {data !== [] ? (
        <div>
          {/* admin permissions */}
          <div className="grid grid-cols-3 text-xl bg-slate-400">
            <h1 className="self-center font-serif font-bold text-left lg:pl-8">
              Assign Permissions:
            </h1>
            <div className="self-center m-2 col-span-1">
              <label for="assign">Assign admin permission to:</label>
              <select
                onChange={(e) => {
                  setAddAdmin(e.target.value);
                  One(e.target.value);
                }}
                id="assign"
                className="p-1 rounded-lg"
              >                
                {uniqueUsers.map((user, index) => (
                  <option key={index} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-2">
              <label for="revoke">Revoke admin permissions of:</label>
              <select
                onChange={(e) => {
                  if (allAdmins.length > 1) {
                    setDelAdmin(e.target.value);
                    Two(e.target.value);
                  } else {
                    alert("At Least One Admin Needed!");
                  }
                }}
                className="p-1 rounded-lg"
              >
                {allAdmins.map((admin, index) => (
                  <option key={index} value={admin}>
                    {admin}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* admin queries */}
          <TableContainer component={Paper} className="px-2">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-serif font-bold text-left p-4">
                Admin - {adminName}
              </h1>
              {/* filters */}
              <select
                onChange={(e) => {
                  if (e.target.value !== "all") {
                    setFilterName(e.target.value);
                    setNewData(
                      data.filter((dat) => dat.name === e.target.value)
                    );
                  } else {
                    setNewData(data);
                  }
                }}
                className="rounded-lg bg-gray-400 p-2 h-11 self-center"
              >
                <option value="all" selected>
                  Select User-all
                </option>
                {uniqueUsers.map((user, index) => (
                  <option key={index} value={user}>
                    {user}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  setNewData(data.filter((dat) => dat.name === filterName));

                  if (e.target.value === "pending") {
                    setNewData(data.filter((dat) => dat.name === filterName));
                    let newDat = newData.filter(
                      (dat) => dat.status === "pending"
                    );
                    setNewData(newDat);
                  } else if (e.target.value === "resolved") {
                    setNewData(data.filter((dat) => dat.name === filterName));
                    let newDat = newData.filter(
                      (dat) => dat.status === "resolved"
                    );
                    setNewData(newDat);
                    console.log(newDat);
                  } else if (e.target.value === "all") {
                    setNewData(data.filter((dat) => dat.name === filterName));
                  }
                }}
                className="rounded-lg bg-gray-400 p-2 h-11 self-center"
              >
                <option value="all">Status-all</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
              {/* date wise sort */}
              {/* <select className="rounded-lg p-2 h-11 self-center">
            <option value="asc">Date Asc</option>
            <option value="desc">Date Desc</option>
          </select> */}
              <button
                onClick={() => {setNewData(data)}}
                className="bg-gray-300 rounded-lg p-2 h-11 self-center"
              >
                Reset
              </button>
              <h1 className="self-center text-md font-semibold">
                Delete Resolved Queries{" "}
                <IconButton
                  onClick={() => {
                    deleteQueries();
                  }}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </h1>
            </div>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Ticket-Id</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Type</StyledTableCell>
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Date</StyledTableCell>
                  <StyledTableCell align="left">Controls</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell
                      className="break-all"
                      component="th"
                      scope="row"
                    >
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.issueType}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.issueTitle}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="break-all">
                      {row.issueDescription}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.status === "pending" ? (
                        <h1 className="text-orange-400">Pending</h1>
                      ) : (
                        <h1 className="text-green-400">Resolved</h1>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.date}</StyledTableCell>
                    <StyledTableCell align="left">
                      <IconButton
                        onClick={() => {
                          if (row.status === "pending") {
                            ChangeStatus(row.id);
                          } else {
                            alert("already resolved");
                          }
                        }}
                      >
                        {row.status !== "resolved" ? (
                          <CheckCircleOutlineIcon />
                        ) : (
                          <CheckCircleIcon sx={{ color: green[500] }} />
                        )}
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <CircularProgress color="inherit" />
      )}
    </div>
  );
}
