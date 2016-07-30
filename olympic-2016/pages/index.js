import React from 'react'
import { Container } from 'react-responsive-grid'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Headroom from 'react-headroom'

import { rhythm } from 'utils/typography'
import '../css/footer.css'

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },
  render () {
    return (
      <div>
        <Container
          style={{
            maxWidth: 1024,
          }}
        >
          {this.props.children}
        </Container>
        <Container
            style={{
              maxWidth: 1024,
            }}
          >
        </Container>
      </div>
    )
  },
})
