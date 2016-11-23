import React, { Component, PropTypes } from "react"

import WindowSizeMixin from '../WindowSizeMixin'
import Page from "../Page"

class Slide extends WindowSizeMixin(Component) {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      scrollPercent: 0,
    }
  }

  render() {
    const { head } = this.props

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
      />
    )
  }

}

Slide.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Slide
