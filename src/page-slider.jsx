import React from "react";
import PropTypes from "prop-types";

export function Page({ children }) {
  return <div style={{ width: "100%", height: "100%" }}>{children}</div>;
}

Page.defaultProps = {
  children: null
};

Page.propTypes = {
  children: PropTypes.node
};

export function Slider({ size, children }) {
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

export function PageSlider({ pages }) {
  return (
    <div style={{ width: "100%", height: "100%" }} className="page-slider">
      <Slider size={pages.length - 1}>
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

PageSlider.defaultProps = {
  pages: []
};

PageSlider.propTypes = {
  pages: PropTypes.array
};
