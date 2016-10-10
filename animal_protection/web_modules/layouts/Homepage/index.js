/* eslint-disable react/jsx-no-bind, react/jsx-no-literals */

import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import Page from "../Page"
import PagesList from "../../PagesList"

import Markdown from "react-markdown"
import Img from "react-image-holder"
import { firstContent } from "./content"
import OpeningSec1 from "./Opening/OpeningSec1"
import OpeningStardust from "./Opening/OpeningStardust"
import Tnr from "./TNR/TNR"

import commonStyles from "../../styles/common.scss"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

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
    velocity(this.block, { scale: 2 }, 500)
      .then(() => console.log("animation complete"))
  }

  render() {
    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: "Post" },
      sort: "date",
      reverse: true,
    })
    .slice(0, numberOfLatestPosts)

    return (
      <Page { ...this.props } className={ commonStyles["center-block"] }>
        <div className={ commonStyles.content }>
          <h2>{ "Latest Posts" }</h2>
          <div ref={ (ref) => this.block = ref }>
            VelocityExample
          </div>
          <Img src="" width="800" height="500" usePlaceholder />
          <Img src="" width="800" height="500" usePlaceholder />
          <Img src="" width="800" height="500" usePlaceholder />
        </div>

        <OpeningSec1 />
        <OpeningStardust />
        <div className={ commonStyles.content }>
          <Markdown source={ firstContent } />
          <PagesList pages={ latestPosts } />
        </div>
        <Tnr />

      </Page>
    )
  }
}
