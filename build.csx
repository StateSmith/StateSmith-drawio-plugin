using System;
using System.Runtime.CompilerServices;

public static string GetScriptPath([CallerFilePath] string path = null) => path;
public static string GetScriptFolder([CallerFilePath] string path = null) => Path.GetDirectoryName(path);

private const string FINAL_JS_FILE = "plugin.js";
private readonly string thisDir = GetScriptFolder();
private readonly string srcDir = thisDir + "/src/";
StringBuilder sb = new();
var jsFiles = Directory.GetFiles(srcDir, "*.js");
var appendAfter = new List<string>();

Console.WriteLine("starting. Current dir: " + thisDir);

Array.Sort(jsFiles); // keep the order consistent
foreach (string filePath in jsFiles)
{
    var fileName = Path.GetFileName(filePath);

    if (fileName == FINAL_JS_FILE)
    {
        appendAfter.Add(filePath);
    }
    else
    {
        AppendFileContents(filePath, fileName);
    }
}

foreach (var laterFilePath in appendAfter)
{
    AppendFileContents(laterFilePath, Path.GetFileName(laterFilePath));
}

File.WriteAllText(thisDir + "/dist/StateSmith-drawio-plugin.js", sb.ToString());
Console.WriteLine("finished");


//////////////////////////////////////////////////

void AppendFileContents(string filePath, string fileName)
{
    sb.Append($"// {fileName}\n");
    sb.Append(File.ReadAllText(filePath));
    sb.Append("\n\n");
    Console.WriteLine("appending: " + fileName);
}
