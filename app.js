const providers = [
  {
    id: "agent-router", name: "Agent Router", alias: "agentrouter.org", logo: "A", logoTone: "cyan", category: "free", featured: true,
    reward: "150", rewardType: "gift", checkin: true,
    models: [{ label: "GPT 5.6", family: "gpt" }, { label: "OPUS 4.8", family: "anthropic" }, { label: "OPUS 5", family: "anthropic" }],
    families: ["GPT", "Anthropic"], limit: "注册送 150 美元额度，支持每日签到。", tags: ["可签到"], login: ["GitHub", "LinuxDo"], updated: "2026.08.23",
    summary: "同时覆盖 GPT 与 Anthropic 新模型，适合需要多模型切换的用户。", url: "https://agentrouter.org/register?aff=xh2I"
  },
  {
    id: "justdo-work", name: "JustDoWork", alias: "api.justwoker.icu", logo: "J", logoTone: "dark", category: "free", featured: true,
    reward: "70", rewardType: "gift", checkin: false,
    models: [{ label: "OPUS 4.8", family: "anthropic" }, { label: "OPUS 5", family: "anthropic" }],
    families: ["Anthropic"], limit: "注册送 70 美元额度，目前不支持签到。", tags: ["不可签到"], login: ["GitHub"], updated: "2026.08.22",
    summary: "注册流程简单，适合先体验 OPUS 4.8 与 OPUS 5。", url: "https://api.justwoker.icu/sign-up?aff=ffTQ"
  },
  {
    id: "anyrouter", name: "AnyRouter", alias: "anyrouter.top", logo: "A", logoTone: "cyan", category: "free", featured: true,
    reward: "50", rewardType: "gift", checkin: true,
    models: [{ label: "GPT", family: "gpt" }, { label: "Anthropic", family: "anthropic" }],
    families: ["GPT", "Anthropic"], limit: "注册送 50 美元额度，支持每日签到。", tags: ["可签到"], login: [], updated: "2026.08.23",
    summary: "公益中转站，覆盖 GPT 与 Anthropic 模型。", url: "https://anyrouter.top/register?aff=bjZ1"
  },
  {
    id: "vcnovb", name: "VC Novb", alias: "sub.vcnovb.cn", logo: "V", logoTone: "indigo", category: "paid", featured: true,
    reward: "0.08", rewardType: "multiplier", checkin: false,
    models: [{ label: "GPT", family: "gpt" }, { label: "Anthropic", family: "anthropic" }, { label: "DeepSeek", family: "deepseek" }],
    families: ["GPT", "Anthropic", "国产模型"], limit: "Plus 0.08 · Pro 0.12 / 0.20。", tags: ["稳定", "Plus 0.08", "注册送 $1"], login: ["QQ邮箱"], updated: "2026.08.23",
    summary: "倍率清晰，覆盖 GPT、Anthropic 与 DeepSeek，适合日常调用。", url: "https://sub.vcnovb.cn/register?aff=5Q9PVN9HEFYS"
  },
  {
    id: "zeekai", name: "ZeeKai", alias: "api.zeekai.cc", logo: "Z", logoTone: "coral", category: "paid", featured: true,
    reward: "0.08", rewardType: "multiplier", checkin: false,
    models: [{ label: "GPT", family: "gpt" }, { label: "Grok", family: "grok" }, { label: "DeepSeek", family: "deepseek" }],
    families: ["GPT", "Grok", "国产模型"], limit: "Plus 0.08 · Pro 0.18。", tags: ["稳定", "Plus 0.08"], login: ["QQ邮箱"], updated: "2026.08.23",
    summary: "主流 GPT、Grok 与 DeepSeek 都有覆盖，适合按倍率使用。", url: "https://api.zeekai.cc/register?aff=QP6RBSNSGJFV"
  },
  {
    id: "luotuokj", name: "Luotuo", alias: "luotuokj.top", logo: "L", logoTone: "dark", category: "paid", featured: true,
    reward: "0.07", rewardType: "multiplier", checkin: false,
    models: [{ label: "GPT", family: "gpt" }, { label: "Grok", family: "grok" }, { label: "DeepSeek", family: "deepseek" }],
    families: ["GPT", "Grok", "国产模型"], limit: "Plus 0.07 · Pro 0.18。", tags: ["稳定", "Plus 0.07"], login: ["QQ邮箱"], updated: "2026.08.23",
    summary: "价格比较直观，覆盖 GPT、Grok 与 DeepSeek。", url: "https://luotuokj.top/register?aff=4TKY8FVE5HUW"
  },
  {
    id: "aihub", name: "AIHub", alias: "aihub.top", logo: "A", logoTone: "cyan", category: "paid", featured: true,
    reward: "0.01–0.30", rewardType: "multiplier", checkin: false,
    models: [{ label: "GPT 全系", family: "gpt" }, { label: "Anthropic", family: "anthropic" }, { label: "Grok", family: "grok" }, { label: "DeepSeek", family: "deepseek" }],
    families: ["GPT", "Anthropic", "Grok", "国产模型"], limit: "聚合站，模型价格约 0.01–0.30 倍。", tags: ["聚合", "倍率 0.01–0.30"], login: ["QQ邮箱"], updated: "2026.08.23",
    summary: "以 GPT 为主的聚合入口，模型选择更丰富，适合多供应商切换。", url: "https://aihub.top/register?aff=SFJ3HNFH7TZX"
  },
  {
    id: "piteai", name: "PiteAI", alias: "piteai.com", logo: "P", logoTone: "coral", category: "paid", featured: true,
    reward: "0.14", rewardType: "multiplier", checkin: false,
    models: [{ label: "GPT", family: "gpt" }, { label: "Grok", family: "grok" }],
    families: ["GPT", "Grok"], limit: "Pro 0.14（活动）。", tags: ["Pro 0.14", "活动"], login: ["QQ邮箱"], updated: "2026.08.23",
    summary: "付费中转站，当前有 Pro 0.14 倍率活动，覆盖 GPT 与 Grok。", url: "https://www.piteai.com/sign-up?aff=RaMm"
  },
  {
    id: "aijws", name: "AIJWS", alias: "api.aijws.com", logo: "A", logoTone: "indigo", category: "paid", featured: true,
    reward: "0.08", rewardType: "multiplier", checkin: false,
    models: [{ label: "GPT", family: "gpt" }, { label: "Anthropic", family: "anthropic" }, { label: "Grok", family: "grok" }],
    families: ["GPT", "Anthropic", "Grok"], limit: "Plus 0.08 · Pro 0.15。", tags: ["稳定", "Plus 0.08"], login: ["QQ邮箱"], updated: "2026.08.23",
    summary: "覆盖 GPT、Anthropic 与 Grok，适合按量使用。", url: "https://api.aijws.com/register?aff=8ALJQRQLR3PZ"
  }
];

const providerList = document.querySelector("#providerList");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const filterTabs = [...document.querySelectorAll(".filter-tab")];
let activeCategory = "all";
let recommendedOnly = false;
let activeModelFilter = "all";

document.querySelector('[data-filter="all"] span').textContent = providers.length;

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

filterTabs.forEach(tab => tab.addEventListener("click", () => {
  if (tab.dataset.kind === "model") activeModelFilter = activeModelFilter === tab.dataset.filter ? "all" : tab.dataset.filter;
  else if (tab.dataset.kind === "recommendation") recommendedOnly = !recommendedOnly;
  else { activeCategory = tab.dataset.filter; activeModelFilter = "all"; }
  filterTabs.forEach(item => {
    const selected = item.dataset.kind === "model"
      ? item.dataset.filter === activeModelFilter
      : item.dataset.kind === "recommendation"
        ? recommendedOnly
        : item.dataset.filter === activeCategory;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-selected", String(selected));
  });
  render();
}));

document.querySelectorAll("[data-nav-filter]").forEach(link => link.addEventListener("click", () => {
  const target = document.querySelector(`[data-filter="${link.dataset.navFilter}"]`);
  target?.click();
}));

searchInput.addEventListener("input", render);
document.addEventListener("keydown", event => {
  if (event.key === "/" && document.activeElement !== searchInput) { event.preventDefault(); searchInput.focus(); }
});
render();
window.lucide?.createIcons();
