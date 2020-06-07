import React, { useState } from "react";
import * as d3 from "d3";
import PieSVG from "./PieSVG";


function JalonPie() {
  const generateData = (value, length = 5) =>
    d3.range(length).map((index) => ({
      date: index,
      value: Math.random() * 100
    }));

  const [data, setData] = useState(generateData(0));
  const changeData = () => {
    setData(generateData());
  };


  return (
    <div className="App">
      <div>
        <button onClick={changeData}>Transform</button>
      </div>
      
      <div>
        <PieSVG
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
      
    </div>
  );
}

export default JalonPie;