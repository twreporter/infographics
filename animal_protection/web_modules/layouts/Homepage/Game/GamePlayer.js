/* eslint-disable react/jsx-no-bind, no-unexpected-multiline, no-empty, no-unused-vars, brace-style, prefer-const, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */
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

const INITIAL_ANIMALS = 10
const NEWLY_ABANDONED = 1
const MULTIPLE = 50           //  number of existing animals = total number on screen * MULTIPLE
const MAX_CAPACITY = 100
const MALE_DEATH_RATE = 0.4
const FEMALE_DEATH_RATE = 0.1
const NEWBORN_COEFFICIENT = 6

// status code for dogs
const M_NOTCAPTURED = -3
const F_NOTCAPTURED = -2
const M_DEATH = -1
const F_DEATH = 0
const M_CAPTURED = 1
const F_CAPTURED = 2

const A_YEAR = 5000           // use how many ms to represent a year
const TOTAL_YEARS = 10

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
      neuteredDisplayM: [],    // list of the neutured male dogs     => {position: , isAlive: }
      neuteredDisplayF: [],    // list of the neutured female dogs   => {position: , isAlive: }
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

    console.log("Initial", this.state.unneuteredM, this.state.unneuteredF)

    this.setState({ calculator: calculator })
    let self = this
    for (let i=0; i<TOTAL_YEARS; i++) {
      (function(y) {
        // setTimeout(()=>{console.log("y * A_YEAR",y, y * A_YEAR)} , y * A_YEAR)
        setTimeout(self._simulateAfterAYear, y * A_YEAR)
      }(i))
    }
  }

  _getRandomIndices(list, count) {
    let indices = []
    for (let i=0; i<list.length; i++) {
      indices.push(i)
    }
    indices = _.shuffle(indices)
    for (let i=0; i<indices.length; i++) {
      indices[i] = list[i]
    }
    console.log("*** indices", indices)
    return indices.slice(0, count)
  }

  _simulateAfterAYear() {
    console.log("_simulateAfterAYear")
    const { currentYear, unneuteredM, unneuteredF, neuteredDisplayM, neuteredDisplayF } = this.state

    // 1. deal with deaths of unneutered dogs
    const mUDeaths =  Math.floor(MALE_DEATH_RATE * unneuteredM.length)
    const mUDeathIndices = this._getRandomIndices(unneuteredM, mUDeaths)
    const fUDeaths =  Math.floor(FEMALE_DEATH_RATE * unneuteredF.length)
    const fUDeathIndices = this._getRandomIndices(unneuteredF, fUDeaths)
    console.log("1. mUDeaths, fUDeaths", mUDeaths, fUDeaths)
    for (let i=0; i<mUDeaths; i++) {
      this._removeDog(mUDeathIndices[i], true)
    }
    for (let i=0; i<fUDeaths; i++) {
      this._removeDog(fUDeathIndices[i], true)
    }

    // 2. deal with deaths of neutered dogs
    const mDeaths =  Math.floor(MALE_DEATH_RATE * neuteredDisplayM.length)
    const mDeathIndices = this._getRandomIndices(neuteredDisplayM, mDeaths)
    const fDeaths =  Math.floor(FEMALE_DEATH_RATE * neuteredDisplayF.length)
    const fDeathIndices = this._getRandomIndices(neuteredDisplayF, fDeaths)
    console.log("2. mDeaths, fDeaths", mDeaths, fDeaths, mDeathIndices, fDeathIndices)
    for (let i=0; i<mDeaths; i++) {
      this._removeNeuteredDog("M", mDeathIndices[i])
    }
    for (let i=0; i<fDeaths; i++) {
      this._removeNeuteredDog("F", fDeathIndices[i])
    }

    // 3. calculate and place the new borns
    const multi = (this.state.totalDogs > MAX_CAPACITY) ? 0 :
                 NEWBORN_COEFFICIENT * (1-this.state.totalDogs/MAX_CAPACITY) / 4
    const newBornM = Math.floor(unneuteredM.length * multi)
    const newBornF = Math.floor(unneuteredF.length * multi)
    console.log("newBornM", "newBornF", newBornM, newBornF,this.state.totalDogs, 1-this.state.totalDogs/MAX_CAPACITY)

    // ***TODO: exceed max capacity

    for (let i=0; i<newBornM; i++) {
      this._placeDog(M_NOTCAPTURED)
    }
    for (let i=0; i<newBornF; i++) {
      this._placeDog(F_NOTCAPTURED)
    }

    // 4. add newly abandoned
    for (let i=0; i<NEWLY_ABANDONED; i++) {
      this._placeDog(M_NOTCAPTURED)
    }
    for (let i=0; i<NEWLY_ABANDONED; i++) {
      this._placeDog(F_NOTCAPTURED)
    }

    this.setState({ currentYear: currentYear+1 })
  }

  _removeNeuteredDog(gender, pos) {
    const { neuteredDisplayM, neuteredDisplayF, totalDogs } = this.state
    let index = -1
    if (gender==="M") {
      index = _.findIndex(neuteredDisplayM, pos)
      console.log("_removeNeuteredDog - M", pos.position, neuteredDisplayM, index, neuteredDisplayM[index])
      neuteredDisplayM[index].isAlive = false
      this.setState({ neuteredDisplayM: neuteredDisplayM, totalDogs: totalDogs-1 })
    } else {
      index = _.findIndex(neuteredDisplayF, pos)
      console.log("_removeNeuteredDog - F", pos.position, neuteredDisplayF, index, neuteredDisplayF[index])
      neuteredDisplayF[index].isAlive = false
      this.setState({ neuteredDisplayF: neuteredDisplayF, totalDogs: totalDogs-1 })
    }

    setTimeout(() => {
      const { neuteredDisplayM, neuteredDisplayF } = this.state
      if (gender==="M") {
        neuteredDisplayM.splice(_.findIndex(neuteredDisplayM, { position: pos.position, isAlive: false }), 1)
        this.setState({ neuteredDisplayM: neuteredDisplayM })
      } else {
        neuteredDisplayF.splice(_.findIndex(neuteredDisplayF, { position: pos.position, isAlive: false }), 1)
        this.setState({ neuteredDisplayF: neuteredDisplayF })
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
    console.log("*freePos", totalDogs, freePos, freePos.length)
    this.setState({ totalDogs: totalDogs, posList: posList, freePos: freePos,
      unneuteredM: unneuteredM, unneuteredF: unneuteredF })
    return selIndex
  }

  _removeDog(posIdx, isDeath) {
    // remove a dog in the selected position
    let { posList, freePos, totalDogs, unneuteredM, unneuteredF } = this.state
    console.log(posIdx, posList[posIdx])
    console.log("posList[posIdx].dogs[0]", posIdx, posList[posIdx].dogs[0], isDeath)
    // set as disapearing
    if (posList[posIdx].dogs[0] === M_NOTCAPTURED) {
      posList[posIdx].dogs[0] = isDeath ? M_DEATH : M_CAPTURED
      unneuteredM.splice(_.indexOf(unneuteredM, posIdx), 1)
    } else if (posList[posIdx].dogs[0] === F_NOTCAPTURED) {
      posList[posIdx].dogs[0] = isDeath ? F_DEATH : F_CAPTURED
      unneuteredF.splice(_.indexOf(unneuteredF, posIdx), 1)
    }
    if (isDeath) {
      totalDogs--
    } else {
      posList[posIdx].neutureCnt++
    }
    this.setState({ posList: posList,
    unneuteredM: unneuteredM, unneuteredF: unneuteredF, totalDogs: totalDogs  })

    console.log("isDeath:",isDeath, posIdx, "unneutered: ", unneuteredM, unneuteredF, "total=", totalDogs, this.state.neuteredDisplayM, this.state.neuteredDisplayF)

    // after the disappearing animation terminates
    setTimeout(() => {
      let { posList, freePos, neuteredDisplayM, neuteredDisplayF } = this.state
      // move the dog into neutered list
      if (posList[posIdx].dogs[0] === M_CAPTURED) {
        neuteredDisplayM.push({ position: posIdx, isAlive: true })
      } else if (posList[posIdx].dogs[0] === F_CAPTURED) {
        neuteredDisplayF.push({ position: posIdx, isAlive: true })
      }

      // remove the dog from the unneutered list
      console.log("---------SHIFTING", posIdx)
      posList[posIdx].dogs.shift()

      if (posList[posIdx].dogs.length === 0 && posList[posIdx].neutureCnt <= 0) {
        freePos.push(posIdx)
      }
      this.setState({ posList: posList, freePos: freePos,
        neuteredDisplayM: neuteredDisplayM, neuteredDisplayF: neuteredDisplayF })
      console.log("timeout", this.state.unneuteredM, this.state.unneuteredF, this.state.neuteredDisplayM, this.state.neuteredDisplayF)
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
    let { posList, freePos } = this.state
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
    const { neuteredDisplayM, neuteredDisplayF, posList } = this.state
    let nDogsList = []
    const neutered = neuteredDisplayM.concat(neuteredDisplayF)
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
