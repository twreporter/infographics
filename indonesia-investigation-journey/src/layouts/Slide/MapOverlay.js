/* eslint-disable react/no-find-dom-node */
import React, { Component, PropTypes } from "react"
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

      velocity(startMark, { opacity: [ 1, 0 ] }, { duration: 800, easing: "easeInOut" })
        .then(() => {
          return velocity(lineJourney, {"stroke-dashoffset": [0,jLength]}, { duration: 1800, easing: "easeIn" })
        })
        .then(() => {
          return velocity(endMark, { opacity: [ 1, 0 ] }, { duration: 350, easing: "easeInOut" })
        })
        .then(() => {
          return velocity(journeyLength, { opacity: [ 1, 0 ] }, { duration: 400, easing: "easeOut" })
        })
    }
  }

  render() {
    const { isMobile } = this.props
    const imgSrc = isMobile ? mapImgMobile : mapImg

    return (
      <div className={ styles["bg-overlay"] }>
        <div className={ styles["container"] }>
          <SVGInline className={styles["icon"]} svg={ imgSrc } />
        </div>
      </div>
    )
  }

}

MapOverlay.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default MapOverlay
