import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import Page from "../Page"
import PagesList from "../../PagesList"

import Holder from "react-holder" 

import Markdown from "react-markdown"
import { firstContent } from "./content"
import { VelocityTransitionGroup } from "velocity-react"
import "velocity-animate/velocity.ui"

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
        {
          window ? 
          <VelocityTransitionGroup 
            enter={ { animation: "slideDown" } } 
            leave={ { animation: "slideUp" } }
            runOnMount={ this.state.showSubComponent }
          >
            {
              this.state.showSubComponent ?
              <div>
                <Holder 
                  // width and height can be a number or a string 
                  width="100%" 
                  height="500px"  
                /> 
              </div> : undefined
            }
          </VelocityTransitionGroup>
          
          : null
        }
        <Markdown source={ firstContent } />
        <PagesList pages={ latestPosts } />
      </Page>
    )
  }
}
