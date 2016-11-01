/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"
// import ReactDOM from "react-dom"
import Markdown from "react-markdown"

import classnames from "classnames"
import styles from "./Chapter01.scss"
import Subsection from "../Components/Subsection"
import ChapterTitle from "../Components/ChapterTitle"
import commonStyles from "../../../styles/common.scss"

import shelter01 from "../../../../content/assets/shelter-medical.svg"

import FullPageMap from "../FullPageMap/FullPageMap"

import { chapter, topBox, titles, sec1Des, sec1Credit, sec2Des, sec3Des, sec3List } from "./text"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

export default class Chapter01 extends Component {
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
            <Subsection curSec={ 1 } titles={ titles } subIndex={ 0 }>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) } style={ { paddingBottom: "4rem" } }>
                <Markdown className={ commonStyles["inner-text"] } source={ sec1Des } />
              </div>
              <FullPageMap />
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) } style={ { paddingBottom: "2rem" } }>
                { sec1Credit }
              </div>
            </Subsection>
            <Subsection curSec={ 1 } titles={ titles } subIndex={ 1 }>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) } style={ { paddingBottom: "4rem" } }>
                <Markdown className={ commonStyles["inner-text"] } source={ sec2Des } />
              </div>
            </Subsection>
            <Subsection curSec={ 1 } titles={ titles } subIndex={ 2 }>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) } style={ { paddingBottom: "4rem" } }>
                <Markdown className={ commonStyles["inner-text"] } source={ sec3Des } />
                <div className={ classnames(styles["b-grid"]) } style={ { marginTop: "3rem" } }>
                  <div className={ styles["c-left"] }>
                    <p className={ classnames(commonStyles["large-text"], styles["c-text"]) }> { sec3List[0] } </p>
                  </div>
                  <div className={ styles["c-right"] }>
                    <div className={ classnames(commonStyles["img-responsive"],
                      styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: shelter01 } }
                      ref={ (ref) => this.p1G = ref }
                    />
                  </div>
                </div>
                <div className={ classnames(styles["b-grid"]) } style={ { marginTop: "3rem" } }>
                  <div className={ styles["c-right"] }>
                    <p className={ classnames(commonStyles["large-text"], styles["c-text"]) }> { sec3List[0] } </p>
                  </div>
                  <div className={ styles["c-left"] }>
                    <div className={ classnames(commonStyles["img-responsive"],
                      styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: shelter01 } }
                      ref={ (ref) => this.p1G = ref }
                    />
                  </div>
                </div>
                <div className={ classnames(styles["b-grid"]) } style={ { marginTop: "3rem" } }>
                  <div className={ styles["c-left"] }>
                    <p className={ classnames(commonStyles["large-text"], styles["c-text"]) }> { sec3List[0] } </p>
                  </div>
                  <div className={ styles["c-right"] }>
                    <div className={ classnames(commonStyles["img-responsive"],
                      styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: shelter01 } }
                      ref={ (ref) => this.p1G = ref }
                    />
                  </div>
                </div>
              </div>
            </Subsection>
          </div>
        </div>
      </div>
    )
  }
}

Chapter01.propTypes = {}
