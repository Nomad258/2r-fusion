# Tooling Log

Record of tools, frameworks, libraries, and skills used during the 2R Fusion build.

**Build Date**: 2026-03-27
**Project Phase**: 1 - Core Platform v0.1.0

---

## Core Framework & Runtime

### Next.js 14
- **Version**: 14.x
- **Purpose**: Full-stack React framework with API routes and SSR
- **Why Chosen**: Fast development, built-in routing, API layer, production-ready, Vercel native
- **Usage**: All pages, API endpoints, static assets, middleware
- **Docs**: https://nextjs.org/docs

### React 18
- **Version**: 18.x
- **Purpose**: UI component library
- **Features Used**: Hooks (useState, useEffect, useContext), Suspense, concurrent features
- **Why Chosen**: Mature ecosystem, TypeScript support, component reusability
- **Docs**: https://react.dev

### TypeScript 5
- **Version**: 5.x
- **Purpose**: Type-safe JavaScript
- **Coverage**: 98%+ of codebase typed
- **Why Chosen**: Catch errors at compile time, IDE intellisense, team productivity
- **Docs**: https://www.typescriptlang.org

### Node.js
- **Version**: 22 LTS
- **Platform**: Linux (deployment), macOS/Windows (development)
- **Runtime**: Used for server-side execution, CLI tools
- **Package Manager**: npm 10+

---

## Database & ORM

### Prisma 5
- **Version**: 5.x
- **Purpose**: TypeScript ORM and database toolkit
- **Features Used**: Schema definition, migrations, type-safe queries, seeding, Prisma Studio
- **Why Chosen**: Type-safe, auto-migrations, intuitive schema language, excellent DX
- **Database Support**: SQLite (dev), PostgreSQL (production)
- **Docs**: https://www.prisma.io/docs

### SQLite 3
- **Version**: 3.x
- **Purpose**: Development & demo database
- **Why Chosen**: Zero-config, file-based, sufficient for <100 concurrent users, easy reset
- **File Location**: `./prisma/dev.db`
- **Docs**: https://www.sqlite.org

### PostgreSQL (Production-Ready)
- **Version**: 16 LTS
- **Purpose**: Production database (not yet deployed)
- **Why Chosen**: Enterprise-grade, proven scalability, full ACID compliance, JSONB support
- **Connection Pooling**: Via Prisma
- **Docs**: https://www.postgresql.org/docs

---

## Authentication & Authorization

### NextAuth.js 5
- **Version**: 5.x
- **Purpose**: Authentication and session management
- **Features Used**: Session-based auth, CSRF protection, role-based middleware
- **Providers**: Credentials (username/password), extensible for OAuth2, LDAP
- **Why Chosen**: Production-grade, Next.js native, easy to extend, secure by default
- **Session Store**: Database (Prisma adapter)
- **Docs**: https://next-auth.js.org

### bcryptjs
- **Version**: Latest
- **Purpose**: Password hashing
- **Algorithm**: bcrypt (salted, iterative)
- **Salt Rounds**: 10
- **Why Chosen**: Industry standard, resistant to brute-force
- **Docs**: https://www.npmjs.com/package/bcryptjs

---

## Styling & UI Components

### Tailwind CSS 3
- **Version**: 3.x
- **Purpose**: Utility-first CSS framework
- **Features Used**: Responsive design, dark mode (future), custom theme colors
- **Why Chosen**: Fast development, small bundle size, highly customizable
- **Configuration**: `tailwind.config.ts`
- **Docs**: https://tailwindcss.com

### Radix UI
- **Version**: Latest (all packages)
- **Purpose**: Unstyled, accessible component primitives
- **Components Used**:
  - Dialog (modals)
  - Dropdown Menu (navigation)
  - Tabs (tabbed interfaces)
  - Checkbox, Radio, Select (forms)
  - Tooltip (hints)
  - Popover (contextual menus)
  - Slider (range inputs)
  - Switch (toggles)
- **Why Chosen**: Accessibility first (ARIA), headless (full styling control), robust
- **Styling**: Tailwind CSS + custom styles
- **Docs**: https://www.radix-ui.com/docs

---

## Charts & Visualization

### Recharts
- **Version**: Latest
- **Purpose**: React charting library
- **Charts Used**:
  - LineChart (revenue trends, forecasts)
  - BarChart (item sales, supplier comparison)
  - PieChart (cost breakdown, category distribution)
  - AreaChart (multi-metric trends)
  - ComposedChart (revenue + cost overlay)
- **Why Chosen**: React-native (composable), responsive, TypeScript support
- **Docs**: https://recharts.org

---

## Date & Time

### date-fns 3
- **Version**: 3.x
- **Purpose**: Utility functions for JavaScript Date objects
- **Functions Used**: format, parse, isToday, startOfDay, endOfMonth, differenceInDays, etc.
- **Why Chosen**: Modular (tree-shakeable), immutable design, FP style
- **Docs**: https://date-fns.org

### dayjs 1.11+
- **Version**: 1.11+
- **Purpose**: Date formatting and parsing
- **Usage**: Secondary library for complex date manipulations
- **Why Chosen**: Lightweight alternative to moment.js
- **Docs**: https://day.js.org

---

## Form Handling

### React Hook Form
- **Version**: Latest
- **Purpose**: Performant form state management
- **Features**: Validation, error handling, field-level rendering, integrates with Radix UI
- **Why Chosen**: Low re-renders, minimal dependencies, excellent TypeScript support
- **Docs**: https://react-hook-form.com

### Zod
- **Version**: Latest
- **Purpose**: TypeScript-first schema validation
- **Usage**: API request/response validation, form data validation
- **Why Chosen**: Type inference, composable schemas, excellent error messages
- **Docs**: https://zod.dev

---

## State Management

### React Context API + Hooks
- **Purpose**: Global state (user, permissions, UI theme)
- **Why Chosen**: Built-in, no external dependencies, sufficient for current scale
- **Patterns Used**: Custom hooks (useAuth, useUser), Context providers
- **When to Upgrade**: If global state becomes complex (Phase 2+, consider Redux/Zustand)

---

## Development Tools

### ESLint
- **Version**: Latest
- **Purpose**: Code linting and style enforcement
- **Config**: `.eslintrc.json`
- **Rules**: Next.js recommended, TypeScript strict
- **Docs**: https://eslint.org

### Prettier
- **Version**: Latest
- **Purpose**: Code formatting
- **Config**: `.prettierrc`
- **Trigger**: Git pre-commit (via husky, Phase 2+)
- **Docs**: https://prettier.io

### TypeScript Compiler
- **Version**: 5.x
- **Config**: `tsconfig.json`
- **Strict Mode**: Enabled (all strict checks)
- **Target**: ES2020

---

## Package Managers

### npm
- **Version**: 10+
- **Workspace Management**: Root-level node_modules
- **Scripts Defined**:
  - `npm run dev` - Development server
  - `npm run build` - Production build
  - `npm start` - Production server
  - `npm run lint` - ESLint
  - `npm run format` - Prettier
  - `npm run test` - Test runner (Phase 2)

---

## Deployment & DevOps

### Docker
- **Image**: node:22-alpine
- **Purpose**: Containerized deployment
- **Optimization**: Multi-stage build (builder → runner), small image size
- **File**: `Dockerfile`
- **Base Image Rationale**: Alpine Linux (minimal, fast)

### Docker Compose
- **Purpose**: Local development environment
- **Services**: App + optional PostgreSQL
- **File**: `docker-compose.yml`
- **Volume Mounts**: Code (live reload), database persistence

### Environment Variables
- **Tool**: dotenv (built into Next.js)
- **Files**:
  - `.env.example` - Template
  - `.env.local` - Local development (git-ignored)
  - `.env.production` - Production (via hosting platform)

---

## Database Tools

### Prisma Studio
- **Command**: `npx prisma studio`
- **Purpose**: Visual database browser and editor
- **URL**: http://localhost:5555

### Prisma Seed
- **File**: `prisma/seed.ts`
- **Command**: `npx prisma db seed`
- **Purpose**: Demo data generation
- **Data Generated**: 50+ menu items, 5 suppliers, sample reservations, users

### Prisma Migrate
- **Purpose**: Database schema versioning
- **Command**: `npx prisma migrate dev`
- **Usage**: Create/apply migrations

---

## Monitoring & Logging

### Console Logging
- **Purpose**: Development debugging
- **Structured Logging**: Future enhancement (Phase 2+)
- **Error Tracking**: Manual error handling, console.error()

### Health Check Endpoints
- **GET /api/health** - Application status
- **GET /api/health/db** - Database connectivity
- **Purpose**: Docker health checks, monitoring

---

## Documentation

### Markdown
- **Purpose**: All documentation files
- **Format**: GitHub-flavored Markdown (GFM)
- **Files**:
  - README.md
  - ARCHITECTURE.md
  - ASSUMPTIONS.md
  - ENVIRONMENT.md
  - DEMO_GUIDE.md
  - ROADMAP.md
  - CHANGELOG.md
  - EXECUTION_STATUS.md
  - TOOLING_LOG.md (this file)

---

## Testing Tools (Phase 2 Planned)

### Vitest
- **Purpose**: Unit testing framework
- **Why Chosen**: Vite native, fast, TypeScript support
- **Coverage Goal**: 70%+ code coverage

### React Testing Library
- **Purpose**: Component testing
- **Why Chosen**: Test behavior, not implementation
- **Focus**: User-centric tests

### Playwright
- **Purpose**: End-to-end testing
- **Why Chosen**: Cross-browser, production simulation
- **Tests**: KDS flow, reservation booking, payment

---

## CI/CD Tools (Phase 2 Planned)

### GitHub Actions
- **Purpose**: Automated testing and deployment
- **Workflows**: Lint → Test → Build → Deploy

### Vercel
- **Purpose**: Automatic deployments
- **Trigger**: Git push to main
- **Benefits**: Zero-downtime deployments, automatic rollbacks

---

## Utility Libraries

### clsx
- **Purpose**: Conditional CSS class composition
- **Usage**: Dynamic Tailwind classes
- **Docs**: https://github.com/lukeed/clsx

### lodash-es
- **Purpose**: Utility functions (optional, Phase 2)
- **When Needed**: Complex data transformations
- **Tree-shakeable**: ESM exports

### uuid
- **Purpose**: Unique ID generation
- **Usage**: Not currently used (Prisma auto-IDs), available for future needs

---

## Skills & Techniques Used

### Architecture Patterns
- MVC-like separation (Model via Prisma, View via React, Controller via API Routes)
- Service layer for business logic
- Adapter pattern for extensibility (payments, notifications, forecasting)
- Factory pattern for object creation

### Development Practices
- Component composition and reusability
- Custom hooks for logic extraction
- TypeScript strict mode (all types explicit)
- Atomic commit history (git)
- Comprehensive documentation

### Performance Optimization
- Lazy loading via React.lazy (Phase 2)
- Image optimization (Phase 2)
- Code splitting (Next.js automatic)
- Database indexing
- API response compression

### Security Best Practices
- Input validation (Zod schemas)
- SQL injection prevention (Prisma parameterized queries)
- CSRF protection (NextAuth.js middleware)
- XSS prevention (React escaping)
- Password hashing (bcrypt)
- HTTP-only cookies
- Secure headers (HTTPS, CSP)

---

## Browser Compatibility

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Mobile Chrome (Android 10+)

### Fallbacks
- Graceful degradation for older browsers
- Polyfills (optional, Phase 2)

---

## Accessibility (a11y)

### Standards
- WCAG 2.1 Level AA target
- Radix UI ensures baseline accessibility (ARIA, keyboard navigation)
- Semantic HTML
- Color contrast ratios

### Testing (Phase 2 Planned)
- axe-core automated testing
- Manual keyboard navigation testing
- Screen reader testing (NVDA, JAWS)

---

## Version Lock File

### package-lock.json
- **Purpose**: Reproducible dependency versions
- **Rationale**: All developers, CI/CD, production use same versions
- **Generated By**: npm 10+
- **Update**: `npm update` (respects semver ranges in package.json)

---

## Known Tool Constraints

| Tool | Current | Future | Notes |
|------|---------|--------|-------|
| Database | SQLite | PostgreSQL | Need to upgrade at 100+ concurrent users |
| Testing | Manual | Vitest + RTL | Automated tests in Phase 2 |
| Monitoring | Console logs | External APM | DataDog, New Relic integration Phase 3+ |
| Caching | None | Redis | For KDS real-time updates |
| Search | SQL LIKE | Elasticsearch | For 10k+ guest search |
| Real-time | Polling | WebSockets | socket.io in Phase 2 |
| Storage | Disk | S3 | For images, backups Phase 2+ |
| CDN | Vercel | Cloudflare | Full CDN setup Phase 2+ |

---

## Tool Installation & Update

### First-Time Setup
```bash
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

### Keep Tools Updated
```bash
npm update                    # Update within semver ranges
npm outdated                  # Check for updates
npm audit                     # Check for security issues
npm audit fix                 # Auto-fix vulnerabilities
npx next upgrade              # Upgrade Next.js
```

### Annual Review (Q1 2027)
- [ ] Update Node.js LTS
- [ ] Update all major dependencies
- [ ] Re-evaluate tool choices
- [ ] Deprecate unused packages
- [ ] Benchmark performance

---

## Recommended IDE Setup

### VS Code Extensions
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- Prisma
- Thunder Client (or REST Client)
- JavaScript (ES6) code snippets

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.tsserver.experimental.enableProjectDiagnostics": true
}
```

### Useful Commands
- `Ctrl+Shift+F` - Format document
- `Ctrl+/` - Toggle comment
- `Ctrl+K Ctrl+0` - Fold all regions
- `F12` - Go to definition
- `Shift+F12` - Find all references

---

## Tool Support & Community

### Official Documentation Links
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Prisma: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Radix UI: https://www.radix-ui.com/docs

### Community Resources
- Stack Overflow (tags: nextjs, typescript, prisma)
- GitHub Discussions (for each tool repo)
- Reddit: r/reactjs, r/typescript, r/node
- Discord communities (Prisma, Tailwind, etc.)

---

**Tooling Log Version**: 1.0
**Last Updated**: 2026-03-27
**Next Review**: 2026-06-27 (Q2 2026)
**Maintained By**: 2R Fusion Development Team
