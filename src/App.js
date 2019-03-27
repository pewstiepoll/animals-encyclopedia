import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AnimalPage from "./animal-page";
import animals from "./animals.json";

class App extends Component {
  render() {
    const [defaultAnimal] = animals;

    return (
      <div className="App">
        <Router>
          {/* Root route will redirect to the first available animal */}
          <Route
            exact
            path="/"
            render={props => (
              <Redirect to={`/${defaultAnimal.name}`} {...props} />
            )}
          />
          {/* This's gonna create routes for each available animal */}
          {animals.map(animal => (
            <Route
              key={animal.name}
              animal={animal}
              render={props => <AnimalPage animal={animal} {...props} />}
              path={`/${animal.name}`}
            />
          ))}
        </Router>
      </div>
    );
  }
}

export default App;
