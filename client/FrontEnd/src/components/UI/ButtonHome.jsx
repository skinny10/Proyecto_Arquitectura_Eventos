
import React from 'react';
import "../../Style/Home.css"

function ButtonHome({ name, onClick, text }) {
  return (
    <button className="button-home" name={name} onClick={onClick}>
      {text}
    </button>
  );
}

export default ButtonHome;
