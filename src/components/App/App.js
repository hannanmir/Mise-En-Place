import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import 'fontsource-roboto';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './App.css';

import AddRecipe from '../AddRecipe/AddRecipe.jsx';
import Pantry from '../Pantry/Pantry.jsx';
import RecipeList from '../RecipeList/RecipeList.jsx'
import Details from '../Details/Details.jsx'
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';



class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'GET_PANTRY'})
    this.props.dispatch({ type: 'GET_FRIDGE'})
    this.props.dispatch({ type: 'GET_RECIPES' })
    this.props.dispatch({ type: 'GET_FAVORITES' })
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#ab83bb',
        },
        secondary: {
          main: '#feb098',
        },
        error: {
          main: '#f35f50'
        }
      },
    });
    return (
      <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Container>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/recipes */}
            <Redirect exact from="/" to="/recipes" />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/recipes"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/recipes"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/recipes"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/recipes"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LoginPage}
              authRedirect="/recipes"
            />
            <ProtectedRoute
              exact
              path="/recipes"
              component={RecipeList}
            />
              <ProtectedRoute
              exact
              path="/details"
              component={Details}
            />
            <ProtectedRoute
              exact
              path="/pantry"
              component={Pantry}
            />
            <ProtectedRoute
              exact
              path="/addrecipe"
              component={AddRecipe}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          </Container>
        </div>
      </Router>
      </ThemeProvider>
    );
  }
}

export default connect()(App);
