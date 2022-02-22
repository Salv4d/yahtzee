import React, { Component } from "react";
import Die from "./Die";
import "./Dice.css";

class Dice extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(idx) {
    this.props.toggleLocked(idx);
  }

  render() {
    return (
      <div className="Dice">
        {this.props.dice.map((d, idx) => (
          <Die
            toggleLocked={this.handleClick}
            val={d}
            locked={this.props.locked[idx]}
            idx={idx}
            key={idx}
          />
        ))}
      </div>
    );
  }
}

export default Dice;
