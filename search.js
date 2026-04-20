/* DevAI Resources — client-side search */
(function () {

  var INDEX = [
    {
      title:   "OpenAI Platform Documentation",
      url:     "openai-docs.html",
      tags:    ["openai", "gpt-4o", "chat completions", "function calling", "api", "rest", "python", "tokens", "rate limits"],
      excerpt: "Official reference for the OpenAI API — Chat Completions, GPT-4o, token management, function calling, and pricing."
    },
    {
      title:   "Anthropic API Documentation",
      url:     "anthropic.html",
      tags:    ["anthropic", "claude", "messages api", "tool use", "prompt caching", "200k", "context window", "haiku", "sonnet", "opus"],
      excerpt: "Developer docs for Claude — 200k token context window, Messages API, tool use, and up to 90% cost savings via prompt caching."
    },
    {
      title:   "Hugging Face",
      url:     "huggingface.html",
      tags:    ["hugging face", "transformers", "open source", "models", "inference api", "pipeline", "datasets", "spaces", "bert", "llama"],
      excerpt: "Open-source AI platform with 500k+ models, the Transformers library, Spaces demos, and a free Inference API."
    },
    {
      title:   "OpenAI Tokenizer & Tiktoken",
      url:     "tokenizer.html",
      tags:    ["tokenizer", "tiktoken", "tokens", "cost", "cl100k", "context window", "encoding", "bpe", "token count"],
      excerpt: "Interactive tokenizer tool and Python library for counting tokens before API calls — essential for cost and context management."
    },
    {
      title:   "LangChain Documentation",
      url:     "langchain.html",
      tags:    ["langchain", "rag", "lcel", "agents", "memory", "chains", "framework", "retrieval", "vector store", "embeddings"],
      excerpt: "Open-source framework for LLM applications — LCEL chains, RAG pipelines, persistent memory, and autonomous agents."
    },
    {
      title:   "Prompt Engineering Guide",
      url:     "prompting-guide.html",
      tags:    ["prompting", "few-shot", "chain-of-thought", "zero-shot", "cot", "react", "techniques", "system prompt", "prompt engineering"],
      excerpt: "Comprehensive reference for prompt engineering — zero-shot, few-shot, chain-of-thought, ReAct, and advanced techniques."
    }
  ];

  /* ── scoring ─────────────────────────────────────────────── */
  function scoreItem(item, q) {
    var score = 0;
    var t = item.title.toLowerCase();
    if (t === q)            score += 20;
    if (t.startsWith(q))   score += 12;
    if (t.includes(q))     score += 8;
    item.tags.forEach(function (tag) {
      if (tag === q)          score += 10;
      if (tag.startsWith(q))  score += 6;
      if (tag.includes(q))    score += 3;
    });
    if (item.excerpt.toLowerCase().includes(q)) score += 2;
    return score;
  }

  function runSearch(query) {
    if (!query || query.trim().length < 1) return [];
    var q = query.toLowerCase().trim();
    return INDEX
      .map(function (item) { return Object.assign({}, item, { score: scoreItem(item, q) }); })
      .filter(function (item) { return item.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 5);
  }

  /* ── highlight matched text ──────────────────────────────── */
  function hl(text, query) {
    if (!query) return text;
    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp('(' + escaped + ')', 'gi'),
      '<mark class="devai-search__hl">$1</mark>');
  }

  /* ── render results ──────────────────────────────────────── */
  function renderResults(items, query, container) {
    if (items.length === 0) {
      container.innerHTML = '<p class="devai-search__empty">No results for "<strong>' +
        query + '</strong>"</p>';
      return;
    }
    container.innerHTML = items.map(function (r, i) {
      return '<a href="' + r.url + '" class="devai-search__result" data-i="' + i + '">' +
        '<span class="devai-search__result-title">' + hl(r.title, query) + '</span>' +
        '<span class="devai-search__result-excerpt">' + hl(r.excerpt, query) + '</span>' +
        '</a>';
    }).join('');
  }

  /* ── init ────────────────────────────────────────────────── */
  function init() {
    var toggle  = document.getElementById('devaiSearchToggle');
    var popover = document.getElementById('devaiSearchPopover');
    var input   = document.getElementById('devaiSearchInput');
    var results = document.getElementById('devaiSearchResults');
    var wrapper = document.getElementById('devaiSearch');

    if (!toggle || !popover || !input || !results || !wrapper) return;

    var isOpen      = false;
    var activeIndex = -1;

    function openSearch() {
      isOpen = true;
      toggle.setAttribute('aria-expanded', 'true');
      popover.classList.add('is-open');
      setTimeout(function () { input.focus(); }, 40);
    }

    function closeSearch() {
      isOpen      = false;
      activeIndex = -1;
      toggle.setAttribute('aria-expanded', 'false');
      popover.classList.remove('is-open');
      input.value     = '';
      results.innerHTML = '';
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      isOpen ? closeSearch() : openSearch();
    });

    input.addEventListener('input', function () {
      activeIndex = -1;
      var q = this.value.trim();
      if (!q) { results.innerHTML = ''; return; }
      renderResults(runSearch(q), q, results);
    });

    input.addEventListener('keydown', function (e) {
      var items = results.querySelectorAll('.devai-search__result');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, -1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0) items[activeIndex].click();
        return;
      } else if (e.key === 'Escape') {
        closeSearch(); return;
      }
      items.forEach(function (el, i) {
        el.classList.toggle('is-active', i === activeIndex);
      });
    });

    document.addEventListener('click', function (e) {
      if (isOpen && !wrapper.contains(e.target)) closeSearch();
    });

    document.addEventListener('keydown', function (e) {
      /* cmd/ctrl + K to open */
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? closeSearch() : openSearch();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
