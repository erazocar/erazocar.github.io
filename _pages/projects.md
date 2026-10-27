---
layout: page
title: projects
permalink: /projects/
description: A few flagship tools, with recorded demos.
nav: true
nav_order: 2
horizontal: false
---

<!-- pages/projects.md -->
<p>The full list of software, papers and talks is on the <a href="{{ '/overview/' | relative_url }}">overview</a> page.</p>
<div class="projects">
  {%- assign sorted_projects = site.projects | sort: "importance" -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
</div>

<h2 class="initiatives-title">Initiatives</h2>
<div class="initiatives">
  {%- for i in site.data.initiatives %}{% if i.text %}
  <div class="card initiative">
    <div class="card-body">
      <h3 class="card-title">{{ i.title }}</h3>
      <p class="initiative-meta">{{ i.role }}{% if i.years %} · {{ i.years }}{% endif %}</p>
      <p class="card-text">{{ i.text }}</p>
      {%- if i.url %}<a class="initiative-link" href="{{ i.url }}">{{ i.link | default: 'Learn more' }} →</a>{% endif %}
    </div>
  </div>
  {%- endif %}{% endfor %}
</div>
