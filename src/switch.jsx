import React from "react";
import PropTypes from "prop-types";

import styles from "./switch.module.css";

const range = (from, to, callback) => {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(callback(i));
  }
  return result;
};

const toString = num => {
  const string = num.toString();
  return string.length === 1 ? `0${string}` : string;
};

export const SwitchObserver = {
  eventTypes: {
    next: "next",
    prev: "prev"
  },
  subscribers: [],
  subscribe(callback) {
    this.subscribers.push(callback);
  },
  fire(eventType) {
    this.subscribers.forEach(cb => cb(this.eventTypes[eventType]));
  },
  unsubscibe(cb) {
    this.subscribers = this.subscribers.filter(sub => cb !== sub);
  }
};

export class Switch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: this.props.initial
    };
  }

  next() {
    const { length } = this.props;
    const { current } = this.state;

    if (current < length) {
      this.setState({ current: current + 1 });
      SwitchObserver.fire(SwitchObserver.eventTypes.next);
    }
  }

  prev() {
    const { initial } = this.props;
    const { current } = this.state;

    if (current > initial) {
      this.setState({ current: current - 1 });
      SwitchObserver.fire(SwitchObserver.eventTypes.prev);
    }
  }

  renderControls() {
    const { renderControls } = this.props;
    return renderControls({
      next: this.next.bind(this),
      prev: this.prev.bind(this)
    });
  }

  render() {
    const { current } = this.state;
    const { initial, length } = this.props;

    const WIDTH_PLUS_MARGIN = 95;

    return (
      <React.Fragment>
        <div className={styles["switch-wrapper"]}>
          <div
            style={{
              transform: `translateX(${WIDTH_PLUS_MARGIN * (current - 1)}px)`
            }}
            className={styles["switch-container"]}
          >
            {range(initial, length, num => (
              <span
                className={`${styles["switch-item"]} ${
                  num === current ? styles["switch-item--active"] : ""
                }`}
                key={num}
              >
                {toString(num)}
              </span>
            ))}
          </div>
        </div>
        {this.renderControls()}
      </React.Fragment>
    );
  }
}

Switch.propTypes = {
  renderControls: PropTypes.func,
  initial: PropTypes.number,
  length: PropTypes.number
};

Switch.defaultProps = {
  renderControls: () => null,
  initial: 0,
  length: 0
};
