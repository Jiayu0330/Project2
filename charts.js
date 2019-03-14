var dataP = d3.json("classData.json");

dataP.then(function(data)
{
  drawBarChart(data); //Final grade of each penguin
},
function(err)
{
  console.log(err);
});
