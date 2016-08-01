import React from 'react'
import { Container } from 'react-responsive-grid'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Headroom from 'react-headroom'
import { link } from 'gatsby-helpers'

import { rhythm } from 'utils/typography'
import '../css/footer.css'
import '../css/menu.css'

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },
  render () {
    return (
      <div>
        <Container
          style={{
            maxWidth: '100%',
          }}
        >
          {this.props.children}
        </Container>
        <Container
            style={{
              maxWidth: '100%',
            }}
          >
        <div className='footer'>
              <div className='footer-container'>
                  <div className='logo-container'>
                      <div className='logo'>
                  <a href="https://www.twreporter.org/" target="_self">
                    <img className="logo-img" src='https://www.twreporter.org/asset/footer-logo-desktop.png' /> </a>
                      </div>
                  </div>
                  <div className='social-container'>
                      <div className='item'>
                          <a href='https://www.facebook.com/twreporter/' target='_blank'>
                              <img className="fb" src='https://www.twreporter.org/asset/FB'/>
                          </a>
                      </div>
                      <div className='item'>
                          <a href='https://www.instagram.com/twreporter/' target='_blank' >
                              <img className="ig" src='https://www.twreporter.org/asset/IG.png' />
                          </a>
                      </div>
                  </div>
                  <div className='us-container'>
                      <div className='item'>
                          <a href='https://www.twreporter.org/a/about-us-footer' target="_self">
                              關於我們
                          </a>
                      </div>
                      <div className='item'>
                          <a href='https://www.twreporter.org/a/contact-footer' target="_self">
                              聯絡我們
                          </a>
                      </div>
                      <div className='item'>
                          <a href='https://www.twreporter.org/a/privacy-footer' target="_self">
                              隱私政策
                          </a>
                      </div>
                      <div className='item'>
                          <a href='https://twreporter.backme.tw:443/cashflow/checkout?project_id=175&reward_id=718' target="_self">
                              贊助我們
                          </a>
                      </div>
                  </div>
              </div>
              <div className='open-source-container'>
                  <div className='items'>
                      <div className='item'>
                          <a href='http://creativecommons.org/licenses/by-nc-nd/3.0/tw/' rel="license" target='_blank'>
                              <img className="cc-logo img" src='https://www.twreporter.org/asset/cc.png' />
                              <span className="cc-license"> 除另有註明，網站內容皆採用創用CC姓名標示-非商業性-禁止改作授權條款</span>
                          </a>
                      </div>
                      <div className='item'>
                          <a href='https://github.com/twreporter' target='_blank'>
                              <img src='https://www.twreporter.org/asset/github.png' className='img' />
                              <span> github.com/twreporter</span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
        </Container>
      </div>
    )
  },
})
