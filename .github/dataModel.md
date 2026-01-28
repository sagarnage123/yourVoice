' =========================================================
' DATA MODEL — FINAL (NO STUDENT ALIAS, VERIFIED STAFF)
' =========================================================

' GOAL
' Enforce absolute student anonymity and visible, verified
' staff identity at the data layer.
'
' Students have NO public identifier.
' Teachers and counsellors are always visible and verified.

' ---------------------------------------------------------
' 1. USERS COLLECTION (IDENTITY — ADMIN ONLY)
' ---------------------------------------------------------

' Collection: users
'
' Purpose:
' - Store real identities for authentication and escalation
'
' Fields:
' - _id
' - name
' - email
' - role              (student / teacher / counsellor / admin)
' - is_verified       (true for teacher/counsellor)
' - college_id
' - is_active
' - created_at
'
' Rules:
' - NEVER exposed for students
' - Exposed ONLY for teachers/counsellors (name + role + verified)
' - Admin-only access for identity mapping

' ---------------------------------------------------------
' 2. ANONYMOUS PROFILES (INTERNAL ONLY)
' ---------------------------------------------------------

' Collection: anonymous_profiles
'
' Purpose:
' - Internal mapping between student and anonymous activity
'
' Fields:
' -_id
' - user_id           (ref users._id)
' - created_at
'
' Rules:
' - NEVER exposed to frontend
' - NO alias, NO pseudonym
' - Used ONLY for internal reference and escalation

' ---------------------------------------------------------
' 3. QUERIES (PUBLIC & PRIVATE)
' ---------------------------------------------------------

' Collection: queries
'
' Purpose:
' - Store student-submitted issues
'
' Fields:
' - _id
' - anonymous_profile_id
' - title
' - description
' - category           (mental / academic / financial / etc.)
' - visibility         (public / private)
' - target_role        (null / teacher / counsellor)
' - like_count
' - is_flagged
' - is_removed
' - created_at
'
' UI RULE:
' - Author shown as "Anonymous Student" ONLY

' ---------------------------------------------------------
' 4. THREADS / RESPONSES
' ---------------------------------------------------------

' Collection: threads
'
' Purpose:
' - Store responses to queries
'
' Fields:
' - _id
' - query_id
' - responder_role     (student / teacher / counsellor)
' - responder_user_id  (ONLY for teacher/counsellor)
' - anonymous_profile_id (ONLY for student)
' - message
' - is_flagged
' - created_at
'
' UI RULE:
' - Student response  -> "Anonymous Student"
' - Staff response    -> Real name + role + verified badge

' ---------------------------------------------------------
' 5. LIKES (AGREEMENT SIGNAL)
' ---------------------------------------------------------

' Collection: likes
'
' Fields:
' - _id
' - query_id
' - anonymous_profile_id
' - created_at
'
' Rules:
' - One like per student per query
' - No downvotes

' ---------------------------------------------------------
' 6. FLAGS / REPORTS
' ---------------------------------------------------------

' Collection: flags
'
' Fields:
' - _id
' - target_type        (query / thread)
' - target_id
' - reason
' - reported_by_role
' - created_at
'
' Purpose:
' - Trigger admin review, not auto punishment

' ---------------------------------------------------------
' 7. AUDIT LOGS (CRITICAL)
' ---------------------------------------------------------

' Collection: audit_logs
'
' Fields:
' -_id
' - action_type        (deanonymize / remove / escalate / verify)
' - performed_by       (admin_id)
' - target_reference
' - reason
' - created_at
'
' Rules:
' - Immutable
' - Admin-only access

' ---------------------------------------------------------
' CORE DATA RULES
' ---------------------------------------------------------

' - Students have NO alias and NO visible identifier
' - Staff identity is visible and verified
' - Identity and content NEVER mix
' - All sensitive actions are auditable
