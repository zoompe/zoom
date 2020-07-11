import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function EfoTab({dataEfo}) {
  const classes = useStyles();

  return (
    <>
    {(dataEfo!==undefined ) ? 
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nombre d'EFO</TableCell>
            <TableCell align="right">Nombre de DE avec EFO</TableCell>
            <TableCell align="right">Nombre de DE</TableCell>
            <TableCell align="right">Taux DE avec EFO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow> 
              <TableCell align="right">{dataEfo.nbEFO}</TableCell>
              <TableCell align="right">{dataEfo.nbDEEFO}</TableCell>
              <TableCell align="right">{dataEfo.nbDE}</TableCell>
              <TableCell align="right">{dataEfo.tx}</TableCell>
            </TableRow>        
        </TableBody>
      </Table>
    </TableContainer>
    :
    <div>no result</div>
    }  
    </>      
  )
}