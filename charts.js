var dataP = d3.json("classData.json");

var drawBarChart = function(data)
{
  var screen = { //the size of svg
    width: 1200,
    height: 400
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

  var colors = d3.scaleOrdinal(d3.schemeCategory10)

  svg.selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {return i * barWidth + margins.left; } )
     .attr("y", function(d) {return yScale(mathFunction(d));} )
     .attr("width", barWidth - innerPadding)
     .attr("height", function(d) {return height - yScale(mathFunction(d));})
     .attr("fill", function(d,i){return colors(i)})

}

var mathFunction = function(d)
{
  // console.log(d.final[0].grade);
  var final = d.final[0].grade;
  // console.log(final)
  var total_homework = 0
  d.homework.forEach(function(d){total_homework += d.grade});
  // console.log(total_homework)
  var homework = (total_homework / 19) * 2;
  // console.log(homework);
  var total_quiz = 0
  d.quizes.forEach(function(d){total_quiz += d.grade})
  // console.log(total_quiz)
  var quiz = (total_quiz / 38) * 10
  // console.log(quiz)
  var total_test = 0
  d.test.forEach(function(d){total_test += d.grade})
  var test = total_test / 2
  // console.log(test)
  var grade_total = (final * 0.3) + (homework * 0.15) + (quiz * 0.15) + (test * 0.4)
  console.log(grade_total)
  console.log(d.picture)

  return grade_total

}

dataP.then(function(data)
{
  drawBarChart(data); //Final grade of each penguin
},
function(err)
{
  console.log(err);
});
