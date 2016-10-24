/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"
import Markdown from "react-markdown"

import classnames from "classnames"
import styles from "./Tnr.scss"
import Subsection from "../Components/Subsection"
import VisibleSensor from "../Components/VisibleSensor"
import commonStyles from "../../../styles/common.scss"

import tnrT from "../../../../content/assets/TNR-T.svg"

import { topBox, titles } from "./text"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

export default class Tnr extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
    }

  }

  _handleAnimationT() {
    try {
      const tLeft = document.getElementById("tLeft")
      const tRight = document.getElementById("tRight")
      if (tLeft && tRight) {
        velocity(tLeft, { translateX: [ 0, -50 ], opacity: [ 1, 0.8 ] }, { delay: 200, duration: 700 })
        velocity(tRight, { scale: [ 1, 1.1 ], opacity: [ 1, 0.8 ] }, { delay: 200, duration: 800 })
      }
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  render() {
    return (
      <div className={ classnames(styles.container,
        commonStyles["text-center"]) }
      >
        <div className={ commonStyles["content-outer"] }>
          <div className={ classnames(styles["content-box"]) }>
            <Markdown source={ topBox } />
          </div>
          <Subsection curSec={ 2 } titles={ titles } subIndex={ 0 }>
            <VisibleSensor handleVisible={ this._handleAnimationT }>
              <div className={ classnames(commonStyles["img-responsive"],
                styles["yoyo"], commonStyles["overlay-svg"]) }
                dangerouslySetInnerHTML={ { __html: tnrT } }
                ref={ (ref) => this.chartT = ref }
              />
              捕捉 TRAP
            </VisibleSensor>
          </Subsection>
          <Subsection curSec={ 2 } titles={ titles } subIndex={ 1 }>
            this is a subsection
            <div></div>
          </Subsection>
        </div>

      </div>
    )
  }
}

Tnr.propTypes = {}
