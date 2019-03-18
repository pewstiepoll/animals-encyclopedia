import React, { Component } from 'react';
import AnimalPage from "./animal-page";
import animals from "./animals.json";

class App extends Component {
  render() {

    const [animalData] = animals;

    return (
      <div className="App">
        <AnimalPage animal={animalData} />
      </div>
    );
  }
}

export default App;
