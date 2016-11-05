/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import Markdown from "react-markdown"
import classnames from "classnames"
import styles from "./OpeningTop.scss"
import commonStyles from "../../../styles/common.scss"
import yoyoImg from "../../../../content/assets/cold-top.svg"

import { titlePart1, titlePart2, description, authorText,
  publishDate, authorSeparator, authorList } from "./text"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

const debounceTime = {
  threshold: 15,
  maxWait: 45,
}

export default class OpeningTop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
      isIn: false,
      pinTopY: 0,
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

    // velocity(this.block, { scale: 2 }, 500)
    //   .then(() => console.log("animation complete"))

  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.debouncedScroll)
  }

  _handleScroll() {
    const node = ReactDOM.findDOMNode(this.container)
    const rect = node.getBoundingClientRect()
    const { top, bottom } = rect
    const vpHeight = window.innerHeight

    if (this.pItemHeight) {
      if (bottom > vpHeight && bottom &&
          top < (vpHeight / 2 - this.pItemHeight / 2)) {
        this.setState({ isIn: true, pinTopY: vpHeight / 2 })
      }
      else if (bottom < vpHeight && bottom > 0 &&
          top < (vpHeight / 2 - this.pItemHeight / 2)) {
        this.setState({ pinTopY: bottom - vpHeight / 2 })
      }
      else {
        this.setState({ isIn: false })
      }
    }

    if (top < vpHeight && bottom > 0)
      this.setState({ scrollRatio: Math.abs((top - vpHeight) / (bottom - top + vpHeight)) })
    else
      this.setState({ scrollRatio: -1 })
  }

  render() {
    let authorItems = []
    const centerClass = (this.state.isIn) ? commonStyles["fixedCenter"] : null
    for (let i=0; i<authorList.length; i++) {
      const separator = (i===authorList.length-1) ? "" : authorSeparator
      authorItems.push(<span itemProp="author">{ authorList[i] + separator }</span>)
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
              <p itemProp="description"><Markdown source={ description } /></p>
              <p>{ authorText } { authorItems } &nbsp; | &nbsp; <span itemProp="datePublished">{ publishDate }</span></p>
            </div>
          </div>
        </div>

        <div
          className={ classnames(styles["overlay-box"], centerClass) }
          style={ { top: this.state.pinTopY } }
          ref={ (ref) => this.pinnedItem = ref }
        >
          <div className={ classnames(commonStyles["img-responsive"], styles["yoyo"]) } dangerouslySetInnerHTML={ { __html: yoyoImg } } />
        </div>
      </div>
    )
  }
}

OpeningTop.propTypes = {}
