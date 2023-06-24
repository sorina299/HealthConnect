import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const deleteUser = async (userId) => {
    try {
      // Open the confirmation window
      const confirmDeletion = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (confirmDeletion) {
        dispatch(showLoading());

        // Send a DELETE request to delete the user
        const response = await axios.delete(
          `/api/admin/delete-user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        dispatch(hideLoading());

        if (response.data.success) {
          // Show a success message
          toast.success(response.data.message);

          // Refresh the users list
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
        }
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => dayjs(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <i
            class="ri-delete-bin-fill"
            onClick={() => deleteUser(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-title">Users List</h1>
      <hr />
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
}

export default UsersList;
