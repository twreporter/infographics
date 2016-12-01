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

import { PHOTOS, VIDEOS } from "./multimedia.js"

let makeVideoPlayableInline
if (typeof window !== "undefined") {
  makeVideoPlayableInline = require('iphone-inline-video')
}

class Slide extends WindowSizeMixin(Component) {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      scrollPercent: 0,
    }
    this.handleVideoPlayback = this.handleVideoPlayback.bind(this)
  }

  componentDidMount() {
    if (super.componentDidMount) super.componentDidMount()
  }

  componentDidUpdate() {
    this.handleVideoPlayback()
  }

  handleVideoPlayback() {
    const video = this.video
    if(video) {
      makeVideoPlayableInline(video, /* hasAudio */ false)
      console.log("video", video)
      setTimeout(function () {
        const e = new Event("touchstart")
        target.dispatchEvent(e)
        video.play()
      }, 10)

      video.addEventListener("touchstart", function (event) {
        // event.preventDefault()
        event.stopPropagation()
        // event.stopImmediatePropagation()
        event.returnValue = false
        console.log("touchstart", video)
        video.play()
      })
    }
  }

  render() {
    const { isMobile, isTablet, isPortrait } = this.state
    const { head, body } = this.props
    const { slideIndex } = head
    const totalSlides = this.context.metadata.totalSlides

    const previousLink = (slideIndex <= 0) ? '/' : `/posts/${slideIndex}/`
    const nextLink = (slideIndex+2 > totalSlides) ? null : `/posts/${slideIndex + 2}/`

    const isVideo = (VIDEOS[slideIndex] && VIDEOS[slideIndex].videoMobile)

    console.log("***render", isVideo, this.props)

    let bgPhoto = null
    if(PHOTOS[slideIndex] && PHOTOS[slideIndex].photo && PHOTOS[slideIndex].photoMobile){
      bgPhoto = (isMobile && isPortrait) ? require("../../../content/assets/"+PHOTOS[slideIndex].photoMobile) :
        require("../../../content/assets/"+PHOTOS[slideIndex].photo)
    }

    const Video = isVideo ?
      <video className={ styles["video"] } autoPlay muted playsInline
        ref={ (ref) => this.video = ref }
      >
        <source src={require("../../../content/assets/"+VIDEOS[slideIndex].videoMobile)} type="video/mp4" />
      </video> : null

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
