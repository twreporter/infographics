/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import Markdown from "react-markdown"
import classnames from "classnames"
import styles from "./OpeningTop.scss"
import commonStyles from "../../../styles/common.scss"
import yoyoImg from "../../../../content/assets/yoyo-box.svg"
import houseImg from "../../../../content/assets/houses.svg"
import moonImg from "../../../../content/assets/moon.svg"
import cloudImg from "../../../../content/assets/cloud.svg"
import cloudMobileImg from "../../../../content/assets/cloud_mobile.svg"
import doorImg from "../../../../content/assets/moon-door.svg"

import { titlePart1, titlePart2, description, authorText,
  publishDate, authorSeparator, authorList, paragraphs } from "./text"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

const CLOUD_DURATION = 8000

const debounceTime = {
  threshold: 15,
  maxWait: 45,
}

export default class OpeningTop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
      isIn: true,
      isMoonIn: false,
      isDoorIn: false,
      isLoveIn: false,
      isYoyoCentered: false,
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

    velocity(this.clouds, { left: "-100%" }, { duration: CLOUD_DURATION, easing: "linear" })
    velocity(this.clouds, "reverse", { duration: 1 })
    this.cloudInterval = setInterval(()=>{
      console.log(CLOUD_DURATION)
      velocity(this.clouds, { left: "-100%" }, { duration: CLOUD_DURATION, easing: "linear" })
      velocity(this.clouds, "reverse", { duration: 1 })
    }, CLOUD_DURATION)

  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.debouncedScroll)
    clearInterval(this.cloudInterval)
  }

  _handleScroll() {
    const node = ReactDOM.findDOMNode(this.container)
    const rect = node.getBoundingClientRect()
    const { top, bottom } = rect
    const { isMoonIn, isDoorIn, isLoveIn, isYoyoCentered } = this.state
    const vpHeight = window.innerHeight

    console.log(top, bottom)

    if (this.pItemHeight) {
      if (top >=(-4 * this.pItemHeight) &&
          top <= 0) {
        this.setState({ isIn: true })
      }
      else {
        this.setState({ isIn: false })
      }
    }

    if (top < vpHeight && bottom > 0)
      this.setState({ scrollRatio: Math.abs((top - vpHeight) / (bottom - top + vpHeight)) })
    else
      this.setState({ scrollRatio: -1 })

    // control moon
    if (!isMoonIn && top < -vpHeight * 1.2) {
      this.setState({ isMoonIn: true })
    }
    else if (isMoonIn && top > -vpHeight * 1.2) {
      this.setState({ isMoonIn: false })
    }

    // control door
    if (!isDoorIn && top < -vpHeight * 2.45) {
      this.setState({ isDoorIn: true })
    }
    else if (isDoorIn && top > -vpHeight * 2.45) {
      this.setState({ isDoorIn: false })
    }

    // control love (on top of the moon)
    if (!isLoveIn && top < -vpHeight * 3.3) {
      this.setState({ isLoveIn: true })
    }
    else if (isLoveIn && top > -vpHeight * 3.3) {
      this.setState({ isLoveIn: false })
    }

    // control yoyo
    if (!isYoyoCentered && top < -vpHeight * 4.85) {
      this.setState({ isYoyoCentered: true })
    }
    else if (isYoyoCentered && top > -vpHeight * 4.85) {
      this.setState({ isYoyoCentered: false })
    }
  }

  render() {
    let authorItems = []
    const { isIn, isMoonIn, isDoorIn, isLoveIn, isYoyoCentered } = this.state
    const moonClass = isMoonIn ? styles["moon-center"] : styles["moon"]
    const doorClass = isDoorIn ? styles["door"] : styles["door-hidden"]
    const loveClass = isLoveIn ? styles["door-love"] : null
    const centerClass = isIn ? commonStyles["fixedCenter"] : styles["night-container"]
    const yoyoPositionClass = isYoyoCentered ? styles["yoyo-centered"] : null
    for (let i=0; i<authorList.length; i++) {
      const separator = (i===authorList.length-1) ? "" : authorSeparator
      authorItems.push(<span key={ i } itemProp="author">{ authorList[i] + separator }</span>)
    }

    return (
      <div className={ classnames(styles.container,
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ styles["text-wrapper"] }>
          <div className={ styles["title-box"] }>
            <div className={ classnames(commonStyles["content-outer"]) }>
              <h1 itemProp="headline"> { titlePart1 } <br /> { titlePart2 } </h1>
              <div itemProp="description"><Markdown source={ description } /></div>
              <p>{ authorText } { authorItems } &nbsp; | &nbsp; <span itemProp="datePublished">{ publishDate }</span></p>
            </div>
          </div>
        </div>

        <div className={ styles["text-wrapper"] }>
          <div className={ styles["story-box"] }>
            <div className={ classnames(commonStyles["content-outer"]) }>
              <div itemProp="description"><Markdown source={ paragraphs[0] } /></div>
            </div>
          </div>
        </div>

        <div className={ styles["text-wrapper"] }>
          <div className={ styles["story-box"] }>
            <div className={ classnames(commonStyles["content-outer"]) }>
              <div itemProp="description"><Markdown source={ paragraphs[1] } /></div>
            </div>
          </div>
        </div>

        <div className={ styles["text-wrapper"] }>
          <div className={ styles["story-box"] }>
            <div className={ classnames(commonStyles["content-outer"]) }>
              <div itemProp="description"><Markdown source={ paragraphs[2] } /></div>
            </div>
          </div>
        </div>

        <div className={ styles["text-wrapper"] }>
          <div className={ styles["story-box"] }>
            <div className={ classnames(commonStyles["content-outer"]) }>
              <div itemProp="description"><Markdown source={ paragraphs[3] } /></div>
            </div>
          </div>
        </div>

        <div className={ styles["text-wrapper"] }>
          <div className={ styles["story-box"] }>
            <div className={ classnames(commonStyles["content-outer"]) }>
            </div>
          </div>
        </div>

        <div className={ styles["text-wrapper"] }>
          <div className={ styles["story-box"] }>
            <div className={ classnames(commonStyles["content-outer"]) }>
              <div itemProp="description"><Markdown source={ paragraphs[4] } /></div>
            </div>
          </div>
        </div>

        <div className={ styles["text-wrapper"] }>
          <div className={ styles["story-box"] }>
            <div className={ classnames(commonStyles["content-outer"]) }>
              <div itemProp="description"><Markdown source={ paragraphs[5] } /></div>
            </div>
          </div>
        </div>

        <div
          className={ classnames(styles["overlay-box"], centerClass) }
          ref={ (ref) => this.pinnedItem = ref }
        >
          <div className={ classnames(moonClass) }>
            <div dangerouslySetInnerHTML={ { __html: moonImg } } />
            <div className={ classnames(doorClass, loveClass) } dangerouslySetInnerHTML={ { __html: doorImg } } />
          </div>
          <div className={ classnames(styles["cloud"]) } ref={ (ref) => this.clouds = ref }>
            <div className={ classnames(styles["subcloud"]) } dangerouslySetInnerHTML={ { __html: cloudImg } } />
            <div className={ classnames(styles["subcloud"]) } dangerouslySetInnerHTML={ { __html: cloudImg } } />
            <div className={ classnames(styles["subcloud-mobile"]) } dangerouslySetInnerHTML={ { __html: cloudMobileImg } } />
            <div className={ classnames(styles["subcloud-mobile"]) } dangerouslySetInnerHTML={ { __html: cloudMobileImg } } />
          </div>
        </div>
        <div
          className={ classnames(styles["overlay-box"], centerClass, styles["top-dog-outer"]) }
          ref={ (ref) => this.pinnedItem = ref }
        >
          <div className={ classnames(styles["house"]) } dangerouslySetInnerHTML={ { __html: houseImg } } />
        </div>
        <div className={ classnames(commonStyles["img-responsive"], styles["yoyo"], yoyoPositionClass) } dangerouslySetInnerHTML={ { __html: yoyoImg } } />
      </div>
    )
  }
}

OpeningTop.propTypes = {}
