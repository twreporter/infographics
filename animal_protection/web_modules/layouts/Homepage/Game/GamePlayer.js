/* eslint-disable react/jsx-no-bind, no-empty, no-unused-vars, brace-style, prefer-const, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */
import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"

import classnames from "classnames"
import styles from "./GamePlayer.scss"
import commonStyles from "../../../styles/common.scss"

import dogAnimated from "../../../../content/assets/dog_animated.gif"
import dogNeutered from "../../../../content/assets/dog_neutered.gif"
import dogCaptured from "../../../../content/assets/dog_captured.gif"
import dogDeath from "../../../../content/assets/dog_death.gif"
import gameIcon from "../../../../content/assets/game_cnt_icon.svg"

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

const INITIAL_ANIMALS = 20
const NEWLY_ABANDONED = 2
const MULTIPLE = 50           //  number of existing animals = total number on screen * MULTIPLE
const MAX_CAPACITY = 100
const MALE_DEATH_RATE = 0.45
const FEMALE_DEATH_RATE = 0.15
const NEWBORN_COEFFICIENT = 3.074

// status code for dogs
const M_NOTCAPTURED = -3
const F_NOTCAPTURED = -2
const M_DEATH = -1
const F_DEATH = 0
const M_CAPTURED = 1
const F_CAPTURED = 2

const A_YEAR = 5000           // use how many ms to represent a year
const TOTAL_YEARS = 2

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
        { props.currentYear }.{ props.currentMonth }
      </span>
    </div>
  )
}

const Dog = (props) => {
  let dogImg = dogAnimated
  if (props.status === M_CAPTURED || props.status === F_CAPTURED) {
    console.log("M_CAPTURED")
    dogImg = dogCaptured
  } else if (props.status === M_DEATH || props.status === F_DEATH) {
    dogImg = dogDeath
  }
  return (
    <img src={ dogImg } />
  )
}

const NeuteredDog = (props) => {
  let dogImg = props.isAlive ? dogNeutered : dogDeath
  return (
    <img src={ dogImg } />
  )
}

export default class GamePlayer extends Component {
  constructor(props) {
    super(props)
    let currentTime = new Date()
    this.state = {
      isIntoHidden: true,
      isOpened: false,
      isClosing: false,
      gWidth: 300,    // width of the game container
      gHeight: 300,   // height of the game container
      dogWidth: 60,   // width of a single dog
      dogHeight: 60,  // height of a single dog
      currentYear: currentTime.getFullYear(),
      currentMonth: currentTime.getMonth() + 1,
      posList: [],    // list to store possible positions to place dogs
      freePos: [],
      totalDogs: 0,
      neuteredM: [],    // list of the neutured male dogs     => {position: , isAlive: }
      neuteredF: [],    // list of the neutured female dogs   => {position: , isAlive: }
      unneuteredM: [],  // list of the unneutured male dogs     => [3, 5 ,6, ...]
      unneuteredF: [],  // list of the unneutured female dogs   => [7, 8, ...]
      // calculator: deal with the real numbers of animals (totalDogs * MULTIPLE)
      calculator: {
        totalAlive: 0,
        notNeuteredM: 0,
        notNeuteredF: 0,
        deathM: 0,
        deathF: 0,
        isNeuteredM: 0,
        isNeuteredF: 0,
        abandonedM: 0,
        abandonedF: 0,
        newBornM: 0,
        newBornF: 0,
      },
    }
    this.handleClose = this.handleClose.bind(this)
    this._handleDialogOpened = this._handleDialogOpened.bind(this)
    this.handleDogClick = this.handleDogClick.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.handleGameStart = this.handleGameStart.bind(this)
    this._generateDogPositions = this._generateDogPositions.bind(this)
    this._placeDog = this._placeDog.bind(this)
    this._removeDog = this._removeDog.bind(this)
    this._removeNeuteredDog = this._removeNeuteredDog.bind(this)
    this._simulateAfterAYear = this._simulateAfterAYear.bind(this)
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
    // deal with the controls when users started the game
    // detect window size
    this.debouncedResize()

    // start playing the game
    let { calculator } = this.state
    const initialCnt = 10
    for (let i=0; i<initialCnt; i++) {
      this._placeDog(M_NOTCAPTURED)
    }
    for (let i=0; i<initialCnt; i++) {
      this._placeDog(F_NOTCAPTURED)
    }

    calculator.notNeuteredM = initialCnt * MULTIPLE
    calculator.notNeuteredM = initialCnt * MULTIPLE
    calculator.totalAlive = 2 * initialCnt * MULTIPLE

    this.setState({ calculator: calculator })
    setTimeout(this._simulateAfterAYear , A_YEAR)
  }

  _simulateAfterAYear() {
    console.log("_simulateAfterAYear")
    const { currentYear, unneuteredM, unneuteredF, neuteredM, neuteredF } = this.state

    // 1. deal with deaths of unneutered dogs
    const mUDeaths =  Math.floor(MALE_DEATH_RATE * unneuteredM.length)
    const fUDeaths =  Math.floor(FEMALE_DEATH_RATE * unneuteredF.length)
    console.log("1. mUDeaths, fUDeaths", mUDeaths, fUDeaths)
    for (let i=0; i<mUDeaths; i++) {
      this._removeDog(unneuteredM[Math.floor(Math.random()*unneuteredM.length)], true)
    }
    for (let i=0; i<fUDeaths; i++) {
      this._removeDog(unneuteredF[Math.floor(Math.random()*unneuteredF.length)], true)
    }

    // 2. deal with deaths of neutered dogs
    const mDeaths =  Math.floor(MALE_DEATH_RATE * neuteredM.length)
    const fDeaths =  Math.floor(FEMALE_DEATH_RATE * neuteredF.length)
    console.log("2. mDeaths, fDeaths", mDeaths, fDeaths)
    // *** TODO: Avoid generating the same ID
    for (let i=0; i<mDeaths; i++) {
      this._removeNeuteredDog("M", Math.floor(Math.random()*neuteredM.length))
    }
    for (let i=0; i<fDeaths; i++) {
      this._removeNeuteredDog("F", Math.floor(Math.random()*neuteredF.length))
    }

    // 3. calculate and place the new borns

    // 4. add newly abandoned

    this.setState({ currentYear: currentYear+1 })
  }

  _removeNeuteredDog(gender, index) {
    const { neuteredM, neuteredF, totalDogs } = this.state
    let position = -1
    if (gender==="M") {
      console.log("_removeNeuteredDog - M", index, neuteredM[index])
      neuteredM[index].isAlive = false
      position = neuteredM[index].position
      this.setState({ neuteredM: neuteredM, totalDogs: totalDogs-1 })
    } else {
      console.log("_removeNeuteredDog - F")
      neuteredF[index].isAlive = false
      position = neuteredF[index].position
      this.setState({ neuteredF: neuteredF, totalDogs: totalDogs-1 })
    }

    setTimeout(() => {
      const { neuteredM, neuteredF } = this.state
      if (gender==="M") {
        neuteredM.splice(_.findIndex(neuteredM, { position: position, isAlive: false }), 1)
        this.setState({ neuteredM: neuteredM })
      } else {
        neuteredF.splice(_.findIndex(neuteredF, { position: position, isAlive: false }), 1)
        this.setState({ neuteredF: neuteredF })
      }
    }, 300)
  }

  _placeDog(gender) {
    // place a dog in a random position, and return the randomly selected position
    let { posList, freePos, totalDogs, unneuteredM, unneuteredF } = this.state
    let selIndex = 0
    if (freePos.length > 0) {
      const splicePos = Math.floor(Math.random()*freePos.length)
      selIndex = freePos[splicePos]
      freePos.splice(splicePos, 1)
    }
    else {
      // add to an existing position if there is no space
      selIndex = Math.floor(Math.random()*posList.length)
    }

    if (gender === M_NOTCAPTURED) {
      unneuteredM.push(selIndex)
    } else {
      unneuteredF.push(selIndex)
    }

    posList[selIndex].dogs.push(gender)
    totalDogs++
    console.log(totalDogs, freePos, freePos.length)
    this.setState({ totalDogs: totalDogs, posList: posList, freePos: freePos,
      unneuteredM: unneuteredM, unneuteredF: unneuteredF })
    return selIndex
  }

  _removeDog(posIdx, isDeath) {
    // remove a dog in the selected position
    let { posList, freePos, totalDogs, unneuteredM, unneuteredF } = this.state
    // set as disapearing
    if (posList[posIdx].dogs[0] === M_NOTCAPTURED) {
      posList[posIdx].dogs[0] = isDeath ? M_DEATH : M_CAPTURED
      unneuteredM.splice(_.findIndex(unneuteredM, posIdx), 1)
    } else {
      posList[posIdx].dogs[0] = isDeath ? F_DEATH : F_CAPTURED
      unneuteredF.splice(_.findIndex(unneuteredF, posIdx), 1)
    }
    if (isDeath) {
      totalDogs--
    } else {
      posList[posIdx].neutureCnt++
    }
    this.setState({ posList: posList,
    unneuteredM: unneuteredM, unneuteredF: unneuteredF  })

    console.log("unneutered: ", unneuteredM, unneuteredF)

    // after the disappearing animation terminates
    setTimeout(() => {
      let { posList, freePos, totalDogs, neuteredM, neuteredF } = this.state
      // move the dog into neutered list
      if (posList[posIdx].dogs[0] === M_CAPTURED) {
        neuteredM.push({ position: posIdx, isAlive: true })
      } else if (posList[posIdx].dogs[0] === F_CAPTURED) {
        neuteredF.push({ position: posIdx, isAlive: true })
      }

      // remove the dog from the unneutered list
      posList[posIdx].dogs.shift()

      if (posList[posIdx].dogs.length === 0 && posList[posIdx].neutureCnt <= 0) {
        freePos.push(posIdx)
      }
      this.setState({ totalDogs: totalDogs, posList: posList, freePos: freePos,
        neuteredM: neuteredM, neuteredF: neuteredF })
    }, 300)

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
        _posList.push({ top: i*yStep + dogHeight/2, left: j*xStep + dogWidth/2, dogs: [], neutureCnt: 0 })
        freePos.push(totalPos)
        totalPos++
      }
    }
    for (let i=0; i<iMax+1; i++) {
      for (let j=0; j<jMax+1; j++) {
        _posList.push({ top: i*yStep, left: j*xStep, dogs: [], neutureCnt: 0 })
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
    let { posList, freePos, totalDogs } = this.state
    console.log("***dogIClicked", dogId)
    event.stopPropagation()
    const dogs = posList[dogId].dogs
    let shouldRemove = false
    if (dogs) {
      for (let i=0; i<dogs.length; i++) {
        if (dogs[i]===M_NOTCAPTURED || dogs[i]===F_NOTCAPTURED) {
          shouldRemove = true
          break
        }
      }
    }
    if (shouldRemove) {
      this._removeDog(dogId, false)
    }
  }

  getDogs() {
    // render dogs on the canvas
    const { posList } = this.state
    let dogsList = []
    for (let i=0; i<posList.length; i++) {
      const dogs = posList[i].dogs
      if (dogs) {
        for (let j=0; j<dogs.length; j++) {
          dogsList.push(
            <div key={ `${i}-${j}` } className={ styles["dog"] }
              style={ { top: posList[i].top, left: posList[i].left } }
              onClick={ this.handleDogClick.bind(event, i) }>
              <Dog status={ dogs[j] } />
            </div>)
        }
      }
    }
    return dogsList
  }

  getNeuteredDogs() {
    // render dogs on the background
    const { neuteredM, neuteredF, posList } = this.state
    let nDogsList = []
    const neutered = neuteredM.concat(neuteredF)
    for (let i=0; i<neutered.length; i++) {
      const dog = neutered[i]
      const dogPos = dog.position
      nDogsList.push(
        <div key={ `n${dogPos}` } className={ styles["dog-neutered"] }
          style={ { top: posList[dogPos].top, left: posList[dogPos].left } }
        >
          <NeuteredDog isAlive={ dog.isAlive } />
        </div>)
    }
    return nDogsList
  }

  render() {
    const { isIntoHidden, isOpened, isClosing, totalDogs, currentYear, currentMonth } = this.state
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
              { this.getNeuteredDogs() }
              { this.getDogs() }
              <div className={ classnames(styles["dog"], styles["hide-visible"]) } ref={ (ref) => this.exampleDog = ref }>
                <Dog status={ M_NOTCAPTURED } />
              </div>
            </div>
            <GameFooter num={ totalDogs } currentYear={ currentYear } currentMonth={ currentMonth } />
          </div>
        </div>
      </div>
    )
  }
}

GamePlayer.propTypes = {}
