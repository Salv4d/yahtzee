import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";
import "./Die.css";

class Die extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleLocked(this.props.idx);
  }

  render() {
    const diceNum = {
      1: faDiceOne,
      2: faDiceTwo,
      3: faDiceThree,
      4: faDiceFour,
      5: faDiceFive,
      6: faDiceSix,
    };

    return (
      <div>
        <FontAwesomeIcon
          className={"Die fa-solid"}
          icon={diceNum[this.props.val]}
          style={{
            backgroundColor: this.props.locked ? "grey" : "transparent",
          }}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default Die;
