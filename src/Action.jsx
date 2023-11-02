import React, { useEffect, useState, useContext } from "react";
import { Input, Button } from "reactstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Context from "./Context";
import { useFormik } from "formik";

const Action = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      avatar: "",
      rollno: "",
      schoolname: "",
    },
    onSubmit: (values) => {
      contextData.addOrUpdateStudents({ id, values });
      formik.resetForm;
    },
  });

  const contextData = useContext(Context);

  const nav = useNavigate();

  const { id } = useParams();

  const { state } = useLocation();

  useEffect(() => {
    if (id) {
      fetch("https://653e77be9e8bd3be29df5758.mockapi.io/student/" + id)
        .then((data) => data.json())

        .then((res) => formik.setValues(res));
    }
  }, [id]);

  return (
    <>
      <form>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          disabled={state.isView === "true" ? true : false}
        />

        <label htmlFor="name">Image</label>
        <Input
          type="text"
          name="avatar"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          disabled={state.isView === "true" ? true : false}
        />

        <label htmlFor="name">Description</label>
        <Input
          type="text"
          name="rollno"
          value={formik.values.rollno}
          onChange={formik.handleChange}
          disabled={state.isView === "true" ? true : false}
        />

        <label htmlFor="name">Job Title</label>
        <Input
          type="text"
          name="schoolname"
          value={formik.values.schoolname}
          onChange={formik.handleChange}
          disabled={state.isView === "true" ? true : false}
        />

        <Button
          type="submit"
          color="success"
          className="actionButton"
          onClick={formik.handleSubmit}
          disabled={state.isView === "true" ? true : false}
        >
          submit{" "}
        </Button>

        <Button color="danger" className="actionButton" onClick={() => nav(-1)}>
          cancel
        </Button>
      </form>
    </>
  );
};

export default Action;
