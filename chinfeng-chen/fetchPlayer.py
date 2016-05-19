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

for year in range(1876, 2006):
    players[year] = {}
    url = 'http://www.baseball-almanac.com/players/birthplace.php?y='+str(year)
    c.setopt(c.URL, url)
    c.setopt(c.WRITEDATA, buffer)
    c.perform()
    result = buffer.getvalue()

    us = re.search("<table border='0' align='center'><tr><td colspan='4' align='left'><font face='Arial' size='-1'><b>United States \((\d+)\)<br>&nbsp;</b></font></td></tr>", result)
    if (us):
        players[year]['USA'] = us.group(1)

    others = re.findall("<td><a href='/players/birthplace\.php\?loc=\w+&y=\d+'><font face='Arial' size='-1'>(\w+)</font></a><font face='Arial' size='-1'>&nbsp;\((\d+)\)</font></td>", result)
    for country in others:
        players[year][country[0]] = country[1]

print json.dumps(players)

