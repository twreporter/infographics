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
    nations = re.findall("<li><img .+?<a href=\"(.+?)\" title=\"\w+? .+? at the \d+ Summer Olympics\">(.+?)</a>.+?\((\d+)\)</span></li>", result)
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
        filename = str(year) + "/" + str(nation[1]) + ".txt"
        f = open(filename, "w")
        if (raw):
            f.write(raw[0])
        else:
            f.write(nation_result)

