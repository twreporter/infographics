import React, { Component, PropTypes } from "react"
// import enhanceCollection from "phenomic/lib/enhance-collection"

import classnames from "classnames"
import commonStyles from "../../styles/common.scss"
import styles from "./Home.scss"

import Page from "../Page"
// import PagesList from "../../components/PagesList"

import WindowSizeMixin from '../WindowSizeMixin'

import bottomLogo from "../../../content/assets/logo-navbar.svg"

// const numberOfLatestPosts = 6

class Homepage extends WindowSizeMixin(Component) {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      scrollPercent: 0,
    }
  }

  componentDidMount() {
    if (super.componentDidMount) super.componentDidMount()
  }

  render() {
    // const latestPosts = enhanceCollection(this.context.collection, {
    //   filter: { layout: "Post" },
    //   sort: "date",
    //   reverse: true,
    // })
    // .slice(0, numberOfLatestPosts)

    const { isMobile, isPortrait } = this.state
    const { head } = this.props

    const bgPhoto = (isMobile && isPortrait) ? require("../../../content/assets/"+head.photoMobile) : require("../../../content/assets/"+head.photo)

    return (
      <Page { ...this.props } className={
        styles.container }
      >
        {/* Article - begin */}
        <div itemScope itemType="http://schema.org/ScholarlyArticle">
          <img src={bgPhoto} className={ styles["image"] }/>
          <div className={styles["bottom-box"]}>
            <div className={styles["center-box"]}>
              <h1 itemProp="headline">{ head.title }</h1>
              <hr/>
              <h2 itemProp="alternativeHeadline">{ head.subtitle }</h2>
            </div>
            <p itemProp="datePublished">{ head.date }</p>
            <a href="https://twreporter.org/" target="_blank">
              <div className={ classnames(commonStyles["img-responsive"]) }
                dangerouslySetInnerHTML={ { __html: bottomLogo } }
              />
            </a>
          </div>
          {/* <h2>{ "Latest Posts" } | {head.testPath}</h2>
          <PagesList pages={ latestPosts } /> */}
        </div>

        {/* Article - end */}

      </Page>
    )
  }
}

Homepage.contextTypes = {
  collection: PropTypes.array.isRequired,
}

Homepage.propTypes = {
  head: PropTypes.object,
}

export default Homepage
