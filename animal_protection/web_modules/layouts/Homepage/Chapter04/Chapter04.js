/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"
// import ReactDOM from "react-dom"
import Markdown from "react-markdown"

import classnames from "classnames"
import styles from "./Chapter04.scss"
import Subsection from "../Components/Subsection"
import ChapterTitle from "../Components/ChapterTitle"
import commonStyles from "../../../styles/common.scss"
import VisibleSensor from "../Components/VisibleSensor"

import { chapter, topBox, titles, sec1Des, sec2Des, sec2End, sec2Note, problemList } from "./text"

import problem01 from "../../../../content/assets/5p-01.svg"
import problem02 from "../../../../content/assets/5p-02.svg"
import problem03 from "../../../../content/assets/5p-03.svg"
import problem04 from "../../../../content/assets/5p-04.svg"

import ai2htmlMobile from "../../../../content/assets/OWNERS-Artboard_1_copy.png"
import ai2htmlDesktop from "../../../../content/assets/OWNERS-Artboard_1.png"

import { barChart } from "./ai2html"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

const SLIDEIN_EFFECT = { translateY: [ "0%", "10%" ], opacity: [ 1, 0.8 ] }
const SLIDEIN_TEXT_EFFECT = { translateY: [ "0%", "12%" ], opacity: [ 1, 0.6 ] }
const SLIDETIME =  { delay: 10, duration: 1000 }
const SLIDETIME_TEXT =  { delay: 10, duration: 1200 }

export default class Chapter04 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
    }
    this._handleAnswer1 = this._handleAnswer1.bind(this)
    this._handleAnswer2 = this._handleAnswer2.bind(this)
    this._handleAnswer3 = this._handleAnswer3.bind(this)
    this._handleAnswer4 = this._handleAnswer4.bind(this)
  }

  _handleAnswer1() {
    try {
      velocity(this.p1G, SLIDEIN_EFFECT,)
      velocity(this.p1Text, SLIDEIN_TEXT_EFFECT, SLIDETIME_TEXT)
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleAnswer2() {
    try {
      velocity(this.p2G, SLIDEIN_EFFECT, SLIDETIME)
      velocity(this.p2Text, SLIDEIN_TEXT_EFFECT, SLIDETIME_TEXT)
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleAnswer3() {
    try {
      velocity(this.p3G, SLIDEIN_EFFECT, SLIDETIME)
      velocity(this.p3Text, SLIDEIN_TEXT_EFFECT, SLIDETIME_TEXT)
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleAnswer4() {
    try {
      velocity(this.p4G, SLIDEIN_EFFECT, SLIDETIME)
      velocity(this.p4Text, SLIDEIN_TEXT_EFFECT, SLIDETIME_TEXT)
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
            <Subsection curSec={ 4 } titles={ titles } subIndex={ 0 }>
              <div className={  classnames(commonStyles["content-outer"]) } style={ { paddingBottom: "3.5rem" } }>
                <div className={ commonStyles["pad-content"] }>
                  <Markdown className={ commonStyles["inner-text"] }  source={ sec1Des } />
                </div>

                <VisibleSensor handleVisible={ this._handleAnswer1 }>
                  <div className={ classnames(styles["b-grid"]) } style={ { marginTop: "-1rem" } }>
                    <div className={ styles["c-left"] }>
                      <div className={ classnames(commonStyles["img-responsive"],
                        styles["c-human"], commonStyles["overlay-svg"]) }
                        dangerouslySetInnerHTML={ { __html: problem01 } }
                        ref={ (ref) => this.p1G = ref }
                      />
                    </div>
                    <div ref={ (ref) => this.p1Text = ref } className={ classnames(styles["c-right"], styles["right-text"]) }>
                      <p className={ classnames(styles["c-text"]) }> { problemList[0] } </p>
                    </div>
                  </div>
                </VisibleSensor>

                <VisibleSensor handleVisible={ this._handleAnswer2 }>
                  <div className={ classnames(styles["b-grid"]) } style={ { marginTop: "-1rem" } }>
                    <div className={ styles["c-right"] }>
                      <div className={ classnames(commonStyles["img-responsive"],
                        styles["c-human"], commonStyles["overlay-svg"]) }
                        dangerouslySetInnerHTML={ { __html: problem02 } }
                        ref={ (ref) => this.p2G = ref }
                      />
                    </div>
                    <div ref={ (ref) => this.p2Text = ref } className={ classnames(styles["c-left"], styles["left-text"]) }>
                      <p className={ classnames(styles["c-text"]) }> { problemList[1] } </p>
                    </div>
                  </div>
                </VisibleSensor>

                <VisibleSensor handleVisible={ this._handleAnswer3 }>
                  <div className={ classnames(styles["b-grid"]) } style={ { marginTop: "-1rem" } }>
                    <div className={ styles["c-left"] }>
                      <div className={ classnames(commonStyles["img-responsive"],
                        styles["c-human"], commonStyles["overlay-svg"]) }
                        dangerouslySetInnerHTML={ { __html: problem03 } }
                        ref={ (ref) => this.p3G = ref }
                      />
                    </div>
                    <div ref={ (ref) => this.p3Text = ref } className={ classnames(styles["c-right"], styles["right-text"]) }>
                      <p className={ classnames(styles["c-text"]) }> { problemList[2] } </p>
                    </div>
                  </div>
                </VisibleSensor>

                <VisibleSensor handleVisible={ this._handleAnswer4 }>
                  <div className={ classnames(styles["b-grid"]) } style={ { marginTop: "-1rem" } }>
                    <div className={ styles["c-right"] }>
                      <div className={ classnames(commonStyles["img-responsive"],
                        styles["c-human"], commonStyles["overlay-svg"]) }
                        dangerouslySetInnerHTML={ { __html: problem04 } }
                        ref={ (ref) => this.p4G = ref }
                      />
                    </div>
                    <div ref={ (ref) => this.p4Text = ref } className={ classnames(styles["c-left"], styles["left-text"]) }>
                      <p className={ classnames(styles["c-text"]) }> { problemList[3] } </p>
                    </div>
                  </div>
                </VisibleSensor>

              </div>

            </Subsection>
            <Subsection curSec={ 4 } titles={ titles } subIndex={ 1 }>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) } style={ { paddingBottom: "3.5rem" } }>
                <Markdown className={ commonStyles["inner-text"] }  source={ sec2Des } />
              </div>
              <div className={ classnames(commonStyles["c-grid"]) }>
                <div className={ classnames(commonStyles["content-outer"]) }
                  dangerouslySetInnerHTML={ { __html: barChart(ai2htmlMobile, ai2htmlDesktop) } }
                />
                <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) } style={ { paddingBottom: "3.5rem" } }>
                  <Markdown className={ commonStyles["inner-text"] }  source={ sec2Note } />
                </div>
              </div>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) } style={ { paddingBottom: "3.5rem" } }>
                <Markdown className={ commonStyles["inner-text"] }  source={ sec2End } />
              </div>
            </Subsection>
          </div>
        </div>
      </div>
    )
  }
}

Chapter04.propTypes = {}
