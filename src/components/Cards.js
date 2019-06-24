import React from "react";

const Card = props => {
  return (
    <div className="cards">
      {props.items.map(item => (
        <div key={item.id} className="card">
          <div className="info">
            <div className="email">{item.email}</div>
            <div className="name">{item.name}</div>
            <div className="comment">{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;