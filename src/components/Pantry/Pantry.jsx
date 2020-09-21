import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddIngredient from '../AddIngredient/AddIngredient.jsx'
import PantryListItem from '../PantryListItem/PantryListItem.jsx'
import { Typography, Grid, Paper, Table, TableContainer, TableCell, TableRow, TableHead, TableBody,  } from '@material-ui/core';


class Pantry extends Component {
    state = {
        pantryList: [],
        fridgeList: [],
    };

  componentDidMount() {
    console.log('App Mounted');
    this.props.dispatch({ type: 'GET_PANTRY'})
    this.props.dispatch({ type: 'GET_FRIDGE'})
  }

  render() {
    return (
        <Grid container justify="center" alignItems="stretch" spacing={2}>
            <AddIngredient />
            <Grid xs={6} item>
                <Paper>
                    <TableContainer className="table">
                        <Table stickyHeader >
                            <TableHead >
                                <TableRow >
                                    <TableCell >Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell><Typography>Pantry</Typography></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.store.pantry.map((ingredient) => {
                                    return (
                                        <PantryListItem key={ingredient.ingredient_id} ingredient={ingredient}/>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Grid xs={6} item>
                <Paper>
                    <TableContainer className="table">
                        <Table stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell><Typography>Fridge</Typography></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.store.fridge.map((ingredient) => {
                                    return (
                                        <PantryListItem key={ingredient.ingredient_id} ingredient={ingredient}/>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
  }
}

export default connect(mapStoreToProps)(Pantry);
