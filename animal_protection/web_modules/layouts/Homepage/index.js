/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, no-unused-vars */

import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import Page from "../Page"
import PagesList from "../../PagesList"

import classnames from "classnames"
import Markdown from "react-markdown"
import Img from "react-image-holder"
import { firstContent } from "./content"
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

    return (
      <Page { ...this.props } className={
          commonStyles["center-block"] }
      >
        {/* <div className={ styles["container"] }>
          <div className={ classnames(commonStyles.content) }>
            <h2>{ "Latest Posts" }</h2>
            <div ref={ (ref) => this.block = ref }>
              VelocityExample
            </div>
            <Img src="" width="800" height="500" usePlaceholder />
          </div>
        </div> */}
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
            <Markdown source={ firstContent } />
            <PagesList pages={ latestPosts } />
            地圖資料來源： CartoDB
          </div>
        </div>

      </Page>
    )
  }
}
