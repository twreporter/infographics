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
            if (party === '中國國民黨' || party === '民主進步黨') {
                return party;
            }
            return '其他政黨';
        }
        var groupAge = function(age) {
            for (var i = 60; i >= 20; i = i - 10) {
                if (age > i) {
                    return i;
                }
            }
        };
        var changeEducationValue = function(education) {
            switch (education) {
                case '博士':
                    return 'dr';
                case '碩士':
                    return 'master';
                case '大學':
                    return 'bachelor';
                case '高中':
                    return 'highschool';
                case '專科':
                    return 'vocational';
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

    d3.csv("/infographics/election-proportion/candidate.csv", function(error, rawData) {
        var data = transferData(rawData);

        // render taiwan election result by map
        (function() {
            var MAPWIDTH = 500;
            var MAPHEIGHT = 500;
            var projection = d3.geo.mercator()
                .center([120.9688063, 23.82887])
                .translate([MAPWIDTH / 2, MAPHEIGHT / 2])
                .scale(5000);

            var criteria = {};

            var taiwanMap = d3.select('.taiwan-geo').attr('viewBox', '100 100 500 500');
            var districtGroupGray = taiwanMap.append('g').attr('class', 'district-group-gray');
            var nondistrictGroupGray = taiwanMap.append('g').attr('class', 'nondistrict-group-gray');
            var districtGroup = taiwanMap.append('g').attr('class', 'district-group');
            var nondistrictGroup = taiwanMap.append('g').attr('class', 'nondistct-group-gray');
            var renderBg = function(data) {
                districtGroupGray.selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('class', 'rects')
                    .attr("x", function(d) {
                        return projection([d.lon, d.lat])[0];
                    })
                    .attr("y", function(d) {
                        return projection([d.lon, d.lat])[1];
                    })
                    .attr("width", function(d) {
                        return 5;
                    })
                    .attr("height", function(d) {
                        return 5;
                    })
                    .style("fill", "#EEE")
                    .style("cursor", "pointer");
            }

            var renderFilteredData = function(data, criteria) {
                var filtered = filterData(data, criteria);
                var rects = districtGroup.selectAll('rect')
                    .data(filtered, function(d) {
                        return d.name;
                    });

                rects.enter()
                    .append('rect')
                    .attr('class', 'selected-rects')
                    .attr("x", function(d) {
                        return projection([d.lon, d.lat])[0];
                    })
                    .attr("y", function(d) {
                        return projection([d.lon, d.lat])[1];
                    })
                    .attr("width", function(d) {
                        return 5;
                    })
                    .attr("height", function(d) {
                        return 5;
                    })
                    .style("fill", "#4cc5dc")
                    .style("cursor", "pointer")
                    .style("stroke", "white")
                    .style('stroke-width', 0.1)
                    .call(d3.helper.tooltip());
                rects.exit().remove();
            }

            var renderButton = function(data) {
                function helper(type, i) {
                    if (criteria[type] === i) {
                        delete criteria[type];
                    } else {
                        criteria[type] = i;
                    }
                    renderFilteredData(data, criteria);
                }
                d3.select('#male').on('click', function() {
                    if (criteria.gender === 'M') {
                        delete criteria.gender;
                    } else {
                        criteria.gender = 'M';
                    }
                    renderFilteredData(data, criteria);
                });
                d3.select('#female').on('click', function() {
                    if (criteria.gender === 'F') {
                        delete criteria.gender;
                    } else {
                        criteria.gender = 'F';
                    }
                    renderFilteredData(data, criteria);
                });
                for (var i = 20; i < 70; i = i + 10) {
                    d3.select('#age-' + i).on('click', helper.bind(this, 'age', i));
                }
                ['highschool', 'vocational', 'bachelor', 'master', 'dr'].forEach(function(education) {
                    d3.select('#edu-' + education).on('click', helper.bind(this, 'education', education));
                });
            }
            renderButton(data);
            renderBg(data);
            renderFilteredData(data);
        })();

        // render election result by proportion square
        (function() {
            var WIDTH = 150;
            var HEIGHT = 150;
            var SQUARE = 22500; // HEIGHT * WIDTH
            var KMT = '中國國民黨';
            var TPP = '民主進步黨';
            var OTHER = '其他政黨';
            var bgProportion = getBgProportion(data);
            // var rectScale = d3.scale.linear().domain([0, 1]).range([0, HEIGHT]);

            function renderProportionBlock(data, party, node) {
                var PARTY;
                if (party === 'kmt') {
                    PARTY = KMT;
                } else if (party === 'tpp') {
                    PARTY = TPP;
                } else {
                    PARTY = OTHER;
                }

                var calculate = function(d) {
                    if (d.hasOwnProperty(PARTY)) {
                        return Math.sqrt(SQUARE * d[PARTY] * bgProportion[PARTY]);
                    }
                    return Math.sqrt(SQUARE * bgProportion[PARTY]);
                }

                var rect = node.selectAll('rect')
                    .data(data);
                rect.enter()
                    .append('rect')
                    .attr('width', calculate)
                    .attr('height', calculate)
                    .attr('y', function(d) {
                        return HEIGHT - (SQUARE * bgProportion[PARTY]);
                    })
                    .style("fill", function(d) {
                        if (d.hasOwnProperty(PARTY)) {
                            return '#4CC5E1';
                        }
                        return '#666';
                    })

                rect.transition()
                    .attr('width', calculate)
                    .attr('height', calculate)
                    .attr('y', function(d) {
                        if (d.hasOwnProperty(PARTY)) {
                            return HEIGHT - (Math.sqrt(SQUARE * d[PARTY] * bgProportion[PARTY]));
                        }
                        return HEIGHT - (Math.sqrt(SQUARE * bgProportion[PARTY]));
                    })
                    .duration(500);
            }

            function clickGenderButton(data, gender) {
                renderBlock(data, 'gender', gender);
            }

            function clickAgeButton(data, age) {
                renderBlock(data, 'age', age);
            }

            function clickEducationButton(data, education) {
                renderBlock(data, 'education', education);
            }

            function renderBlock(data, key, value) {
                var genderData = getProportion(data, key, value);
                renderProportionBlock(['bgrect', genderData], 'kmt', d3.select('.kmt-' + key));
                renderProportionBlock(['bgrect', genderData], 'tpp', d3.select('.tpp-' + key));
                renderProportionBlock(['bgrect', genderData], 'other', d3.select('.other-' + key));
            }

            function renderGenderBlockAndButtons(data, gender) {
                renderBlock(data, 'gender', gender);
                d3.select('#maleButton').on('click', clickGenderButton.bind(this, data, 'M'));
                d3.select('#femaleButton').on('click', clickGenderButton.bind(this, data, 'F'));
            }


            function renderAgeBlockAndButtons(data, age) {
                renderBlock(data, 'age', age);
                d3.select('#twentyButton').on('click', clickAgeButton.bind(this, data, 20));
                d3.select('#thirtyButton').on('click', clickAgeButton.bind(this, data, 30));
                d3.select('#fortyButton').on('click', clickAgeButton.bind(this, data, 40));
                d3.select('#fiftyButton').on('click', clickAgeButton.bind(this, data, 50));
                d3.select('#sixtyButton').on('click', clickAgeButton.bind(this, data, 60));
            }

            function renderEducationBlockAndButtons(data, education) {
                renderBlock(data, 'education', education);
                d3.select('#drButton').on('click', clickEducationButton.bind(this, data, 'dr'));
                d3.select('#masterButton').on('click', clickEducationButton.bind(this, data, 'master'));
                d3.select('#bachelorButton').on('click', clickEducationButton.bind(this, data, 'bachelor'));
                d3.select('#highSchoolButton').on('click', clickEducationButton.bind(this, data, 'highschol'));
                d3.select('#vocationalButton').on('click', clickEducationButton.bind(this, data, 'vocational'));
            }

            renderGenderBlockAndButtons(data, 'M');
            renderAgeBlockAndButtons(data, 50);
            renderEducationBlockAndButtons(data, 'master');
        })();
    });

})();
