let margin = {top: 30, right: 40, bottom: 30, left: 50};
let width = 1250 - margin.left - margin.right;
let height = 300 - margin.top - margin.bottom;

let x = d3.scale.ordinal().rangeRoundBands([0, width], 0.2, 0.2);
let	y = d3.scale.linear().range([height, 0]);

 let	xAxis = d3.svg.axis().scale(x).orient('bottom');

let	yAxis = d3.svg.axis().scale(y).orient('left');

let	valueline = d3.svg.line()
	.x(function(d) { return x(d.Year); })
	.y(function(d) { return y(d.ARRESTED); });

let	valueline2 = d3.svg.line()
	.x(function(d) { return x(d.Year); })
	.y(function(d) { return y(d.NOT_ARRESTED); });

let	svg = d3.select('#multiline')
	.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
	.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Get the data
d3.json('../outputdata/outputJsonYuvashree2.json', function(error, data) {
	data.forEach(function(d) {
		d.Year = d.Year;
		d.ARRESTED = +d.ARRESTED;
		d.NOT_ARRESTED = +d.NOT_ARRESTED;
	});

  x.domain(data.map(function(d) {
      return d.Year;
  }));

  y.domain([0, d3.max(data, function(d) { return Math.max(d.ARRESTED, d.NOT_ARRESTED); })]);
// Add the valueline path.
	svg.append('path')
		.attr('class', 'line')
    .style('stroke', 'red')
		.attr('d', valueline(data));
// Add the valueline2 path.
	svg.append('path')
		.attr('class', 'line')
		.style('stroke', 'green')
		.attr('d', valueline2(data));
// Add the X Axis
	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis);
// Add the Y Axis
	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis);

	svg.append('text')
		.attr('transform', 'translate(' + (width + 3) + ',' + y(data[0].ARRESTED) + ')')
		.attr('dy', '.35em')
		.attr('text-anchor', 'start')
		.style('fill', 'red')
		.text('ARRESTED');

	svg.append('text')
		.attr('transform', 'translate(' + (width + 3) + ',' + y(data[0].NOT_ARRESTED) + ')')
		.attr('dy', '.35em')
		.attr('text-anchor', 'start')
		.style('fill', 'green')
		.text('NOT_ARRESTED');
// console.log(data.length-1);
// console.log(data[data.length-1].open);
// console.log(data[0].open);
// console.log(y(data[0].open));
// console.log(y(data[0].close));
});
