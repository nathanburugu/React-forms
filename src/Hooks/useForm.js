/** @format */

import React, { useState } from "react";
import { omit } from "lodash";

const useForm = (callback) => {
  //fisrt we create a state to store all the inputs and we initialize it with an empty object
  const [values, setValues] = useState({});
  //we also need a state to store errors
  const [errors, setErrors] = useState({});

  //method to validate this form values this function will take in 3 argumenst
  const validate = (event, name, value) => {
    switch (name) {
      case "username":
        if (value.length <= 4) {
          //we will set the error state

          setErrors({
            ...errors,
            username: "Username should atleast have 5 letters",
          });
        } else {
          //set the error state empty or remove the error for username input
          //to remove username error from the error state we first have to store the state in a different variable
          //the omit function removes/omits the value from given object and returns a new object it takes in two arguments first is the object then secon argument is the key value of the object which you want to remove
          let newObj = omit(errors, "username");
          setErrors(newObj);
        }
        break;

      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Email entered is invalid",
          });
        } else {
          let newObj = omit(errors, "emails");
          setErrors(newObj);
        }
        break;

      case "password":
        if (
          !new RegExp(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "Password shoub be 8 characters long and contain uppercase,lowercase,",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
    // Afunction to validate each input values
  };

  //method to handle the form inputs
  //this method takes event as an argument
  const handleChange = (event) => {
    //event.persist method clears event defualt events if they is any
    event.persist();

    //the name will be the name of the target element and the val will be the value of the target element
    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);
    //   lets set this values in the state
    setValues({
      //first we copy all the old values using a spread opperator
      ...values,
      //then we add the new value as a key value pair
      [name]: val,
    });
  };

  //the submit function
  const handleSubmit = (event) => {
    //we use preventdefault to handle the defult submission of the form
    if (event) event.preventDefault();
    //if the length of the object is zero then call the callback
    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      alert("there is an error with either your email, password or username");
    }
  };

  //we are going to use this states so we are going to add thrm to the return
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
