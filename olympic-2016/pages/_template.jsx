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
            maxWidth: 1024,
          }}
        >
          {this.props.children}
        </Container>
        <Container
            style={{
              maxWidth: 1024,
            }}
          >
        <div className="allitems">
            <Link
              to={prefixLink('/archery')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Archery.svg')} />
            </Link>
            <Link
              to={prefixLink('/athletics')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Athletics.svg')} />
            </Link>
            <Link
              to={prefixLink('/badminton')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Badminton.svg')} />
            </Link>
            <Link
              to={prefixLink('/boxing')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Boxing.svg')} />
            </Link>
            <Link
              to={prefixLink('/cycling')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Cycling.svg')} />
            </Link>
            <Link
              to={prefixLink('/equestrian')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Equestrian.svg')} />
            </Link>
            <Link
              to={prefixLink('/golf')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Golf.svg')} />
            </Link>
            <Link
              to={prefixLink('/gymnastics')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Gymnastics.svg')} />
            </Link>
            <Link
              to={prefixLink('/judo')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Judo.svg')} />
            </Link>
            <Link
              to={prefixLink('/rowling')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Rowing.svg')} />
            </Link>
            <Link
              to={prefixLink('/sailing')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Sailing.svg')} />
            </Link>
            <Link
              to={prefixLink('/shooting')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Shooting.svg')} />
            </Link>
            <Link
              to={prefixLink('/swimming')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Swimming.svg')} />
            </Link>
            <Link
              to={prefixLink('/table_tennis')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Table_tennis.svg')} />
            </Link>
            <Link
              to={prefixLink('/taekwodo')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Taekwondo.svg')} />
            </Link>
            <Link
              to={prefixLink('/tennis')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Tennis.svg')} />
            </Link>
            <Link
              to={prefixLink('/weightlifting')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Weightlifting.svg')} />
            </Link>
            <Link
              to={prefixLink('/wrestling')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <img className="singleitem" src={prefixLink('/assets/icon_Wrestling.svg')} />
            </Link>
        </div>
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
