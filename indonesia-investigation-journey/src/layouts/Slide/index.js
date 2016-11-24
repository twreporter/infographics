import React, { Component, PropTypes } from "react"

import classnames from "classnames"
import WindowSizeMixin from '../WindowSizeMixin'
import Page from "../Page"
import styles from "./Slide.scss"
import commonStyles from "../../styles/common.scss"

class Slide extends WindowSizeMixin(Component) {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      scrollPercent: 0,
    }
  }

  componentDidMount() {
    if (super.componentDidMount) super.componentDidMount()
  }

  render() {
    const { isMobile, isPortrait } = this.state
    const { head, body } = this.props

    const bgPhoto = (isMobile && isPortrait) ? require("../../../content/assets/"+head.photoMobile) :
      require("../../../content/assets/"+head.photo)

    const pageDate = head.date ? new Date(head.date) : null
    return (
      <Page
        { ...this.props }
        header={
          <header>
            {
            pageDate &&
            <time key={ pageDate.toISOString() }>
              { pageDate.toDateString() }
            </time>
          }
          </header>
        }
      >
      <img src={bgPhoto} className={ styles["image"] }/>
      <div className={styles["bg-overlay"]}></div>
      <div className={styles["bottom-box"]}>
        <div className={ classnames(commonStyles["content-outer"], styles["description"]) }>
          <div
            dangerouslySetInnerHTML={ { __html: body } }
          />
        </div>
      </div>
      </Page>
    )
  }

}

Slide.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Slide
