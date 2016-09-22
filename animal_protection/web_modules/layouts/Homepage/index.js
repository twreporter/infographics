/* eslint-disable react/jsx-no-bind, react/jsx-no-literals */

import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import Page from "../Page"
import PagesList from "../../PagesList"

import Markdown from "react-markdown"
import Img from "react-image-holder"
import { firstContent } from "./content"
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
      showSubComponent: true,
    }
  }

  componentDidMount() {
    velocity(this.block, { scale: 2 }, 500)
      .then(() => console.log("animation complete"))
  }

  render() {
    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: "Post" },
      sort: "date",
      reverse: true,
    })
    .slice(0, numberOfLatestPosts)

    return (
      <Page { ...this.props }>
        <h2>{ "Latest Posts" }</h2>
        <div ref={ (ref) => this.block = ref }>
          VelocityExample
        </div>
        <Img src="" width="800" height="500" usePlaceholder />
        {
          // window ? 
          // <VelocityTransitionGroup 
          //   enter={ { animation: "slideDown" } } 
          //   leave={ { animation: "slideUp" } }
          //   runOnMount={ this.state.showSubComponent }
          // >
          //   {
          //     this.state.showSubComponent ?
          //     <div>
          //       <Holder 
          //         // width and height can be a number or a string 
          //         width="100%" 
          //         height="500px"  
          //       /> 
          //     </div> : undefined
          //   }
          // </VelocityTransitionGroup>
          
          // : null
        }
        <Markdown source={ firstContent } />
        <PagesList pages={ latestPosts } />
      </Page>
    )
  }
}
