/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"
// import ReactDOM from "react-dom"
import Markdown from "react-markdown"

import classnames from "classnames"
import styles from "./Chapter01.scss"
import Subsection from "../Components/Subsection"
import ChapterTitle from "../Components/ChapterTitle"
import VisibleSensor from "../Components/VisibleSensor"
import commonStyles from "../../../styles/common.scss"

import shelter01 from "../../../../content/assets/shelter-medical.svg"
import shelter02 from "../../../../content/assets/shelter-complaint.svg"
import shelter03 from "../../../../content/assets/shelter-tracking.svg"

import FullPageMap from "../FullPageMap/FullPageMap"

import { chapter, topBox, titles, sec1Des, sec1Credit, sec2Des, sec3Des, sec3List } from "./text"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

const SLIDEIN_EFFECT = { translateY: [ "0%", "25%" ], opacity: [ 1, 0.5 ] }

export default class Chapter01 extends Component {
  constructor(props) {
    super(props)
    this._handleProblem1 = this._handleProblem1.bind(this)
    this._handleProblem2 = this._handleProblem2.bind(this)
    this._handleProblem3 = this._handleProblem3.bind(this)
  }

  _handleProblem1() {
    try {
      const dog = document.getElementById("ps-dog-1")
      velocity(dog, SLIDEIN_EFFECT, { delay: 300, duration: 1000 })
      velocity(this.p1Text, SLIDEIN_EFFECT, { delay: 300, duration: 1300 })
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleProblem2() {
    try {
      const dog = document.getElementById("ps-dog-2")
      velocity(dog, { translateX: [ "50%", "50%" ], translateY: [ "0%", "15%" ], opacity: [ 1, 0.5 ] }, { delay: 300, duration: 1000 })
      velocity(this.p2Text, SLIDEIN_EFFECT, { delay: 300, duration: 1300 })
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleProblem3() {
    try {
      const dog = document.getElementById("ps-dog-3")
      velocity(dog, { translateX: [ "0%", "0%" ], translateY: [ "0%", "30%" ], opacity: [ 1, 0.5 ] }, { delay: 300, duration: 1200 })
      velocity(this.p3Text, SLIDEIN_EFFECT, { delay: 300, duration: 1300 })
    }
    catch (e) {
      console.log("error playing animations")
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
                <VisibleSensor handleVisible={ this._handleProblem1 }>
                  <div className={ classnames(styles["b-grid"]) } style={ { marginTop: "3rem" } }>
                    <div className={ styles["c-left"] }>
                      <p ref={ (ref) => this.p1Text = ref } className={ classnames(commonStyles["large-text"], styles["c-text"]) }> { sec3List[0] } </p>
                    </div>
                    <div className={ styles["c-right"] }>
                      <div className={ classnames(commonStyles["img-responsive"],
                        styles["yoyo"], commonStyles["overlay-svg"]) }
                        dangerouslySetInnerHTML={ { __html: shelter01 } }
                        ref={ (ref) => this.p1G = ref }
                      />
                    </div>
                  </div>
                </VisibleSensor>
                <VisibleSensor handleVisible={ this._handleProblem2 }>
                  <div className={ classnames(styles["b-grid"]) } style={ { marginTop: "3rem" } }>
                    <div className={ styles["c-right"] }>
                      <p ref={ (ref) => this.p2Text = ref } className={ classnames(commonStyles["large-text"], styles["c-text"]) }> { sec3List[1] } </p>
                    </div>
                    <div className={ styles["c-left"] }>
                      <div className={ classnames(commonStyles["img-responsive"],
                        styles["yoyo"], commonStyles["overlay-svg"]) }
                        dangerouslySetInnerHTML={ { __html: shelter02 } }
                        ref={ (ref) => this.p2G = ref }
                      />
                    </div>
                  </div>
                </VisibleSensor>
                <VisibleSensor handleVisible={ this._handleProblem3 }>
                  <div className={ classnames(styles["b-grid"]) } style={ { marginTop: "3rem" } }>
                    <div className={ styles["c-left"] }>
                      <p ref={ (ref) => this.p3Text = ref } className={ classnames(commonStyles["large-text"], styles["c-text"]) }> { sec3List[2] } </p>
                    </div>
                    <div className={ styles["c-right"] }>
                      <div className={ classnames(commonStyles["img-responsive"],
                        styles["yoyo"], commonStyles["overlay-svg"]) }
                        dangerouslySetInnerHTML={ { __html: shelter03 } }
                        ref={ (ref) => this.p3G = ref }
                      />
                    </div>
                  </div>
                </VisibleSensor>
              </div>
            </Subsection>
          </div>
        </div>
      </div>
    )
  }
}

Chapter01.propTypes = {}
