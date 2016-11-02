/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-handler-names, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import raf from "raf" // requestAnimationFrame polyfill

import Swipeable from "react-swipeable"

import classnames from "classnames"
import styles from "./FullPageMap.scss"
import commonStyles from "../../../styles/common.scss"

import { MOBILE_WIDTH } from "../config"

// import oldMap from "../../../../content/assets/map_1998.png"
// import newMap from "../../../../content/assets/map_2016.png"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

const debounceTime = {
  threshold: 5,
  maxWait: 15,
}
const SLIDE_TIMEOUT = 300
const SLIDEIN_LONG = 450

const FADEOUT_SETTINGS = { duration: 800, easing: "easeInQuad" }
const FADEIN_SETTINGS = { duration: 550, easing: "easeOutCubic" }

export default class FullPageMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
      isMobile: false,
      isScrolling: false,
      isFixed: false,
      pageOffset: 500,
      curSlide: -1,
      isIn: false,
      isEnding: false,
    }

    this._handleScroll = this._handleScroll.bind(this)
    this.debouncedScroll = _.debounce(() => {
      this._handleScroll()
    }, debounceTime.threshold, { "maxWait": debounceTime.maxWait })
    this._onScroll = this._onScroll.bind(this)

    this._handleResize = this._handleResize.bind(this)
    this._handlePinning = this._handlePinning.bind(this)
    this.handleResize = _.debounce(() => {
      this._handleResize()
    }, debounceTime.threshold, { "maxWait": debounceTime.maxWait })
  }

  componentDidMount() {
    // detect window width
    window.addEventListener("resize", this.handleResize)
    this.handleResize()

    // detect sroll position
    // window.addEventListener("scroll", this._onScroll)
    window.addEventListener("touchmove", this._onScroll)
    window.addEventListener("wheel", this._onScroll)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isIn!==this.state.isIn || nextState.isEnding!==this.state.isEnding ||
      this.state.curSlide !== nextState.curSlide || this.state.isFixed !== nextState.isFixed) {
      return true
    }
    return false
  }

  componentWillUnmount() {
    // clearInterval(this.intervalId)
    window.removeEventListener("resize", this.handleResize)
    // window.removeEventListener("scroll", this._onScroll)
    window.removeEventListener("touchmove", this._onScroll)
    window.removeEventListener("wheel", this._onScroll)
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
    this._handlePinning()
    if (this.state.isScrolling) {
      this.setState({ pageOffset: window.scrollY })
      if (e) {
        e.preventDefault()
        e.stopPropagation()
        // e.stopImmediatePropagation()
        e.returnValue = false
      }
    }
    else {
      this._requestTick()
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

      velocity(slide, "scroll", { offset: 0, duration: sDuration })
      // velocity(document.body, { scrollTop: cTop }, { duration: sDuration })
        .then(() => {
          window.scrollTo(0, cTop)
          this.setState({ pageOffset: window.scrollY })
          setTimeout(() => {
            // stop controlling scroll of the page
            window.scrollTo(0, cTop)
            this.setState({ isScrolling: false, isFixed: true })
            this._handlePinning()
          }, SLIDE_TIMEOUT)
        })
    }
  }

  _EnterFirst(cTop, sDuration) {
    const slide1 = ReactDOM.findDOMNode(this.slide1)
    const isFixed = (this.state.curSlide > 0) ? true : false
    this.setState({ curSlide: 1, isFixed: isFixed })
    this._EnterSlide(cTop, slide1, sDuration)

    const slideOuter = ReactDOM.findDOMNode(this.slideOuter)
    velocity(slideOuter, { marginTop: 0 }, { duration: sDuration })

    // set the background map
    const oldM1 = ReactDOM.findDOMNode(this.oldM1)
    const newM1 = ReactDOM.findDOMNode(this.newM1)
    velocity(oldM1, { opacity: 1 }, FADEIN_SETTINGS)
    velocity(newM1, { opacity: 0 }, FADEOUT_SETTINGS)
  }

  _EnterSecond(cTop, sDuration) {
    const slide2 = ReactDOM.findDOMNode(this.slide2)
    const isFixed = (this.state.curSlide > 0) ? true : false
    this.setState({ curSlide: 2, isFixed: isFixed })
    this._EnterSlide(cTop, slide2, sDuration)

    const slideOuter = ReactDOM.findDOMNode(this.slideOuter)
    velocity(slideOuter, { marginTop: -1 *window.innerHeight }, { duration: sDuration })

    // set the background map
    const oldM1 = ReactDOM.findDOMNode(this.oldM1)
    const newM1 = ReactDOM.findDOMNode(this.newM1)
    velocity(oldM1, { opacity: 0 }, FADEOUT_SETTINGS)
    velocity(newM1, { opacity: 1 }, FADEIN_SETTINGS)
  }

  _handlePinning() {
    const node = ReactDOM.findDOMNode(this.container)
    const rect = node.getBoundingClientRect()
    const { top, bottom } = rect
    const vpHeight = window.innerHeight

    // determine the postition of the pinned map
    if (top > 10) {
      this.setState({ isIn: false, isEnding: false })
    }
    else if (bottom > vpHeight && top < 10) {
      this.setState({ isIn: true, isEnding: false })
    }
    else if (bottom < vpHeight && bottom > -50 &&  top < 0) {
      this.setState({ isIn: false, isEnding: true })
    }
    else {
      this.setState({ isIn: false, isEnding: true })
    }
  }

  _handleScroll() {
    const node = ReactDOM.findDOMNode(this.container)
    const rect = node.getBoundingClientRect()
    const { top, isScrolling } = rect
    const { pageOffset } = this.state
    const vpHeight = window.innerHeight
    const currentOffset = window.scrollY
    const isDown = (currentOffset > pageOffset) ? true : false
    const cTop = node.offsetTop

    // control slides
    if (node && !isScrolling && !(currentOffset === pageOffset)) {
      if (isDown && (top < 1*vpHeight/3 && top > 0)) {
        this._EnterFirst(cTop, SLIDEIN_LONG)
      }
      else if  (isDown && (top <= 0 && top > -1*vpHeight/2)) {
        this._EnterSecond(cTop+vpHeight, SLIDEIN_LONG)
      }
      else if (!isDown && (top<= -1*vpHeight/2  && top > -vpHeight)) {
        this._EnterFirst(cTop, SLIDEIN_LONG)
      }
      else if (!isDown && (top<= -vpHeight && top > -3*vpHeight/2)) {
        this._EnterSecond(cTop+vpHeight, SLIDEIN_LONG)
      }
      else if (top>vpHeight/2+10 || top < -vpHeight-10 || (!isDown && top > 10)) {
        this.setState({ curSlide: -1, isFixed: false })
      }
    }

    this.setState({ pageOffset: currentOffset })
    // reset the tick to capture the next onScroll
    this._ticking = false
  }

  render() {
    const { curSlide, isIn, isEnding } = this.state
    const indClass = (curSlide < 0) ? commonStyles["hide"] : null
    const ind1 = (curSlide === 1) ? styles["active"] : null
    const ind2 = (curSlide === 2) ? styles["active"] : null
    const mapClass = isIn ? styles["map-fixed"] : null
    const endingClass = isEnding ? styles["map-ending"] : null

    return (
      <div className={ classnames(styles.container,
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ classnames(styles["map"], mapClass, endingClass) }
          ref={ (ref) => this.pinnedItem = ref }
        >
        <div className={ classnames(styles["fix-outer"]) }>
          <Swipeable onSwiping={ this._onScroll } onSwiped={ this._onScroll }>
            <div className={ classnames(styles.indicator, indClass) }>
              <div className={ classnames(styles["bar"], ind1) }></div>
              <div className={ classnames(styles["bar"], ind2) }></div>
            </div>
              {/* <img src={ oldMap } ref={ (ref) => this.oldM2 = ref } /> */}
              <div className={ styles["oldMap"] } ref={ (ref) => this.oldM1 = ref } ></div>
              <div className={ styles["newMap"] } ref={ (ref) => this.newM1 = ref } ></div>
              {/* <img src={ newMap } ref={ (ref) => this.newM2 = ref } /> */}
            <div className={ classnames(styles["slide-outer"]) }
              ref={ (ref) => this.slideOuter = ref }
            >
              <div className={ classnames(styles.slide) }
                ref={ (ref) => this.slide1 = ref }
              >
                <div className={ styles["des-box"] }>
                  <h4 className={ styles["title"] }><span className={ styles["year"] }>1998</span> 以前</h4>
                  <p>
                    收容所和留置所的位置都位於偏遠的郊區，交通不易到達。有些地方甚至無法得知路名，只能依靠經緯度大概定位。
                  </p>
                  <div className={ styles["tooltip"] }>
                    <p>
                      <i className={ styles["oval-blue"] }></i>
                      當時的留置所位置
                    </p>
                    <p>
                      <i className={ styles["oval-pink"] }></i>
                      當時的收容所位置
                    </p>
                  </div>
                </div>
              </div>
              <div className={ classnames(styles.slide) }
                ref={ (ref) => this.slide2 = ref }
              >
                <div className={ styles["des-box"] }>
                  <h4 className={ styles["title"] }><span className={ styles["year"] }>2016</span> 現今</h4>
                  <p>
                    現今的收容所多由原本環保單位留下來的收容所設備改建。除非刻意，否則一般民眾不易前往。
                  </p>
                  <div className={ styles["tooltip"] }>
                    <p>
                      <i className={ styles["oval-pink"] }></i>
                      現今的收容所位置
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Swipeable>

        </div>
        </div>

      </div>
    )
  }
}

FullPageMap.propTypes = {}
