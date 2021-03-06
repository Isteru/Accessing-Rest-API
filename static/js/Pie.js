var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

var width = canvas.width,
    height = canvas.height,
    radius = Math.min(width, height) / 2;

var colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 150)
    .context(context);

var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40)
    .context(context);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.population; });

context.translate(width / 2, height / 2);

d3.json("/data.json", function(error, data) {
  if (error) throw error;
  console.log("xd");
  var arcs = pie(data);

  arcs.forEach(function(d, i) {
    context.beginPath();
    arc(d);
    context.fillStyle = colors[i];
    context.fill();
  });

  context.beginPath();
  arcs.forEach(arc);
  context.strokeStyle = "#fff";
  context.stroke();

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#000";
  arcs.forEach(function(d) {
    var c = labelArc.centroid(d);
    context.fillText(d.data.age, c[0], c[1]);
  });
});
