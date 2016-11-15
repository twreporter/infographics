/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"

import classnames from "classnames"
import styles from "./Game.scss"
import commonStyles from "../../../styles/common.scss"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
    }

  }

  render() {
    return (
      <div className={ classnames(styles.container,
        commonStyles["text-center"]) }
      >
      Game

      </div>
    )
  }
}

Game.propTypes = {}
