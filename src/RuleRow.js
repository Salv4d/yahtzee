import React, { Component } from "react";
import "./RuleRow.css";

class RuleRow extends Component {
  render() {
    return (
      <tr
        className={`RuleRow ${
          this.props.score >= 0 ? "RuleRow-disabled" : "RuleRow-active"
        }`}
        onClick={this.props.doScore}
      >
        <td className="RuleRow-name">{this.props.name}</td>
        <td className="RuleRow-score">{this.props.score}</td>
      </tr>
    );
  }
}

export default RuleRow;
