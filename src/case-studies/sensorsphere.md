---
layout: case-study.njk
title: "SensorSphere: Robot Sensor Hub and Selection Engine"
subtitle: "An open-source desktop tool that cuts sensor integration scoping from weeks to days"
pageTitle: "SensorSphere Case Study | Sahil Panjwani"
pageDescription: "How I built an open-source desktop tool that helps robotics engineers evaluate and select sensors across cameras, LiDAR, IMU, and radar, with automated ROS launch file generation."
role: "Sole Developer and Maintainer"
organization: "Open Source (Apache 2.0)"
duration: "2025 – Present"
techStack:
  - Python 3.10+
  - PySide6 / Qt
  - Pandas
  - Matplotlib
  - Plotly
  - Pydantic v2
  - PyYAML
heroImage: "/img/sensorsphere-screenshot"
heroAlt: "SensorSphere desktop application showing sensor comparison table with radar chart visualization for LiDAR, camera, and IMU sensors"
heroWidth: 2554
heroHeight: 1540
github: "https://github.com/Sahil-cmd/sensor-sphere"
tags:
  - case-study
permalink: /case-studies/sensorsphere/
caseStudy: true
---

## The Problem

Robotics engineers routinely spend **weeks** at the start of every new project on sensor selection. The process typically follows the same pattern: download dozens of datasheets from different manufacturers, each with different spec formats and units. Manually cross-reference ROS driver availability. Build ad-hoc spreadsheets to compare tradeoffs between price, accuracy, range, resolution, and interface compatibility. Repeat for every sensor modality (cameras, LiDAR, IMU, radar).

The cost of choosing the wrong sensor compounds quickly: project timelines slip, budgets overrun, and integration issues surface months into development when switching is most expensive. With over 200 sensor options across these four modalities, the risk of a suboptimal choice is high.

There was no centralized, structured tool for multi-criteria sensor comparison in the robotics space. Engineers were reinventing this work on every project, and the knowledge stayed locked in individual spreadsheets that were never shared or standardized.

I saw this pattern repeat across multiple teams and decided to solve it once, properly, as an open-source tool.

## Constraints

The tool had to meet several hard requirements driven by real-world robotics engineering environments:

- **Offline-first**: Many robotics labs and production facilities are air-gapped or have restricted internet access. The tool must work entirely offline with no cloud dependencies.
- **Cross-platform**: Teams use Linux as their primary development OS, but some use Windows or macOS. The UI framework had to be cross-platform without compromise.
- **Multi-modality**: Must support cameras, LiDAR, IMU, and radar sensors, each with fundamentally different spec parameters.
- **ROS integration**: Must validate ROS 1 and ROS 2 driver availability and generate launch file templates, since ROS compatibility is a primary selection criterion.
- **Data integrity**: Sensor specifications must be validated against a schema to prevent bad data from corrupting comparisons. Manufacturer specs change; the data pipeline must be auditable.
- **Zero-friction installation**: The tool installs with a single `pip install` command and launches immediately, with no manual configuration or setup steps required.

## My Role

I am the sole developer and maintainer of SensorSphere, responsible for every layer of the project:

- **Architecture**: Designed the full application structure: YAML-based sensor database with two-stage schema validation, a layered GUI with dockable panels, and clean separation between data, logic, and presentation. Packaged as a pip-installable tool for zero-friction adoption.
- **UI/UX**: Built the full PySide6/Qt interface from scratch with sortable comparison tables, interactive radar charts, dark/light theme support with system detection, and responsive layout for different screen sizes.
- **Search and filtering**: Implemented an intelligent search system that lets engineers find sensors by typing natural questions (e.g., "Intel depth cameras under $500 with ROS2 support"), combining boolean filters across any specification, or searching approximate names with typo tolerance. This was one of the most requested features from the robotics community.
- **Data pipeline**: Sourced and validated 50+ sensor specifications from manufacturer datasheets. Built schema validation to catch errors before they reach the comparison engine.
- **ROS tooling**: Implemented automated ROS 1 and ROS 2 launch file generation and parameter template export, the other top-requested feature from robotics engineers.

## Architecture and Approach

I structured SensorSphere as a **layered desktop application** with clear separation between data, logic, and presentation:

**Data layer**: Sensor specifications stored as YAML files with hierarchical organization by modality. Each sensor file is validated against a strict schema at load time (Yamale), with Pydantic v2 models providing a second validation layer at runtime. This two-stage validation catches data errors early and keeps the database auditable.

**Search engine**: The search system gives engineers three ways to find the right sensor:

- **Natural language queries**: Engineers type questions like "Intel depth cameras under $500" or "compact LiDAR for outdoor SLAM", and the parser extracts price constraints, performance requirements, manufacturer preferences, and application context to return matching sensors.
- **Structured filters**: Engineers can combine conditions across any specification (price range, resolution, frame rate, FOV, weight, ROS compatibility) with full boolean logic for precise queries.
- **Fuzzy matching**: Handles typos, abbreviations (e.g., "fps" matches "frame rate"), and partial model names so engineers find what they need without memorizing exact terminology.

**Comparison engine**: Pandas DataFrames underpin the filtering and comparison logic. Multi-criteria filtering supports modality-specific parameters, and the engine normalizes heterogeneous specs into comparable dimensions for radar chart generation.

**Visualization**: Matplotlib handles static radar charts for PDF export. Plotly provides interactive charts within the application for exploration. Both visualization paths share the same normalized data pipeline.

**ROS integration**: The tool reads a curated mapping of sensors to verified ROS driver packages. For each selected sensor, it generates a launch file skeleton with the correct parameters pre-filled, saving engineers the tedious process of reading driver documentation and writing boilerplate.

**Export pipeline**: PDF reports include radar chart comparisons, spec tables, and ROS compatibility notes. CSV export enables further analysis in external tools.

Unlike general-purpose AI assistants, SensorSphere delivers **deterministic results**: the same query always returns the same sensors. Every specification comes from verified manufacturer datasheets, not generated text. And the output is directly actionable: engineers get ROS launch files and comparison reports they can use immediately, not conversation threads they need to manually translate into configurations.

## Key Results

<div class="results-grid">
  <div class="result-card">
    <div class="result-metric">50+</div>
    <div class="result-label">Validated Sensors</div>
    <div class="result-detail">Cameras, LiDAR, IMU, and radar with verified specs and ROS driver mappings</div>
  </div>
  <div class="result-card">
    <div class="result-metric">200+</div>
    <div class="result-label">Downloads</div>
    <div class="result-detail">Adopted by academic and commercial robotics teams</div>
  </div>
  <div class="result-card">
    <div class="result-metric">10x</div>
    <div class="result-label">Faster Sensor Scoping</div>
    <div class="result-detail">Weeks of spreadsheet work reduced to a single day</div>
  </div>
  <div class="result-card">
    <div class="result-metric">Apache 2.0</div>
    <div class="result-label">Open Source License</div>
    <div class="result-detail">Free for commercial and academic use</div>
  </div>
  <div class="result-card">
    <div class="result-metric">Offline-First</div>
    <div class="result-label">Zero Runtime Dependencies</div>
    <div class="result-detail">No internet, no API keys, no cloud accounts</div>
  </div>
  <div class="result-card">
    <div class="result-metric">Smart Search</div>
    <div class="result-label">Natural Language Queries</div>
    <div class="result-detail">Find sensors by asking "depth cameras under $500 with ROS2"</div>
  </div>
</div>

## Roadmap

The following improvements are actively planned and expected in upcoming releases:

- **Automated datasheet parsing**: Use LLMs to extract structured specs from PDF datasheets automatically. Currently, sensor data is manually curated, which limits scaling.
- **Web-based version**: A browser-based companion would lower the barrier to entry for teams that cannot install desktop software.
- **Community-contributed sensor profiles**: Build a submission and review pipeline so the robotics community can contribute and validate new sensor entries, similar to how ROS packages are indexed.
- **Sensor recommendation engine**: Apply multi-objective optimization to suggest sensor combinations given a set of project constraints (budget, environment, required modalities).
