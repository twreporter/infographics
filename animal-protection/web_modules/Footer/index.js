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
            <p className={ commonStyles["white-text"] }><span style={ { opacity: 0.6 } }>English Translation:</span> <a target="_blank" href="https://www.twreporter.org/a/eng-animal-protection/"><b>No-Kill Policy - The New Paradise for Homeless Animals?</b></a></p>
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
                <a href="https://twreporter.backme.tw/checkout/175/3788" target="_blank">
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
