import React , {createContext, useState} from 'react';


export const NavContext = createContext();

const NavContextProvider = (props) => {

    const [open, setOpen] = useState(true);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


    return  (
        <NavContext.Provider value={{ open,handleDrawerOpen,handleDrawerClose }}>
            {props.children}
        </NavContext.Provider>
    )
}

export default NavContextProvider;





