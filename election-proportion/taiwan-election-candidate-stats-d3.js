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
                    tooltipDiv.style({
                        left: (absoluteMousePos[0] + 13) + 'px',
                        top: (absoluteMousePos[1] - 23) + 'px',
                        'background': 'rgba(255, 255, 255, 0.7)',
                        color: '#333',
                        padding: '5px',
                        'border-radius': '2px',
                        position: 'absolute',
                        'z-index': 1001,
                        'box-shadow': '0 1px 2px 0 rgba(0,0,0,0.4)'
                    });

                    var first_line = '<p>' + d.city + ', ' + d.district + '</p>'
                    var second_line;
                    if (d.num === '1') {
                        second_line = '<p>' + d.district_name + '</p>'
                    } else {
                        second_line = '<p>' + d.district_name + '</p>'
                    }
                    var third_line = '<p>' + d.lon + ',' + d.lat + ' <p>'

                    tooltipDiv.html(first_line + second_line + third_line)
                })
                .on('mousemove.tooltip', function() {
                    // Move tooltip
                    var absoluteMousePos = d3.mouse(bodyNode);
                    tooltipDiv.style({
                        left: (absoluteMousePos[0] + 13) + 'px',
                        top: (absoluteMousePos[1] - 23) + 'px'
                    });
                })
                .on('mouseout.tooltip', function() {
                    // Remove tooltip
                    tooltipDiv.remove();
                });
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

    function transferData(data) {
        var groupParty = function(party) {
            if (party === '中國國民黨') {
                return 'kmt';
            } else if (party === '民主進步黨') {
                return 'dpp';
            }
            return 'other';
        }
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

        return data.map(function(d) {
            d.party = groupParty(d.party);
            d.age = groupAge(d.age);
            d.education = changeEducationValue(d.education);
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
                return (d.length / data.length).toFixed(3);
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
                return (count / v.length).toFixed(3);
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


    d3.csv("./candidate.csv", function(error, rawData) {
        var data = transferData(rawData);
        // render taiwan election result by map
        (function() {
            var _splitData = splitData(data);
            var MAPWIDTH = 500;
            var MAPHEIGHT = 500;
            var xScale = d3.scale.linear().domain([0, 10]).range([50, 200]);
            var yScale = d3.scale.linear().domain([0, 10]).range([10, 200]);
            var projection = d3.geo.mercator()
                .center([120.9688063, 23.82887])
                .translate([MAPWIDTH / 2, MAPHEIGHT / 2])
                .scale(5000);

            var criteria = {};

            var districtMap = d3.select('.district-map').append('svg').attr('viewBox', '100 50 300 500');
            var nondistrictMap = d3.select('.nondistrict').append('svg').attr('viewBox', '0 0 300 150');
            var aboriginalMap = d3.select('.aboriginal').append('svg').attr('viewBox', '0 0 300 150');
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
                        return type === 'district' ? projection([d.lon, d.lat])[0] : xScale(d.pos % 20);
                    })
                    .attr("cy", function(d) {
                        return type === 'district' ? projection([d.lon, d.lat])[1] : yScale(Math.floor(d.pos / 20));
                    })
                    .attr('r', 4)
                    .style("fill", "#EEE")
                    .style("cursor", "pointer");
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
                        return type === 'district' ? projection([d.lon, d.lat])[0] : xScale(d.pos % 20);
                    })
                    .attr("cy", function(d) {
                        return type === 'district' ? projection([d.lon, d.lat])[1] : yScale(Math.floor(d.pos / 20));
                    })
                    .attr('r', 4)
                    .style("fill", "#4cc5dc")
                    .style("cursor", "pointer")
                    .style("stroke", "white")
                    .style('stroke-width', 0.1)
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
            var bgProportion = getBgProportion(data);
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
                            return '#4CC5E1';
                        }
                        return '#666';
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

            function clickAgeButton(data, age) {
                var className = '.age-' + age + '-bt';
                unselect('.age-proportion');
                select(className);
                renderBlock(data, 'age', age);
            }

            function clickEducationButton(data, education) {
                var className = '.education-' + education + '-bt';
                unselect('.education-proportion');
                select(className);
                renderBlock(data, 'education', education);
            }

            function renderBlock(data, key, value) {
                var proportion = getProportion(data, key, value);
                proportion.congress = getCongressProportion(data, key, value).congress;
                proportion.nation = getNationalProportion(key, value).nation;
                renderPercentage(proportion.nation * 100, 'nation', key);
                renderProportionBlock(['bgrect', proportion], 'nation', d3.select('.nation-' + key));
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
                d3.select('#twentyButton').on('click', clickAgeButton.bind(this, data, 19));
                d3.select('#thirtyButton').on('click', clickAgeButton.bind(this, data, 29));
                d3.select('#fortyButton').on('click', clickAgeButton.bind(this, data, 39));
                d3.select('#fiftyButton').on('click', clickAgeButton.bind(this, data, 49));
                d3.select('#sixtyButton').on('click', clickAgeButton.bind(this, data, 59));
            }

            function renderEducationBlockAndButtons(data, education) {
                renderBlock(data, 'education', education);
                d3.select('#masterButton').on('click', clickEducationButton.bind(this, data, 'master'));
                d3.select('#bachelorButton').on('click', clickEducationButton.bind(this, data, 'bachelor'));
                d3.select('#highSchoolButton').on('click', clickEducationButton.bind(this, data, 'highschool'));
                d3.select('#vocationalButton').on('click', clickEducationButton.bind(this, data, 'vocational'));
                d3.select('#otherButton').on('click', clickEducationButton.bind(this, data, 'other'));
            }

            renderGenderBlockAndButtons(data, 'M');
            renderAgeBlockAndButtons(data, 19);
            renderEducationBlockAndButtons(data, 'master');
        })();
    });

})();
