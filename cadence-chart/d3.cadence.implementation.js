// ADD PANNING FUNCTION
// ADD ZOOMING FUNCTION

// SPLIT CODE TO MORE SMALLER FUNCTIONS

// Block
let margin = {top: 20, right: 80, bottom: 30, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

let data;


// Get the data
d3.json('cadence-data.json')
    .then( json  => {
        data = json;
        main();
    })
    .catch(error => {
        if (error) return console.warn(error);
    })
;


function main() {

    let
        bars = []
    ;


    // Main Select
    const svg = d3.select('#cadence')
        .style('padding', '0 10px')
        .style('backgorund', '#ccc')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
            'translate(' + margin.left + ',' + margin.top + ')');

    if (data) {


        // Process string to date object
        data.forEach(function (d) {
            d.date = new Date(d.date);
        });

        // 1) SETUP X AXIS AS TIME
        // TIME
        let timeScale = d3.scaleTime()
            .range([0, width])
            .domain(d3.extent(data, function(d) { return d.date; }))
        ;

        // CONTRIBUTORS
        let contributorsScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, function(d) {return Math.max(d.contributors);}) ])
        ;


        bars = svg.selectAll('.bar')
            .data(data.map(item => { return item })).enter()
            .append('rect')
            .attr('x', function(d) { return timeScale(d.date) - (width / data.length) / 2; } )
            .attr('y', function(d) { return contributorsScale(d.contributors); })
            .attr('width', (width / data.length) )
            .attr('height', function(d) { return height - contributorsScale(d.contributors); } )
            .attr('class', 'bar-contributors')
        ;

        // STORY POINTS SCALE
        let storyPointsScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, function(d) {return Math.max(d.storyPointsCompleted); })])
        ;

        // STORY POINTS LINE PATH
        let storyPointsLine = d3.line()
            .x(function(d) { return timeScale(d.date); })
            .y(function(d) { return storyPointsScale(d.storyPointsCompleted); })
            .curve(d3.curveCatmullRom.alpha(0.1))
        ;

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", "#f26c52")
            .attr("d", storyPointsLine);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(timeScale));

        // Add the Y0 Axis
        svg.append("g")
            .attr("class", "axisSteelBlue")
            .attr("transform", "translate( " + -35 + ", 0 )")
            .call(d3.axisLeft(contributorsScale).ticks(5));

        // Add the Y1 Axis
        svg.append("g")
            .attr("class", "axisRed")
            .attr("transform", "translate( " + (width + 35 ) + ", 0 )")
            .call(d3.axisRight(storyPointsScale).ticks(10));

    } else {
        console.log('failed to load data!');
    }

}