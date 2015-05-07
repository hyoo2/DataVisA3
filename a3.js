var margin = {top: 30, right: 80, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var color = d3.scale.category10();

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var myData = [];

// HELP FROM HERE!!!!
// filter data using drop down
var dataSet = myData;

var myType = "all";
var patt = new RegExp("all");

function filterType(myType) {
    myType = this.myType;
    var res = patt.test(myType);
    if (res) {
        var toVis = dataSet;
    }
    else {
        var toVis = dataSet.filter(function(d, i) {
            return d["type"] == myType;
        });
    }
    drawVis(toVis);
}

function drawVis(myData) {

}

// TO HERE!!!!!

var nameArr = [];

var countYearName = [];

d3.csv("names.csv", function(error, data) {

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Year"; }));

    data.forEach(function(d) {
        //Formats each year object
        Year = +d.Year;
        Name = d.Name;
        Gender = d.Gender;
        Count = +d.Count;
        Ranking = +d.Ranking;
    });

/*    d3.selectAll(".box").on('click', function() {
        var value = this.value,
            display = this.checked ? "inline" : "none";

        svg.selectAll(".symbol")
            .filter(function(d) { return d.properties.type === type; })
            .attr("display", display);
    });*/

/*    function checkGender() {
        var mChecked = document.getElementById("male").checked;
        var fChecked = document.getElementById("female").checked;

        if (mChecked && fChecked) {
            names.filterAll();
        }
        else if (mChecked && !fChecked) {
            names.filter('mChecked');
        }
        else if (!mChecked && fChecked) {
            names.filter('fChecked');
        }
        else {
            return;
        }
    }*/

/*    //checkboxes data
    var checkbox = svg.append("path")
        .attr("class", "line")
        .datum(function(d) { return data })
        .attr("d", "path");

    //checkboxes select
    d3.selectAll(".box").on("change", function() {
        var type = this.type,
            display = this.checked ? "inline" : "none";

        svg.selectAll(".symbol")
            .filter(function(d) { return d.properties.type === type; })
            .attr("display", display);
    });*/

    //This creates an array per name and sets the value of that array to the array of year objects for that name
    data.forEach(function(d) {
        countYearName.push({Year: +d.Year, Name: d.Name, Count: +d.Count});

        var foundAtIndex = -1;

        for (var i=0; i<=nameArr.length; i++) {
            //console.log("comparing "+d.Name+" to "+nameArr[i].Name);
            if(nameArr[i] && nameArr[i][0].Name){
                if (d.Name == nameArr[i][0].Name){
                    foundAtIndex = i;
                }
            }
        }

        if (foundAtIndex > -1) {
            nameArr[foundAtIndex].unshift(d);
        } else {
            nameArr.push([d]);
        }
    });

    //console.log(countYearName);

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return (x(d.Year) + 60); })
        .y(function(d) { return y(d.Count); });

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.format("d"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var names = color.domain().map(function(name) {
        return {
            name: name,
            values: data.map(function(d) {
                return {Year: [d.Year], Name: d.Name, Gender: d.Gender,
                    Count: +[d.Count], Ranking: +[d.Ranking]};
            })
        };
    });

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
        .text("Top 20 Popular Names 1993 - 2013");

    var name = d3.select("svg")
        .selectAll(".name")
        .data(nameArr)
        .enter().append("g")
        .attr("class", "name")
        .append("path")
        .attr("class", "line")
        .attr("d", function(d, i) { return line(d); })
        .style("stroke", function(d) { return color(d[0].Name);
        })
        .append("svg:title")
        .text(function(d, i) {
            return "name: " + d[0].Name + " year: " + d[0].Year + " gender: " + d[0].Gender;
        })

    svg.selectAll(".name")
        .on("mouseover", function(d){
            d3.selectAll(d.name).style("visibility", "visible")
        });

    var display;

    d3.selectAll(".filter_button").on("change", function () {
        var selected = this.value,
            display = this.checked ? "inline" : "none";
        alert(selected);
        svg.selectAll(".name")
            .filter(function(d) { return d[0].Gender == selected; })
            .attr("display", display);
    });
});