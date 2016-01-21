(function() {

    var TICKS = 10;
    var INTERVAL = 100 / (TICKS * 2);
    var data = [];
    for (var i = 0; i <= TICKS * 2; i = i + 1) {
        var item = {
            x: null,
            y: null
        };
        data.push(item);
    }

    var width = 950;
    var height = 550;
    var offset = 70;

    var scaleX = d3.scale.linear()
        .range([0, width])
        .domain([0, 100]);

    var scaleY = d3.scale.linear()
        .range([height, 0])
        .domain([0, 100]);

    var line = d3.svg.line()
        .defined(function(d, i) {
            return d.x !== null && d.y !== null;
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
            if (data[i - 1] && data[i - 1].x !== null) {
                return scaleX((i - 1) * INTERVAL)
            }
            return scaleX(i * INTERVAL);
        })
        .y0(0)
        .y1(function(d) {
            return scaleY(0);
        })
        .defined(function(d, i) {
            // take i element away from data only if i-1 element is pointed by user
            return d.x === null || (data[i -1] && data[i - 1].x === null);
        });

    var chart = d3.select('.g-chart')
        .append('svg')
        .attr('width', width + offset * 2)
        .attr('height', height + offset * 2)
        .append('g');

    function click() {
        var div = d3.select(this);
        var absoluteMousePos = d3.mouse(div.node());
        redrawPath(scaleX.invert(absoluteMousePos[0]), scaleY.invert(absoluteMousePos[1]));
    }

    function mousedown() {
        var div = d3.select(this);
        d3.select(window)
            .on('mouseup', function() {
                div.on('mousemove', null).on('mouseup', null);
            });
        div.on('mousemove', function() {
            var absoluteMousePos = d3.mouse(div.node());
            redrawPath(scaleX.invert(absoluteMousePos[0]), scaleY.invert(absoluteMousePos[1]));
        });
        div.on('mouseup', function() {
            div.on('mousemove', null).on('mouseup', null);
        });
    }

    function touchstart() {
        var div = d3.select(this);
        div.on('touchmove', function() {
            var absoluteMousePos = d3.mouse(div.node());
            redrawPath(scaleX.invert(absoluteMousePos[0]), scaleY.invert(absoluteMousePos[1]));
        });
        div.on('touchend', function() {
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
        .on('click', click)
        .on('mousedown', mousedown)
        .on('touchstart', touchstart);


    var axisXGrid = d3.svg.axis()
        .scale(scaleX)
        .orient('bottom')
        .ticks(TICKS)
        .tickSize(-height, 0);

    var axisYGrid = d3.svg.axis()
        .scale(scaleY)
        .orient('left')
        .ticks(TICKS)
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

    function redrawPath(x, y) {
        x = Math.round(x / INTERVAL);
        data[x] = {
            x: x * INTERVAL,
            y: y
        };

        drawPath(data, offset);
        drawIncompleteArea(data, offset);
    }

    function drawIncompleteArea(data, offset) {
        chart.select('.incomplete-area')
            .attr('d', area(data))
            .attr('transform', 'translate(' + offset + ',' + offset + ')')
            .on('click', click)
            .on('mousedown', mousedown)
            .on('touchstart', touchstart);
    }

    function drawPath(data, offset) {
        var c = chart.selectAll('circle').data(data, function(d, i) {
            return i;
        });
        var circleAttr = {
            'r': function(d) {
                if (d.x === null && d.y === null) {
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

})();
