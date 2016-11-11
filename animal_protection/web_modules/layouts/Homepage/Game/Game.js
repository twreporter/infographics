/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"
import ReactDOM from "react-dom"

import classnames from "classnames"
import styles from "./Game.scss"
import commonStyles from "../../../styles/common.scss"
import VisibleSensor from "../Components/VisibleSensor"
import GamePlayer from "./GamePlayer"

import gameIcon from "../../../../content/assets/game_start_icon.svg"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      width: 500,
      height: 500,
      top: 100,
    }
    this.handlePlayerClose = this.handlePlayerClose.bind(this)
    this.handleGameStart = this.handleGameStart.bind(this)
  }

  componentDidUpdate() {
    const { isPlaying  } = this.state
    this._checkIfPopupShown(isPlaying)
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

  _checkIfPopupShown(isOpen) {
    // disable the page scrolling function if the Topic popup is being open
    if (isOpen) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden"
    }
    else {
      document.getElementsByTagName("html")[0].style.overflow = "auto"
    }
  }

  handlePlayerClose() {
    this.setState({ isPlaying: false })
  }

  handleGameStart() {
    // show the popup for users to play the game
    if (!this.state.isPlaying) {
      const node = ReactDOM.findDOMNode(this.container)
      const rect = node.getBoundingClientRect()
      this.setState({ isPlaying: true, width: node.clientWidth, height: node.clientHeight, top: rect.top })
    }
  }

  render() {
    const { isPlaying, width, height, top } = this.state

    const gameContainer = isPlaying ?
      <GamePlayer outerWidth={ width } outerHeight={ height } outerTop={ top } onClose={ this.handlePlayerClose } /> : null

    return (
      <div id="tnr-game" className={ classnames(styles.container) }>
        <div className={ classnames(styles["intro"],
          commonStyles["text-center"], commonStyles["content-outer"]) }
          ref={ (ref) => this.container = ref }
        >
          <VisibleSensor handleVisible={ this._handleAnimation }
            handleInvisible={ this._handleLeave }
          >
            <h2>點擊狗狗圖示施行TNR <br /> 減少新生狗狗數量！</h2>
            <div className={ styles["inner"] } onClick={ this.handleGameStart }>
              <div className={ classnames(commonStyles["img-responsive"], commonStyles["overlay-svg"], styles["center-dog"]) }
                dangerouslySetInnerHTML={ { __html: gameIcon } }
              />
              <span className={ classnames(styles["start-btn"]) }>START</span>
            </div>
          </VisibleSensor>
        </div>
        { gameContainer }
      </div>
    )
  }
}

Game.propTypes = {}
