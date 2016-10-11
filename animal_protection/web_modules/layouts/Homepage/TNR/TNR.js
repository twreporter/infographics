/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"

import classnames from "classnames"
import styles from "./Tnr.scss"
import commonStyles from "../../../styles/common.scss"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

const debounceTime = {
  threshold: 15,
  maxWait: 45,
}

export default class Tnr extends Component {
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
    return (
      <div className={ classnames(styles.container,
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
      <div className={ classnames(styles["left-nav"]) }>
        <ul>
          <li>
            <span>01</span>
            <span>公立收容所面臨什麼困境？</span>
          </li>
        </ul>
      </div>

      <div className={ classnames(styles["right-content"]) }>
        <div className={ classnames(styles["content-box"]) }>
          在TNR是國外用來控制狂犬病的一種作法，目前在台灣則是被當成「流浪狗口控制」的方式。

「繁殖」是流浪動物不斷增加的原因之一，因此TNR被許多民間團體提倡，為取代撲殺、減少流浪動物數量的方法。將結紮後的流浪動物回置到原棲地，讓人類學習與他們共存。

但要達到數量控制的目的，TNR有其限制，除了必須在封閉地形內實行，強度和持續性都是必須考量的因素，回置後續也會產生一些問題。
        </div>
      </div>

      </div>
    )
  }
}

Tnr.propTypes = {}
