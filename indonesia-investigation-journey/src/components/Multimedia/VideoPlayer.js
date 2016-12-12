/* eslint-disable react/no-find-dom-node */
import React, { Component, PropTypes } from "react"
import classnames from "classnames"

import styles from "./VideoPlayer.scss"

let makeVideoPlayableInline
if (typeof window !== "undefined") {
  makeVideoPlayableInline = require('iphone-inline-video')
}

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleVideoPlayback = this.handleVideoPlayback.bind(this)
    this.onPlay = this.onPlay.bind(this)
  }

  componentDidMount() {
    this.handleVideoPlayback()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.source !== this.props.source) {
      this.video.load()
      this.handleVideoPlayback()
    }

  }

  componentWillUnmount() {
    this.video = null
  }

  handleVideoPlayback() {
    const video = this.video
    if(video) {
      makeVideoPlayableInline(video, /* hasAudio */ false)
      // setTimeout(function () {
        // const e = new Event("touchstart")
        // video.dispatchEvent(e)
        // video.play()
      // }, 10)

      video.addEventListener("contextmenu", function (e) {
        e.preventDefault()
        e.stopPropagation()
      }, false)
      //
      // video.addEventListener("touchstart", function (event) {
      //   event.preventDefault()
      //   event.stopPropagation()
      //   // event.stopImmediatePropagation()
      //   video.play()
      //
      //   // hide the controls if they're visible
      //   if (video.hasAttribute("controls")) {
      //       video.removeAttribute("controls")
      //   }
      //
      //   console.log("touchstart", video)
      //
      // })
    }
  }

  onPlay() {
    const { handlePlay } = this.props
    if(handlePlay) {
      handlePlay()
    }
  }

  render() {
    const { source } = this.props

    return (
      <div>
        <video className={ classnames(styles["video"]) } autoPlay muted playsInline loop
          onPlay={ this.onPlay }
          ref={ (ref) => this.video = ref }
        >
          <source src={source} type="video/mp4" />
        </video>
      </div>
    )
  }

}

VideoPlayer.propTypes = {
  source: PropTypes.string,
  handlePlay: PropTypes.func,
}

export default VideoPlayer
