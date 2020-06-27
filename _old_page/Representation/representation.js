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

let selectedStreamer = [];

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

        let legend = this.svgContainer.selectAll('legend')
            .data(z.domain())
            .enter().append('g')
            .attr('class','legend')
            .attr('transform',function(d,i){
                return 'translate(50,' + i * 20+')';
            });

        legend.append('rect')
            .attr('x',this.width-18)
            .attr('width',18)
            .attr('height',18)
            .style('fill',z)
            .style('stroke-width',2)
            .style('stroke','white');

        legend.append('text')
            .attr('x',this.width - 24)
            .attr('y',9)
            .attr('dy','0.35em')
            .style('text-anchor','end')
            .style('fill','white')
            .text(function(d){
                return d === 1 ? 'Average Viewer': 'Max Viewer';
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


    };

    this.setLayerDataTest = function(){
        let tempdata = this.data;
        let tempretu = [];
        let labels = ["Max Viewer","Ave Viewer"];
        for(let i = 0; i < 2; i ++){
            let temparray = [];
            for(let j = 0; j < tempdata.length; j++){
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

    this.removeEverything = function () {
        this.svgContainer.selectAll('.layer').remove();
        this.svgContainer.selectAll('g').remove();
    };




};

let scattrplot = function(){
    this.data;
    this.width = 1000;
    this.height = 600;

    this.svg_Container;
    this.datapoints;

    this.xAxis;
    this.yAxis;

    this.xAxisScale;
    this.yAxisScale;

    this.setupScales = function(xRange, xDomain, yRange, yDomain){
        this.xAxisScale = d3.scaleLinear()
            .domain(xDomain)
            .range(xRange);

        this.yAxisScale = d3.scaleLinear()
            .domain(yDomain)
            .range(yRange);
    };

    this.setupAxes = function(xLabel, yLabel){
        xLabel = xLabel === undefined ? "Life Satisfaction" : xLabel;
        yLabel = yLabel === undefined ? "Employment Rate" : yLabel;

        // call d3's axisBottom for the x-axis
        this.xAxis = d3.axisBottom(this.xAxisScale)
        // .tickSize(-this.height + MARGINS.bottom + MARGINS.top)
            .ticks(10)
            .tickPadding(10);
        // call d3's axisLeft for the y-axis
        this.yAxis = d3.axisLeft(this.yAxisScale)
        // .tickSize(-this.width + MARGINS.left*2)
            .ticks(10)
            .tickPadding(10);

        // call our axes inside "group" (<g></g>) objects inside our SVG container
        this.svgContainer.append("g")
            .attr("transform", `translate(0, ${this.height - margin.bottom + 10})`)
            .call(this.xAxis);
        this.svgContainer.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(this.yAxis);

        // add text labels
        this.svgContainer.append("text")
            .attr("x", margin.left)
            .attr("y", (this.height)/2)
            .attr("transform", `rotate(-90, ${margin.left / 3}, ${this.height/2})`)
            .style("text-anchor", "middle")
            .text(yLabel)
            .style('fill','white');
        this.svgContainer.append("text")
            .attr("x", (this.width)/2)
            .attr('with-space-preserve', true)
            .attr("y", (this.height - margin.top + margin.bottom + 10))
            .style("text-anchor", "middle")
            .text(xLabel)
            .style('fill','white');

    };

    /**
     * Function createCircles initializes the datapoints in our scatterplot
     * @param xAxisSelector the data property for values to appear in x-axis
     * @param yAxisSelector the data property for values to appear in y-axis
     */
    this.createCircles = function(xAxisSelector, yAxisSelector){
        // default to Life Satisfaction and Employment Rate
        xAxisSelector = xAxisSelector === undefined ? "Life satisfaction" : xAxisSelector;
        yAxisSelector = yAxisSelector === undefined ? "Employment rate" : yAxisSelector;

        var scatterplot = this;

        // Use D3's selectAll function to create instances of SVG:circle virtually
        // per item in our data array
        this.datapoints = this.svgContainer.selectAll("circle")
            .data(this.data)    // use the data we loaded from CSV
            .enter()            // access the data item (e.g., this.data[0])
            .append("circle")   // add the circle element into our SVG container
            .attr("r", 7)       // change some of the attributes of our circles
            // function(d){ return d; } -> allows us to access the data we entered
            .attr("cx", function(d){
                // use the D3 scales we created earlier to map our data values to pixels on screen
                return scatterplot.xAxisScale(d[xAxisSelector]);
            })
            .attr("cy", function(d){
                return scatterplot.yAxisScale(d[yAxisSelector]);
            })
            // change some styling
            .style("fill", "#2B4162")
            .style("stroke", "white")
            // add a text to show up on hover
            .append("svg:title")
            .text(function(d){
                return d[LABELS[0]];
            });
    };

    this.highlight = function (streamer) {

        this.svgContainer.selectAll('circle')
            .filter(function(d){
                return d === streamer ? this :null;
            })
            .style('stroke','black')
            .style('stroke-width',2)
            .style('fill','white')
            .attr('r',10)
            .attr('class','selected')
            .moveToFront();


    };

    this.unhighlight = function(streamer){
        this.svgContainer.selectAll('circle')
            .filter(function(d){
                return d === streamer ? this :null;
            })
            .attr('r',7)
            .style('stroke-width',1)
            .style('stroke','white')
            .style('fill','#2B4162');

    };



};
let vis_barchart;
let vis_scatterplot;

function setup(){
    vis_barchart = new Barchart();
    vis_barchart.svgContainer = d3.select("#vis_individual");
    //vis_barchart.width = $("#" + _vis_scatterplot.svgContainer.attr("id")).width();
    //vis_barchart.height = $("#" + _vis_scatterplot.svgContainer.attr("id")).height();
    vis_scatterplot = new scattrplot();
    vis_scatterplot.svgContainer = d3.select('#vis_scatterplot');
    loadData("TwitchStreamerData.csv");
}

function loadData(path){
    d3.csv(path).then(function (data) {

        let streamerlist;
        data.forEach(function(entry){
            $('#streamerlist').append('<li>' + entry[LABELS[0]] + '</li>');
        });

        // let gameTitle = getGametitle([data[0],data[1]]);
        // let viewerCount = getViewers(data);
        // let gameData = [
        //     {"Game":gameTitle[0],"Viewer": viewerCount[0]},
        //     {"Game":gameTitle[1],"Viewer": viewerCount[1]},
        //     {"Game":gameTitle[2],"Viewer": viewerCount[2]},
        // ];
        //
        // let sortedData = getIndvData([data[0],data[1]]);
        // //vis_barchart.data = sortedData;
        // console.log(gameData);


        // vis_barchart.setupScales(gameTitle, [vis_barchart.height-margin.bottom, margin.top], [0, 50000]);
        // vis_barchart.setupAxes(gameTitle.length, "Viewer count");
        // vis_barchart.setLayerDataTest();
        //vis_barchart.setlayerData();
        //vis_barchart.setLayers();
        //vis_barchart.createBars("Game","Ave Viewer");
        //vis_barchart.createBarsTest();
        //vis_barchart.createBarsMax("Game","Max Viewer");
        vis_scatterplot.data = data;
        vis_scatterplot.setupScales([margin.left, vis_scatterplot.width - margin.right],[0, 28000],
        [margin.bottom, vis_scatterplot.height- margin.top],[12000,0]);
        vis_scatterplot.setupAxes(LABELS[2],LABELS[1]);
        vis_scatterplot.createCircles(LABELS[2],LABELS[1]);

        $('#streamerlist li').click(function(){
            console.log($(this).text());
            let steamerid = $(this).text();
            let index = $(this).index();
            if(selectedStreamer.indexOf(data[$(this).index()]) === -1){
                selectedStreamer.push(data[$(this).index()]);
                $(this).addClass("selected");
                //console.log(data[$(this).index()]);
                vis_scatterplot.highlight(data[$(this).index()]);


            }else{
                selectedStreamer.splice(selectedStreamer.indexOf(data[index]),1);
                console.log(selectedStreamer);
                $(this).removeClass('selected');
                vis_scatterplot.unhighlight(data[$(this).index()]);
                //selectedStreamer.push($(this).text());
            }

            vis_barchart.removeEverything();
            sortedData= getIndvData(selectedStreamer);
            let maxtest = d3.max(sortedData,function (d) {
               return +d["Max Viewer"]
            });
            console.log(maxtest);
            gameTitle = getGametitle(sortedData);

            vis_barchart.setupScales(gameTitle, [vis_barchart.height-margin.bottom, margin.top], [0, maxtest * 1.1]);
            vis_barchart.setupAxes(gameTitle.length, "Viewer count");
            vis_barchart.data =sortedData;

            vis_barchart.setLayerDataTest();
            vis_barchart.createBarsTest();
            console.log(selectedStreamer);

        });

    });
}

function getGametitle(data){
    let gameTitles = [];
    //let tempdata = data[0];
    // gameTitles.push(tempdata["Most streamed game title (Game Title 1)"]
    //     ,tempdata["Game title which had most number of viewer (Game Title 2)"]
    //     ,tempdata["Game title which has most number of average viewer (Game Title 3)"]);
    data.forEach(function (e) {
        console.log("data:",e.Game);
        //console.log(e["Most streamed game title (Game Title 1)"]);
       gameTitles.push(e.Game);
    });
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
    console.log(data);
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
    data.forEach(function(e){
       console.log(e);
        for (let i = 0; i <3 ; i++){
            let gameandid = e[LABELS[3 + offset*i]] +'\n' + e[LABELS[0]];
            dataSorted.push(
                {"Game":gameandid,
                    "Ave Viewer":e[LABELS[3 + offset * i + 1]],
                    "Max Viewer":e[LABELS[3 + offset * i + 2]],
                    //"SteamerID":e[LABELS[0]]
                    "Streamed Time" : data[LABELS[3 + offset * i+3]]
                }
            );
        }

    });



    console.log(dataSorted);
    return dataSorted;
}

d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};


