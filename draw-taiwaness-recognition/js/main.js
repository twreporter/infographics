(function() {

    var line;
    var scaleX;
    var scaleY;

    function drawRecognitionChart(data, width, height, offset) {
        var userData = data;

        var baseTS = userData[0].x.getTime();
        var tsDiff = userData[1].x.getTime() - userData[0].x.getTime();

        line = d3.svg.line()
            .defined(function(d, i) {
                return d.y !== null;
            })
            .x(function(d) {
                return scaleX(d.x);
            })
            .y(function(d) {
                return scaleY(d.y);
            })
            .interpolate('cardinal');

        var maxX = d3.max(userData, function(d) {
            return d.x
        });
        scaleX = d3.time.scale()
            .range([0, width])
            .domain([d3.min(userData, function(d) {
                return d.x
            }), maxX]);

        scaleY = d3.scale.linear()
            .range([height, 0])
            .domain([0, 80]);


        var area = d3.svg.area()
            .x(function(d, i) {
                //  for drawing last area
                if (i + 1 > userData.length) {
                    return scaleX(userData[userData.length - 1].x);
                }

                if (i > 0 && userData[i - 1] && userData[i - 1].y !== null) {
                    return scaleX(userData[i - 1].x);
                }
                return scaleX(userData[i].x);
            })
            .y0(0)
            .y1(function(d) {
                return scaleY(0);
            })
            .defined(function(d, i) {
                // take i element away from data only if i-1 element is pointed by user
                return d.y === null || (userData[i - 1] && userData[i - 1].y === null);
            });

        var svg = d3.select('svg').remove();
        svg.selectAll('*').remove();

        var chart = d3.select('.g-chart').append('svg')
            .attr('width', width + offset * 2)
            .attr('height', height + offset * 2)
            .append('g');

        function click() {
            var div = d3.select(this);
            var absoluteMousePos = d3.mouse(div.node());
            redrawPath(scaleX.invert(absoluteMousePos[0]), scaleY.invert(absoluteMousePos[1]));
            drawIncompleteArea(userData, offset);
            d3.event.preventDefault();
        }

        function mousedown() {
            var div = d3.select(this);
            d3.select(window)
                .on('mouseup', function() {
                    drawIncompleteArea(userData, offset);
                    div.on('mousemove', null);
                });
            div.on('mousemove', function() {
                var absoluteMousePos = d3.mouse(div.node());
                redrawPath(scaleX.invert(absoluteMousePos[0]), scaleY.invert(absoluteMousePos[1]));
                d3.event.preventDefault();
            });
        }

        function touchstart() {
            var div = d3.select(this);
            div.on('touchmove', function() {
                var absoluteMousePos = d3.mouse(div.node());
                var posX = scaleX.invert(absoluteMousePos[0]);
                var posY = scaleY.invert(absoluteMousePos[1]);
                posX = posX <= userData[userData.length - 1].x ? (posX < userData[0].x ? userData[0].x : posX) : userData[userData.length - 1].x;
                posY = posY < 0 ? 0 : (posY > 80 ? 80 : posY);
                redrawPath(posX, posY);
                d3.event.preventDefault();
            });
            div.on('touchend', function() {
                drawIncompleteArea(userData, offset);
                div.on('touchmove', null).on('touchend', null);
            });
        }

        chart.append('rect')
            .attr('width', width + 10)
            .attr('height', height)
            .attr('transform', 'translate(' + (offset -10) + ',' + offset + ')')
            .attr('class', 'bg')
            .on('mousedown', mousedown)
            .on('touchstart', touchstart)
            .on('click', click);


        var axisXGrid = d3.svg.axis()
            .scale(scaleX)
            .orient('bottom')
            .ticks(d3.time.year, 1)
            .tickSize(-height, 0)
            .tickFormat(function(d, i) {
                if (d >= maxX) {
                    return d3.time.format('%Y')(d);
                }
                if (i % 2 !== 0) {
                    return d3.time.format('%y')(d);
                }
                return '';
            });

        var axisYGrid = d3.svg.axis()
            .scale(scaleY)
            .orient('left')
            .ticks(10)
            .tickSize(-width, 0)
            .tickFormat(function(d) {
                return d + '%'
            });


        chart.append('g')
            .call(axisXGrid) //call axisX
            .attr({
                'fill': 'none',
                'stroke': 'rgba(0,0,0,.1)',
                'transform': 'translate(' + offset + ',' + (height + offset) + ')'
            }).selectAll('text')
            .attr({
                'fill': '#000',
                'storke': 'none'
            }).style({
                'font-size': '13px'
            });

        chart.append('g')
            .call(axisYGrid) //call axisY
            .attr({
                'fill': 'none',
                'stroke': 'rgba(0,0,0,.1)',
                'transform': 'translate(' + offset + ',' + offset + ')'
            }).selectAll('text')
            .attr({
                'fill': '#000',
                'storke': 'none'
            }).style({
                'font-size': '13px'
            });

        chart.append('g')
            .attr('class', 'line-label')
            .attr('transform', 'translate(' + offset + ',' + offset + ')');

        var pathGroup = chart.append('g')
            .attr('transform', 'translate(' + offset + ',' + offset + ')');

        pathGroup.append('path')
            .attr('class', 'incomplete-area');

        pathGroup.append('path')
            .attr('class', 'user-path');


        pathGroup.append('path')
            .attr('class', 'tw-recognition-path');

        pathGroup.append('path')
            .attr('class', 'ch-recognition-path');

        pathGroup.append('path')
            .attr('class', 'both-recognition-path');

        // if data is already set, and then draw it.
        for (var i = 0; i < userData.length; i++) {
            if (userData[i].y !== null) {
                drawPath(userData, offset);
                drawIncompleteArea(userData, offset);
                break;
            }
        }

        function redrawPath(date, y) {
            x = Math.round((date.getTime() - baseTS) / tsDiff);
            userData[x] = {
                x: userData[x].x,
                y: y
            };

            drawPath(userData, offset);

            var isDrawn = true;
            for (var i = 0; i < userData.length; i++) {
                if (userData[i].y === null) {
                    isDrawn = false;
                    break;
                }
            }
            if (isDrawn) {
                d3.select('#done').classed('done', true);
            }
        }

        function drawIncompleteArea(data, offset) {
            // for drawing the last area.
            var _data = data.concat({
                x: 0,
                y: 0
            });

            pathGroup.select('.incomplete-area')
                .attr('d', area(_data))
                .on('mousedown', mousedown)
                .on('touchstart', touchstart)
                .on('click', click);
        }


        function drawPath(data, offset) {
            var c = pathGroup.selectAll('circle').data(data, function(d, i) {
                return i;
            });
            var circleAttr = {
                'r': function(d) {
                    if (d.y === null) {
                        return 0;
                    } else {
                        return 4;
                    }
                },
                'class': 'circle',
                'transform': function(d) {
                    if (d.x !== null || d.y !== null) {
                        return 'translate(' + scaleX(d.x) + ',' + scaleY(d.y) + ')';
                    } else {
                        return 'translate(0 , 0)';
                    }
                }
            };
            c.exit().remove();
            c.enter()
                .append('circle')
                .attr(circleAttr);
            c.attr(circleAttr);

            pathGroup.select('.user-path')
                .attr({
                    'd': line(data),
                    'fill': 'none',
                    'stroke': '#333333',
                    'stroke-width': '3px',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round'
                });
        }
    }

    function drawUserData(data) {
        var width = window.innerWidth;
        drawRecognitionChart(data, width / 3 * 2, width / 3, width <= 320 ? 30 : 50);
    }

    var attr = {
        'fill': 'none',
        'stroke-width': '3px',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
    };

    function addTextToPath(x, y, fill, text) {
        var svg = d3.select('.line-label')
            .append('text')
            .attr('transform', 'translate(' + x + ',' + y + ')')
            .attr('text-anchor', 'start')
            .style('fill', fill)
            .text(text);
    }

    function doPathAnimation(path) {
        var totalLength = path.node().getTotalLength();
        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .ease("linear")
            .attr("stroke-dashoffset", 0);
    }

    function drawTWStats(data, doAnimation) {
        attr.d = line(data);
        attr.stroke = '#5F7E4F';
        var path = d3.select('.tw-recognition-path')
            .attr(attr);
        if (doAnimation) {
            doPathAnimation(path)
        };
        d3.select('#stats')
            .classed('ready', true);

        var last = data[data.length - 1];
        addTextToPath(scaleX(last.x), scaleY(last.y), '#5F7E4F', '台灣人');
    }

    function drawCHStats(data, doAnimation) {
        attr.d = line(data);
        attr.stroke = '#C2732C';
        var path = d3.select('.ch-recognition-path')
            .attr(attr);
        if (doAnimation) {
            doPathAnimation(path)
        };

        var last = data[data.length - 1];
        addTextToPath(scaleX(last.x), scaleY(last.y), '#C2732C', '中國人');
    }

    function drawBothStats(data, doAnimation) {
        attr.d = line(data);
        attr.stroke = '#508CAD';
        attr.id = 'bothpath'
        var path = d3.select('.both-recognition-path')
            .attr(attr);
        if (doAnimation) {
            doPathAnimation(path)
        };

        var last = data[data.length - 1];
        addTextToPath(scaleX(last.x), scaleY(last.y), '#508CAD', '都是');
    }


    function parseByGroup(data) {
        return d3.nest()
            .key(function(d) {
                return d.group;
            })
            .map(data);
    }

    function parseByOpinion(data) {
        var tw = [];
        var ch = [];
        var both = [];
        data.forEach(function(d) {
            tw.push({
                x: new Date(d.year, 0, 1),
                y: parseFloat(d.tw.replace('%', ''))
            });
            ch.push({
                x: new Date(d.year, 0, 1),
                y: parseFloat(d.ch.replace('%', ''))
            });
            both.push({
                x: new Date(d.year, 0, 1),
                y: parseFloat(d.both.replace('%', ''))
            });
        });
        return {
            tw: tw,
            ch: ch,
            both: both
        };
    }

    var optimizedResize = (function() {

        var callbacks = [],
            running = false;

        // fired on resize event
        function resize() {

            if (!running) {
                running = true;

                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(runCallbacks);
                } else {
                    setTimeout(runCallbacks, 66);
                }
            }

        }

        // run the actual callbacks
        function runCallbacks() {

            callbacks.forEach(function(callback) {
                callback();
            });

            running = false;
        }

        // adds callback to loop
        function addCallback(callback) {

            if (callback) {
                callbacks.push(callback);
            }

        }

        return {
            // public method to add additional callback
            add: function(callback) {
                if (!callbacks.length) {
                    window.addEventListener('resize', resize);
                }
                addCallback(callback);
            }
        };
    }());


    d3.csv('./data/recognition.csv', function(error, rawData) {
        function prepareInitUserData() {
            var userData = [];
            for (var i = 2002; i < 2015; i = i + 1) {
                userData.push({
                    x: new Date(i, 0, 1),
                    y: null
                }, {
                    x: new Date(i, 6, 1),
                    y: null
                });
            }

            userData.push({
                x: new Date(2015, 0, 1),
                y: null
            });
            return userData;
        }

        var grouped = parseByGroup(rawData);
        var userData = prepareInitUserData();
        Object.keys(grouped).forEach(function(g) {
            grouped[g] = parseByOpinion(grouped[g]);
        });

        drawUserData(userData);

        // draw user drawn path
        optimizedResize.add(drawExistingPath);

        function drawExistingPath() {
            var path = d3.select('.user-path').node();
            var userFlag = false;
            var twFlag = false;
            var chFlag = false;
            var bothFlag = false;
            if (path && path.getTotalLength() > 0) {
                userFlag = true;
            }

            path = d3.select('.tw-recognition-path').node();
            if (path && path.getTotalLength() > 0) {
                twFlag = true;
            }

            path = d3.select('.ch-recognition-path').node();
            if (path && path.getTotalLength() > 0) {
                chFlag = true;
            }

            path = d3.select('.both-recognition-path').node();
            if (path && path.getTotalLength() > 0) {
                bothFlag = true;
            }

            var id = d3.select('.group-selection .selected').attr('id');
            id = id.replace('select_', '');

            if (userFlag) {
                drawUserData(userData);
            } else {
                drawUserData(prepareInitUserData());
            }
            if (twFlag) {
                drawTWStats(grouped[id].tw);
            }
            if (chFlag) {
                drawCHStats(grouped[id].ch);
            }
            if (bothFlag) {
                drawBothStats(grouped[id].both);
            }
        }

        function makeNotDone() {
            d3.select('#done').classed('done', false);
            d3.select('#stats').classed('ready', false);
        }

        function prepareSelection(id) {
                d3.select('#' + id).on('click', function() {
                    var selection = d3.select(this);
                    if (!selection.classed('selected')) {
                        d3.select('.group-selection .selected').classed('selected', false);
                        selection.classed('selected', true);
                        drawUserData(prepareInitUserData());
                        makeNotDone();
                    }
                });
            }
            // group selection
            ['select_1951_1965', 'select_1966_1980', 'select_after_1980', 'select_before_1950'].forEach(function(d) {
                prepareSelection(d);
            });

        // done and reset
        d3.select('#done').on('click', function() {
            var div = d3.select(this);
            if (div.classed('done')) {
                var id = d3.select('.group-selection .selected').attr('id');
                id = id.replace('select_', '');
                d3.select('.g-chart rect').on('click', null).on('mousedown', null).on('touchstart', null);
                drawTWStats(grouped[id].tw, true);
            }
        });

        d3.select('#reset').on('click', function() {
            drawUserData(prepareInitUserData());
            makeNotDone();
        });

        d3.select('#stats').on('click', function() {
            var div = d3.select(this);
            if (div.classed('ready')) {
                var id = d3.select('.group-selection .selected').attr('id');
                id = id.replace('select_', '');
                d3.select('.user-path').remove();
                d3.selectAll('circle').remove();
                d3.select('rect').remove();
                drawCHStats(grouped[id].ch, true);
                drawBothStats(grouped[id].both, true);
            }
        });
    });

})();
