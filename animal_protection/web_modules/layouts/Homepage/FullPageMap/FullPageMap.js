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

import oldMap from "../../../../content/assets/map_1998.png"
import newMap from "../../../../content/assets/map_2016.png"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

const debounceTime = {
  threshold: 60,
  maxWait: 120,
}
const SLIDE_TIMEOUT = 450
const SLIDEIN_LONG = 400

const FADE_TIME = 750

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
    // window.addEventListener("touchmove", this._onScroll)
    // window.addEventListener("touchstart", this._onScroll)
    // window.addEventListener("touchend", this._onScroll)
    window.addEventListener("touchmove", this._onScroll)
    window.addEventListener("wheel", this._onScroll)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.curSlide !== nextState.curSlide || this.state.isFixed !== nextState.isFixed) {
      return true
    }
    return false
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
    // window.removeEventListener("touchmove", this._onScroll)
    // window.addEventListener("touchstart", this._onScroll)
    // window.addEventListener("touchend", this._onScroll)
    window.addEventListener("touchmove", this._onScroll)
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
    if (this.state.isScrolling) {
      console.log("===isScrolling")
      this.setState({ pageOffset: window.scrollY })
      e.preventDefault()
      e.stopPropagation()
      // e.stopImmediatePropagation()
      e.returnValue = false
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

      velocity(slide, "scroll", { offset: 0, duration: sDuration })
        .then(() => {
          window.scrollTo(0, cTop)
          this.setState({ pageOffset: window.scrollY })
          setTimeout(() => {
            // stop controlling scroll of the page
            window.scrollTo(0, cTop)
            this.setState({ isScrolling: false, isFixed: true })
          }, SLIDE_TIMEOUT)
        })
    }
  }

  _EnterFirst(cTop, sDuration) {
    const slide1 = ReactDOM.findDOMNode(this.slide1)
    const isFixed = (this.state.curSlide > 0) ? true : false
    this.setState({ curSlide: 1, isFixed: isFixed })
    console.log("this.state.curSlide", this.state.curSlide)
    this._EnterSlide(cTop, slide1, sDuration)
    // set the background map
    const oldM1 = ReactDOM.findDOMNode(this.oldM1)
    const newM1 = ReactDOM.findDOMNode(this.newM1)
    const oldM2 = ReactDOM.findDOMNode(this.oldM2)
    const newM2 = ReactDOM.findDOMNode(this.newM2)
    velocity(oldM1, { opacity: 1 }, FADE_TIME)
    velocity(newM1, { opacity: 0 }, FADE_TIME)
    velocity(oldM2, { opacity: 1 }, FADE_TIME)
    velocity(newM2, { opacity: 0 }, FADE_TIME)
  }

  _EnterSecond(cTop, sDuration) {
    const slide2 = ReactDOM.findDOMNode(this.slide2)
    const isFixed = (this.state.curSlide > 0) ? true : false
    console.log("_EnterSecond => this.state.curSlide", this.state.curSlide, (this.state.curSlide > 0))
    this.setState({ curSlide: 2, isFixed: isFixed })
    this._EnterSlide(cTop, slide2, sDuration)
    // set the background map
    const oldM1 = ReactDOM.findDOMNode(this.oldM1)
    const newM1 = ReactDOM.findDOMNode(this.newM1)
    const oldM2 = ReactDOM.findDOMNode(this.oldM2)
    const newM2 = ReactDOM.findDOMNode(this.newM2)
    velocity(oldM1, { opacity: 0 }, FADE_TIME)
    velocity(newM1, { opacity: 1 }, FADE_TIME)
    velocity(oldM2, { opacity: 0 }, FADE_TIME)
    velocity(newM2, { opacity: 1 }, FADE_TIME)
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

    console.log(cTop, isDown, moveOffset, currentOffset, pageOffset, "/",   top, bottom, isMobile, vpHeight)

    if (node && !isScrolling) {
      if (isDown && (top < 1*vpHeight/2 && top > 0)) {
        console.log("1.")
        this._EnterFirst(cTop, SLIDEIN_LONG)
      }
      else if  (isDown && (top <= 0 && top > -1*vpHeight/2)) {
        console.log("2.")
        this._EnterSecond(cTop+vpHeight, SLIDEIN_LONG)
      }
      else if (!isDown && (top<= -3*vpHeight/2  && top > -2*vpHeight)) {
        console.log("3.")
        this._EnterSecond(cTop+vpHeight, SLIDEIN_LONG)
      }
      else if (!isDown && (top<= -1*vpHeight/2  && top > -3*vpHeight/2)) {
        console.log("4.")
        this._EnterFirst(cTop, SLIDEIN_LONG)
      }
      else if (top>vpHeight/2+10 || top < -vpHeight-10) {
        this.setState({ curSlide: -1, isFixed: false })
      }
    }

    this.setState({ pageOffset: currentOffset })
    // reset the tick to capture the next onScroll
    this._ticking = false
  }

  render() {
    const { curSlide, isFixed } = this.state
    const indClass = (curSlide < 0) ? commonStyles["hide"] : null
    const ind1 = (curSlide === 1) ? styles["active"] : null
    const ind2 = (curSlide === 2) ? styles["active"] : null
    const mapClass = isFixed ? styles["map-fixed"] : null

    return (
      <div className={ classnames(styles.container,
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
        <Swipeable onSwiping={ this._onScroll } onSwiped={ this._onScroll }>
        <div className={ classnames(styles.indicator, indClass) }>
          <div className={ classnames(styles["bar"], ind1) }></div>
          <div className={ classnames(styles["bar"], ind2) }></div>
        </div>
        <div className={ classnames(styles.slide) }
          ref={ (ref) => this.slide1 = ref }
        >
          <div className={ classnames(styles["map"], mapClass) }>
            <img src={ newMap } ref={ (ref) => this.newM1 = ref } />
            <img src={ oldMap } ref={ (ref) => this.oldM1 = ref } />
          </div>
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
          <div className={ classnames(styles["map"], mapClass) }>
            <img src={ oldMap } ref={ (ref) => this.oldM2 = ref } />
            <img src={ newMap } ref={ (ref) => this.newM2 = ref } />
          </div>
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
        <div className={ classnames(styles.slide) }>
          slide 03
        </div>
        </Swipeable>
      </div>
    )
  }
}

FullPageMap.propTypes = {}
