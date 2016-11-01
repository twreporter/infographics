/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"
// import ReactDOM from "react-dom"
import Markdown from "react-markdown"

import classnames from "classnames"
import styles from "./Chapter05.scss"
import ChapterTitle from "../Components/ChapterTitle"
import commonStyles from "../../../styles/common.scss"

import { chapter, topBox } from "./text"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

export default class Chapter05 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
    }
  }

  render() {
    return (
      <div>
        <ChapterTitle chapterId={ chapter.id } title={ chapter.title } />
        <div className={ classnames(styles.container,
          commonStyles["text-center"]) }
        >
          <div>
            <div className={ classnames(commonStyles["content-outer"], styles["content-box"]) }>
              <Markdown source={ topBox } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Chapter05.propTypes = {}
