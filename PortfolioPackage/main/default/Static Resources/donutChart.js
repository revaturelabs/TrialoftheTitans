
window.DonutChart = function(id, data, options) {
	console.log('In the DonutChart function');

	d3.select(id).select("svg").remove();
	var svg = d3.select(id).append("svg");
	console.log('got past select');
	console.log(svg);
}