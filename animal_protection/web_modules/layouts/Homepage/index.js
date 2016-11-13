/* eslint-disable react/jsx-no-bind, prefer-const, max-len, react/jsx-closing-bracket-location, no-unexpected-multiline, react/jsx-no-literals, no-unused-vars */

import _ from "lodash"
import React, { Component, PropTypes } from "react"
import ReactDOM from "react-dom"
import enhanceCollection from "phenomic/lib/enhance-collection"

import Page from "../Page"
// import PagesList from "../../PagesList"

import classnames from "classnames"
import Img from "react-image-holder"
import { supportUs } from "./content"
import OpeningTop from "./Opening/OpeningTop"
import OpeningStardust from "./Opening/OpeningStardust"
import OpeningLast from "./Opening/OpeningLast"
import Chapter01 from "./Chapter01/Chapter01"
import Tnr from "./Chapter02_TNR/TNR"
import Chapter03 from "./Chapter03/Chapter03"
import Chapter04 from "./Chapter04/Chapter04"
import Chapter05 from "./Chapter05/Chapter05"

import commonStyles from "../../styles/common.scss"
import styles from "./Home.scss"

import reporterIcon from "../../../content/assets/twreporter-icon.svg"
import donationIcon from "../../../content/assets/icon-donation.svg"
import fbIcon from "../../../content/assets/icon-share-facebook.svg"
import twitterIcon from "../../../content/assets/icon-share-twitter.svg"

import { MOBILE_WIDTH } from "./config"

const debounceTime = {
  threshold: 300,
  maxWait: 600,
}

let velocity
if (typeof window !== "undefined") {
  velocity = require("velocity-animate")
}

const numberOfLatestPosts = 6

export default class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      scrollPercent: 0,
      activeIndex: -1,
      heightArr: [],
      shouldShowNav: false,
      preScrollPos: 0,
      isProgressShown: false,
    }

    this._handleResize = this._handleResize.bind(this)
    this._handleChapterNavigation = this._handleChapterNavigation.bind(this)
    this.handleResize = _.debounce(() => {
      this._handleResize()
    }, debounceTime.threshold, { "maxWait": debounceTime.maxWait })

    this._handleScroll = this._handleScroll.bind(this)
    this.debouncedScroll = _.debounce(() => {
      this._handleScroll()
    }, debounceTime.threshold, { "maxWait": debounceTime.maxWait })
  }

  componentDidMount() {
    // detect window width
    window.addEventListener("resize", this.handleResize)
    this._handleResize()

    // detect sroll position
    window.addEventListener("touchmove", this.debouncedScroll)
    window.addEventListener("wheel", this.debouncedScroll)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isMobile!==this.state.isMobile
    || nextState.scrollPercent!==this.state.scrollPercent
    || nextState.activeIndex!==this.state.activeIndex
    || nextState.isProgressShown!==this.state.isProgressShown) {
      return true
    }
    return false
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
    window.removeEventListener("touchmove", this.debouncedScroll)
    window.removeEventListener("wheel", this.debouncedScroll)
  }

  _handleResize() {
    this.setState({ wWidth: window.innerWidth, wHeight: window.innerHeight })
    if (window.innerWidth > MOBILE_WIDTH)
      this.setState({ isMobile: false })
    else
      this.setState({ isMobile: true })

    let heightArr = []
    const containers = [ this.chapter0, this.chapter1, this.chapter2, this.chapter3, this.chapter4, this.chapter5, this.artEnding ]
    let totalHeight = 0
    for (let i=0; i<containers.length; i++) {
      heightArr.push(totalHeight)
      totalHeight = totalHeight + ReactDOM.findDOMNode(containers[i]).getBoundingClientRect().height
    }
    this.setState({ heightArr: heightArr })
  }

  _handleChapterNavigation(cIndex) {
    console.log("_handleChapterNavigation", this.state.heightArr[cIndex])
    velocity(document.body, "scroll", { offset: this.state.heightArr[cIndex],
      duration: 500, easing: "easeIn" })
    .then(()=>{
      this.setState({ activeIndex: cIndex })
    })
  }

  _handleScroll() {
    const { heightArr, activeIndex, preScrollPos, isProgressShown } = this.state
    const node = ReactDOM.findDOMNode(this.container)
    const rect = node.getBoundingClientRect()
    const { height } = rect
    const scrollPos = window.scrollY
    let scrollPercent = Math.round(scrollPos/height * 100)
    scrollPercent = (scrollPercent>100) ? 100: scrollPercent

    this.setState({ scrollPercent: scrollPercent || 0, shouldShowNav: (scrollPos < preScrollPos) })

    let curActive = -1
    for (let i=0; i<heightArr.length; i++) {
      if (scrollPos >= heightArr[i]) {
        curActive++
      }
      else {
        break
      }
    }
    if (curActive !== activeIndex) {
      this._handleResize()
      this.setState({ activeIndex: curActive })
    }

    if (!isProgressShown && scrollPos>500) {
      this.setState({ isProgressShown: true })
    }
    else if (isProgressShown && scrollPos<=500) {
      this.setState({ isProgressShown: false })
    }

    this.setState({ preScrollPos: scrollPos })
  }

  render() {
    const { scrollPercent, activeIndex, shouldShowNav, isProgressShown } = this.state

    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: "Post" },
      sort: "date",
      reverse: true,
    })
    .slice(0, numberOfLatestPosts)

    let chapterArr = []
    for (let i=1; i<=5; i++) {
      const activeClass = (activeIndex===i) ? styles["active"] : null
      let cIndex = i
      chapterArr.push(<span key={ cIndex }
        className={ classnames(styles["sec-index"], activeClass) }
        onClick={ ()=>{
          this._handleChapterNavigation(cIndex)
        } }>{ cIndex }</span>)
    }

    const navClass = shouldShowNav ? null : commonStyles["hide"]

    const activeOpening = (activeIndex===0) ? styles["active-opening"] : null

    const progressBar = isProgressShown ? <div className={ styles["progress-bar"] } style={ { width: `${scrollPercent+5}%` } }></div> : null

    return (
      <Page { ...this.props } className={
      styles.container }
      >
        <div itemScope itemType="http://schema.org/ScholarlyArticle" ref={ (ref) => this.container = ref }>
          <div ref={ (ref) => this.chapter0 = ref }>
            <OpeningTop />
            <OpeningStardust />
            <OpeningLast />
          </div>
          <Chapter01 ref={ (ref) => this.chapter1 = ref } />
          <Tnr ref={ (ref) => this.chapter2 = ref } />
          <Chapter03 ref={ (ref) => this.chapter3 = ref } />
          <Chapter04 ref={ (ref) => this.chapter4 = ref } />
          <Chapter05 ref={ (ref) => this.chapter5 = ref } />
          <div ref={ (ref) => this.artEnding = ref } />

        </div>

        <div className={ commonStyles.content }>
          {/* <PagesList pages={ latestPosts } /> */}
          <p className={ commonStyles["des-text"] }>
            地圖資料來源： CartoDB &nbsp; &nbsp;
            開頭照片來源：桃園新屋收容所
          </p>
        </div>

        <div className={ classnames(styles.header, navClass) }>
          <div className={ styles["index-box"] }>
            <a href="#" className={ classnames(styles["oval"], activeOpening) }></a>
            { chapterArr }
          </div>

          <div className={ styles["share-box"] }>
            <a href="https://www.twreporter.org/" target="_blank">
              <div title="報導者TheReporter" className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
                dangerouslySetInnerHTML={ { __html: reporterIcon } }
              />
            </a>
            <div className={ styles["spacer"] }></div>
            <a title={ supportUs } style={ { marginLeft: "-0.5rem" } }
              href="https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718" target="_blank"
            >
              <div className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
                dangerouslySetInnerHTML={ { __html: donationIcon } }
              />
              <span className={ classnames(styles["support-text"]) } style={ { opacity: 0.8 } }>{ supportUs }</span>
            </a>
            <div className={ styles["spacer"] }></div>
            <div className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
              dangerouslySetInnerHTML={ { __html: fbIcon } }
            />
            <div className={ classnames(commonStyles["img-responsive"], styles["nav-icon"]) }
              dangerouslySetInnerHTML={ { __html: twitterIcon } }
            />
          </div>

        </div>

        <div className={ classnames(styles.footer, navClass) }>
          <div className={ styles["footer-index-box"] }>
            <a href="#" className={ classnames(styles["oval"], activeOpening) }></a>
            { chapterArr }
          </div>
        </div>

        { progressBar }

      </Page>
    )
  }
}
