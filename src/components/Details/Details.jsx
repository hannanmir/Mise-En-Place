import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Tooltip, IconButton, TextField, Select, MenuItem, Paper, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IngredientList from '../IngredientList/IngredientList.jsx'
import NoEditIngredientList from '../NoEditIngredientList/NoEditIngredientList.jsx'
import swal from '@sweetalert/with-react';

class Details extends Component {
    state = {
        newRecipe: {
            name: this.props.store.details.name,
            image: this.props.store.details.image,
            description: this.props.store.details.description,
            instructions: this.props.store.details.instructions,
            id: this.props.store.details.id,
        },
        newIngredient: {
            name: '',
            quantity: '',
            inFridge: 0,
            recipe_id: this.props.store.details.id,
        },
        editing: false,
        editName: false,
        editImage: false,
        editDescription: false,
        editIngredients: false,
        editInstructions: false,
    };

    componentDidMount() {
    this.props.dispatch({ type: 'GET_INGREDIENTS', payload: this.props.store.details.id })
    }

    toggleEdit = () => {
    this.setState({
        editing: !this.state.editing
    })
    }

    editName = () => {
    this.setState({
        editName: !this.state.editName
    })
    }

    editImage = () => {
    this.setState({
        editImage: !this.state.editImage
    })
    }

    editDescription = () => {
    this.setState({
        editDescription: !this.state.editDescription
    })
    }

    editIngredients = () => {
    this.setState({
        editIngredients: !this.state.editIngredients
    })
    }

    editInstructions = () => {
    this.setState({
        editInstructions: !this.state.editInstructions
    })
    }

    handleChangeFor = (event, propertyToChange) => {
    this.setState({
        newRecipe: {
            ...this.state.newRecipe,
            [propertyToChange]: event.target.value,
        }
    })
    }

    handleChangeIngredient = (event, propertyToChange) => {
    this.setState({
        newIngredient: {
            ...this.state.newIngredient,
            [propertyToChange]: event.target.value,
        },
    })
    }

    addIngredient = () => {
        if (this.state.newIngredient.name === '' || this.state.newIngredient.description === '' || this.state.newIngredient.quantity === '' || this.state.newIngredient.inFridge === 0 ) {
            swal('Please input all fields!');
        } else {
            this.props.dispatch({ type: 'ADD_RECIPE_INGREDIENT', payload: this.state.newIngredient});
            this.setState({
                newIngredient: {
                    name: '',
                    quantity: '',
                    inFridge: 0,
                    recipe_id: this.props.store.details.id,
                }
            });
        }
    }

    saveRecipe = () => {
        this.props.dispatch({ type: 'EDIT_RECIPE', payload: this.state.newRecipe});
        this.props.dispatch({ type: 'WHICH_RECIPE', payload: this.state.newRecipe});
        this.setState({
            editing: !this.state.editing
        })
    }

    render() {
        const splitLines = str => str.split('  ');
        const string = splitLines(this.state.newRecipe.instructions)
        return (

            <Paper>
            <Grid 
            container
            justify={"center"}
            alignItems={"center"}
            >
                { this.state.editing ?
                    // EDITING MODE ON
                    <div className="details">
                        <div className="edit">
                                <Tooltip title="Save Changes" >
                                    <IconButton onClick={() => this.saveRecipe()} >
                                        <SaveIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                        </div>
                        <Grid item xs={12} >
                        { this.state.editName ?
                            // EDIT NAME ON
                            <h1>
                                <TextField label="Name" value={this.state.newRecipe.name} onChange = {(event) => this.handleChangeFor(event, 'name')}/>
                                <Tooltip title="Save Changes" >
                                    <IconButton onClick={() => this.editName()} >
                                        <SaveIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </h1>
                            :
                            // EDIT NAME OFF
                            <h1>
                                {this.state.newRecipe.name}
                                <Tooltip title="Edit Name" >
                                    <IconButton onClick={() => this.editName()} >
                                        <EditIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </h1>
                        }
                        </Grid>
                        <Grid item xs={12} >
                        { this.state.editImage ?
                            // EDIT IMAGE ON
                            <>
                                <img src={this.state.newRecipe.image} alt={this.state.newRecipe.name} />
                                <TextField label="Image" value={this.state.newRecipe.image} variant="outlined" fullWidth={true} onChange = {(event) => this.handleChangeFor(event, 'image')}/>
                                <Tooltip title="Save Changes" >
                                <IconButton onClick={() => this.editImage()} >
                                    <SaveIcon color="primary" />
                                </IconButton>
                                </Tooltip>
                            </>
                            :
                            // EDIT IMAGE OFF
                            <>
                                <img src={this.state.newRecipe.image} alt={this.state.newRecipe.name} />
                                <Tooltip title="Edit Image" >
                                    <IconButton onClick={() => this.editImage()} >
                                        <EditIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </>
                        }
                        </Grid >
                        <Grid item xs={12} >
                        { this.state.editDescription ?
                            // EDIT DESCRIPTION ON
                            <p>
                                <TextField multiline={true} variant="outlined" fullWidth={false} size="small" label="Description" value={this.state.newRecipe.description} onChange = {(event) => this.handleChangeFor(event, 'description')}/>
                                <Tooltip title="Save Changes" >
                                    <IconButton onClick={() => this.editDescription()} >
                                        <SaveIcon color="primary" />
                                </IconButton>
                                </Tooltip>
                            </p>
                            :
                            // EDIT DESCRIPTION OFF
                            <p>
                                {this.state.newRecipe.description}
                                <Tooltip title="Edit Description" >
                                    <IconButton onClick={() => this.editDescription()} >
                                        <EditIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </p>
                        }
                        </Grid>
                        <Grid item xs={12} >
                        { this.state.editIngredients ?
                            // EDIT INGREDIENTS ON
                            <div>
                                <h4>
                                    Ingredients
                                    <Tooltip title="Save Changes" >
                                        <IconButton onClick={() => this.editIngredients()} >
                                            <SaveIcon color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                </h4>
                                <div className="input">
                                    <TextField label="Ingredient" value={this.state.newIngredient.name} onChange = {(event) => this.handleChangeIngredient(event, 'name')}/>
                                    <TextField label="Quantity" value={this.state.newIngredient.quantity} onChange = {(event) => this.handleChangeIngredient(event, 'quantity')}/>
                                    <Select value={this.state.newIngredient.inFridge} onChange={(value) => this.handleChangeIngredient(value, 'inFridge')}>
                                        <MenuItem value={0}>In Fridge?</MenuItem>
                                        <MenuItem value={true}>True</MenuItem>
                                        <MenuItem value={false}>False</MenuItem>
                                    </Select>
                                    <Tooltip title="Add" >
                                        <IconButton onClick= {() => this.addIngredient()} >
                                            <AddBoxIcon color="primary" size="medium" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div>
                                    {this.props.store.ingredients.map((ingredient) => {
                                        return (
                                            <IngredientList key={ingredient.ingredient_id} ingredient={ingredient}/>
                                        );
                                    })}
                                </div>
                            </div>
                            :
                            // EDIT INGREDIENTS OFF
                            <div>
                                <h4>
                                    Ingredients
                                    <Tooltip title="Edit Ingredients" >
                                        <IconButton onClick={() => this.editIngredients()} >
                                            <EditIcon color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                </h4>
                                <div>
                                    {this.props.store.ingredients.map((ingredient) => {
                                        return (
                                            <NoEditIngredientList key={ingredient.ingredient_id} ingredient={ingredient}/>
                                        );
                                    })}
                                </div>
                            </div>
                        }
                        </Grid>
                        <Grid item xs={12} >
                        { this.state.editInstructions ?
                            // EDIT INSTRUCTIONS ON
                            <div>
                                <h4>
                                    Instructions
                                    <Tooltip title="Save Changes" >
                                        <IconButton onClick={() => this.editInstructions()} >
                                            <SaveIcon color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                </h4>
                                <TextField multiline={true} variant="outlined" fullWidth={true} size="medium" label="Instructions" value={this.state.newRecipe.instructions} onChange = {(event) => this.handleChangeFor(event, 'instructions')} />
                                {string.map((line, i) => {
                                    return(
                                        <p key={i}>{line}</p>
                                    )
                                })}
                            </div>
                            :
                            // EDIT INSTRUCTIONS OFF
                            <div>
                                <h4>
                                    Instructions
                                    <Tooltip title="Edit Instructions" >
                                        <IconButton onClick={() => this.editInstructions()} >
                                            <EditIcon color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                </h4>
                                {string.map((line, i) => {
                                    return(
                                        <p key={i}>{line}</p>
                                    )
                                })}
                            </div>
                        }
                        </Grid>
                    </div>
                    :
                    // EDITING MODE OFF
                    <div className="details">
                        <div className="edit">
                            <Tooltip title="Edit Recipe" >
                                <IconButton onClick={() => this.toggleEdit()} >
                                    <EditIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <Grid item xs={12} ><h1>{this.props.store.details.name}</h1></Grid>
                        <Grid item xs={12} ><img src={this.props.store.details.image} alt={this.props.store.details.name} /></Grid>
                        <Grid item xs={12} ><p>{this.props.store.details.description}</p></Grid>
                        <Grid item xs={12} >
                        <div>
                            <h4>Ingredients</h4>
                            <div >
                                {this.props.store.ingredients.map((ingredient) => {
                                    return (
                                        <NoEditIngredientList key={ingredient.ingredient_id} ingredient={ingredient}/>
                                    );
                                })}
                            </div>
                        </div>
                        </Grid>
                        <Grid item xs={12} >
                        <div>
                            <h4>Instructions</h4>
                            {string.map((line, i) => {
                                return(
                                    <p key={i}>{line}</p>
                                )
                            })}
                        </div>
                        </Grid>
                    </div>
                }
            </Grid>
            </Paper>
        );
    }
}

export default connect(mapStoreToProps)(Details);
