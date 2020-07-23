import React from "react";
import PieSVG from "./PieSVG";


function JalonPie({data}) {
  

  return (
    <div className="App">
      <div>
        <PieSVG
          data={data}
          width={250}
          height={250}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
      
    </div>
  );
}

export default JalonPie;