/* eslint-disable react/jsx-no-bind, no-empty, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React, { Component } from "react"
import classnames from "classnames"
import ReactHowler from "react-howler"
import styles from "./AudioPlayer.scss"
import commonStyles from "../../../../styles/common.scss"

import playIcon from "../../../../../content/assets/sound.svg"
import muteIcon from "../../../../../content/assets/sound-mute.svg"

import soundUrl from "../../../../../content/assets/dog-sound.mp3"

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
    }
    this.handleAudioClick = this.handleAudioClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying !== this.props.isPlaying) {
      this.setState({ isPlaying: nextProps.isPlaying })
    }
  }

  handleAudioClick() {
    const { isPlaying } = this.state
    if (isPlaying) {
      this.audio.stop()
    }
    this.setState({ isPlaying: !isPlaying })
  }

  render() {
    const { isPlaying } = this.state
    const audioButton =  isPlaying ?
      <div className={ classnames(commonStyles["img-responsive"]) }
        dangerouslySetInnerHTML={ { __html: playIcon } } /> :
        <div className={ classnames(commonStyles["img-responsive"]) }
          dangerouslySetInnerHTML={ { __html: muteIcon } } />

    return (
      <div>
        <div className={ styles["audio-icon"] } onClick={ this.handleAudioClick }>
          { audioButton }
        </div>
        <ReactHowler
          src={ soundUrl }
          playing={ isPlaying }
          ref={ (ref) => this.audio = ref }
        />
      </div>
    )
  }
}
