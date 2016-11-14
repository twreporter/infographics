/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"

import classnames from "classnames"
import commonStyles from "../styles/common.scss"
import styles from "./Footer.scss"
import logoIcon from "./logo-mobile.svg"

export default class Footer extends Component {

  render() {
    return (
      <div className={ styles["container"] }>
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
