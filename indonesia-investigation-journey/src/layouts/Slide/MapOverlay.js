/* eslint-disable react/no-find-dom-node */
import React, { Component, PropTypes } from "react"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import SVGInline from "react-svg-inline"

import styles from "./MapOverlay.scss"

import mapImg from "../../../content/assets/map1207.svg"
import mapImgMobile from "../../../content/assets/map1207-m.svg"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

class MapOverlay extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.playLineAnimation()
  }

  componentDidUpdate(prevProps) {
    const { isMobile } = this.props
    if(prevProps.isMobile !== isMobile) {
      this.playLineAnimation()
    }
  }

  playLineAnimation() {
    const startMark = document.getElementById("rectStart")
    const endMark = document.getElementById("rectEnd")
    const lineJourney = document.getElementById("lineJourney")
    const journeyLength = document.getElementById("journeyLength")
    if(startMark && endMark && lineJourney && journeyLength) {
      const jLength = lineJourney.getTotalLength()
      lineJourney.style.strokeDasharray = jLength + ' ' + jLength
      lineJourney.style.strokeDashoffset = jLength
      startMark.style.opacity = '0'
      endMark.style.opacity = '0'
      journeyLength.style.opacity = '0'

      velocity(startMark, { opacity: [ 1, 0 ] }, { delay: 1300, duration: 700, easing: "easeInOut" })
        .then(() => {
          return velocity(lineJourney, {"stroke-dashoffset": [0,jLength]}, { duration: 2200, easing: "easeInOut" })
        })
        .then(() => {
          return velocity(endMark, { opacity: [ 1, 0 ] }, { duration: 500, easing: "easeInOut" })
        })
        .then(() => {
          return velocity(journeyLength, { opacity: [ 1, 0 ] }, { duration: 500, easing: "easeOut" })
        })
    }
  }

  render() {
    const { isMobile } = this.props
    const imgSrc = isMobile ? mapImgMobile : mapImg

    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={800}
        transitionEnterTimeout={800}
        transitionLeaveTimeout={800}>
        <div className={ styles["bg-overlay"] }>
          <div className={ styles["container"] }>
            <SVGInline className={styles["icon"]} svg={ imgSrc } />
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }

}

MapOverlay.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default MapOverlay
