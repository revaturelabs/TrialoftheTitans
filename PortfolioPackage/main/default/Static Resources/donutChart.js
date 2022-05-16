
window.DonutChart = function(id, data, options) {
	/*console.log('In the DonutChart function');

	d3.select(id).select("svg").remove();
	const svg = d3.select(id).append("svg");
	console.log('got past select');
	console.log(svg);*/
	const width = 300;
	const height = 300;
	const radius = Math.min(width, height) / 2;

	const svg = d3.select(id).append("svg").attr('width', width).attr('height', height).attr('margin',{top: 20, right: 20, bottom: 20, left: 20})
	.append("g").attr("transform", `translate(${width / 2},${height / 2})`);
				//.attr('width', 500)
				//.attr('height', 500);

	const color = d3.scaleOrdinal().range(['#e40303','#ff8c00', '#ffed00', '#008026','#004dff','#750787']);

	const pie = d3.pie().value(d=>d[1]);

	const data_ready = pie(Object.entries(data));

	svg
		.selectAll('div')
		.data(data_ready)
		.join('path')
		.attr('d', d3.arc()
			.innerRadius(100)         // This is the size of the donut hole
			.outerRadius(radius)
		)
		.attr('fill', d=> color(d.data[0]))
		.attr("stroke", "black")
		.style("stroke-width", "2px")
		.style("opacity", 0.7);

	console.log('we did it');
}