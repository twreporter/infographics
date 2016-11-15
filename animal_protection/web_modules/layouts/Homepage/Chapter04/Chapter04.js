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
import RelatedItem from "../Components/RelatedItem"

import { chapter, topBox, titles, sec1Des, sec2Des, sec2End, sec2Note, problemList } from "./text"

import problem01 from "../../../../content/assets/5p-01.svg"
import problem02 from "../../../../content/assets/5p-02.svg"
import problem03 from "../../../../content/assets/5p-03.svg"
import problem04 from "../../../../content/assets/5p-04.svg"

import ai2htmlMobile from "../../../../content/assets/OWNERS-Artboard_1_copy.png"
import ai2htmlDesktop from "../../../../content/assets/OWNERS-Artboard_1.png"

import related01 from "../../../../content/assets/related01.jpg"
import related02 from "../../../../content/assets/related02.jpg"
import related03 from "../../../../content/assets/related03.jpg"
import related04 from "../../../../content/assets/related04.jpg"
import related05 from "../../../../content/assets/related05.jpg"

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
        <ChapterTitle chapterId={ chapter.id } chapterNum={ 4 } title={ chapter.title } />
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
              <div className={  classnames(commonStyles["content-outer"], commonStyles["pad-content"]) } style={ { paddingTop: "3.5rem", paddingBottom: "2rem" } }>
                <Markdown className={ commonStyles["inner-text"] }  source={ sec2End } />
              </div>
              <div className={ classnames(commonStyles["content-outer"]) } style={ { paddingBottom: "3rem" } }>
                <RelatedItem title="零安樂死政策——流浪動物的新天堂樂園？（上）"
                  description="2017年2月，零安樂死政策將正式實施，表面上看來似乎是台灣動保運動的一大里程碑。然而，關乎流浪動物的諸多問題仍未解決。倉促上路的結果，是對動物福利造成更多的傷害，衝擊最深的，將是第一線工作人員。"
                  imgSrc={ related01 }
                  link="https://www.twreporter.org/a/animal-protection-no-killing-ch1"
                />
                <RelatedItem title="零安樂死政策——流浪動物的新天堂樂園？（下）"
                  description="零安樂死政策的通過，只是再一次反映了台灣動保的陳年老問題：法律遠遠走在前面，人力和資源卻苦苦追趕不上。當政府無法務實的評估人力與資源並制定政策，零安樂死只能是表面功夫。最終公立收容所為了達成目標，不得不將流浪狗卻被「流放」至私人狗場，面臨未知的命運。"
                  imgSrc={ related02 }
                  link="https://www.twreporter.org/a/animal-protection-no-killing-ch2"
                />
                <RelatedItem title="不願面對的真相——公立收容所獸醫師的困境"
                  description="公立收容所是處理流浪動物的最前線，從街上被捕捉的狗，第一時間就送到這裡來。要等到什麼時候，從中央到地方政府真正將「專業」擺第一，而不是投大眾所好，空口開支票，由收容所獸醫師承擔所有的壓力與苦果？"
                  imgSrc={ related03 }
                  link="https://www.twreporter.org/a/animal-protection-veterinarian"
                />
                <RelatedItem title="【攝影】生殤相──流浪犬安樂死日最終肖像"
                  description="我為台灣數家公立收容所內的流浪犬，於安樂死當日留下生前的最後身影。這些影像使觀者得以凝視不可能回復的過往時刻，以及那些逐漸腐敗的死亡肉身。  "
                  imgSrc={ related04 }
                  link="https://www.twreporter.org/a/photo-memento-mori"
                />
                <RelatedItem title="【攝影】城市新住民——街貓"
                  description="因為觀念改變加上越來越多人住在公寓大廈，養貓的人增加了。不過，養的人多了，棄養的人也會跟著多。"
                  imgSrc={ related05 }
                  link="https://www.twreporter.org/a/photo-animal-protection-cats"
                />
              </div>
            </Subsection>
          </div>
        </div>
      </div>
    )
  }
}

Chapter04.propTypes = {}
