import React, { PropTypes } from "react"
import SVGInline from "react-svg-inline"
import classnames from "classnames"

import styles from "./CirclePlayButton.scss"
import soundOn from "../../../content/assets/sound-on.svg"
import soundMute from "../../../content/assets/sound-mute.svg"

const CirclePlayButton = (props) => {
  const soundImg = props.isMute ? soundMute : soundOn
  const percentage = props.percentage || 0

  const circlePath = (value, total, R) => {
    let center;
    let pos = R + 10
    if(value === total) {
      return "M" + pos + "," + pos + "m" + (-R) + ",0a" + R + "," + R + " 0 1,0 " + (R * 2) + ",0a" + R + "," + R + " 0 1,0 " + (-R * 2) + ",0"
    }

    let alpha = 360 / total * value,
        a = (90 - alpha) * Math.PI / 180,
        x = pos + R * Math.cos(a),
        y = pos - R * Math.sin(a),
        path;
    if (total == value) {
        path = "M"+ pos +","+ (pos - R) +" A"+ R+","+ R+","+ pos+","+ 1+","+ 1+","+ pos+","+ pos - R;
    } else {
        if(alpha > 180) {
            center = 1;
        } else {
            center = 0;
        }
        path = "M"+ pos+","+ (pos - R) +" A"+ R+","+ R+","+ pos+"," + center +","+ 1+","+ x+","+ y;
    }
    return path;
}

  return (
    <div className={classnames(styles["button"])}>
      <SVGInline className={styles["icon"]} svg={ soundImg } />
      <svg className={styles["circle-back"]}>
        <path
          fill="none" stroke="#FFF" strokeWidth="2"
          d={circlePath(1, 1, 14)} />
      </svg>
      <svg className={styles["circle-front"]}>
        <path
          fill="none" stroke="#FFF" strokeWidth="2"
          d={circlePath(percentage, 100, 14)} />
      </svg>
    </div>
  )
}

CirclePlayButton.propTypes = {
  isMute: PropTypes.bool,
  percentage: PropTypes.number,
}

export default CirclePlayButton
