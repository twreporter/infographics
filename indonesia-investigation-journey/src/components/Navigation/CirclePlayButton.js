import React, { PropTypes } from "react"
import SVGInline from "react-svg-inline"
import classnames from "classnames"

import styles from "./CirclePlayButton.scss"
import soundOn from "../../../content/assets/sound-on.svg"
import soundMute from "../../../content/assets/sound-mute.svg"

const CirclePlayButton = (props) => {
  const soundImg = props.isMute ? soundMute : soundOn
  return (
    <div className={classnames(styles["button"])}>
      <SVGInline className={styles["icon"]} svg={ soundImg } />
    </div>
  )
}

CirclePlayButton.propTypes = {
  isMute: PropTypes.bool,
}

export default CirclePlayButton
