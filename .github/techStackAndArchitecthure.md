' =========================================================
' TECH STACK — FINAL & LOCKED (TIMELINE-AWARE)
' =========================================================

' DESIGN GOAL
' Build a production-grade, college-only, anonymous student
' support platform within a strict 25-day timeline.
'
' The stack prioritizes:
' - Anonymity safety
' - Role & permission enforcement
' - Auditability
' - Fast, reliable execution by a solo developer
'
' This is a CONTEXT-AWARE stack decision.

' ---------------------------------------------------------
' 1. FRONTEND
' ---------------------------------------------------------

' Technology: React + TypeScript
'
' Why:
' - Strong type safety to prevent accidental data exposure
' - Mature, stable ecosystem
' - Excellent control over conditional rendering (RBAC)
'
' Supporting Libraries:
' - React Query (server state, caching, retries)
' - Zod (runtime validation of API responses)
'
' Guarantees:
' - No rendering of sensitive identity fields
' - Compile-time protection against misuse
'
' Threats Addressed:
' - Accidental identity leakage in UI
' - Unhandled API failure states

' ---------------------------------------------------------
' 2. BACKEND
' ---------------------------------------------------------

' Technology: Node.js + Express + TypeScript
'
' Why:
' - TypeScript enforces strict contracts
' - Express is simple, explicit, and debuggable
' - Fast development with predictable behavior
'
' Architecture:
' - Routes -> Controllers -> Services -> Models
' - No business logic in controllers
'
' Guarantees:
' - Clear separation of concerns
' - Easier auditing and reasoning
'
' Threats Addressed:
' - Authorization bypass
' - Silent logic errors

' ---------------------------------------------------------
' 3. DATABASE
' ---------------------------------------------------------

' Technology: MongoDB (with strict schema discipline)
'
' Why:
' - Already well-understood by the developer
' - Zero learning curve within a 25-day timeline
' - Natural fit for message, thread, and audit-style data
' - Faster iteration without violating safety guarantees
'
' IMPORTANT:
' MongoDB is used NOT for flexibility, but with discipline.
'
' Data Rules:
' - Identity data is stored separately from content data
' - No identity fields embedded in anonymous content
' - Soft deletes only
'
' Guarantees:
' - Anonymity preserved by design
' - Predictable data access
'
' Threats Addressed:
' - Identity leakage
' - Data corruption
' - Accidental joins exposing identity

' ---------------------------------------------------------
' 4. ODM / DATA ACCESS
' ---------------------------------------------------------

' Technology: Mongoose
'
' Why:
' - Schema enforcement on top of MongoDB
' - Validation at data layer
' - Middleware hooks for auditing
'
' Guarantees:
' - No unvalidated writes
' - Controlled document structure
'
' Threats Addressed:
' - Schema drift
' - Unsafe data writes

' ---------------------------------------------------------
' 5. AUTHENTICATION
' ---------------------------------------------------------

' Technology:
' - JWT (short-lived access tokens)
' - Refresh tokens
'
' Rules:
' - Roles embedded in token
' - Token rotation
' - No identity data returned in API responses
'
' Threats Addressed:
' - Session hijacking
' - Privilege escalation

' ---------------------------------------------------------
' 6. AUTHORIZATION
' ---------------------------------------------------------

' Model: Role-Based Access Control (RBAC)
'
' Roles:
' - Student
' - Teacher
' - Counsellor
' - Admin
'
' Guarantees:
' - Explicit permission checks at every boundary
' - Least-privilege enforcement
'
' Threats Addressed:
' - Unauthorized data access
' - Role confusion

' ---------------------------------------------------------
' 7. VALIDATION & SECURITY
' ---------------------------------------------------------

' Validation:
' - Zod / Joi at API boundaries
'
' Security Middleware:
' - Helmet
' - Rate limiting
' - CORS restrictions
'
' Guarantees:
' - No unvalidated input enters the system
' - Abuse and spam mitigation
'
' Threats Addressed:
' - Injection attacks
' - Request flooding

' ---------------------------------------------------------
' 8. LOGGING & AUDIT
' ---------------------------------------------------------

' Technology:
' - Structured JSON logging
'
' Logging Rules:
' - Admin actions always logged
' - Identity access always logged
' - Logs are immutable
'
' Guarantees:
' - Accountability
' - Post-incident investigation
'
' Threats Addressed:
' - Admin misuse
' - Silent failures

' ---------------------------------------------------------
' 9. COMMUNICATION MODEL
' ---------------------------------------------------------

' Model:
' - Asynchronous threaded conversations
'
' Why:
' - Safer than real-time chat
' - Clear moderation and audit trail
' - Lower complexity and risk
'
' Explicitly NOT using:
' - Real-time anonymous chat
'
' Threats Addressed:
' - Boundary violations
' - Hidden abuse

' ---------------------------------------------------------
' 10. DEPLOYMENT
' ---------------------------------------------------------

' Platform:
' - Cloud hosting (Render / Railway / AWS)
'
' Requirements:
' - Environment separation (dev / prod)
' - Health check endpoints
' - Graceful shutdown
'
' Guarantees:
' - Predictable failure handling
'
' Threats Addressed:
' - Silent outages
' - Data loss

' ---------------------------------------------------------
' CORE STACK PRINCIPLE
' ---------------------------------------------------------

' This stack prioritizes:
' - Execution correctness over novelty
' - Safety over speed
' - Predictability over flexibility
'
' MongoDB is chosen due to timeline constraints,
' existing expertise, and controlled risk —
' NOT due to lack of better alternatives.
'
' Any future technology change must justify itself
' against the threat & failure model.
