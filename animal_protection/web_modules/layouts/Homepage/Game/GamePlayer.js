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

// class Dog extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       isCaptured: !props.isCapturing && props.isCaptured,
//     }
//     this.handleCaptured = this.handleCaptured.bind(this)
//   }
//   componentDidMount() {
//     if (this.props.isCapturing) {
//       setTimeout(this.handleCaptured, 100)
//     }
//   }
//   handleCaptured() {
//     this.setState({ isCaptured: true })
//   }
//   render() {
//     console.log(this.props.isCapturing)
//     let dogImg = (this.state.isCaptured) ? null: dogAnimated
//     if (this.props.isCapturing) {
//       dogImg = dogCaptured
//     }
//     return (
//       <img src={ dogImg } />
//     )
//   }
//
// }

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
      gWidth: 300,    // width of the game container
      gHeight: 300,   // height of the game container
      dogWidth: 60,   // width of a single dog
      dogHeight: 60,  // height of a single dog
      posList: [],    // list to store possible positions to place dogs
      freePos: [],
      disappearingDog: -1,
      disappearDogs: [],
      totalDog: 0,
    }
    this.handleClose = this.handleClose.bind(this)
    this._handleDialogOpened = this._handleDialogOpened.bind(this)
    this.handleDogClick = this.handleDogClick.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.handleGameStart = this.handleGameStart.bind(this)
    this._generateDogPositions = this._generateDogPositions.bind(this)
    this._placeDog = this._placeDog.bind(this)
    this._removeDog = this._removeDog.bind(this)
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
    setTimeout(this.handleGameStart, 2200)
  }

  handleGameStart() {
    // detect window size
    this.debouncedResize()

    // start playing the game
    for (let i=0; i<20; i++) {
      this._placeDog()
    }

  }

  _placeDog() {
    // place a dog in a random position
    let { posList, freePos, totalDog } = this.state
    let selIndex = 0
    if (freePos.length > 0) {
      const splicePos = Math.floor(Math.random()*freePos.length)
      selIndex = freePos[splicePos]
      freePos.splice(selIndex, 1)
    }
    else {
      // add to an existing position if there is no space
      selIndex = Math.floor(Math.random()*posList.length)
    }
    posList[selIndex].dogs.push(false)
    totalDog++
    console.log(totalDog, posList, freePos)
    this.setState({ totalDog: totalDog, posList: posList, freePos: freePos })
  }

  _removeDog(posIdx) {
    // remove a dog in the selected position
    let { posList, freePos, totalDog, disappearDogs } = this.state
    posList[posIdx].dogs[0] = true  // set as dissapearing
    disappearDogs.push(posIdx)
    // setTimeout(() => {
    //   this.setState({ disappearDogs: _.remove(disappearDogs, posIdx) })
    // }, 2000)
    setTimeout(() => {
      posList[posIdx].dogs.shift()
      if (posList[posIdx].dogs.length === 0) {
        freePos.push(posIdx)
      }
      totalDog--
      this.setState({ totalDog: totalDog, posList: posList, freePos: freePos, disappearingDog: posIdx })
    }, 300)

    this.setState({ disappearDogs: disappearDogs, posList: posList })
  }

  _generateDogPositions() {
    // generate desirable positions to place dogs
    const { gWidth, gHeight, dogWidth, dogHeight } = this.state
    let { posList } = this.state
    let iMax = 5
    let jMax = 10
    if (gWidth < gHeight) {
      iMax = 10
      jMax = 5
    }
    const xStep = (gWidth) / jMax
    const yStep = (gHeight) / iMax
    console.log("yStep = (gHeight - dogHeight) / jMax", yStep, gHeight, dogHeight, jMax)
    let _posList = []
    let freePos = []
    let totalPos = 0
    for (let i=0; i<iMax; i++) {
      for (let j=0; j<jMax; j++) {
        _posList.push({ top: i*yStep + dogHeight/2, left: j*xStep + dogWidth/2, dogs: [] })
        freePos.push(totalPos)
        totalPos++
      }
    }
    for (let i=0; i<iMax+1; i++) {
      for (let j=0; j<jMax+1; j++) {
        _posList.push({ top: i*yStep, left: j*xStep, dogs: [] })
        freePos.push(totalPos)
        totalPos++
      }
    }

    if (posList.length===0) {
      // position list doesn't exist
      this.setState({ posList: _posList, freePos: freePos })
    } else {
      // update positions
      for (let i=0; i<posList.length; i++) {
        posList[i].top = _posList[i].top
        posList[i].left = _posList[i].left
      }
      this.setState({ posList: posList })
    }

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
    event.stopPropagation()
    this._removeDog(dogId)
  }

  // getDogs() {
  //   const { gWidth, gHeight, dogWidth, dogHeight } = this.state
  //   let iMax = 5
  //   let jMax = 10
  //   if (gWidth < gHeight) {
  //     iMax = 10
  //     jMax = 5
  //   }
  //   const xStep = (gWidth) / jMax
  //   const yStep = (gHeight) / iMax
  //   let dogId = 0
  //   console.log("yStep = (gHeight - dogHeight) / jMax", yStep, gHeight, dogHeight, jMax)
  //   let dogsList = []
  //   let posList = []
  //   for (let i=0; i<iMax; i++) {
  //     for (let j=0; j<jMax; j++) {
  //       dogsList.push(
  //       <div key={ dogId } className={ styles["dog"] }
  //         style={ { top: i*yStep + dogHeight/2, left: j*xStep + dogWidth/2 } }
  //         onClick={ this.handleDogClick.bind(event, dogId) }>
  //         <Dog />
  //       </div>)
  //       dogId++
  //       posList.push({ top: i*yStep + dogHeight/2, left: j*xStep + dogWidth/2 })
  //     }
  //   }
  //   for (let i=0; i<iMax+1; i++) {
  //     for (let j=0; j<jMax+1; j++) {
        // dogsList.push(
        // <div key={ dogId } className={ styles["dog"] }
        //   style={ { top: i*yStep, left: j*xStep } }
        //   onClick={ this.handleDogClick.bind(event, dogId) }>
        //   <Dog />
        // </div>)
  //       dogId++
  //       posList.push({ top: i*yStep, left: j*xStep })
  //     }
  //   }
  //   return dogsList
  // }

  getDogs() {
    const { posList, disappearingDog, disappearDogs } = this.state
    let dogsList = []
    for (let i=0; i<posList.length; i++) {
      const dogs = posList[i].dogs
      if (dogs) {
        for (let j=0; j<dogs.length; j++) {
          dogsList.push(
            <div key={ `${i}-${j}` } className={ styles["dog"] }
              style={ { top: posList[i].top, left: posList[i].left } }
              onClick={ this.handleDogClick.bind(event, i) }>
              <Dog isCaptured={ dogs[j] } />
            </div>)
        }
      }
    }
    // for (let i=0; i<disappearDogs.length; i++) {
    //   const dIdx = disappearDogs[i]
    //   dogsList.push(
    //     <div key={ dIdx } className={ styles["dog"] }
    //       style={ { top: posList[dIdx].top, left: posList[dIdx].left } }>
    //       <Dog isCaptured isCapturing={ dIdx===disappearingDog } />
    //     </div>)
    // }
    console.log("disappearingDog", disappearingDog)
    return dogsList
  }

  render() {
    const { isIntoHidden, isOpened, isClosing } = this.state
    const introClass = isIntoHidden ? styles["hide"] : null
    const closingClass = isClosing ? styles["hide-fast"] : null

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
