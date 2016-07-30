import React from 'react'
import DocumentTitle from 'react-document-title'

import { prefixLink } from 'gatsby-helpers'
import { TypographyStyle } from 'typography-react'
import typography from './utils/typography'

const BUILD_TIME = new Date().getTime()

module.exports = React.createClass({
  propTypes () {
    return {
      title: React.PropTypes.string,
    }
  },
  render () {
    const title = DocumentTitle.rewind()

    let css
    if (process.env.NODE_ENV === 'production') {
      css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />
    }

    return (
      <html lang="zh-TW">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0 maximum-scale=1.0"
          />
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1, initial-scale=1" />
        <meta property="og:title" content="你所不知道的里約奧運大解密／報導者"/>
        <meta property="og:description" content="你所不知道的里約奧運大解密 獎落誰家決勝秘笈獨家公開"/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content="https://www.twreporter.org/i/olympic-2016/index.html" />
        <meta property="og:image" content="https://www.twreporter.org/i/olympic-2016/img/cover.jpg"/>
        <meta property="og:site_name" content="報導者"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.twreporter.org/i/dolympic-2016/img/cover.jpg" />
        <meta name="twitter:title" content="你所不知道的里約奧運大解密／報導者" />
        <meta name="twitter:description" content="你所不知道的里約奧運大解密 獎落誰家決勝秘笈獨家公開。" />
          <title>{title}</title>
          <link rel="shortcut icon" href={this.props.favicon} />
          <TypographyStyle typography={typography} />
          {css}
        </head>
        <body>
          <div id="react-mount" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
        </body>
      </html>
    )
  },
})
