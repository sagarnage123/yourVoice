' =========================================================
' API CONTRACTS — FINAL (ROLE & ANONYMITY SAFE)
' =========================================================

' API PREFIX
' /api/v1

' RESPONSE FORMAT (CONSISTENT)
'
' Success:
' {
'   success: true,
'   data: <payload>
' }
'
' Error:
' {
'   success: false,
'   error: {
'     code: "ERROR_CODE",
'     message: "Human readable message"
'   }
' }

' ---------------------------------------------------------
' AUTH
' ---------------------------------------------------------

' POST /auth/login
' POST /auth/refresh
' POST /auth/logout

' ---------------------------------------------------------
' STUDENT — QUERIES
' ---------------------------------------------------------

' POST /queries
' - Create a query (public or private)
'
' Body:
' - title
' - description
' - category
' - visibility (public / private)
' - target_role (optional)

' GET /queries
' - List public queries (sorted by likes, then time)

' GET /queries/{id}
' - Get single query + threads

' ---------------------------------------------------------
' GENERAL QUERY INTERACTIONS
' ---------------------------------------------------------

' POST /queries/{id}/like
' - Like a public query

' POST /queries/{id}/threads
' - Respond to a query
' - Allowed:
'   *Anyone if public
'* Only target role if private

' ---------------------------------------------------------
' PRIVATE THREAD CONTINUATION
' ---------------------------------------------------------

' GET /queries/{id}/threads
' - Fetch threaded conversation

' ---------------------------------------------------------
' FLAGS / REPORTING
' ---------------------------------------------------------

' POST /flags
'
' Body:
' - target_type
' - target_id
' - reason

' ---------------------------------------------------------
' TEACHER / COUNSELLOR
' ---------------------------------------------------------

' GET /assigned-queries
' - View private queries assigned to role

' POST /queries/{id}/escalate
' - Flag for admin attention

' ---------------------------------------------------------
' ADMIN (RESTRICTED)
' ---------------------------------------------------------

' GET /admin/flags
' - View reported content

' POST /admin/queries/{id}/remove
' - Soft remove content (logged)

' POST /admin/deanonymize
' - Map anonymous_profile_id -> user_id
' - Requires justification
' - Always logged

' ---------------------------------------------------------
' VISIBILITY GUARANTEES
' ---------------------------------------------------------

' - Student identity NEVER appears in responses
' - Student shown ONLY as "Anonymous Student"
' - Teacher/Counsellor shown as:
'   Name + Role + Verified badge
' - Admin-only endpoints never exposed to frontend

' ---------------------------------------------------------
' ENFORCEMENT RULE
' ---------------------------------------------------------

' Any API that:
' - Returns student identity
' - Allows role bypass
' - Skips audit logging
'
' MUST BE REJECTED.
