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
const SLIDE_TIMEOUT = 920
const SLIDEIN_LONG = 150
const SLIDEIN_SHORT = 30
const SLIDE_THRESHOLD = 30

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
    window.addEventListener("mousewheel", this._onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
    window.removeEventListener("mousewheel", this._onScroll)
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
      this.setState({ pageOffset: window.scrollY })
      e.preventDefault()
      e.stopPropagation()
      // e.returnValue = false
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

  _EnterFirst(cTop, sDuration) {
    const { isScrolling } = this.state
    if (!isScrolling) {
      this.setState({ isScrolling: true })
      // const htmlSel = document.getElementsByTagName("html")[0]

      const slide1 = ReactDOM.findDOMNode(this.slide1)

      console.log("cTop", cTop, "offset:", slide1.getBoundingClientRect())

      velocity(slide1, "scroll", { offset: 0, duration: sDuration })
        .then(() =>
          setTimeout(() => {
            window.scrollTo(0, cTop)
            this.setState({ isScrolling: false })
            console.log("SCROLLING STOP")
          }, SLIDE_TIMEOUT)
        )
    }
  }

  _EnterSecond(cTop, sDuration) {
    const { isScrolling } = this.state
    if (!isScrolling) {
      this.setState({ isScrolling: true })
      // const htmlSel = document.getElementsByTagName("html")[0]

      const slide2 = ReactDOM.findDOMNode(this.slide2)

      console.log("cTop", cTop, "offset:", slide2.getBoundingClientRect())

      velocity(slide2, "scroll", { offset: 0, duration: sDuration })
        .then(() =>
          setTimeout(() => {
            window.scrollTo(0, cTop)
            this.setState({ isScrolling: false })
            console.log("SCROLLING STOP")
          }, SLIDE_TIMEOUT)
        )
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
    const cTop = node.offsetTop

    console.log(cTop, moveOffset, currentOffset, pageOffset,  top, bottom, isMobile, vpHeight)

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

      if (isDown && (top < 2*vpHeight/5 && top > 0)) {
        console.log("1.")
        this._EnterFirst(cTop, SLIDEIN_LONG)
      }
      else if (moveOffset<SLIDE_THRESHOLD && (top<0  && top > -vpHeight)) {
        console.log("2.")
        this._EnterFirst(cTop, SLIDEIN_SHORT)
      }
      else if (!isDown && moveOffset<SLIDE_THRESHOLD && (top<0  && top > -vpHeight/2)) {
        console.log("3.")
        this._EnterFirst(cTop, SLIDEIN_SHORT)
      }
      else if (isDown && moveOffset>=SLIDE_THRESHOLD && (top<0  && top > -vpHeight)) {
        console.log("4.")
        this._EnterSecond(cTop+vpHeight, SLIDEIN_LONG)
      }
      else if (!isDown && moveOffset>=SLIDE_THRESHOLD && (top<=-vpHeight/2  && top > -3*vpHeight/2)) {
        console.log("5.")
        this._EnterFirst(cTop, SLIDEIN_SHORT)
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
            <h4 className={ styles["title"] }><span className={ styles["year"] }>1998</span> 以前</h4>
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
        <div className={ classnames(styles.slide, styles.odd) }>
          slide 03
        </div>
      </div>
    )
  }
}

FullPageMap.propTypes = {}
