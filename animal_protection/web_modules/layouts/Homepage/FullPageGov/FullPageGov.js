/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-handler-names, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import raf from "raf" // requestAnimationFrame polyfill

import Swipeable from "react-swipeable"

import classnames from "classnames"
import styles from "./FullPageGov.scss"
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
const SLIDE_TIMEOUT = 1
const SLIDEIN_LONG = 700

const FADEOUT_SETTINGS = { duration: 800, easing: "easeInQuad" }
const FADEIN_SETTINGS = { duration: 550, easing: "easeOutCubic" }

export default class FullPageGov extends Component {
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
    window.addEventListener("scroll", this._onScroll)
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
    window.removeEventListener("scroll", this._onScroll)
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

      velocity(slide, "scroll", { offset: 0, duration: sDuration, easing: "easeOut" })
      // velocity(document.body, { scrollTop: cTop }, { duration: sDuration })
        .then(() => {
          window.scrollTo(0, cTop)
          this.setState({ pageOffset: window.scrollY })
          this._handlePinning()
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
    velocity(slideOuter, { marginTop: 0 }, { duration: sDuration, easing: "easeInOutCubic" })

    // set the background map
    const hierarchy1 = ReactDOM.findDOMNode(this.hierarchy1)
    const hierarchy2 = ReactDOM.findDOMNode(this.hierarchy2)
    const hierarchy3 = ReactDOM.findDOMNode(this.hierarchy3)
    velocity(hierarchy1, { opacity: 1 }, FADEIN_SETTINGS)
    velocity(hierarchy2, { opacity: 0 }, FADEOUT_SETTINGS)
    velocity(hierarchy3, { opacity: 0 }, FADEOUT_SETTINGS)
  }

  _EnterSecond(cTop, sDuration) {
    const slide2 = ReactDOM.findDOMNode(this.slide2)
    const isFixed = (this.state.curSlide > 0) ? true : false
    this.setState({ curSlide: 2, isFixed: isFixed })
    this._EnterSlide(cTop, slide2, sDuration)

    const slideOuter = ReactDOM.findDOMNode(this.slideOuter)
    velocity(slideOuter, { marginTop: -1 *window.innerHeight }, { duration: sDuration, easing: "easeInOutCubic" })

    // set the background map
    const hierarchy1 = ReactDOM.findDOMNode(this.hierarchy1)
    const hierarchy2 = ReactDOM.findDOMNode(this.hierarchy2)
    const hierarchy3 = ReactDOM.findDOMNode(this.hierarchy3)
    velocity(hierarchy1, { opacity: 0 }, FADEOUT_SETTINGS)
    velocity(hierarchy2, { opacity: 1 }, FADEIN_SETTINGS)
    velocity(hierarchy3, { opacity: 0 }, FADEOUT_SETTINGS)
  }

  _EnterThird(cTop, sDuration) {
    const slide3 = ReactDOM.findDOMNode(this.slide3)
    const isFixed = (this.state.curSlide > 0) ? true : false
    this.setState({ curSlide: 3, isFixed: isFixed })
    this._EnterSlide(cTop, slide3, sDuration)

    const slideOuter = ReactDOM.findDOMNode(this.slideOuter)
    velocity(slideOuter, { marginTop: -2 *window.innerHeight }, { duration: sDuration, easing: "easeInOutCubic" })

    // set the background map
    const hierarchy1 = ReactDOM.findDOMNode(this.hierarchy1)
    const hierarchy2 = ReactDOM.findDOMNode(this.hierarchy2)
    const hierarchy3 = ReactDOM.findDOMNode(this.hierarchy3)
    velocity(hierarchy1, { opacity: 0 }, FADEOUT_SETTINGS)
    velocity(hierarchy2, { opacity: 0 }, FADEOUT_SETTINGS)
    velocity(hierarchy3, { opacity: 1 }, FADEIN_SETTINGS)
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
      else if  (isDown && (top <= 0 && top > -2*vpHeight/2)) {
        this._EnterSecond(cTop+vpHeight, SLIDEIN_LONG)
      }
      else if  (isDown && (top <= -2*vpHeight/2 && top > -4*vpHeight/2)) {
        this._EnterThird(cTop+2*vpHeight, SLIDEIN_LONG)
      }
      else if (!isDown && (top<= -1*vpHeight/2  && top > -vpHeight)) {
        this._EnterFirst(cTop, SLIDEIN_LONG)
      }
      else if (!isDown && (top<= -vpHeight && top > -4*vpHeight/2)) {
        this._EnterSecond(cTop+vpHeight, SLIDEIN_LONG)
      }
      else if (!isDown && (top<= -4*vpHeight/2 && top > -5*vpHeight/2)) {
        this._EnterThird(cTop+2*vpHeight, SLIDEIN_LONG)
      }
      else if (top>vpHeight/2+10 || top < -vpHeight*2-10 || (!isDown && top > 10)) {
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
    const ind3 = (curSlide === 3) ? styles["active"] : null
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
                <div className={ classnames(styles["bar"], ind3) }></div>
              </div>
              <div className={ styles["hierarchy1"] } ref={ (ref) => this.hierarchy1 = ref } ></div>
              <div className={ styles["hierarchy2"] } ref={ (ref) => this.hierarchy2 = ref } ></div>
              <div className={ styles["hierarchy3"] } ref={ (ref) => this.hierarchy3 = ref } ></div>
              <div className={ classnames(styles["slide-outer"]) }
                ref={ (ref) => this.slideOuter = ref }
              >
                <div className={ classnames(styles.slide) }
                  ref={ (ref) => this.slide1 = ref }
                >
                  <div className={ styles["des-box"] }>
                    <h4 className={ styles["title"] }>1998 年動保法實施後</h4>
                    <p>
                      因政府沒有動物保護機關，因此動保業務就四散給與「動物」相關的單位。由農委會下的防檢局和畜牧處分別負責公立收容所與動保行政管理。
                    </p>
                    <div className={ styles["note-box"] }>
                      <p>畜牧行政科員額：9人<br />
                      業務：畜牧生產政策與法規訂定、畜牧場管理之策畫與督導、畜牧發展基金之督導管理、畜牧團體之指導及監督、推動畜牧國際合作及人才交流與訓練計畫等，以及與動物保護相關的業務。</p>
                    </div>
                  </div>
                </div>
                <div className={ classnames(styles.slide) }
                  ref={ (ref) => this.slide2 = ref }
                >
                  <div className={ styles["des-box"] }>
                    <h4 className={ styles["title"] }>2009-2016 年</h4>
                    <p>
                      畜牧行政科改名為動物保護科，但只是在原本業務（畜牧處的行政彙整、預算統整等）上新增動保相關業務，人力依然不足。
                    </p>
                    <div className={ styles["note-box"] }>
                      <p>動物保護科員額：9人<br />
                      業務：寵物管理、實驗動物人道管理、經濟動物福利政策、動物收容管理、動物保護政策與法規、動物保護團體輔導及監督、動物管制業務、動物保護國際合作、人才交流及訓練事宜之推動等。</p>
                    </div>
                  </div>
                </div>
                <div className={ classnames(styles.slide) }
                  ref={ (ref) => this.slide3 = ref }
                >
                  <div className={ styles["des-box"] }>
                    <h4 className={ styles["title"] }>未來推動方向</h4>
                    <p>
                      動保團體要求新增動保司，將畜牧動保業務分開。農委會回應未來將設立「動物保護會」的常態性任務編組，下設兩個科，直接管理動保相關業務。但目前因「農業組織法」草案未審查通過，尚未設立。
                    </p>
                    <p>
                      動物保護會員額：下設動物保護和寵物福利兩個科，員額尚未確定。
                    </p>
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

FullPageGov.propTypes = {}
