import React from 'react'
import 'css/markdown-styles.css'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import styles from '../styles/common.scss'

module.exports = React.createClass({
  propTypes () {
    return {
      router: React.PropTypes.object,
    }
  },
  render () {
    const post = this.props.route.page.data
    return (
      <DocumentTitle title={`${config.siteTitle} | ${post.title}`}>
        <div className="gray">
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </DocumentTitle>
    )
  },
})
