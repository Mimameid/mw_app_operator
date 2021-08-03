import React from 'react';

// import { Box, DataGrid, Divider, List, ListItem, ListSubheader, Paper } from '@material-ui/core';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, makeStyles } from '@material-ui/core';

import EnhancedTableHead from './EnhancedTableHead/EnhancedTableHead';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    margin: '0 ' + theme.spacing(1) + 'px',
    marginBottom: theme.spacing(1),
    padding: '0 ' + theme.spacing(1) + 'px',
  },
  divider: {
    margin: '0 ' + theme.spacing(2) + 'px',
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function MyTable({ headCells, data }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  return (
    // <Paper className={classes.listContainer} elevation={3}>
    //   {menus.length === 0 ? (
    //     <Box color="text.secondary" fontStyle="italic">
    //       Keine Menüs verfügbar. Bitte fügen Sie ein Menü hinzu...
    //     </Box>
    //   ) : (
    //     <List component="nav">
    //       <ListSubheader>{`I'm sticky `}</ListSubheader>
    //       <Divider className={classes.divider} />
    //       {menus.map((menu, index) => (
    //         <ListItem button key={nanoid()}>
    //           TASTAL
    //         </ListItem>
    //       ))}
    //     </List>
    //   )}
    // </Paper>
    <Paper className={classes.listContainer} elevation={3}>
      <TableContainer>
        <Table>
          <EnhancedTableHead
            headCells={headCells}
            numSelected={2}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    {headCells.map((cell, index) => (
                      <TableCell key={cell.id} align={cell.numeric ? 'right' : 'left'} scope="row" padding="none">
                        {row[cell.id]}
                      </TableCell>
                    ))}
                    {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MyTable;
