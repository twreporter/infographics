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

import { chapter, topBox, titles, sec1Des, sec2Des, sec3Des } from "./text"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

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
              <div className={ classnames(commonStyles["c-grid"], styles["legi-outer"]) }>
                <div className={ classnames(styles["title-box"]) }>
                  <div className={ classnames(styles["yoyo"], commonStyles["overlay-svg"]) }
                    dangerouslySetInnerHTML={ { __html: rInfoImg } } />
                  <div className={ styles["r-title"] }><h4>法條定義不清、執法成本增加</h4></div>
                </div>
                <div className={ classnames(commonStyles["content-outer"], commonStyles["pad-content"], styles["legi-box"]) }>
                  <p>
                    <span className={ styles["legi-title"] }>「提供安全、乾淨、通風、排水、適當及適量之遮蔽、照明與溫度之生活環境。」</span>
                    <span className={ styles["legi-id"] }>——  動保法第5條</span>
                  </p>
                  <hr />
                  <p>關於飼主責任的相關法規，每個人的觀念不同。動保員曾遇過投訴方與飼主觀念差距極大的狀況，無法拒絕投訴，只能口頭勸導飼主。</p>
                </div>
                <div className={ classnames(commonStyles["content-outer"], commonStyles["pad-content"], commonStyles["white-box"]) }>
                  <h4> 105年至8月止累計案件數 </h4>
                  <div className={ commonStyles["wrap-grids"] }>
                  </div>
                </div>
              </div>
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
