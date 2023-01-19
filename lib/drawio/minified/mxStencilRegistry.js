var mxStencilRegistry = {
  stencils: {},
  addStencil: function(a, b) {
    mxStencilRegistry.stencils[a] = b;
  },
  getStencil: function(a) {
    return mxStencilRegistry.stencils[a];
  }
};