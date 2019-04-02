var dataP = d3.json("classData.json");

var drawOverallBarChart = function(data)
{
  var screen = { //the size of svg
    width: 700,
    height: 360
  }

  var margins = {
    left: 50,
    top: 20,
    bottom: 40,
    right: 0
  }

  var innerPadding = 6; //space between bars

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var barWidth = width/data.length;

  var xScale = d3.scaleLinear()
                 .domain([0, data.length])
                 .range([margins.left, width]);

  var yScale = d3.scaleLinear()
                 .domain([0, 100])
                 .range([height, margins.top]);

  var svg = d3.select(".overallBarChart")
              .attr("width", screen.width)
              .attr("height", screen.height)

  var colors = d3.scaleOrdinal(d3.schemeCategory10)

  svg.append("g")
     .classed("rect", true)
     .selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {return i * barWidth + margins.left;})
     .attr("y", function(d) {return yScale(mathFunction(d));})
     .attr("width", barWidth - innerPadding)
     .attr("height", function(d) {return height - yScale(mathFunction(d));})
     .attr("fill", function(d, i) {return colors(i)});

  svg.append("g")
     .classed("textAbove", true)
     .selectAll("text")
     .data(data)
     .enter()
     .append("text")
     .attr("x",function(d,i) {return i * barWidth + margins.left + 3;})
     .attr("y",function(d) {return yScale(mathFunction(d)) - 8;})
     .text(function(d){
       if (mathFunction(d) != 0)
       {
         return Math.round(mathFunction(d));
       }});

  //y-axis
  var yAxis = d3.axisLeft(yScale);

  svg.append("g")
     .classed("yAxis", true)
     .call(yAxis)
     .attr("transform", "translate(" + (margins.left - innerPadding) + ",0)");
}

var mathFunction = function(d)
{
  // console.log(d.final[0].grade);
  var final = d.final[0].grade;
  // console.log(final)
  var total_homework = 0;
  d.homework.forEach(function(d){total_homework += d.grade});
  // console.log(total_homework)
  var homework = (total_homework / 19) * 2;
  // console.log(homework);
  var total_quiz = 0;
  d.quizes.forEach(function(d){total_quiz += d.grade});
  // console.log(total_quiz)
  var quiz = (total_quiz / 38) * 10;
  // console.log(quiz)
  var total_test = 0;
  d.test.forEach(function(d){total_test += d.grade});
  var test = total_test / 2;
  // console.log(test)
  var total_grade = (final * 0.3) + (homework * 0.15) + (quiz * 0.15) + (test * 0.4);
  //console.log(grade_total)
  //console.log(d.picture)
  return total_grade;
}

var drawChangingBarChart = function(data)
{
  var screen = { //the size of svg
    width: 700,
    height: 360
  }

  var margins = {
    left: 50,
    top: 20,
    bottom: 40,
    right: 0
  }

  var innerPadding = 6; //space between bars

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var barWidth = width/data.length;

  var xScale = d3.scaleLinear()
                 .domain([0, data.length])
                 .range([margins.left, width]);

  var yScale = d3.scaleLinear()
                 .domain([0, 100])
                 .range([height, margins.top]);

  var svg = d3.select(".changingBarChart")
              .attr("width", screen.width)
              .attr("height", screen.height)

  var colors = d3.scaleOrdinal(d3.schemeCategory10)

  svg.append("g")
     .classed("rect", true)
     .selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {return i * barWidth + margins.left;})
     .attr("y", function(d) {return yScale(mathFunction(d));})
     .attr("width", barWidth - innerPadding)
     .attr("height", function(d) {return height - yScale(mathFunction(d));})
     .attr("fill", function(d, i) {return colors(i)})

  svg.append("g")
     .classed("textAbove", true)
     .selectAll("text")
     .data(data)
     .enter()
     .append("text")
     .attr("x",function(d,i) {return i * barWidth + margins.left + 3;})
     .attr("y",function(d) {return yScale(mathFunction(d)) - 8;})
     .text(function(d){
       if (mathFunction(d) != 0)
       {
         return Math.round(mathFunction(d));
       }});

  //y-axis
  var yAxis = d3.axisLeft(yScale);

  svg.append("g")
     .classed("yAxis", true)
     .call(yAxis)
     .attr("transform", "translate(" + (margins.left - innerPadding) + ",0)");

  // var dayNumber = 0
  //
  // buttonUpdate(data,dayNumber)
}

// var buttonUpdate = function(data,dayNumber){
//   d3.select("#NextButton").on("click",function(d){
//     updateBarChart(data,dayNumber+1);
//   })
// }
var drawChangingLineChart = function(data)
{
  var screen = { //the size of svg
    width: 800,
    height: 500
  }

  var margins = {
    left: 50,
    top: 20,
    bottom: 40,
    right: 0
  }

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var xScale = d3.scaleLinear()
                 .domain([0, 40])
                 .range([margins.left, width]);

  var yScale = d3.scaleLinear()
                 .domain([0, 1])
                 .range([height, margins.top]);

  var svg = d3.select(".changingLineChart")
              .attr("width", screen.width)
              .attr("height", screen.height)

  var colors = d3.scaleOrdinal(d3.schemeCategory10)

  var drawLine = d3.line()
                   .x(function(d,i){return xScale(i);})
                   .y(function(d){return yScale(d)});

  data.forEach(function(d,i){
    penguinData = calculatePenguinData(d);
    // console.log(penguinData);

    svg.append("path")
       .datum(penguinData)
       .attr("class", "line")
       .attr("d", drawLine)
       .attr("fill", "none")
       .attr("stroke", colors(i))
     });

  var yAxis = d3.axisLeft(yScale);

}

var calculatePenguinData = function(data){ // data = one penguin
  var gradeData = []

  for (i = 0; i < 41; i++){
    gradeData.push(calculateOneDayGrade(data, i))
  }

  // console.log(gradeData)

  console.log(gradeData)

  return gradeData
}

var calculateOneDayGrade = function(data, dayNumber){
  if (dayNumber == 40) {
    var grade = data.final[0].grade / data.final[0].max;
  }
  else if (dayNumber == 14) {
    var grade = data.test[0].grade / data.test[0].max;
  }
  else if (dayNumber == 29) {
    var grade = data.test[1].grade / data.test[1].max;
  }
  else if (dayNumber < 14) {
    var grade = data.quizes[dayNumber].grade / data.quizes[dayNumber].max;
  }
  else if (dayNumber > 14 && dayNumber < 29) {
    var grade = data.quizes[dayNumber - 1].grade / data.quizes[dayNumber - 1].max;
  }
  else if (dayNumber > 29 && dayNumber < 40) {
    var grade = data.quizes[dayNumber - 2].grade / data.quizes[dayNumber - 2].max;
  }

  return grade
}

dataP.then(function(data)
{
  drawOverallBarChart(data); //Final grade of each penguin
  drawChangingBarChart(data);
  drawChangingLineChart(data);
  // calculatePenguinData(data[0]); // temporary
},
function(err)
{
  console.log(err);
});
