/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

let velocity;
if (typeof window !== 'undefined') {
  velocity = require('velocity-animate');
} 

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubComponent: true,
    };
  }

  componentDidMount() {
    velocity(this.block, { scale: 2 }, 500)
      .then(e => console.log('animation complete'));
  }

  render() {
    const { news } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>React.js News</h1>

          <div ref={(ref) => this.block = ref} >VelocityExample</div>

          <ul className={s.news}>
            {news.map((item, index) => (
              <li key={index} className={s.newsItem}>
                <a href={item.link} className={s.newsTitle}>{item.title}</a>
                <span
                  className={s.newsDesc}
                  dangerouslySetInnerHTML={{ __html: item.contentSnippet }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    contentSnippet: PropTypes.string,
  })).isRequired,
};

export default withStyles(s)(Home);
