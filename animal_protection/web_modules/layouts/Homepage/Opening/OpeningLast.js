/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len */

import React, { Component } from "react"

import classnames from "classnames"
import styles from "./OpeningLast.scss"
import commonStyles from "../../../styles/common.scss"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

export default class OpeningLast extends Component {
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
        ref={ (ref) => this.container = ref }
      >
      <div className={ commonStyles["content-outer"] }>
        <div className={ classnames(styles["content-box"]) }>
        </div>
      </div>

      </div>
    )
  }
}

OpeningLast.propTypes = {}
