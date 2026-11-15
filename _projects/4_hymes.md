---
layout: page
title: HyMES
description: Physics-informed uncertainty and diagnostics for streamflow model evaluation
img: assets/img/projects/hymes-demo.jpg
importance: 4
area: evaluation
---

HyMES (Hydrological Model Evaluation System) evaluates streamflow models such as the National Water Model against USGS gauges, entirely in the browser. For each station it runs structural diagnostics (stationarity, trend, seasonality, autocorrelation, flow-duration and hysteresis signatures), MCMC-based uncertainty quantification with ensemble skill scores, and a forecasting playground where physics priors like precipitation gain, soil moisture and roughness can be adjusted live.

{% include demo_video.html src="hymes-demo.mp4" poster="hymes-demo.jpg" alt="HyMES New Orleans case study showing structural diagnostics, uncertainty quantification and the forecasting playground" caption="New Orleans case study: USGS gauges against NWM v2.1 and v3.0 (1.5× speed)." %}

<div class="project-links">
  <a class="btn btn-sm z-depth-0" href="https://hydroinformatics.tulane.edu/lab/hymes/">Open HyMES</a>
  <a class="btn btn-sm z-depth-0" href="https://doi.org/10.31223/X5RF7C">Preprint</a>
</div>

**Preprint:** Erazo, C., Sermet, Y., Jannesari, A., Lu, C., & Demir, I. (2026). A unified and scalable framework for the comprehensive evaluation of hydrological model behavior and structural diagnostics. *EarthArXiv*, under review.

Supported by NSF award 2611747 (collaborator).
