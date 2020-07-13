import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import clsx from 'clsx';
import useStyles from './Navbar.js/filesForMaterialUi/useStyles';
import NavbarV from './Navbar.js/NavbarV';
import { NavContext } from '../../contexts/NavContext';
import UpdateUser from '../connexion/UpdateUser';

//useEffect with axios PUT

const Main = (props) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const { open, show, handleClose } = useContext(NavContext);
  console.log(user.idgasi);
  return (
    <div className={classes.root}>
      <NavbarV />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}

        <UpdateUser show={show} handleClose={handleClose} />
      </main>
    </div>
  );
};

export default Main;
