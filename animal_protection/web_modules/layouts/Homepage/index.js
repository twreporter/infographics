/* eslint-disable react/jsx-no-bind, max-len, react/jsx-no-literals, no-unused-vars */

import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import Page from "../Page"
import PagesList from "../../PagesList"

import classnames from "classnames"
import Img from "react-image-holder"
import { supportUs } from "./content"
import OpeningTop from "./Opening/OpeningTop"
import OpeningStardust from "./Opening/OpeningStardust"
import OpeningLast from "./Opening/OpeningLast"
import Chapter01 from "./Chapter01/Chapter01"
import Tnr from "./Chapter02_TNR/TNR"
import Chapter03 from "./Chapter03/Chapter03"
import Chapter04 from "./Chapter04/Chapter04"
import Chapter05 from "./Chapter05/Chapter05"

import commonStyles from "../../styles/common.scss"
import styles from "./Home.scss"

import reporterIcon from "../../../content/assets/twreporter-icon.svg"
import donationIcon from "../../../content/assets/icon-donation.svg"
import fbIcon from "../../../content/assets/icon-share-facebook.svg"
import twitterIcon from "../../../content/assets/icon-share-twitter.svg"

// let velocity
// if (typeof window !== "undefined") {
//   velocity = require("velocity-animate")
// }

const numberOfLatestPosts = 6

export default class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      showSubComponent: true,
    }
  }

  componentDidMount() {
    // velocity(this.block, { scale: 2 }, 500)
    //   .then(() => console.log("animation complete"))
  }

  render() {
    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: "Post" },
      sort: "date",
      reverse: true,
    })
    .slice(0, numberOfLatestPosts)

    let chapterArr = []
    for (let i=1; i<=5; i++) {
      chapterArr.push(<a href={ `#chapter0${i}` } className={ styles["sec-index"] }>{ i }</a>)
    }

    return (
      <Page { ...this.props } className={
      styles.container }
      >
        <div itemScope itemType="http://schema.org/ScholarlyArticle">
          <OpeningTop />
          <OpeningStardust />
          <OpeningLast />
          <Chapter01 />
          <Tnr />
          <Chapter03 />
          <Chapter04 />
          <Chapter05 />

          <div className={ commonStyles.content }>
            <PagesList pages={ latestPosts } />
            地圖資料來源： CartoDB
            開頭照片來源：桃園新屋收容所
          </div>

        </div>

        <div className={ styles.header }>
          <div className={ styles["index-box"] }>
            <a href="#" className={ styles["oval"] }></a>
            { chapterArr }
          </div>

          <div className={ styles["share-box"] }>
            <a href="https://www.twreporter.org/" target="_blank">
              <div title="報導者TheReporter" className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
                dangerouslySetInnerHTML={ { __html: reporterIcon } }
              />
            </a>
            <div className={ styles["spacer"] }></div>
            <a title={ supportUs } style={ { marginLeft: "-0.5rem", marginRight: "0.4rem" } }
              href="https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718" target="_blank"
            >
              <div className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
                dangerouslySetInnerHTML={ { __html: donationIcon } }
              />
              <span style={ { opacity: 0.8 } }>{ supportUs }</span>
            </a>
            <div className={ styles["spacer"] }></div>
            <div className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
              dangerouslySetInnerHTML={ { __html: fbIcon } }
            />
            <div className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
              dangerouslySetInnerHTML={ { __html: twitterIcon } }
            />
          </div>

        </div>

        <div className={ styles["progress-bar"] }></div>

      </Page>
    )
  }
}
