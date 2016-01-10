(function() {
    var WIDTH = 150;
    var HEIGHT = 150;
    var SQUARE = 22500; // HEIGHT * WIDTH

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

        data.map(function(d) {
            d.party = groupParty(d.party);
            d.age = groupAge(d.age);
            d.education = changeEducationValue(d.education);
            return d;
        });
        return data;
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

    d3.csv("/infographics/election-proportion/candidate.csv", function(error, data) {
        var KMT = '中國國民黨';
        var TPP = '民主進步黨';
        var OTHER = '其他政黨';
        data = transferData(data);
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

    });
})()
