/*global Viva*/
var colors = [
             "#1f77b4", "#aec7e8",
             "#ff7f0e", "#ffbb78",
             "#2ca02c", "#98df8a",
             "#d62728", "#ff9896",
             "#9467bd", "#c5b0d5",
             "#8c564b", "#c49c94",
             "#e377c2", "#f7b6d2",
             "#7f7f7f", "#c7c7c7",
             "#bcbd22", "#dbdb8d",
             "#17becf", "#9edae5"
             ];
function beginRemoveNodesLoop(graph){
    var nodesLeft = [];
    graph.forEachNode(function(node){
        nodesLeft.push(node.id);
    });
    var removeInterval = setInterval(function(){
         var nodesCount = nodesLeft.length;
         if (nodesCount > 0){
             var nodeToRemove = Math.min((Math.random() * nodesCount) << 0, nodesCount - 1);
             graph.removeNode(nodesLeft[nodeToRemove]);
             nodesLeft.splice(nodeToRemove, 1);
         }
         if (nodesCount === 0) {
             clearInterval(removeInterval);
             setTimeout(function(){
                 beginAddNodesLoop(graph);
             }, 100);
         }
     }, 100);
}
function beginAddNodesLoop(graph){
   var i = 0, m = 10, n = 20;
     var addInterval = setInterval(function(){
         graph.beginUpdate();
         for (var j = 0; j < m; ++j){
             var node = i + j * n;
             if (i > 0) { graph.addLink(node, i - 1 + j * n); }
             if (j > 0) { graph.addLink(node, i + (j - 1) * n); }
         }
         i++;
         graph.endUpdate();
         if (i >= n) {
             clearInterval(addInterval);
             setTimeout(function() {
                 beginRemoveNodesLoop(graph);
             }, 10000);
         }
     }, 100);
}
function onLoad() {
    var graph = Viva.Graph.graph();
    var layout = Viva.Graph.Layout.forceDirected(graph, {
        springLength : 10,
        springCoeff : 0.0008,
        dragCoeff : 0.02,
        gravity : -1.2
    });
    var graphics = Viva.Graph.View.svgGraphics();
    graphics.node(function(node){
       return Viva.Graph.svg('rect')
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', node.data ? node.data : '#00a2e8');
    });
    var renderer = Viva.Graph.View.renderer(graph,
        {
            layout     : layout,
            graphics   : graphics,
            container  : document.getElementById('graphConainer'),
            renderLinks : true
        });
    renderer.run(50);
    beginAddNodesLoop(graph);
    l = layout;
}
