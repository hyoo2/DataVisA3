var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;



var color = d3.scale.category10();



var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Count); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("names.csv", function(error, data) {
    data.forEach(function(d) {
        Year = +d.Year;
        Name = d.Name;
        Gender = d.Gender;
        Count = +d.Count;
        Ranking = +d.Ranking;
    });

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, 35000])
        .range([height, 0]);


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var names = color.domain().map(function(name) {
        return {
            name: name,
            values: data.map(function(d) {
                return {Year: +[d.Year], Name: d.Name, Gender: d.Gender,
                    Count: +[d.Count], Ranking: +[d.Ranking]};
            })
        };
    });

    x.domain(d3.extent(data, function(d) { return d.Year; }));


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 35000)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Count");


    var name = svg.selectAll(".name")
        .data(name)
        .enter().append("g")
        .attr("class", "name");

    name.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(data); })
        //.style("stroke", function(d) { return color(d.Name); });


   name.append("text")
       .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
       .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.count) + ")"; })
       .attr("x", 2020)
       .attr("dy", ".35em")
       .text(function(d) { return d.name; });
});