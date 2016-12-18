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
    if(video && this.context.isIOS9) {
      makeVideoPlayableInline(video, /* hasAudio */ false)
      setTimeout(function () {
        const e = new Event('touchend')
        document.dispatchEvent(e)
      }, 10)

      video.addEventListener("contextmenu", function (e) {
        e.preventDefault()
        e.stopPropagation()
      }, false)
    }
    video.play()
  }

  onPlay() {
    const { handlePlay } = this.props
    if(handlePlay) {
      handlePlay()
    }
  }

  render() {
    const { source, poster } = this.props

    return (
      <div className={ classnames(styles["video"]) }
        ref={ (ref) => this.vContainer = ref }
      >
        <video autoPlay muted playsInline loop
          onPlay={ this.onPlay }
          ref={ (ref) => this.video = ref }
           poster={ poster }
          is webkit-playsinline
        >
          <source src={source} type="video/mp4" />
        </video>
      </div>
    )
  }

}

VideoPlayer.propTypes = {
  source: PropTypes.string,
  poster: PropTypes.string,
  handlePlay: PropTypes.func,
}

VideoPlayer.contextTypes = {
  isIOS9: React.PropTypes.bool
}

export default VideoPlayer
