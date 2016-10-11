import React from "react"

import styles from "./Subsection.scss"

const Subsection = (props) => {
  return (
    <div className={ styles["container"] }>
      <h2>
        <span className={ styles["left"] }>
          <span>
            { props.curSec + "-" + parseInt(props.subIndex+1)  }
          </span>
        </span>
        <span className={ styles["right"] }>
          { props.titles[props.subIndex] }
        </span>
      </h2>
      { props.children }
      <div className={ styles["ending-dot"] }></div>
    </div>
  )
}

Subsection.propTypes = {
  children: React.PropTypes.node,
  curSec: React.PropTypes.number,
  titles: React.PropTypes.array,
  subIndex: React.PropTypes.number,
}

export default Subsection
