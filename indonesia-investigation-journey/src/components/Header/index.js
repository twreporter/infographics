import React, { Component, PropTypes } from "react"

import classnames from "classnames"
import commonStyles from "../../styles/common.scss"
import styles from "./Header.scss"

import reporterIcon from "../../../content/assets/twreporter-icon.svg"
import fbIcon from "../../../content/assets/icon-share-facebook.svg"
import twitterIcon from "../../../content/assets/icon-share-twitter.svg"

const SITE_URL = "indonesia-investigation-journey"

class Header extends Component {
  render() {
    const { head } = this.props
    const totalSlides = this.context.metadata.totalSlides || 20
    let curIndex = (head && head.slideIndex>0) ? head.slideIndex : 0
    curIndex = (curIndex>totalSlides) ? totalSlides : curIndex
    const percentage = parseInt((curIndex+1)*100/totalSlides)

    return (
      <header>
        <nav>
          <div className={ styles["progress-outer"] }>
            <div className={ styles["progress-bar"] }
              style={ { width: `${percentage+5}%` } }>
            </div>
          </div>

          <div className={ classnames(styles.header) }>
            <div className={ styles["index-box"] }>
            </div>

            <div className={ styles["share-box"] }>
              <a href="https://twreporter.org/" target="_blank">
                <div title="報導者TheReporter" className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
                  dangerouslySetInnerHTML={ { __html: reporterIcon } }
                />
              </a>
              <div className={ styles["spacer"] }></div>
              <a className={ classnames(styles["nav-icon"]) } target="_blank"
                href={ `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.twreporter.org%2Fa%2F${SITE_URL}` }
              >
                <div className={ classnames(commonStyles["img-responsive"]) }
                  dangerouslySetInnerHTML={ { __html: fbIcon } }
                />
              </a>
              <a className={ classnames(styles["nav-icon"]) } target="_blank" href={ `https://twitter.com/home?status=https%3A%2F%2Fwww.twreporter.org%2Fa%2F${SITE_URL}` }>
                <div className={ classnames(commonStyles["img-responsive"]) }
                  dangerouslySetInnerHTML={ { __html: twitterIcon } }
                />
              </a>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

Header.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

Header.propTypes = {
  head: PropTypes.object,
}

export default Header
