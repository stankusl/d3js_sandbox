// Margins
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

        // TIME SCALE
        let timeScale = d3.scaleTime()
            .range([0, width])
            .domain(d3.extent(data, function(d) { return d.date; }))
        ;

        // CONTRIBUTORS SCALE
        let contributorsScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, function(d) {return Math.max(d.contributors);}) ])
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

        // AXIES
        let xAxis = d3.axisBottom(timeScale);
        let yAxis = d3.axisLeft(contributorsScale).ticks(5);
        let y2Axis = d3.axisRight(storyPointsScale).ticks(10);

        // ZOOM FUNCTION
        let zoom = d3.zoom()
            .on('zoom', zoomFunction)
        ;


        // Inner Drawing Space
        let innerSpace = svg.append('g')
            .attr('class', 'inner_space')
            .attr('fill', 'white')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top - 10 + ')')
            .call(zoom)
        ;


        function zoomFunction() {
            // create new scale ojects based on event
            let new_xScale = d3.event.transform.rescaleX(timeScale);
            let new_yScale = d3.event.transform.rescaleY(contributorsScale);
            let new_y2Scale = d3.event.transform.rescaleY(storyPointsScale);

            console.log(d3.event.transform)

            // update axes
            gX.call(xAxis.scale(new_xScale));
            gY.call(yAxis.scale(new_yScale));
            gY2.call(y2Axis.scale(new_y2Scale));

            // update circle
            // 1) UPDATE BAR CHARTS !
            // 2) UPDATE LINE!
            bars.attr('transform', d3.event.transform)
            storyPoints.attr('transform', d3.event.transform)
        }

        // Draw Axis
        let gX = innerSpace.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(timeScale);

        let gY = innerSpace.append('g')
            .attr('class', 'axis axis--y')
            .call(contributorsScale);


        let gY2 = innerSpace.append('g')
            .attr('class', 'axis axis--y2')
            .attr('transform', 'translate(900,-20)')
            .call(contributorsScale);

        // append zoom area
        let view = innerSpace.append('rect')
            .attr('class', 'zoom')
            .attr('width', width)
            .attr('height', height)
            .call(zoom);

        let bars = innerSpace.selectAll('.bar')
            .data(data.map(item => { return item })).enter()
                .append('rect')
                .attr('x', function(d) { return timeScale(d.date) - (width / data.length) / 2; } )
                .attr('y', function(d) { return contributorsScale(d.contributors); })
                .attr('width', (width / data.length) )
                .attr('height', function(d) { return height - contributorsScale(d.contributors); } )
                .attr('class', 'bar-contributors');

        let storyPoints = innerSpace.append('path')
            .data([data])
                .attr('class', 'line')
                .style('stroke', '#f26c52')
                .attr('d', storyPointsLine);

        // bars = svg.selectAll('.bar')
        //     .data(data.map(item => { return item })).enter()
        //     .append('rect')
        //     .attr('x', function(d) { return timeScale(d.date) - (width / data.length) / 2; } )
        //     .attr('y', function(d) { return contributorsScale(d.contributors); })
        //     .attr('width', (width / data.length) )
        //     .attr('height', function(d) { return height - contributorsScale(d.contributors); } )
        //     .attr('class', 'bar-contributors')
        // ;

        // Add the X Axis
        // svg.append('g')
        //     .attr('transform', 'translate(0,' + height + ')')
        //     .call(xAxis);

        // // Add the Y0 Axis
        // svg.append('g')
        //     .attr('class', 'axisSteelBlue')
        //     .attr('transform', 'translate( ' + -35 + ', 0 )')
        //     .call(yAxis);

        // // Add the Y1 Axis
        // svg.append('g')
        //     .attr('class', 'axisRed')
        //     .attr('transform', 'translate( ' + (width + 35 ) + ', 0 )')
        //     .call(d3.axisRight(storyPointsScale).ticks(10));

    } else {
        console.log('failed to load data!');
    }

}