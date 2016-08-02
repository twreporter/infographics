import React from 'react'
import { Container } from 'react-responsive-grid'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Headroom from 'react-headroom'

import { rhythm } from 'utils/typography'
import '../css/footer.css'

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
            maxWidth: "100%",
          }}
        >
          {this.props.children}
        </Container>
        <Container
            style={{
              maxWidth: "100%",
            }}
          >
        </Container>
        <div className="intro">
           2016里約奧運將在8月5日登場，準備好為中華隊加油了嗎！台灣突破以往奧運參賽紀錄，共有58位運動員競逐18項賽事。除了大家熟知的戴資穎、盧彥勳、雷千瑩、謝淑薇、蕭美玉、許淑淨、莊智淵、周天成等各界好手，還有36位首度參加奧運的體育新星，其中女子拳擊、女子角力、馬術都是台灣史上第一人，馬術選手汪亦岫更是首位贏得奧運馬術資格賽的華人。
        </div>
        <div className="intro">
          想知道現代奧運舉辦120年來，運動列強有哪些嗎？《報導者》帶你解密奧運看門道。透過大數據分析告訴你：哪一國超級射手最多？誰搶了俄羅斯的體操王冕？誰又是桌球霸主？還有，台灣真的是跆拳道強國嗎？歷年奧運中，台灣得牌數是否在世界上佔有一席之地，還是只能在後面當小弟?
        </div>
        <div className="item_line" />
        <div className="index_items">
        <div className="index_items">
            台灣人必看！
        </div>
            你不可錯過的18項賽事
        </div>
        <div className="allitems_color">
            <div className="items_block">
                <Link
                  to={prefixLink('/archery/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Archery.svg')} />
                </Link>
                <Link
                  to={prefixLink('/athletics/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Athletics.svg')} />
                </Link>
                <Link
                  to={prefixLink('/badminton/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Badminton.svg')} />
                </Link>
                <Link
                  to={prefixLink('/boxing/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Boxing.svg')} />
                </Link>
                <Link
                  to={prefixLink('/cycling/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Cycling.svg')} />
                </Link>
                <Link
                  to={prefixLink('/equestrian/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Equestrian.svg')} />
                </Link>
                <Link
                  to={prefixLink('/golf/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Golf.svg')} />
                </Link>
                <Link
                  to={prefixLink('/gymnastics/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Gymnastics.svg')} />
                </Link>
                <Link
                  to={prefixLink('/judo/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Judo.svg')} />
                </Link>
                <Link
                  to={prefixLink('/rowing/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Rowing.svg')} />
                </Link>
                <Link
                  to={prefixLink('/sailing/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Sailing.svg')} />
                </Link>
                <Link
                  to={prefixLink('/shooting/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Shooting.svg')} />
                </Link>
                <Link
                  to={prefixLink('/swimming/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Swimming.svg')} />
                </Link>
                <Link
                  to={prefixLink('/table_tennis/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Table_tennis.svg')} />
                </Link>
                <Link
                  to={prefixLink('/taekwodo/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Taekwondo.svg')} />
                </Link>
                <Link
                  to={prefixLink('/tennis/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Tennis.svg')} />
                </Link>
                <Link
                  to={prefixLink('/weightlifting/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Weightlifting.svg')} />
                </Link>
                <Link
                  to={prefixLink('/wrestling/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/assets/icon_Wrestling.svg')} />
                </Link>
            </div>
        </div>
        <div className="data_source">
           本專題資料來源為維基百科，透過程式爬梳後以人工校對產生，並以開源方式釋出於 <a href="https://github.com/twreporter-data/olympic">Github</a> 任何人皆可檢視下載。如有誤植，歡迎共同協作更正，協助我們產出更正確的資訊。
        </div>
        <div className="team">
          <div className="team_title">製作團隊</div>
          <div className="team_members">簡信昌、陳貞樺、賴子歆、陳思樺、吳政達</div>
          <div className="publish_date">2016.08.04</div>
        </div> 
      </div>
    )
  },
})
