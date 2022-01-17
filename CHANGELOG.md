# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [WIP]
### Added
- smarter grouping (like yEd)
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/3
- basic state renaming on add from sidebar palette, transition clone, or paste.
    - currently doesn't recurse into added groups.
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/15
- sidebar StateSmith palette updates
    - state machine nodes are connected, tighter, underscore in sub state names

## [0.1.0]
### Added
- custom StateSmith shape palette
    - search `ss` or `StateSmith` in palette to bring images to top in sidebar
- improved group enter/exit
    - zoom and location remembered
    - parent expands to fit group when exited
    - enter/exit buttons
    - double click to enter group

