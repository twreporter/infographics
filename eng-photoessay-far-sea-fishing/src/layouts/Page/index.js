import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import invariant from "invariant"
import { joinUri } from "phenomic"

// import Loading from "../../components/Loading"

import ogImage from "../../../content/assets/cover-mobile.jpg"

import styles from "./index.css"

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
    }
  }

  componentDidMount() {
    this.setPageLoaded()
  }

  setPageLoaded() {
    // page loaded
    this.setState({ isLoaded: true })
  }

  render() {
    const { props, context } = this
    const {
      __filename,
      __url,
      head,
      header,
      footer,
      children,
    } = props


    const {
      pkg,
    } = context.metadata

    invariant(
      typeof head.title === "string",
      `Your page '${ __filename }' needs a title`
    )

    // const metaTitle = head.metaTitle ? head.metaTitle : head.title
    const metaTitle = pkg.siteTitle

    const meta = [
      { property: "og:type", content: "article" },
      { property: "og:title", content: metaTitle },
      {
        property: "og:url",
        content: joinUri(process.env.PHENOMIC_USER_URL, __url),
      },
      { name: "description", content: pkg.aDescription },
      { property: "og:site_name", content: pkg.name },
      { property: "og:type", content: "article" },
      { property: "og:description", content: pkg.aDescription },
      { property: "og:image", content: pkg.absPath+ogImage },
      { name: "twitter:title", content: metaTitle },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:creator", content: `@${ pkg.twitter }` },
      { name: "twitter:site", content: `@${ pkg.twitter }` },
      { name: "twitter:image", content: pkg.absPath+ogImage },
    ]

    const { isLoaded } = this.state
    const spinnerClass = isLoaded ? styles["spinner-hide"] : styles["spinner-wrapper"]

    return (
      <div className={ styles.page }>
        <Helmet
          title={ metaTitle }
          meta={ meta }
        />
        {
          /*
          head.title &&
          <h1 className={ styles.heading }>{ head.title }</h1>
          */
        }
        { header }
        {/* {
          isLoading
          ? <Loading />
          : <BodyContainer>{ body }</BodyContainer>
        } */}
        { /* isLoading ? <Loading /> : children */ }
        { children }
        { footer }
        <div className={ spinnerClass }><div className={ styles["spinner"] }></div></div>
      </div>
    )
  }


}

Page.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
}

Page.contextTypes = {
  metadata: PropTypes.object.isRequired,
  isMobile: React.PropTypes.bool,
  isTablet: React.PropTypes.bool,
  isPortrait: React.PropTypes.bool,
}

export default Page
