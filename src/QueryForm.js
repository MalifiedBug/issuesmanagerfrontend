import React, { useState } from "react";
import { Formik, Form, useField, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { serverUrl } from "./App";
import { useEffect } from "react";

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

const MyTextInput1 = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <>
      <label
        className="text-left px-1 text-xl"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        setValue={(e) => e.target.value}
        className="text-input"
        {...field}
        {...props}
      />
      {meta.error ? (
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

export default function QueryForm() {
  const [user, setUser] = useState(window.localStorage.getItem("user"));
  const admin = window.localStorage.getItem("admin") === "true";
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [newUser, setNewUser] = useState("");



  async function handleSubmit(values) {
    console.log(values)
    await axios
      .post(`${serverUrl}/issue`, values)
      .then((response) => alert("Issue submitted successfully"))
      .catch((error) => {
        alert(error);
      });
      
  }

  useEffect(() => {
    (async () => {
      await axios.get(`${serverUrl}/uniqueusers`).then((response) => {
        setUniqueUsers(response.data.users);
        console.log(response.data);
      });
    })();
  }, []); 

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl m-2">Submit Issue!</h1>
      {admin ? (
        <div>
          <label className="font-semibold" for="users">
            Submit Query on behalf of:
          </label>
          <select
            value={user}
            className="rounded-lg p-1 m-1"
            id="users"
            onChange={(e) => {
              setUser(e.target.value);
            }}
          >
            {uniqueUsers.map((u, index) => (
              <option key={index} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <Formik
        initialValues={{
          name:user,   

          issueType: "", // added for our select

          issueTitle: "",

          issueDescription: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),

          issueType: Yup.string()

            .oneOf(
              ["Maintainance", "Hygeine", "Electrical", "Other"],

              "Invalid Job Type"
            )

            .required("Required"),

          issueTitle: Yup.string().required("Required"),

          issueDescription: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(JSON.stringify({...values,name:user}));
          console.log(user);
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
          // method used in handle submit is used to update the values - Arun Kumar sir.
          handleSubmit({...values,name:user}).then(resetForm());          
        }}
      >
        
          <Form className="flex flex-col m-2 gap-2 border-4 border-black rounded-lg p-2 bg-slate-200 self-center lg:w-1/4">
            
            <MyTextInput1
              className="border-2 rounded-lg p-1"
              label="Name"
              name="name"
              type="text"
              value={user}
            />

            <hr className="border-2 border-black m-4" />

            <MySelect
              className="rounded-lg p-1 m-1"
              label="Issue Type: "
              name="issueType"
            >
              <option value="">Select a job type</option>

              <option value="Maintainance">Maintainance</option>

              <option value="Hygeine">Hygeine</option>

              <option value="Electrical">Electrical</option>

              <option value="Other">Other</option>
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
