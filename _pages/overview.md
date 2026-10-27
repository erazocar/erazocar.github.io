---
layout: page
permalink: /overview/
title: overview
description: Everything on one page. Hover a mark for details, or select a tool to light up the papers and talks about it.
nav: true
nav_order: 0
---
{%- assign w = site.data.work -%}
{%- assign articles = w.outputs | where: "type", "article" -%}
{%- assign preprints = w.outputs | where: "type", "preprint" -%}
{%- assign talks = w.outputs | where: "type", "talk" -%}
{%- assign trainings = w.outputs | where: "type", "training" -%}

<div class="viz-root">

<div class="stat-grid">
  <div class="stat"><div class="stat-label">Peer-reviewed papers</div><div class="stat-value">{{ articles | size }}</div></div>
  <div class="stat"><div class="stat-label">Preprints and under review</div><div class="stat-value">{{ preprints | size }}</div><div class="stat-note">+{{ w.stats.in_preparation }} in preparation</div></div>
  <div class="stat"><div class="stat-label">Talks and posters</div><div class="stat-value">{{ talks | size }}</div></div>
  <div class="stat"><div class="stat-label">Trainings and workshops</div><div class="stat-value">{{ trainings | size }}</div></div>
  <div class="stat"><div class="stat-label">Open-source tools</div><div class="stat-value">{{ w.software | size }}</div></div>
  <div class="stat"><div class="stat-label">Research grants</div><div class="stat-value">{{ w.stats.grants_pi | plus: w.stats.grants_collaborator }}</div><div class="stat-note">PI on {{ w.stats.grants_pi }} (CUAHSI), collaborator on {{ w.stats.grants_collaborator }} (NSF)</div></div>
  <div class="stat"><div class="stat-label">Students mentored</div><div class="stat-value">{{ w.stats.mentees }}</div></div>
  <div class="stat"><div class="stat-label">Peer reviews</div><div class="stat-value">{{ w.stats.reviews }}</div></div>
</div>

<h2 class="viz-title">Career timeline</h2>
<div class="viz-legend" aria-hidden="true">
  <span><i class="key dot" style="background:var(--s-article)"></i>Peer-reviewed paper</span>
  <span><i class="key dot" style="background:var(--s-preprint)"></i>Preprint</span>
  <span><i class="key dot" style="background:var(--s-talk)"></i>Talk or poster</span>
  <span><i class="key dot" style="background:var(--s-training)"></i>Training taught</span>
  <span><i class="key diamond"></i>Award or grant</span>
</div>
<div class="viz-toolbar"><span id="viz-filter-note">Select a tool in the Software lane to filter.</span> <button type="button" id="viz-clear" hidden>Show everything</button></div>
<div id="timeline" class="viz-chart" role="img" aria-label="Timeline from 2009 to 2026 of education, positions, software, awards, and research outputs. The same data is in the table below."></div>
<div id="viz-tip" class="viz-tip" role="status" hidden></div>

<h2 class="viz-title">Software</h2>
<table class="viz-table software-table">
  <tbody>
  {%- assign tools = w.software | sort: "start" | reverse -%}
  {%- for t in tools %}
    <tr><td class="tool"><a href="{{ t.url }}">{{ t.label }}</a></td><td class="num">{{ t.start | floor }}</td><td>{{ t.desc }}</td></tr>
  {%- endfor %}
  </tbody>
</table>

<details class="viz-details">
  <summary>All outputs as a table ({{ w.outputs | size }})</summary>
  <table class="viz-table">
    <thead><tr><th class="num">Year</th><th>Type</th><th>Title</th><th>Venue</th></tr></thead>
    <tbody>
    {%- assign sorted = w.outputs | sort: "year" | reverse -%}
    {%- for o in sorted %}
      <tr><td class="num">{{ o.year }}</td><td>{% case o.type %}{% when "article" %}Paper{% when "preprint" %}Preprint{% when "talk" %}Talk/poster{% else %}Training{% endcase %}</td><td>{% if o.url %}<a href="{{ o.url }}">{{ o.title }}</a>{% else %}{{ o.title }}{% endif %}</td><td>{{ o.venue }}</td></tr>
    {%- endfor %}
    </tbody>
  </table>
</details>

</div>

<script id="work-data" type="application/json">{{ w | jsonify }}</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js"></script>
<script src="{{ '/assets/js/overview.js' | relative_url }}"></script>
