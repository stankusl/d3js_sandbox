// D3 implementation
var bardata = [20,30,45,15, 22, 33, 99];
var height = 400,
    width = 300,
    barWidth = 50,
    barOffset = 5;

var yScale = d3.scaleLinear().domain([0, d3.max(bardata)]).range([0, height]);

var xScale = d3.scaleBand().domain(bardata).paddingInner(.2).paddingOuter(.1).range([0, width]);

var colorScale = d3.scaleLinear().domain([ 0, d3.max(bardata) ]).range(['#FFB832', '#C61C6F']);

var yAxisValues = d3.scaleLinear().domain([ 0, d3.max(bardata) ]).range([height, 0]);
var yAxisTicks = d3.axisLeft(yAxisValues).ticks(10);



var tooltip = d3.select('body')
                .append('div')
                .style('position', 'absolute')
                .style('padding', '0 10px')
                .style('backgorund', '#ccc')
                .style('opacity', 0)


// This is step 1
var myChart = d3.select('#viz').append('svg')
    .attr('wdith', width)
    .attr('height', height)
    .style('background', '#C9D7D6')
    .append('g')
    .selectAll('rect').data(bardata)
        .enter().append('rect')
        .style('fill', function(d) {
            return colorScale(d);
        })
        .attr('width', function(d) {
            return xScale.bandwidth();
        })
        .attr('height', 0)
        .attr('y', 0)
        .attr('x', function(d) {
            return xScale(d);
        })
        .on('mouseover', function(d) {

            tooltip.transition().duration(200).style('opacity', 1);

            tooltip.html(d)
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top', (d3.event.pageY - 35) + 'px')

            d3.select(this).style('opacity', .3);
        }) 
        .on('mouseout', function(d) {
            d3.select(this).style('opacity', 1);
        });

        yGuide = d3.select('#viz svg').append('g')
        .attr('transform', 'translate(20,0)')
        .call(yAxisTicks);

myChart.transition()
.delay(function(d,i) {
    return i*20;
})
.attr('height', function(d){
    return yScale(d);
})
.attr('y', function(d) {
    return height - yScale(d)
})
.duration(1000)
.ease(d3.easeBounceOut)
