/* eslint-disable react/no-find-dom-node */
import React, { Component, PropTypes } from "react"
import ReactHowler from "react-howler"
import classnames from "classnames"
import Swipeable from "react-swipeable"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import ReactCSSTransitionReplace from "react-css-transition-replace"
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
import LastSlide from "./LastSlide"
import MapOverlay from "./MapOverlay"
import LinkContainer from "../../components/Navigation/LinkContainer"

import { PHOTOS, VIDEOS, AUDIOS, TEXT } from "./multimedia.js"

class Slide extends WindowSizeMixin(Component) {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      scrollPercent: 0,
      isMute: false,
      isPlaying: false,
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
      // this.setState({isPlaying: true})
      this.renderSeekPercent(isAudio)
    } else {
      // this.setState({isPlaying: false})
    }
  }

  componentWillUpdate(nextProps) {
    const nextSlideIndex = nextProps.head.slideIndex
    const { slideIndex } = this.props.head
    if(this.getAudioByIndex(nextSlideIndex) &&
       this.getAudioByIndex(slideIndex) === this.getAudioByIndex(nextSlideIndex)) {
      // last two slide, continue playing
      return
    } else if(this.props.head.slideIndex !== nextSlideIndex) {
      this.setState({ isPlaying: false })

      if(!this.getVideoByIndex(nextSlideIndex) && this.getAudioByIndex(nextSlideIndex)) {
        this.setState({ isPlaying: true })
      }
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
    const { totalSlides } = this.context.metadata
    return (slideIndex+2 > totalSlides) ? null : `/posts/${slideIndex + 2}/`
  }

  goPreSlide(slideIndex) {
    this.context.router.replace(this.getPreLink(slideIndex))
  }

  goNextSlide(slideIndex) {
    this.context.router.replace(this.getNextLink(slideIndex))
  }

  checkIfLastSlide(slideIndex) {
    const { totalSlides } = this.context.metadata
    return slideIndex+2 > totalSlides
  }

  handleKeyPress(evt) {
    const { slideIndex } = this.props.head
    const { totalSlides } = this.context.metadata
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
    const { isMobile, isTablet, isMute, isPlaying, percentage } = this.state
    // const { head, body } = this.props
    const { head } = this.props
    const { slideIndex } = head
    const { totalSlides, siteUrl } = this.context.metadata

    const preIndex = (slideIndex-1 < 0) ? -1 : slideIndex-1
    const nextIndex = (slideIndex+1 >= totalSlides) ? -1 : slideIndex+1

    const isLastPage = this.checkIfLastSlide(slideIndex)

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

    const isMapOverlay = (slideIndex === 2)

    const Video = isVideo ?
      <VideoPlayer source={videoSource} key={videoSource}
        handlePlay={ () => {
          this.setState({ isPlaying: true })
        } }
      />
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
              <img src={this.getPhotoByIndex(slideIndex+2)} className={ styles["image"] }/>
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
              <video width="10" muted>
                <source src={this.getVideoByIndex(slideIndex+2)} type="video/webm"/>
              </video>
              <audio width="10" muted>
                <source src={this.getAudioByIndex(slideIndex+2)} type="audio/ogg"/>
              </audio>
              <span>TEXT[slideIndex+1]</span>
              <span>TEXT[slideIndex-1]</span>
            </div>
            {/* End - Preload Image and Video */}

            <div className={ classnames(lastPageBg, styles["bg-media"]) }>
              {/* <img src={bgPhoto}
                className={ styles["image"] }
                 ref={(ref) => this.imageBox = ref}
              />*/}
              <ReactCSSTransitionReplace transitionName="cross-fade"
                             transitionEnterTimeout={350} transitionLeaveTimeout={350}>
                <div key={bgPhoto} style={ {backgroundImage: "url(" + bgPhoto + ")"} }
                  className={ classnames(styles["bg-large-image"]) }
                  ref={(ref) => this.imageBox = ref}
                />
              </ReactCSSTransitionReplace>
              <ReactCSSTransitionReplace transitionName="fade-wait"
                             transitionEnterTimeout={350} transitionLeaveTimeout={350}>
                { Video }
              </ReactCSSTransitionReplace>
            </div>

            <div className={styles["bg-overlay-top"]}></div>
            <div className={styles["bg-overlay-bottom"]}></div>

            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionAppear={true}
              transitionAppearTimeout={300}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={800}>
            {
              isMapOverlay ?
                <MapOverlay isMobile={ isMobile }/> : null
            }
            </ReactCSSTransitionGroup>

            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={800}>
              <div className={styles["bottom-box"]}>
                <div className={ classnames(commonStyles["content-outer"],
                  styles["description"], desClass) }
                >
                  {/*<div
                    key={`text-${slideIndex}`}
                    dangerouslySetInnerHTML={ { __html: body } }
                  />*/}
                  <span key={`text-${slideIndex}`} dangerouslySetInnerHTML={ { __html: TEXT[slideIndex] } }></span>
                </div>
              </div>
            </ReactCSSTransitionGroup>
            <div ref={(ref) => this.preBtn = ref}>
              <LinkContainer to={previousLink}>
                <div className={ styles["left-button"] } >
                  <LeftNavButton isMobile={isMobile} isTablet={isTablet}/>
                </div>
              </LinkContainer>
            </div>
            <div ref={(ref) => this.nextBtn = ref}>
              {
                (slideIndex+2 > totalSlides) ? null :
                <LinkContainer to={nextLink}>
                  <div className={ styles["right-button"] } >
                    <RightNavButton isMobile={isMobile} isTablet={isTablet}/>
                  </div>
                </LinkContainer>
              }
            </div>
          </div>

          {
            isAudio ?
            <div className={styles["audio-button"]}
              onClick={()=>{
                this.setState({isMute: !isMute})}
              }
            >
              <CirclePlayButton isMute={isMute}
                percentage={ percentage }
              />
              <ReactHowler
                src={ audioSource }
                loop={ true }
                mute={ isMute }
                playing={ isPlaying }
                ref={(ref) => this.audio = ref}
              />
            </div> : null
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


Slide.contextTypes = {
  metadata: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  isIOS9: React.PropTypes.bool,
}

Slide.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Slide
