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

export default function PrestaTab({dataActi}) {
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
            <TableCell align="right" title='Nombre de DE inscrits au moins un jour dans le mois chargé, toutes cat (le même DE peut avoir plusieurs ref au cours du mois)'>Nb DE affectés</TableCell>
            <TableCell align="right" title="Nombre total de prestations ACTIV'CREA">Activ'Créa</TableCell>
            <TableCell align="right" title="Nombre total de prestations ACTIV'Emploi">Activ'Emploi</TableCell>
            <TableCell align="right" title="Nombre total de prestations ACTIV'Projet">Activ'Projet</TableCell>
            <TableCell align="right" title="Nombre total de prestations REGARDS CROISES">Regards croisés</TableCell>
            <TableCell align="right" title="Nombre total de prestations VALORISER SON IMAGE PRO">Valoriser son image pro</TableCell>
            <TableCell align="right" title="Nombre total de prestations MARCHE DU TRAVAIL LOCAL + MARCHE DU TRAVAIL SECTORIEL + PRESENTATION DES ORGANISMES ET DES FORMATIONS">Vers un métier</TableCell>
            <TableCell align="right" title="Si plusieurs prestations dans le mois, une seule est comptabilisée par DE et référent.">Presta</TableCell>
            <TableCell align="right" title="Taux de prestation moyen par portefeuille au sens large">Tx presta</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataActi.map((row) => (
            <TableRow key={row.annee+row.mois}>
              <TableCell align="right">{row[Object.keys(dataActi[0])[0]].toLocaleString()}</TableCell> 
              <TableCell align="right">{row[Object.keys(dataActi[0])[1]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[2]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[3]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[4]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[5]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[6]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[7]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[8]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[9]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[10]]}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     )}
     </>
          
  )
}