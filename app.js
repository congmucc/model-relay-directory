/**
 * 中转站导航 —— 页面脚本
 *
 * 站点数据在 data/providers.json，改数据不需要动这个文件。
 * 这里只负责：加载数据、筛选与搜索、渲染卡片列表。
 */

/* ===== 图标 ===== */
// 以 inline SVG 内置，不依赖外部 CDN（原来的 lucide@latest 会随上游更新变化）。
// 需要新图标时在这里加一条，并在 HTML 里用 <i data-lucide="名字"></i> 引用。
const ICONS = {
  search: '<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',
  mail: '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
  'layout-grid': '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  gift: '<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',
  'wallet-cards': '<path d="M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21"/><path d="M3 7h18"/><rect x="3" y="3" width="18" height="18" rx="2"/>',
  sparkles: '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',
  'scan-search': '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/><path d="m16 16-1.9-1.9"/>',
  'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
};

const SVG_ATTRS = 'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

/** 把页面里 <i data-lucide="x"> 占位替换成真实 SVG。 */
function renderIcons(root = document) {
  root.querySelectorAll('i[data-lucide]').forEach(placeholder => {
    const body = ICONS[placeholder.dataset.lucide];
    if (!body) return;
    const name = placeholder.dataset.lucide;
    const svg = `<svg ${SVG_ATTRS} class="lucide lucide-${name}">${body}</svg>`;
    placeholder.replaceWith(document.createRange().createContextualFragment(svg));
  });
}

/* ===== 卡片渲染 ===== */
const CATEGORY_LABEL = { free: '公益', paid: '付费' };
// 付费站主视觉按站点计价方式区分：
//   multiplier 走倍率；price 是没有倍率概念的聚合市场，走按量起步价；gift 是公益站的注册赠送。
const REWARD_LABEL = { multiplier: '基础倍率', price: '起步价 / 1M', gift: '注册送' };

function modelTag(model) {
  return `<span class="model-tag model-${model.family}">${model.label}</span>`;
}

/** 签到状态：true 可签到 / false 不可签到 / null 表示资料未说明。 */
function checkinStatus(provider) {
  if (provider.checkin === true) return { className: 'yes', text: '可签到' };
  if (provider.checkin === false) return { className: 'no', text: '不可签到' };
  return { className: 'unknown', text: '签到未知' };
}

/** 底部标签：付费站展示倍率等信息，公益站展示签到状态与登录方式。 */
function footerTags(provider, statusText) {
  if (provider.category === 'paid') return [...provider.tags, ...provider.login];
  return [statusText, ...provider.login];
}

function footerTagHtml(tag, provider, status) {
  const isStatus = provider.category === 'free' && tag === status.text;
  if (isStatus) return `<span class="status ${status.className}"><span class="status-dot"></span>${tag}</span>`;
  // 聚合站用一个独立样式，方便一眼从标签里认出来
  if (tag === '聚合') return `<span class="tag-aggregate">${tag}</span>`;
  return `<span>${tag}</span>`;
}

function rewardHtml(provider) {
  const label = REWARD_LABEL[provider.rewardType] ?? REWARD_LABEL.gift;
  const value = provider.rewardType === 'multiplier' ? `${provider.reward}×` : `$${provider.reward}`;
  return `<div class="reward"><small>${label}</small><strong>${value}</strong></div>`;
}

/** 渲染单张站点卡片。整张卡片即跳转入口。 */
function providerCard(provider) {
  const status = checkinStatus(provider);
  const categoryLabel = CATEGORY_LABEL[provider.category] ?? CATEGORY_LABEL.free;
  const recommendation = provider.featured ? ' · 推荐' : '';
  const tags = footerTags(provider, status.text);

  return `
    <a class="provider-card ${provider.logoTone} ${provider.category}" data-provider-id="${provider.id}" href="${provider.url}" target="_blank" rel="noopener" aria-label="打开 ${provider.alias}">
      <div class="card-topline">
        <div class="provider-main">
          <div class="provider-logo" aria-hidden="true">${provider.logo}</div>
          <div class="provider-name"><strong>${provider.alias}</strong><span>${provider.name}</span></div>
        </div>
        <span class="category-badge ${provider.category}">${categoryLabel}${recommendation}</span>
      </div>
      <div class="model-tags">${provider.models.map(modelTag).join('')}</div>
      <div class="card-main">${rewardHtml(provider)}</div>
      <div class="card-detail"><p>${provider.summary}</p><span>${provider.limit}</span></div>
      <div class="card-footer">
        <span class="card-pills">${tags.map(tag => footerTagHtml(tag, provider, status)).join('')}</span>
        <span class="updated">更新于 ${provider.updated}</span>
      </div>
    </a>`;
}

/* ===== 筛选与搜索 ===== */
// 三类筛选互相独立：分类、推荐、模型，同时满足才显示。
function matchesFilter(provider, state) {
  const categoryMatch = state.category === 'all' || provider.category === state.category;
  const recommendationMatch = !state.recommendedOnly || provider.featured;
  const modelMatch = state.model === 'all' || provider.families.includes(state.model);
  return categoryMatch && recommendationMatch && modelMatch;
}

// 搜索范围：站点名、域名、额度说明、模型名、模型家族。
function matchesQuery(provider, query) {
  if (!query) return true;
  const haystack = [
    provider.name,
    provider.alias,
    provider.limit,
    ...provider.models.map(model => model.label),
    ...provider.families,
  ].join(' ').toLowerCase();
  return haystack.includes(query);
}

function selectProviders(providers, state, query) {
  const normalized = query.trim().toLowerCase();
  return providers.filter(provider => matchesFilter(provider, state) && matchesQuery(provider, normalized));
}

/* ===== 页面装配 ===== */
const DATA_URL = 'data/providers.json';

const providerListEl = document.querySelector('#providerList');
const emptyState = document.querySelector('#emptyState');
const searchInput = document.querySelector('#searchInput');
const filterTabs = [...document.querySelectorAll('.filter-tab')];

let providers = [];
const state = { category: 'all', recommendedOnly: false, model: 'all' };

function render() {
  const visible = selectProviders(providers, state, searchInput.value);
  providerListEl.innerHTML = visible.map(providerCard).join('');
  emptyState.hidden = visible.length > 0;
  providerListEl.hidden = visible.length === 0;
  renderIcons();
}

/** 根据当前 state 同步按钮高亮，三种筛选类型各自判断。 */
function isTabSelected(tab) {
  const { kind, filter } = tab.dataset;
  if (kind === 'model') return filter === state.model;
  if (kind === 'recommendation') return state.recommendedOnly;
  return filter === state.category;
}

function updateFilterState() {
  filterTabs.forEach(tab => {
    const selected = isTabSelected(tab);
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
}

function onFilterClick(tab) {
  const { kind, filter } = tab.dataset;
  if (kind === 'model') {
    state.model = state.model === filter ? 'all' : filter;
  } else if (kind === 'recommendation') {
    state.recommendedOnly = !state.recommendedOnly;
  } else {
    state.category = filter;
    state.model = 'all';
  }
  updateFilterState();
  render();
}

function showLoadError(error) {
  providerListEl.hidden = true;
  emptyState.hidden = false;
  emptyState.innerHTML = '<strong>站点数据加载失败</strong><span>请刷新页面后重试</span>';
  console.error(error);
}

async function init() {
  renderIcons();

  filterTabs.forEach(tab => tab.addEventListener('click', () => onFilterClick(tab)));
  searchInput.addEventListener('input', render);
  document.addEventListener('keydown', event => {
    if (event.key === '/' && document.activeElement !== searchInput) {
      event.preventDefault();
      searchInput.focus();
    }
  });

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`${DATA_URL}: ${response.status}`);
    providers = await response.json();

    // 站点总数由数据决定，不再写死在 HTML 里
    document.querySelector('#totalCount').textContent = String(providers.length);
    document.querySelector('#siteCount').textContent = String(providers.length);

    updateFilterState();
    render();
  } catch (error) {
    showLoadError(error);
  }
}

init();
