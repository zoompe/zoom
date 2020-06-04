import React, { useContext } from 'react';

import clsx from 'clsx';
import useStyles from '../shared/navbarV/filesForMaterialUi/useStyles';
import NavbarV from '../shared/navbarV/NavbarV';
import { NavContext } from '../../contexts/NavContext';

const Main = (props) => {
	const classes = useStyles();
	const { open } = useContext(NavContext);

	return (
		<div className={classes.root}>
			<NavbarV />

			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} />
				{props.children}
			</main>
		</div>
	);
};

export default Main;
