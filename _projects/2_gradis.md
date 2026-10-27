---
layout: page
title: GRADIS
description: A complete 2D/3D flood modeling environment that runs in the browser
img: assets/img/projects/gradis-card.jpg
importance: 2
---

GRADIS (GPU-Accelerated Real-Time Dynamic Inundation Simulation) is a full flood modeling environment. You bring in terrain for a site, set up rainfall, river inflows and boundary conditions, add levees, buildings, land cover and infiltration, place gauges, pick a physics solver, and run the 2D/3D inundation in real time, with surfaces and hydrographs to export. Everything runs as WebGPU compute on the user's own GPU: nothing to install, no server queue.

{% include demo_video.html src="gradis-bonnet-carre-2d.mp4" poster="gradis-bonnet-carre-2d.jpg" alt="GRADIS 2D simulation of the Bonnet Carré Spillway opening during the 2019 Mississippi River flood" caption="Bonnet Carré Spillway, 2019: the Mississippi at about 33,700 m³/s and the spillway diverting flow into the floodway toward Lake Pontchartrain (1.2× speed)." %}

{% include demo_video.html src="gradis-bonnet-carre-3d.mp4" poster="gradis-bonnet-carre-3d.jpg" alt="GRADIS 3D view of the Bonnet Carré Spillway simulation over satellite imagery" caption="The same run in 3D over satellite imagery." %}

<div class="project-links">
  <a class="btn btn-sm z-depth-0" href="https://hydroinformatics.tulane.edu/lab/gradis/">Open GRADIS (WebGPU)</a>
</div>

**Paper:** Erazo, C., & Demir, I. *GRADIS: Browser-based GPU-accelerated real-time dynamic inundation simulation sandbox.* Manuscript in preparation.
