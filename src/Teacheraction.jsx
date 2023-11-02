import React, { useEffect, useState, useContext } from "react";
import { Input, Button } from "reactstrap";
import Context from "./Context";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

const Teacheraction = () => {
  const contextData = useContext(Context);

  const initialValues = {
    avatar: "",
    name: "",
    teachingsubject: "",
    schoolname: "",
  };

  const onSubmit = (values) => {
    contextData.addOrUpdateTeachers({
      values,
      id,
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const nav = useNavigate();

  const { id } = useParams();

  const { state } = useLocation();

  useEffect(() => {
    if (id) {
      fetch("https://653e77be9e8bd3be29df5758.mockapi.io/teacher/" + id)
        .then((data) => data.json())

        .then((res) => formik.setValues(res));
    }
  }, [id]);

  return (
    <>
      <form>
        <label htmlFor="image">Avatar</label>
        <Input
          type="text"
          name="avatar"
          id="image"
          autoComplete="image"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          disabled={state.isView === "true" ? true : false}
        />

        <label htmlFor="name">Name</label>
        <Input
          type="text"
          name="name"
          autoComplete="name"
          id="name"
          value={formik.values.name}
          disabled={state.isView === "true" ? true : false}
          onChange={formik.handleChange}
        />

        <label htmlFor="teachingsubject">Subject</label>
        <Input
          type="text"
          name="teachingsubject"
          autoComplete="image"
          id="teachingsubject"
          value={formik.values.teachingsubject}
          onChange={formik.handleChange}
          disabled={state.isView === "true" ? true : false}
        />

        <label htmlFor="schoolname">School name</label>
        <Input
          type="text"
          name="schoolname"
          autoComplete="image"
          id="schoolname"
          value={formik.values.schoolname}
          onChange={formik.handleChange}
          disabled={state.isView === "true" ? true : false}
        />

        <Button
          color="success"
          type="submit"
          className="actionButton"
          id="teachersubmit"
          onClick={formik.handleSubmit}
          disabled={state.isView === "true" ? true : false}
        >
          submit{" "}
        </Button>

        <Button
          color="danger"
          id="teachercancel"
          className="actionButton"
          onClick={() => nav(-1)}
        >
          cancel
        </Button>
      </form>
    </>
  );
};

export default Teacheraction;