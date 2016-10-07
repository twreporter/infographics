/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"

import classnames from "classnames"
import styles from "./OpeningStardust.scss"
import commonStyles from "../../../styles/common.scss"

import petDesktop from "../../../../content/assets/dog_bg_desktop_s.png"
import petMobile from "../../../../content/assets/dog_bg_mobile.png"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

const debounceTime = {
  threshold: 15,
  maxWait: 45,
}

const MOBILE_WIDTH = 768

const colors = [ styles["blue"], styles["pink"], styles["white"], styles["blue"], styles["white"] ]

let DotsItems = (props) => {
  const dotsCnt = props.isMobile ? 150 : 300
  const cWidth = props.isMobile ? 600 : 800
  let dotsItems = []
  for (let i=0; i<dotsCnt; i++) {
    dotsItems.push(<div key={ i } className={ classnames(styles["dot"], colors[i%4]) } 
      style={ { top: (i*i*7%1300)/10+"%", left:(((i*i+7)*i%cWidth)-cWidth/2+5)/10+"%" } }
                    ></div>)
  }

  return (
    <div>{ dotsItems }</div>
  )
}

let OverlayDotsItems = (props) => {
  const dotsCnt = props.isMobile ? 150 : 350
  const cWidth = props.isMobile ? 900 : 1200
  let secondDotsItems = []
  for (let i=0; i<dotsCnt; i++) {
    secondDotsItems.push(<div key={ i } className={ classnames(styles["dot"], colors[i%4]) } 
      style={ { top: (i*i*3%1200)/10+"%", left:(((i+5)*i%cWidth)-cWidth/2+20)/10+"%" } }
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
      isMobile: false,
      pinTopY: 0,
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
    this.handleResize()

    // detect sroll position
    window.addEventListener("scroll", this.debouncedScroll)

    velocity(this.block, { scale: 2 }, 500)
            .then(() => console.log("animation complete"))

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isIn!==this.state.isIn || nextState.isMobile!==this.state.isMobile) {
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
    const frames = this.state.isMobile ? 12 : 120

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
      const petTransY = this.state.isMobile ? 1600 : 2800
      let sRatio = Math.abs((top - vpHeight / 2) / (bottom - top))
      sRatio = Math.round(sRatio * frames) / frames
      if (this.state.scrollRatio !== sRatio) {
        this.setState({ scrollRatio: sRatio })
        if (!this.state.isMobile) {
          velocity(this.petImgs, {
            translateY: "-" + Math.abs(sRatio * petTransY) + "px",
            translateZ: (300 - sRatio * 2200) + "px",
            opacity: this._getRatio((1.6 - sRatio) * (1 - sRatio) * (1 - sRatio)),
          }, 1)
          velocity(this.dots, {
            translateY: "-" + Math.abs(sRatio * 7200) + "px",
            translateZ: (1500 - Math.abs(sRatio * 6600)) + "px",
            opacity: this._getRatio(1.5 - sRatio),
          }, 5)
        }
        velocity(this.secondDots, {
          translateY: "-" + Math.abs(sRatio * 4000 - 600) + "px",
          translateZ: (2300 - Math.abs(sRatio * 5900)) + "px",
          opacity: this._getRatio(1.9 - sRatio),
        }, 1)
      }
    } 
    else if (bottom < 0)
      this.setState({ scrollRatio: 1 })
    else
      this.setState({ scrollRatio: 0 })
  }

  render() {
    const { isIn, isMobile } = this.state

    const centerClass = isIn ? commonStyles["fixedCenter"] : null
    const petBg = isMobile ? petMobile : petDesktop
            
    return (
      <div className={ classnames(styles.container, 
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
        
        <div 
          className={ classnames(centerClass, styles["outer"]) }
          ref={ (ref) => this.pinnedItem = ref }
        >
          <div className={ styles["dots-container"] }>

            { (isMobile) ? null :
            <div>  
              <div className={ styles["pet-container"] }
                ref={ (ref) => this.petImgs = ref }
              >
                <img src={ petBg } />
              </div>

              <div className={ styles["overlay-dots-container"] }
                ref={ (ref) => this.dots = ref }
              >
                <DotsItems /> 
              </div>
            </div>
            }
            
            <div className={ styles["overlay-dots-container"] }
              ref={ (ref) => this.secondDots = ref }
            >
              <OverlayDotsItems isMobile={ isMobile } />
            </div>
          </div>
          <div className={ commonStyles["content-outer"] }></div>
          
        </div>

        <div className={ commonStyles["content-outer"] }>

          <div className={ commonStyles["content-outer"] }>
            <p className={ styles["des-text"] }>還有更多的狗狗與憂憂面對相似的命運</p>
          </div>
        </div>
      </div>
    )
  }
}

OpeningStardust.propTypes = {}

