/* eslint-disable no-undef, no-empty, max-len */
import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"

// Import global CSS before other components and their styles
import "./index.global.css"
import styles from "./index.css"

// import Header from "../Header"
import Footer from "../Footer"

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  componentDidMount() {
    try {
      // deal with Microsoft Edge
      const msEdgeMatch = /Edge\/([0-9]+)/i.exec(navigator.userAgent)
      if (msEdgeMatch) document.documentMode = parseInt(msEdgeMatch[1])

      Typekit.load({ async: true })
    }
    catch (e) {}
  }

  render() {
    const {
      pkg,
    } = this.context.metadata

    return (
      <div className={ styles.layout }>
        <Helmet
          meta={ [
            {
              name: "generator", content: `${
              process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`,
            },
            { property: "og:site_name", content: pkg.name },
            { name: "twitter:site", content: `@${ pkg.twitter }` },
          ] }
          link={ [
            { "rel": "shortcut icon",
              "href": "https://www.twreporter.org/asset/favicon.png" },
          ] }
          script={ [
            { src: "https://cdn.polyfill.io/v2/polyfill.min.js" },
          ] }
        />

        { /* meta viewport safari/chrome/edge */ }
        <Helmet
          meta={ [ {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no",
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
        <Footer />
        <script src="https://use.typekit.net/ckp5jxu.js"></script>
      </div>
    )
  }
}
