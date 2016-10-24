/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import raf from "raf" // requestAnimationFrame polyfill

import classnames from "classnames"
import styles from "./FullPageMap.scss"
import commonStyles from "../../../styles/common.scss"

import { MOBILE_WIDTH } from "../config"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

const debounceTime = {
  threshold: 150,
  maxWait: 450,
}

export default class FullPageMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
    }

    this._handleScroll = this._handleScroll.bind(this)
    this.debouncedScroll = _.debounce(() => {
      this._handleScroll()
    }, debounceTime.threshold, { "maxWait": debounceTime.maxWait })
    this._onScroll = this._onScroll.bind(this)

    this._handleResize = this._handleResize.bind(this)
    this.handleResize = _.debounce(() => {
      this._handleResize()
    }, debounceTime.threshold, { "maxWait": debounceTime.maxWait })
  }

  componentDidMount() {
    // detect window width
    window.addEventListener("resize", this.handleResize)
    this.handleResize()

    // detect sroll position
    window.addEventListener("scroll", this._onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
    window.removeEventListener("scroll", this._onScroll)
    this._ticking = false
    this.clearRAF()
  }

  _handleResize() {
    if (window.innerWidth > MOBILE_WIDTH)
      this.setState({ isMobile: false })
    else
      this.setState({ isMobile: true })
  }

  _onScroll() {
    this._requestTick()
  }

  clearRAF() {
    raf.cancel(this._raf)
  }

  _requestTick() {
    if (!this._ticking) {
      this._raf = raf(this.debouncedScroll)
      this._ticking = true
    }
  }

  _handleScroll() {
    const node = ReactDOM.findDOMNode(this.container)
    const rect = node.getBoundingClientRect()
    const { top, bottom } = rect
    const vpHeight = window.innerHeight
    const pItemHeight = node.clientHeight || 100

    console.log(top, bottom)

    if (node) {
      if (bottom > -pItemHeight && bottom < vpHeight+pItemHeight &&
          top < vpHeight+pItemHeight && top > -pItemHeight) {
        if (!this.state.isIn) {
          this.setState({ isIn: true })
        }
      }
      else {
        this.setState({ isIn: false })
      }
    }

    // reset the tick to capture the next onScroll
    this._ticking = false
  }

  render() {

    return (
      <div className={ classnames(styles.container,
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ classnames(styles.slide, styles.odd) }>
          slide 01
          <div className={ styles["des-box"] }>
            <h4 className={ styles["title"] }>2016 現今</h4>
            <p>
              現今的收容所多由原本環保單位留下來的收容所設備改建。除非刻意，否則一般民眾不易前往。
            </p>
            <div className={ styles["tooltip"] }>
              <div className={ styles["oval-pink"] }></div>
              現今的收容所位置
            </div>
          </div>
        </div>
        <div className={ classnames(styles.slide, styles.even) }>
          slide 02
        </div>
        <div className={ classnames(styles.slide, styles.odd) }>
          slide 03
        </div>
      </div>
    )
  }
}

FullPageMap.propTypes = {}
