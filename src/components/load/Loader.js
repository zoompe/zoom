import React from 'react';
// import "./loader.css";

const Loader = () => {
  return (
    <div className="loader center" >
      <i className="fa fa-cog fa-spin" />
        <div className="loadingmessge center">
          <br/>
          Large File might take sometime <br/>
          Please Wait... 
        </div>
    </div>

  );
}

export default Loader;