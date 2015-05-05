var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var w = 960 - margin.left - margin.right;
    var h = 500 - margin.top - margin.bottom;

// var data = [
//   {name: "A", type: "tech", price: 999, tValue: 500, vol: 1200},
//   {name: "B", type: "transp", price: 772, tValue: 800, vol: 367},
//   {name: "C", type: "transp", price: 372, tValue: 670, vol: 558},
//   {name: "D", type: "tech", price: 774, tValue: 801, vol: 431},
//   {name: "E", type: "retail", price: 389, tValue: 130, vol: 123},
//   {name: "F", type: "fastfood", price: 739, tValue: 888, vol: 45},
//   {name: "G", type: "fastfood", price: 582, tValue: 230, vol: 999},
//   {name: "H", type: "tech", price: 972, tValue: 284, vol: 87},
//   {name: "I", type: "pharm", price: 791, tValue: 609, vol: 449},
//   {name: "J", type: "pharm", price: 291, tValue: 701, vol: 870},
//   {name: "K", type: "transp", price: 134, tValue: 921, vol: 699},
//   {name: "L", type: "retail", price: 532, tValue: 731, vol: 1002},
//   {name: "M", type: "retail", price: 788, tValue: 631, vol: 310}
// ];

d3.csv("stocks.csv", function(error, data) {
  data.forEach(function(d) {
    name = d.name;
    type = d.type;
    price = +d.price;
    tValue = +d.tValue;
    vol = +d.vol;

  });
  drawVis(data);
  showData(data);
});

var col = d3.scale.category10();



var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.linear()
        .domain([0, 1000])
        .range([0, w]);

var y = d3.scale.linear()
        .domain([0, 1000])
        .range([h, 0]);


var axisScale = d3.scale.linear()
  .domain([0, 100])
  .range([h, 0]);

var xAxis = d3.svg.axis()
  .scale(x).orient("bottom");

svg.append("g").attr("class", "axis")
  .call(xAxis);
  // .attr("transform", "translate(0," + h + ")").tickSize(h)
  // .call(xAxis);

var yAxis = d3.svg.axis()
  .scale(y).orient("left");

svg.append("g").attr("class", "axis")
  .call(yAxis);

d3.select(".domain")
  .attr("fill", "red");

  var margin = {top: 20, right: 20, bottom: 30, left: 50};
  var w = 960 - margin.left - margin.right;
  var h = 500 - margin.top - margin.bottom;


function drawVis(data) {
  var circles = svg.selectAll("circle")
 .data(data)
 .enter()
 .append("circle")
    .attr("cx", function(d) { return x(d.price);  })
    .attr("cy", function(d) { return y(d.tValue);  })
    .attr("r", 4)
    .style("stroke", "black").attr("fill", function(d) {return col(d.type)}).attr("opacity", 0.5)   
    .append("svg:title")
          .text(function(d, i) { 
            return "name: " + d.name + " price: " + d.price + " tvalue: " + d.tValue + " vol: " + d.vol; 
          });
   }

function showData(data, error) {
   svg.selectAll("circle")
   .on("mouseover", function(d){

      d3.selectAll(d.name).style("visibility", "visible")
   }); 

}