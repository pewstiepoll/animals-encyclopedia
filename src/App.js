import React, { Component } from "react";
import { PageSlider } from "./page-slider";

import { Switch } from "./switch";
import AnimalPage from "./animal-page";
import animals from "./animals.json";

function SwitchControls({ onNext, onPrev }) {
  return (
    <div className="switch-controls">
      <button onClick={onNext}>&lt;</button>
      <button onClick={onPrev}>&gt;</button>
    </div>
  );
}

class App extends Component {
  render() {
    const animalPages = animals.map(animal => <AnimalPage animal={animal} />);

    return (
      <div className="App">
        <Switch
          renderControls={({ next, prev }) => (
            <SwitchControls onNext={next} onPrev={prev} />
          )}
          initial={1}
          length={animalPages.length}
        />
        <PageSlider pages={animalPages} />
      </div>
    );
  }
}

export default App;
