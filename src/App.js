import React, { Component } from "react";
import { PageSlider } from "./page-slider";

import AnimalPage from "./animal-page";
import animals from "./animals.json";

class App extends Component {
  render() {
    const animalPages = animals.map(animal => <AnimalPage animal={animal} />);

    return (
      <div className="App">
        <PageSlider pages={animalPages} />
      </div>
    );
  }
}

export default App;
