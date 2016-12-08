import React, { PropTypes } from "react"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import SVGInline from "react-svg-inline"

import styles from "./Slide.scss"
import commonStyles from "../../styles/common.scss"

import copyrightImg from "../../../content/assets/cc-copyrights.svg"
import topicIcon from "../../../content/assets/back-to-topics.svg"
import tabIcon from "../../../content/assets/open-tab.svg"
import githubIcon from "../../../content/assets/icon-github.svg"
import largeLogo from "../../../content/assets/logo-navbar.svg"
import donateIcon from "../../../content/assets/icon-donation.svg"

import relatedImg1 from "../../../content/assets/article1.jpg"
import relatedImg2 from "../../../content/assets/article2.jpg"

const LastSlide = (props) => {
  return (
    <div>
        <div className={styles["ending-wrapper"]}>
          <a target="_blank" href="https://www.twreporter.org/">
            <ReactCSSTransitionGroup
              transitionName="element"
              transitionAppear={true}
              transitionAppearTimeout={850}
              transitionEnterTimeout={850}
              transitionLeaveTimeout={0}>
                <div className={styles["topic-banner"]}>
                  <div className={styles["tab-icon"]}>
                    <SVGInline svg={ tabIcon } />
                  </div>
                  <SVGInline className={styles["topic-icon"]} svg={ topicIcon } />
                  <div className={styles["topic-text"]}>
                    <h3>造假·剝削·血淚漁場</h3>
                    <h5>直擊台灣遠洋漁業真相</h5>
                  </div>
                </div>
            </ReactCSSTransitionGroup>
          </a>

          <ReactCSSTransitionGroup
            transitionName="subelement"
            transitionAppear={true}
            transitionAppearTimeout={1600}
            transitionEnterTimeout={1600}
            transitionLeaveTimeout={0}>
            <div className={styles["links-box"]}>
              <div className={styles["grid-left"]}>
                <a target="_blank" href="https://www.twreporter.org/">
                  <div className={ styles["related-item"] }>
                    <div className={ styles["related-left"] }>
                      <img className={ styles["crop"] } src={relatedImg1} />
                    </div>
                    <div className={ styles["related-right"] }>
                      <p className={ styles["related-title"] }>【印尼現場 I 】我們和印尼聯手剝削萬名漁工</p>
                    </div>
                  </div>
                </a>
                <a target="_blank" href="https://www.twreporter.org/">
                  <div className={ styles["related-item"] }>
                    <div className={ styles["related-left"] }>
                      <img className={ styles["crop"] } src={relatedImg2} />
                    </div>
                    <div className={ styles["related-right"] }>
                      <p className={ styles["related-title"] }>【印尼現場 II 】未解的謎團——一位漁工之死</p>
                    </div>
                  </div>
                </a>
              </div>

              <div className={styles["grid-right"]}>
                <div>
                  <p className={styles["github-link"]}><a target="_blank" href="https://github.com/twreporter/infographics"><SVGInline svg={ githubIcon } /> &nbsp; github.com/twreporter</a></p>
                  <p><a target="_blank" href="https://www.twreporter.org/"><SVGInline svg={ largeLogo } /></a></p>
                  <a target="_blank" className={ styles["donate-btn"] } href="https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718"><SVGInline svg={ donateIcon } /> &nbsp; 贊助我們</a>
                  <div className={ commonStyles["white-text"] }
                    dangerouslySetInnerHTML={ { __html:
                      `<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.twreporter.org%2Fa%2F${props.siteUrl}&width=300&layout=standard&action=like&size=large&show_faces=true&share=true&height=80&appId=962589903815787&colorscheme=dark" width="300" height="80" style="border:none;overflow:hidden" scrolling="no" frameBorder="0" allowTransparency="true"></iframe>` } }
                  />
                </div>
              </div>
            </div>
          </ReactCSSTransitionGroup>
        </div>

        <div className={styles["copyright"]}>
        <ReactCSSTransitionGroup
          transitionName="subelement"
          transitionAppear={true}
          transitionAppearTimeout={1200}
          transitionEnterTimeout={1200}
          transitionLeaveTimeout={0}>
            <SVGInline svg={ copyrightImg } />
            <span className={styles["copyright-outer-text"]}>
              <span className={styles["copyright-text"]}>除另有註明，網站內容皆</span>採用創用 CC 姓名標示-非商業性-禁止改作授權條款
            </span>
          </ReactCSSTransitionGroup>
        </div>


    </div>
  )
}

LastSlide.propTypes = {
  siteUrl: PropTypes.string.isRequired,
}

export default LastSlide
