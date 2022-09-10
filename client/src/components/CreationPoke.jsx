import React, { useState,  useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPoke,getPokes,} from "../actions";
import Loader from "./Loader";
import { Link, useHistory } from "react-router-dom";

import "./CreationPoke.css";

function validate(input) {
  let error = {};
  let regexStats = /^[0-9_-]{1,2}$/;

  if (!input.name) {
    error.name = "Ingrese el nombre";
  } else if (input.name[0] === input.name[0].toLowerCase()) {
    error.name = "La primera letra debe estar en mayúsculas ";
  } else if (input.name.length <= 3 || input.name.length >= 10) {
    error.name = "El nombre debe contener de 3 a 10 caracteres";
  } else if (input.name.search(/^[a-zA-Z\s]*$/)) {
      error.name = "No se permiten números ni símbolos en el nombre";
  }
  if (input.hp < 0) {
    error.hp = "No se permiten números negativos";
    } else if (!regexStats.test(input.hp.trim())) {
      error.hp = "El campo HP solo acepta números del 0 al 100";
    }
    if (!input.strength<0) {
      error.strength = "No se permiten números negativos";
    } else if (!regexStats.test(input.strength.trim())) {
      error.strength = "El campo strength solo acepta números del 0 al 100";
    }
  
    if (!input.defense<0) {
      error.defense = "No se permiten números negativos";
    } else if (!regexStats.test(input.defense.trim())) {
      error.defense = "El campo defense solo acepta números del 0 al 100";
    }
    if (!input.height<0) {
      error.height = "No se permiten números negativos";
    } else if (!regexStats.test(input.height.trim())) {
      error.height = "El campo height solo acepta números del 0 al 100";
    }
    if (!input.speed<0) {
      error.speed = "No se permiten números negativos";
    } else if (!regexStats.test(input.speed.trim())) {
      error.speed = "El campo speed solo acepta números del 0 al 100";
    }
    if (!input.weight<0) {
      error.weight = "No se permiten números negativos";
    } else if (!regexStats.test(input.weight.trim())) {
      error.weight = "El campo weight solo acepta números del 0 al 100";
    }
  
    return error;
  }

export default function CreatePoke() {
  const dispatch = useDispatch();
  const allTypes = useSelector((e) => e.types);
  const allPokes = useSelector((e) => e.pokemons);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
 
  const [input, setInput] = useState({
    name: "",
    hp: "",
    strength: "",
    defense: "",
    height: "",
    speed: "",
    weight: "",
    types: [],
    img: "",
    createdDB: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokes());
  }, [dispatch]);

  
  function handleSubmit(e) {
    e.preventDefault();

    console.log(e.data);

     const a = allPokes.filter((b) => b.name === input.name);
     if(!input.name ||
      !input.name ||
      !input.hp ||
      !input.strength ||
      !input.defense ||
      !input.height ||
      !input.speed ||
      !input.weight ||
      !input.types
      ){
        return alert('Complete los campos vacios.')
      };
      if (a.length > 0) {
        return alert("Ya hay un pokemon con ese nombre, prueba otro");
      }
      

    dispatch(postPoke(input));
    alert("Juego creado!!")

    setInput({
      name: "",
      hp: "",
      strength: "",
      defense: "",
      height: "",
      speed: "",
      weight: "",
      types: [],
      img: "",
      
    });

    history.push("/home");
  }
 
  function handelChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(input);
  }


  function handleSelectTypes(e){//logica del select
    const { value } = e.target;
  if (input.types.includes(value))
    return alert("Ya has seleccionado ese tipo")
    if (input.types.length === 3) {
      alert("Solo se puede ingresar tres tipos!");
    } else if (input.types.length < 3) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      types: input.types.filter((temp) => temp !== e.target.value),
    });
  }

  return (
    <div key="form" className="formPerfil">
      <div key="up" className="up-things">
        <Link to="/home">
          <button key="up1" className="boton">
            Home
          </button>
        </Link>
      </div>
      <div key="up45">
        <h1 key="up2" className="titleForm">
          Create Pokémon
        </h1>
      </div>

      <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <p className="info">* : Requerido</p>
        <div key="name8">
          <label key="name" className="title5">
            *Name:
          </label>
          <input
            key="name2"
            type="text"
            name="name"
            placeholder="Poke Name"
            value={input.name}
            onChange={(e) => handelChange(e)}
            required
          />
           {errors.name && (
                        <p className="error">{errors.name}</p>
                     )}
        </div>
        <div key="strength8">
          <label key="Strength" className="title5">
            *Strength:
          </label>
          <input
            type="number"
            name="strength"
            key="strength2"
            placeholder="Strength"
            value={input.strength}
            onChange={(e) => handelChange(e)}
            required
          /> 
          {errors.strength && (
            <p className="error">{errors.strength}</p>
         )}
        </div>

        <div key="defense8">
          <label key="defense" className="title5">
            *Defense:
          </label>
          <input
            type="number"
            name="defense"
            key="defense2"
            placeholder="Defense"
            value={input.defense}
            onChange={(e) => handelChange(e)}
            required
          />
          {errors.defense && (
            <p className="error">{errors.defense}</p>
         )}
        </div>

        <div key="img8">
          <label key="image" name="img" className="title5">
            Image:
          </label>
          <input
            key="image2"
            name="img"
            value={input.img}
            placeholder="URL"
            onChange={(e) => handelChange(e)}
          ></input>
        </div>
        <div key="hp8">
          <label key="hp2" className="title5">
            *HP:
          </label>
          <input
            type="number"
            name="hp"
            key="hp3"
            placeholder="HP"
            value={input.hp}
            onChange={(e) => handelChange(e)}
            required
          />
          {errors.hp && (
            <p className="error">{errors.hp}</p>
         )}
        </div>
        <div key="height8">
          <label key="height2" className="title5">
            *Height:
          </label>
          <input
            type="number"
            name="height"
            key="height3"
            placeholder="Height"
            value={input.height}
            onChange={(e) => handelChange(e)}
            required
          />
          {errors.height && (
            <p className="error">{errors.height}</p>
         )}
        </div>
        <div key="weight8">
          <label key="weight2" className="title5">
            *Weight:
          </label>
          <input
            type="number"
            name="weight"
            key="weight3"
            placeholder="Weight"
            value={input.weight}
            onChange={(e) => handelChange(e)}
            required
          />
          {errors.weight && (
            <p className="error">{errors.weight}</p>
         )}
        </div>
        <div key="speed8">
          <label key="speed2" className="title5">
            *Speed:
          </label>
          <input
            type="number"
            name="speed"
            key="speed3"
            placeholder="Speed"
            value={input.speed}
            onChange={(e) => handelChange(e)}
            required
          />
          {errors.speed && (
            <p className="error">{errors.speed}</p>
         )}
        </div>
        <div>
            <label>*Types</label>
            <select  className="thisInput" onChange={(e) => handleSelectTypes(e)}>
              <option value="all">All</option>
              {allTypes?.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            {errors.types && <span className="red">{errors.types}</span>}
          </div>
          <div className="selected">
            {input.types?.map((e) => {
              return (
                <>
                  <div>{e}</div>
                  <button onClick={() => handleDelete(e)}>X</button>
                </>
              );
            })}{" "}
          </div>
        <div key="button8">
        <button  type="submit" disabled={Object.keys(errors).length}>
          Crear Pokemon
        </button>     
        </div>
        {loading && <Loader />}
      
      </form>
    </div>
  );
}