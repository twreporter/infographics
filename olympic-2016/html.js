import React from 'react'
import DocumentTitle from 'react-document-title'

import { prefixLink } from 'gatsby-helpers'
import { GoogleFont, TypographyStyle } from 'typography-react'
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
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1, initial-scale=1" />
        <meta name="description" content="台灣突破以往奧運參賽人數規模，共有58位運動員競逐18項賽事。除了大家熟知的戴資穎、盧彥勳、雷千瑩、蕭美玉、許淑淨、莊智淵、周天成等各界好手，還有36位首度參加奧運的體育新星，其中女子拳擊、女子角力、馬術都是台灣史上第一人，馬術選手汪亦岫更是首位贏得奧運馬術資格賽的華人。" />
        <meta property="og:title" content="里約奧運看門道 誰是史上大贏家／報導者"/>
        <meta property="og:description" content="你知道奧運舉辦120年來，運動列強有哪些嗎？哪一國超級射手最多？誰搶了俄羅斯的體操王冕？誰又是桌球霸主？還有，台灣真的是跆拳道強國嗎？歷年奧運中，台灣得牌數是否在世界上佔有一席之地，還是只能在後面當小弟？更多問題，就讓《報導者》資料新聞團隊告訴你答案吧！"/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content="https://www.twreporter.org/a/olympic-2016/" />
        <meta property="og:image" content="https://www.twreporter.org/a/olympic-2016/assets/olympic-og.png"/>
        <meta property="og:site_name" content="報導者"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.twreporter.org/a/olympic-2016/assets/olympic-og.png" />
        <meta name="twitter:title" content="里約奧運看門道 誰是史上大贏家／報導者" />
        <meta name="twitter:description" content="里約奧運看門道 誰是史上大贏家。" />
          <title>報導者</title>
          <link rel="shortcut icon" href="https://www.twreporter.org/asset/favicon.png" />
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
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
