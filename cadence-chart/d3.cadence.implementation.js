// PLAN FOR ATTACK:

// 2) MAKE 2 AXIS CHART
// 2.1) MAKE 2nd axis into bars
// 3) ADD ZOOM function 


// ==========================================================


// Block
let margin = {top: 20, right: 40, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


const svg = d3.select('#cadence')
    .style('padding', '0 10px')
    .style('backgorund', '#ccc')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');

// Get the data
let chart = d3.json('cadence-data.json').then(data => {

    let time,
        numberOfStoryPointsScale,
        numberOfContributorsScale,
        numberOfStoryPoints,
        numberOfContributors,
        storyPointLine
    ;

    if (data) {


        data.forEach(function (d) {
            d.date = new Date(d.date);
        });


        // set the ranges

        // TIME
        let timeScale = d3.scaleTime().range([0, width]);
        

        // CONTRIBUTORS
        let contributorsScale = d3.scaleBand().range([height, 0]);
        // define the 1st line


        let contributorsBands = d3.band().domain(data);

            // d3.line()
            // .x(function(d) { return timeScale(d.date); })
            // .y(function(d) { return contributorsScale(d.contributors); });




        // STORY POINTS
        let storyPointsScale = d3.scaleLinear().range([height, 0]);
        // define the 2nd line
        let storyPointsLine = d3.line()
            .x(function(d) { return timeScale(d.date); })
            .y(function(d) { return storyPointsScale(d.storyPointsCompleted); });


        // Scale the range of the data
        timeScale.domain(d3.extent(data, function(d) { return d.date; }));

        // ADDING VALUES CONTRIBUTORS
        contributorsScale.domain([0, d3.max(data, function(d) {return Math.max(d.contributors);})]);

        // ADDING VALUE STORY POINTS
        storyPointsScale.domain([0, d3.max(data, function(d) {return Math.max(d.storyPointsCompleted); })]);

        // svg.append("path")
        //     .data([data])
        //     .attr("class", "line")
        //     .attr("d", contributorsLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", "red")
            .attr("d", storyPointsLine);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(timeScale));

        // Add the Y0 Axis
        svg.append("g")
            .attr("class", "axisSteelBlue")
            .call(d3.axisLeft(contributorsScale).ticks(10));

        // Add the Y1 Axis
        svg.append("g")
            .attr("class", "axisRed")
            .attr("transform", "translate( " + width + ", 0 )")
            .call(d3.axisRight(storyPointsScale));




    }

});
