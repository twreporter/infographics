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
            <p className={ commonStyles["white-text"] }>Made by <b><a target="_blank" href="https://www.twreporter.org">The Reporter Media Foundation</a></b>, Taipei, Taiwan</p>
            <p className={ commonStyles["white-text"] }>Translated from original Traditional Chinese version: <a target="_blank" href="https://www.twreporter.org/a/animal-protection"><b>零安樂死政策 流浪動物的新天堂樂園？</b></a></p>
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
                    About Us
                </a>
              </div>
              <div>
                <a href={ "https://www.twreporter.org/a/contact-footer" }>
                    Contact Us
                </a>
              </div>
              <div>
                <a href={ "https://www.twreporter.org/a/privacy-footer" }>
                    Privacy Policy
                </a>
              </div>
              <div className={ styles["support"] }>
                <a href="https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718" target="_blank">
                    Support Us
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

    )
  }
}
