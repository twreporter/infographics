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
import grassImg from "../../../../content/assets/grass_overlay.svg"

import pet1 from "../../../../content/assets/dog01.jpg"
import pet2 from "../../../../content/assets/dog02.jpg"
import pet3 from "../../../../content/assets/dog03.jpg"
import pet4 from "../../../../content/assets/dog04.jpg"
import pet5 from "../../../../content/assets/dog05.jpg"
import pet6 from "../../../../content/assets/dog06.jpg"
import pet7 from "../../../../content/assets/dog07.jpg"
import pet8 from "../../../../content/assets/dog08.jpg"
import pet9 from "../../../../content/assets/dog09.jpg"

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
      isBoxed: false,
      isCaged: false,
      isOneDog: false,
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
    const { isMoonIn, isDoorIn, isLoveIn, isYoyoCentered, isBoxed, isCaged, isOneDog } = this.state
    const vpHeight = window.innerHeight

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

    if (!isBoxed && top < -vpHeight * 5.8 && top > -vpHeight * 7.4) {
      this.setState({ isBoxed: true })
    }
    else if (isBoxed && (top > -vpHeight * 5.8 || top < -vpHeight * 7.4)) {
      this.setState({ isBoxed: false })
    }

    if (!isCaged && top < -vpHeight * 7.7) {
      this.setState({ isCaged: true })
    }
    else if (isCaged && top > -vpHeight * 7.7) {
      this.setState({ isCaged: false })
    }

    if (!isOneDog && top < -vpHeight * 9.13) {
      this.setState({ isOneDog: true })
    }
    else if (isOneDog && top > -vpHeight * 9.13) {
      this.setState({ isOneDog: false })
    }

  }

  render() {
    let authorItems = []
    const { isIn, isMoonIn, isDoorIn, isLoveIn, isYoyoCentered, isBoxed, isCaged, isOneDog } = this.state
    const moonClass = isMoonIn ? styles["moon-center"] : styles["moon"]
    const doorClass = isDoorIn ? styles["door"] : styles["door-hidden"]
    const loveClass = isLoveIn ? styles["door-love"] : null
    const centerClass = isIn ? commonStyles["fixedCenter"] : styles["night-container"]
    const cloudClass = isIn ? styles["cloud"] : styles["cloud-middle"]
    const boxedClass = isBoxed ? styles["yoyo-boxed"] : null
    const cagedClass = isCaged ? styles["yoyo-caged"] : null
    const oneDogClass = isOneDog ? styles["yoyo-one-dog"] : null
    let yoyoPositionClass = isYoyoCentered ? styles["yoyo-centered"] : null
    yoyoPositionClass = isCaged ? styles["yoyo-center-bottom"] : yoyoPositionClass
    const cloudEndingClass = isCaged ? styles["cloud-ending"] : null
    for (let i=0; i<authorList.length; i++) {
      const separator = (i===authorList.length-1) ? "" : authorSeparator
      authorItems.push(<span key={ i } itemProp="author">{ authorList[i] + separator }</span>)
    }

    return (
      <div className={ classnames(commonStyles["text-center"], styles.container) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ styles["container-yoyo-story"] }>
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
          <div className={ styles["text-wrapper"] }>
            <div className={ styles["story-box"] }>
              <div className={ classnames(commonStyles["content-outer"]) }>
                <div itemProp="description"><Markdown source={ paragraphs[6] } /></div>
              </div>
            </div>
          </div>

          <div className={ classnames(styles["grass"]) } dangerouslySetInnerHTML={ { __html: grassImg } } />

          <div className={ classnames(cloudClass, cloudEndingClass) } ref={ (ref) => this.clouds = ref }>
            <div className={ classnames(styles["subcloud"]) } dangerouslySetInnerHTML={ { __html: cloudImg } } />
            <div className={ classnames(styles["subcloud"]) } dangerouslySetInnerHTML={ { __html: cloudImg } } />
            <div className={ classnames(styles["subcloud-mobile"]) } dangerouslySetInnerHTML={ { __html: cloudMobileImg } } />
            <div className={ classnames(styles["subcloud-mobile"]) } dangerouslySetInnerHTML={ { __html: cloudMobileImg } } />
          </div>

          <div
            className={ classnames(styles["overlay-box"], centerClass) }
            ref={ (ref) => this.pinnedItem = ref }
          >
            <div className={ classnames(moonClass) }>
              <div dangerouslySetInnerHTML={ { __html: moonImg } } />
              <div className={ classnames(doorClass, loveClass) } dangerouslySetInnerHTML={ { __html: doorImg } } />
            </div>
          </div>
          <div
            className={ classnames(styles["overlay-box"], centerClass, styles["top-dog-outer"]) }
            ref={ (ref) => this.pinnedItem = ref }
          >
            <div className={ classnames(styles["house"]) } dangerouslySetInnerHTML={ { __html: houseImg } } />
          </div>
        </div>

        <div className={ styles["container-one-dog"] }>
          <div className={ commonStyles["content-outer"] }>
            <div className={ classnames(styles["pet-item"], styles["pet1"]) }>
              <img src={ pet1 } />
            </div>
            <div className={ classnames(styles["pet-item"], styles["pet2"]) }>
              <img src={ pet2 } />
            </div>
            <div className={ classnames(styles["pet-item"], styles["pet3"]) }>
              <img src={ pet3 } />
            </div>
            <div className={ classnames(styles["pet-item"], styles["pet4"]) }>
              <img src={ pet4 } />
            </div>
            <div className={ classnames(styles["pet-item"], styles["pet5"]) }>
              <img src={ pet5 } />
            </div>
            <div className={ classnames(styles["pet-item"], styles["pet6"]) }>
              <img src={ pet6 } />
            </div>
            <div className={ classnames(styles["pet-item"], styles["pet7"]) }>
              <img src={ pet7 } />
            </div>
            <div className={ classnames(styles["pet-item"], styles["pet8"]) }>
              <img src={ pet8 } />
            </div>
            <div className={ classnames(styles["pet-item"], styles["pet9"]) }>
              <img src={ pet9 } />
            </div>

            <div className={ styles["text-wrapper"] }>
              <div className={ styles["story-box"] } >
                <div className={ classnames(commonStyles["content-outer"]) }>
                  <div itemProp="description"><Markdown source={ paragraphs[7] } /></div>
                </div>
              </div>
            </div>
            <div className={ styles["text-wrapper"] } style={ { marginTop: "-22vh" } }>
              <div className={ styles["story-box"] } >
                <div className={ classnames(commonStyles["content-outer"]) }>
                  <div itemProp="description"><Markdown source={ paragraphs[8] } /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={ classnames(commonStyles["img-responsive"],
          styles["yoyo"], yoyoPositionClass, boxedClass, cagedClass, oneDogClass) } dangerouslySetInnerHTML={ { __html: yoyoImg } }
        />

      </div>
    )
  }
}

OpeningTop.propTypes = {}
