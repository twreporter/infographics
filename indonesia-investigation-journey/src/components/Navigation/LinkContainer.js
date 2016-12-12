import React, { Component } from "react"
import { Link } from "react-router"

export default class LinkContainer extends Component {
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
      return parseFloat(version.join('.'));
    }

    return false
  }

  render() {
    const { children, to } = this.props
    const { isIOS9 } = this.state

    if(isIOS9) {
      return (
        <a href={to} target="_blank">
          { children }
        </a>
      )
    } else {
      return (
        <Link to={to}>
          { children }
        </Link>
      )
    }
  }

}

LinkContainer.propTypes = {
  children: React.PropTypes.node,
  to: React.PropTypes.string,
}
