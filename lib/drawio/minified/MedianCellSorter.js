function MedianCellSorter() {}
MedianCellSorter.prototype.medianValue = 0;
MedianCellSorter.prototype.cell = !1;
MedianCellSorter.prototype.compare = function(a, b) {
  return null != a && null != b ? b.medianValue > a.medianValue ? -1 : b.medianValue < a.medianValue ? 1 : 0 : 0;
};