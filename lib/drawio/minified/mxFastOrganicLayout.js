function mxFastOrganicLayout(a) {
  mxGraphLayout.call(this, a);
}
mxFastOrganicLayout.prototype = new mxGraphLayout();
mxFastOrganicLayout.prototype.constructor = mxFastOrganicLayout;
mxFastOrganicLayout.prototype.useInputOrigin = !0;
mxFastOrganicLayout.prototype.resetEdges = !0;
mxFastOrganicLayout.prototype.disableEdgeStyle = !0;
mxFastOrganicLayout.prototype.forceConstant = 50;
mxFastOrganicLayout.prototype.forceConstantSquared = 0;
mxFastOrganicLayout.prototype.minDistanceLimit = 2;
mxFastOrganicLayout.prototype.maxDistanceLimit = 500;
mxFastOrganicLayout.prototype.minDistanceLimitSquared = 4;
mxFastOrganicLayout.prototype.initialTemp = 200;
mxFastOrganicLayout.prototype.temperature = 0;
mxFastOrganicLayout.prototype.maxIterations = 0;
mxFastOrganicLayout.prototype.iteration = 0;
mxFastOrganicLayout.prototype.allowedToRun = !0;
mxFastOrganicLayout.prototype.isVertexIgnored = function(a) {
  return mxGraphLayout.prototype.isVertexIgnored.apply(this, arguments) || 0 == this.graph.getConnections(a).length;
};
mxFastOrganicLayout.prototype.execute = function(a) {
  var b = this.graph.getModel();
  this.vertexArray = [];
  for (var c = this.graph.getChildVertices(a), d = 0; d < c.length; d++)
    this.isVertexIgnored(c[d]) || this.vertexArray.push(c[d]);
  var e = this.useInputOrigin ? this.graph.getBoundingBoxFromGeometry(this.vertexArray) : null,
    f = this.vertexArray.length;
  this.indices = [];
  this.dispX = [];
  this.dispY = [];
  this.cellLocation = [];
  this.isMoveable = [];
  this.neighbours = [];
  this.radius = [];
  this.radiusSquared = [];
  0.001 > this.forceConstant && (this.forceConstant = 0.001);
  this.forceConstantSquared = this.forceConstant * this.forceConstant;
  for (d = 0; d < this.vertexArray.length; d++) {
    var g = this.vertexArray[d];
    this.cellLocation[d] = [];
    var k = mxObjectIdentity.get(g);
    this.indices[k] = d;
    var l = this.getVertexBounds(g),
      m = l.width,
      n = l.height,
      p = l.x,
      r = l.y;
    this.cellLocation[d][0] = p + m / 2;
    this.cellLocation[d][1] = r + n / 2;
    this.radius[d] = Math.min(m, n);
    this.radiusSquared[d] = this.radius[d] * this.radius[d];
  }
  b.beginUpdate();
  try {
    for (d = 0; d < f; d++) {
      this.dispX[d] = 0;
      this.dispY[d] = 0;
      this.isMoveable[d] = this.isVertexMovable(this.vertexArray[d]);
      var q = this.graph.getConnections(this.vertexArray[d], a);
      c = this.graph.getOpposites(q, this.vertexArray[d]);
      this.neighbours[d] = [];
      for (m = 0; m < c.length; m++) {
        this.resetEdges && this.graph.resetEdge(q[m]);
        this.disableEdgeStyle && this.setEdgeStyleEnabled(q[m], !1);
        k = mxObjectIdentity.get(c[m]);
        var t = this.indices[k];
        this.neighbours[d][m] = null != t ? t : d;
      }
    }
    this.temperature = this.initialTemp;
    0 == this.maxIterations && (this.maxIterations = 20 * Math.sqrt(f));
    for (this.iteration = 0; this.iteration < this.maxIterations; this.iteration++) {
      if (!this.allowedToRun)
        return;
      this.calcRepulsion();
      this.calcAttraction();
      this.calcPositions();
      this.reduceTemperature();
    }
    a = c = null;
    for (d = 0; d < this.vertexArray.length; d++)
      g = this.vertexArray[d], this.isVertexMovable(g) && (l = this.getVertexBounds(g), null != l && (this.cellLocation[d][0] -= l.width / 2, this.cellLocation[d][1] -= l.height / 2, p = this.graph.snap(Math.round(this.cellLocation[d][0])), r = this.graph.snap(Math.round(this.cellLocation[d][1])), this.setVertexLocation(g, p, r), c = null == c ? p : Math.min(c, p), a = null == a ? r : Math.min(a, r)));
    d = -(c || 0) + 1;
    g = -(a || 0) + 1;
    null != e && (d += e.x, g += e.y);
    this.graph.moveCells(this.vertexArray, d, g);
  } finally {
    b.endUpdate();
  }
};
mxFastOrganicLayout.prototype.calcPositions = function() {
  for (var a = 0; a < this.vertexArray.length; a++)
    if (this.isMoveable[a]) {
      var b = Math.sqrt(this.dispX[a] * this.dispX[a] + this.dispY[a] * this.dispY[a]);
      0.001 > b && (b = 0.001);
      var c = this.dispX[a] / b * Math.min(b, this.temperature);
      b = this.dispY[a] / b * Math.min(b, this.temperature);
      this.dispX[a] = 0;
      this.dispY[a] = 0;
      this.cellLocation[a][0] += c;
      this.cellLocation[a][1] += b;
    }
};
mxFastOrganicLayout.prototype.calcAttraction = function() {
  for (var a = 0; a < this.vertexArray.length; a++)
    for (var b = 0; b < this.neighbours[a].length; b++) {
      var c = this.neighbours[a][b];
      if (a != c && this.isMoveable[a] && this.isMoveable[c]) {
        var d = this.cellLocation[a][0] - this.cellLocation[c][0],
          e = this.cellLocation[a][1] - this.cellLocation[c][1],
          f = d * d + e * e - this.radiusSquared[a] - this.radiusSquared[c];
        f < this.minDistanceLimitSquared && (f = this.minDistanceLimitSquared);
        var g = Math.sqrt(f);
        f /= this.forceConstant;
        d = d / g * f;
        e = e / g * f;
        this.dispX[a] -= d;
        this.dispY[a] -= e;
        this.dispX[c] += d;
        this.dispY[c] += e;
      }
    }
};
mxFastOrganicLayout.prototype.calcRepulsion = function() {
  for (var a = this.vertexArray.length, b = 0; b < a; b++)
    for (var c = b; c < a; c++) {
      if (!this.allowedToRun)
        return;
      if (c != b && this.isMoveable[b] && this.isMoveable[c]) {
        var d = this.cellLocation[b][0] - this.cellLocation[c][0],
          e = this.cellLocation[b][1] - this.cellLocation[c][1];
        0 == d && (d = 0.01 + Math.random());
        0 == e && (e = 0.01 + Math.random());
        var f = Math.sqrt(d * d + e * e),
          g = f - this.radius[b] - this.radius[c];
        g > this.maxDistanceLimit || (g < this.minDistanceLimit && (g = this.minDistanceLimit), g = this.forceConstantSquared / g, d = d / f * g, e = e / f * g, this.dispX[b] += d, this.dispY[b] += e, this.dispX[c] -= d, this.dispY[c] -= e);
      }
    }
};
mxFastOrganicLayout.prototype.reduceTemperature = function() {
  this.temperature = this.initialTemp * (1 - this.iteration / this.maxIterations);
};