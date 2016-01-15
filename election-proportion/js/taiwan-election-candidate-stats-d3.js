(function() {
    d3.helper = {};
    d3.helper.tooltip = function() {
        var tooltipDiv;
        var bodyNode = d3.select('body').node();

        function tooltip(selection) {
            selection.on('mouseover.tooltip', function(d) {
                    // Clean up lost tooltips
                    d3.select('body').selectAll('div.tooltip').remove();
                    // Append tooltip
                    tooltipDiv = d3.select('body')
                        .append('div')
                        .attr('class', 'tooltip')
                    var absoluteMousePos = d3.mouse(bodyNode);
                    var left = (window.innerWidth <= 414) && absoluteMousePos[0] > (window.innerWidth/2) ? absoluteMousePos[0] - 87: absoluteMousePos[0] + 13;
                    tooltipDiv.style({
                        left: left + 'px',
                        top: (absoluteMousePos[1] - 23) + 'px',
                        'background': 'rgba(255, 255, 255, 0.7)',
                        color: '#333',
                        padding: '5px',
                        'border-radius': '2px',
                        position: 'absolute',
                        'z-index': 1001,
                        'box-shadow': '0 1px 2px 0 rgba(0,0,0,0.4)'
                    });

                    var image = d.photo ? '<img height="80px" src="' + d.photo + '"></img>' : '';
                    var name = '<div style="font-size:24px; font-weight:500">' + d.name + '</div>';
                    var party = '<div class="party-indicator"><div class="party-circle" style="background-color:' +getPartyColor(d.party) +'"></div><span>' + d.party + '</span></div>'
                    var district = '<div>' + d.city +'</div>';

                    var div = '<div class="election-container" style="padding:15px;">' + image + '<div style="display:inline-block;margin-left:10px;">' + name + party + district  + '</div></div>'
                    tooltipDiv.html(div);
                })
                .on('mouseout.tooltip', function() {
                    // remove tooltip
                  tooltipDiv.remove();
                })
        }

        tooltip.attr = function(_x) {
            if (!arguments.length) return attrs;
            attrs = _x;
            return this;
        };

        tooltip.style = function(_x) {
            if (!arguments.length) return styles;
            styles = _x;
            return this;
        };

        return tooltip;
    };

    /*
    var y = d3.scale.linear()
        .range([0, height]);

    var x = d3.scale.linear()
        .range([0, width])
        */

    function getPartyColor(party) {
        switch (party) {
            case '中國國民黨':
                return '#8ed2ff';
            case '民主進步黨':
                return '#80eaa8';
            case '新黨':
                return '#ffff4d';
            case '親民黨':
                return '#ffb991';
            case '時代力量':
                return '#ffd675';
            case '綠黨社會民主黨聯盟':
            case '綠社盟':
                return '#ffaddb';
            case '無黨籍':
            case '無黨團結聯盟':
                return '#bdccd4';
            case '民國黨':
                return '#486fff';
            case '台灣團結聯盟':
            case '台聯黨':
                return '#c7b299';
            default:
                return '#FFF';
        }
    }

    function transferData(data) {
        var groupAge = function(age) {
            for (var i = 59; i >= 19; i = i - 10) {
                if (age > i) {
                    return i;
                }
            }
        };
        var changeEducationValue = function(education) {
            switch (education) {
                case '博士':
                case '碩士':
                    return 'master';
                case '大學':
                    return 'bachelor';
                case '高中':
                    return 'highschool';
                case '專科':
                    return 'vocational';
                case '國小':
                case '國中':
                    return 'other'
                default:
                    return '';
            }
        }
        var changeHairValue = function(hair) {
            switch (hair) {
                case '長':
                    return 'long';
                case '中':
                    return 'medium';
                case '短':
                    return 'short';
                default:
                    return '';
            }
        }

        return data.map(function(d) {
            d.age = groupAge(d.age);
            d.education = changeEducationValue(d.education);
            d.hair = changeHairValue(d.hair);
            return d;
        });
    }

    function splitData(data) {
        var district = [];
        var nondistrict = [];
        var aboriginal = [];
        data.forEach(function(d) {
            if (d.type === '分區立委') {
                d.pos = district.length;
                district.push(d);
            } else if (d.type === '不分區立委') {
                d.pos = nondistrict.length;
                nondistrict.push(d);
            } else {
                d.pos = aboriginal.length;
                aboriginal.push(d);
            }
        });
        return {
            district: district,
            nondistrict: nondistrict,
            aboriginal: aboriginal
        };
    }

    function filterData(data, criteria) {
        if (!criteria) {
            return data;
        }
        var filtered = data.filter(function(d) {
            if (criteria.gender && d.gender !== criteria.gender) {
                return false;
            }
            if (criteria.age && d.age !== criteria.age) {
                return false;
            }
            if (criteria.education && d.education !== criteria.education) {
                return false;
            }
            if (criteria.hair && d.hair !== criteria.hair) {
                return false;
            }
            return true;
        });
        return filtered;
    }

    function getBgProportion(data) {
        return d3.nest()
            .key(function(d) {
                return d.party;
            })
            .rollup(function(d) {
                return (d.length / data.length).toFixed(2);
            })
            .map(data);
    }

    function getProportion(data, property, value) {
        return d3.nest()
            .key(function(d) {
                return d.party;
            })
            .rollup(function(v) {
                var count = 0;
                v.forEach(function(d) {
                    if (d[property] === value) {
                        count++;
                    }
                });
                return (count / v.length).toFixed(2);
            })
            .map(data);
    }

    function getCongressProportion(data, property, value) {
        var count = 0;
        data.forEach(function(d) {
            if (d[property] === value) {
                count++;
            }
        });
        return {
            congress: count / data.length
        };
    }

    function getNationalProportion(property, value) {
        var stats = {
            gender: {
                M: 0.499,
                F: 0.501
            },
            age: {
                // 29以下
                '19': 0.341,
                // 30-39
                '29': 0.168,
                // 40-49
                '39': 0.155,
                // 50-59
                '49': 0.153,
                // 60以上
                '59': 0.108,
            },
            education: {
                // 碩博士
                'master': 0.061,
                // 大學
                'bachelor': 0.241,
                // 高中、高職
                'highschool': 0.306,
                // 專科
                'vocational': 0.119,
                // 國小、國中
                'other': 0.253
            }
        }

        return {
            nation: stats[property][value]
        };
    }


    d3.csv("./data/candidate.csv", function(error, rawData) {
        var data = transferData(rawData);
        // render taiwan election result by map
        (function() {
            var _splitData = splitData(data);
            var MAPWIDTH = 500;
            var MAPHEIGHT = 500;
            var xScale = d3.scale.linear().domain([0, 5]).range([30, 150]);
            var yScale = d3.scale.linear().domain([0, 5]).range([50, 210]);
            var projection = d3.geo.mercator()
                .center([120.9688063, 23.82887])
                .translate([MAPWIDTH / 2, MAPHEIGHT / 2])
                .scale(5000);

            var criteria = {};

            var districtMap = d3.select('.district-map').append('svg').attr('viewBox', '100 50 300 500');
            var nondistrictMap = d3.select('.nondistrict').append('svg').attr('viewBox', '0 0 150 500');
            var aboriginalMap = d3.select('.aboriginal').append('svg').attr('viewBox', '0 0 150 150');
            var districtGroupGray = districtMap.append('g').attr('class', 'district-group-gray');
            var nondistrictGroupGray = nondistrictMap.append('g').attr('class', 'nondistrict-group-gray');
            var aboriginalGroupGray = aboriginalMap.append('g').attr('class', 'aboriginal-group-gray')
            var districtGroup = districtMap.append('g').attr('class', 'district-group');
            var nondistrictGroup = nondistrictMap.append('g').attr('class', 'nondistrict-group');
            var aboriginalGroup = aboriginalMap.append('g').attr('class', 'aboriginal-group');

            var renderBg = function(data, type) {
                var node;
                if (type === 'district') {
                    node = districtGroupGray
                } else if (type === 'nondistrict') {
                    node = nondistrictGroupGray;
                } else {
                    node = aboriginalGroupGray;
                }
                node.selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('class', 'circle')
                    .attr("cx", function(d) {
                        return type === 'district' ? projection([d.lon, d.lat])[0] : xScale(d.pos % 5);
                    })
                    .attr("cy", function(d) {
                        return type === 'district' ? projection([d.lon, d.lat])[1] : yScale(Math.floor(d.pos / 5));
                    })
                    .attr('r', 6)
                    .style("fill", "#EEE");
            }

            var renderFront = function(data, type, criteria) {
                var filtered = filterData(data, criteria);
                var node;
                if (type === 'district') {
                    node = districtGroup;
                } else if (type === 'nondistrict') {
                    node = nondistrictGroup;
                } else {
                    node = aboriginalGroup;
                }

                var rects = node.selectAll('circle')
                    .data(filtered, function(d) {
                        return d.name;
                    });

                rects.enter()
                    .append('circle')
                    .attr('class', 'selected-circles')
                    .attr("cx", function(d) {
                        return type === 'district' ? projection([d.lon, d.lat])[0] : xScale(d.pos % 5);
                    })
                    .attr("cy", function(d) {
                        return type === 'district' ? projection([d.lon, d.lat])[1] : yScale(Math.floor(d.pos / 5));
                    })
                    .attr('r', 6)
                    .style("fill", function(d) {
                      return getPartyColor(d.party);
                    })
                    .style("cursor", "pointer")
                    .style("stroke", "white")
                    .style('stroke-width', 0.5)
                    .call(d3.helper.tooltip());
                rects.exit().remove();
            }

            var renderTotal = function(data, criteria) {
                var length = 0;
                for (var index in data) {
                    length += filterData(data[index], criteria).length;
                }
                document.getElementById('map-total-congress').innerHTML = length;
            }

            var renderButton = function(data) {
                function unselect(className) {
                    var selection = d3.selectAll(className + '.selected');
                    if (selection[0].indexOf(this) == -1) {
                        selection.classed("selected", false);
                    }
                }

                function helper(type, i) {
                        d3.select('#' + type + '-' + i).on('click', function() {
                            unselect('.' + type + '-bt');
                            if (type === 'gender' && i === 'male') {
                                i = 'M';
                            } else if (type === 'gender' && i === 'female') {
                                i = 'F';
                            }
                            if (criteria[type] === i) {
                                delete criteria[type];
                            } else {
                                criteria[type] = i;
                                var selection = d3.select(this);
                                selection.classed("selected", true);
                            }
                            renderFront(data.district, 'district', criteria);
                            renderFront(data.nondistrict, 'nondistrict', criteria);
                            renderFront(data.aboriginal, 'aboriginal', criteria);
                            renderTotal(data, criteria);
                        });
                    }
                    ['male', 'female'].forEach(function(gender) {
                        helper('gender', gender)
                    });
                for (var i = 59; i >= 19; i = i - 10) {
                    helper('age', i);
                }
                ['other', 'highschool', 'vocational', 'bachelor', 'master'].forEach(function(education) {
                    helper('education', education);
                });
                ['long', 'medium', 'short'].forEach(function(hair) {
                    helper('hair', hair);
                })
            }
            renderButton(_splitData);
            renderTotal(_splitData);
            renderBg(_splitData.district, 'district');
            renderFront(_splitData.district, 'district');
            renderBg(_splitData.nondistrict, 'nondistrict');
            renderFront(_splitData.nondistrict, 'nondistrict');
            renderBg(_splitData.aboriginal, 'aboriginal');
            renderFront(_splitData.aboriginal, 'aboriginal');
        })();

        // render election result by proportion square
        (function() {
            var WIDTH = 150;
            var HEIGHT = 150;
            var SQUARE = 22500; // HEIGHT * WIDTH
            var _data = data.map(function(d) {
                d = JSON.parse(JSON.stringify(d));
                var party = d.party;
                if (party === '中國國民黨') {
                    d.party = 'kmt';
                } else if (party === '民主進步黨') {
                    d.party = 'dpp';
                }
                if (d.party !== 'kmt' && d.party !== 'dpp') {
                    d.party = 'other';
                }
                return d;
            });
            var bgProportion = getBgProportion(_data);
            bgProportion.congress = 1;
            bgProportion.nation = 1;
            // var rectScale = d3.scale.linear().domain([0, 1]).range([0, HEIGHT]);

            function renderProportionBlock(data, party, node) {
                var calculate = function(d) {
                    if (d.hasOwnProperty(party)) {
                        return Math.sqrt(SQUARE * d[party] * bgProportion[party]);
                    }
                    return Math.sqrt(SQUARE * bgProportion[party]);
                }

                var rect = node.selectAll('rect')
                    .data(data);
                rect.enter()
                    .append('rect')
                    .attr('width', calculate)
                    .attr('height', calculate)
                    .attr('y', function(d) {
                        return HEIGHT - (SQUARE * bgProportion[party]);
                    })
                    .style("fill", function(d) {
                        if (d.hasOwnProperty(party)) {
                            return '#d9dbd1';
                        }
                        return '#000';
                    })

                rect.transition()
                    .attr('width', calculate)
                    .attr('height', calculate)
                    .attr('y', function(d) {
                        if (d.hasOwnProperty(party)) {
                            return HEIGHT - (Math.sqrt(SQUARE * d[party] * bgProportion[party]));
                        }
                        return HEIGHT - (Math.sqrt(SQUARE * bgProportion[party]));
                    })
                    .duration(500);
            }

            function unselect(className) {
                var selection = d3.selectAll(className + ' .selected');
                if (selection[0].indexOf(this) == -1) {
                    selection.classed("selected", false);
                }
            }

            function select(className) {
                var selection = d3.selectAll(className);
                if (selection[0].indexOf(this) == -1) {
                    selection.classed("selected", true);
                }
            }

            var renderPercentage = function(data, party, category) {
                document.getElementById(category + '-' + party + '-pt').innerHTML = data;
            }

            function clickGenderButton(data, gender) {
                unselect('.gender-proportion');
                if (gender === 'M') {
                    select('.gender-m-bt');
                } else {
                    select('.gender-f-bt');
                }
                renderBlock(data, 'gender', gender);
            }

            function clickButton(data, category, value) {
                var className = '.' + category + '-' + value + '-bt';
                unselect('.' + category + '-proportion');
                select(className);
                renderBlock(data, category, value);
            }

            function renderBlock(data, key, value) {
                var proportion = getProportion(data, key, value);
                proportion.congress = getCongressProportion(data, key, value).congress;
                if (key !== 'hair') {
                    proportion.nation = getNationalProportion(key, value).nation;
                    renderPercentage(proportion.nation * 100, 'nation', key);
                    renderProportionBlock(['bgrect', proportion], 'nation', d3.select('.nation-' + key));
                }
                renderPercentage(proportion.congress * 100, 'congress', key);
                renderProportionBlock(['bgrect', proportion], 'congress', d3.select('.congress-' + key));
                renderPercentage(proportion.kmt * 100, 'kmt', key);
                renderProportionBlock(['bgrect', proportion], 'kmt', d3.select('.kmt-' + key));
                renderPercentage(proportion.dpp * 100, 'dpp', key);
                renderProportionBlock(['bgrect', proportion], 'dpp', d3.select('.dpp-' + key));
                renderPercentage(proportion.other * 100, 'other-party', key);
                renderProportionBlock(['bgrect', proportion], 'other', d3.select('.other-party-' + key));
            }

            function renderGenderBlockAndButtons(data, gender) {
                renderBlock(data, 'gender', gender);
                d3.select('#maleButton').on('click', clickGenderButton.bind(this, data, 'M'));
                d3.select('#femaleButton').on('click', clickGenderButton.bind(this, data, 'F'));
            }


            function renderAgeBlockAndButtons(data, age) {
                renderBlock(data, 'age', age);
                d3.select('#twentyButton').on('click', clickButton.bind(this, data, 'age', 19));
                d3.select('#thirtyButton').on('click', clickButton.bind(this, data, 'age', 29));
                d3.select('#fortyButton').on('click', clickButton.bind(this, data, 'age', 39));
                d3.select('#fiftyButton').on('click', clickButton.bind(this, data, 'age', 49));
                d3.select('#sixtyButton').on('click', clickButton.bind(this, data, 'age', 59));
            }

            function renderEducationBlockAndButtons(data, education) {
                renderBlock(data, 'education', education);
                d3.select('#masterButton').on('click', clickButton.bind(this, data, 'education', 'master'));
                d3.select('#bachelorButton').on('click', clickButton.bind(this, data, 'education', 'bachelor'));
                d3.select('#highSchoolButton').on('click', clickButton.bind(this, data, 'education', 'highschool'));
                d3.select('#vocationalButton').on('click', clickButton.bind(this, data, 'education', 'vocational'));
                d3.select('#otherButton').on('click', clickButton.bind(this, data, 'education', 'other'));
            }

            function renderHairBlockAndButtons(data, hair) {
                renderBlock(data, 'hair', hair);
                d3.select('#longHairBt').on('click', clickButton.bind(this, data, 'hair', 'long'));
                d3.select('#mediumHairBt').on('click', clickButton.bind(this, data, 'hair', 'medium'));
                d3.select('#shortHairBt').on('click', clickButton.bind(this, data, 'hair', 'short'));
            }

            renderGenderBlockAndButtons(_data, 'M');
            renderAgeBlockAndButtons(_data, 19);
            renderEducationBlockAndButtons(_data, 'master');
            renderHairBlockAndButtons(_data, 'long');
        })();
    });

})();
