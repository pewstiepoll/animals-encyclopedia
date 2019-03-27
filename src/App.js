import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import AnimalPage from "./animal-page";
import animals from "./animals.json";

class App extends Component {
  render() {
    const [defaultAnimal] = animals;

    return (
      <div className="App">
        <Router>
          <Switch>
            {/* Root route will redirect to the first available animal */}
            <Route
              exact
              path="/"
              render={props => (
                <Redirect to={`/${defaultAnimal.name}`} {...props} />
              )}
            />
            {/* Dynamically create routes for each available animal */}
            {animals.map(animal => (
              <Route
                key={animal.name}
                animal={animal}
                render={props => <AnimalPage animal={animal} {...props} />}
                path={`/${animal.name}`}
              />
            ))}
            {/* Redirect all other requests to a homescreen */}
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
