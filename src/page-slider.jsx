import React from "react";
import PropTypes from "prop-types";

import { SwitchObserver } from "./switch";

export function Page({ children }) {
  return <div style={{ width: "100%", height: "100%" }}>{children}</div>;
}

Page.defaultProps = {
  children: null
};

Page.propTypes = {
  children: PropTypes.node
};

export function Slider({ size, children, effectCreator }) {
  const [transition, setTransition] = React.useState(0);

  const canMove = {
    forward: Math.abs(transition) < size,
    backward: Math.abs(transition) > 0
  };

  const params = {
    canMove,
    transition,
    next: () => {
      if (canMove.forward) {
        setTransition(transition - 1);
      }
    },
    prev: () => {
      if (canMove.backward) {
        setTransition(transition + 1);
      }
    }
  };

  // get effect from creator function only if one is provided
  typeof effectCreator === "function" &&
    React.useEffect(() =>
      effectCreator({ next: params.next, prev: params.prev })
    );

  return children(params);
}

Slider.defaultProps = {
  size: 0,
  children: () => null
};

Slider.propTypes = {
  size: PropTypes.number,
  children: PropTypes.func
};

export class PageSlider extends React.Component {
  render() {
    const { pages } = this.props;

    return (
      <div style={{ width: "100%", height: "100%" }} className="page-slider">
        <Slider
          effectCreator={({ next, prev }) => {
            const subscriptionCallback = eventType => {
              switch (eventType) {
                case SwitchObserver.eventTypes.next:
                  next();
                  break;
                case SwitchObserver.eventTypes.prev:
                  prev();
                  break;
                default:
                  break;
              }
            };

            SwitchObserver.subscribe(subscriptionCallback);

            return () => {
              SwitchObserver.unsubscibe(subscriptionCallback);
            };
          }}
          size={pages.length - 1}
        >
          {({ transition }) => {
            const style = {
              width: "100%",
              height: "100%",
              transform: `translateY(${transition * 100}%)`,
              transition: `transform 1s`
            };

            return (
              <React.Fragment>
                <div style={style}>
                  {pages.map((page, id) => (
                    <Page key={id}>{page}</Page>
                  ))}
                </div>
              </React.Fragment>
            );
          }}
        </Slider>
      </div>
    );
  }
}

PageSlider.defaultProps = {
  pages: [],
  onStateChange: () => {}
};

PageSlider.propTypes = {
  pages: PropTypes.array,
  onStateChange: PropTypes.func
};
