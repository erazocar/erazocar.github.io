// Career timeline for /overview/. Data comes from _data/work.yml via the #work-data script tag.
(function () {
  var el = document.getElementById('timeline');
  if (!el || !window.d3) return;
  var data = JSON.parse(document.getElementById('work-data').textContent);
  var tip = document.getElementById('viz-tip');
  var root = el.closest('.viz-root');
  var clearBtn = document.getElementById('viz-clear');
  var note = document.getElementById('viz-filter-note');
  var NOW = 2026.85;
  var activeTool = null;

  var TYPES = [
    { key: 'article', label: 'Papers', one: 'Peer-reviewed paper', color: 'var(--s-article)' },
    { key: 'preprint', label: 'Preprints', one: 'Preprint', color: 'var(--s-preprint)' },
    { key: 'talk', label: 'Talks & posters', one: 'Talk or poster', color: 'var(--s-talk)' },
    { key: 'training', label: 'Trainings taught', one: 'Training taught', color: 'var(--s-training)' }
  ];
  var typeOf = {};
  TYPES.forEach(function (t) { typeOf[t.key] = t; });
  var toolLabel = {};
  data.software.forEach(function (s) { toolLabel[s.id] = s.label; });

  function endOf(s) { return s.end === 'now' ? NOW : s.end; }

  // Greedy row packing so overlapping spans never sit on top of each other
  function pack(spans) {
    var rows = [];
    spans.slice().sort(function (a, b) { return a.start - b.start; }).forEach(function (s) {
      var r = 0;
      while (rows[r] !== undefined && rows[r] > s.start + 0.01) r++;
      rows[r] = endOf(s);
      s._row = r;
    });
    return rows.length;
  }

  function showTip(evt, html) {
    tip.innerHTML = '';
    html.forEach(function (part) {
      var d = document.createElement('div');
      if (part.cls) d.className = part.cls;
      if (part.key) { var k = document.createElement('span'); k.className = 'tip-key'; k.style.background = part.key; d.appendChild(k); }
      d.appendChild(document.createTextNode(part.text));
      tip.appendChild(d);
    });
    tip.hidden = false;
    var box = root.getBoundingClientRect();
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    var px, py;
    if (evt && evt.clientX !== undefined && evt.type !== 'focus') { px = evt.clientX - box.left; py = evt.clientY - box.top; }
    else { var r = evt.target.getBoundingClientRect(); px = r.left + r.width / 2 - box.left; py = r.top - box.top; }
    var x = Math.min(Math.max(px - tw / 2, 0), box.width - tw);
    var y = py - th - 12;
    if (y < 0) y = py + 18;
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
  }
  function hideTip() { tip.hidden = true; }

  function render() {
    var width = el.clientWidth;
    var narrow = width < 600;
    var x0 = narrow ? 2019 : 2009, x1 = 2027;
    var M = { left: narrow ? 74 : 112, right: 8, top: 4, bottom: 26 };
    var x = d3.scaleLinear().domain([x0, x1]).range([M.left, width - M.right]);
    var cw = x(x0 + 1) - x(x0);
    var DOT = 10, perRow = Math.max(1, Math.floor((cw - 2) / DOT));
    var clamp = function (v) { return Math.max(x0, Math.min(x1, v)); };

    var lanes = [];
    var edRows = pack(data.education), posRows = pack(data.positions);
    lanes.push({ key: 'education', label: 'Education', h: edRows * 22 + 6 });
    lanes.push({ key: 'positions', label: 'Positions', h: posRows * 22 + 6 });
    lanes.push({ key: 'software', label: 'Software', h: data.software.length * 15 + 8 });
    lanes.push({ key: 'awards', label: 'Awards & grants', h: 24 });
    TYPES.forEach(function (t) {
      var byYear = d3.rollup(data.outputs.filter(function (o) { return o.type === t.key; }), function (v) { return v.length; }, function (o) { return o.year; });
      var maxRows = Math.max.apply(null, Array.from(byYear.values()).map(function (n) { return Math.ceil(n / perRow); }).concat([1]));
      lanes.push({ key: t.key, label: t.label, h: maxRows * DOT + 12, type: t });
    });
    var y = M.top;
    lanes.forEach(function (l) { l.y = y; y += l.h + 6; });
    var height = y + M.bottom;

    d3.select(el).selectAll('*').remove();
    var svg = d3.select(el).append('svg').attr('width', width).attr('height', height);

    // Year grid + axis
    var ticks = d3.range(x0, x1 + 1);
    var g = svg.append('g').attr('class', 'grid');
    g.selectAll('line').data(ticks).join('line')
      .attr('x1', function (d) { return x(d); }).attr('x2', function (d) { return x(d); })
      .attr('y1', M.top).attr('y2', height - M.bottom);
    svg.append('line').attr('class', 'axis-line').attr('x1', M.left).attr('x2', width - M.right)
      .attr('y1', height - M.bottom).attr('y2', height - M.bottom);
    var tk = svg.append('g').attr('class', 'tick');
    tk.selectAll('text').data(ticks.slice(0, -1).filter(function (d) { return !narrow || d % 2 === 1; })).join('text')
      .attr('x', function (d) { return x(d) + cw / 2; }).attr('y', height - M.bottom + 16)
      .attr('text-anchor', 'middle').text(function (d) { return narrow ? "'" + String(d).slice(2) : d; });

    // Lane labels and separators
    lanes.forEach(function (l, i) {
      svg.append('text').attr('class', 'lane-label').attr('x', 0).attr('y', l.y + Math.min(l.h, 30) / 2 + 4).text(narrow ? l.label.replace(' & posters', '').replace(' taught', '').replace(' & grants', '') : l.label);
      if (i > 0) svg.append('line').attr('class', 'axis-line').attr('x1', 0).attr('x2', width - M.right).attr('y1', l.y - 3.5).attr('y2', l.y - 3.5).style('opacity', 0.5);
    });
    var laneBy = {};
    lanes.forEach(function (l) { laneBy[l.key] = l; });

    // Education and positions: rounded span bars, labelled when the label fits
    function spans(key, list) {
      var L = laneBy[key];
      var sel = svg.append('g').selectAll('g').data(list.filter(function (s) { return endOf(s) > x0; })).join('g')
        .attr('class', 'span mark').attr('tabindex', 0)
        .attr('aria-label', function (s) { return s.label; });
      sel.append('rect')
        .attr('x', function (s) { return x(clamp(s.start)) + 1; })
        .attr('width', function (s) { return Math.max(3, x(clamp(endOf(s))) - x(clamp(s.start)) - 2); })
        .attr('y', function (s) { return L.y + 3 + s._row * 22; }).attr('height', 18).attr('rx', 4);
      sel.append('text')
        .attr('x', function (s) { return x(clamp(s.start)) + 7; })
        .attr('y', function (s) { return L.y + 16 + s._row * 22; })
        .text(function (s) { return s.label; })
        .each(function (s) {
          var room = x(clamp(endOf(s))) - x(clamp(s.start)) - 12;
          if (this.getComputedTextLength() > room) d3.select(this).remove();
        });
      sel.on('pointermove focus', function (evt, s) {
        var end = s.end === 'now' ? 'present' : Math.floor(s.end);
        showTip(evt, [{ cls: 'tip-title', text: s.label }, { text: Math.floor(s.start) + ' – ' + end }]);
      }).on('pointerleave blur', hideTip);
    }
    spans('education', data.education);
    spans('positions', data.positions);

    // Software: one thin bar per tool from first release to now; selecting one filters outputs
    var SW = laneBy.software;
    var tools = svg.append('g').selectAll('g').data(data.software).join('g')
      .attr('class', function (s) { return 'tool-row' + (activeTool === s.id ? ' active' : ''); })
      .attr('tabindex', 0).attr('role', 'button')
      .attr('aria-pressed', function (s) { return activeTool === s.id ? 'true' : 'false'; })
      .attr('aria-label', function (s) { return s.label + ', since ' + Math.floor(s.start) + '. Select to highlight related outputs.'; });
    tools.append('rect').attr('fill', 'transparent')
      .attr('x', M.left).attr('width', width - M.left - M.right)
      .attr('y', function (s, i) { return SW.y + 4 + i * 15 - 3; }).attr('height', 15);
    tools.append('rect').attr('class', 'bar')
      .attr('x', function (s) { return x(clamp(s.start)); })
      .attr('width', function (s) { return x(NOW) - x(clamp(s.start)); })
      .attr('y', function (s, i) { return SW.y + 4 + i * 15 + 1; }).attr('height', 7).attr('rx', 3.5);
    tools.append('text')
      .attr('x', function (s) { return x(clamp(s.start)) - 6; })
      .attr('y', function (s, i) { return SW.y + 4 + i * 15 + 8.5; })
      .attr('text-anchor', 'end').text(function (s) { return s.label; });
    tools.on('click', function (evt, s) { setTool(activeTool === s.id ? null : s.id); })
      .on('keydown', function (evt, s) { if (evt.key === 'Enter' || evt.key === ' ') { evt.preventDefault(); setTool(activeTool === s.id ? null : s.id); } });

    // Awards: diamonds on their own lane
    var AW = laneBy.awards;
    var aw = svg.append('g').selectAll('g').data(data.awards.filter(function (a) { return a.year >= x0; })).join('g')
      .attr('class', 'mark').attr('tabindex', 0).attr('aria-label', function (a) { return a.label; })
      .attr('transform', function (a) { return 'translate(' + x(a.year) + ',' + (AW.y + AW.h / 2) + ')'; });
    aw.append('rect').attr('x', -12).attr('y', -12).attr('width', 24).attr('height', 24).attr('fill', 'transparent');
    aw.append('path').attr('class', 'diamond').attr('d', 'M0,-6L6,0L0,6L-6,0Z');
    aw.on('pointermove focus', function (evt, a) { showTip(evt, [{ cls: 'tip-title', text: a.label }, { text: String(Math.floor(a.year)) }]); })
      .on('pointerleave blur', hideTip);

    // Outputs: one dot per item, packed into its year column (a unit chart, so counts read directly)
    TYPES.forEach(function (t) {
      var L = laneBy[t.key];
      var items = data.outputs.filter(function (o) { return o.type === t.key && o.year >= x0; })
        .sort(function (a, b) { return (a.month || 0) - (b.month || 0); });
      var seen = {};
      items.forEach(function (o) {
        var k = seen[o.year] = (seen[o.year] || 0) + 1;
        o._cx = x(o.year) + (cw - Math.min(perRow, 99) * DOT) / 2 + ((k - 1) % perRow) * DOT + DOT / 2;
        o._cy = L.y + 6 + Math.floor((k - 1) / perRow) * DOT + DOT / 2;
      });
      var m = svg.append('g').selectAll('g').data(items).join('g')
        .attr('class', 'mark output').attr('tabindex', 0)
        .attr('aria-label', function (o) { return t.one + ', ' + o.year + ': ' + o.title; })
        .attr('transform', function (o) { return 'translate(' + o._cx + ',' + o._cy + ')'; });
      m.append('circle').attr('r', 9).attr('fill', 'transparent').style('stroke', 'none');
      m.append('circle').attr('r', 4.5).attr('fill', t.color);
      m.on('pointermove focus', function (evt, o) {
        var when = o.month ? d3.timeFormat('%b %Y')(new Date(o.year, o.month - 1, 1)) : String(o.year);
        var parts = [{ cls: 'tip-title', text: o.title }, { key: t.color, text: t.one + ' · ' + when }];
        if (o.venue) parts.push({ text: o.venue });
        if (o.tools) parts.push({ text: 'Tools: ' + o.tools.map(function (id) { return toolLabel[id]; }).join(', ') });
        showTip(evt, parts);
      }).on('pointerleave blur', hideTip)
        .on('click', function (evt, o) { if (o.url) window.open(o.url, '_blank', 'noopener'); })
        .on('keydown', function (evt, o) { if (evt.key === 'Enter' && o.url) window.open(o.url, '_blank', 'noopener'); });
    });

    applyFilter(svg);
  }

  function applyFilter(svg) {
    svg = svg || d3.select(el).select('svg');
    svg.selectAll('.output').classed('dim', function (o) { return activeTool !== null && (o.tools || []).indexOf(activeTool) < 0; });
    svg.selectAll('.tool-row').classed('active', function (s) { return s.id === activeTool; })
      .attr('aria-pressed', function (s) { return s.id === activeTool ? 'true' : 'false'; });
    clearBtn.hidden = activeTool === null;
    if (activeTool === null) note.textContent = 'Select a tool in the Software lane to filter.';
    else {
      var n = data.outputs.filter(function (o) { return (o.tools || []).indexOf(activeTool) >= 0; }).length;
      note.textContent = n + ' outputs about ' + toolLabel[activeTool] + '.';
    }
  }
  function setTool(id) { activeTool = id; applyFilter(); }
  clearBtn.addEventListener('click', function () { setTool(null); });

  render();
  var lastW = el.clientWidth;
  window.addEventListener('resize', function () {
    if (el.clientWidth !== lastW) { lastW = el.clientWidth; hideTip(); render(); }
  });
})();
