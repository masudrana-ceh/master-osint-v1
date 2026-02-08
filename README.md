# 🎯 Master OSINT — Intelligence Analysis Platform

> **A professional-grade open-source intelligence (OSINT) tool for analyzing publicly available information, understanding digital exposure, and mapping relationships in public data.**

![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen) ![Phase](https://img.shields.io/badge/Phase-1%2FUI%2DUX%20Complete-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Framework](https://img.shields.io/badge/Frontend-Vanilla%20JS-yellow)

---

## 🚀 What This Project Does

Master OSINT is a **web-based intelligence analysis platform** designed for:

- **Security Researchers** — Understand digital footprints and exposure
- **Students & Academics** — Learn OSINT methodology through interactive tools
- **Journalists** — Investigate public records and verify information sources
- **Cybersecurity Professionals** — Perform reconnaissance on public data

**Core Mission:** Analyze publicly available information to reveal connections, relationships, and digital exposure—*without crossing ethical or legal boundaries*.

### Key Capabilities

| Feature | Status | Description |
|---------|--------|-------------|
| 🔍 **Smart Search** | ✅ Phase 1 | Search public sources with AI-powered analysis |
| 🌐 **Domain Intelligence** | ⏳ Phase 3 | DNS, WHOIS, SSL certificate analysis |
| 📄 **Document Metadata** | ⏳ Phase 4 | Extract EXIF, timestamps, software info |
| 👤 **Identity Analysis** | ⏳ Phase 5 | Public profile mapping and username tracking |
| 📊 **Correlation Engine** | ⏳ Phase 8 | Visualize relationships and connections |
| 🤖 **AI Assistant** | ✅ Phase 1 | Free AI-powered analysis and insights |
| 📈 **Timeline View** | ⏳ Phase 6 | Temporal analysis and change tracking |
| 🗺️ **Geospatial Context** | ⏳ Phase 7 | Location-based intelligence (public only) |

---

## ⚡ Quick Start

### 1️⃣ Open in Browser (No Installation)

```bash
# Clone or navigate to project
cd /Users/masudrana/Documents/Self-developed-projects/master-osint-one

# Open directly
open frontend/index.html

# OR serve locally
cd frontend
python3 -m http.server 8000
# Visit http://127.0.0.1:8000
```

### 2️⃣ Setup Free AI Assistant (Optional)

The app includes a demo AI token. For unlimited free access:

1. Create free account: https://huggingface.co
2. Generate API token: Settings → Access Tokens → Create New
3. Edit `frontend/assets/app.js` (line ~70):
   ```javascript
   const token = "your_HUGGINGFACE_REMOVED";
   ```

---

## 🎨 Design & Theme

### Premium Cyber Aesthetic

**Color Palette:**
```
🔵 Background:     #0a0e27 (Deep Midnight Blue)
🟢 Accent Primary:  #00f0d9 (Neon Teal)
🔴 Accent Secondary: #ff3da6 (Neon Magenta)
🟡 Accent Tertiary:  #5aa0ff (Electric Blue)
⚪ Text Primary:    #dbeaf4 (Light Slate)
⚫ Text Secondary:  #8fa3b8 (Muted Blue)
```

**Visual Features:**
- ✨ Glassmorphism (frosted glass effect)
- 🌈 Gradient accents and glow effects
- 🎭 Smooth animations and transitions
- 🌙 Dark mode optimized
- 📱 Fully responsive (mobile, tablet, desktop)

### Browser Support
- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📁 Project Structure

```
master-osint-one/
├── 📄 README.md                    # This file
├── 📄 DOCUMENTATION.md             # Detailed project documentation
├── 📄 PHASES.md                    # Phased development roadmap
├── 📄 ETHICS.md                    # Ethical guidelines & compliance
│
└── 📂 frontend/
    ├── 📄 index.html               # Main page (semantic HTML5)
    │
    └── 📂 assets/
        ├── 📄 style.css            # Premium theme (450+ lines)
        ├── 📄 app.js               # UI routing & AI integration
        └── 📄 ai-config.js         # AI model configuration

```

---

## 🛠️ Technology Stack

| Component | Technology | Why Chosen |
|-----------|-----------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JS | Lightweight, no build step, universal compatibility |
| **Styling** | Custom CSS (no framework) | Full control, smaller bundle, professional look |
| **AI/ML** | Hugging Face Inference API | Free, open-source models, no backend required |
| **Model** | Mistral-7B-Instruct | Fast, accurate, optimized for instruction-following |
| **Hosting** | Static site (any server) | GitHub Pages, Netlify, or local |

---

## 🧠 Architecture Philosophy

### Frontend-First Design
- **No backend required** initially (static HTML/CSS/JS)
- **AI offloaded** to free Hugging Face API
- **Progressive enhancement** — add complexity only when needed
- **User-first** — focus on UI/UX before features

### Ethical by Design
- 🛡️ **Public data only** — no hacking, scraping authentication barriers
- ✅ **Clear guidelines** — built-in ethics page and compliance reminders
- 📋 **Source attribution** — always cite sources and maintain provenance
- ⚠️ **Warnings & limits** — prevent misuse (no doxxing features, rate limits planned)

### Scalability Path
```
Phase 1: UI Skeleton + AI
    ↓
Phase 2-7: Feature modules (tools, APIs)
    ↓
Phase 8: Relationship engine (core intelligence)
    ↓
Phase 9-10: Reporting & security
    ↓
Phase 11: Production deployment (CI/CD)
```

---

## 🎯 Development Phases

### ✅ **Phase 0** — Foundation & Mindset
**Status:** Complete

Establish scope, ethics, and project boundaries before coding.

**Deliverables:**
- Ethical guardrails document
- Project mission statement
- Academic framing
- Legal compliance roadmap

---

### ✅ **Phase 1** — UI/UX Skeleton
**Status:** Complete _(Current)_

Build the interface foundation with mock data.

**Deliverables:**
- ✅ Homepage with hero section
- ✅ Sidebar navigation (11 modules)
- ✅ Premium cyber theme
- ✅ AI assistant chat interface
- ✅ Mock search results
- ✅ Settings & ethics panel
- ✅ Free AI integration (Hugging Face)

---

### ⏳ **Phase 2** — Search Intelligence Module
**Status:** Not Started

Implement real public source searches.

**Features:**
- Multi-source search (Google, DuckDuckGo, public APIs)
- Search operators and filters
- Result ranking and deduplication
- URL and snippet extraction
- API rate limiting

**Tech:** REST APIs, async search, result normalization

---

### ⏳ **Phase 3** — Domain & Website Intelligence
**Status:** Not Started

Analyze internet infrastructure and public registration data.

**Features:**
- WHOIS lookup (registrant info)
- DNS enumeration (A, MX, TXT records)
- SSL certificate analysis (validity, issuer, SANs)
- Subdomain discovery (public sources)
- Technology stack detection
- IP geolocation (public DBs)

**Tech:** whois-json, dns-lookup APIs, crt.sh

---

### ⏳ **Phase 4** — Public Document & Metadata Module
**Status:** Not Started

Analyze publicly available files.

**Features:**
- EXIF metadata extraction (images)
- PDF metadata parsing
- Document creation/modification dates
- Software version detection
- Author/creator info
- Geolocation from EXIF

**Tech:** File upload, exif-parser, pdf.js, client-side processing

---

### ⏳ **Phase 5** — People & Identity Intelligence
**Status:** Not Started

Analyze public digital identities.

**Features:**
- Username search across platforms
- Email discovery
- Social profile aggregation
- Public biographical data
- Username normalization
- Account verification

**Tech:** Platform APIs, username databases, verification logic

---

### ⏳ **Phase 6** — Temporal Intelligence
**Status:** Not Started

Add time-based analysis and historical tracking.

**Features:**
- Timeline visualization
- Historical data tracking
- Change detection
- Activity patterns
- Archive integration (Wayback Machine)
- Date-based filtering

**Tech:** Chart libraries, temporal databases, archive APIs

---

### ⏳ **Phase 7** — Geospatial Intelligence
**Status:** Not Started

Add location context safely (public data only).

**Features:**
- Map visualization
- Public location references
- Address verification
- Coordinate mapping
- Visual overlays
- Distance calculations

**Tech:** Leaflet.js, OpenStreetMap, public geocoding

---

### ⏳ **Phase 8** — Correlation & Relationship Engine
**Status:** Not Started

Link and visualize connections (core intelligence phase).

**Features:**
- Entity relationship mapping
- Connection visualization (graph)
- Common attribute discovery
- Relationship types (co-occurrence, shared resources)
- Deduplication and normalization
- Confidence scoring

**Tech:** Graph databases, D3.js, entity resolution algorithms

---

### ⏳ **Phase 9** — Reporting & Export
**Status:** Not Started

Make results usable and shareable.

**Features:**
- Summary report generation
- PDF export with styling
- JSON/CSV export
- Annotations and notes
- Custom report templates
- Source citations
- Timestamp proof-of-analysis

**Tech:** jsPDF, html2pdf, CSV serialization

---

### ⏳ **Phase 10** — Security, Ethics & Limits
**Status:** Not Started

Make the tool production-ready and responsible.

**Features:**
- Rate limiting (prevent abuse)
- Usage analytics (track OSINT patterns)
- Terms of service enforcement
- Ethics questionnaire
- Abuse reporting mechanism
- Legal disclaimers
- Data retention policy

**Tech:** localStorage, throttling, analytics

---

### ⏳ **Phase 11** — CI/CD & Deployment
**Status:** Not Started (Optional)

Professional deployment and automation.

**Features:**
- GitHub repository with documentation
- Automated testing (UI + AI)
- Continuous deployment
- Frontend hosting (GitHub Pages, Netlify)
- Monitoring and error tracking
- Version management

**Tech:** GitHub Actions, semantic versioning, Sentry

---

## 🤔 Why This Project Was Built

### Problem Statement
OSINT is a critical skill in cybersecurity, journalism, and research—but learning resources are scattered, tools are expensive or closed-source, and ethical boundaries are unclear.

### Solution
**Master OSINT** provides:
1. **Integrated Platform** — Everything in one place
2. **Educational** — Learn by doing with guided modules
3. **Ethical** — Built-in guardrails and clear policies
4. **Open-Source** — Transparent, auditable, community-driven
5. **Free** — No paywalls or proprietary algorithms
6. **Professional** — Portfolio-ready code and documentation

### Use Cases

#### 🎓 Students & Academics
- Learn OSINT methodology through hands-on practice
- Understand how public data connects
- Research ethics and responsible intelligence

#### 🔒 Security Professionals
- Assess organizational digital footprint
- Reconnaissance during penetration testing (authorized)
- Threat intelligence gathering
- Social engineering prevention

#### 📰 Journalists & Investigators
- Verify sources and cross-reference information
- Track individuals and organizations (legally)
- Build story narratives from public records
- Document evidence with attribution

#### 🚨 Organizations
- Monitor public brand mentions
- Track organizational exposure
- Identify information leaks
- Competitive intelligence gathering

---

## 🛡️ Ethics & Compliance

### Core Principles

✅ **Public Data Only**
- No hacking, cracking, or authentication bypass
- No scraping behind login walls
- No unauthorized API access
- All data already publicly available

✅ **No Harm**
- No doxxing or targeted harassment
- No enabling stalking or surveillance
- No creating tools for abuse
- Clear terms preventing misuse

✅ **Transparency**
- Full source citation required
- Methodology documented
- Limitations acknowledged
- Audit trail of findings

✅ **Legal Compliance**
- Respect robots.txt and rate limits
- Comply with local laws
- Terms of service for public APIs
- GDPR-aware data handling

### See Also
- [ETHICS.md](ETHICS.md) — Detailed ethical guidelines
- [DOCUMENTATION.md](DOCUMENTATION.md) — Technical details & architectural decisions
- [PHASES.md](PHASES.md) — Detailed phase specifications

---

## 📊 Feature Matrix

| Feature | Phase | Status | Priority | Tech Complexity |
|---------|-------|--------|----------|-----------------|
| UI Skeleton | 1 | ✅ Done | High | Low |
| AI Assistant | 1 | ✅ Done | High | Low |
| Search Module | 2 | ⏳ Next | High | Medium |
| Domain Analysis | 3 | ⏳ Planned | High | Medium |
| Document Metadata | 4 | ⏳ Planned | Medium | Medium |
| Identity Analysis | 5 | ⏳ Planned | Medium | High |
| Timeline View | 6 | ⏳ Planned | Medium | Medium |
| Geospatial Maps | 7 | ⏳ Planned | Low | Medium |
| Correlation Engine | 8 | ⏳ Planned | **Critical** | **High** |
| Reporting | 9 | ⏳ Planned | High | Low |
| Security & Ethics | 10 | ⏳ Planned | High | Low |
| CI/CD & Deploy | 11 | ⏳ Planned | Medium | High |

---

## 🚀 Getting Started as a Developer

### Clone the Repository

```bash
git clone https://github.com/yourusername/master-osint-one.git
cd master-osint-one
```

### Install & Run

```bash
# No build step required!
cd frontend
python3 -m http.server 8000

# Visit http://localhost:8000 in your browser
```

### Development Workflow

1. **Edit files** in `frontend/`
2. **Refresh browser** (no build step needed)
3. **Test** UI interactions and AI responses
4. **Commit** changes with clear messages
5. **Release** a completed phase using the helper script `./scripts/phase_push.sh` which stages, commits (if needed), creates a timestamped tag, and pushes the branch + tag to `origin`. The script prompts for confirmation by default; add `--yes` to skip confirmation for automation.

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Code style
- Commit messages
- Pull request process
- Testing standards
- Documentation requirements

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview & quick start _(you are here)_ |
| [DOCUMENTATION.md](DOCUMENTATION.md) | Technical architecture & design decisions |
| [PHASES.md](PHASES.md) | Detailed phase specifications & roadmap |
| [ETHICS.md](ETHICS.md) | Ethical guidelines, compliance, and policies |
| [API.md](API.md) | _(Coming Phase 2)_ API documentation |
| [CONTRIBUTING.md](CONTRIBUTING.md) | _(Coming)_ Contribution guidelines |

---

## 🎓 Learning Resources

### OSINT Concepts
- [OSINT Framework](https://osintframework.com) — Comprehensive OSINT tool index
- [Bellingcat](https://www.bellingcat.com) — Investigation methodology case studies
- [SANS Pen Testing](https://www.sans.org) — Professional courses

### Technical Skills
- [MDN Web Docs](https://developer.mozilla.org) — HTML/CSS/JavaScript
- [Hugging Face Docs](https://huggingface.co/docs) — AI model APIs
- [REST API Design](https://restfulapi.net) — API best practices

### Ethical Intelligence
- [IACA Code of Ethics](https://iaca.net) — Intelligence analysis standards
- [Responsible Disclosure](https://responsibleDisclosure.org) — Bug reporting
- [Privacy-First Design](https://www.eff.org) — Electronic Frontier Foundation

---

## 📈 Roadmap

### Q1 2026
- ✅ Phase 1: UI skeleton complete
- ⏳ Phase 2: Search module MVP
- ⏳ Phase 3: Domain analysis basic

### Q2 2026
- ⏳ Phase 4-5: Document and identity modules
- ⏳ Phase 6-7: Timeline and maps
- ⏳ Beta testing & feedback

### Q3 2026
- ⏳ Phase 8: Correlation engine (critical)
- ⏳ Phase 9: Reporting system
- ⏳ Alpha release

### Q4 2026
- ⏳ Phase 10: Security & ethics hardening
- ⏳ Phase 11: Production deployment
- ⏳ Public launch

---

## 🐛 Bug Reports & Issues

Found a bug? Have a feature request? 

1. Check [Issues](https://github.com/yourusername/master-osint-one/issues)
2. Create new issue with:
   - Clear title
   - Reproduction steps
   - Expected vs actual behavior
   - Screenshots (if UI-related)

---

## 📝 License

MIT License — See [LICENSE](LICENSE) for details.

**In plain English:** Use, modify, and distribute freely. Include original license.

---

## 👤 Author

**Built by:** Masud Rana  
**Contact:** [your-email@example.com]  
**Portfolio:** [your-website.com]  

---

## 🙏 Acknowledgments

- **Hugging Face** — Free inference API and open-source models
- **Community** — Open-source intelligence sharing
- **Educators** — OSINT methodology pioneers

---

## 📞 Support

- 🐛 **Bug reports:** GitHub Issues
- 💬 **Discussions:** GitHub Discussions
- 📧 **Email:** [your-email@example.com]
- 🌐 **Website:** [coming soon]

---

<div align="center">

**Made with ❤️ for security researchers, journalists, and curious minds.**

*Analyze publicly. Act ethically. Share knowledge.*

[⬆ back to top](#-master-osint--intelligence-analysis-platform)

</div>