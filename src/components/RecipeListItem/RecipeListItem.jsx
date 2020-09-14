import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});

  export default withRouter(connect(mapStoreToProps)(function MediaCard(props) {
    const classes = useStyles();
    const clickRecipe = (recipe) => {
        console.log('Clicked', recipe);
        props.dispatch({ type: 'WHICH_RECIPE', payload: recipe })
        props.history.push('/details')
    } 
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.recipe.image}
            title={props.recipe.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {props.recipe.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.recipe.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={ () => clickRecipe(props.recipe)}>
            Explore
          </Button>
          <Button size="small" color="primary">
            Favorite
          </Button>
        </CardActions>
      </Card>
    );
  }))

