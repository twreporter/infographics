/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"

import classnames from "classnames"
import commonStyles from "../styles/common.scss"
import styles from "./Footer.scss"
import logoIcon from "./logo-mobile.svg"
import pet1 from "../../content/assets/dog01.jpg"

export default class Footer extends Component {

  render() {
    return (
      <div className={ styles["container"] }>
        <div className={ commonStyles["content-outer"] }>
          <a href="https://www.twreporter.org/a/opinion-veterinarian-suicide">
            <div className={ styles["related-item"] }>
              <div className={ styles["related-left"] }>
                <img className={ styles["crop"] } src={ pet1 } />
              </div>
              <div className={ styles["related-right"] }>
                <p className={ styles["related-title"] }>盧思岑／血汗的第一線獸醫師工作</p>
                <p className={ styles["related-des"] }>政府一方面必須建立完整的收容所管理流程及人力的培訓，同時也應更關心第一線獸醫師的心理調適。獸醫師的養成不容易，面臨的心理壓力也高過於其他工作型態。</p>
              </div>
            </div>
          </a>
        </div>

        <footer className={ styles.footer }>
          <div className={ commonStyles["content-outer"] }>
            <div className={ styles["logo"] }>
              <a href="https://www.twreporter.org/" className={ classnames(styles["tablet-logo"]) } target="_self">
                <div title="報導者TheReporter" className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
                  dangerouslySetInnerHTML={ { __html: logoIcon } }
                />
              </a>
            </div>
            <div className={ styles["footer-links"] }>
              <div>
                <a href={ "https://www.twreporter.org/a/about-us-footer" }>
                    關於我們
                </a>
              </div>
              <div>
                <a href={ "https://www.twreporter.org/a/contact-footer" }>
                    聯絡我們
                </a>
              </div>
              <div>
                <a href={ "https://www.twreporter.org/a/privacy-footer" }>
                    隱私政策
                </a>
              </div>
              <div className={ styles["support"] }>
                <a href="https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718" target="_blank">
                    贊助我們
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

    )
  }
}
