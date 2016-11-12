/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len */

import React, { Component } from "react"

import classnames from "classnames"
import styles from "./OpeningLast.scss"
import commonStyles from "../../../styles/common.scss"

import { endingParagraphs } from "./text"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

export default class OpeningLast extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={ classnames(styles.container,
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
      <div className={ commonStyles["content-outer"] }>
        <div className={ classnames(styles["content-box"]) }>
          <div className={ styles["text-wrapper"] }>
            <div className={ styles["story-box"] }>
              <div className={ classnames(commonStyles["content-outer"]) }>
                <div itemProp="description">{ endingParagraphs[1] }</div>
              </div>
            </div>
          </div>

          <div className={ styles["text-wrapper"] }>
            <div className={ styles["story-box"] }>
              <div className={ classnames(commonStyles["content-outer"]) }>
                <div itemProp="description">{ endingParagraphs[2] }</div>
              </div>
            </div>
          </div>

          <div className={ styles["text-wrapper"] }>
            <div className={ styles["story-box"] }>
              <div className={ classnames(commonStyles["content-outer"]) }>
                <div itemProp="description">{ endingParagraphs[3] }</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    )
  }
}

OpeningLast.propTypes = {}
