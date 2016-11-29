import React, { Component, PropTypes } from "react"
// import enhanceCollection from "phenomic/lib/enhance-collectio
import { Link } from "react-router"

import classnames from "classnames"
import commonStyles from "../../styles/common.scss"
import styles from "./Home.scss"

import Page from "../Page"
// import PagesList from "../../components/PagesList"

import WindowSizeMixin from '../WindowSizeMixin'

import bottomLogo from "../../../content/assets/logo-navbar.svg"
import RightNavButton from "../../components/Navigation/RightNavButton"
import Header from "../../components/Header"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
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

    const { isMobile, isTablet, isPortrait } = this.state
    const { head } = this.props

    const bgPhoto = (isMobile && isPortrait) ? require("../../../content/assets/"+head.photoMobile) : require("../../../content/assets/"+head.photo)

    return (
      <Page { ...this.props } className={
        styles.container }
      >
        {/* Article - begin */}
        <div itemScope itemType="http://schema.org/ScholarlyArticle" className={styles["container"]}>
          <img src={bgPhoto} className={ styles["image"] }/>
          <div className={styles["bottom-box"]}>
            <div className={styles["center-box"]}>
              <ReactCSSTransitionGroup
                transitionName="element"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                <h1 itemProp="headline">{ head.title }</h1>
                <hr/>
              </ReactCSSTransitionGroup>
              <h2 itemProp="alternativeHeadline">{ head.subtitle }</h2>
            </div>

            <div className={styles["info-box"]}>
              <p itemProp="datePublished">{ head.date }</p>
              <a href="https://twreporter.org/" target="_blank">
                <div className={ classnames(commonStyles["img-responsive"]) }
                  dangerouslySetInnerHTML={ { __html: bottomLogo } }
                />
              </a>
            </div>
          </div>

          <Link to={`/posts/1/`}>
            <div className={ styles["right-button"] } >
              <div>
                點擊下一頁<br/>或左右滑動
              </div>
              <RightNavButton isMobile={isMobile} isTablet={isTablet}/>
            </div>
          </Link>
          {/* <h2>{ "Latest Posts" } | {head.testPath}</h2>
          <PagesList pages={ latestPosts } /> */}
        </div>

        {/* Article - end */}

        <Header {...this.props}/>
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
