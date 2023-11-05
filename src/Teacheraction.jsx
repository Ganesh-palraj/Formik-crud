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

  const validate = (values) => {
    let { avatar, name, teachingsubject, schoolname } = values;
    let errors = {};
    if (!avatar) {
      errors.avatar = "avatar is required";
    }
    if (!name) {
      errors.name = "Name is required";
    }
    if (!teachingsubject) {
      errors.teachingsubject = "Teaching subject is required";
    }
    if (!schoolname) {
      errors.schoolname = "schoolname is required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
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
        {formik.errors.avatar ? formik.errors.avatar : ""}

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

        {formik.errors.name ? formik.errors.name : ""}

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

        {formik.errors.teachingsubject ? formik.errors.teachingsubject : ""}

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
        {formik.errors.schoolname ? formik.errors.schoolname : ""}

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
