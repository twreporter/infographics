/* eslint-disable max-len */

import React from "react"
import Markdown from "react-markdown"

import styles from "./ChapterTitle.scss"

const ChapterTitle = (props) => {
  return (
    <div className={ styles["container"] }>
      <span className={ styles["title"] }> { "Chapter " + props.chapterId }</span>
      <h2>
        <Markdown source={ props.title } />
      </h2>
    </div>
  )
}

ChapterTitle.propTypes = {
  chapterId: React.PropTypes.string,
  title: React.PropTypes.string,
}

export default ChapterTitle
