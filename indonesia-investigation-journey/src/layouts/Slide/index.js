/* eslint-disable react/no-find-dom-node */
import React, { Component, PropTypes } from "react"
import ReactHowler from "react-howler"
import SVGInline from "react-svg-inline"
import { Link } from "react-router"
import classnames from "classnames"
import Swipeable from "react-swipeable"
import raf from "raf" // requestAnimationFrame polyfill

import WindowSizeMixin from "../WindowSizeMixin"
import Page from "../Page"
import styles from "./Slide.scss"
import commonStyles from "../../styles/common.scss"
import LeftNavButton from "../../components/Navigation/LeftNavButton"
import RightNavButton from "../../components/Navigation/RightNavButton"
import CirclePlayButton from "../../components/Navigation/CirclePlayButton"
import Header from "../../components/Header"
import VideoPlayer from "../../components/Multimedia/VideoPlayer"

import copyrightImg from "../../../content/assets/cc-copyrights.svg"
import topicIcon from "../../../content/assets/back-to-topics.svg"
import tabIcon from "../../../content/assets/open-tab.svg"
import githubIcon from "../../../content/assets/icon-github.svg"
import largeLogo from "../../../content/assets/logo-navbar.svg"
import donateIcon from "../../../content/assets/icon-donation.svg"

import relatedImg1 from "../../../content/assets/article1.jpg"
import relatedImg2 from "../../../content/assets/article2.jpg"

import { PHOTOS, VIDEOS, AUDIOS } from "./multimedia.js"

class Slide extends WindowSizeMixin(Component) {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      scrollPercent: 0,
      isMute: false,
      isPlaying: true,
      percentage: 0,
    }
    this.getPhotoByIndex = this.getPhotoByIndex.bind(this)
    this.getVideoByIndex = this.getVideoByIndex.bind(this)
    this.startAudioProgressSeek = this.startAudioProgressSeek.bind(this)
    this.renderSeekPercent = this._renderSeekPercent.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.goPreSlide = this.goPreSlide.bind(this)
    this.goNextSlide = this.goNextSlide.bind(this)
  }

  componentDidMount() {
    if (super.componentDidMount) super.componentDidMount()
    this.startAudioProgressSeek()
    window.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    this.clearRAF()
    window.removeEventListener("keydown", this.handleKeyPress)
  }

  startAudioProgressSeek() {
    const { slideIndex } = this.props.head
    const isAudio = (AUDIOS[slideIndex] && AUDIOS[slideIndex].audio)
    this.clearRAF()
    if(isAudio) {
      this.setState({isPlaying: true})
      this.renderSeekPercent(isAudio)
    } else {
      this.setState({isPlaying: false})
    }
  }

  componentDidUpdate(prevProps) {
    const { slideIndex } = this.props.head
    if(prevProps.head.slideIndex !== slideIndex) {
      this.startAudioProgressSeek()
      // console.log(this.imageBox.clientHeight, this.imageBox.getBoundingClientRect())
    }
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

  getAudioByIndex(slideIndex) {
    if(AUDIOS[slideIndex] && AUDIOS[slideIndex].audio) {
      return require(`../../../content/assets/${AUDIOS[slideIndex].audio}`)
    }
    return null
  }

  getPreLink(slideIndex) {
    return (slideIndex <= 0) ? '/' : `/posts/${slideIndex}/`
  }

  getNextLink(slideIndex) {
    const {totalSlides} = this.context.metadata
    return (slideIndex+2 > totalSlides) ? null : `/posts/${slideIndex + 2}/`
  }

  goPreSlide(slideIndex) {
    this.context.router.replace(this.getPreLink(slideIndex))
  }

  goNextSlide(slideIndex) {
    this.context.router.replace(this.getNextLink(slideIndex))
  }

  handleKeyPress(evt) {
    const { slideIndex } = this.props.head
    const {totalSlides} = this.context.metadata
    evt = evt || window.event;
    switch (evt.keyCode) {
      case 37:
        this.goPreSlide(slideIndex)
        break
      case 39:
        if(slideIndex+2 <= totalSlides) {
          this.goNextSlide(slideIndex)
        }
        break
    }
  }

  clearRAF() {
    raf.cancel(this._raf)
  }

  _renderSeekPercent(isAudio) {
    if (isAudio) {
      if(this.audio){
        this.setState({
          percentage: Math.floor(this.audio.seek() * 100 / this.audio.duration()),
        })
      }
      this._raf = raf(this.renderSeekPercent)
    }
  }

  render() {
    const { isMobile, isTablet, isMute, percentage } = this.state
    const { head, body } = this.props
    const { slideIndex } = head
    const { totalSlides, siteUrl } = this.context.metadata

    const preIndex = (slideIndex-1 < 0) ? -1 : slideIndex-1
    const nextIndex = (slideIndex+1 >= totalSlides) ? -1 : slideIndex+1

    const isLastPage = (slideIndex+2 > totalSlides)

    const previousLink = this.getPreLink(slideIndex)
    const nextLink = this.getNextLink(slideIndex)

    const isVideo = (VIDEOS[slideIndex] && VIDEOS[slideIndex].videoMobile)
    const isAudio = (AUDIOS[slideIndex] && AUDIOS[slideIndex].audio)

    const bgPhoto = this.getPhotoByIndex(slideIndex)
    const videoSource = this.getVideoByIndex(slideIndex)
    const audioSource = this.getAudioByIndex(slideIndex)

    const prePhoto = (preIndex>=0) ? this.getPhotoByIndex(preIndex) : null
    const preVideo = (preIndex>=0) ? this.getVideoByIndex(preIndex) : null
    const preAudio = (preIndex>=0) ? this.getAudioByIndex(preIndex) : null

    const nextPhoto = (nextIndex>=0) ? this.getPhotoByIndex(nextIndex) : null
    const nextVideo = (nextIndex>=0) ? this.getVideoByIndex(nextIndex) : null
    const nextAudio = (nextIndex>=0) ? this.getAudioByIndex(nextIndex) : null

    const Video = isVideo ?
      <VideoPlayer source={videoSource} />
      : null

    const pageDate = head.date ? new Date(head.date) : null

    const lastPageBg = isLastPage ? styles["blur"] : null
    const desClass = isLastPage ? styles["description-hide"] : null

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
         onKeyPress={this.handleKeyPress}
      >
        <Swipeable
          onSwipedRight={()=>{this.goPreSlide(slideIndex)}}
          onSwipedLeft={()=>{this.goNextSlide(slideIndex)}}
        >
          <div className={ styles["container"] }>

            {/* Preload Image and Video */}
            <div className={ commonStyles["hide"] }>
              <img src={prePhoto} className={ styles["image"] }/>
              <img src={nextPhoto} className={ styles["image"] }/>
              <video width="10" muted>
                <source src={preVideo} type="video/webm"/>
              </video>
              <audio width="10" muted>
                <source src={preAudio} type="audio/ogg"/>
              </audio>
              <video width="10" muted>
                <source src={nextVideo} type="video/webm"/>
              </video>
              <audio width="10" muted>
                <source src={nextAudio} type="audio/ogg"/>
              </audio>
            </div>
            {/* End - Preload Image and Video */}

            <div className={ classnames(lastPageBg, styles["bg-media"]) }>
              <img src={bgPhoto}
                className={ styles["image"] }
                 ref={(ref) => this.imageBox = ref}
              />
              { Video }
            </div>

            <div className={styles["bg-overlay"]}></div>
            <div className={styles["bottom-box"]}>
              <div className={ classnames(commonStyles["content-outer"],
                styles["description"], desClass) }
              >
                <div
                  dangerouslySetInnerHTML={ { __html: body } }
                />
              </div>
            </div>
            <div ref={(ref) => this.preBtn = ref}>
              <Link to={previousLink}>
                <div className={ styles["left-button"] } >
                  <LeftNavButton isMobile={isMobile} isTablet={isTablet}/>
                </div>
              </Link>
            </div>
            <div ref={(ref) => this.nextBtn = ref}>
              {
                (slideIndex+2 > totalSlides) ? null :
                <Link to={nextLink}>
                  <div className={ styles["right-button"] } >
                    <RightNavButton isMobile={isMobile} isTablet={isTablet}/>
                  </div>
                </Link>
              }
            </div>
          </div>

          {
            isVideo ?
            <div className={styles["audio-button"]}
              onClick={()=>{
                this.setState({isMute: !isMute})}
              }
            >
              <CirclePlayButton isMute={isMute}
                percentage={ percentage }
              />
            </div> : null
          }

          {
            isAudio ?
            <ReactHowler
              src={ audioSource }
              loop={ true }
              mute={ isMute }
              ref={(ref) => this.audio = ref}
            /> : null
          }

          {
            isLastPage ?
              <LastSlide siteUrl={siteUrl}/> : null
          }

        </Swipeable>

        <Header {...this.props}/>
      </Page>
    )
  }

}


const LastSlide = (props) => {
  return (
    <div>
      <div className={styles["ending-wrapper"]}>
        <a target="_blank" href="https://www.twreporter.org/">
          <div className={styles["topic-banner"]}>
            <div className={styles["tab-icon"]}>
              <SVGInline svg={ tabIcon } />
            </div>
            <SVGInline className={styles["topic-icon"]} svg={ topicIcon } />
            <div className={styles["topic-text"]}>
              <h3>造假·剝削·血淚漁場</h3>
              <h5>直擊台灣遠洋漁業真相</h5>
            </div>
          </div>
        </a>

        <div className={styles["links-box"]}>
          <div className={styles["grid-left"]}>
            <a target="_blank" href="https://www.twreporter.org/">
              <div className={ styles["related-item"] }>
                <div className={ styles["related-left"] }>
                  <img className={ styles["crop"] } src={relatedImg1} />
                </div>
                <div className={ styles["related-right"] }>
                  <p className={ styles["related-title"] }>【印尼現場 I 】我們和印尼聯手剝削萬名漁工</p>
                </div>
              </div>
            </a>
            <a target="_blank" href="https://www.twreporter.org/">
              <div className={ styles["related-item"] }>
                <div className={ styles["related-left"] }>
                  <img className={ styles["crop"] } src={relatedImg2} />
                </div>
                <div className={ styles["related-right"] }>
                  <p className={ styles["related-title"] }>【印尼現場 II 】未解的謎團——一位漁工之死</p>
                </div>
              </div>
            </a>
          </div>

          <div className={styles["grid-right"]}>
            <div>
              <p className={styles["github-link"]}><a target="_blank" href="https://github.com/twreporter/infographics"><SVGInline svg={ githubIcon } /> &nbsp; github.com/twreporter</a></p>
              <p><a target="_blank" href="https://www.twreporter.org/"><SVGInline svg={ largeLogo } /></a></p>
              <a target="_blank" className={ styles["donate-btn"] } href="https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718"><SVGInline svg={ donateIcon } /> &nbsp; 贊助我們</a>
              <div className={ commonStyles["white-text"] }
                dangerouslySetInnerHTML={ { __html:
                  `<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.twreporter.org%2Fa%2F${props.siteUrl}&width=300&layout=standard&action=like&size=large&show_faces=true&share=true&height=80&appId=962589903815787&colorscheme=dark" width="300" height="80" style="border:none;overflow:hidden" scrolling="no" frameBorder="0" allowTransparency="true"></iframe>` } }
              />
            </div>
          </div>
        </div>

      </div>
      <div className={styles["copyright"]}>
        <SVGInline svg={ copyrightImg } />
        <span className={styles["copyright-outer-text"]}>
          <span className={styles["copyright-text"]}>除另有註明，網站內容皆</span>採用創用 CC 姓名標示-非商業性-禁止改作授權條款
        </span>
      </div>
    </div>
  )
}

LastSlide.propTypes = {
  siteUrl: PropTypes.string.isRequired,
}

Slide.contextTypes = {
  metadata: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
}

Slide.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Slide
