import React, { useState } from "react";
import Profil from './onglet/Profil';
import "./pmp.css";

const Tabs = props => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = props.children[activeTabIndex];
  return (
    <div>
      <div className="tabs">
        {props.children.map((tab, i) => (
          <button
            className="tab-btn"
            onClick={() => {
              setActiveTabIndex(i);
            }}
            key={i}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tab-indicator-container">
        <div
          className="tab-indicator"
          style={{
            width: 100 / props.children.length + "%",
            transform: `translateX(${activeTabIndex * 100}%)`
          }}
        />
      </div>
      <div className="tab-content">{activeTab.props.children}</div>
    </div>
  );
};

export default function Pmp({dataDiagMod,handleChangeMod,dataDiag,selected,handleClick}) {
  return (
    <div className="App">
      <Tabs>
        <div title="Profil et situation">
            <Profil 
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag}
            selected={selected}
            handleClick={handleClick}
        />
        </div>
        <div title="Projet professionnel">
          Phasellus vel nisi lectus. Curabitur ac efficitur quam. Aliquam
          faucibus, nibh non auctor auctor, lectus leo cursus massa, ac ornare
          dolor ante eu libero.{" "}
        </div>
        <div title="Marché du travail, environnement professionnel">
          Aliquam erat volutpat. Sed id pulvinar magna. Aenean scelerisque ex
          vitae faucibus faucibus. Proin rutrum est eget odio faucibus tempor.
          Nulla ut tellus non urna congue finibus.{" "}
        </div>
      </Tabs>
    </div>
  );
}