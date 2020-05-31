import React, { useContext } from 'react';
import NavbarV from '../shared/navbarV/NavbarV';
import clsx from 'clsx';
import useStyles from '../shared/navbarV/filesForMaterialUi/useStyles';
import { NavContext } from '../../contexts/NavContext';


const Efo = () => {

    const classes = useStyles();
    const { open } = useContext(NavContext)

    return (
        <div className={classes.root}>
                <NavbarV />
                
                <main
                className={clsx(classes.content, {
                [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <h1>EFO</h1>
            </main>
      </div>
    )
}




export default Efo;