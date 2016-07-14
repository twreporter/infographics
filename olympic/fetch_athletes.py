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

full_list = {}

for year in [2016, 2012, 2008, 2004, 2000, 1996, 1992, 1988, 1984]:
#for year in [2016, 2012]:
    print year
    wiki_url = "https://en.wikipedia.org/wiki/"+str(year)+"_Summer_Olympics"
    buffer = StringIO()
    c = pycurl.Curl()
    c.setopt(c.URL, wiki_url)
    c.setopt(c.WRITEDATA, buffer)
    c.perform()
    result = buffer.getvalue()
    c.close()
    full_list[year] = {}
    nations = re.findall("<li><img .+?<a href=\"(.+?)\" title=\"\w+? at the \d+ Summer Olympics\">(.+?)</a>.+?\((\d+)\)</span></li>", result)
    for nation in nations:
        print "\t" + str(nation[1])
        nation_buffer = StringIO()
        full_list[year][nation[1]] = { 'url': nation[0], 'total': nation[2], 'items': {}}
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
                full_list[year][nation[1]]['items'][athletes.group(1)] = []
                # for the table type
                athlete = re.findall("(<tr.*?>.*?<td align=\"left\".*?><a href=\".+?\".+?title=\".+? \(page does not exist\)\">([a-zA-Z_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>.+?<\/td>(.+?)<\/tr>|<tr.*?>.+?<td align=\"left\".*?><a href=\"[\w\d\/\_\?:=;&%\(\)]+?\".*?title=\".+?\">([a-zA-Z\_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>.+?<\/td>(.+?)<\/tr>)", athletes.group(2), re.DOTALL)
                if athlete:
                    for name in athlete:
                        gender = re.match(".*?(Men|Women).*?", name[0], re.DOTALL)
                        if (gender != None):
                            sex = gender.group(1)
                        else:
                            sex = "N/A"
                        athlete_name = name[1] or name[3]
                        if (athlete_name not in full_list[year][nation[1]]['items'][athletes.group(1)]):
                            full_list[year][nation[1]]['items'][athletes.group(1)].append({"name": athlete_name, "gender": sex})
                # for the listing type    
                list_style = re.findall("<li>(.+?)<\/li>", athletes.group(2), re.DOTALL)
                if (list_style):
                    for list_item in list_style:
                        gender = re.match(".*?(Men|Women).*?", list_item[0], re.DOTALL)
                        if (gender != None):
                            sex = gender.group(1)
                        else:
                            sex = "N/A"
                        athletes_list = re.findall("(<a href=\".+?\".*?title=\".+? \(page does not exist\)\">([a-zA-Z_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>|<a href=\".+?\".*?title=\".+?\">([a-zA-Z_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>)", list_item, re.DOTALL)
                        for name in athletes_list:
                            athlete_name = name[1] or name[2]
                            if (athlete_name not in full_list[year][nation[1]]['items'][athletes.group(1)]):
                                full_list[year][nation[1]]['items'][athletes.group(1)].append({"name": athlete_name, "gender": sex})

f = open('athletes_full.json', w)
f.write(json.dump(full_list))

