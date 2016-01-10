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
    var width = 500,
        height = 500;

    var y = d3.scale.linear()
        .range([0, height]);

    var x = d3.scale.linear()
        .range([0, width])


    var chart = d3.select(".chart");

    d3.csv("geo.csv", function(error, data) {
        var minLon = d3.median(data, function(d) {
            return d.lon
        });
        var minLat = d3.median(data, function(d) {
            return d.lat
        });

        var projection = d3.geo.mercator()
            .center([120.9688063, 23.82887])
            .translate([width/2, height/2])
            .scale(8000)

        chart.selectAll("g")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "circle")
            .attr("x", function(d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr("y", function(d) {
                return projection([d.lon, d.lat])[1];
            })
            .attr("width", function(d) {
                return 10;
            })
            .attr("height", function(d) {
                return 10;
            })
            .style("fill", "#1A80C4")
            .style("stroke", "white")
            .style("stroke-width", "0.25")
            .style("cursor", "pointer")
            .call(d3.helper.tooltip());

    });

})();
