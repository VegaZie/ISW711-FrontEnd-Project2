import React from 'react';
import "./formInput.scss";

const formInput = ({ type, label, value, onChange, required }) => {
  return (
    <div className="form-input">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default formInput;