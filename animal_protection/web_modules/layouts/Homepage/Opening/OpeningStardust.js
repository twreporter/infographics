/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"

import classnames from "classnames"
import styles from "./OpeningStardust.scss"
import commonStyles from "../../../styles/common.scss"

import pet1 from "../../../../content/assets/dog01.jpg"
import pet2 from "../../../../content/assets/dog02.jpg"
import pet3 from "../../../../content/assets/dog03.jpg"
import pet4 from "../../../../content/assets/dog04.jpg"

const pets = [ pet1, pet2, pet3, pet4 ]

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

const debounceTime = {
  threshold: 10,
  maxWait: 20,
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

  componentWillUnmount() {
    window.removeEventListener("scroll", this.debouncedScroll)
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
        this.setState({ pinTopY: bottom - vpHeight / 2 })
      }
      else {
        this.setState({ isIn: false })
      }
    }

    if (top < vpHeight/2 && bottom > vpHeight/2) {
      // if user is viewing the content of the container
      const sRatio = Math.abs((top - vpHeight/2) / (bottom - top))
      this.setState({ scrollRatio: sRatio })
      velocity(this.petImgs, { 
        translateY: "-" + Math.abs(sRatio * 2500) + "px",
        translateZ: "-" + Math.abs(sRatio * 3000) + "px",
        opacity: Math.abs(1 - sRatio),
      }, 5)
      velocity(this.dots, { 
        translateY: "-" + Math.abs(sRatio * 2500) + "px",
        translateZ: (500 - Math.abs(sRatio * 3000)) + "px",
      }, 5)
      
    } 
    else if (bottom < 0)
      this.setState({ scrollRatio: 1 })
    else
      this.setState({ scrollRatio: 0 })
  }

  render() {
    const { scrollRatio } = this.state

    const centerClass = (this.state.isIn) ? commonStyles["fixedCenter"] : null
    console.log("scrollRatio:", scrollRatio)

    let petItems = []
    let dotsItems = []
    for (let i=0; i<36; i++) {
      petItems.push(<div className={ styles["pet-item"] }>
                  <img src={ pets[i%4] } />
                </div>)
    }

    const colors = [ styles["blue"], styles["pink"], styles["white"], styles["blue"] ]
    for (let i=0; i<300; i++) {
      dotsItems.push(<div className={ classnames(styles["dot"], colors[i%4]) } 
        style={ { top: (i*i*2%1000)/10+"%", left:(((i+3)*i%2200)-1100)/10+"%" } }
                     ></div>)
    }

    return (
      <div className={ classnames(styles.container, 
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ commonStyles["content-outer"] }>
          <div 
            className={ classnames(centerClass) }
            style={ { top: this.state.pinTopY } }
            ref={ (ref) => this.pinnedItem = ref }
          >
            <div className={ styles["dots-container"] }>
              <div className={ styles["pet-container"] }
                ref={ (ref) => this.petImgs = ref }
              >
                { petItems }
              </div>

              <div className={ styles["overlay-dots-container"] }
                ref={ (ref) => this.dots = ref }
              >
                { dotsItems }
              </div>
            </div>
            
            <div className={ commonStyles["content-outer"] }>
              <p>還有更多的狗狗與憂憂面對相似的命運</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OpeningStardust.propTypes = {}
