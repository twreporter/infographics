/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import raf from "raf" // requestAnimationFrame polyfill

import classnames from "classnames"
import styles from "./FullPageMap.scss"
import commonStyles from "../../../styles/common.scss"

import { MOBILE_WIDTH } from "../config"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

const debounceTime = {
  threshold: 200,
  maxWait: 400,
}
const SLIDEIN_DURATION = 450

export default class FullPageMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
      isMobile: false,
      isScrolling: false,
      pageOffset: 500,
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
    this._EnterFirst = this._EnterFirst.bind(this)
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
    let isMobile = true
    if (window.innerWidth > MOBILE_WIDTH)
      isMobile = false
    this.setState({ isMobile: isMobile, pageOffset: window.scrollY })
  }

  _onScroll(e) {
    if (this.state.isScrolling) {
      console.log("===isScrolling")
      e.preventDefault()
    }
    else {
      console.log("===_requestTick")
      this._requestTick(e)
    }
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

  _EnterFirst(sLength) {
    const { isScrolling } = this.state
    if (!isScrolling) {
      this.setState({ isScrolling: true })
      // const htmlSel = document.getElementsByTagName("html")[0]

      const slide1 = ReactDOM.findDOMNode(this.slide1)

      console.log("offset:", -1*sLength+"px", slide1.getBoundingClientRect())

      velocity(slide1, "scroll", { offset: 0, duration: SLIDEIN_DURATION })
        .then(() =>
          setTimeout(() => this.setState({ isScrolling: false }), 600)
        )
    }
  }

  _EnterSecond(sLength) {
    const { isScrolling } = this.state
    if (!isScrolling) {
      this.setState({ isScrolling: true })
      // const htmlSel = document.getElementsByTagName("html")[0]

      const slide2 = ReactDOM.findDOMNode(this.slide2)

      console.log("offset:", -1*sLength+"px", slide2.getBoundingClientRect())

      velocity(slide2, "scroll", { offset: 0, duration: SLIDEIN_DURATION })
        .then(() => this.setState({ isScrolling: false }))
    }
  }

  _handleScroll() {
    const node = ReactDOM.findDOMNode(this.container)
    const rect = node.getBoundingClientRect()
    const { top, bottom, isScrolling } = rect
    const { isMobile, pageOffset } = this.state
    const vpHeight = window.innerHeight
    const currentOffset = window.scrollY
    const moveOffset = Math.abs(currentOffset - pageOffset)
    const isDown = (currentOffset > pageOffset) ? true : false

    console.log(moveOffset, currentOffset, pageOffset,  top, bottom, isMobile, vpHeight)

    if (node && !isScrolling) {
      // if (bottom > -pItemHeight && bottom < vpHeight+pItemHeight &&
      //     top < vpHeight+pItemHeight && top > -pItemHeight) {
      //   if (!this.state.isIn) {
      //     this.setState({ isIn: true })
      //   }
      // }
      // else {
      //   this.setState({ isIn: false })
      // }

      if (isDown && (top < vpHeight/3 && top > 0)) {
        this._EnterFirst(top)
      }
      else if (isDown && moveOffset<100 && (top<0  && top > -vpHeight/3)) {
        this._EnterFirst(top)
      }
      else if (!isDown && moveOffset<100 && (top<0  && top > -vpHeight/3)) {
        this._EnterFirst(top)
      }
      else if (isDown && moveOffset>=100 && (top<0  && top > -vpHeight/3)) {
        this._EnterSecond(top)
      }
    }

    this.setState({ pageOffset: currentOffset })
    // reset the tick to capture the next onScroll
    this._ticking = false
  }

  render() {

    return (
      <div className={ classnames(styles.container,
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ classnames(styles.slide, styles.odd) }
          ref={ (ref) => this.slide1 = ref }
        >
          slide 01
          <div className={ styles["des-box"] }>
            <h4 className={ styles["title"] }><span className={ styles["year"] }>2016</span> 現今</h4>
            <p>
              現今的收容所多由原本環保單位留下來的收容所設備改建。除非刻意，否則一般民眾不易前往。
            </p>
            <div className={ styles["tooltip"] }>
              <div className={ styles["oval-pink"] }></div>
              現今的收容所位置
            </div>
          </div>
        </div>
        <div className={ classnames(styles.slide, styles.even) }
          ref={ (ref) => this.slide2 = ref }
        >
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
