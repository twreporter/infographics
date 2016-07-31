import React from 'react'
import DocumentTitle from 'react-document-title'
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
    for(let p in data.players) {
        let experience = data.players[p].experience.split("|")
        experience = experience.map(function (element, index, array) {
                                        return (<div>{element}</div>)}) 
        divs.push(
        <div className="player" key={loop}>
          <div className="player_left">
            <div className="player_picture">{data.players[p].picture}</div>
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
        <div className="header">
          <div className="item_logo"><img src={prefixLink(data.logo)} /></div>
          <div className="project">你所不知道的里約奧運大解密</div>
          <div className="subtitle">獎落誰家決勝秘笈獨家公開</div>
        </div>
        <div className="header_rect" />
        <div className="olympic_item">
            {data.item}
        </div>
        <div className="item_line" />
        <div className="intro">{data.intro}</div>
        <div className="index_group">
          <div className="index_line" />
          <div className="index_line_gray" />
          <div className="index_line_gray" />
        </div>
        <div className="title">{data.maptitle}</div>
        <div className="map">{data.map}</div>
        <div className="desc">{data.mapdesc}</div>
        <div className="index_group">
          <div className="index_line" />
          <div className="index_line" />
          <div className="index_line_gray" />
        </div>
        <div className="title">{data.historytitle}</div>
        <div className="intro">{data.history}</div>
        <div className="historyiframe">{data.historyiframe}</div>
        <div className="desc">{data.historydesc}</div>
        <div className="index_group">
          <div className="index_line" />
          <div className="index_line" />
          <div className="index_line" />
        </div>
        <div className="title">2016年台灣參賽選手</div>
        <div className="playerlist">
          { divs }
        </div>
        </div>
    )
  },
})
