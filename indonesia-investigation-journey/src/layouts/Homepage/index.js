import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import classnames from "classnames"
import commonStyles from "../../styles/common.scss"
import styles from "./Home.scss"

import Page from "../Page"
import PagesList from "../../components/PagesList"

import reporterIcon from "../../../content/assets/twreporter-icon.svg"
import donationIcon from "../../../content/assets/icon-donation.svg"
import fbIcon from "../../../content/assets/icon-share-facebook.svg"
import twitterIcon from "../../../content/assets/icon-share-twitter.svg"

import { supportUs } from "./content"

const SITE_URL = "indonesia-investigation-journey"
const numberOfLatestPosts = 6

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      scrollPercent: 0,
    }
  }

  render() {
    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: "Post" },
      sort: "date",
      reverse: true,
    })
    .slice(0, numberOfLatestPosts)

    const { scrollPercent } = this.state
    const { head } = this.props

    const progressBar = <div className={ styles["progress-outer"] }><div className={ styles["progress-bar"] } style={ { width: `${scrollPercent+5}%` } }></div></div>

    console.log(this.props.head)

    return (
      <Page { ...this.props } className={
        styles.container }
      >
        {/* Article - begin */}
        <div itemScope itemType="http://schema.org/ScholarlyArticle">
          <img src={require("../../../content/assets/"+head.photo)} className={ styles["image"] }/>
          <h1>{ head.title }</h1>
          {/* <h2>{ "Latest Posts" } | {head.testPath}</h2>
          <PagesList pages={ latestPosts } /> */}
        </div>

        {/* Article - end */}

        <div className={ classnames(styles.header) }>
          <div className={ styles["index-box"] }>
          </div>

          <div className={ styles["share-box"] }>
            <a href="https://www.twreporter.org/" target="_blank">
              <div title="報導者TheReporter" className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
                dangerouslySetInnerHTML={ { __html: reporterIcon } }
              />
            </a>
            <div className={ styles["spacer"] }></div>
            <a title={ supportUs } style={ { marginLeft: "-0.5rem" } }
              href="https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718" target="_blank"
            >
              <div className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
                dangerouslySetInnerHTML={ { __html: donationIcon } }
              />
              <span className={ classnames(styles["support-text"]) } style={ { opacity: 0.8 } }>{ supportUs }</span>
            </a>
            <div className={ styles["spacer"] }></div>
            <a className={ classnames(styles["nav-icon"]) } target="_blank"
              href={ `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.twreporter.org%2Fa%2F${SITE_URL}` }
            >
              <div className={ classnames(commonStyles["img-responsive"]) }
                dangerouslySetInnerHTML={ { __html: fbIcon } }
              />
            </a>
            <a className={ classnames(styles["nav-icon"]) } target="_blank" href={ `https://twitter.com/home?status=https%3A%2F%2Fwww.twreporter.org%2Fa%2F${SITE_URL}` }>
              <div className={ classnames(commonStyles["img-responsive"]) }
                dangerouslySetInnerHTML={ { __html: twitterIcon } }
              />
            </a>
          </div>
        </div>

        { progressBar }

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
