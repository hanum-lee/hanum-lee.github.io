window.onload = function(){
    setup();
};
const PADDING_FOR_LABELS = 150;

const LABELS = ["StreamerID","Average viewer in December 2018","Total minute streamed in December 2018",
"Most streamed game title (Game Title 1)", "Average viewer of Game Title 1","Most number of viewer of Game Title 1","Total streamed minutes of Game Title 1",
"Game title which had most number of viewer (Game Title 2)","Average viewer of Game Title 2","Most number of viewer of Game Title 2","Total streamed minutes of Game Title 2",
"Game title which has most number of average viewer (Game Title 3)","Average viewer of Game Title 3","Most number of viewer of Game Title 3","Total streamed minutes of Game Title 3"];



const xData = ["Ave Viewer", "Max Viewer"];

let margin = {top:20, left:80, bottom:30, right:20};
    //width = 960 - margin.left - margin.right,
    //height = 600 - margin.top - margin.bottom;


let Barchart = function (){
    this.data;
    this.width = 1000;
    this.height = 600;

    this.svg_Container;
    this.datapoints;

    this.xAxis;
    this.yAxis;

    this.xAxisScale;
    this.yAxisScale;
    this.layers;

    let z;
    let layerData;
    let layerDataTest;

    this.setupScales = function(xBins, yRange, yDomain){
        this.xAxisScale = d3.scaleBand()
            .domain(xBins)
            .rangeRound([0, this.width - margin.left])
            .padding(0.1);
        this.yAxisScale = d3.scaleLinear()
            .domain(yDomain)
            .range(yRange);
        z = d3.scaleOrdinal(d3.schemeCategory10);
    };

    this.createBars = function(xAxisSelector, yAxisSelector){
        // default to Life Satisfaction and Employment Rate
        xAxisSelector = xAxisSelector === undefined ? LABELS[3] : xAxisSelector;
        yAxisSelector = yAxisSelector === undefined ? LABELS[4] : yAxisSelector;

        // Use D3's selectAll function to create instances of SVG:circle virtually
        // per item in our data array
        console.log(xAxisSelector);
        xAxisSelector = "x";
        yAxisSelector="y";
        let layer = this.svgContainer.selectAll(".layer")
            .data(layerData)
            .enter()
            .append("g")
            .attr("class","layer")
            .style("fill",function (d,i) {
                return z(i);
            });

        this.datapoints = layer.selectAll("rect")
            .data(
                function(d){
                console.log(d);
                return d;
            }
                // this.data
            )    // use the data we loaded from CSV
            .enter()            // access the data item (e.g., this.data[0])
            .append("rect")     // add the rect element into our SVG container
            .attr("x", function(d){
                //console.log(d);
                //console.log(vis_barchart.xAxisScale(d.data.Game));
                return margin.left + 5 + vis_barchart.xAxisScale(d.data.Game);
            })
            .attr("y", function(d){
                console.log(vis_barchart.yAxisScale(d[0] + d[1]));
                return vis_barchart.yAxisScale(d[0] + d[1]);
            })
            .attr("width", vis_barchart.xAxisScale.bandwidth())
            .attr("height", function(d){
                //console.log((vis_barchart.yAxisScale(d[1]) - vis_barchart.yAxisScale(d[1] + d[0])));
                //return (vis_barchart.height - margin.bottom) - (vis_barchart.yAxisScale(d[1]) - vis_barchart.yAxisScale(d[1] + d[0]));
                return (vis_barchart.yAxisScale(d[1]) - vis_barchart.yAxisScale(d[1] + d[0])) + (vis_barchart.height - margin.bottom);
            })
            // change some styling
            //.style("fill", "coral")
            .style("stroke", "none")
            // .style("stroke-width", 1)
            // add a text to show up on hover
            .append("svg:title")
            .text(function(d){
                return d[yAxisSelector];
            });



    };

    this.createBarsTest = function(xAxisSelector, yAxisSelector){
        // default to Life Satisfaction and Employment Rate
        xAxisSelector = xAxisSelector === undefined ? LABELS[3] : xAxisSelector;
        yAxisSelector = yAxisSelector === undefined ? LABELS[4] : yAxisSelector;

        // Use D3's selectAll function to create instances of SVG:circle virtually
        // per item in our data array
        console.log(xAxisSelector);
        xAxisSelector = "Game";
        yAxisSelector="Viewer";
        let layer = this.svgContainer.selectAll(".layer")
            .data(layerDataTest)
            .enter()
            .append("g")
            .attr("class","layer")
            .style("fill",function (d,i) {
                return z(i);
            });

        this.datapoints = layer.selectAll("rect")
            .data(
                function(d){
                    console.log(d);
                    return d;
                }
                // this.data
            )    // use the data we loaded from CSV
            .enter()            // access the data item (e.g., this.data[0])
            .append("rect")     // add the rect element into our SVG container
            .attr("x", function(d){
                //console.log(d);
                //console.log(vis_barchart.xAxisScale(d.data.Game));
                return margin.left + 5 + vis_barchart.xAxisScale(d[xAxisSelector]);
            })
            .attr("y", function(d){
                //console.log(vis_barchart.yAxisScale(d[0] + d[1]));
                return vis_barchart.yAxisScale(d[yAxisSelector]);
            })
            .attr("width", vis_barchart.xAxisScale.bandwidth())
            .attr("height", function(d){
                //console.log((vis_barchart.yAxisScale(d[1]) - vis_barchart.yAxisScale(d[1] + d[0])));
                //return (vis_barchart.height - margin.bottom) - (vis_barchart.yAxisScale(d[1]) - vis_barchart.yAxisScale(d[1] + d[0]));
                //return (vis_barchart.yAxisScale(d[1]) - vis_barchart.yAxisScale(d[1] + d[0])) + (vis_barchart.height - margin.bottom);
                return (vis_barchart.height - margin.bottom) - vis_barchart.yAxisScale(d[yAxisSelector]);
            })
            // change some styling
            //.style("fill", "coral")
            .style("stroke", "none")
            // .style("stroke-width", 1)
            // add a text to show up on hover
            .append("svg:title")
            .text(function(d){
                return d[yAxisSelector];
            });



    };

    this.setupAxes = function(xNum, yLabel){
        yLabel = yLabel === undefined ? "Viewer count" : yLabel;

        this.xAxis = d3.axisBottom(this.xAxisScale)
            .ticks(xNum);
        this.yAxis = d3.axisLeft(this.yAxisScale)
            .ticks(10)
            .tickPadding(10);

        // call our axes inside "group" (<g></g>) objects inside our SVG container
        this.svgContainer.append("g")
            .attr("transform", `translate(${margin.left+20}, ${this.height - margin.bottom })`)
            .call(this.xAxis)
            .selectAll("text")
            .attr("x", 10)
            .attr("transform", "rotate(90)")
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle");
        this.svgContainer.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(this.yAxis);

        // add text labels
        this.svgContainer.append("text")
            .attr("x", margin.left)
            .attr("y", (this.height)/2)
            .attr("transform", `rotate(-90, ${margin.left / 3}, ${this.height/2})`)
            .style("text-anchor", "middle")
            .style("fill","white")
            .text(yLabel);
    };

    this.setlayerData = function () {
        let tempdat = this.data;
        tempdat.forEach(function(d){
          xData.forEach(function (c) {
              d[c] = +d[c];
          });
      });

      let dataInter = xData.map(function (c) {
          return tempdat.map(function (d) {
              return {x: d["Game"], y: d[c]};
          })
      });
      let stacks = d3.stack()
          .keys(xData)
          .order(d3.stackOrderNone);
      layerData = stacks(tempdat);
        layerData[1].forEach(function (d) {
            console.log(d);
            d[1] = d[1] - (d[0] * 2);
        });
        console.log(layerData);

        console.log(layerData);

    };

    this.setLayerDataTest = function(){
        let tempdata = this.data;
        let tempretu = [];
        let labels = ["Max Viewer","Ave Viewer"];
        for(let i = 0; i < 2; i ++){
            let temparray = [];
            for(let j = 0; j < 3; j++){
                let tempjson = {
                  "Game" : tempdata[j]["Game"],
                  "Viewer" : tempdata[j][labels[i]]
                };
                temparray.push(tempjson);
            }
            tempretu.push(temparray);
        }
        console.log(tempretu);
        layerDataTest = tempretu;

    };




};
let vis_barchart;

function setup(){
    vis_barchart = new Barchart();
    vis_barchart.svgContainer = d3.select("#vis_individual");
    //vis_barchart.width = $("#" + _vis_scatterplot.svgContainer.attr("id")).width();
    //vis_barchart.height = $("#" + _vis_scatterplot.svgContainer.attr("id")).height();

    loadData("TwitchStreamerData.csv");
}

function loadData(path){
    d3.csv(path).then(function (data) {


        let gameTitle = getGametitle(data);
        let viewerCount = getViewers(data);
        let gameData = [
            {"Game":gameTitle[0],"Viewer": viewerCount[0]},
            {"Game":gameTitle[1],"Viewer": viewerCount[1]},
            {"Game":gameTitle[2],"Viewer": viewerCount[2]},
        ];

        let sortedData = getIndvData(data[0]);
        vis_barchart.data = sortedData;
        console.log(gameData);

        vis_barchart.setupScales(gameTitle, [vis_barchart.height-margin.bottom, margin.top], [0, 50000]);
        vis_barchart.setupAxes(gameTitle.length, "Viewer count");
        vis_barchart.setLayerDataTest();
        vis_barchart.setlayerData();
        //vis_barchart.setLayers();
        //vis_barchart.createBars("Game","Ave Viewer");
        vis_barchart.createBarsTest();
        //vis_barchart.createBarsMax("Game","Max Viewer");
    });
}

function getGametitle(data){
    let gameTitles = [];
    let tempdata = data[0];
    gameTitles.push(tempdata["Most streamed game title (Game Title 1)"]
        ,tempdata["Game title which had most number of viewer (Game Title 2)"]
        ,tempdata["Game title which has most number of average viewer (Game Title 3)"]);
    // data.forEach(function (e) {
    //     console.log("data:",e);
    //     console.log(e["Most streamed game title (Game Title 1)"]);
    //    gameTitles.push(e["Most streamed game title (Game Title 1)"]
    //        ,e["Game title which had most number of viewer (Game Title 2)"]
    //        ,e["Game title which has most number of average viewer (Game Title 3)"]);
    // });
    //console.log(gameTitles);
    return gameTitles
}
function getViewers(data) {
    let viewerCount = [];
    let tempdata = data[0];
    viewerCount.push(
      tempdata["Average viewer of Game Title 1"],
        tempdata["Average viewer of Game Title 2"],
        tempdata["Average viewer of Game Title 2"]
    );
    return viewerCount;
}

function getIndvData(data){
    let dataSorted = [];
    let offset = 4;

    // for (let i = 1; i < 4; i++){
    //     let temp = [];
    //     for(let j = 0; j < 3;j++){
    //         let tempdat = {
    //             "x" : data[LABELS[3 + offset * j]],
    //             "y" : data[LABELS[3 + offset * j + i]]
    //         };
    //         temp.push(tempdat);
    //
    //     }
    //
    //     dataSorted.push(temp);
    // }
    for (let i = 0; i <3 ; i++){
        dataSorted.push(
            {"Game":data[LABELS[3 + offset*i]],
                "Ave Viewer":data[LABELS[3 + offset * i + 1]],
                "Max Viewer":data[LABELS[3 + offset * i + 2]],
                //"Streamed Time" : data[LABELS[3 + offset * i+3]]
            }
        );
    }


    console.log(dataSorted);
    return dataSorted;


}
