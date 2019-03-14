var dataP = d3.json("classData.json");

var drawBarChart = function(data)
{
  var screen = { //the size of svg
    width: 600,
    height: 300
  }

  var margins = {
    left: 50,
    top: 20,
    bottom: 40,
    right: 0
  }

  var innerPadding = 10; //space between bars

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var barWidth = width/data.length;

  var xScale = d3.scaleLinear()
                 .domain([0, data.length])
                 .range([margins.left, width]);

  var yScale = d3.scaleLinear()
                 .domain([0, 100])
                 .range([height, margins.top]);

  var svg = d3.select("svg")
              .attr("width", screen.width)
              .attr("height", screen.height)

  svg.selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {return i * barWidth + margins.left; } )
     .attr("y", function(d) {return yScale(mathFunction(d));} )

}

var mathFunction = function(d)
{
  console.log(d.final.grade);
}

dataP.then(function(data)
{
  drawBarChart(data); //Final grade of each penguin
},
function(err)
{
  console.log(err);
});
