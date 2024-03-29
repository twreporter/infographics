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
import dogNeuteredDeath from "../../../../content/assets/dog_neutered_dead.gif"
import gameIcon from "../../../../content/assets/game_cnt_icon.svg"
import gameNeuteredIcon from "../../../../content/assets/pink-dog-icon.svg"
import alertIcon from "../../../../content/assets/alert-icon.svg"

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

const A_YEAR = 3000           // use how many ms to represent a year
const TOTAL_YEARS = 10
const INITIAL_DELAY = 1500

let timeoutsArr = []
let yearTimeoutArr = []

let GameHeader = (props) => {
  return (
    <div className={ classnames(styles["header"]) }>
      <span className={ styles["time-des"] }>
        Current Time:   
      </span>
      <span className={ styles["time-now"] }>
        { props.currentYear }.{ props.currentMonth }
      </span>
    </div>
  )
}

let GameFooter = (props) => {
  return (
    <div className={ classnames(styles["footer"]) }>
      <nobr>
        <span>
          <div className={ classnames(commonStyles["img-responsive"], styles["dog-cnt-icon"]) }
            dangerouslySetInnerHTML={ { __html: gameIcon } }
          />
        Non-Neutered
        </span>
      </nobr>
      <nobr>
        <span>
          <div className={ classnames(commonStyles["img-responsive"], styles["dog-cnt-icon"]) }
            dangerouslySetInnerHTML={ { __html: gameNeuteredIcon } }
          />
          Neutered
        </span>
      </nobr>
      <span> { `${props.year}-${props.year+10}` }
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
  let dogImg = props.isAlive ? dogNeutered : dogNeuteredDeath
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
      initialYear: currentTime.getFullYear(),
      posList: [],    // list to store possible positions to place dogs
      freePos: [],
      totalDogs: 0,
      totalNeutered: 0,
      neuteredDisplayM: [],    // list of the neutured male dogs     => {position: , isAlive: }
      neuteredDisplayF: [],    // list of the neutured female dogs   => {position: , isAlive: }
      unneuteredM: [],  // list of the unneutured male dogs     => [3, 5 ,6, ...]
      unneuteredF: [],  // list of the unneutured female dogs   => [7, 8, ...]
      isExceedMax: false,
      isEnded: false,
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
    this.checkIfExceedMax = this.checkIfExceedMax.bind(this)
    this.debouncedResize = _.debounce(() => { this.handleResize() }, 150, { "maxWait": 450 })
  }

  componentDidMount() {
    const { outerWidth, outerHeight, outerTop } = this.props
    velocity(this.container, { width: [ "100%", outerWidth ], height: [ "100%", outerHeight ],
      top: [ 0, outerTop ], translateX: [ "-50%", "-50%" ] }, { duration: 1000, easing: "easeInOutSine" })
      .then(this._handleDialogOpened())
    window.addEventListener("resize", this.debouncedResize)
    this.debouncedResize()
    timeoutsArr = []
    yearTimeoutArr = []
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debouncedResize)

    for (let i=0; i<timeoutsArr.length; i++) {
      clearTimeout(timeoutsArr[i])
    }
  }

  _handleDialogOpened() {
    this.setState({ isOpened: true })
    timeoutsArr.push(setTimeout(this.handleGameStart, INITIAL_DELAY))
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

    // console.log("Initial", this.state.unneuteredM, this.state.unneuteredF)

    this.setState({ calculator: calculator })
    let self = this
    for (let i=0; i<TOTAL_YEARS; i++) {
      (function(y) {
        const timoutId = setTimeout(self._simulateAfterAYear, (y+1) * A_YEAR + INITIAL_DELAY)
        timeoutsArr.push(timoutId)
        yearTimeoutArr.push(timoutId)
      }(i))
    }

    // to show the game ending results
    timeoutsArr.push(setTimeout(()=>{
      this.setState({ isEnded: true })
    }, (TOTAL_YEARS+0.5) * A_YEAR))
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
    return indices.slice(0, count)
  }

  checkIfExceedMax() {
    if (this.state.totalDogs >= MAX_CAPACITY) {
      this.setState({ isExceedMax: true })

      for (let i=0; i<yearTimeoutArr.length; i++) {
        clearTimeout(yearTimeoutArr[i])
      }

      // to show the game ending results
      timeoutsArr.push(setTimeout(()=>{
        this.setState({ isEnded: true })
      }, 3500))
    }
  }

  _simulateAfterAYear() {
    const { currentYear, unneuteredM, unneuteredF, neuteredDisplayM, neuteredDisplayF } = this.state

    // 1. deal with deaths of unneutered dogs
    const mUDeaths =  Math.floor(MALE_DEATH_RATE * unneuteredM.length)
    const mUDeathIndices = this._getRandomIndices(unneuteredM, mUDeaths)
    const fUDeaths =  Math.floor(FEMALE_DEATH_RATE * unneuteredF.length)
    const fUDeathIndices = this._getRandomIndices(unneuteredF, fUDeaths)
    // console.log("1. mUDeaths, fUDeaths", mUDeaths, fUDeaths)
    for (let i=0; i<mUDeaths; i++) {
      this._removeDog(mUDeathIndices[i], true)
    }
    for (let i=0; i<fUDeaths; i++) {
      this._removeDog(fUDeathIndices[i], true)
    }

    // console.log("1.", currentYear, this.state.freePos, this.state.totalDogs)

    // 2. deal with deaths of neutered dogs
    const mDeaths =  Math.floor(MALE_DEATH_RATE * neuteredDisplayM.length)
    const mDeathIndices = this._getRandomIndices(neuteredDisplayM, mDeaths)
    const fDeaths =  Math.floor(FEMALE_DEATH_RATE * neuteredDisplayF.length)
    const fDeathIndices = this._getRandomIndices(neuteredDisplayF, fDeaths)
    // console.log("2. mDeaths, fDeaths", mDeaths, fDeaths, mDeathIndices, fDeathIndices)
    for (let i=0; i<mDeaths; i++) {
      this._removeNeuteredDog("M", mDeathIndices[i])
    }
    for (let i=0; i<fDeaths; i++) {
      this._removeNeuteredDog("F", fDeathIndices[i])
    }

    // console.log("2.", currentYear, this.state.freePos, this.state.totalDogs)

    // 3. calculate and place the new borns
    const multi = (this.state.totalDogs > MAX_CAPACITY) ? 0 :
                 NEWBORN_COEFFICIENT * (1-this.state.totalDogs/MAX_CAPACITY) / 4
    const newBornM = Math.floor(unneuteredM.length * multi)
    const newBornF = Math.floor(unneuteredF.length * multi)
    // console.log("newBornM", "newBornF", newBornM, newBornF,this.state.totalDogs, 1-this.state.totalDogs/MAX_CAPACITY)

    for (let i=0; i<newBornM; i++) {
      this._placeDog(M_NOTCAPTURED)
    }
    for (let i=0; i<newBornF; i++) {
      this._placeDog(F_NOTCAPTURED)
    }

    // console.log("3.", currentYear, this.state.freePos, this.state.totalDogs)

    // 4. add newly abandoned
    for (let i=0; i<NEWLY_ABANDONED; i++) {
      this._placeDog(M_NOTCAPTURED)
    }
    for (let i=0; i<NEWLY_ABANDONED; i++) {
      this._placeDog(F_NOTCAPTURED)
    }

    // console.log("4.", currentYear, this.state.freePos, this.state.totalDogs)

    this.setState({ currentYear: currentYear+1 })

    // check if exceed max
    this.checkIfExceedMax()

  }

  _removeNeuteredDog(gender, pos) {
    const { neuteredDisplayM, neuteredDisplayF, totalDogs, freePos } = this.state
    let index = -1
    freePos.push(pos.position)
    if (gender==="M") {
      index = _.findIndex(neuteredDisplayM, pos)
      // console.log("_removeNeuteredDog - M", pos.position, neuteredDisplayM, index, neuteredDisplayM[index])
      neuteredDisplayM[index].isAlive = false
      this.setState({ neuteredDisplayM: neuteredDisplayM, totalDogs: totalDogs-1, freePos: freePos })
    } else {
      index = _.findIndex(neuteredDisplayF, pos)
      // console.log("_removeNeuteredDog - F", pos.position, neuteredDisplayF, index, neuteredDisplayF[index])
      neuteredDisplayF[index].isAlive = false
      this.setState({ neuteredDisplayF: neuteredDisplayF, totalDogs: totalDogs-1, freePos: freePos })
    }

    timeoutsArr.push(setTimeout(() => {
      const { neuteredDisplayM, neuteredDisplayF } = this.state
      if (gender==="M") {
        neuteredDisplayM.splice(_.findIndex(neuteredDisplayM, { position: pos.position, isAlive: false }), 1)
        this.setState({ neuteredDisplayM: neuteredDisplayM })
      } else {
        neuteredDisplayF.splice(_.findIndex(neuteredDisplayF, { position: pos.position, isAlive: false }), 1)
        this.setState({ neuteredDisplayF: neuteredDisplayF })
      }
    }, 300))
  }

  _placeDog(gender) {
    // place a dog in a random position, and return the randomly selected position

    // check if exceed max
    this.checkIfExceedMax()

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

    // console.log("*freePos", totalDogs, freePos, freePos.length)
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
      unneuteredM.splice(_.indexOf(unneuteredM, posIdx), 1)
    } else if (posList[posIdx].dogs[0] === F_NOTCAPTURED) {
      posList[posIdx].dogs[0] = isDeath ? F_DEATH : F_CAPTURED
      unneuteredF.splice(_.indexOf(unneuteredF, posIdx), 1)
    }
    if (isDeath) {
      totalDogs--
      freePos.push(posIdx)
    } else {
      posList[posIdx].neutureCnt++
    }
    this.setState({ posList: posList,
    unneuteredM: unneuteredM, unneuteredF: unneuteredF, totalDogs: totalDogs, freePos: freePos  })
    // console.log("isDeath:",isDeath, posIdx, "unneutered: ", unneuteredM, unneuteredF, "total=", totalDogs, this.state.neuteredDisplayM, this.state.neuteredDisplayF)

    // after the disappearing animation terminates
    timeoutsArr.push(setTimeout(() => {
      let { posList, freePos, neuteredDisplayM, neuteredDisplayF } = this.state
      // move the dog into neutered list
      if (posList[posIdx].dogs[0] === M_CAPTURED) {
        neuteredDisplayM.push({ position: posIdx, isAlive: true })
      } else if (posList[posIdx].dogs[0] === F_CAPTURED) {
        neuteredDisplayF.push({ position: posIdx, isAlive: true })
      }

      // remove the dog from the unneutered list
      posList[posIdx].dogs.shift()

      if (posList[posIdx].dogs.length === 0 && posList[posIdx].neutureCnt <= 0) {
        // freePos.push(posIdx)
      }
      this.setState({ posList: posList,
        neuteredDisplayM: neuteredDisplayM, neuteredDisplayF: neuteredDisplayF })
    }, 300))

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

    const xOffset = dogWidth / 2
    const yOffset = dogHeight / 2

    const xStep = (gWidth - xOffset) / jMax
    const yStep = (gHeight - yOffset) / iMax
    let _posList = []
    let freePos = []
    let totalPos = 0

    for (let i=0; i<iMax; i++) {
      for (let j=0; j<jMax; j++) {
        _posList.push({ top: i*yStep + dogHeight/2 + yOffset, left: j*xStep + dogWidth/2 + xOffset, dogs: [], neutureCnt: 0 })
        freePos.push(totalPos)
        totalPos++
      }
    }
    for (let i=0; i<iMax; i++) {
      for (let j=0; j<jMax; j++) {
        _posList.push({ top: i*yStep + yOffset, left: j*xStep + xOffset, dogs: [], neutureCnt: 0 })
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
    let { posList, freePos, totalNeutered } = this.state
    if (event) {
      event.stopPropagation()
    }
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
      this.setState({ totalNeutered: totalNeutered+1 })
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
              onClick={ (event)=>{this.handleDogClick(i, event)} }>
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
    const { isIntoHidden, isOpened, isClosing, totalDogs, currentYear,
      currentMonth, totalNeutered, unneuteredM, unneuteredF, isExceedMax,
      isEnded, initialYear } = this.state
    const introClass = isIntoHidden ? styles["hide"] : null
    const closingClass = isClosing ? styles["hide-fast"] : null
    const exceedClass = isExceedMax ? styles["game-over-box"] : commonStyles["hide"]
    const endingClass = isEnded ? styles["game-results-box"] : commonStyles["hide"]

    return (
      <div className={ classnames(styles.container) }
        ref={ (ref) => this.container = ref }
      >
        <div className={ classnames(styles["intro"],
        commonStyles["text-center"], commonStyles["content-outer"], closingClass) }
        >
          <span className={ classnames(styles["close-button"]) } onClick={ this.handleClose }></span>
          <div className={ introClass }>
            <h2>Click on a dog icon to do a TNR <br />  to reduce the number of cubs produced.</h2>
            <div className={ styles["inner"] }>
              <div className={ classnames(commonStyles["img-responsive"], commonStyles["overlay-svg"], styles["center-dog"]) }
                dangerouslySetInnerHTML={ { __html: gameIcon } } />
            </div>
          </div>

          <div className={ styles["game-outer"] }>
            <GameHeader num={ totalDogs } currentYear={ currentYear } currentMonth={ currentMonth } />
            <div className={ styles["game-container"] } ref={ (ref) => this.game = ref }>
              { this.getNeuteredDogs() }
              { this.getDogs() }
              <div className={ classnames(styles["dog"], styles["hide-visible"]) } ref={ (ref) => this.exampleDog = ref }>
                <Dog status={ M_NOTCAPTURED } />
              </div>

              <div className={ exceedClass }>
                <div>
                  <div className={ classnames(commonStyles["img-responsive"], commonStyles["overlay-svg"]) }
                    dangerouslySetInnerHTML={ { __html: alertIcon } } />
                  <h2>Game over!</h2>
                  <h5>The dog population already exceeds carrying capacity.</h5>
                </div>
              </div>

              <div className={ endingClass }>
                <div>
                  <p>You have done a total of <b>{ totalNeutered }</b>TNRs</p>
                  <p>But you have to work a lot harder to catch up to <br />the rates of breeding and abandonment by humans!</p>
                  {/* <p>共結紮了<b>{ totalNeutered*50 }</b>隻狗狗</p>
                  <p>此區域還有<b>{ (unneuteredM.length + unneuteredF.length) * 50 }</b>隻狗狗沒有結紮。</p> */}
                </div>
              </div>

            </div>
            <GameFooter year={ initialYear } />
          </div>
        </div>
      </div>
    )
  }
}

GamePlayer.propTypes = {}
