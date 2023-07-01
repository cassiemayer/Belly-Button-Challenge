console.log("This is a test")

// Use D3 to read in samples.json from URL
const sample_data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Fetch Data
d3.json(sample_data).then(function(data) {
//console.log(data);
});

//build function called buildChart
function buildChart(sample) {
    console.log("building function");
    d3.json(sample_data).then(function(data) {
    //console.log("sample data")
    //console.log(data);
    
    //to build barchart-

    let samples = data.samples
    //console.log(samples)

    //filter
    let sampleArray = samples.filter(sampleObject => sampleObject.id == sample);
    //console.log(sampleArray);

    let sampleResult = sampleArray[0];
    console.log(sampleResult);

    // create variables
    let sample_values = sampleResult.sample_values;
    //console.log(sample_values);

    let otu_ids = sampleResult.otu_ids;
    //console.log(otu_ids);

    let otu_labels = sampleResult.otu_labels;
    //console.log(otu_labels);

    //build chart
        let traceBubble = {
        x: otu_ids,
        y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Y1GnBu',

            }
          }

    
    
    let dataBubble = [traceBubble]

    let layoutBubble = {
        title : "Bacteria in Sample",
        showlegend: false,
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample Values"}
    }
      

      Plotly.newPlot('bubble', dataBubble, layoutBubble);


     let dataBarChar = [{
        x: samplesData.slice(0,10).reverse(), 
        y: otu_ids.slice(0,10).reverse().map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type: 'bar',
        orientation: "h"
     }];

     let layoutBar = {
        title: "Top Ten Bacteria Found in Sample",
     }

     Plotly.newPlot('bar', dataBarChart, layoutBar);
    }
)};

function buildingtheMeta(sample) {
    d3.json(sample_data).then(function(data){
        //console.log("this is a metadata test")
        //console.log(data);

       let metadata = data.metadata;
       //console.log(ResultMeta);
       
       let metaPanel = d3.select("#sample-metadata");

       metaPanel.html("");

       for (key in ResultMeta) {
        metaPanel.append("h5").text(`${key.toUpperCase()}: ${ResultMeta[key]}`);
       };
    }
    )};

function optionHasChanged(newSample) {
    buildingTheCharts(newSample);
    buildingtheMeta(newSample);
};




//create an itialize function
function initialize() {
    d3.json(sample_data).then(function (data) {
        let sampleNames =  data.names;
        //console.log(sampleNames);

        let pullDown = d3.select("#selDataset");

        for (let index = 0; index < sampleNames.length; index++) {
            pullDown
                .append("option")
                .text(sampleNames[index])
                .property("value", sampleNames[index])
        };

    let theFirstSample = sampleNames[0];
        
    buildingTheCharts(theFirstSample);
        
    buildingtheMeta(theFirstSample);
}
)};

initialize();