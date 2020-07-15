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

export default function JalonTab({dataActi}) {
  const classes = useStyles();

  return (
     <>
    {(dataActi.length > 0) && (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Année</TableCell>
            <TableCell align="right">Mois</TableCell>
            <TableCell align="right">Nb DE affectés</TableCell>
            <TableCell align="right">GOA</TableCell>
            <TableCell align="right">3949</TableCell>
            <TableCell align="right">Nb ent phys</TableCell>
            <TableCell align="right">Nb ent tel</TableCell>
            <TableCell align="right">Nb ent mail</TableCell>
            <TableCell align="right">Nb ent DMC</TableCell>
            <TableCell align="right">Nb mailnet entrant</TableCell>
            <TableCell align="right">Nb mailnet sortant</TableCell>
            <TableCell align="right">Tx contact entrant</TableCell>
            <TableCell align="right">Tx contact sortant</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataActi.map((row) => (
            <TableRow key={row.annee+row.mois}>
              <TableCell align="right">{row[Object.keys(dataActi[0])[0]]}</TableCell> 
              <TableCell align="right">{row[Object.keys(dataActi[0])[1]]}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[2]]}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[3]]}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[4]]}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[5]]}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[6]]}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[7]]}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[8]]}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[9]]}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[10]]}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[11]]}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[12]]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     )}
     </>
          
  )
}