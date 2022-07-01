import { useState, useEffect } from "react";

import axios from "axios";
import {
  CREATE_USERS_ERROR,
  CREATE_USERS_PENDING,
  CREATE_USERS_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
  USERS_PENDING,
  USERS_SUCCESS,
  USER_ERROR,
  USER_PENDING,
  USER_SUCCESS,
} from "../utils/const";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState({
    getUsers: USERS_PENDING,
  });

  /** GET USERS */
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(`/api/users/`);
        setUsers(data);
        setLoading({ ...loading, getUsers: USERS_SUCCESS });
      } catch (err) {
        console.log("KO::USERS", err);
      }
    };
    getUsers();
  }, []);

  /** GET USER */
  const getUser = async (id) => {
    setLoading({ ...loading, getUser: USER_PENDING });
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      setUser(data);
      setLoading({ ...loading, getUser: USER_SUCCESS });
    } catch (error) {
      setLoading({ ...loading, getUser: USER_ERROR });
    }
  };

  /** CREATE USER */
  const createUser = async (user) => {
    setLoading({ ...loading, createUser: CREATE_USERS_PENDING });
    const { name, lastName, email, phoneNumber, cc } = user;
    try {
      const { data } = await axios.post(`/api/users/`, {
        name,
        lastName,
        email,
        cc,
        phoneNumber,
      });

      setLoading({
        ...loading,
        createUser: CREATE_USERS_SUCCESS,
        message: data.message,
        severity: "success",
      });
      setUsers([data.newUser, ...users]);
    } catch (error) {
      let { message } = error;
      if (error?.response?.status === 409) {
        message = "Esta cuenta ya existe, por lo que no se puede crear.";
      }
      setLoading({
        ...loading,
        createUser: CREATE_USERS_ERROR,
        message,
        severity: "error",
      });
    }
  };

  /** UPDATE USER */
  const updateUser = async (user, id) => {
    setLoading({ ...loading, updateUser: UPDATE_USER_PENDING });
    const { name, lastName, email, phoneNumber, cc } = user;
    try {
      const { data } = await axios.patch(`/api/users/${id}`, {
        name,
        lastName,
        email,
        cc,
        phoneNumber,
      });

      setLoading({
        ...loading,
        updateUser: UPDATE_USER_SUCCESS,
        message: data.message,
        severity: "success",
      });
      setUsers(users.map((item) => (item.id === id ? data.data : item)));
    } catch (error) {
      let { message } = error;

      setLoading({
        ...loading,
        updateUser: UPDATE_USER_ERROR,
        message,
        severity: "error",
      });
    }
  };
  /** DELETE USER */
  const deleteUser = async (id) => {
    setLoading({ ...loading, removeUser: DELETE_USER_PENDING });
    try {
      const { data } = await axios.delete(`/api/users/${id}`);
      setUsers(users.filter((item) => item.id !== id));
      setLoading({
        ...loading,
        removeUser: DELETE_USER_SUCCESS,
        message: data.message,
        severity: "success",
      });
    } catch (error) {
      let { message } = error;
      setLoading({
        ...loading,
        removeUser: DELETE_USER_ERROR,
        message,
        severity: "error",
      });
    }
  };
  return {
    users,
    createUser,
    loading,
    setLoading,
    deleteUser,
    getUser,
    user,
    setUser,
    updateUser,
  };
};

export default useUsers;
