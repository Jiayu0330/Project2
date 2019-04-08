var dataP = d3.json("classData.json");

var pengArray = ["Bookworm Penguin","Crafty Penguin","Cyclist Penguin","Drunken Penguin","Easter Penguin",
                 "EBook Penguin","Farmer Penguin","Gentleman Penguin","Judo Penguin","Moana Penguin",
                 "Painter Penguin","Grill Penguin","Pharaoh Penguin","Pilot Penguin","Pinga Corr",
                 "Pixie Penguin","Sailor Penguin","Santa Penguin", "Tauch Penguin", "Tux Penguin",
                 "Valentine Penguin","Valentine Penguin Ocal","Wizard Penguin"]

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

              var colors = d3.scaleOrdinal()
                             .domain([0,22])
                             .range(["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#a65628","#f781bf","#999999","#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#8dd3c7","#bebada","#fb8072","#80b1d3","#fdb462","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"])

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

  data.forEach(function(d,i){
    var name = d.picture;
    var svg = d3.select(".overallBarChart")
    svg.append("g")
       .classed("penguin_image", true)
       .append("image")
       .attr("xlink:href", name)
       .attr("x", margins.left - 3 + i * 28.3)
       .attr("y", 310)
       .attr("width", 26.3)
       .attr("height", 26.3)
  });
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

  // var colors = d3.scaleOrdinal(d3.schemeCategory10)
  var colors = d3.scaleOrdinal()
                 .domain([0,22])
                 .range(["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#a65628","#f781bf","#999999","#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#8dd3c7","#bebada","#fb8072","#80b1d3","#fdb462","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"])


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
    width: 1300,
    height: 680
  }

  var margins = {
    left: 50,
    top: 20,
    bottom: 100,
    right: 0
  }

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var xScale = d3.scaleLinear()
                 .domain([0, 40])
                 .range([margins.left, width]);

  var yScale = d3.scaleLinear()
                 .domain([0, 100])
                 .range([height, margins.top]);

  var svg = d3.select(".changingLineChart")
              .attr("width", screen.width)
              .attr("height", screen.height)

  // var colors = d3.scaleOrdinal(d3.schemeCategory10)
  var colors = d3.scaleOrdinal()
                 .domain([0,22])
                 .range(["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#a65628","#f781bf","#999999","#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#8dd3c7","#bebada","#fb8072","#80b1d3","#fdb462","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"])

  var drawLine = d3.line()
                   .x(function(d,i){return xScale(i);})
                   .y(function(d){return yScale(d)});


  var drawArea = d3.area()
                   .x(function(d,i){return xScale(i);})
                   .y0(function(d){return height;})
                   .y1(function(d){return yScale(d);});


  var path = svg.append("g")
                .classed("path", true)

  var area = svg.append("g")
                .classed("area", true)

  var image = svg.append("g")
                 .classed("image", true)

  var dot = svg.append("g")
                 .classed("dot", true)

  data.forEach(function(d,i){
    penguinData = calculatePenguinData(d);
    // console.log(penguinData);
    var name = d.picture;
    var modified_name = d.picture.replace(".png","")
    var path_class_name = "." + modified_name
    var dot_modified_name = modified_name + "Dot"
    var dot_class_name = "." + dot_modified_name
    var area_name = modified_name + "Area"
    var area_class_name = "." + modified_name + "Area"
    //console.log(path_class_name);

    path.append("path")
       .attr("id", "line")
       .datum(penguinData)
       .attr("class", modified_name)
       .attr("d", drawLine)
       .attr("fill", "none")
       .attr("stroke", colors(i))
       .attr("stroke-width", 3)
       .attr("opacity", 0)



    dot.selectAll(".dot")
       .data(penguinData)
       .enter()
       .append("circle")
       .attr("class", dot_modified_name)
       .attr("cx", function(d, i) {return xScale(i);})
       .attr("cy", function(d) {return yScale(d);})
       .attr("r", 5)
       .attr("fill", colors(i))
       .attr("opacity", 0)
       // .on("mouseover", function(d, i) {
       //   d3.select(this)
       //     .attr("r", 7);
       //     //.attr("fill", "white");
       //
       //   svg.append("text")
       //      .attr("id", "text" + i + "-" + d)
       //      .attr("x", function() {return margins.left/2 + xScale(i) - 49;})
       //      .attr("y", function() {return yScale(d) + 42;})
       //      .text(function() {return "Score: " + d;})
       //      .attr("fill", "#003C68")
       //      .attr("font-size", 18);
       //  })
       // .on("mouseout", function(d, i) {
       //   d3.select(this)
       //     .attr("r", 5);
       //     //.attr("fill", "black");
       //
       //   d3.select("#text" + i + "-" + d).remove();
       // });

     area.append("path")
      .attr("id", "area")
      .datum(penguinData)
      .attr("class", area_name)
      .attr("d",drawArea)
      .attr("fill", colors(i))
      .attr("stroke", colors(i))
      .attr("opacity", 0)

     var showLineB = false;
     var showDotB = false;
     var showImageB = false;
     image.append("image")
          .attr("xlink:href", name)
          .attr("x", margins.left/2 + i*55)
          .attr("y", 590)
          .attr("width", 50)
          .attr("height", 50)
          .on("click", function(d){
            console.log(d);
            d3.select(this)
              .attr("y", function() {
                var show = showImageB;
                if (show == true) {
                  showImageB = false;
                  return 590;
                }
                else{
                  showImageB = true;
                  return 200;
                }
              });

            d3.select(".changingLineChart")
              .selectAll(path_class_name)
              .attr("opacity", function() {
                var show = showLineB;
                //console.log("line: " + show);
                if (show == true) {
                  showLineB = false
                  return 0;
                }
                else{
                  showLineB = true
                  return 1;
                }
              });

            d3.select(".changingLineChart")
                .selectAll(dot_class_name)
                .attr("opacity", function() {
                  var show = showLineB;
                  //console.log("dot: " + show);
                  if (show == true) {
                    // showDotB = false
                    return 1;
                  }
                  else{
                    // showDotB = true
                    return 0;
                  }
                });

            // d3.select(".changingLineChart")
            //   .selectAll(area_class_name)
            //   .attr("opacity", 1)


          });

      });

  var xAxisScale = d3.scaleLinear()
                 .domain([1, 41])
                 .range([margins.left, width]);

  var xAxis = d3.axisBottom()
                .scale(xAxisScale)
                .ticks(41);

  var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(10);

  svg.append("g")
     .attr("class","axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)

  svg.append("g")
     .attr("class","axis")
     .attr("transform","translate(" + margins.left + ",0)")
     .call(yAxis)

}

var calculatePenguinData = function(data){ // data = one penguin
  var gradeData = []

  for (i = 0; i < 41; i++){
    gradeData.push(calculateOneDayGrade(data, i))
  }

  // console.log(gradeData)

  // console.log(gradeData)

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

  return grade * 100
}

var buttonFunction = function(){
  var buttonId = document.getElementById("ShowAllButton").innerHTML

  // console.log(buttonId)

  if (buttonId == "Show All"){
    showLines()
  }
  else {
    hideLines()
  }
}

var buttonAreaFunction = function(){
  var buttonId = document.getElementById("ShowAreaButton").innerHTML

  // console.log(buttonId)

  if (buttonId == "Show Area"){
    showArea()
  }
  else {
    hideArea()
  }
}

var showLines = function(){
  d3.select(".changingLineChart")
    .selectAll("#line")
    .attr("opacity", 1);

  d3.select(".changingLineChart")
    .selectAll("circle")
    .attr("opacity", 1)


  document.getElementById("ShowAllButton").innerHTML = "Hide All"

}

var hideLines = function(){
  d3.select(".changingLineChart")
    .selectAll("g.path path")
    .attr("opacity", 0)

  d3.select(".changingLineChart")
    .selectAll("circle")
    .attr("opacity", 0)

  document.getElementById("ShowAllButton").innerHTML = "Show All"
}

var showArea = function(){
  d3.select(".changingLineChart")
    .selectAll("#area")
    .attr("opacity", 1);

  // d3.select(".changingLineChart")
  //   .selectAll("circle")
  //   .attr("opacity", 1)


  document.getElementById("ShowAreaButton").innerHTML = "Hide Area"

}

var hideArea = function(){
  d3.select(".changingLineChart")
    .selectAll("#area")
    .attr("opacity", 0)

  // d3.select(".changingLineChart")
  //   .selectAll("circle")
  //   .attr("opacity", 0)

  document.getElementById("ShowAreaButton").innerHTML = "Show Area"
}

// var showOneLine = function(penguinName){
//   var name = penguinName
//   console.log(name)
//
//   // var svg = d3.select(".changingLineChart");
//
//   // d3.select(".changingLineChart")
//   d3.select(".changingLineChart")
//     .selectAll(name)
//     .attr("opacity", 1)
//
//   d3.select(".changingLineChart")
//     .selectAll("circle")
//     .attr("opacity", 1)
// }

dataP.then(function(data)
{
  drawOverallBarChart(data); //Final grade of each penguin
  // drawChangingBarChart(data);
  drawChangingLineChart(data);
  // calculatePenguinData(data[0]); // temporary
},
function(err)
{
  console.log(err);
});
