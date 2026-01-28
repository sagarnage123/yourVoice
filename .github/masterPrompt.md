' =========================================================
' MASTER PROJECT PROMPT — FINAL & AUTHORITATIVE
' =========================================================

' PROJECT NAME
' Anonymous Student Support Platform (College-Only)

' =========================================================
' 1. PROJECT OVERVIEW
' =========================================================

' This is a production-grade, college-only web platform where
' students can anonymously raise personal, mental health,
' academic, financial, or general concerns.
'
' The system removes fear of identity exposure while ensuring
' safety, accountability, and institutional responsibility.

' =========================================================
' 2. CORE PRINCIPLES (NON-NEGOTIABLE)
' =========================================================

' - Students are ALWAYS anonymous
' - Students have NO alias, NO pseudonym, NO identifier
' - Teachers and counsellors are ALWAYS visible
' - Teachers and counsellors show real name + role + verified badge
' - Only admins can map anonymous activity to real identity
' - De-anonymization is allowed ONLY in rare, extreme cases
' - All sensitive actions are logged and auditable

' =========================================================
' 3. AUTHENTICATION MODEL (LOCKED)
' =========================================================

' Login Methods:
' - Verified Email (OTP or magic link)
' - Verified Phone Number (OTP)
'
' Rules:
' - No guest access
' - No social login
' - No unverified email or phone can log in
'
' Eligibility:
' - Only valid college users
'
' Tokens:
' - Short-lived access token (JWT)
' - Refresh token for session continuity
' - Tokens contain role only, never identity details

' =========================================================
' 4. ROLES & PERMISSIONS
' =========================================================

' STUDENT:
' - Can post anonymous queries (public or private)
' - Can respond anonymously to public queries
' - Can like public queries
' - Can participate in private threads
' - Cannot see any student identity
'
' TEACHER / COUNSELLOR:
' - Visible with name + verified badge
' - Can respond to queries
' - Can handle private queries routed to their role
' - Can flag or escalate content
' - Cannot see student identity
'
' ADMIN:
' - Manages verification and moderation
' - Can de-anonymize ONLY in extreme, logged cases
' - Can remove content (soft delete)
' - Can view audit logs

' =========================================================
' 5. QUERY & COMMUNICATION MODEL
' =========================================================

' GENERAL (PUBLIC) QUERIES:
' - Anonymous student posts
' - Visible to entire college
' - Anyone can respond
' - Likes represent agreement only
' - Ranked by like count, then recency
'
' PRIVATE QUERIES:
' - Anonymous student posts
' - Routed to teacher or counsellor
' - Only intended roles can respond
'
' COMMUNICATION:
' - Asynchronous, threaded
' - NO real-time anonymous chat

' =========================================================
' 6. SAFETY & MODERATION
' =========================================================

' Allowed:
' - Honest expression
' - Emotional or sensitive language
'
' Not Allowed:
' - Harassment
' - Hate speech
' - Threats
' - Spam or system misuse
'
' Expression is protected.
' Abuse is not protected.

' =========================================================
' 7. THREAT & FAILURE MODEL (ACCEPTED)
' =========================================================

' The system must defend against:
' - Identity leakage
' - Unauthorized de-anonymization
' - Anonymous harassment
' - Self-harm mishandling
' - Admin abuse of power
' - Spam and manipulation
'
' Core guarantees:
' - Identity and content never mix
' - Power is always logged
' - Failure is visible, not silent

' =========================================================
' 8. TECH STACK (FINAL)
' =========================================================

' FRONTEND:
' - React + TypeScript
'
' BACKEND:
' - Node.js + Express + TypeScript
'
' DATABASE:
' - MongoDB with strict schema discipline
' - Mongoose ODM
'
' ARCHITECTURE:
' - Modular monolith
' - Routes -> Controllers -> Services -> Models
'
' COMMUNICATION:
' - Threaded async conversations
'
' DEPLOYMENT:
' - Cloud-based (Render / Railway / AWS)

' =========================================================
' 9. ERROR HANDLING & API DISCIPLINE
' =========================================================

' - Centralized global error handler
' - asyncHandler for all async controllers
' - NO try/catch in controllers
'
' Standard API Response:
'
' Success:
' { success: true, data: ... }
'
' Error:
' {
'   success: false,
'   error: {
'     code: "ERROR_CODE",
'     message: "Human readable message"
'   }
' }

' =========================================================
' 10. DATA MODEL (FINAL RULES)
' =========================================================

' Collections:
' - users               (identity, admin-only)
' - anonymous_profiles  (internal mapping only)
' - queries
' - threads
' - likes
' - flags
' - audit_logs
'
' Rules:
' - Student identity NEVER appears in content
' - Student shown ONLY as "Anonymous Student"
' - Staff shown with name + verified badge
' - Soft deletes only
' - All sensitive actions logged

' =========================================================
' 11. FOLDER STRUCTURE (MANDATORY)
' =========================================================

' backend/
'   src/
'     core/
'     modules/
'     routes.ts
'     app.ts
'     server.ts
'
' frontend/
'   src/
'     api/
'     auth/
'     pages/
'     components/
'
' docs/
'   threat-model.md
'   data-model.md
'   api-contracts.md

' =========================================================
' 12. PROJECT STATUS
' =========================================================

' Planning, architecture, and contracts COMPLETE.
'
' Current Phase:
' - Implementation (Bootstrap)

' =========================================================
' 13. EXECUTION RULE
' =========================================================

' When this prompt is provided:
' - DO NOT re-design requirements
' - DO NOT re-discuss architecture
' - DO NOT suggest features violating constraints
'
' Only implement the NEXT unfinished step.

' =========================================================
' FINAL RULE
' =========================================================

' If any suggestion contradicts this prompt:
' The suggestion is wrong.
' Not this prompt.
