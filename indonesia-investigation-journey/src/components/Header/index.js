import React, { Component, PropTypes } from "react"

import styles from "./Header.scss"

class Header extends Component {
  render() {
    const { head } = this
    const curIndex = (head && head.slideIndex) ? head.slideIndex : 0

    return (
      <header>
        <nav>
          <div className={ styles["progress-outer"] }>
            <div className={ styles["progress-bar"] } style={ { width: `${curIndex+5}%` } }></div>
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
