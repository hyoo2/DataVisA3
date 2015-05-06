/**
 * Created by Hannah on 5/6/2015.
 */
var margin = {top: 30, right: 80, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();


d3.csv("names.csv", function(error, data) {
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Year"; }));

    /*    data.forEach(function(d) {
     Year = +d.Year;
     Name = d.Name;
     Gender = d.Gender;
     Count = +d.Count;
     Ranking = +d.Ranking;
     });
     */

    var names = color.domain().map(function(name) {
        return {
            name: name,
            values: data.map(function(d) {
                return {Year: +[d.Year], Name: d.Name, Gender: d.Gender,
                    Count: +[d.Count], Ranking: +[d.Ranking]};
            })
        };
    });

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.format("d"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Count); });

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function(d) { return d.Year; }));

    y.domain([
        d3.min(names, function(c) { return d3.min(c.values, function(v) { return v.Count; }); }),
        d3.max(names, function(c) { return d3.max(c.values, function(v) { return v.Count; }); })
    ]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        // x-axis title
        .append("text")
        .attr("x", (width / 2))
        .attr("y", margin.bottom)
        .attr("dx", ".71em")
        .style("text-anchor", "middle")
        .text("Year");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        // y-axis title
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -margin.left)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Count of Names");

    // title
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "bold")
        .text("Top Popular Names");

    var name = svg.selectAll(".name")
        .data(names)
        .enter().append("g")
        .attr("class", "name");

    name.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return color(d.Name); });

    /*
     name.append("text")
     .datum(function(d) { return {name: d.Name, value: d.values[d.values.length - 1]}; })
     .attr("transform", function(d) { return "translate(" + x(d.value.Year) + "," + y(d.value.Count) + ")"; })
     .attr("dy", ".35em")
     .text(function(d) { return d.Name; })
     */


    /*
     // checkboxes data
     var checkbox = svg.append("path")
     .attr("class", "line")
     .datum(function(d) { return data })
     .attr("d", path);

     // checkboxes select
     d3.selectAll(".box").on("change", function() {
     var type = this.type,
     display = this.checked ? "inline" : "none";

     svg.selectAll(".symbol")
     .filter(function(d) { return d.properties.type === type; })
     .attr("display", display);
     });
     */
});