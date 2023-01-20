#!/usr/bin/env dotnet-script

// ensure that dotnet-script is installed.
// call like this: dotnet-script ./build.csx

using System;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

public static string GetScriptPath([CallerFilePath] string path = null) => path;
public static string GetScriptFolder([CallerFilePath] string path = null) => Path.GetDirectoryName(path);

private const string FINAL_JS_FILE = "plugin.js";
private readonly string thisDir = GetScriptFolder();
private readonly string srcDir = thisDir + "/src";
StringBuilder sb = new();
var jsFileNames = Directory.GetFiles(srcDir, "*.js").Select((filePath) => Path.GetFileName(filePath)).ToList();

Console.WriteLine("starting. Current dir: " + thisDir);

// any files listed below will be appended in this order
Stack<string> desiredOrder = new(new List<string>(){
    "StateSmithUiVersion.js",
    "StateSmithUi.js",
    "StateSmithUiStyles.js",
});

// default sort all by name
jsFileNames.Sort();

// default to put final file at end of list
RemoveFromListOrThrow(FINAL_JS_FILE);
jsFileNames.Add(FINAL_JS_FILE);

// perform sorting
while (desiredOrder.Any())
{
    var toMoveToFront = desiredOrder.Pop();
    RemoveFromListOrThrow(toMoveToFront);
    jsFileNames.Insert(0, toMoveToFront);
}

// append files to output
foreach (string fileName in jsFileNames)
{
    AppendFileContents(fileName);
}

var text = sb.ToString();
text = CleanupOutput(text);

File.WriteAllText(thisDir + "/dist/StateSmith-drawio-plugin.js", text);
Console.WriteLine("finished");


//////////////////////////////////////////////////

void RemoveFromListOrThrow(string toFind)
{
    if (!jsFileNames.Remove(toFind)) throw new Exception("didn't find file " + toFind);
}

void AppendFileContents(string fileName)
{
    string filePath = srcDir + "/" + fileName;
    sb.Append($"// {fileName}\n");
    sb.Append(File.ReadAllText(filePath));
    sb.Append("\n\n");
    Console.WriteLine("appending: " + fileName);
}

static string CleanupOutput(string text)
{
    const string commentLineStart = @"(?m)^\s*//\s*";
    text = Regex.Replace(text, $@"{commentLineStart}.*below line allows you to see in chrome dev tools sources.*\s*", "");
    text = Regex.Replace(text, $@"{commentLineStart}.*you can alternatively save a script.*\s*", "");
    text = Regex.Replace(text, $@"{commentLineStart}#\s*sourceURL=StateSmith[^-].*\s*", "");
    text = Regex.Replace(text, $@"{commentLineStart}below line turns on typescript checking.*\s*", ""); // strip out comment for output
    text = Regex.Replace(text, $@"{commentLineStart}@ts-check\s*", ""); // strip out typescript checking in output
    return text;
}
