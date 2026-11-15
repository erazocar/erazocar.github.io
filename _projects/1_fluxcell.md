---
layout: page
title: FluxCell
description: A fused single-dispatch MUSCL-Hancock HLLC scheme for the shallow-water equations on WebGPU
img: assets/img/projects/fluxcell-grandisle-ida.jpg
importance: 1
area: simulation
---

FluxCell is a numerical scheme: second-order MUSCL-Hancock reconstruction with HLLC Riemann fluxes for the 2D shallow-water equations, with the whole time step fused into a single WebGPU compute dispatch. Fusing the reconstruction, flux and update stages avoids round trips between GPU passes, which is what lets a second-order shock-capturing solver run at interactive rates on real terrain (USGS 3DEP, NOAA CUDEM).

<div class="demo-clip">
  <img src="{{ 'assets/img/projects/fluxcell-grandisle-ida.webp' | relative_url }}" alt="FluxCell simulation of Hurricane Ida storm surge and surf at Grand Isle, Louisiana" loading="lazy">
  <p class="caption">Hurricane Ida surge and surf over Grand Isle, LA (recorded in FluxCell).</p>
</div>

<div class="row">
  <div class="col-sm demo-clip">
    <img src="{{ 'assets/img/projects/fluxcell-yosemite2m-release.webp' | relative_url }}" alt="FluxCell simulation of a water release over El Capitan, Yosemite" loading="lazy">
    <p class="caption">Yosemite: a release over El Capitan.</p>
  </div>
  <div class="col-sm demo-clip">
    <img src="{{ 'assets/img/projects/fluxcell-vortex-street.webp' | relative_url }}" alt="FluxCell simulation of a von Karman vortex street behind a cylinder" loading="lazy">
    <p class="caption">Vortex street behind a cylinder.</p>
  </div>
</div>

<div class="project-links">
  <a class="btn btn-sm z-depth-0" href="https://hydroinformatics.tulane.edu/lab/fluxcell/">Open the app (WebGPU)</a>
  <a class="btn btn-sm z-depth-0" href="https://github.com/uihilab/fluxcell">Code</a>
</div>

**Paper:** Erazo, C., & Demir, I. *A fused single-dispatch MUSCL-Hancock HLLC scheme for the shallow-water equations on WebGPU.* In preparation.
