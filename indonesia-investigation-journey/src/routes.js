import React, { Component, PropTypes } from "react"
import { Route } from "react-router"
import { PageContainer as PhenomicPageContainer } from "phenomic"

import AppContainer from "./AppContainer"
import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import Homepage from "./layouts/Homepage"
import Post from "./layouts/Post"
import Slide from "./layouts/Slide"

class PageContainer extends Component {
  getChildContext() {
    return {isIOS9: this.state.isIOS9}
  }

  constructor(props) {
    super(props)
    this.state = {
      isIOS9: false,
    }
  }

  componentDidMount() {
    const iosVersion = this.getIOSVersion()
    if(iosVersion && iosVersion<10) {
      this.setState({isIOS9: true})
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location.pathname && this.props.location.pathname !== nextProps.location.pathname) {
      const {isIOS9} = this.state
      if(isIOS9) {
        location.reload()
        // console.log('*** ', nextProps.__url, this.props.__url)
      }
    }
  }

  getIOSVersion() {
    if(window.MSStream){
      // There is some iOS in Windows Phone...
      // https://msdn.microsoft.com/en-us/library/hh869301(v=vs.85).aspx
      return false
    }
    var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
        version;

    if (match !== undefined && match !== null) {
      version = [
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3] || 0, 10)
      ];
      return parseFloat(version.join('.'))
    }

    return false;
  }

  render() {
    return (
      <PhenomicPageContainer
        { ...this.props }
        layouts={{
          Page,
          PageError,
          Homepage,
          Post,
          Slide,
        }}
      />
    )
  }
}

PageContainer.propTypes = {
  location: PropTypes.object,
}

PageContainer.childContextTypes = {
  isIOS9: React.PropTypes.bool
}

export default (
  <Route component={ AppContainer }>
    <Route path="*" component={ PageContainer } />
  </Route>
)
