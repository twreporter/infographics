/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"

import Img from "react-image-holder"
import classnames from "classnames"
import styles from "./OpeningSec1.scss"
import commonStyles from "../../../styles/common.scss"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

const debounceTime = {
  threshold: 10,
  maxWait: 20,
}

export default class OpeningSec1 extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
      isIn: false,
      pinTopY: 0,
      scrollRatio: -1,
    }
    this.pItemHeight = 100
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

    // detect sroll position
    window.addEventListener("scroll", this.debouncedScroll)

    // velocity(this.block, { scale: 2 }, 500)
    //   .then(() => console.log("animation complete"))

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

    if (top < vpHeight && bottom > 0)
      this.setState({ scrollRatio: Math.abs((top - vpHeight) / (bottom - top + vpHeight)) })
    else 
      this.setState({ scrollRatio: -1 })
  }

  render() {
    const centerClass = (this.state.isIn) ? commonStyles["fixedCenter"] : null

    return (
      <div className={ classnames(styles.container, 
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ commonStyles["content-outer"] }>
          <div 
            className={ classnames(commonStyles["content-outer"], centerClass) }
            style={ { top: this.state.pinTopY } }
            ref={ (ref) => this.pinnedItem = ref }
          >
            <h1>Opening Section 1</h1>
            <Img src="" width="800"
              className={ classnames(commonStyles["img-responsive"]) }
              height="500" placeholder={ { theme: "sky" } } usePlaceholder
            />
          </div>
        </div>
      </div>
    )
  }
}

OpeningSec1.propTypes = {}