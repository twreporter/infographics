/* eslint-disable no-undef, no-empty, max-len */
import React, { Component, PropTypes } from "react"

import "./index.global.css"
import "./highlight.global.css"

import Container from "./components/Container"
import DefaultHeadMeta from "./components/DefaultHeadMeta"
import Content from "./components/Content"
// import Footer from "./components/Footer"

class AppContainer extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    try {
      Typekit.load({ async: true })
    }
    catch (e) {}
  }

  render() {
    return(
      <Container>
        <DefaultHeadMeta />
        <Content>
          { this.props.children }
        </Content>
        {/* <Footer /> */}
        <script src="https://use.typekit.net/rbn4jua.js"></script>
      </Container>
    )
  }

}

AppContainer.propTypes = {
  children: PropTypes.node,
}

export default AppContainer
