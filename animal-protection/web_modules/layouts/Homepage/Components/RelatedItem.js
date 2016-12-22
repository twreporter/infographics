/* eslint-disable react/jsx-no-bind, react/jsx-no-literals, max-len, react/prop-types, react/no-multi-comp, react/jsx-closing-bracket-location  */

import React from "react"
import styles from "./RelatedItem.scss"

const RelatedItem = (props) => {
  return (
    <div className={ styles["container"] }>
      <a href={ props.link }>
        <div className={ styles["related-item"] }>
          <div className={ styles["related-left"] }>
            <img className={ styles["crop"] } src={ props.imgSrc } />
          </div>
          <div className={ styles["related-right"] }>
            <p className={ styles["related-title"] }>{ props.title }</p>
            <p className={ styles["related-des"] }>{ props.description }</p>
          </div>
        </div>
      </a>
    </div>
  )
}

RelatedItem.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  link: React.PropTypes.string,
  imgSrc: React.PropTypes.string,
}

export default RelatedItem
