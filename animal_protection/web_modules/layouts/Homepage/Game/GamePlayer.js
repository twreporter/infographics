/* eslint-disable react/jsx-no-bind, no-empty, no-unused-vars, brace-style, prefer-const, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */
import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"

import classnames from "classnames"
import styles from "./GamePlayer.scss"
import commonStyles from "../../../styles/common.scss"

import dogAnimated from "../../../../content/assets/dog_animated.gif"
import dogCaptured from "../../../../content/assets/dog_captured.gif"
import gameIcon from "../../../../content/assets/game_cnt_icon.svg"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

let GameFooter = (props) => {
  return (
    <div className={ classnames(styles["footer"]) }>
      <span>
        <div className={ classnames(commonStyles["img-responsive"], styles["dog-cnt-icon"]) }
          dangerouslySetInnerHTML={ { __html: gameIcon } }
        />
        <span className={ styles["dog-cnt"] }>{ props.num }</span> 隻流浪犬
      </span>
      <span className={ styles["time-des"] }>
        現在時間是
      </span>
      <span className={ styles["time-now"] }>
        2016.10
      </span>
    </div>
  )
}

const Dog = (props) => {
  let dogImg = (props.isCaptured) ? dogCaptured : dogAnimated
  return (
    <img src={ dogImg } />
  )
}

export default class GamePlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isIntoHidden: true,
      isOpened: false,
      isClosing: false,
      dogIClicked: false,
      gWidth: 300,    // width of the game container
      gHeight: 300,   // height of the game container
      dogWidth: 60,   // width of a single dog
      dogHeight: 60,  // height of a single dog
      posList: [],    // list to store possible positions to place dogs
    }
    this.handleClose = this.handleClose.bind(this)
    this._handleDialogOpened = this._handleDialogOpened.bind(this)
    this.handleDogClick = this.handleDogClick.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.handleGameStart = this.handleGameStart.bind(this)
    this._generateDogPositions = this._generateDogPositions.bind(this)
    this.debouncedResize = _.debounce(() => { this.handleResize() }, 150, { "maxWait": 450 })
  }

  componentDidMount() {
    const { outerWidth, outerHeight, outerTop } = this.props
    velocity(this.container, { width: [ "100%", outerWidth ], height: [ "100%", outerHeight ],
      top: [ 0, outerTop ], translateX: [ "-50%", "-50%" ] }, { duration: 1000, easing: "easeInOutSine" })
      .then(this._handleDialogOpened())
    window.addEventListener("resize", this.debouncedResize)
    this.debouncedResize()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debouncedResize)
  }

  _handleDialogOpened() {
    this.setState({ isOpened: true })
    setTimeout(this.handleGameStart, 3000)
  }

  handleGameStart() {
    // detect window size
    this.debouncedResize()

  }

  _generateDogPositions() {
    const { gWidth, gHeight, dogWidth, dogHeight } = this.state
    let iMax = 5
    let jMax = 10
    if (gWidth < gHeight) {
      iMax = 10
      jMax = 5
    }
    const xStep = (gWidth) / jMax
    const yStep = (gHeight) / iMax
    console.log("yStep = (gHeight - dogHeight) / jMax", yStep, gHeight, dogHeight, jMax)
    let posList = []
    for (let i=0; i<iMax; i++) {
      for (let j=0; j<jMax; j++) {
        posList.push({ top: i*yStep + dogHeight/2, left: j*xStep + dogWidth/2 })
      }
    }
    for (let i=0; i<iMax+1; i++) {
      for (let j=0; j<jMax+1; j++) {
        posList.push({ top: i*yStep, left: j*xStep })
      }
    }
    this.setState({ posList: posList })
  }

  handleResize() {
    const game = ReactDOM.findDOMNode(this.game)
    const dog = ReactDOM.findDOMNode(this.exampleDog)
    this.setState({
      gWidth: game.clientWidth,
      gHeight: game.clientHeight,
      dogWidth: dog.clientWidth,
      dogHeight: dog.clientHeight,
    })

    // re-calculate the positions of dogs
    this._generateDogPositions()
  }

  handleClose() {
    const { outerWidth, outerHeight, outerTop } = this.props
    this.setState({ isClosing: true })
    velocity(this.container, { width: outerWidth, height: outerHeight, top: outerTop }, { duration: 1000, easing: "easeInOutSine" })
      .then(() => this.props.onClose())
  }

  handleDogClick(dogId, event) {
    console.log("***dogIClicked", dogId)
    this.setState({ dogIClicked: true })
  }

  getDogs() {
    const { gWidth, gHeight, dogWidth, dogHeight } = this.state
    let iMax = 5
    let jMax = 10
    if (gWidth < gHeight) {
      iMax = 10
      jMax = 5
    }
    const xStep = (gWidth) / jMax
    const yStep = (gHeight) / iMax
    let dogId = 0
    console.log("yStep = (gHeight - dogHeight) / jMax", yStep, gHeight, dogHeight, jMax)
    let dogsList = []
    let posList = []
    for (let i=0; i<iMax; i++) {
      for (let j=0; j<jMax; j++) {
        dogsList.push(
        <div key={ dogId } className={ styles["dog"] }
          style={ { top: i*yStep + dogHeight/2, left: j*xStep + dogWidth/2 } }
          onClick={ this.handleDogClick.bind(event, dogId) }>
          <Dog />
        </div>)
        dogId++
        posList.push({ top: i*yStep + dogHeight/2, left: j*xStep + dogWidth/2 })
      }
    }
    for (let i=0; i<iMax+1; i++) {
      for (let j=0; j<jMax+1; j++) {
        dogsList.push(
        <div key={ dogId } className={ styles["dog"] }
          style={ { top: i*yStep, left: j*xStep } }
          onClick={ this.handleDogClick.bind(event, dogId) }>
          <Dog />
        </div>)
        dogId++
        posList.push({ top: i*yStep, left: j*xStep })
      }
    }
    return dogsList
  }

  render() {
    const { isIntoHidden, isOpened, isClosing, dogIClicked } = this.state
    const introClass = isIntoHidden ? styles["hide"] : null
    const closingClass = isClosing ? styles["hide-fast"] : null

    const gameContainer = isOpened ?
      <div className={ styles["dog"] } onClick={ this.handleDogClick }>
        <Dog isCaptured={ dogIClicked } />
      </div> : null

    return (
      <div className={ classnames(styles.container) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ classnames(styles["intro"],
          commonStyles["text-center"], commonStyles["content-outer"], closingClass) }
        >
          <span className={ classnames(styles["close-button"]) } onClick={ this.handleClose }></span>
          <div className={ introClass }>
            <h2>點選狗狗圖示執行 TNR！</h2>
            <div className={ styles["inner"] }>
              <div className={ classnames(commonStyles["img-responsive"], commonStyles["overlay-svg"], styles["center-dog"]) }
                dangerouslySetInnerHTML={ { __html: gameIcon } } />
            </div>
          </div>

          <div className={ styles["game-outer"] }>
            <div className={ styles["game-container"] } ref={ (ref) => this.game = ref }>
              { gameContainer }
              { this.getDogs() }
              <div className={ classnames(styles["dog"], styles["hide-visible"]) } ref={ (ref) => this.exampleDog = ref }>
                <Dog isCaptured={ false } />
              </div>
            </div>
            <GameFooter num={ 50 } />
          </div>
        </div>
      </div>
    )
  }
}

GamePlayer.propTypes = {}
