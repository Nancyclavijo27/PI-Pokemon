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
    const allPoke = useSelector ((state)=>state.pokemons) // trae todo lo que esta en el estado 
    //para el paginado
    
    const [currentPage,setCurrentPage]= useState(1) //pagina actual
    const [pokesPerPage, setPokesPerPage] = useState(12)//cantidad de pokes por pagina
    const indexOfLastPoke= currentPage * pokesPerPage // calculo el indice del ultimo peke que se va a mostrar
    const indexOfFirstPoke=indexOfLastPoke- pokesPerPage // calculo el indice del primer poke que se va a mostrar
    const currentPokes=allPoke.slice(indexOfFirstPoke,indexOfLastPoke)// obtengo los pokes que se van a mostrar
    const [charge, setCharge] = useState(false);//para cuando busca por un pokemon que no tiene tipo entre los 40 traidos
    const [orden, setOrden]=useState("")// guardo el orden en el que se muestran los pokes
    
    
    //esta constante nos ayuda al renderizado
    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    const types =useSelector((state)=>state.types)

    useEffect(()=>{ //trae el estado cuando el componente se monta
      setCharge(true);
      setTimeout(() => {
        setCharge(false);
      }, 10000);
        dispatch( getPokes())// llamo a la action que me interesa
        dispatch((getTypes()))
    },[dispatch] )// [] para que no se ejecute cada vez que se renderiza el componente

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
      <h1 className="bounce ">Busca y conoce a tu mejor amigo</h1>
 <Link className="final"  to="/pokemon">Añadir nuevo pokemon</Link>
 <button  className="final" onClick={e=>{handleClick(e)}}>
    volver a cargar todos los pokemons
 </button>
<div className="div-filt">
          <div>
    <select className="name-filt" onChange={e=>handleSort(e)}>
        <option value= "All">Todos ABC</option>  
        <option value= "asc">De la A-Z</option>
        <option value= "desc">De la Z-A</option>                                   
    </select>
            <button className="btn-final">Order</button>
          </div>
          <div>
   <select className="name-filt" onChange={e=>handleFilter(e)}>
       <option value= "All">Todos origen</option>
       <option value= "created">Creados</option>
       <option value= "api">De la api</option>                               
   </select>
       <button className="btn-final" > Filter </button>
          </div>

          <div className="box">
          <select className="name-filt"  onChange={(e) => handleOrdenByStrength(e)} >
          <option value="All">Todos Fuerza </option>
          <option value="asc"> Max</option>
          <option value="desc"> Min</option>
        </select>
        <button className="btn-final" > Order </button> 
          </div>

          <div className="box">
        <select className="name-filt" onChange={(e)=>handleSelect(e)}>
         <option  value= "All">Tipos</option>
            {types.map((tem)=>(
         <option key={tem.id} value={tem.name}>{tem.name}</option>
                    ))}
        </select>
        <button className="btn-final" > Filter </button>
          </div>
        </div>
        <Paginado className='paginado'
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
              <h4>Ups! Pokemon no encontrado</h4>
              <h5>Intenta crear un nuevo pokemon</h5>
            </div>
          )}
        </div>


 </div>   
)}