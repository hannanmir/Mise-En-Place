import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Tooltip, Fab, Paper, Grid, Typography } from '@material-ui/core';
import RecipeListItem from '../RecipeListItem/RecipeListItem.jsx'
import swal from '@sweetalert/with-react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';

class AddRecipe extends Component {
  state = {
    newRecipe: {
        name: '',
        image: '',
        description: '',
        instructions: '',
    },
    preview: false,
  };

  componentDidMount() {
    this.alertSpace();
    this.props.dispatch({ type: 'RESET_DETAILS' })
    this.props.dispatch({ type: 'RESET_INGREDIENTS' })
  }

  handleChangeFor = (event, propertyToChange) => {
    this.setState({
        newRecipe: {
            ...this.state.newRecipe,
            [propertyToChange]: event.target.value, 
        }
    })
  }

  saveRecipe = () => {
    if (this.state.newRecipe.name === '' || this.state.newRecipe.image === '' || this.state.newRecipe.description === '' || this.state.newRecipe.instructions === '' ) {
        swal('Please include all fields!');
    } else {      
      console.log(this.state.newIngredient);
      this.props.dispatch({ type: 'ADD_RECIPE', payload: this.state.newRecipe});
      swal(`${this.state.newRecipe.name} was added!`, {
        buttons: false,
        timer: 1500,
      });
      this.setState({
        newRecipe: {
            name: '',
            image: '',
            description: '',
            instructions: '',
        }
      });
      this.clickRecipe();
    }
  }

   clickRecipe = () => {
    this.props.dispatch({ type: 'WHICH_RECIPE', payload: this.state.newRecipe })
    this.props.history.push('/recipes')
  } 
  
  showPreview = () => {
    this.setState({
        preview: !this.state.preview
    })
  }

  loadDemo = () => {
      this.setState({
        newRecipe: {
            name: 'Tuna Melt',
            image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tuna-melt-081-1550261085.jpg?crop=0.646xw:0.431xh;0.243xw,0.388xh&resize=768:*',
            description: 'Tuna lovers! Meet your ultimate sandwich. With just the right amount of crunch, melty cheddar cheese, and a couple good slices of tomato, you might even convert a tuna hater. ',
            instructions: 'Preheat oven to 400°. In a large bowl, whisk together mayonnaise, lemon juice, and red pepper flakes (if using).  Drain tuna then add to mayonnaise mixture. Use a fork to break up tuna into flakes. Add celery, pickles, red onion, and parsley and toss to combine. Season with salt and pepper.  Butter one side of each bread slice. Top an unbuttered side with approximately 1/2 cup of tuna salad, 2 to 3 slices tomato, and 2 slices of cheese. Top with another slice of bread, buttered side facing up. Repeat with remaining ingredients and place on a large baking sheet. Bake until cheese is melty, 5 to 8 minutes.',
        }
      })
  }

  alertSpace = () => {
    swal('For adding recipe instructions use double spaces to indicate line breaks!', {
        buttons: false,
        timer: 4500,
      });
  }

    render() {
        return (
            <Grid 
            container
            justify="center"
            alignItems="center"
            >
                <Paper>
                    <div >
                        <div className="input">
                            <Typography color="primary" onClick= {() => this.loadDemo()}>
                                Add A Recipe
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <div className="input">
                            <TextField label="Name" value={this.state.newRecipe.name} onChange = {(event) => this.handleChangeFor(event, 'name')}/>
                        </div>
                    </div>
                    <div>
                        <div className="input">
                            <TextField label="Image" value={this.state.newRecipe.image} onChange = {(event) => this.handleChangeFor(event, 'image')}/>
                        </div>
                    </div>
                    <div>
                        <div className="input">
                            <TextField multiline={true} variant="outlined" fullWidth={true} size="medium" label="Description" value={this.state.newRecipe.description} onChange = {(event) => this.handleChangeFor(event, 'description')}/>
                        </div>
                    </div>
                    <div>
                        <div className="input">
                            <TextField multiline={true} variant="outlined" fullWidth={true} size="medium" label="Instructions" value={this.state.newRecipe.instructions} onChange = {(event) => this.handleChangeFor(event, 'instructions')} />
                        </div>
                    </div>
                    <div>
                        <div className="input">
                            <div className="preview">
                            <Tooltip title="Preview">
                                <Fab color="primary" onClick= {() => this.showPreview()} >
                                    { this.state.preview ?
                                    <VisibilityOffIcon />
                                    :
                                    <VisibilityIcon />
                                }
                                </Fab>
                            </Tooltip>    
                            </div>
                            <Tooltip title="Add Recipe!">
                                <Fab color="primary" onClick= {() => this.saveRecipe()} >           
                                    <AddCircleIcon variant="contained" />
                                </Fab>     
                            </Tooltip>    
                        </div>

                    </div>
                </Paper>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={3}>
                    { this.state.preview &&
                        <div className="addrecipe">
                            <RecipeListItem recipe={this.state.newRecipe} key={this.state.newRecipe.name} />
                        </div>
                        }
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default connect(mapStoreToProps)(AddRecipe);
