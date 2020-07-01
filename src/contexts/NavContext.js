import React , {createContext, useState} from 'react';


export const NavContext = createContext();

const NavContextProvider = (props) => {

    const [open, setOpen] = useState(true);
    const [show, setShow] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setShow(false);
    setOpen(true);
  }

  const handleShow = () => {
    setShow(true);
    setOpen(false);
  }


    return  (
        <NavContext.Provider value={{ open,handleDrawerOpen,handleDrawerClose , show, handleClose, handleShow  }}>
            {props.children}
        </NavContext.Provider>
    )
}

export default NavContextProvider;





