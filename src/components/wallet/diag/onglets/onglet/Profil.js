import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { namefield } from '../../../../../utils/diagNameColonne';
// import Select from '../../../../shared/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function Profil({dataDiagMod,handleChangeMod,dataDiag,selected,handleClick}) {
  const classes = useStyles();


  const isSelected = (name) => selected.indexOf(name) !== -1;

  const test = () => {
      console.log(selected)
  }

  return (
    <>
    {(dataDiag.length === 13) && (
    <div className={classes.root}>
        <button onClick={test}>test</button>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='small'
            aria-label="enhanced table"
          >
          
            <TableBody>
              {dataDiag.slice(0,13)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.name)}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {namefield(row.name)}
                      </TableCell >
                      <TableCell>
                      <select required="required"
                        name={Object.keys(dataDiagMod)[index]}
                        // value={dataDiagMod[index]}
                        onChange={handleChangeMod}
                        defaultValue={dataDiagMod[index]}
                        >
                        {['B','PA','NE','NS'].map(option => (
                            <option
                                key={option}
                                value={dataDiagMod[index]}
                                >{option}
                            </option>
                            ))}         
                        </select>
                            
                         {/* <Select 
                         name = {Object.keys(dataDiagMod)[index]}
                         options = {['B','PA','NE','NS']}
                         value = {dataDiagMod[index]}
                         handleChange = {handleChangeMod}
                         /> */}

                      </TableCell>
                    <TableCell align="right">{row[Object.keys(dataDiag[0])[1]]}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
   
    </div>
    )}
    </>
  );
}
