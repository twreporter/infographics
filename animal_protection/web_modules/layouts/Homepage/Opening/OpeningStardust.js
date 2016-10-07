/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len, react/no-multi-comp, react/jsx-closing-bracket-location  */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"

import classnames from "classnames"
import styles from "./OpeningStardust.scss"
import commonStyles from "../../../styles/common.scss"

import petDesktop from "../../../../content/assets/dog_bg_desktop_s.png"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

const debounceTime = {
  threshold: 15,
  maxWait: 45,
}

const colors = [ styles["blue"], styles["pink"], styles["white"], styles["blue"], styles["white"] ]

let DotsItems = () => {
  let dotsItems = []
  for (let i=0; i<250; i++) {
    dotsItems.push(<div key={ i } className={ classnames(styles["dot"], colors[i%4]) } 
      style={ { top: (i*i*7%1100)/10+"%", left:(((i*i+7)*i%2100)-1100)/10+"%" } }
                    ></div>)
  }

  return (
    <div>{ dotsItems }</div>
  )
}

let OverlayDotsItems = () => {
  let secondDotsItems = []
  for (let i=0; i<250; i++) {
    secondDotsItems.push(<div key={ i } className={ classnames(styles["dot"], colors[i%4]) } 
      style={ { top: (i*i*3%1100)/10+"%", left:(((i+5)*i%2200)-1100)/10+"%" } }
                    ></div>)
  }

  return (
    <div>{ secondDotsItems }</div>
  )
}

export default class OpeningStardust extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
      isIn: false,
      pinTopY: 0,
      scrollRatio: 0,
    }
    this.pItemHeight = 100
    this._handleScroll = this._handleScroll.bind(this)
    this.debouncedScroll = _.debounce(() => {
      this._handleScroll()
    }, debounceTime.threshold, { "maxWait": debounceTime.maxWait })
  }

  componentDidMount() {
    console.log("***componentDidMount")
    const pinNode = ReactDOM.findDOMNode(this.pinnedItem)
    console.log("***pinNode", pinNode)
    if (pinNode) {
      this.pItemHeight = pinNode.clientHeight || 100
    }

    // detect sroll position
    window.addEventListener("scroll", this.debouncedScroll)

    velocity(this.block, { scale: 2 }, 500)
            .then(() => console.log("animation complete"))

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isIn!==this.state.isIn) {
      return true
    }
    return false
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.debouncedScroll)
  }

  _getRatio(_val) {
    const val = Math.abs(_val)
    return (val > 1) ? 1 : val
  }

  _handleScroll() {
    const node = ReactDOM.findDOMNode(this.container)
    const rect = node.getBoundingClientRect()
    const { top, bottom } = rect
    const vpHeight = window.innerHeight

    if (this.pItemHeight) {
      if (bottom > vpHeight && bottom &&
                top < (vpHeight / 2 - this.pItemHeight / 2)) {
        this.setState({ isIn: true, pinTopY: vpHeight / 2 })
      } 
      else if (bottom < vpHeight && bottom > 0 &&
                top < (vpHeight / 2 - this.pItemHeight / 2)) {
        const topY = Math.round(bottom - vpHeight / 2)
        this.setState({ pinTopY: topY })
        console.log("pinTopY: ", topY)
        velocity(this.pinnedItem, {
          top: topY,
        }, 1)
      } 
      else {
        this.setState({ isIn: false })
      }
    }

    if (top < vpHeight / 2 && bottom > vpHeight / 2) {
            // if user is viewing the content of the container
      let sRatio = Math.abs((top - vpHeight / 2) / (bottom - top))
      sRatio = Math.round(sRatio * 100) / 100
      this.setState({ scrollRatio: sRatio })
      velocity(this.petImgs, {
        translateY: "-" + Math.abs(sRatio * 3000) + "px",
        translateZ: (300 - sRatio * 2000) + "px",
        opacity: this._getRatio((1.6 - sRatio) * (1 - sRatio) * (1 - sRatio)),
      }, 1)
      velocity(this.dots, {
        translateY: "-" + Math.abs(sRatio * 6000) + "px",
        translateZ: (1500 - Math.abs(sRatio * 6100)) + "px",
        opacity: this._getRatio(1.5 - sRatio),
      }, 1)
      velocity(this.secondDots, {
        translateY: "-" + Math.abs(sRatio * 3800 - 400) + "px",
        translateZ: (2200 - Math.abs(sRatio * 5700)) + "px",
        opacity: this._getRatio(1.9 - sRatio),
      }, 1)

    } 
    else if (bottom < 0)
      this.setState({ scrollRatio: 1 })
    else
      this.setState({ scrollRatio: 0 })
  }

  render() {
    const { isIn } = this.state

    const centerClass = (isIn) ? commonStyles["fixedCenter"] : null
    console.log("rerender")
    
    return (
      <div className={ classnames(styles.container, 
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ commonStyles["content-outer"] }>
          <div 
            className={ classnames(centerClass) }
            ref={ (ref) => this.pinnedItem = ref }
          >
            <div className={ styles["dots-container"] }>
              <div className={ styles["pet-container"] }
                ref={ (ref) => this.petImgs = ref }
              >
                <img src={ petDesktop } />
              </div>

              <div className={ styles["overlay-dots-container"] }
                ref={ (ref) => this.dots = ref }
              >
                <DotsItems />
              </div>
              <div className={ styles["overlay-dots-container"] }
                ref={ (ref) => this.secondDots = ref }
              >
                <OverlayDotsItems />
              </div>
            </div>
            <div className={ commonStyles["content-outer"] }></div>
            
          </div>

          <div className={ commonStyles["content-outer"] }>
            <p className={ styles["des-text"] }>還有更多的狗狗與憂憂面對相似的命運</p>
          </div>
        </div>
      </div>
    )
  }
}

OpeningStardust.propTypes = {}

