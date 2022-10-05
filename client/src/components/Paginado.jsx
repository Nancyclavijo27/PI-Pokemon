import React from "react";
import "./Paginado.css";

export default function Paginado({ pokesPerPage, allPoke, paginado, currentPage,}) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allPoke / pokesPerPage) - 1; i++) {
    pageNumbers.push(i + 1);
  }

  

  return (
    <nav className="paginated">
        <ul className="paginated li">
            <button className={ currentPage === 1 ? "disabled" : "enabled" } disabled={currentPage === 1 ? true : false} onClick={() => paginado(currentPage - 1)}>
            Prev/Pag
            </button>
            {pageNumbers && 
            pageNumbers.map(number =>(        
               <button className="num" onClick = { () => paginado(number)} key={number}>{number}</button>    
            )) }
           <button  className={ currentPage === pageNumbers.length ? "disabled" : "enabled" } disabled={currentPage === pageNumbers.length ? true : false} onClick={() => paginado(currentPage + 1)}>
           Next/Pag
            </button>
        </ul>
    </nav>
    )
}
