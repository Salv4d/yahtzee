import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: "1 point per 1",
        twos: "2 points per 2",
        threes: "3 points per 3",
        fours: "4 points per 4",
        fives: "5 points per 5",
        sixes: "6 points per 6",
        threeOfKind: "Sum all dice if 3 are the same",
        fourOfKind: "Sum all dice if 4 are the same",
        fullHouse: "25 points for a full house",
        smallStraight: "30 points for a small straight",
        largeStraight: "40 points for a large straight",
        yahtzee: "50 points for yahtzee",
        chance: "Sum of all dice",
      },
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState((st) => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft === 0) {
      return;
    }

    this.setState((st) => ({
      locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1),
      ],
    }));
  }

  doScore(rulename, ruleFn) {
    console.log(
      typeof this.state.scores[rulename],
      this.state.scores[rulename]
    );
    if (typeof this.state.scores[rulename] === "number") {
      return;
    }

    // evaluate this ruleFn with the dice and score this rulename
    this.setState((st) => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
    this.roll();
  }

  render() {
    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>

          <section className="Game-dice-section">
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              toggleLocked={this.toggleLocked}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                disabled={this.state.locked.every((x) => x)}
                onClick={this.roll}
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </div>
    );
  }
}

export default Game;
