//Geojson created to hold PIT data and NJ county boudaries
//Put into feature group using ajax
//Fusion tables with county boundaries...•	https://fusiontables.google.com/data?docid=1xdysxZ94uUFIit9eXmnw1fYc6VcQiXhceFd_CVKa#map:id=2
//PIT Data...https://monarchhousing.org/wp-content/uploads/njcounts18/2018PITReportStatewide.pdf
//PIT Data...•	https://monarchhousing.org/wp-content/uploads/njcounts17/2017PITReportStatewide.pdf
//Geojson crearted with...http://geojson.io/#map=2/20.0/0.0
var dataset = 'https://gist.githubusercontent.com/smullarkUPENN/8ca467359168937f674f967a02171b0f/raw/e57887d3c010dea7501ef8faa4868d7aeaa0f350/map.geojson'
var featuregroup = () => { $.ajax(dataset).done(console.log)};console.log(featuregroup.feature);
 
//An array that holds data for each slide that will be referenced later in code.
//Title and text will be used to create narratives in sidebar
//Style filters the data so that each polygon will have different settings based on selected ranges
var slides = [
  {title: "Point-In-Time",
   text: "The Point-In-Time (PIT) count provides a snapshot of the population experiencing homelessness in the state of New Jersey on a single night.  The initiative is intended to assist communities in understanding the characteristics and needs of those experiencing homelessness to improve service delivery and resource targeting to effectively end homelessness.",
   style: function style(featuregroup) {
     function getColor(d) {
       return d < 5000 ? 'black' :
              "white"}
      return {fillColor: getColor(featuregroup.properties.T18), color: 'black', fillOpacity: 0.3, opacity: 0.3};
   }
 },
  {title: "Total Homeless",
   text: "On January 23, 2018 there were 9,303 persons experiencing homelessness on a single night in the State of New Jersey.  Occurrences varied by County.  'Click' on a County to see how it contributed to these results. 'Click' on reset map to restore the map to its original settings.",
   style: function style(featuregroup) {
     function getColor(d) {
       return d < 100 ? '#85C1E9' :
              100 < d && d < 250  ? '#2E86C1' :
              250 < d && d < 5000  ? '#21618C' :
              "white"}
      return {fillColor: getColor(featuregroup.properties.T18), color: 'black', opacity: 0.8};
   }
  },
  {title: "Total Homeless",
   text: "This reflects a 9% increase in persons experiencing homelessness from the prior year (+771; 2017 PIT count of 8,532 vs. 2018 PIT count of 9,303).  Change varied by County.  'Click' on a County to see how it contributed to these results. 'Click' on reset map to restore the map to its original settings.",
   style: function style(featuregroup) {
     function getColor(d) {
       return d == "Decrease" ? 'green' :
              d == "Increase"  ? 'red' :
              d == "Same"  ? 'yellow' :
              "white"}
      return {fillColor: getColor(featuregroup.properties.TMOVE), color: 'black', };
   }
 },
 {title: "Chronically Homeless",
  text: "Chronically homeless includes any individual or family with a long-term disabling condition, who have been continually homeless for a year or more, or at least four times in the past three years where the length of time in those episodes add up to a year or more.  There were 1,288 persons who were identified as chronically homeless in New Jersey on January 23, 2018.  Occurrences varied by County. 'Click' on a County to see how it contributed to these results.  'Click' on reset map to restore the map to its original settings.",
  style: function style(featuregroup) {
    function getColor(d) {
      return d < 100 ? '#85C1E9' :
             100 < d && d < 250  ? '#2E86C1' :
             250 < d && d < 5000  ? '#21618C' :
             "white"}
     return {fillColor: getColor(featuregroup.properties.C18), color: 'black', };
  }
 },
 {title: "Chronically Homeless",
  text: "This reflects an 18% increase in persons identified as chronically homeless from the prior year (+195; 2017 PIT count of 1,093 vs. 2018 PIT count of 1,288).  Change varied by County. 'Click' on a County to see how it contributed to these results. 'Click' on reset map to restore the map to its original settings.",
  style: function style(featuregroup) {
    function getColor(d) {
      return d == "Decrease" ? 'green' :
             d == "Increase"  ? 'red' :
             d == "Same"  ? 'yellow' :
             "white"}
     return {fillColor: getColor(featuregroup.properties.CMOVE), color: 'black', };
  }
 },
 {title: "Unsheltered Homeless",
  text: "Unsheltered Homeless includes any individual or family with a primary nighttime residence that is a public or private place not designed for or ordinarily used as a regular sleeping accommodation for human beings, including a car, park, abandoned building, bus or train station, airport, or camping ground.  There were 1,623 persons who were identified as unsheltered in New Jersey on January 23, 2018.  Occurrences varied by County.  'Click' on a County to see how it contributed to these results. 'Click' on reset map to restore the map to its original settings.",
  style: function style(featuregroup) {
    function getColor(d) {
      return d < 100 ? '#85C1E9' :
             100 < d && d < 250  ? '#2E86C1' :
             250 < d && d < 5000  ? '#21618C' :
             "white"}
     return {fillColor: getColor(featuregroup.properties.U18), color: 'black', };
  }
 },
 {title: "Unsheltered Homeless",
  text: "This reflects a 15% increase in persons identified as chronically homeless from the prior year (+208; 2017 PIT count of 1,415 vs. 2018 PIT count of 1,623). Change varied by County.  'Click' on a County to see how it contributed to these results. 'Click' on reset map to restore the map to its original settings.",
  style: function style(featuregroup) {
    function getColor(d) {
      return d == "Decrease" ? 'green' :
             d == "Increase"  ? 'red' :
             d == "Same"  ? 'yellow' :
             "white"}
     return {fillColor: getColor(featuregroup.properties.UMOVE), color: 'black', };
  }
 }
]

//Sets current slide number to 0
var currentSlide = 0;

//Sets up title and text to add to sidebar as well as removal function that will be called later
var addTitle = (title) => {$('.sidebar').prepend(`<h1 id='title'>${title}</h1>`)};
var addText = (text) => {$('.sidebar').prepend(`<p id='text'>${text}</p>`)};
var cleanup = () => {
  $('#title').remove()
  $('#text').remove()
}

//Sets up a map legend for ranges (slides 1, 3, and 5) that will be called later
//first the color function is established creating the colors for each ranges
//Then a legend is established on botton right of map setting ranges.  It then looks through data to set range/grade and create a color box for each
function getColor(d) {
  return d < 100 ? '#85C1E9' :
         100 < d && d < 250  ? '#2E86C1' :
         250 < d && d < 5000  ? '#21618C' :
         "white"}
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 100, 250],
    labels = [];
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');  }
return div;  };

//Sets up a map legend for categories (slides 2, 4, and 6) that will be called later
//first the color function is established creating the colors for each ranges
//Then a legend is established on botton right of map setting ranges.  It then looks through data to set categories and create a color box for each
function getColor1(d) {
  return d == "Decrease" ? 'green' :
         d == "Increase"  ? 'red' :
         d == "Same"  ? 'yellow' :
         "white"}
var legend1 = L.control({position: 'bottomright'});
    legend1.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    categories = ['Decrease','Increase','Same'];
    for (var i = 0; i < categories.length; i++) {
         div.innerHTML +=
             '<i style="background:' + getColor1(categories[i]) + '"></i> ' +
              (categories[i] ? categories[i] + '<br>' : '+');         }
        return div;};

//function that sets up slide
var buildSlide = (slideObject) => {
  cleanup()//removes text and title
  addText(slideObject.text)//adds current slide text from slide array
  addTitle(slideObject.title)//adds current slide title from slide array
  myStyle = slides[currentSlide].style;//pulls style filter from array for current slide
  $(document).ready(function() {//function that pulls from dataset and maps baesd on style filter
    $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
    style: myStyle, fillOpacity: 0.8
  }).addTo(map);
    map.fitBounds(featureGroup.getBounds());//centers and zooms map to feature bounds
      featureGroup.on('click', clickEvent);//establishes click event that will be defined later...will zoon to county and provide data
  if (currentSlide == 0) {legend.remove();legend1.remove();};//adds appropriate legend for slide
  if (currentSlide == 1) {legend.addTo(map);legend1.remove();};//adds appropriate legend for slide
  if (currentSlide == 2) {legend1.addTo(map);legend.remove();};//adds appropriate legend for slide
  if (currentSlide == 3) {legend.addTo(map);legend1.remove();};//adds appropriate legend for slide
  if (currentSlide == 4) {legend1.addTo(map);legend.remove();};//adds appropriate legend for slide
  if (currentSlide == 5) {legend.addTo(map);legend1.remove();};//adds appropriate legend for slide
  if (currentSlide == 6) {legend1.addTo(map);legend.remove();};//adds appropriate legend for slide
})})
//Establizhes click event...when user clicks on a polygon it will zoom to that polygon...shade if black...and open popup with county data
clickEvent= function(event){
  clickName = event.layer.feature.properties.name;console.log(clickName);//Captures county name that was clicked
  featureGroup.setStyle(slides[currentSlide].style);//resets blacked polygon on a second click...otherwise you could highlight all black
  event.layer.setStyle({fillColor: "black"});//highlights clicked polygon black
  if (currentSlide == 0) {clickData = "-"; narrative = "<dl><dt>" + clickName + " County" + "</dt>";};//These if statements capture specific data from clicked polyigon that will later show in popup
  if (currentSlide == 1) {clickData = event.layer.feature.properties.T18; narrative = "<dl><dt>" + clickName + " County" + "</dt>" + "<dt>" + "Homeless Count: " + clickData + "</dt>";};
  if (currentSlide == 2) {clickData = event.layer.feature.properties.TCHG; narrative = "<dl><dt>" + clickName + " County" + "</dt>" + "<dt>" + "Amount of Change: " + clickData + "</dt>";};
  if (currentSlide == 3) {clickData = event.layer.feature.properties.C18; narrative = "<dl><dt>" + clickName + " County" + "</dt>" + "<dt>" + "Chronically Homeless Count: " + clickData + "</dt>";};
  if (currentSlide == 4) {clickData = event.layer.feature.properties.CCHG; narrative = "<dl><dt>" + clickName + " County" + "</dt>" + "<dt>" + "Amount of Change: " + clickData + "</dt>";};
  if (currentSlide == 5) {clickData = event.layer.feature.properties.U18; narrative = "<dl><dt>" + clickName + " County" + "</dt>" + "<dt>" + "Unsheltered Homelss Count: " + clickData + "</dt>";};
  if (currentSlide == 6) {clickData = event.layer.feature.properties.UCHG; narrative = "<dl><dt>" + clickName + " County" + "</dt>" + "<dt>" + "Amount of Change: " + clickData + "</dt>";};
  event.layer.bindPopup(narrative).openPopup();//creates popup on clicked polygon with created narrative
  map.fitBounds(event.layer.getBounds());//centers and zooms map to feature bounds
  legend.remove();legend1.remove();//removes legend when zoom by click
};};
//Establishes a reset map button that will rest map to original slide form
$('<br><input type="button" id="btnToReset" value="reset map" />').appendTo($(".sidebar"));
$("#btnToReset").click(function() {
  map.eachLayer(function (layer) {map.removeLayer(layer)});//removes all layers
  var addMap = Stamen_TonerLite.addTo(map);//adds back main map later
  buildSlide(slides[currentSlide]);//adds back original slide
  map.fitBounds(event.layer.getBounds());//centers and zooms map to feature bounds
});




//Sets activity for 'next' button
buildSlide(slides[currentSlide])
 $("#next").click(() => {
   currentSlide = currentSlide + 1;//Advances current slide number by one
   console.log(currentSlide)
   map.eachLayer(function (layer) {map.removeLayer(layer)});//removes all layers
   var addMap = Stamen_TonerLite.addTo(map);//adds back main map later
   buildSlide(slides[currentSlide]);//creates slide from new slide number
   if (currentSlide == 6) {$("#next").hide()}//hides button on last slide
   if (currentSlide !== 0) {$("#back").show()}//shows button on all others
});

//Sets activity for 'back' button
buildSlide(slides[currentSlide])
 $("#back").click(() => {
   currentSlide = currentSlide - 1;//Reduces current slide number by one
   console.log(currentSlide)
   map.removeLayer(featureGroup);//removes featureGroup
   buildSlide(slides[currentSlide]);//creates slide from new slide number
   if (currentSlide == 0) {$("#back").hide();}//hides button on first slide
   if (currentSlide !== 6) {$("#next").show();}//shows button on all others
});

//Sets up main map
var map = L.map('map', {
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

//Helpful code resources
//Storing functions in arrays...https://stackoverflow.com/questions/3592468/can-i-store-javascript-functions-in-arrays
//Extracting values (my functions) from array...https://stackoverflow.com/questions/14083524/how-to-extract-values-from-an-array-of-arrays-in-javascript
//Hover...https://www.w3schools.com/jquery/event_hover.asp
//Hiding a button...https://stackoverflow.com/questions/1992114/how-do-you-create-a-hidden-div-that-doesnt-create-a-line-break-or-horizontal-sp
//Hiding a button...http://api.jquery.com/hide/
//Buttons overlapping...https://stackoverflow.com/questions/30101484/prevent-buttons-overlapping
//Positioning...https://medium.freecodecamp.org/how-to-use-the-position-property-in-css-to-align-elements-d8f49c403a26
//Click event get ID...https://gis.stackexchange.com/questions/172508/add-an-event-listener-on-a-marker-in-leaflet/172586
//Getting data from array from specific keys...https://javascript.info/array-methods
//Remove each layer...https://leafletjs.com/reference-1.4.0.html#map-eachlayer
//Creating legend by categories...https://gis.stackexchange.com/questions/133630/adding-leaflet-legend
//Creating legend by ranges...https://stackoverflow.com/questions/37701211/custom-legend-image-as-legend-in-leaflet-map
//Adding line break to popup...https://gis.stackexchange.com/questions/31859/how-to-insert-new-line-text-in-popup
