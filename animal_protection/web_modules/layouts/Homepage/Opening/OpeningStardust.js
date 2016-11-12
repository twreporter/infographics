/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"
// import { Layer, Circle, Stage } from "react-konva"

import classnames from "classnames"
import styles from "./OpeningStardust.scss"
import commonStyles from "../../../styles/common.scss"

import { MOBILE_WIDTH } from "../config"

import { endingParagraphs } from "./text"

import petDesktop from "../../../../content/assets/dog_bg_desktop_s.png"
import petMobile from "../../../../content/assets/dog_bg_mobile.png"

let velocity
let Layer
let Circle
let Stage
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
  const Konva = require("react-konva")
  Layer = Konva.Layer
  Circle = Konva.Circle
  Stage = Konva.Stage
}

const debounceTime = {
  threshold: 15,
  maxWait: 45,
}

// const colors = [ styles["blue"], styles["pink"], styles["white"], styles["blue"], styles["white"] ]
const colorArr = [ "rgba(17, 104, 217, 0.5)", "rgba(244, 114, 165, 0.6)",
   "rgba(255, 255, 255, 0.4)", "rgba(17, 104, 217, 0.5)", "rgba(255, 255, 255, 0.4)" ]

export default class OpeningStardust extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
      isIn: false,
      isMobile: false,
      pinTopY: 0,
      wWidth: 800,
      wHeight: 800,
      scrollRatio: 0,
    }
    this.pItemHeight = 100
    this._handleResize = this._handleResize.bind(this)
    this.handleResize = _.debounce(() => {
      this._handleResize()
    }, debounceTime.threshold, { "maxWait": debounceTime.maxWait })

    this._handleScroll = this._handleScroll.bind(this)
    this.debouncedScroll = _.debounce(() => {
      this._handleScroll()
    }, debounceTime.threshold, { "maxWait": debounceTime.maxWait })
  }

  componentDidMount() {
    const pinNode = ReactDOM.findDOMNode(this.pinnedItem)
    if (pinNode) {
      this.pItemHeight = pinNode.clientHeight || 100
    }

    // detect window width
    window.addEventListener("resize", this.handleResize)
    this._handleResize()

    // detect sroll position
    window.addEventListener("scroll", this.debouncedScroll)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isMobile!==this.state.isMobile
    || nextState.wWidth!==this.state.wWidth) {
      return true
    }
    return false
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
    window.removeEventListener("scroll", this.debouncedScroll)
  }

  _getRatio(_val) {
    const val = Math.abs(_val)
    return (val > 1) ? 1 : val
  }

  _handleResize() {
    this.setState({ wWidth: window.innerWidth, wHeight: window.innerHeight })
    if (window.innerWidth > MOBILE_WIDTH)
      this.setState({ isMobile: false })
    else
      this.setState({ isMobile: true })
  }

  _handleScroll() {
    const node = ReactDOM.findDOMNode(this.container)
    const rect = node.getBoundingClientRect()
    const { top, bottom } = rect
    const vpHeight = window.innerHeight
    const frames = this.state.isMobile ? 30 : 16
    const scaleFactor = this.state.isMobile ? 0.5 : 1

    if (this.pItemHeight) {
      if (bottom > vpHeight && bottom > 0 &&
                top < (vpHeight / 2 - this.pItemHeight / 2)) {
        this.setState({ isIn: true, pinTopY: vpHeight / 2 })
      }
      else if (bottom < vpHeight && bottom > 0 &&
                top < (vpHeight / 2 - this.pItemHeight / 2)) {
        const topY = Math.round((bottom - vpHeight / 2) * frames) / frames
        if (this.state.pinTopY !== topY) {
          this.setState({ pinTopY: topY })
          velocity(this.pinnedItem, {
            top: topY,
          }, 1)
        }
      }
      else {
        this.setState({ isIn: false })
      }
    }

    if (top < vpHeight / 2 && bottom > vpHeight / 2) {
      // if user is viewing the content of the container
      let sRatio = Math.abs((top - vpHeight / 2) / (bottom - top))
      sRatio = Math.round(sRatio * frames) / frames
      if (this.state.scrollRatio !== sRatio) {
        this.setState({ scrollRatio: sRatio })
        velocity(this.petImgs, {
          translateX: "-50%",
          translateY: Math.abs(sRatio * 14) + "vh",
          translateZ: (5 - sRatio * (1+sRatio)* (1+sRatio) * 90) * scaleFactor + "px",
          opacity: this._getRatio((1.4 - sRatio) * (1.3 - sRatio) * (1.1 - sRatio) * (1.1 - sRatio)),
        }, 1)
        velocity(this.dots, {
          translateX: "-50%",
          translateY: Math.abs(sRatio * 13.5) + "vh",
          translateZ: (120 - Math.abs(sRatio * 270)) * scaleFactor + "px",
          opacity: this._getRatio(1.4 - sRatio),
        }, 5)
        velocity(this.secondDots, {
          translateX: "-50%",
          translateY: Math.abs(sRatio * 4) + "vh",
          translateZ: (170 - Math.abs(sRatio * 290)) * scaleFactor + "px",
          opacity: this._getRatio(1.75 - sRatio),
        }, 1)
      }
    }
    else if (bottom < 0)
      this.setState({ scrollRatio: 1 })
    else
      this.setState({ scrollRatio: 0 })
  }

  render() {
    const { isMobile, wWidth, wHeight } = this.state

    const petBg = isMobile ? petMobile : petDesktop

    const dotsCnt = isMobile ? 230 : 500
    const overlayDotsCnt = isMobile ? 100 : 400
    const dotsRadius = isMobile ? 5.5 : 10
    let dotsItems = []
    let overlayDotsItems = []
    let dotsCanvas
    let overlayDotsCanvas
    if (typeof window !== "undefined") {
      for (let i=0; i<dotsCnt; i++) {
        dotsItems.push(<Circle key={ i }
          radius={ dotsRadius }
          fill={ colorArr[i%4] }
          x={ (i*i*i*37%1950 + 25)/1000*wWidth }
          y={ (((i+17)*i)%1950 + 25)/1000*wHeight } />)
      }
      for (let i=0; i<overlayDotsCnt; i++) {
        overlayDotsItems.push(<Circle key={ i }
          radius={ dotsRadius }
          fill={ colorArr[i%4] }
          x={ (i*i*37%1950 + 25)/1000*wWidth }
          y={ (((i+37)*i)*i%1950 + 25)/1000*wHeight } />)
      }
      dotsCanvas = (<Stage width={ wWidth*2 } height={ wHeight*2 }>
           <Layer>
              { dotsItems }
            </Layer>
          </Stage>)
      overlayDotsCanvas = (<Stage width={ wWidth*2 } height={ wHeight*2 }>
            <Layer>
              { overlayDotsItems }
            </Layer>
          </Stage>)

    }

    return (
      <div className={ classnames(styles.container,
      commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >

        <div
          className={ classnames(styles["outer"]) }
          ref={ (ref) => this.pinnedItem = ref }
        >
          <div className={ styles["dots-container"] }>
            <div>
              <div className={ styles["pet-container"] }
                ref={ (ref) => this.petImgs = ref }
              >
                <img src={ petBg } />
              </div>

              <div className={ styles["overlay-dots-container"] }
                ref={ (ref) => this.dots = ref }
              >
                { dotsCanvas }
              </div>

              <div className={ styles["overlay-dots-container2"] }
                ref={ (ref) => this.secondDots = ref }
              >
                { overlayDotsCanvas }
              </div>
            </div>

          </div>
          <div className={ commonStyles["content-outer"] }></div>

        </div>

        <div>
          { (isMobile) ?
              null
              : null
          }
          <div className={ commonStyles["content-outer"] }>
            <div className={ styles["des-text"] }>
              <p>
                { endingParagraphs[0] }
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OpeningStardust.propTypes = {}
