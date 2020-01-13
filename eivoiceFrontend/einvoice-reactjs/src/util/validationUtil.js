import React from "react";
import validator from "validator";

export const required = (value) => {
    if(!value.toString().trim().length) return (<small className="text-danger">Required</small>)
};

export const email = (value) => {
    if(!validator.isEmail(value)) return (<small>{value} is not a valid email.</small>)
};

export const lt = (value, props) => {
    if(!value.toString().trim().length > props.maxLength) return <small>The value exceeded {props.maxLength} symbols</small>
};

export const password = (value, props, components) => {
    if(value !== components['confirm'][0].value) return <small>Passwords are not equals</small>
};




