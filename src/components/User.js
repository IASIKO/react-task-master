import React from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";

const User = (props) => {
  const navigate = useNavigate();

  return (
    <div className="user" onClick={() => navigate(`/user/${props.id}`)}>
      <div className="listContainer">
        <img
          src={`${props.imageUrl}?v=${props.id}`}
          alt={`${props.name} ${props.lastName}`}
        />
        <div className="description">
          <strong>{`${props.prefix} ${props.name} ${props.lastName}`}</strong>
        </div>
        <div className="description">{props.title}</div>
      </div>
    </div>
  );
};

export default User;
