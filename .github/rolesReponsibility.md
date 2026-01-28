🔐 Roles & Permission Boundaries

This system uses strict role-based access control (RBAC).
Permissions are explicit, minimal, and non-overlapping to protect anonymity and trust.

🧑‍🎓 Student
Identity

Authenticated student

Anonymous by default in all interactions

Can

Submit concerns/questions anonymously

Choose a category (mental health, academic, financial, personal, etc.)

View responses to their own submissions

Continue anonymous follow-up conversations

Edit or delete their own submissions (within allowed window)

Report abuse or inappropriate responses

Cannot

See identities of teachers, counsellors, admins (beyond role)

See identities of other students

View submissions from other students

Access moderation tools

Access admin or system logs

Be de-anonymized by anyone except admin (in rare cases)

👨‍🏫 Teacher
Identity

Verified college faculty

Never sees student identity

Can

View anonymous student submissions assigned to them or their domain

Respond to student concerns

Flag submissions for:

Counsellor attention

Admin review (abuse / safety concerns)

Add internal notes (not visible to students)

Cannot

See real student identity

De-anonymize students

Access admin logs

Modify or delete student submissions

Ban or punish students

View submissions outside permitted scope

🧠 Counsellor
Identity

Verified mental health or student support professional

Never sees student identity

Can

View anonymous submissions related to well-being

Respond with guidance and support

Escalate high-risk cases to admin

Add confidential professional notes

Request follow-up (still anonymous)

Cannot

See real student identity

De-anonymize students

Access system logs

Punish or discipline students

Act outside assigned support scope

🛡️ Admin (Trusted Authority)
Identity

Limited, trusted individuals only

Highest responsibility role

Can

Manage users (verify teachers/counsellors)

Manage categories and system configuration

Moderate content (remove abusive or unsafe submissions)

De-anonymize a student ONLY in extreme cases:

Harassment or threats

Repeated suicidal ideation

Serious system misuse

Escalate cases to appropriate college authorities

View audit and access logs

Cannot

De-anonymize students casually or without justification

Modify content silently (all actions logged)

Access content outside governance rules

Delegate de-anonymization powers without review

🔍 De-Anonymization Rules (Critical)

Allowed only for admins

Allowed only for extreme, justified cases

Every action must:

Have a written reason

Be logged with timestamp and admin ID

Be auditable later

No bulk access

No curiosity access

No silent access

De-anonymization is an exception, not a feature.

🧾 Audit & Accountability

All sensitive actions are logged:

Identity access

Content removal

Escalations

Logs are immutable

Logs are reviewable by designated authorities

🚫 Permission Escalation Rules

No role can escalate itself

No temporary privilege bypass

No “just for testing” admin access in production

Dev/test access ≠ production access

🧠 Design Principle

If a role does not explicitly need a permission, it must not have it.

Least privilege is mandatory.

✅ Enforcement Rule

Any feature or code change that:

Weakens anonymity

Blurs role boundaries

Allows unauthorized access

Must be rejected, even if it seems convenient.


DECISION:

- General queries are public and anonymous.
- Anyone (students, teachers, counsellors) can respond unless the query is marked private.
- Private queries restrict responses to intended roles.

ANONYMOUS CHAT:

- Real-time anonymous chat will NOT be included in v1.
- Reason: high complexity, moderation risk, and unclear necessity.
- Instead, private threaded asynchronous conversations will be used.

This preserves safety, anonymity, and professional boundaries while keeping the system manageable and production-grade.
