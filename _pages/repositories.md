---
layout: page
permalink: /repositories/
title: repositories
description:
nav: true
nav_order: 3
---

## GitHub users

{% if site.data.repositories.github_users %}
<div class="repo-grid">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.html username=user %}
  {% endfor %}
</div>
{% endif %}

---

## GitHub Repositories

{% if site.data.repositories.github_repos %}
<div class="repo-grid">
  {% for r in site.data.repositories.github_repos %}
    {% include repository/repo.html repository=r.repo desc=r.desc %}
  {% endfor %}
</div>
{% endif %}

<script>
// Fill in live stars, language and profile counts; the cards stay complete if the API is unavailable.
(function () {
  function get(url, done) { fetch(url).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) { if (d) done(d); }).catch(function () {}); }
  document.querySelectorAll('[data-repo]').forEach(function (card) {
    get('https://api.github.com/repos/' + card.dataset.repo, function (d) {
      if (d.language) card.querySelector('.repo-lang').textContent = d.language;
      card.querySelector('.repo-stars').textContent = '★ ' + d.stargazers_count;
    });
  });
  document.querySelectorAll('[data-user]').forEach(function (card) {
    get('https://api.github.com/users/' + card.dataset.user, function (d) {
      card.querySelector('.user-repos').textContent = d.public_repos + ' public repos';
      card.querySelector('.user-followers').textContent = d.followers + ' followers';
    });
  });
})();
</script>
