/* eslint-disable react/no-find-dom-node */
import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import classnames from "classnames"

import WindowSizeMixin from '../WindowSizeMixin'
import Page from "../Page"
import styles from "./Slide.scss"
import commonStyles from "../../styles/common.scss"
import LeftNavButton from "../../components/Navigation/LeftNavButton"
import RightNavButton from "../../components/Navigation/RightNavButton"
import CirclePlayButton from "../../components/Navigation/CirclePlayButton"
import Header from "../../components/Header"
import VideoPlayer from "../../components/Multimedia/VideoPlayer"

import { PHOTOS, VIDEOS } from "./multimedia.js"

class Slide extends WindowSizeMixin(Component) {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      scrollPercent: 0,
    }
    this.getPhotoByIndex = this.getPhotoByIndex.bind(this)
    this.getVideoByIndex = this.getVideoByIndex.bind(this)
  }

  componentDidMount() {
    if (super.componentDidMount) super.componentDidMount()
  }

  getPhotoByIndex(slideIndex) {
    const { isMobile, isPortrait } = this.state
    let retPhoto = null
    if(PHOTOS[slideIndex] && PHOTOS[slideIndex].photo && PHOTOS[slideIndex].photoMobile) {
      const mobilePath = require(`../../../content/assets/${PHOTOS[slideIndex].photoMobile}`)
      const desktopPath = require(`../../../content/assets/${PHOTOS[slideIndex].photo}`)
      retPhoto = (isMobile && isPortrait) ? mobilePath : desktopPath
    }
    return retPhoto
  }

  getVideoByIndex(slideIndex) {
    const { isMobile, isPortrait } = this.state
    let retVideo = null
    if(VIDEOS[slideIndex] && VIDEOS[slideIndex].video && VIDEOS[slideIndex].videoMobile) {
      const mobilePath = require(`../../../content/assets/${VIDEOS[slideIndex].videoMobile}`)
      const desktopPath = require(`../../../content/assets/${VIDEOS[slideIndex].video}`)
      retVideo = (isMobile && isPortrait) ? mobilePath : desktopPath
    }
    return retVideo
  }

  render() {
    const { isMobile, isTablet } = this.state
    const { head, body } = this.props
    const { slideIndex } = head
    const totalSlides = this.context.metadata.totalSlides

    const preIndex = (slideIndex-1 < 0) ? -1 : slideIndex-1
    const nextIndex = (slideIndex+1 >= totalSlides) ? -1 : slideIndex+1

    const previousLink = (slideIndex <= 0) ? '/' : `/posts/${slideIndex}/`
    const nextLink = (slideIndex+2 > totalSlides) ? null : `/posts/${slideIndex + 2}/`

    const isVideo = (VIDEOS[slideIndex] && VIDEOS[slideIndex].videoMobile)

    const bgPhoto = this.getPhotoByIndex(slideIndex)
    const videoSource = this.getVideoByIndex(slideIndex)

    const prePhoto = (preIndex>=0) ? this.getPhotoByIndex(preIndex) : null
    const preVideo = (preIndex>=0) ? this.getVideoByIndex(preIndex) : null

    const nextPhoto = (nextIndex>=0) ? this.getPhotoByIndex(nextIndex) : null
    const nextVideo = (nextIndex>=0) ? this.getVideoByIndex(nextIndex) : null

    const Video = isVideo ?
      <VideoPlayer source={videoSource} />
      : null

    const pageDate = head.date ? new Date(head.date) : null
    return (
      <Page
        { ...this.props }
        header={
          <header>
            {
            pageDate &&
            <time key={ pageDate.toISOString() }>
              { pageDate.toDateString() }
            </time>
          }
          </header>
        }
      >
        <div className={ styles["container"] }>

          {/* Preload Image and Video */}
          <div className={ commonStyles["hide"] }>
            <img src={prePhoto} className={ styles["image"] }/>
            <img src={nextPhoto} className={ styles["image"] }/>
            <video width="10" mute>
              <source src={preVideo} type="video/webm"/>
            </video>
            <video width="10" mute>
              <source src={nextVideo} type="video/webm"/>
            </video>
          </div>
          {/* End - Preload Image and Video */}

          <img src={bgPhoto} className={ styles["image"] }/>

          { Video }
          <div className={styles["bg-overlay"]}></div>
          <div className={styles["bottom-box"]}>
            <div className={ classnames(commonStyles["content-outer"], styles["description"]) }>
              <div
                dangerouslySetInnerHTML={ { __html: body } }
              />
            </div>
          </div>
          <Link to={previousLink}>
            <div className={ styles["left-button"] } >
              <LeftNavButton isMobile={isMobile} isTablet={isTablet}/>
            </div>
          </Link>
          {
            (slideIndex+2 > totalSlides) ? null :
            <Link to={nextLink}>
              <div className={ styles["right-button"] } >
                <RightNavButton isMobile={isMobile} isTablet={isTablet}/>
              </div>
            </Link>
          }
        </div>

        {
          isVideo ? <div className={styles["audio-button"]}>
            <CirclePlayButton isMute={false} percentage={60}/>
          </div> : null
        }


        <Header {...this.props}/>
      </Page>
    )
  }

}

Slide.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

Slide.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Slide
