/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"
import Markdown from "react-markdown"

import classnames from "classnames"
import styles from "./Tnr.scss"
import Subsection from "../Components/Subsection"
import ChapterTitle from "../Components/ChapterTitle"
import VisibleSensor from "../Components/VisibleSensor"
import Game from "../Game/Game"
import commonStyles from "../../../styles/common.scss"

import tnrT from "../../../../content/assets/TNR-T.svg"
import rInfoImg from "../../../../content/assets/info-box-icon.svg"

import { chapter, topBox, titles, research, tnvrStrings } from "./text"

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

  }

  _handleAnimationT() {
    try {
      const tLeft = document.getElementById("tLeft")
      const tRight = document.getElementById("tRight")
      if (tLeft && tRight) {
        velocity(tLeft, { translateX: [ 0, -50 ], opacity: [ 1, 0.8 ] }, { delay: 200, duration: 700 })
        velocity(tRight, { scale: [ 1, 1.1 ], opacity: [ 1, 0.8 ] }, { delay: 200, duration: 800 })
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
          <div className={ commonStyles["content-outer"] }>
            <div className={ classnames(styles["content-box"]) }>
              <Markdown source={ topBox } />
            </div>
            <Subsection curSec={ 2 } titles={ titles } subIndex={ 0 }>
              <div className={ commonStyles["wrap-grids"] }>
                <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                  <VisibleSensor handleVisible={ this._handleAnimationT }>
                    <div className={ classnames(commonStyles["img-responsive"],
                      styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: tnrT } }
                      ref={ (ref) => this.chartT = ref }
                    />
                  <p className={ commonStyles["g-btm-text"] }>{ tnvrStrings[0] }</p>
                  </VisibleSensor>
                </div>
                <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                  <VisibleSensor handleVisible={ this._handleAnimationN }>
                    <div className={ classnames(commonStyles["img-responsive"],
                      styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: tnrT } }
                      ref={ (ref) => this.chartN = ref }
                    />
                  <p className={ commonStyles["g-btm-text"] }>{ tnvrStrings[1] }</p>
                  </VisibleSensor>
                </div>
                <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                  <VisibleSensor handleVisible={ this._handleAnimationV }>
                    <div className={ classnames(commonStyles["img-responsive"],
                      styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: tnrT } }
                      ref={ (ref) => this.chartV = ref }
                    />
                  <p className={ commonStyles["g-btm-text"] }>{ tnvrStrings[2] }</p>
                  </VisibleSensor>
                </div>
                <div className={ classnames(commonStyles["grid-50"], commonStyles["c-grid"]) }>
                  <VisibleSensor handleVisible={ this._handleAnimationR }>
                    <div className={ classnames(commonStyles["img-responsive"],
                      styles["yoyo"], commonStyles["overlay-svg"]) }
                      dangerouslySetInnerHTML={ { __html: tnrT } }
                      ref={ (ref) => this.chartR = ref }
                    />
                  <p className={ commonStyles["g-btm-text"] }>{ tnvrStrings[3] }</p>
                  </VisibleSensor>
                </div>
              </div>

            </Subsection>
            <Subsection curSec={ 2 } titles={ titles } subIndex={ 1 }>
              this is a subsection
              <div></div>
            </Subsection>
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
        </div>
      </div>
    )
  }
}

Tnr.propTypes = {}
