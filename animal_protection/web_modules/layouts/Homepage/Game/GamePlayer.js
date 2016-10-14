/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"

import classnames from "classnames"
import styles from "./GamePlayer.scss"
import commonStyles from "../../../styles/common.scss"

import gameIcon from "../../../../content/assets/game_start_icon.svg"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

export default class GamePlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isIntoHidden: true,
      isClosing: false,
    }
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    const { outerWidth, outerHeight, outerTop } = this.props
    velocity(this.container, { width: [ "100%", outerWidth ], height: [ "100%", outerHeight ],
      top: [ 0, outerTop ], translateX: [ "-50%", "-50%" ] }, { duration: 1000, easing: "easeInOutSine" })
  }

  handleClose() {
    const { outerWidth, outerHeight, outerTop } = this.props
    this.setState({ isClosing: true })
    velocity(this.container, { width: outerWidth, height: outerHeight, top: outerTop }, 1000)
      .then(() => this.props.onClose())
  }

  render() {
    const { isIntoHidden, isClosing } = this.state
    const introClass = isIntoHidden ? styles["hide"] : null
    const closingClass = isClosing ? styles["hide-fast"] : null

    return (
      <div className={ classnames(styles.container) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ classnames(styles["intro"],
          commonStyles["text-center"], commonStyles["content-outer"]) }
        >
          <span className={ classnames(styles["close-button"], closingClass) } onClick={ this.handleClose }></span>
          <div className={ introClass }>
            <h2>點選狗狗圖示執行 TNR！</h2>
            <div className={ styles["inner"] }>
              <div className={ classnames(commonStyles["img-responsive"], commonStyles["overlay-svg"], styles["center-dog"]) }
                dangerouslySetInnerHTML={ { __html: gameIcon } }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

GamePlayer.propTypes = {}
