import React from "react";
import Onglet from './onglet/Onglet';
import "./pmp.css";


export default function Freins({dataDiagMod,handleChangeMod,dataDiag1,selected,handleClick,choice}) {
  return (
    <div className="App">
     
            <Onglet 
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag1}
            selected={selected}
            handleClick={handleClick}
            choice={choice}
        />
    </div>
      
  );
}