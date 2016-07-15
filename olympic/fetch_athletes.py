#! /usr/bin/python                                                                                                                           
# -*- coding: utf8 -*-

import time
import glob
import os
import pycurl
import json
import re
import sys
from StringIO import StringIO

reload(sys)
sys.setdefaultencoding("utf-8")

all_items = ['Aquatics', 'Archery', 'Athletics', 'Boxing', 'Canoeing', 'Cycling', 'Equestrian', 'Fencing', 'Football', 'Golf', 'Gymnastics', 'Handball', 'Judo', 'Modern pentathlon', 'Rowing', 'Rugby sevens', 'Sailing', 'Shooting', 'Table tennis', 'Taekwondo', 'Tennis', 'Triathlon ', 'Volleyball', 'Weightlifting ', 'Wrestling']
full_list = {}

for year in [2016, 2012, 2008, 2004, 2000, 1996, 1992, 1988, 1984]:
#for year in [2016, 2012]:
    print year
    file_pattern = str(year) + "/*.txt"
    full_list[year] = {}
    for nation_file in glob.glob(file_pattern):
        print time.time()
        nation_match = re.match("\d{4}\/(.+)\.txt", nation_file)
        nation = nation_match.group(1)
        print nation
        nation_buffer = open(nation_file, "r")
        nation_result = nation_buffer.read()
        nation_buffer.close()
        full_list[year][nation] = {}
        if nation_result:
            print time.time()
            items = re.split(r"<h2><span class=\"mw-headline\" id=\".+?\">", nation_result)
            for item in items:
                print time.time()
                athletes = re.match(r"^(\w+?)</span>.+?</h2>(.+)$", item, re.DOTALL)
                if athletes:
                    if (athletes.group(1) not in all_items):
                        continue
                    print "\t" + athletes.group(1)
                    full_list[year][nation][athletes.group(1)] = []
                    # for the table type
                    athlete = re.findall("(<tr.*?>\s*?<td align=\"left\".*?><a href=\".+?\".+?title=\".+? \(page does not exist\)\">([a-zA-Z_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>.+?<\/td>(.+?)<\/tr>)", athletes.group(2), re.DOTALL)
                    print time.time()
                    if athlete:
                        sys.stdout.write("o")
                        for name in athlete:
                            gender = re.match(".*?(Men|Women).*?", name[0], re.DOTALL)
                            if (gender != None):
                                sex = gender.group(1)
                            else:
                                sex = "N/A"
                            athlete_name = name[1] or name[3]
                            print athlete_name
                            if (athlete_name not in full_list[year][nation][athletes.group(1)]):
                                full_list[year][nation][athletes.group(1)].append({"name": athlete_name, "gender": sex})
                    athlete = re.findall("(<tr.*?>\s?<td align=\"left\".*?><a href=\".+?\".*?title=\".+?\">([a-zA-Z\_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>.+?<\/td>(.+?)<\/tr>)", athletes.group(2), re.DOTALL)
                    print time.time()
                    if athlete:
                        sys.stdout.write("o")
                        for name in athlete:
                            gender = re.match(".*?(Men|Women).*?", name[0], re.DOTALL)
                            if (gender != None):
                                sex = gender.group(1)
                            else:
                                sex = "N/A"
                            athlete_name = name[1] or name[3]
                            print athlete_name
                            if (athlete_name not in full_list[year][nation][athletes.group(1)]):
                                full_list[year][nation][athletes.group(1)].append({"name": athlete_name, "gender": sex})
                                #sys.stdout.write('.')
                            print "\t\tStep 1: fetch name by table format"
                    print "\t\tStep 2: complete name by table format"
                    print time.time()
                    # for the listing type    
                    list_style = re.findall("<li>(.+?)<\/li>", athletes.group(2), re.DOTALL)
                    print time.time()
                    if (list_style):
                        for list_item in list_style:
                            sys.stdout.write("-")
                            gender = re.match(".*?(Men|Women).*?", list_item[0], re.DOTALL)
                            if (gender != None):
                                sex = gender.group(1)
                            else:
                                sex = "N/A"
                            athletes_list = re.findall("(<a href=\".+?\".*?title=\".+? \(page does not exist\)\">([a-zA-Z_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>)", list_item, re.DOTALL)
                            print "\t\tStep 3: fetch name by listing format"
                            print time.time()
                            for name in athletes_list:
                                athlete_name = name[1] or name[2]
                                if (athlete_name not in full_list[year][nation][athletes.group(1)]):
                                    full_list[year][nation][athletes.group(1)].append({"name": athlete_name, "gender": sex})
                            athletes_list = re.findall("(<a href=\".+?\".*?title=\".+?\">([a-zA-Z_ ÓÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŒœŠšŸŽž]+?)</a>)", list_item, re.DOTALL)
                            print "\t\tStep 3: fetch name by listing format"
                            print time.time()
                            for name in athletes_list:
                                athlete_name = name[1] or name[2]
                                if (athlete_name not in full_list[year][nation][athletes.group(1)]):
                                    full_list[year][nation][athletes.group(1)].append({"name": athlete_name, "gender": sex})
                                    #sys.stdout.write('.')
                        print "\t\tStep 4: complete the list"
        else:
            print "failed: " + nation
f = open('athletes_full.json', 'w')
for year in full_list:
    for nation in full_list[year]:
        for item in full_list[year][nation]:
            for athlete in full_list[year][nation][item]:
                f.write(year + "," + nation + "," + item + "," + athlete["name"] + "," + athlete["gender"])

