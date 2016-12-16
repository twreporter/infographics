import React, { Component, PropTypes } from "react"
// import enhanceCollection from "phenomic/lib/enhance-collectio
import { Link } from "react-router"
import Swipeable from "react-swipeable"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import classnames from "classnames"
import commonStyles from "../../styles/common.scss"
import styles from "./Home.scss"

import Page from "../Page"
// import PagesList from "../../components/PagesList"

import WindowSizeMixin from '../WindowSizeMixin'

import bottomLogo from "../../../content/assets/logo-navbar.svg"
import RightNavButton from "../../components/Navigation/RightNavButton"
import Header from "../../components/Header"

import { PHOTOS, VIDEOS, AUDIOS } from "../Slide/multimedia.js"
// const numberOfLatestPosts = 6

class Homepage extends WindowSizeMixin(Component) {
  constructor(props) {
    super(props)
    this.state = {
      scrollPercent: 0,
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.goNextSlide = this.goNextSlide.bind(this)
  }

  componentDidMount() {
    if (super.componentDidMount) super.componentDidMount()
    window.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress)
  }

  getNextLink() {
    return `/posts/1/`
  }

  goNextSlide() {
    this.context.router.replace(this.getNextLink())
  }

  getPhotoByIndex(slideIndex) {
    const { isMobile, isPortrait } = this.context
    let retPhoto = null
    if(PHOTOS[slideIndex] && PHOTOS[slideIndex].photo && PHOTOS[slideIndex].photoMobile) {
      const mobilePath = require(`../../../content/assets/${PHOTOS[slideIndex].photoMobile}`)
      const desktopPath = require(`../../../content/assets/${PHOTOS[slideIndex].photo}`)
      retPhoto = (isMobile && isPortrait) ? mobilePath : desktopPath
    }
    return retPhoto
  }

  getVideoByIndex(slideIndex) {
    const { isMobile, isPortrait } = this.context
    let retVideo = null
    if(VIDEOS[slideIndex] && VIDEOS[slideIndex].video && VIDEOS[slideIndex].videoMobile) {
      const mobilePath = require(`../../../content/assets/${VIDEOS[slideIndex].videoMobile}`)
      const desktopPath = require(`../../../content/assets/${VIDEOS[slideIndex].video}`)
      retVideo = (isMobile && isPortrait) ? mobilePath : desktopPath
    }
    return retVideo
  }

  getAudioByIndex(slideIndex) {
    if(AUDIOS[slideIndex] && AUDIOS[slideIndex].audio) {
      return require(`../../../content/assets/${AUDIOS[slideIndex].audio}`)
    }
    return null
  }

  handleKeyPress(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
      case 39:
        this.context.router.replace(this.getNextLink())
        break
    }
  }

  render() {
    // const latestPosts = enhanceCollection(this.context.collection, {
    //   filter: { layout: "Post" },
    //   sort: "date",
    //   reverse: true,
    // })
    // .slice(0, numberOfLatestPosts)

    const { isMobile, isTablet, isPortrait } = this.context
    const { head } = this.props

    const bgPhoto = (isMobile && isPortrait) ? require("../../../content/assets/"+head.photoMobile) : require("../../../content/assets/"+head.photo)

    return (
      <Page { ...this.props } className={
        styles.container }
      >
        {/* Article - begin */}
        <div itemScope itemType="http://schema.org/ScholarlyArticle" className={styles["container"]}>
          <Swipeable
            onSwipedLeft={()=>{this.goNextSlide()}}
          >
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionAppear={true}
              transitionAppearTimeout={300}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={1800}>
              {/* Preload Image and Video */}
              <div className={ commonStyles["hide"] }>
                <img src={this.getPhotoByIndex(0)} className={ styles["image"] }/>
                <img src={this.getPhotoByIndex(1)} className={ styles["image"] }/>
                <video width="10" muted>
                  <source src={this.getVideoByIndex(0)} type="video/webm"/>
                </video>
                <video width="10" muted>
                  <source src={this.getVideoByIndex(1)} type="video/webm"/>
                </video>
                <audio width="10" muted>
                  <source src={this.getAudioByIndex(0)} type="audio/ogg"/>
                </audio>
                <audio width="10" muted>
                  <source src={this.getAudioByIndex(1)} type="audio/ogg"/>
                </audio>
              </div>
              {/* End - Preload Image and Video */}

              <img src={bgPhoto} className={ styles["image"] }/>
              <div className={styles["bottom-box"]}>
                <div className={styles["center-box"]}>
                  <ReactCSSTransitionGroup
                    transitionName="element"
                    transitionAppear={true}
                    transitionAppearTimeout={600}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={0}>
                    <h1 itemProp="headline">{ head.title }</h1>
                  </ReactCSSTransitionGroup>
                  <ReactCSSTransitionGroup
                    transitionName="scaleX"
                    transitionAppear={true}
                    transitionAppearTimeout={800}
                    transitionEnterTimeout={800}
                    transitionLeaveTimeout={0}
                  >
                    <hr/>
                  </ReactCSSTransitionGroup>
                  <ReactCSSTransitionGroup
                    transitionName="subelement"
                    transitionAppear={true}
                    transitionAppearTimeout={1600}
                    transitionEnterTimeout={1600}
                    transitionLeaveTimeout={0}
                  >
                    <h2 itemProp="alternativeHeadline">{ head.subtitle }</h2>
                  </ReactCSSTransitionGroup>
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

              <Link to={this.getNextLink()}>
                <div className={ styles["right-button"] } >
                  <div>
                    點擊下一頁<br/>或左右滑動
                  </div>
                  <RightNavButton isMobile={isMobile} isTablet={isTablet}/>
                </div>
              </Link>
              {/* <h2>{ "Latest Posts" } | {head.testPath}</h2>
              <PagesList pages={ latestPosts } /> */}
            </ReactCSSTransitionGroup>
          </Swipeable>
        </div>

        {/* Article - end */}

        <Header {...this.props}/>
      </Page>
    )
  }
}

Homepage.contextTypes = {
  metadata: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  collection: PropTypes.array.isRequired,
  isMobile: React.PropTypes.bool,
  isTablet: React.PropTypes.bool,
  isPortrait: React.PropTypes.bool,
}

Homepage.propTypes = {
  head: PropTypes.object,
}

export default Homepage
