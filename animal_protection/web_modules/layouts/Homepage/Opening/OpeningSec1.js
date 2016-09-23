/* eslint-disable react/jsx-no-bind, react/jsx-no-literals */

import React, { Component } from "react"

import Img from "react-image-holder"
import classnames from "classnames"
import styles from "./OpeningSec1.scss"
import commonStyles from "../../../styles/common.scss"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
} 

export default class OpeningSec1 extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
    }
  }

  componentDidMount() {
    velocity(this.block, { scale: 2 }, 500)
      .then(() => console.log("animation complete"))
  }

  render() {

    return (
      <div className={ classnames(styles.container, 
        commonStyles["text-center"]) }
        ref={ (ref) => this.container = ref }
      >
        <div ref={ (ref) => this.block = ref }>
          Opening Section 1
        </div>
        <Img src="" width="800" height="500" usePlaceholder />
        
      </div>
    )
  }
}

OpeningSec1.propTypes = {}