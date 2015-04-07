/*
 * Author: Hsueh-Hung Cheng
 * This is for the evaluation
 */

var EemeHeatMap = {
    // called when the page is loaded
    init: function(data) {
        drawGradient();

        // initialize the heatmap
        EemeHeatMap.baseLayer = L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: '...',
            maxZoom: 18
        });
        EemeHeatMap.cfg = {
            // radius should be small ONLY if scaleRadius is true (or small radius is intended)
            // if scaleRadius is false it will be the constant radius used in pixels
            "radius": 100,
            "maxOpacity": .8,
            // scales the radius based on map zoom
            "scaleRadius": false,
            // if set to false the heatmap uses the global maximum for colorization
            // if activated: uses the data maximum within the current map boundaries
            //   (there will always be a red spot with useLocalExtremas true)
            "useLocalExtrema": true,
            // which field name in your data represents the latitude - default "lat"
            latField: 'lat',
            // which field name in your data represents the longitude - default "lng"
            lngField: 'lng',
            // which field name in your data represents the data value - default "value"
            valueField: 'count',
            gradient: {
                // enter n keys between 0 and 1 here
                // for gradient color customization
                '.4': 'blue',
                '.8': 'red',
                '.95': 'white'
            }
        };

        EemeHeatMap.heatmapLayer = new HeatmapOverlay(EemeHeatMap.cfg);

        EemeHeatMap.map = new L.Map('map-canvas', {
            center: new L.LatLng(39.392454, -121.67863),
            zoom: 14,
            minZoom: 13,
            layers: [EemeHeatMap.baseLayer, EemeHeatMap.heatmapLayer]
        });



        // find the min and max value from rawData
        // it could be used for gradient bar display and range for slider
        var max = -1;
        var min = 100000;

        data.forEach(function(entry){
            if (entry.count > max) max = entry.count;
            if (entry.count < min) min = entry.count;
        });
        min = Math.floor(min);
        max = Math.floor(max);

        $("#range").attr("min", min+"");
        $("#range").attr("max", max+"");
        $("#gradient-min").html(min);
        $("#gradient-max").html(max);
        $("#min").html(min);

        // set the event handlers
        $('#range').on("change mousemove", function() {
            var currMin = parseInt($(this).val());
            var filteredData = {
                min: min,
                max: max,
                data: [],
            };
            data.forEach(function(entry){
                if(entry.count >= currMin) {
                    filteredData.data.push(entry);
                }
            });
            $("#min").html(currMin);
            refreshMap(EemeHeatMap.heatmapLayer, filteredData);
            display.update(filteredData.data);
        });


        // show the map in the very beginning
        refreshMap(EemeHeatMap.heatmapLayer, {
            min: min,
            max: max,
            data: data
        });
    },
};


function refreshMap(heatmapLayer, data) {
    heatmapLayer.setData(data);
}

// use canvas to draw the gradient, better than image
function drawGradient() {
    var c = document.getElementById("gradient");
    var ctx = c.getContext("2d");

    var grd = ctx.createLinearGradient(0, 0, 500, 0);
    grd.addColorStop(0.4, "blue");
    grd.addColorStop(0.8, "red");
    grd.addColorStop(0.95, "white");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 500, 20);
}
