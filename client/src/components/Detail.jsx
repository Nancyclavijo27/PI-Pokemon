import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, resState } from "../actions";
import Loader from "./Loader";
import "./Detail.css";


export default function Detail() {
  const { id } = useParams();
  const pokeDetail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  console.log(pokeDetail);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(resState());
    };
  }, [dispatch, id]);

  if (Object.keys(pokeDetail).length === 0) {
    console.log(pokeDetail.types);

    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-10rem",
          marginLeft: "3rem",
        }}
      >
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="cardDetalle">
        <div>
          <Link to="/home">
            <button className="botonDetails" onClick={resState}>
              Home
            </button>
          </Link>
        </div>
        <div>
          <img
            
            src={pokeDetail[0].img }
            alt={pokeDetail[0].name}
            width="200px"
            height="200px"
          />
        </div>

        <div>
          <div className="base1">
            <h1>{pokeDetail[0].name.toUpperCase()}</h1>
          </div>
          <div className="base2">
            <h1>
              Types:{" "}
              {pokeDetail[0].types.map((e) => {
                return (
                  <p key={e}>{e.charAt(0).toUpperCase() + e.slice(1) + " "}</p>
                );
              })}
            </h1>
          </div>
          <div className="base3">
            <h2>HP: {pokeDetail[0].hp}</h2>
          </div>
          <div className="base3">
            <h2>Speed: {pokeDetail[0].speed}</h2>
          </div>
          <div className="base3">
            <h2>Height: {pokeDetail[0].height}</h2>
          </div>
          <div className="base3">
            <h2>Weight: {pokeDetail[0].weight} </h2>
          </div>
          <div className="base3">
            <h2>Defense: {pokeDetail[0].defense}</h2>
          </div>
        </div>
      </div>
    );
  }
}