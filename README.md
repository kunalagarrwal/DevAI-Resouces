# DevAI Resources — Internet Resource Guide

> **Integrating AI Into Your Application** · Penn State ENGL/IST · Kunal Agarwal  
> Live site → [sites.psu.edu/devairesources](https://sites.psu.edu/devairesources)  
> GitHub Pages → [kunalagarrwal.github.io/devai-resources](https://kunalagarrwal.github.io/DevAI-Resouces)

---

## About

**DevAI Resources** is a curated Internet Resource Guide for developers who want to integrate AI into their software applications. It covers six essential tools and APIs — from commercial model providers to open-source ecosystems — with in-depth annotated abstracts, working code examples, and practical tips for each resource.

The site was built as a technical writing project for a Penn State course, with a focus on writing for a developer audience: precise, opinionated, and grounded in real-world engineering tradeoffs.

---

## Resources Covered

| Resource | Difficulty | What you'll learn |
|---|---|---|
| [OpenAI Platform Documentation](openai-docs.html) | Beginner | GPT-5.4 family, Chat Completions, Structured Outputs, Responses API |
| [Anthropic API Documentation](anthropic.html) | Intermediate | Claude Sonnet 4.6 / Opus 4.7, Extended Thinking, Prompt Caching |
| [Hugging Face](huggingface.html) | Intermediate | Model Hub (2M+ models), Inference Providers, Transformers library |
| [OpenAI Tokenizer & Tiktoken](tokenizer.html) | Beginner | Token counting, o200k_base encoding, cost management |
| [LangChain Documentation](langchain.html) | Intermediate | LCEL chains, LangGraph agents, LangSmith observability |
| [Prompt Engineering Guide](prompting-guide.html) | Beginner | Zero-shot, few-shot, CoT, reasoning models, Structured Outputs |

---

## Tech Stack

- **Pure HTML / CSS / JavaScript** — no build step, no frameworks, no dependencies
- **GitHub Pages** — hosting; deploys automatically on every push to `main`
- **Penn State WordPress** — iframe embed at `sites.psu.edu/devairesources`

### File structure

```
devai-resources/
├── index.html              # Landing page + interactive AI integration flowchart
├── openai-docs.html        # OpenAI Platform Documentation resource page
├── anthropic.html          # Anthropic / Claude resource page
├── huggingface.html        # Hugging Face resource page
├── tokenizer.html          # OpenAI Tokenizer & Tiktoken resource page
├── langchain.html          # LangChain resource page
├── prompting-guide.html    # Prompt Engineering Guide resource page
├── style.css               # All styles (Apple-inspired design, devai- prefix scoping)
├── search.js               # Client-side search with relevance scoring
├── ui.js                   # Copy buttons + back-to-top (runs on all pages)
└── README.md               # This file
```

---

## Design Decisions

**CSS scoping** — every class is prefixed `devai-` to prevent conflicts with the Penn State WordPress theme that wraps the iframe.

**iframe architecture** — the WordPress page embeds the entire GitHub Pages site in a `position: fixed; width: 100vw; height: 100vh` iframe, which breaks out of WordPress's narrow content container so the site renders at full viewport width.

**No frameworks** — keeping the site dependency-free means zero build tooling, instant deploys, and no risk of supply-chain issues with npm packages.

**Apple-inspired visual style** — `#1d1d1f` text, `#0071e3` blue, SF Pro font stack, generous whitespace. Readable and professional without being corporate.

---

## Running Locally

No build step required — just open any HTML file in a browser:

```bash
git clone https://github.com/kunalagarrwal/devai-resources.git
cd devai-resources
open index.html       # macOS
# or: start index.html  (Windows)
# or: xdg-open index.html  (Linux)
```

Or serve with any static file server:

```bash
npx serve .
# then visit http://localhost:3000
```

---

## Content Currency

All resource pages are kept up to date with current (2026) information:

- **OpenAI** — GPT-5.4 family pricing, Responses API, Structured Outputs
- **Anthropic** — Claude Opus 4.7 / Sonnet 4.6 / Haiku 4.5, Extended Thinking, Batch API
- **Hugging Face** — 2M+ models, Inference Providers, GitHub Copilot integration (Sept 2025), SOC 2
- **Tiktoken** — o200k_base encoding for all current OpenAI models
- **LangChain** — v1.0 stable (Oct 2025), LangGraph 1.1.8, LangSmith
- **Prompting Guide** — reasoning model CoT behavior, Structured Outputs

---

## Author

**Kunal Agarwal** · Penn State University · Computer Science & Economics  
[sites.psu.edu/devairesources](https://sites.psu.edu/devairesources)
