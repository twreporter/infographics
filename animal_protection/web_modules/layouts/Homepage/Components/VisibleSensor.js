/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len */

import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"

const debounceTime = {
  threshold: 200,
  maxWait: 600,
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
  }
  componentDidMount() {
    // detect sroll position
    window.addEventListener("scroll", this.debouncedScroll)
    console.log("***componentDidMount")
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isIn!==this.state.isIn && this.state.isIn) {
      this.props.handleVisible()
      return true
    }
    return false
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.debouncedScroll)
  }

  _handleScroll() {
    const node = ReactDOM.findDOMNode(this.container)
    const rect = node.getBoundingClientRect()
    const { top, bottom } = rect
    const vpHeight = window.innerHeight
    console.log("***scroll")

    if (this.pItemHeight) {
      if (bottom > 0 &&
          top < (vpHeight / 2 - this.pItemHeight / 2)) {
        this.setState({ isIn: true })
      }
      else {
        this.setState({ isIn: false })
      }
    }
  }

  render() {
    const { children } = this.props

    return (
      <div ref={ (ref) => this.container = ref }>
        { children }
      </div>
    )
  }
}

VisibleSensor.propTypes = {
  children: React.PropTypes.node,
  handleVisible: React.PropTypes.func,
}
