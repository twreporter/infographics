(function() {

    function drawRecognitionChart(data, width, height, offset) {
        var userData = data.userData;

        var baseTS = userData[0].x.getTime();
        var tsDiff = userData[1].x.getTime() - userData[0].x.getTime();

        var scaleX = d3.time.scale()
            .range([0, width])
            .domain([userData[0].x, userData[userData.length - 1].x]);

        var scaleY = d3.scale.linear()
            .range([height, 0])
            .domain([0, 100]);

        var line = d3.svg.line()
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
                posX = posX <= userData[userData.length-1].x ? (posX < userData[0].x ? userData[0].x : posX) : userData[userData.length-1].x;
                posY = posY < 0 ? 0 : (posY > 100 ? 100 : posY);
                redrawPath(posX, posY);
                d3.event.preventDefault();
            });
            div.on('touchend', function() {
                drawIncompleteArea(userData, offset);
                div.on('touchmove', null).on('touchend', null);
            });
        }

        chart.append('rect')
            .attr('width', width)
            .attr('height', height)
            // .attr('x', offset)
            // .attr('y', offset)
            .attr('transform', 'translate(' + offset + ',' + offset + ')')
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
                if (i % 2 !== 0) {
                    return d3.time.format('%Y')(d);
                }
                return '';
            });

        var axisYGrid = d3.svg.axis()
            .scale(scaleY)
            .orient('left')
            .ticks(10)
            .tickSize(-width, 0);


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


        chart.append('path')
            .attr('class', 'incomplete-area');

        chart.append('path')
            .attr('class', 'user-path');


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
        }

        function drawIncompleteArea(data, offset) {
            // for drawing the last area.
            var _data = data.concat({
                x: 0,
                y: 0
            });

            chart.select('.incomplete-area')
                .attr('d', area(_data))
                .attr('transform', 'translate(' + offset + ',' + offset + ')')
                .on('mousedown', mousedown)
                .on('touchstart', touchstart)
                .on('click', click);
        }

        function drawPath(data, offset) {
            var c = chart.selectAll('circle').data(data, function(d, i) {
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
                        return 'translate(' + (scaleX(d.x) + offset) + ',' + (scaleY(d.y) + offset) + ')';
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

            chart.select('.user-path')
                .attr({
                    'd': line(data),
                    'fill': 'none',
                    'stroke': '#09c',
                    'stroke-width': '3.5px',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'transform': 'translate(' + offset + ',' + offset + ')'
                });
        }
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

    function draw(data) {
        var width = window.innerWidth;
        var offset = 50;
        drawRecognitionChart(data, width - (offset * 2), (width - offset * 2) / 3 * 2, offset);
    }

    var data = {
        userData: []
        /*
        stats: [{
            x: new Date(2002, 0, 1),
            y: 42
        }, {
            x: new Date(2004, 0, 1),
            y: 42
        }, {
            x: new Date(2005, 0, 1),
            y: 38.5
        }, {
            x: new Date(2008, 0, 1),
            y: 39.9
        }, {
            x: new Date(2011, 0, 1),
            y: 40.5
        }, {
            x: new Date(2012, 0, 1),
            y: 46.8
        }, {
            x: new Date(2014, 0, 1),
            y: 54.8
        }, {
            x: new Date(2015, 0, 1),
            y: 50.7
        }]
        */
    };
    for (var i = 2002; i < 2015; i = i + 1) {
        data.userData.push({
            x: new Date(i, 0, 1),
            y: null
        }, {
            x: new Date(i, 6, 1),
            y: null
        });
    }

    data.userData.push({
        x: new Date(2015, 0, 1),
        y: null
    });

    // start process
    optimizedResize.add(draw.bind(null, data));
    draw(data);
})();
