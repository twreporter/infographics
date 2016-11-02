/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"
// import ReactDOM from "react-dom"
import Markdown from "react-markdown"

import classnames from "classnames"
import styles from "./Chapter03.scss"
import Subsection from "../Components/Subsection"
import ChapterTitle from "../Components/ChapterTitle"
import commonStyles from "../../../styles/common.scss"

import rInfoImg from "../../../../content/assets/d-attention.svg"

import { chapter, topBox, titles, sec1Des, sec2Des, sec3Des, problem1, problem2 } from "./text"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

const LegiBox = (props) => {
  const { list } = props
  let legiList = []

  for (let i=0; i<list.length; i++) {
    legiList.push(
      <div key={ i } className={ classnames(commonStyles["content-outer"], commonStyles["pad-content"], styles["legi-box"]) }>
        <p>
          <span className={ styles["legi-title"] }>{ list[i].lawTitle }</span>
          <span className={ styles["legi-id"] }>——  { list[i].lawId }</span>
        </p>
        <hr />
        <p>{ list[i].lawDes }</p>
      </div>
    )
  }

  return (
    <div className={ classnames(commonStyles["c-grid"], styles["legi-outer"]) }>
      <div className={ classnames(styles["title-box"]) }>
        <div className={ classnames(styles["yoyo"], commonStyles["overlay-svg"]) }
          dangerouslySetInnerHTML={ { __html: rInfoImg } } />
        <div className={ styles["r-title"] }><h4>{ props.title }</h4></div>
      </div>
      { legiList }
    </div>
  )
}

export default class Chapter03 extends Component {
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
            <div className={ classnames(commonStyles["content-outer"], commonStyles["content-box"]) }>
              <Markdown source={ topBox } />
            </div>
            <Subsection curSec={ 3 } titles={ titles } subIndex={ 0 }>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) } style={ { paddingBottom: "3.5rem" } }>
                <Markdown className={ commonStyles["inner-text"] }  source={ sec1Des } />
              </div>
              <LegiBox title={ problem1.title } list={ problem1.list } />
              <LegiBox title={ problem2.title } list={ problem2.list } />
            </Subsection>
            <Subsection curSec={ 3 } titles={ titles } subIndex={ 1 }>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) }>
                <Markdown className={ commonStyles["inner-text"] }  source={ sec2Des } />
              </div>
            </Subsection>
            <Subsection curSec={ 3 } titles={ titles } subIndex={ 2 }>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) }>
                <Markdown className={ commonStyles["inner-text"] }  source={ sec3Des } />
              </div>
            </Subsection>
          </div>
        </div>
      </div>
    )
  }
}

Chapter03.propTypes = {}