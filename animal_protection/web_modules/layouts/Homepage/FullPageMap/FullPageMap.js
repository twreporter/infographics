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
  threshold: 150,
  maxWait: 300,
}
const SLIDE_TIMEOUT = 550
const SLIDEIN_LONG = 400
const SLIDEIN_SHORT = 10
const SLIDE_THRESHOLD = 2

export default class FullPageMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
      isMobile: false,
      isScrolling: false,
      pageOffset: 500,
      curSlide: -1,
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
    window.addEventListener("touchmove", this._onScroll)
    window.addEventListener("touchstop", this._onScroll)
    window.addEventListener("mousewheel", this._onScroll)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.curSlide !== nextState.curSlide) {
      return true
    }
    return false
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
    window.removeEventListener("touchmove", this._onScroll)
    window.addEventListener("touchstop", this._onScroll)
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

  _EnterSlide(cTop, slide, sDuration) {
    const { isScrolling } = this.state
    if (!isScrolling) {
      this.setState({ isScrolling: true })

      console.log("cTop", cTop, "offset:", slide.getBoundingClientRect())

      velocity(slide, "scroll", { offset: 0, duration: sDuration })
        .then(() =>
          setTimeout(() => {
            window.scrollTo(0, cTop)
            this.setState({ isScrolling: false })
            console.log("SCROLLING STOP")
          }, SLIDE_TIMEOUT)
        )
    }
  }

  _EnterFirst(cTop, sDuration) {
    const slide1 = ReactDOM.findDOMNode(this.slide1)
    this._EnterSlide(cTop, slide1, sDuration)
    this.setState({ curSlide: 1 })
  }

  _EnterSecond(cTop, sDuration) {
    const slide2 = ReactDOM.findDOMNode(this.slide2)
    this._EnterSlide(cTop, slide2, sDuration)
    this.setState({ curSlide: 2 })
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

      if (isDown && (top < 1*vpHeight/2 && top > 0)) {
        console.log("1.")
        this._EnterFirst(cTop, SLIDEIN_LONG)
      }
      else if (isDown && moveOffset<SLIDE_THRESHOLD && (top<0  && top > -vpHeight)) {
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
      else if (!isDown && moveOffset>=SLIDE_THRESHOLD && (top<= -3*vpHeight/2  && top > -2*vpHeight)) {
        console.log("5.")
        this._EnterSecond(cTop+vpHeight, SLIDEIN_LONG)
      }
      else if (!isDown && moveOffset>=SLIDE_THRESHOLD && (top<=-vpHeight/2  && top > -3*vpHeight/2)) {
        console.log("6.")
        this._EnterFirst(cTop, SLIDEIN_SHORT)
      }
      else if (top>0 || top < -vpHeight) {
        this.setState({ curSlide: -1 })
      }
    }

    this.setState({ pageOffset: currentOffset })
    // reset the tick to capture the next onScroll
    this._ticking = false
  }

  render() {
    const { curSlide } = this.state
    const indClass = (curSlide < 0) ? commonStyles["hide"] : null
    const ind1 = (curSlide === 1) ? styles["active"] : null
    const ind2 = (curSlide === 2) ? styles["active"] : null

    return (
      <div className={ classnames(styles.container,
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ classnames(styles.indicator, indClass) }>
          <div className={ classnames(styles["bar"], ind1) }></div>
          <div className={ classnames(styles["bar"], ind2) }></div>
        </div>
        <div className={ classnames(styles.slide) }
          ref={ (ref) => this.slide1 = ref }
        >
          slide 01
          <div className={ styles["des-box"] }>
            <h4 className={ styles["title"] }><span className={ styles["year"] }>1998</span> 以前</h4>
            <p>
              收容所和留置所的位置都位於偏遠的郊區，交通不易到達。有些地方甚至無法得知路名，只能依靠經緯度大概定位。
            </p>
            <div className={ styles["tooltip"] }>
              <p>
                <div className={ styles["oval-blue"] }></div>
                當時的留置所位置
              </p>
              <p>
                <div className={ styles["oval-pink"] }></div>
                當時的收容所位置
              </p>
            </div>
          </div>
        </div>
        <div className={ classnames(styles.slide) }
          ref={ (ref) => this.slide2 = ref }
        >
          slide 02
          <div className={ styles["des-box"] }>
            <h4 className={ styles["title"] }><span className={ styles["year"] }>2016</span> 現今</h4>
            <p>
              現今的收容所多由原本環保單位留下來的收容所設備改建。除非刻意，否則一般民眾不易前往。
            </p>
            <div className={ styles["tooltip"] }>
              <p>
                <div className={ styles["oval-pink"] }></div>
                現今的收容所位置
              </p>
            </div>
          </div>
        </div>
        <div className={ classnames(styles.slide) }>
          slide 03
        </div>
      </div>
    )
  }
}

FullPageMap.propTypes = {}
