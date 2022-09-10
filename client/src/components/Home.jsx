import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPokes, getTypes, filterCreated, handlerTypes, ordenByName, ordenByStrength } from "../actions";
import {Link} from "react-router-dom"
//importo los componentes que voy a usar
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css";


export default function Home(){

    const dispatch = useDispatch() 
    const allPoke = useSelector ((state)=>state.pokemons) // trae todo lo que esta en el estado dogs
    //para el paginado
    
    const [currentPage,setCurrentPage]= useState(1)
    const [pokesPerPage, setPokesPerPage] = useState(12)
    const indexOfLastPoke= currentPage * pokesPerPage
    const indexOfFirstPoke=indexOfLastPoke- pokesPerPage
    const currentPokes=allPoke.slice(indexOfFirstPoke,indexOfLastPoke)
    
    const [orden, setOrden]=useState("")//ayuda a renderizar estado local que arranca vacio
    
    //esta constante nos ayuda al renderizado
    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    const types =useSelector((state)=>state.types)

    useEffect(()=>{ //trae el estado cuando el componente se monta
        dispatch( getPokes())
        dispatch((getTypes()))
    },[dispatch] )

    // recetea lo que se despacha funcion preventiva
function handleClick(e){
    e.preventDefault();
    dispatch(getPokes());//despacho la accion
   }
   function handleSelect(e){//logica del select
    e.preventDefault(e);
    dispatch(handlerTypes(e.target.value))
    setCurrentPage(1);//para que inicie en la pagina 1
    setOrden(`Ordenado ${e.target.value}`)

}

function handleFilter(e){
  e.preventDefault(e);
  dispatch(filterCreated(e.target.value))
  setCurrentPage(1);//para que inicie en la pagina 1
  setOrden(`Ordenado ${e.target.value}`)

}
function handleSort(e){//ordenamiento a-z
  e.preventDefault();
  dispatch(ordenByName(e.target.value))
  setCurrentPage(1);//para que inicie en la pagina 1
  setOrden(`Ordenado ${e.target.value}`)//modifica el estado local y se renderiza
  
}

function handleOrdenByStrength(e) {
  e.preventDefault();
  dispatch(ordenByStrength(e.target.value));
  setCurrentPage(1);
  setOrden(`Ordenado ${e.target.value}`);
}

   

   //renderizar
//select para mis filtros
//option value es una istruccion dependiendo su valor toma una accion - siempre el value debe ser igual al de la api
return (
    <div className="home-container">
 <Link   to="/pokemon">Añadir nuevo pokemon</Link>
 <h1>Busca y conoce a tu mejor amigo</h1>
 <button  className="btn" onClick={e=>{handleClick(e)}}>
    volver a cargar todos los pokemons
 </button>
<div className="div-filt">
          <div>
    <select className="selec" onChange={e=>handleSort(e)}>
        <option value= "All">Todos</option>  
        <option value= "asc">De la A-Z</option>
        <option value= "desc">De la Z-A</option>                                   
    </select>
            <button className="btn-final">Order</button>
          </div>
          <div>
   <select className="selec" onChange={e=>handleFilter(e)}>
       <option value= "All">Todos</option>
       <option value= "created">Creados</option>
       <option value= "api">De la api</option>                               
   </select>
       <button className="btn-final" > Filter </button>
          </div>

          <div className="box">
          <select className="selec"  onChange={(e) => handleOrdenByStrength(e)} >
          <option value="All">Todos </option>
          <option value="min"> Min</option>
          <option value="max"> Max</option>
        </select>
        <button className="btn-final" > Order </button> 
          </div>

          <div className="box">
        <select className="selec" onChange={(e)=>handleSelect(e)}>
         <option  value= "All">Types</option>
            {types.map((tem)=>(
         <option key={tem.id} value={tem.name}>{tem.name}</option>
                    ))}
        </select>
        <button className="btn-final" > Filter </button>
          </div>
        </div>
        <Paginado
          pokesPerPage={pokesPerPage}
          allPoke={allPoke?.length}
          paginado={paginado}
          currentPage={currentPage}
        />
         <SearchBar  setCurrentPage={setCurrentPage}/>
        <div className="card-poke">
         
           {currentPokes.length ? (
            currentPokes.map((d) => {
              return (
                <Card
                  key={d.id}
                  id={d.id}
                  name={d.name}
                  img={d.img}
                  types={d.types}
                  strength={d.strength}
                />
              );
            })
          ) : (
            <div className="div-not-found">
              <h4>Ups! Pokémon not found</h4>
              <h5>Try creating a new pokémon</h5>
            </div>
          )}
        </div>


 </div>   
)}