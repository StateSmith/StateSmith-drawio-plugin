function WeightedCellSorter(a, b) {
  this.cell = a;
  this.weightedValue = b;
}
WeightedCellSorter.prototype.weightedValue = 0;
WeightedCellSorter.prototype.nudge = !1;
WeightedCellSorter.prototype.visited = !1;
WeightedCellSorter.prototype.rankIndex = null;
WeightedCellSorter.prototype.cell = null;
WeightedCellSorter.prototype.compare = function(a, b) {
  return null != a && null != b ? b.weightedValue > a.weightedValue ? -1 : b.weightedValue < a.weightedValue ? 1 : b.nudge ? -1 : 1 : 0;
};