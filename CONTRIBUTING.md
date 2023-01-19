# Build scripts use cross platform C# scripts
Type `dotnet --version` on the command line to see if you have the C# [dotnet 6 (or newer) sdk installed](https://dotnet.microsoft.com/en-us/download/dotnet/sdk-for-vs-code).

If not, download using the link above.
```console
dotnet --version
6.0.401
```

Install the dotnet-script tool with the below command:
```bash
dotnet tool install -g dotnet-script
```

# Setup vscode project for c# script files
Run the below command so that vscode can debug and navigate c# script files (.csx) in this directory.

```bash
dotnet-script init delete_me_dummy_file.csx
```

This will update the `.vscode/launch.json` file to enable c# script debugging and code completion.

You can delete the `delete_me_dummy_file.csx` file afterwards.

```bash
rm ./delete_me_dummy_file.csx
```

Now use the vscode command pallette to run `OmniSharp: Restart OmniSharp` or restart vscode and you should be good to go.