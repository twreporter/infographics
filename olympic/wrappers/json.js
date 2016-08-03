import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import {prefixLink} from 'gatsby-helpers'
import { config } from 'config'

import '../css/olympic.css'

module.exports = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  },
  render () {
    const data = this.props.route.page.data
    let divs = []
    let loop = 1
    let logo_url = "/infographics/olympic-2016/" + data.logo
    let share_url = "https://www.facebook.com/sharer/sharer.php?u=" + data.url
    let share = []
    share.push(
        <div style={{position:'fixed', top:8, right:15, zIndex:10}}>
          <div className="reporter-logo">
            <a style={{textDecoration: 'none'}} href="https://www.twreporter.org/"><img src="https://dh1rvgpokacch.cloudfront.net/atavist/60826/image/derivative/cropandscale~64x64x0x0~favicon-1450079771-87.png" className="img-shadow" /></a>
          </div>
          <div className="facebook" style={{marginTop:15}}>
            <a href={share_url} onclick="window.open(this.href,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=600'); return false;">
                <img src="/assets/facebook.png" className="img-shadow" style={{opacity:.1,cursor:'pointer'}} />
            </a>
          </div>
          <div className="twitter" style={{marginTop:15}}>
            <a style={{textDecoration:'none'}} href="https://twitter.com/home?status=https%3A%2F%2Fwww.twreporter.org%2Fi%2Folympic"><img src="/assets/twitter.png" className="img-shadow" style={{opacity:.1}} /></a>
          </div>
        </div>
    )
    let map = []
    let history = []
    if (data.maptitle) {
       map.push(
        <div>
        <div className="index_group">
          <div className="index_seq">
            <div className="index_line" />
            <div className="index_point" />
          </div>
          <div className="index_seq">
            <div className="index_line_gray" />
          </div>
          <div className="index_seq">
            <div className="index_line_gray" />
          </div>
        </div>
        <div className="title">{data.maptitle}</div>
        <div className="map"><div className="wrapper"><iframe src={data.map} /></div></div>
        <div className="desc">{data.mapdesc}</div>
        </div>
      )
    }
    if (data.historytitle) {
      history.push(
        <div>
            <div className="index_group">
              <div className="index_seq">
                <div className="index_line" />
              </div>
              <div className="index_seq">
                <div className="index_line" />
                <div className="index_point" />
              </div>
              <div className="index_seq">
                <div className="index_line_gray" />
              </div>
            </div>
            <div className="title">{data.historytitle}</div>
            <div className="intro">{data.history}</div>
            <div className="map"><div className="wrapper"><iframe src={data.historyiframe} /></div></div>
            <div className="desc">{data.historydesc}</div>
        </div>
      )
    }

    for(let p in data.players) {
        let experience = data.players[p].experience.split("|")
        let player_picture = "/infographics/olympic-2016/" + data.players[p].picture;
        experience = experience.map(function (element, index, array) {
                                        return (<div>{element}</div>)}) 
        divs.push(
        <div className="player" key={loop}>
          <div className="player_left">
            <div className="player_picture"><img className="player_picture" src={prefixLink(player_picture)} /></div>
            <div className="player_name">{p}</div>
          </div>
          <div className="player_right">
            <div className="player_field">
              <div className="player_texttitle">參賽項目</div>
              <div className="player_item">{data.players[p].item}</div>
            </div>
            <div className="player_field">
              <div className="player_texttitle">奧運經驗</div>
              <div className="player_item">{experience}</div>
             </div>
             <div className="player_intro">{data.players[p].intro}</div>
          </div>
        </div>)
        loop++
    }
    return (
      <div>
        {share}
        <div className="header">
          <div className="item_logo"><img src={prefixLink(logo_url)} /></div>
          <div className="project">里約奧運看門道</div>
          <div className="subtitle">誰是史上大贏家</div>
          <div className="header_triangle" />
        </div>
          <div className="header_rect" />
        <div className="olympic_item">
            {data.item}
        </div>
        <div className="item_line" />
        <div className="intro">{data.intro}</div>
        {map}
        {history}
        <div className="index_group">
          <div className="index_seq">
            <div className="index_line" />
          </div>
          <div className="index_seq">
            <div className="index_line" />
          </div>
          <div className="index_seq">
            <div className="index_line" />
            <div className="index_point" />
          </div>
        </div>
        <div className="title">2016年台灣參賽選手</div>
        <div className="playerlist">
          { divs }
        </div>
        <div className="item_line" />
        <div className="data_source">
           <p>本專題資料來源為維基百科，透過程式爬梳後以人工校對產生，並以開源方式釋出於 <a href="https://github.com/twreporter-data/olympic">Github</a> 任何人皆可檢視下載。如有誤植，歡迎共同協作更正，協助我們產出更正確的資訊。</p>
           <p>照片資料來源：維基百科、國家運動訓練中心、選手Facebook、2017世大運粉絲專頁、台灣職業高爾夫協會。</p>
        </div>
        <div className="team">
          <div className="team_title">製作團隊</div>
          <div className="team_members">簡信昌、陳貞樺、賴子歆、陳思樺、吳政達</div>
          <div className="publish_date">2016.08.04</div>
        </div> 
        <div className="allitems">
            <div className="item_title">
                快來看更多台灣參賽項目
            </div>
            <div className="items_block">
                <Link
                  to={prefixLink('/infographics/olympic-2016//archery/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Archery.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//athletics/')}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <img className="singleitem" src={prefixLink('/infographics/olympic-2016//assets/icon_Athletics.svg')} />
                </Link>
                <Link
                  to={prefixLink('/infographics/olympic-2016//badminton/')}
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
      </div>
    )
  },
})
