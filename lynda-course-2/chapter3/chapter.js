let svgnumber1 = d3.select('body')
    .append('svg')
        .attr('class', 'svg-block')
        .attr('class', 'first-svg')
        .attr('width', '500px')
        .attr('height', '500px')


// ============================================ RECT ===================================================================

let rectangularData = [10, 20, 17, 8];

let rectGraph = d3.select('.rectangular');

            rectGraph.selectAll('rect')
                    .data(rectangularData).enter()
                    .append('rect')
                        .attr('height', function(data, index) { return data * 15 })
                        .attr('width', '20')
                        .attr('fill', 'pink')
                        .attr('x', function(data, index) { return (20 * index) } )
                        .attr('y', function(data, index) { return 500 - (data * 15 ) })
                        .attr('transform', function (d, i) { return 'translate(' + i * 5 + ',0)' })
            ;

// ============================================ CIRCLE =================================================================
let circleData = [10, 20, 50, 3];

let circleGraph = d3.select('.circle');

let newX = 30;

    circleGraph.selectAll('circle')
            .data(circleData).enter()
            .append('circle')
                .attr('cx', function (data, index) { return newX += data * 2 * 2})
                .attr('cy', 100)
                .attr('r', function(data, index) { return 2 * data })
                .attr('fill', 'green')
    ;



// ============================================ ELLIPSE ================================================================
let ellipseData = [10, 20, 50, 3];

let ellipseGraph = d3.select('.ellipse');
let ellipseVar = 40;

    ellipseGraph.selectAll('ellipse')
        .data(ellipseData).enter()
            .append('ellipse')
                .attr('cx', function (data, index) { return ellipseVar += data * 2 * 2})
                .attr('cy', 100)
                .attr('rx', function(data, index) { return 1.3 * data })
                .attr('ry', function(data, index) { return 20 })
                .attr('fill', 'blue')
    ;

// ============================================ LINE  ==================================================================
let lineData = [1, 20, 4, 22, 7, 12];

let lineGraph = d3.select('.line');
let accumulatedY = 0;

lineGraph.selectAll('line')
    .data(lineData).enter()
    .append('line')
        .attr('stroke', 'blue')
        .attr('stroke-width', 3)
        .attr('y1', function (data, index) { return accumulatedY += (20 + index * 20) } )
        .attr('x1', function(data, index) { return 20 + ( data * 20 ) })
        .attr('x2', function(data, index) { return 1.3 * data })
        .attr('y2', function(data, index) { return accumulatedY += (20 + index * 20) })
;

// ============================================ TEXT  ==================================================================
let textData = 'This is 22!';

let textGraph = d3.select('.text');

textGraph.append('text')
    .attr('x', '10')
    .attr('y', '20')
    .attr('font-size', '20')
    .attr('bill', 'green')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .text(textData)
;

textGraph.append('text')
    .attr('x', '10')
    .attr('y', '50')
    .attr('font-size', '20')
    .attr('bill', 'green')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .text(textData)
;

textGraph.append('text')
    .attr('x', '10')
    .attr('y', '100')
    .attr('font-size', '20')
    .attr('bill', 'green')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .text(textData)
;

// ============================================ PATH  ==================================================================
let pathData = [{x: 0, y: 10}, {x: 5, y: 8 }, {x: 10, y: 120},{x: 15, y: 12},{x: 30, y: 3},{x: 45, y: 7} ];

let pathGraph = d3.select('.path');

var lineGenerator = d3.line()
    .x(function(data, index) {
        return data.x * 6;
    })
    .y(function(data, index) {
        return data.y * 4;
    })
    .curve(d3.curveCardinal);

pathGraph.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('d', lineGenerator(pathData));


;