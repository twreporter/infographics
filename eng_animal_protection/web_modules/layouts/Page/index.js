import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import invariant from "invariant"
import { joinUri } from "phenomic"

class Page extends Component {
  render() {
    const { props, context } = this

    const {
      pkg,
    } = context.metadata

    const {
      __filename,
      __url,
      head,
      footer,
    } = props

    invariant(
      typeof head.title === "string",
      `Your page '${ __filename }' needs a title`
    )

    const metaTitle = head.metaTitle ? head.metaTitle : head.title

    const meta = [
      { property: "og:type", content: "article" },
      { property: "og:title", content: metaTitle },
      {
        property: "og:url",
        content: joinUri(process.env.PHENOMIC_USER_URL, __url),
      },
      { property: "og:description", content: head.description },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: metaTitle },
      { name: "twitter:creator", content: `@${ pkg.twitter }` },
      { name: "twitter:description", content: head.description },
      { name: "description", content: head.description },
    ]

    return (
      <div>
        <Helmet
          title={ metaTitle }
          meta={ meta }
        />
        { props.children }
        { footer }
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  __filename: PropTypes.string.isRequired,
  __url: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  footer: PropTypes.element,
}

Page.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Page
