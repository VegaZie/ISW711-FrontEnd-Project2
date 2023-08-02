import React from 'react';
import view from "../../assets/icons/view.png";
import edit from "../../assets/icons/edit.png";
import deleteI from "../../assets/icons/delete.png";

import PropTypes from "prop-types";

import "./button.scss";

const Button = ({ children, onClick, icon }) => {
  const renderIcon = () => {
    if (icon === "view") {
      return <img src={view} alt="View Icon" className="button__icon" />;
    } else if (icon === "edit") {
      return <img src={edit} alt="Edit Icon" className="button__icon" />;
    } else if (icon === "delete") {
      return <img src={deleteI} alt="Delete Icon" className="button__icon" />;
    }
  };

  return (
    <button className="button" onClick={onClick}>
      {icon && renderIcon()}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.oneOf(["view", "edit", "delete"]),
};

Button.defaultProps = {
  onClick: () => {},
  icon: null,
};

export default Button;
