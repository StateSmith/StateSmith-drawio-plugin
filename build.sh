#!/bin/bash
# Run this linux bash script to combine all the source files into one file.

combined_file=./dist/StateSmith-drawio-plugin.js

echo > $combined_file

cat ./src/StateSmithUi.js >> $combined_file
cat ./src/StateSmithUiStyles.js >> $combined_file
cat ./src/StateSmithCustomGrouper.js >> $combined_file

cat ./src/plugin.js >> $combined_file
