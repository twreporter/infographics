/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"
// import ReactDOM from "react-dom"
import Markdown from "react-markdown"

import classnames from "classnames"
import styles from "./Tnr.scss"
import Subsection from "../Components/Subsection"
import ChapterTitle from "../Components/ChapterTitle"
import VisibleSensor from "../Components/VisibleSensor"
import Game from "../Game/Game"
import commonStyles from "../../../styles/common.scss"

import tnrT from "../../../../content/assets/tnvr-t.svg"
import tnrN from "../../../../content/assets/tnvr-n2.svg"
import tnrV from "../../../../content/assets/tnvr-v.svg"
import tnrR from "../../../../content/assets/tnvr-r.svg"
import rInfoImg from "../../../../content/assets/info-box-icon.svg"
import problem1 from "../../../../content/assets/traffic-accident.svg"
import problem2 from "../../../../content/assets/cold.svg"
import problem3 from "../../../../content/assets/poison.svg"
import problem4 from "../../../../content/assets/wild-animal.svg"

import { chapter, topBox, titles, research, tnvrStrings,
  sec2Des, sec3Des, sec4Des, problemStrings } from "./text"

const SLIDEIN_EFFECT = { translateX: [ "-50%", "-50%" ], translateY: [ "0%", "50%" ], opacity: [ 1, 0.5 ] }

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

export default class Tnr extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
    }

    this._handleAnimationT = this._handleAnimationT.bind(this)
    this._handleAnimationN = this._handleAnimationN.bind(this)
    this._handleAnimationV = this._handleAnimationV.bind(this)
    this._handleAnimationR = this._handleAnimationR.bind(this)
    this._handleProblem1 = this._handleProblem1.bind(this)
    this._handleProblem2 = this._handleProblem2.bind(this)
    this._handleProblem3 = this._handleProblem3.bind(this)
    this._handleProblem4 = this._handleProblem4.bind(this)
  }

  _handleAnimationT() {
    try {
      const tLeft = document.getElementById("tLeft")
      const tRight = document.getElementById("tRight")
      if (tLeft && tRight) {
        velocity(tLeft, { translateX: [ 0, -50 ], opacity: [ 1, 0.8 ] }, { delay: 300, duration: 900 })
        velocity(tRight, { scale: [ 1, 1.1 ], opacity: [ 1, 0.8 ] }, { delay: 300, duration: 1000 })
        velocity(this.cTText, SLIDEIN_EFFECT, { delay: 300, duration: 1000 })
      }
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleAnimationN() {
    try {
      const tTop = document.getElementById("neuter")
      const tBg = document.getElementById("tnvr-n-bg")
      if (tTop && tBg) {
        velocity(tTop, { translateX: [ 0, 10 ], translateY: [ 0, 30 ], opacity: [ 1, 0.8 ] }, { delay: 650, duration: 1000 })
        velocity(tBg, { scale: [ 1, 1.2 ], opacity: [ 1, 0.8 ] }, { delay: 650, duration: 800 })
        velocity(this.cNText, SLIDEIN_EFFECT, { delay: 650, duration: 1000 })
      }
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleAnimationV() {
    try {
      const tDog = document.getElementById("tnvr-v-dog")
      const tWow = document.getElementById("tnvr-v-wow")
      const tSyringe = document.getElementById("tnvr-v-syringe")
      if (tDog && tWow && tSyringe) {
        velocity(tDog, { translateY: [ 0, 30 ], opacity: [ 1, 0.8 ] }, { delay: 450, duration: 1000 })
        velocity(tWow, { translateY: [ 0, 50 ], scale: [ 1, 0.9 ], opacity: [ 1, 0.5 ] }, { delay: 450, duration: 800 })
        velocity(tSyringe, { translateY: [ 0, 30 ], translateX: [ 0, -30 ] }, { delay: 450, duration: 1000 })
        velocity(this.cVText, SLIDEIN_EFFECT, { delay: 300, duration: 1000 })
      }
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleAnimationR() {
    try {
      const tDog = document.getElementById("tnvr-r-dog")
      const tWow = document.getElementById("tnvr-r-wow")
      const tHand = document.getElementById("tnvr-r-hand")
      if (tDog && tWow && tHand) {
        velocity(tDog, { translateX: [ 0, -10 ], translateY: [ 0, -30 ], opacity: [ 1, 0.6 ] }, { delay: 750, duration: 1000 })
        velocity(tWow, { translateX: [ 0, -20 ], scale: [ 1, 1.2 ], opacity: [ 1, 0.2 ] }, { delay: 650, duration: 800 })
        velocity(tHand, { translateY: [ 0, 10 ], translateX: [ 0, -20 ] }, { delay: 650, duration: 1000 })
        velocity(this.cRText, SLIDEIN_EFFECT, { delay: 650, duration: 1000 })
      }
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleProblem1() {
    try {
      const tLeft = document.getElementById("p1-dog")
      const tRight = document.getElementById("p1-wow")
      if (tLeft && tRight) {
        velocity(tLeft, { translateX: [ 0, -50 ], opacity: [ 1, 0.8 ] }, { delay: 300, duration: 900 })
        velocity(tRight, { scale: [ 1, 1.1 ], opacity: [ 1, 0.8 ] }, { delay: 300, duration: 1000 })
        velocity(this.p1Text, SLIDEIN_EFFECT, { delay: 300, duration: 1000 })
      }
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleProblem2() {
    try {
      const tLeft = document.getElementById("p2-dog")
      const tRight = document.getElementById("p2-wind")
      if (tLeft && tRight) {
        velocity(tLeft, { translateY: [ 0, 30 ], opacity: [ 1, 0.8 ] }, { delay: 300, duration: 900 })
        velocity(tRight, { scale: [ 1, 1.2 ], opacity: [ 1, 0.8 ] }, { delay: 300, duration: 1000 })
        velocity(this.p2Text, SLIDEIN_EFFECT, { delay: 300, duration: 1000 })
      }
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleProblem3() {
    try {
      const tLeft = document.getElementById("p3-dog")
      const tRight = document.getElementById("p3-poison_food")
      if (tLeft && tRight) {
        velocity(tLeft, { translateX: [ 0, -50 ], opacity: [ 1, 0.8 ] }, { delay: 300, duration: 900 })
        velocity(tRight, { scale: [ 1, 1.1 ], opacity: [ 1, 0.8 ] }, { delay: 300, duration: 1000 })
        velocity(this.p3Text, SLIDEIN_EFFECT, { delay: 300, duration: 1000 })
      }
    }
    catch (e) {
      console.log("error playing animations")
    }
  }

  _handleProblem4() {
    try {
      const tLeft = document.getElementById("p4-bird")
      const tRight = document.getElementById("p4-pangolin")
      const tTop = document.getElementById("p4-dog")
      if (tLeft && tRight) {
        velocity(tLeft, { translateX: [ 0, -50 ], opacity: [ 1, 0.8 ] }, { delay: 300, duration: 900 })
        velocity(tRight, { scale: [ 1, 1.1 ], opacity: [ 1, 0.8 ] }, { delay: 300, duration: 1000 })
        velocity(tTop, { scale: [ 1, 1.05 ], translateY: [ 0, -10 ] }, { delay: 300, duration: 1000 })
        velocity(this.p4Text, SLIDEIN_EFFECT, { delay: 300, duration: 1000 })
      }
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
            <Subsection curSec={ 2 } titles={ titles } subIndex={ 0 }>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"], commonStyles["wrap-grids"]) }>
                <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                  <VisibleSensor handleVisible={ this._handleAnimationT }>
                    <div className={ classnames(commonStyles["img-responsive"],
                      styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: tnrT } }
                      ref={ (ref) => this.chartT = ref }
                    />
                  <p className={ commonStyles["g-btm-text"] } ref={ (ref) => this.cTText = ref }>{ tnvrStrings[0] }</p>
                  </VisibleSensor>
                </div>
                <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                  <VisibleSensor handleVisible={ this._handleAnimationN }>
                    <div className={ classnames(commonStyles["img-responsive"],
                      styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: tnrN } }
                      ref={ (ref) => this.chartN = ref }
                    />
                  <p className={ commonStyles["g-btm-text"] } ref={ (ref) => this.cNText = ref }>{ tnvrStrings[1] }</p>
                  </VisibleSensor>
                </div>
                <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                  <VisibleSensor handleVisible={ this._handleAnimationV }>
                    <div className={ classnames(commonStyles["img-responsive"],
                      styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: tnrV } }
                      ref={ (ref) => this.chartV = ref }
                    />
                  <p className={ commonStyles["g-btm-text"] } ref={ (ref) => this.cVText = ref }>{ tnvrStrings[2] }</p>
                  </VisibleSensor>
                </div>
                <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                  <VisibleSensor handleVisible={ this._handleAnimationR }>
                    <div className={ classnames(commonStyles["img-responsive"],
                      styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: tnrR } }
                      ref={ (ref) => this.chartR = ref }
                    />
                  <p className={ commonStyles["g-btm-text"] } ref={ (ref) => this.cRText = ref }>{ tnvrStrings[3] }</p>
                  </VisibleSensor>
                </div>
              </div>
            </Subsection>
            <Subsection curSec={ 2 } titles={ titles } subIndex={ 1 }>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) }>
                <Markdown className={ commonStyles["inner-text"] } source={ sec2Des } />
                <div className={ commonStyles["wrap-grids"] }>
                  <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                    <VisibleSensor handleVisible={ this._handleProblem1 }>
                      <div className={ classnames(commonStyles["img-responsive"],
                        styles["yoyo"], commonStyles["overlay-svg"]) }
                        style={ { marginTop: "-12%", marginLeft: "-10%", width: "120%", maxWidth:"120%" } }
                        dangerouslySetInnerHTML={ { __html: problem1 } }
                        ref={ (ref) => this.p1G = ref }
                      />
                    <p className={ commonStyles["g-btm-text"] } style={ { marginBottom: "-12%" } } ref={ (ref) => this.p1Text = ref }>{ problemStrings[0] }</p>
                    </VisibleSensor>
                  </div>
                  <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                    <VisibleSensor handleVisible={ this._handleProblem2 }>
                      <div className={ classnames(commonStyles["img-responsive"],
                        styles["yoyo"], commonStyles["overlay-svg"]) }
                        dangerouslySetInnerHTML={ { __html: problem2 } }
                        ref={ (ref) => this.p2G = ref }
                      />
                    <p className={ commonStyles["g-btm-text"] } ref={ (ref) => this.p2Text = ref }>{ problemStrings[1] }</p>
                    </VisibleSensor>
                  </div>
                  <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                    <VisibleSensor handleVisible={ this._handleProblem3 }>
                      <div className={ classnames(commonStyles["img-responsive"],
                        styles["yoyo"], commonStyles["overlay-svg"]) }
                        dangerouslySetInnerHTML={ { __html: problem3 } }
                        ref={ (ref) => this.p3G = ref }
                      />
                    <p className={ commonStyles["g-btm-text"] } ref={ (ref) => this.p3Text = ref }>{ problemStrings[2] }</p>
                    </VisibleSensor>
                  </div>
                  <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                    <VisibleSensor handleVisible={ this._handleProblem4 }>
                      <div className={ classnames(commonStyles["img-responsive"],
                        styles["yoyo"], commonStyles["overlay-svg"]) }
                        dangerouslySetInnerHTML={ { __html: problem4 } }
                        ref={ (ref) => this.p4G = ref }
                      />
                    <p className={ commonStyles["g-btm-text"] } ref={ (ref) => this.p4Text = ref }>{ problemStrings[3] }</p>
                    </VisibleSensor>
                  </div>
                </div>
              </div>
            </Subsection>
            <Subsection curSec={ 2 } titles={ titles } subIndex={ 2 }>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) }>
                <Markdown className={ commonStyles["inner-text"] } source={ sec3Des } />
              </div>
              <div className={ classnames(commonStyles["c-grid"]) }>
                <div className={ classnames(commonStyles["content-outer"], commonStyles["pad-content"], commonStyles["white-box"]) }>
                  <h4> 105年至8月止累計案件數 </h4>
                  <div className={ commonStyles["wrap-grids"] }>
                    <div className={ classnames(commonStyles["grid-33"], styles["case-number"], styles["case-blue"]) }>
                      檢舉 <br /> <span className={ commonStyles["super-text"] }>260</span> 件
                    </div>
                    <div className={ classnames(commonStyles["grid-33"], styles["case-number"], styles["case-pink"]) }>
                      緝查 <br /> <span className={ commonStyles["super-text"] }>123</span> 件
                    </div>
                    <div className={ classnames(commonStyles["grid-33"], styles["case-number"], styles["case-dark"]) }>
                      勸導 <br /> <span className={ commonStyles["super-text"] }>127</span> 件
                    </div>
                  </div>
                </div>
              </div>
            </Subsection>
            <Subsection curSec={ 2 } titles={ titles } subIndex={ 3 }>
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) }>
                <Markdown className={ commonStyles["inner-text"] } source={ sec4Des } />
                <Game />
                <div className={ classnames(styles["research-des"]) }>
                  <div className={ classnames(styles["title-box"]) }>
                    <div className={ classnames(styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: rInfoImg } } />
                    <div className={ styles["r-title"] }>{ research.title }</div>
                  </div>
                  <Markdown source={ research.des } />
                </div>
              </div>
            </Subsection>
          </div>
        </div>
      </div>
    )
  }
}

Tnr.propTypes = {}
