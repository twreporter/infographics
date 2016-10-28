/* eslint-disable max-len */

import React from "react"
import Markdown from "react-markdown"

import commonStyles from "../../../styles/common.scss"
import styles from "./ChapterTitle.scss"

const ChapterTitle = (props) => {
  return (
    <div className={ styles["container"] }>
      <p className={ styles["title"] }> { "Chapter " + props.chapterId }</p>
      <div className={ styles["outer"] }>
        <div className={ styles["bg-outer"] }>
          <div className={ commonStyles["content-outer"] }>
            <h2>
              <Markdown source={ props.title } />
            </h2>
          </div>
        </div>
      </div>
      <div className={ styles["deco-line-1"] }></div>
      <div className={ styles["deco-line-2"] }></div>
    </div>
  )
}

ChapterTitle.propTypes = {
  chapterId: React.PropTypes.string,
  title: React.PropTypes.string,
}

export default ChapterTitle
