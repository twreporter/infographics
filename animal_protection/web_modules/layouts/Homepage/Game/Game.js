/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"

import classnames from "classnames"
import styles from "./Game.scss"
import commonStyles from "../../../styles/common.scss"
import VisibleSensor from "../Components/VisibleSensor"

import gameIcon from "../../../../content/assets/game_start_icon.svg"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
    }

  }

  _handleAnimation() {
    try {
      const gameTail = document.getElementById("gameTail")
      const gameClick = document.getElementById("gameClick")
      if (gameTail && gameClick) {
        velocity(gameClick, { scale: [ 1, 1.3 ], translateX: [ 0, -35 ], translateY: [ 0, -30 ] }, { loop: true, delay: 100, duration: 300 })
        velocity(gameTail, { scale: [ 0.95, 1 ], translateX: [ 0, -10 ], translateY: [ 0, "-8%" ], rotateZ: [ 0, -10 ] }, { reverse: true, loop: true, delay: 200, duration: 500 })
      }
    }
    catch (e) {}
  }

  _handleLeave() {
    try {
      const gameTail = document.getElementById("gameTail")
      const gameClick = document.getElementById("gameClick")
      if (gameTail && gameClick) {
        gameClick.velocity("stop", true)
        gameTail.velocity("stop", true)
      }
    }
    catch (e) {}
  }

  _handleGameStart() {
    console.log("*****clicked")
  }

  render() {
    return (
      <div className={ classnames(styles.container) }
      >
        <div className={ classnames(styles["intro"],
          commonStyles["text-center"], commonStyles["content-outer"]) }
        >
          <VisibleSensor handleVisible={ this._handleAnimation }
            handleInvisible={ this._handleLeave }
          >
            <h2>點選狗狗圖示執行 TNR！</h2>
            <div className={ styles["inner"] } onClick={ this._handleGameStart }>
              <div className={ classnames(commonStyles["img-responsive"], commonStyles["overlay-svg"], styles["center-dog"]) }
                dangerouslySetInnerHTML={ { __html: gameIcon } }
              />
              <span className={ classnames(styles["start-btn"]) }>START</span>
            </div>
          </VisibleSensor>
        </div>
      </div>
    )
  }
}

Game.propTypes = {}
