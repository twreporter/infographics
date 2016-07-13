#! /usr/bin/python                                                                                                                           
# -*- coding: utf8 -*-

from datetime import datetime
import os
import pycurl
import json
import re
import sys
from StringIO import StringIO

reload(sys)
sys.setdefaultencoding("utf-8")

list = {}

#for year in [2016, 2012, 2008, 2004, 2000, 1996, 1992, 1988, 1984]:
for year in [2016, 2012]:
    print year
    wiki_url = "https://en.wikipedia.org/wiki/"+str(year)+"_Summer_Olympics"
    buffer = StringIO()
    c = pycurl.Curl()
    c.setopt(c.URL, wiki_url)
    c.setopt(c.WRITEDATA, buffer)
    c.perform()
    result = buffer.getvalue()
    c.close()
    list[year] = {}
    nations = re.findall("<li><img .+?<a href=\"(.+?)\" title=\"\w+? at the \d+ Summer Olympics\">(.+?)</a>.+?\((\d+)\)</span></li>", result)
    for nation in nations:
        print nation
        nation_buffer = StringIO()
        list[year][nation[1]] = { 'url': nation[0], 'total': nation[2], 'items': {}}
        c = pycurl.Curl()
        c.setopt(c.URL, "https://en.wikipedia.org" + nation[0])
        c.setopt(c.WRITEDATA, nation_buffer)
        c.perform()
        nation_result = nation_buffer.getvalue()
        c.close()
        raw = re.findall(r"(<h2>.+?)<h2><span class=\"mw-headline\" id=\"References\">References</span>", nation_result, re.DOTALL)
        items = re.split(r"<h2><span class=\"mw-headline\" id=\".+?\">", raw[0], re.DOTALL)
        for item in items:
            if (item == 'Competitors'):
                break
            athletes = re.match(r"^(\w+?)</span>.+?</h2>(.+)$", item, re.DOTALL)
            if athletes:
                list[year][nation[1]]['items'][athletes.group(1)] = []
                #athlete = re.findall("<td align=\"left\".*?><a href=\"[\w\d\/\_\?:=;&%\(\)]+?\".*?title=\".+?\">([a-zA-Z\_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>", athletes.group(2), re.DOTALL)
                athlete = re.findall("<td align=\"left\".*?><a href=\"[\w\d\/\_\?:=;&%\(\)]+?\".*?title=\".+?\">([\w\_ ]+?)</a>", athletes.group(2), re.UNICODE)
                if athlete:
                    for name in athlete:
                        if (name not in list[year][nation[1]]['items'][athletes.group(1)]):
                            list[year][nation[1]]['items'][athletes.group(1)].append(name)
                #athlete = re.findall("<td align=\"left\".*?><a href=\".+?\".+?title=\".+? \(page does not exist\)\">([a-zA-Z_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>", athletes.group(2), re.DOTALL)
                athlete = re.findall("<td align=\"left\".*?><a href=\"[\w\d\/\_\?:=;&%\(\)]+?\".*?title=\".+?\">([\w\_ ]+?)</a>", athletes.group(2), re.UNICODE)
                if athlete:
                    for name in athlete:
                        if (name not in list[year][nation[1]]['items'][athletes.group(1)]):
                            list[year][nation[1]]['items'][athletes.group(1)].append(name)
                list_style = re.findall("<li>(.+?)<\/li>", athletes.group(2), re.DOTALL)
                if (list_style):
                    for list_item in list_style:
                        #athletes_list = re.findall("<a href=\".+?\".*?title=\".+? \(page does not exist\)\">([a-zA-Z_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>", list_item, re.DOTALL)
                        athletes_list = re.findall("<td align=\"left\".*?><a href=\"[\w\d\/\_\?:=;&%\(\)]+?\".*?title=\".+?\">([\w\_ ]+?)</a>", list_item, re.UNICODE)
                        for name in athletes_list:
                            if (name not in list[year][nation[1]]['items'][athletes.group(1)]):
                                list[year][nation[1]]['items'][athletes.group(1)].append(name)
                        #athletes_list = re.findall("<a href=\".+?\".*?title=\".+?\">([a-zA-Z_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>", list_item, re.DOTALL)
                        athletes_list = re.findall("<td align=\"left\".*?><a href=\"[\w\d\/\_\?:=;&%\(\)]+?\".*?title=\".+?\">([\w\_ ]+?)</a>", list_item, re.UNICODE)
                        for name in athletes_list:
                            if (name not in list[year][nation[1]]['items'][athletes.group(1)]):
                                list[year][nation[1]]['items'][athletes.group(1)].append(name)
        print list[year][nation[1]]['items']

