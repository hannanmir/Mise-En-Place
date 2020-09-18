import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, MenuItem, Select, IconButton, Tooltip, Grid, Paper, FormControl, FormGroup } from '@material-ui/core';
import swal from '@sweetalert/with-react';
import AddBoxIcon from '@material-ui/icons/AddBox';

class AddIngredient extends Component {
    state = {
        newIngredient: {
            name: '',
            quantity: '',
            inFridge: 0,
        }
    };

    handleChangeIngredient = (event, propertyToChange) => {
        this.setState({
            newIngredient: {
                ...this.state.newIngredient,
                [propertyToChange]: event.target.value,
            }
        })
    }

    addIngredient = () => {
        if (this.state.newIngredient.name === '' || this.state.newIngredient.description === '' || this.state.newIngredient.quantity === '' || this.state.newIngredient.inFridge === 0) {
            swal('Please input all fields!');
        } else {
            console.log(this.state.newIngredient);
            this.props.dispatch({ type: 'ADD_INGREDIENT', payload: this.state.newIngredient })
            this.setState({
                newIngredient: {
                    name: '',
                    quantity: '',
                    inFridge: 0,
                }
            })
        }
    }

    render() {
        return (
            <Grid container justify="center" alignItems="center">
                <Paper>
                    <FormControl>
                    <div className="input">

                        <Grid xs={3} item>
                            <TextField label="Ingredient" value={this.state.newIngredient.name} onChange={(event) => this.handleChangeIngredient(event, 'name')} />
                        </Grid>
                        <Grid xs={3} item>
                            <TextField label="Quantity" value={this.state.newIngredient.quantity} onChange={(event) => this.handleChangeIngredient(event, 'quantity')} />
                        </Grid>
                        <Grid xs={3} item>
                            <Select className="select" value={this.state.newIngredient.inFridge} onChange={(value) => this.handleChangeIngredient(value, 'inFridge')}>
                                <MenuItem value={0}>In Fridge?</MenuItem>
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </Grid>
                        <Grid xs={3} item>
                            <Tooltip title="Add" >
                                <IconButton onClick={() => this.addIngredient()} >
                                    <AddBoxIcon color="primary" size="medium" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        </div>
                        </FormControl>
                </Paper>
            </Grid>
        );
    }
}

export default connect(mapStoreToProps)(AddIngredient);
