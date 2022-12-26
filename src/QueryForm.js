import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { serverUrl } from "./App";


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label
        className="text-left px-1 text-xl"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="text-xl" htmlFor={props.id || props.name}>
        {label}
      </label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

// And now we can use these
export default function QueryForm() {

const user = window.localStorage.getItem('user')

  async function handleSubmit(values) {
    const submit = await axios
      .post(
        `${serverUrl}/issue`,

        values
      )
      .then((response) => alert("Issue submitted successfully")).catch((error)=>{alert(error)});
      console.log(submit)
  }
  return (
    <div>
      <h1 className="text-3xl">Submit Issue!</h1>
      <Formik
        initialValues={{
          name: user,         

          issueType: "", // added for our select

          issueTitle: "",

          issueDescription: "",
        }}
        validationSchema={Yup.object({         

          issueType: Yup.string()

            .oneOf(
              ["maintainance", "hygeine", "electrical", "other"],

              "Invalid Job Type"
            )

            .required("Required"),

          issueTitle: Yup.string().required("Required"),

          issueDescription: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting,resetForm}) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
          handleSubmit(values).then(resetForm())
        }}
      >
        <Form className="flex flex-col m-2 gap-2 border-4 border-black rounded-lg p-2">
          <MyTextInput
            className="border-2 rounded-lg p-1"
            label="Name"
            name="name"
            type="text"
            value={user}
            readonly
          />
        
          <hr className="border-2 border-black m-4" />

          <MySelect label="Issue Type: " name="issueType">
            <option value="">Select a job type</option>

            <option value="maintainance">Maintainance</option>

            <option value="hygeine">Hygeine</option>

            <option value="electrical">Electrical</option>

            <option value="other">Other</option>
          </MySelect>

          <MyTextInput
            className="border-2 rounded-lg p-1"
            label="Issue Title"
            name="issueTitle"
            type="text"
            placeholder="Title"
          />

          <MyTextArea
            className="border-2 rounded-lg p-1"
            name="issueDescription"
            type="text"
            placeholder="Description"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
