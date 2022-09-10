import React from "react";
import "./Paginado.css";

export default function Paginado({
  pokesPerPage,
  allPoke,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allPoke / pokesPerPage) - 1; i++) {
    pageNumbers.push(i + 1);
  }

  

  return (
    <nav className="paginado">
        <ul className="paginado">
            <button className={ currentPage === 1 ? "disabled" : "enabled" } disabled={currentPage === 1 ? true : false} onClick={() => paginado(currentPage - 1)}>
                Prev
            </button>
            {pageNumbers && 
            pageNumbers.map(number =>(        
               <button onClick = { () => paginado(number)} key={number}>{number}</button>    
            )) }
           <button className={ currentPage === pageNumbers.length ? "disabled" : "enabled" } disabled={currentPage === pageNumbers.length ? true : false} onClick={() => paginado(currentPage + 1)}>
                Next
            </button>
        </ul>
    </nav>
    )
}
