import React, { Component } from "react";
import CSVReader from "react-csv-reader";
// import "./App.css";
import Loader from "./Loader";
// import CsvError from "./components/csvError";
// import Table from "./components/table";

class Load extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false, 
      error: false,
    };
  }

  // :::::::: CSV parser ::::::::::
  papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };
  //::::::::::::::::::::::::::::::::

  //::::::::: for putting all data in CSV to MySQL :::::::::::
  handleForce = (data, fileInfo) => {
    this.setState({ loading: true });
    // console.log(data)

    let d = JSON.stringify({ ...data });



    fetch("http://localhost:3001/api/load", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: d,
    })
      .then((response) => {
        this.setState({ loading: false })
        return response.json();
        // if (response.ok) {
        //   return response.json();
        // } else {
        //   throw new Error("Something went wrong");
        // }
      })
      .then((responseJson) => {
        console.log(responseJson);
      })
      // .catch((error) => {
      //   this.setState({ error: true });
      //   console.log(error, this.state);
      // });
  };
  //:::::::::::::::: End of POST call to save data ::::::::::::::



  

  render() {
    if (this.state.loading) return <Loader />;
    // if (this.state.error) return <CsvError />;
    return (
      <div className="wrapper">
        <div className="section1">
          <div className="container">
                <CSVReader
                  cssClass="react-csv-input"
                  label="Select CSV  :"
                  onFileLoaded={this.handleForce}
                  parserOptions={this.papaparseOptions}
                />     
          </div>
        </div>

        {/* <div className="section2">
          
          <button className="button" onClick={this.loadClickHandler}>
            <span>Load Table </span>
          </button>

        </div> */}
      </div>
    );
  }
}

export default Load;