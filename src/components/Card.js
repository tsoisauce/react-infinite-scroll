import React from "react";

const Card = props => {
  const { email, name, body } = props.item;
  return (
    <div className="card">
      <div className="info">
        <div className="email">{email}</div>
        <div className="name">{name}</div>
        <div className="comment">{body}</div>
      </div>
    </div>
  );
};

export default Card;
