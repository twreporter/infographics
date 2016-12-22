/* eslint-disable no-undef, no-empty, max-len */
import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"

// Import global CSS before other components and their styles
import "./index.global.css"
import styles from "./index.css"

// import Header from "../Header"
import Footer from "../Footer"

import ogImage from "../../content/assets/og-image.png"

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
    }
    this.setPageLoaded = this.setPageLoaded.bind(this)
  }

  componentDidMount() {
    try {
      // deal with Microsoft Edge
      const msEdgeMatch = /Edge\/([0-9]+)/i.exec(navigator.userAgent)
      if (msEdgeMatch) document.documentMode = parseInt(msEdgeMatch[1])

      Typekit.load({ async: true })
    }
    catch (e) {}

    this.setPageLoaded()
  }

  setPageLoaded() {
    // page loaded
    this.setState({ isLoaded: true })
  }

  render() {
    const {
      pkg,
    } = this.context.metadata

    const { isLoaded } = this.state
    const spinnerClass = isLoaded ? styles["spinner-hide"] : styles["spinner-wrapper"]

    return (
      <div className={ styles.layout }>
        <Helmet
          meta={ [
            {
              name: "generator", content: `${
              process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`,
            },
            { name: "description", content: pkg.aDescription },
            { property: "og:site_name", content: pkg.name },
            { property: "og:type", content: "article" },
            { property: "og:description", content: pkg.aDescription },
            { property: "og:image", content: pkg.absPath+ogImage },
            { name: "twitter:site", content: `@${ pkg.twitter }` },
            { name: "twitter:image", content: pkg.absPath+ogImage },
          ] }
          link={ [
            { "rel": "shortcut icon",
            "href": "https://www.twreporter.org/asset/favicon.png" },
            { "rel": "canonical", "href": pkg.homepage },
          ] }
          script={ [
            { src: "https://cdn.polyfill.io/v2/polyfill.min.js" },
          ] }
        />

        { /* meta viewport safari/chrome/edge */ }
        <Helmet
          meta={ [ {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui",
          },
            // {
            //   name: "theme-color",
            //   content: "#E30B20",
            // }
          ] }
        />
        <style>{ "@-ms-viewport { width: device-width; }" }</style>

        {/* <Header /> */}
        <div className={ styles.content }>
          { this.props.children }
        </div>

        <div className={ spinnerClass }><div className={ styles["spinner"] }></div></div>

        <Footer />
        <script src="https://use.typekit.net/rbn4jua.js"></script>
      </div>
    )
  }
}
