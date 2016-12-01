/* eslint-disable react/no-find-dom-node */
import React, { Component, PropTypes } from "react"

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
  }

  componentDidMount() {
    this.handleVideoPlayback()
  }

  componentDidUpdate() {
    // this.handleVideoPlayback()
  }

  handleVideoPlayback() {
    const video = this.video
    if(video) {
      makeVideoPlayableInline(video, /* hasAudio */ false)
      setTimeout(function () {
        const e = new Event("touchstart")
        video.dispatchEvent(e)
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
    const { source } = this.props

    return (
      <video className={ styles["video"] } autoPlay muted playsInline
        ref={ (ref) => this.video = ref }
      >
        <source src={source} type="video/mp4" />
      </video>
    )
  }

}

VideoPlayer.propTypes = {
  source: PropTypes.object.string,
}

export default VideoPlayer
