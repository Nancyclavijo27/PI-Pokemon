import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";


export default function Card({ id, types, name, img, strength }) {
  return (
    <div className="card">
      <div className="card-details">
        <div className="img-game">
          <img
            src={img}
            alt={name}
            height="150px"
            width="150px"
          />
        </div>
        <h3 className="text-title">{name.toUpperCase()}</h3>
        <p>strength: {strength}</p>
        <p>
          Types:{" "}
          {types.map((e) => " " + e.charAt(0).toUpperCase() + e.slice(1) + " ")}
        </p>
      </div>
      <Link className="por" to={`/pokemons/${id}`}>
        <button className="card-button">More info</button>
      </Link>
    </div>
  );
}