/** @format */

import React from "react";
import useForm from "../Hooks/useForm";
import "./Form.css";

const Form = () => {
  //submit function for this form this function will be the callback for the submit function

  //you will pass this custom function in the hook
  const formLogin = () => {
    console.log("callback function will be submitted");
    console.log("Form Value", values);
  };

  //custom hook call
  //deconstrcting the handlechange method from the useForm hook
  const { handleChange, values, errors, handleSubmit } = useForm(formLogin);

  return (
    //we have to connect the handlechange method to the form to be precisce the inputs
    <div className='formu'>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
        />
        {/* first we will check if there is an email property inside the errors  and then we will display it*/}
        {errors.email && <h3>{errors.email}</h3>}
        <input
          type='password'
          name='password'
          placeholder='password'
          onChange={handleChange}
        />
        {errors.password && <h3>{errors.password}</h3>}
        <input
          type='text'
          name='username'
          placeholder='username'
          onChange={handleChange}
        />
        {errors.username && <h3>{errors.username}</h3>}
        <input type='submit' value='submit' className='submit' />
      </form>
    </div>
  );
};

export default Form;
