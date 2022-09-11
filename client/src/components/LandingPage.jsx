import React from "react";
import {Link} from "react-router-dom"
import "./LandingPage.css";


//pagina inicial,  boton para ingresar

export default function LandingPage() {
    return (
      <div className="container">
        <div className="textContainer">
          <div className="bounce">
            <h1 className="h1">Bienvenido a mi PI de </h1>
            <span className="letter">P</span>
            <span className="letter">O</span>
            <span className="letter">K</span>
            <span className="letter">E</span>
            <span className="letter">M</span>
            <span className="letter">O</span>
            <span className="letter">N</span>
            <span className="invisibleLetter">' '</span>
            <Link to='/home'>
            <button className="butLanding">INGRESAR</button>
            </Link>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    );
  }