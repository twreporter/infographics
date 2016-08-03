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
    let share = []
    share.push(
        <div style={{position:'fixed', top:8, right:15, zIndex:10}}>
          <div className="reporter-logo">
            <a style={{textDecoration: 'none'}} href="https://www.twreporter.org/"><img src="https://dh1rvgpokacch.cloudfront.net/atavist/60826/image/derivative/cropandscale~64x64x0x0~favicon-1450079771-87.png" className="img-shadow" /></a>
          </div>
          <div className="facebook" style={{marginTop:15}}>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.twreporter.org%2Fi%2Folympic" onclick="window.open(this.href,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=600'); return false;">
                <img src="https://www.twreporter.org/i/draw-taiwaness-recognition/img/facebook.png" className="img-shadow" style={{opacity:.1,cursor:'pointer'}} />
            </a>
          </div>
          <div className="twitter" style={{marginTop:15}}>
            <a style={{textDecoration:'none'}} href="https://twitter.com/home?status=https%3A%2F%2Fwww.twreporter.org%2Fi%2Folympic"><img src="https://www.twreporter.org/i/draw-taiwaness-recognition/img/twitter.png" className="img-shadow" style={{opacity:.1}} /></a>
          </div>
        </div>
    )
    return (
      <div>
        <Container
          style={{
            maxWidth: "100%",
          }}
        >
          {share}
          {this.props.children}
        </Container>
        <Container
            style={{
              maxWidth: "100%",
            }}
          >
        </Container>
        <div className="landing_header">
           <img className="leading_img" src="/infographics/olympic-2016/assets/langding_svg.svg" />
           <div className="landing_headerbox">
               <div className="landing_title">
                 里約奧運看門道
               </div>
               <div className="landing_subtitle">
                 誰是史上大贏家
               </div>
           </div>
        </div>
        <div className="intro">
          <p>台灣突破以往奧運參賽人數規模，共有58位運動員競逐18項賽事。除了大家熟知的戴資穎、盧彥勳、雷千瑩、謝淑薇、蕭美玉、許淑淨、莊智淵、周天成等各界好手，還有36位首度參加奧運的體育新星，其中女子拳擊、女子角力、馬術都是台灣史上第一人，馬術選手汪亦岫更是首位贏得奧運馬術資格賽的華人。</p>
          <p>預測誰會得獎很困難，即使實力再強的選手，也會有運氣不佳的時候。不過，把時間拉長，從體育資料下手，真的可以看出不同國家各自擅長的競技項目。</p>
          <p>你知道奧運舉辦120年來，運動列強有哪些嗎？哪一國超級射手最多？誰搶了俄羅斯的體操王冕？誰又是桌球霸主？還有，台灣真的是跆拳道強國嗎？歷年奧運中，台灣得牌數是否在世界上佔有一席之地，還是只能在後面當小弟?更多問題，就讓《報導者》資料新聞團隊告訴你答案吧！</p>
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
                  to={prefixLink('/infographics/olympic-2016/archery/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016/assets/icon_Archery.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016/athletics/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016/assets/icon_Athletics.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016/badminton/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Badminton.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//boxing/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Boxing.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//cycling/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Cycling.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//equestrian/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Equestrian.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//golf/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Golf.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//gymnastics/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Gymnastics.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//judo/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Judo.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//rowing/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Rowing.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//sailing/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Sailing.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//shooting/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Shooting.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//swimming/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Swimming.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//table_tennis/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Table_tennis.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//taekwodo/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Taekwondo.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//tennis/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Tennis.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//weightlifting/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Weightlifting.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//wrestling/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Wrestling.svg')} />
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
