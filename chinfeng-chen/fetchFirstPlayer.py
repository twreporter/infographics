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

buffer = StringIO()
c = pycurl.Curl()
cc = pycurl.Curl()
players = {}
players['year'] = {}
players['nation'] = {}
count = 0

url = 'https://en.wikipedia.org/wiki/List_of_countries_with_their_first_Major_League_Baseball_player'
c.setopt(c.URL, url)
c.setopt(c.WRITEDATA, buffer)
c.perform()
result = buffer.getvalue()

nationList = re.findall("<td>(\w+?)</td>\n<td><a href=\"/wiki/.+?\" title=\".+?\">([\w ]+?)</a></td>\n<td>(\d{4})<sup id=\".+?\" class=\"reference\">", result)
for nation in nationList:
    count += 1
    players['year'][nation[2]] = {"nation": nation[0], "player": nation[1]}
    players['nation'][nation[0]] = {"year": nation[2], "player": nation[1]}

players['count'] = count
print json.dumps(players)

