import React, { useState, useEffect } from "react";
import Context from "./Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Provider(props) {
  const [teachersData, setTeachersData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const nav = useNavigate();

  const getStudents = async () => {
    try {
      const response = await axios.get(
        "https://653e77be9e8bd3be29df5758.mockapi.io/student"
      );
      console.log(response.data);
      setUsersData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeachers = async () => {
    try {
      const response = await axios.get(
        "https://653e77be9e8bd3be29df5758.mockapi.io/teacher"
      );
      console.log(response.data);
      setTeachersData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
    getTeachers();
  }, []);

  const addOrUpdateStudents = ({ values, id }) => {
    if (id) {
      axios
        .put(
          "https://653e77be9e8bd3be29df5758.mockapi.io/student/" + id,
          values
        )
        .then((res) => {
          getStudents();
        });
      nav(-1);
    } else {
      axios
        .post(
          "https://653e77be9e8bd3be29df5758.mockapi.io/student/",
          values
        )
        .then((res) => {
          getStudents();
          // setFormValues(initialFormValues);/
        });

      nav(-1);
    }
  };

  const deletingStudentData = ({ id }) => {
    axios
      .delete("https://653e77be9e8bd3be29df5758.mockapi.io/student/" + id)
      .then((res) => {
        getStudents();
      });
  };

  const addOrUpdateTeachers = ({
   values , id 
  }) => {
    if (id) {
      axios
        .put(
          "https://653e77be9e8bd3be29df5758.mockapi.io/teacher/" + id,
          values
        )
        .then((res) => {
          getTeachers();
        });
      nav(-1);
    } else {
      axios
        .post(
          "https://653e77be9e8bd3be29df5758.mockapi.io/teacher/",
          values
        )
        .then((res) => {
          getTeachers();
          
        });

      nav(-1);
    }
  };

  const deletingTeacherData = ({ id }) => {
    axios
      .delete("https://653e77be9e8bd3be29df5758.mockapi.io/teacher/" + id)
      .then((res) => {
        getTeachers();
      });
  };

  return (
    <Context.Provider
      value={{
        usersData,
        setUsersData,
        teachersData,
        setTeachersData,
        addOrUpdateStudents,
        deletingStudentData,
        addOrUpdateTeachers,
        deletingTeacherData,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Provider;
