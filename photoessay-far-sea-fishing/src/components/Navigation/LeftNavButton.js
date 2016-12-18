import React, { PropTypes } from "react"
import SVGInline from "react-svg-inline"
import classnames from "classnames"

import styles from "./NavButtons.scss"
import arrowLeft from "../../../content/assets/arrow-left-05-desktop.svg"
import arrowLeftTablet from "../../../content/assets/arrow-left-0-tablet.svg"
import arrowLeftMobile from "../../../content/assets/arrow-left-0-mobile.svg"

const LeftNavButton = (props) => {
  let arrowImg = arrowLeft
  arrowImg = (props.isMobile && !props.isTablet) ? arrowLeftMobile : arrowImg
  arrowImg = (props.isTablet && !props.isMobile) ? arrowLeftTablet : arrowImg
  return (
    <div className={classnames(styles["button"])}>
      <SVGInline className={styles["icon"]} svg={ arrowImg } />
    </div>
  )
}

LeftNavButton.propTypes = {
  isTablet: PropTypes.bool,
  isMobile: PropTypes.bool,
}

export default LeftNavButton
