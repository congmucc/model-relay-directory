let providers = [];

const providerList = document.querySelector("#providerList");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const filterTabs = [...document.querySelectorAll(".filter-tab")];
let activeCategory = "all";
let recommendedOnly = false;
let activeModelFilter = "all";

function icon(name) { return `<i data-lucide="${name}"></i>`; }
function modelTag(model) { return `<span class="model-tag model-${model.family}">${model.label}</span>`; }

function providerCard(provider) {
  const statusClass = provider.checkin ? "yes" : "no";
  const statusText = provider.checkin ? "可签到" : "不可签到";
  const categoryLabel = provider.category === "paid" ? "付费" : "公益";
  const recommendation = provider.featured ? " · 推荐" : "";
  const footerTags = provider.category === "paid" ? [...provider.tags, ...provider.login] : [statusText, ...provider.login];
  const rewardLabel = provider.rewardType === "multiplier" ? "基础倍率" : "注册送";
  const rewardValue = provider.rewardType === "multiplier" ? `${provider.reward}×` : `$${provider.reward}`;
  return `
    <a class="provider-card ${provider.logoTone} ${provider.category}" data-provider-id="${provider.id}" href="${provider.url}" target="_blank" rel="noopener" aria-label="打开 ${provider.alias}">
      <div class="card-topline">
        <div class="provider-main">
          <div class="provider-logo" aria-hidden="true">${provider.logo}</div>
          <div class="provider-name"><strong>${provider.alias}</strong><span>${provider.name}</span></div>
        </div>
        <span class="category-badge ${provider.category}">${categoryLabel}${recommendation}</span>
      </div>
      <div class="model-tags">${provider.models.map(modelTag).join("")}</div>
      <div class="card-main">
        <div class="reward"><small>${rewardLabel}</small><strong>${rewardValue}</strong></div>
      </div>
      <div class="card-detail"><p>${provider.summary}</p><span>${provider.limit}</span></div>
      <div class="card-footer"><span class="card-pills">${footerTags.map(tag => `<span class="${provider.category === "free" && tag === statusText ? `status ${statusClass}` : ""}">${provider.category === "free" && tag === statusText ? `<span class="status-dot"></span>` : ""}${tag}</span>`).join("")}</span><span class="updated">更新于 ${provider.updated}</span></div>
    </a>`;
}

function matchesFilter(provider) {
  const categoryMatch = activeCategory === "all" || provider.category === activeCategory;
  const recommendationMatch = !recommendedOnly || provider.featured;
  const modelMatch = activeModelFilter === "all" || provider.families.includes(activeModelFilter);
  return categoryMatch && recommendationMatch && modelMatch;
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = providers.filter(provider => {
    const haystack = [provider.name, provider.alias, provider.limit, ...provider.models.map(model => model.label), ...provider.families].join(" ").toLowerCase();
    return matchesFilter(provider) && (!query || haystack.includes(query));
  });
  providerList.innerHTML = visible.map(providerCard).join("");
  emptyState.hidden = visible.length > 0;
  providerList.hidden = visible.length === 0;
  window.lucide?.createIcons();
}

function updateFilterState() {
  filterTabs.forEach(item => {
    const selected = item.dataset.kind === "model"
      ? item.dataset.filter === activeModelFilter
      : item.dataset.kind === "recommendation"
        ? recommendedOnly
        : item.dataset.filter === activeCategory;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-selected", String(selected));
  });
}

filterTabs.forEach(tab => tab.addEventListener("click", () => {
  if (tab.dataset.kind === "model") activeModelFilter = activeModelFilter === tab.dataset.filter ? "all" : tab.dataset.filter;
  else if (tab.dataset.kind === "recommendation") recommendedOnly = !recommendedOnly;
  else { activeCategory = tab.dataset.filter; activeModelFilter = "all"; }
  updateFilterState();
  render();
}));

searchInput.addEventListener("input", render);
document.addEventListener("keydown", event => {
  if (event.key === "/" && document.activeElement !== searchInput) { event.preventDefault(); searchInput.focus(); }
});

async function loadProviders() {
  try {
    const response = await fetch("data/providers.json");
    if (!response.ok) throw new Error(`providers.json: ${response.status}`);
    providers = await response.json();
    const allCount = document.querySelector('[data-filter="all"] span');
    if (allCount) allCount.textContent = providers.length;
    updateFilterState();
    render();
  } catch (error) {
    providerList.hidden = true;
    emptyState.hidden = false;
    emptyState.innerHTML = `<strong>站点数据加载失败</strong><span>请刷新页面后重试</span>`;
    console.error(error);
  }
}

loadProviders();
