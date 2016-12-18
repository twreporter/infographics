import React, { PropTypes } from "react"
import SVGInline from "react-svg-inline"
import classnames from "classnames"

import styles from "./NavButtons.scss"
import arrowRight from "../../../content/assets/arrow-right-1-desktop.svg"
import arrowRightTablet from "../../../content/assets/arrow-right-1-tablet.svg"
import arrowRightMobile from "../../../content/assets/arrow-right-1-mobile.svg"

const RightNavButton = (props) => {
  let arrowImg = arrowRight
  arrowImg = (props.isMobile && !props.isTablet) ? arrowRightMobile : arrowImg
  arrowImg = (props.isTablet && !props.isMobile) ? arrowRightTablet : arrowImg
  return (
    <div className={classnames(styles["button"])}>
      <SVGInline className={styles["icon"]} svg={ arrowImg } />
    </div>
  )
}

RightNavButton.propTypes = {
  isTablet: PropTypes.bool,
  isMobile: PropTypes.bool,
}

export default RightNavButton
