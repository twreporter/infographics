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
                    <h4 className={ styles["title"] }>1998-2008</h4>
                    <p>
                      As there was no central authority coordinating and controlling animal welfare affairs, animal welfare functions were spread across a number of “animal-related” agencies. The Bureau of Animal and Plant Health Inspection and Quarantine and the Department of Animal Industry were delegated with the duties of running public shelters and administering animal welfare regulations, respectively.
                    </p>
                    <div className={ styles["note-box"] }>
                      <p><b>Staffing of the Livestock Management Section:</b> nine<br />
                      <b>Functions:</b> Formulation and administration of animal husbandry laws, regulation of livestock farms, management of the Fund for Animal Husbandry Development, support and supervision of animal husbandry and breeding entities, cooperation with global animal husbandry organizations, development of  training and talent exchange programs, protection and welfare of animals, etc.</p>
                    </div>
                  </div>
                </div>
                <div className={ classnames(styles.slide) }
                  ref={ (ref) => this.slide2 = ref }
                >
                  <div className={ styles["des-box"] }>
                    <h4 className={ styles["title"] }>2009-2016</h4>
                    <p>
                      The Livestock Administration Section was renamed the Animal Welfare Section charged with the additional responsibility of upholding and enforcing animal welfare legislation. The shortage of staff remained one of its biggest challenges.
                    </p>
                    <div className={ styles["note-box"] }>
                      <p><b>Staffing of the Animal Welfare Section:</b> nine<br />
                      <b>Functions:</b> Regulation of pet care, regulation of laboratory animal care, protection and welfare of economic animals, animal sheltering and management, enforcement of animal welfare legislation and its associated policy guidelines, support and supervision of animal rights groups, animal control, cooperation with global animal welfare organizations, development of  training and talent exchange programs, etc.</p>
                    </div>
                  </div>
                </div>
                <div className={ classnames(styles.slide) }
                  ref={ (ref) => this.slide3 = ref }
                >
                  <div className={ styles["des-box"] }>
                    <h4 className={ styles["title"] }>Present – </h4>
                    <p>
                      Animal welfare activists demand that a new department be established in order to differentiate the functions of regulating animal husbandry and enforcing animal protection laws. The Council of Agriculture is reported to consider forming the Animal Welfare Bureau with two sections attached to it. Their proposal is pending the passage of a draft of the Agriculture Organization Act.
                    </p>
                    <p>
                      <b>Staffing:</b> the number of staff for the planned Animal Welfare Section and Pet Care Section is not available at this time.
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
