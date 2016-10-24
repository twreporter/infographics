/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import raf from "raf" // requestAnimationFrame polyfill

const debounceTime = {
  threshold: 150,
  maxWait: 450,
}

export default class VisibleSensor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isIn: false,
    }
    this._handleScroll = this._handleScroll.bind(this)
    this.debouncedScroll = _.debounce(() => {
      this._handleScroll()
    }, debounceTime.threshold, { "maxWait": debounceTime.maxWait })
    this._onScroll = this._onScroll.bind(this)

    // for requestAnimationFrame
    this._ticking = false
  }
  componentDidMount() {
    // detect sroll position
    window.addEventListener("scroll", this._onScroll)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { handleVisible, handleInvisible } = this.props
    if (handleVisible && !this.state.isIn && nextState.isIn) {
      handleVisible()
    }
    else if (handleInvisible && this.state.isIn && !nextState.isIn) {
      handleInvisible()
    }
    return false
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this._onScroll)
    this._ticking = false
    this.clearRAF()
  }

  clearRAF() {
    raf.cancel(this._raf)
  }

  _onScroll() {
    this._requestTick()
  }

  _requestTick() {
    if (!this._ticking) {
      this._raf = raf(this.debouncedScroll)
      this._ticking = true
    }
  }

  _handleScroll() {
    const node = ReactDOM.findDOMNode(this.vContainer)
    const rect = node.getBoundingClientRect()
    const { top, bottom } = rect
    const vpHeight = window.innerHeight
    const pItemHeight = node.clientHeight || 100

    if (node) {
      if (bottom > -pItemHeight && bottom < vpHeight+pItemHeight &&
          top < vpHeight+pItemHeight && top > -pItemHeight) {
        if (!this.state.isIn) {
          this.setState({ isIn: true })
        }
      }
      else {
        this.setState({ isIn: false })
      }
    }

    // reset the tick to capture the next onScroll
    this._ticking = false
  }

  render() {
    const { children } = this.props

    return (
      <div ref={ (ref) => this.vContainer = ref }>
        { children }
      </div>
    )
  }
}

VisibleSensor.propTypes = {
  children: React.PropTypes.node,
  handleVisible: React.PropTypes.func,
  handleInvisible: React.PropTypes.func,
}
