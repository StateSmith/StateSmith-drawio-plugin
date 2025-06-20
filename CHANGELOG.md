# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [wip]


---

## [0.6.0]
### Changed
- Updated auto namer for new default name conflict resolution.
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/32
### Added
- Added "Find by ID" helper dialog.
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/33
- Visibility fix for upstream vscode draw.io visibility issue.
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/34

---

## [0.5.0]
### Added
- Current group (and ancestors) are now expanded just prior to file save to prevent problem where child is outside of parent group.
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/28
- Added ability to delete initial states and history vertices
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/27

---

## [0.4.0]
### Added
- UnGroup warning now uses EditorUiHandleError function so that it works with vscode extension as well as browser.
- Add `RenderConfig` to sidebar palette.
    - https://github.com/StateSmith/StateSmith/issues/23

---

## [0.3.0]
### Added
- simplified and improved smarter enter/exit
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/11
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/10
    - `home` functionality now expands groups as needed
    - UNDO/REDO works great now with keeping proper view frame

---

## [0.2.1]
### Fixed
- fix smarter delete for when multiple cells connected
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/2

---

## [0.2.0]
### Added
- smarter grouping (like yEd)
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/3
- basic state renaming on add from sidebar palette, transition clone, or paste.
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/15
    - currently doesn't recurse into added groups.
- sidebar StateSmith palette updates
    - state machine nodes are connected, tighter, underscore in sub state names
- smarter enter/exit to allow for "undo" behavior
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/11
    - `home` functionality taken into account now
- smarter delete (like yEd)
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/2
- prevent special event handler text from being ungrouped or removed from group
    - https://github.com/StateSmith/StateSmith-drawio-plugin/issues/9

---

## [0.1.0]
### Added
- custom StateSmith shape palette
    - search `ss` or `StateSmith` in palette to bring images to top in sidebar
- improved group enter/exit
    - zoom and location remembered
    - parent expands to fit group when exited
    - enter/exit buttons
    - double click to enter group

