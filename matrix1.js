function matrix(json) {
  var matrix = [],
      nodes = json.nodes,
      n = nodes.length;
      console.log("n = "+n);
var colour_map={
  "red_blue": d3.interpolateRdBu,
  "purple_green": d3.interpolatePRGn,
  "seq_blue": d3.interpolateBlues
};
  nodes.forEach(function(node, i) {
    node.index = i;
    node.count = 0;
    matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
    console.log("i = "+i+"matrix[i][98]: "+matrix[i][98].z);
  });

  json.links.forEach(function(link) {  
    matrix[link.source][link.target].z += link.value;
    nodes[link.source].count += link.value;
    nodes[link.target].count += link.value;
  });
  var adjacency = matrix.map(function(row) {
      return row.map(function(c) { return c.z; });
  });

  var graph = reorder.graph()
    .nodes(json.nodes)
    .links(json.links)
    .init();

    var dist_adjacency;

    var leafOrder = reorder.optimal_leaf_order()
          .distance(science.stats.distance.manhattan);

    function computeLeaforder() {
  var order = leafOrder(adjacency);

  order.forEach(function(lo, i) {
      nodes[i].leafOrder = lo;
  });
  return nodes.map(function(n) { return n.leafOrder; });
    }

    function computeLeaforderDist() {
  if (! dist_adjacency)
      dist_adjacency = reorder.graph2valuemats(graph);

  var order = reorder.valuemats_reorder(dist_adjacency,
                leafOrder);

  order.forEach(function(lo, i) {
      nodes[i].leafOrderDist = lo;
  });
  return nodes.map(function(n) { return n.leafOrderDist; });
  
    }
    
    function computeBarycenter() {
  var barycenter = reorder.barycenter_order(graph),
      improved = reorder.adjacent_exchange(graph,
             barycenter[0],
             barycenter[1]);

  improved[0].forEach(function(lo, i) {
      nodes[i].barycenter = lo;
  });

  return nodes.map(function(n) { return n.barycenter; });
    }

    function computeRCM() {
  var rcm = reorder.reverse_cuthill_mckee_order(graph);
  rcm.forEach(function(lo, i) {
      nodes[i].rcm = lo;
  });

  return nodes.map(function(n) { return n.rcm; });
    }

    function computeSpectral() {
  var spectral = reorder.spectral_order(graph);

  spectral.forEach(function(lo, i) {
      nodes[i].spectral = lo;
  });

  return nodes.map(function(n) { return n.spectral; });
    }

     var orders = {
  name: d3.range(n).sort(function(a, b) { return d3.ascending(parseInt(nodes[a].name), parseInt(nodes[b].name)); }),
  count: d3.range(n).sort(function(a, b) { return nodes[b].count - nodes[a].count; }),
  group: d3.range(n).sort(function(a, b) {
      var x = nodes[b].group - nodes[a].group;
      return (x != 0) ?  x : d3.ascending(nodes[a].name, nodes[b].name);
  }),
  leafOrder: computeLeaforder,
  leafOrderDist: computeLeaforderDist,
  barycenter: computeBarycenter,
  rcm: computeRCM,
  spectral: computeSpectral
    };

  x.domain(orders.name);
  svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height);

  var row = svg.selectAll(".row")
      .data(matrix)
    .enter().append("g")
      .attr("id", function(d, i) { return "row"+i; })
      .attr("class", "row")
      .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
      .each(row);

  row.append("line")
      .attr("x2", width);

  row.append("text")
      .attr("x", -6)
      .attr("y", x.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "end")
      .text(function(d, i) { return nodes[i].name; });

  var column = svg.selectAll(".column")
      .data(matrix)
    .enter().append("g")
      .attr("id", function(d, i) { return "col"+i; })
      .attr("class", "column")
      .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

  column.append("line")
      .attr("x1", -width);

  column.append("text")
      .attr("x", 6)
      .attr("y", x.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "start")
      .text(function(d, i) { return nodes[i].name; });

  function row(row) {
    var cell = d3.select(this).selectAll(".cell")
    .data(row.filter(function(d) { return d.z; }))
      .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d) { return x(d.x); })
        .attr("width", x.rangeBand())
        .attr("height", x.rangeBand())
        .style("fill-opacity", function(d) { return z(d.z); })
        .style("fill", function(d) { return d3.interpolatePiYG(d.z); })
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("dblclick",fun);
  }
function fun(p)
{
  console.log("called");
  d3.select("#svg2").remove();
  var len = document.getElementById('a').value;
  console.log("len: "+len);
  alert("hi p is: "+p.x+" "+p.y+" "+p.z+" doc: "+document.getElementById('a').value);
  console.log("alerted");
  d3.select("body").append("svg")
    .attr("id","svg2")
    .attr("width", 720 + margin.left + margin.right)
    .attr("height", 720 + margin.top + margin.bottom)
    .style("margin-left", -margin.left + "px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var _matrix=[];
    d3.select("#svg2").select("g").append("rect")
      .attr("class", "background")
      .attr("width", 720)
      .attr("height",720);
    var i,j,i1=0,j1=0;
    var e = document.getElementById("order");
    var corder = e.options[e.selectedIndex].value;
    console.log("corder: "+corder);
    console.log("orders[corder]:");
    console.log(orders[corder]);
    console.log("orders[corder][0]:");
    console.log(orders[corder][0]);
    console.log("orders:");
    console.log(orders);
    console.log(orders[corder]);
    for(i=0;i<len;i++)
      _matrix[i] = d3.range(len).map(function(j) { return {x: j, y: i, z: 0}; });
    for(i=p.x;i<parseInt(p.x)+parseInt(len);i++)
    {
      j1=0;
      console.log("p.y: "+p.y);
      console.log("p.y+len: "+(parseInt(p.y)+parseInt(len)));
      for(j=p.y;j<(parseInt(p.y)+parseInt(len));j++)
      {
        console.log("i1: "+i1+" i: "+i);
        console.log("j1: "+j1+" j: "+j);
        _matrix[i1][j1].z += matrix[orders[corder][i]][orders[corder][j]].z;
        j1++;
      }
      i1++;
    }
    var d=[];
    for (i = 0; i < parseInt(len); i++) {
      d.push(i);
    }
    var y = d3.scale.ordinal().rangeBands([0, 720]);
    y.domain(d);
    console.log("_matrix: ");
    console.log(_matrix);
    var row = d3.select("#svg2").select("g").selectAll(".row")
      .data(_matrix)
    .enter().append("g")
      .attr("id", function(d, i) { return "row"+i; })
      .attr("class", "row")
      .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; })
      .each(row);
    row.append("line")
      .attr("x2", width);
    row.append("text")
      .attr("x", -6)
      .attr("y", y.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "end")
      .text(function(d, i) { return orders[corder][parseInt(p.y)+i]; });
    var column = d3.select("#svg2").select("g").selectAll(".column")
      .data(_matrix)
    .enter().append("g")
      .attr("id", function(d, i) { return "col"+i; })
      .attr("class", "column")
      .attr("transform", function(d, i) { return "translate(" + y(i) + ")rotate(-90)"; });
    column.append("line")
      .attr("x1", -width);

    column.append("text")
      .attr("x", 6)
      .attr("y", y.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "start")
      .text(function(d, i) { return orders[corder][parseInt(p.y)+i]; });
    function row(row) {
    var cell = d3.select(this).selectAll(".cell")
    .data(row.filter(function(d) { return d.z; }))
      .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d) { return y(d.x); })
        .attr("width", y.rangeBand())
        .attr("height", y.rangeBand())
        .style("fill-opacity", function(d) { return z(d.z); })
        .style("fill", function(d) { return d3.interpolatePiYG(d.z); });
  }
}
  function mouseover(p) {
    d3.selectAll(".row text").classed("active", function(d, i) { return i == p.y; });
    d3.selectAll(".column text").classed("active", function(d, i) { return i == p.x; });
      d3.select(this).insert("title").text(nodes[p.y].name + "--" + nodes[p.x].name);
      d3.select(this.parentElement)
    .append("rect")
    .attr("class", "highlight")
    .attr("width", width)
    .attr("height", x.rangeBand());
      d3.select("#col"+p.x)
    .append("rect")
    .attr("class", "highlight")
    .attr("x", -width)
    .attr("width", width)
    .attr("height", x.rangeBand());
  }

  function mouseout(p) {
    d3.selectAll("text").classed("active", false);
      d3.select(this).select("title").remove();
      d3.selectAll(".highlight").remove();
  }

    var currentOrder = 'name';

    function order(value) {
      console.log("value:");
      console.log(value);
      console.log("orders[value]:");
      console.log(orders[value]);
  var o = orders[value];
  currentOrder = value;
  
  if (typeof o === "function") {
    console.log("o="+o);
      orders[value] = o.call();
  }
  x.domain(orders[value]);

  var t = svg.transition().duration(1500);

  t.selectAll(".row")
            .delay(function(d, i) { return x(i) * 4; })
            .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
      .selectAll(".cell")
            .delay(function(d) { return x(d.x) * 4; })
            .attr("x", function(d) { return x(d.x); });

  t.selectAll(".column")
            .delay(function(d, i) { return x(i) * 4; })
            .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });
    }

    function distance(value) {
  leafOrder.distance(science.stats.distance[value]);

  if (currentOrder == 'leafOrder') {
      orders.leafOrder = computeLeaforder;
      order("leafOrder");
      //d3.select("#order").property("selectedIndex", 3);
  }
  else if (currentOrder == 'leafOrderDist') {
      orders.leafOrderDist = computeLeaforderDist;
      order("leafOrderDist");
      //d3.select("#order").property("selectedIndex", 4);
  }
  }

    matrix.order = order;
    matrix.distance = distance;

    var timeout = setTimeout(function() {}, 1000);
    matrix.timeout = timeout;
    
    return matrix;
}
function smaller_matrix(matrix)
{
  console.log("hi: "+matrix[0][0].z);
  var i,j;
  var mat_new=[];
  for(i=0;i<Math.floor(matrix.length/10);i++)
  {
    mat_new[i]=d3.range(Math.floor(matrix.length/10)).map(function(j) { return {x: j, y: i, z: 0}; });
  }
  for(i=0;i<matrix.length;i+=10)
  {
    for(j=0;j<matrix.length;j+=10)
    {
      var temp=0;
      for(k=i;k<i+10;k++)
      {
        for(l=j;l<j+10;l++)
        {
          temp+=matrix[k][l].z;
        }
      }
      temp=temp/100;
      console.log("mat_new length = "+mat_new.length);
      console.log("Math.floor(i/10) = "+Math.floor(i/10));
      console.log("Math.floor(j/10) = "+Math.floor(j/10));
       mat_new[Math.floor(i/10)][Math.floor(j/10)].z=temp;
    }
  }
  console.log("hi");
  console.log("matrix_:");
  console.log(mat_new);
  return mat_new;
}
function matrix2(matrix)
{
    var adjacency = matrix.map(function(row) {
      return row.map(function(c) { console.log("c.z"+c.z); return c.z; });
  });
    console.log("check: "+matrix.length);
    obj =
    {
      nodes: [{"name":"1"}, {"name":"2"}, {"name":"3"}, {"name":"4"}, {"name":"5"}, {"name":"6"}, {"name":"7"}, {"name":"8"}, {"name":"9"}, {"name":"10"}],
      links: [{"source":0, "target":0, "value":1}]
    }
    nodes = obj.nodes;
    console.log("nodes:");
    console.log(nodes);
    console.log("done");
  var graph = reorder.graph()
    .nodes(obj.nodes)
    .links(obj.links)
    .init();

    var dist_adjacency;

    var leafOrder = reorder.optimal_leaf_order()
          .distance(science.stats.distance.manhattan);

    function computeLeaforder() {
        console.log("inside computeLeaforder1");
  var order = leafOrder(adjacency);
  console.log("inside computeLeaforder");
  order.forEach(function(lo, i) {
      nodes[i].leafOrder = lo;
  });
  console.log("returning");
  return nodes.map(function(n) { console.log("n = "+n); return n.leafOrder; });
    }

    function computeLeaforderDist() {
  if (! dist_adjacency)
      dist_adjacency = reorder.graph2valuemats(graph);

  var order = reorder.valuemats_reorder(dist_adjacency,
                leafOrder);

  order.forEach(function(lo, i) {
      nodes[i].leafOrderDist = lo;
  });
  return nodes.map(function(n) { return n.leafOrderDist; });
  
    }
    
    function computeBarycenter() {
  var barycenter = reorder.barycenter_order(graph),
      improved = reorder.adjacent_exchange(graph,
             barycenter[0],
             barycenter[1]);

  improved[0].forEach(function(lo, i) {
      nodes[i].barycenter = lo;
  });

  return nodes.map(function(n) { return n.barycenter; });
    }

    function computeRCM() {
  var rcm = reorder.reverse_cuthill_mckee_order(graph);
  rcm.forEach(function(lo, i) {
      nodes[i].rcm = lo;
  });

  return nodes.map(function(n) { return n.rcm; });
    }

    function computeSpectral() {
  var spectral = reorder.spectral_order(graph);

  spectral.forEach(function(lo, i) {
      nodes[i].spectral = lo;
  });

  return nodes.map(function(n) { return n.spectral; });
    }

  // Precompute the orders.
  console.log("Precompute the orders");
    var orders = {
  name: d3.range(10).sort(function(a, b) { console.log("hi"); return d3.ascending(parseInt(nodes[a].name), parseInt(nodes[b].name)); }),
  count: d3.range(10).sort(function(a, b) { return nodes[b].count - nodes[a].count; }),
  group: d3.range(10).sort(function(a, b) {
      var x = nodes[b].group - nodes[a].group;
      return (x != 0) ?  x : d3.ascending(nodes[a].name, nodes[b].name);
  }),
  leafOrder: computeLeaforder,
  leafOrderDist: computeLeaforderDist,
  barycenter: computeBarycenter,
  rcm: computeRCM,
  spectral: computeSpectral
    };

  x.domain(orders.name);
  svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height);

  var row = svg.selectAll(".row")
      .data(matrix)
    .enter().append("g")
      .attr("id", function(d, i) { console.log("i =" +i); return "row"+i; })
      .attr("class", "row")
      .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
      .each(row);

  row.append("line")
      .attr("x2", width);

  row.append("text")
      .attr("x", -6)
      .attr("y", x.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "end")
      .text(function(d, i) { return nodes[i].name; });

  var column = svg.selectAll(".column")
      .data(matrix)
    .enter().append("g")
      .attr("id", function(d, i) { return "col"+i; })
      .attr("class", "column")
      .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

  column.append("line")
      .attr("x1", -width);

  column.append("text")
      .attr("x", 6)
      .attr("y", x.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "start")
      .text(function(d, i) { return nodes[i].name; });

  function row(row) {
    var cell = d3.select(this).selectAll(".cell")
    .data(row.filter(function(d) { return d.z; }))
      .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d) { return x(d.x); })
        .attr("width", x.rangeBand())
        .attr("height", x.rangeBand())
        .style("fill-opacity", function(d) { return z(d.z); })
        .style("fill", function(d) { return d3.interpolateRdBu(d.z); })
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("dblclick",fun);
  }
  function fun(p)
{
  d3.select("#svg2").remove();
  var len = document.getElementById('a').value;
  console.log("len: "+len);
  alert("hi p is: "+p.x+" "+p.y+" "+p.z+" doc: "+document.getElementById('a').value);
  console.log("alerted");
  d3.select("body").append("svg")
    .attr("id","svg2")
    .attr("width", 720 + margin.left + margin.right)
    .attr("height", 720 + margin.top + margin.bottom)
    .style("margin-left", -margin.left + "px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var _matrix=[];
    d3.select("#svg2").select("g").append("rect")
      .attr("class", "background")
      .attr("width", 720)
      .attr("height",720);
    var i,j,i1=0,j1=0;
    for(i=0;i<len;i++)
      _matrix[i] = d3.range(len).map(function(j) { return {x: j, y: i, z: 0}; });
    for(i=p.x;i<parseInt(p.x)+parseInt(len);i++)
    {
      j1=0;
      console.log("p.y: "+p.y);
      console.log("p.y+len: "+(parseInt(p.y)+parseInt(len)));
      for(j=p.y;j<(parseInt(p.y)+parseInt(len));j++)
      {
        console.log("i1: "+i1+" i: "+i);
        console.log("j1: "+j1+" j: "+j);
        _matrix[i1][j1].z += matrix[i][j].z;
        j1++;
      }
      i1++;
    }
    var d=[];
    for (i = 0; i < parseInt(len); i++) {
      d.push(i);
    }
    var y = d3.scale.ordinal().rangeBands([0, 720]);
    y.domain(d);
    console.log("_matrix: ");
    console.log(_matrix);
    var row = d3.select("#svg2").select("g").selectAll(".row")
      .data(_matrix)
    .enter().append("g")
      .attr("id", function(d, i) { return "row"+i; })
      .attr("class", "row")
      .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; })
      .each(row);
    row.append("line")
      .attr("x2", width);
    row.append("text")
      .attr("x", -6)
      .attr("y", y.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "end")
      .text(function(d, i) { return p.y+i; });
    var column = d3.select("#svg2").select("g").selectAll(".column")
      .data(_matrix)
    .enter().append("g")
      .attr("id", function(d, i) { return "col"+i; })
      .attr("class", "column")
      .attr("transform", function(d, i) { return "translate(" + y(i) + ")rotate(-90)"; });
    column.append("line")
      .attr("x1", -width);

    column.append("text")
      .attr("x", 6)
      .attr("y", y.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "start")
      .text(function(d, i) { return p.x+i; });
    function row(row) {
    var cell = d3.select(this).selectAll(".cell")
    .data(row.filter(function(d) { return d.z; }))
      .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d) { return y(d.x); })
        .attr("width", y.rangeBand())
        .attr("height", y.rangeBand())
        .style("fill-opacity", function(d) { return z(d.z); })
        .style("fill", function(d) { return d3.interpolateRdBu(d.z); });
  }
  console.log("printing:");
  console.log((p+1).x);
 
}
  function mouseover(p) {
    d3.selectAll(".row text").classed("active", function(d, i) { return i == p.y; });
    d3.selectAll(".column text").classed("active", function(d, i) { return i == p.x; });
      d3.select(this).insert("title").text(nodes[p.y].name + "--" + nodes[p.x].name);
      d3.select(this.parentElement)
    .append("rect")
    .attr("class", "highlight")
    .attr("width", width)
    .attr("height", x.rangeBand());
      d3.select("#col"+p.x)
    .append("rect")
    .attr("class", "highlight")
    .attr("x", -width)
    .attr("width", width)
    .attr("height", x.rangeBand());
  }

  function mouseout(p) {
    d3.selectAll("text").classed("active", false);
      d3.select(this).select("title").remove();
      d3.selectAll(".highlight").remove();
  }

    var currentOrder = 'name';

    function order(value) {
  var o = orders[value];
  currentOrder = value;
  
  if (typeof o === "function") {
      orders[value] = o.call();
  }
  x.domain(orders[value]);

  var t = svg.transition().duration(1500);

  t.selectAll(".row")
            .delay(function(d, i) { return x(i) * 4; })
            .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
      .selectAll(".cell")
            .delay(function(d) { return x(d.x) * 4; })
            .attr("x", function(d) { return x(d.x); });

  t.selectAll(".column")
            .delay(function(d, i) { return x(i) * 4; })
            .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });
    }

    function distance(value) {
  leafOrder.distance(science.stats.distance[value]);

  if (currentOrder == 'leafOrder') {
      orders.leafOrder = computeLeaforder;
      order("leafOrder");
      //d3.select("#order").property("selectedIndex", 3);
  }
  else if (currentOrder == 'leafOrderDist') {
      orders.leafOrderDist = computeLeaforderDist;
      order("leafOrderDist");
      //d3.select("#order").property("selectedIndex", 4);
  }

  // leafOrder.forEach(function(lo, i) {
  //      nodes[lo].leafOrder = i;
  //  });
  //  orders.leafOrder = d3.range(n).sort(function(a, b) {
  //      return nodes[b].leafOrder - nodes[a].leafOrder; });
    }

    matrix.order = order;
    matrix.distance = distance;

    var timeout = setTimeout(function() {}, 1000);
    matrix.timeout = timeout;
    console.log("ui changes done");
    return matrix;
}
function loadJson_small(json)
{
  console.log("checking the global variable:");
  console.log(m1);
   var mat1 = smaller_matrix(m1);
  console.log("inside makeSmall:");
  console.log("mat1:");
  console.log(mat1);
  var mat2 = matrix2(mat1);
  d3.select("#order").on("change", function() {
//  clearTimeout(mat.timeout);
  mat2.order(this.value);
  console.log(this.value);
    });
    d3.select("#distance").on("change", function() {
//  clearTimeout(mat.timeout);
  mat2.distance(this.value);
    });
}
function loadJson(json) {
     m1 = matrix(json);
    console.log("mat:");
    console.log(m1);

    d3.select("#order").on("change", function() {
//  clearTimeout(mat.timeout);
  m1.order(this.value);
  console.log(this.value);
    });
    d3.select("#distance").on("change", function() {
//  clearTimeout(mat.timeout);
  m1.distance(this.value);
    });
}

