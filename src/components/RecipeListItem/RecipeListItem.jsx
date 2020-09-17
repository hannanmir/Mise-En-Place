import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, IconButton, Box } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      height: "100%",
    },
    media: {
      height: 140,
    },
});

  export default withRouter(connect(mapStoreToProps)(function MediaCard(props) {
    const [isFavorite, setIsFavorite] = useState(false);
    const classes = useStyles();
    const clickRecipe = (recipe) => {
        props.dispatch({ type: 'WHICH_RECIPE', payload: recipe })
        props.history.push('/details')
    } 
    const favoriteRecipe = (recipe) => {
        props.dispatch({ type: 'ADD_FAVORITE', payload: recipe })
    }
    const unFavoriteRecipe = (recipe) => {
        props.dispatch({ type: 'REMOVE_FAVORITE', payload: recipe.id })
    }
    const filterFavorites = () => {
        for (let i = 0; i < props.store.favorites.length; i++) {
           const favorite = props.store.favorites[i];
           if (favorite.recipe_id === props.recipe.id) {
                setIsFavorite(true);
                return;
           } 
        }
        setIsFavorite(false);
        return;
    }
    useEffect( () => {
        filterFavorites();
    });
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
        <CardActions >
            <Box display='flex' flexGrow={1}>
                <Button size="small" color="primary" onClick={ () => clickRecipe(props.recipe)} >
                    Explore
                </Button>
            </Box>
            <Tooltip title="Favorite" >
                    { isFavorite ?
                        <IconButton onClick= { () => unFavoriteRecipe(props.recipe)}  >
                            <FavoriteIcon color="secondary" />
                        </IconButton >
                        :
                        <IconButton onClick= { () => favoriteRecipe(props.recipe)} >
                            <FavoriteIcon />
                        </IconButton>
                    }
            </Tooltip>
        </CardActions>
      </Card>
    );
  }))

