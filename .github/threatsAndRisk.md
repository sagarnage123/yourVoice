🧨 Threat & Failure Modeling

This document identifies what can go wrong, why it matters, and what the system must guarantee to remain safe, trustworthy, and production-grade.

The goal is not zero failure, but controlled, predictable failure.

1️⃣ Identity & Anonymity Threats (Highest Risk)
Threat: Accidental Identity Leakage

Examples

Student ID exposed in API response

Logs containing user identifiers

Metadata leaking through timestamps, filenames, or URLs

Impact

Permanent loss of student trust

Institutional damage

Project invalidation

System Guarantee

Student identity is never exposed outside admin-only paths

Anonymity enforced at API and data layers

Logs and errors must never include student identifiers

Identity safety > feature velocity

Threat: Unauthorized De-Anonymization

Examples

Admin accesses identity out of curiosity

Weak permission checks

Debug tools left enabled in production

Impact

Abuse of power

Ethical violation

Legal risk

System Guarantee

De-anonymization is:

Admin-only

Explicit

Logged

Justified

No bulk identity access

No silent access

2️⃣ Abuse & Harassment Threats
Threat: Anonymous Harassment

Examples

Abusive language toward Academician

Threats disguised as venting

Targeted harassment campaigns

Impact

Staff burnout

Platform misuse

Loss of institutional support

System Guarantee

Clear abuse boundaries

Admin moderation authority

Escalation workflow

Anonymity does NOT protect abuse

Threat: Coordinated Spam or Flooding

Examples

Mass posting

Like manipulation

Fake collective outrage

Impact

Noise drowning real issues

Loss of platform credibility

System Guarantee

Rate limits

Abuse detection signals

Manual admin intervention

Likes represent agreement, not popularity

3️⃣ Self-Harm & Crisis Risks
Threat: Suicidal Ideation Ignored or Mishandled

Examples

Student repeatedly expresses suicidal thoughts

No response or delayed response

Platform treated as sole support

Impact

Severe real-world harm

Moral and institutional failure

System Guarantee

Clear escalation triggers

Counsellor visibility

Admin involvement in extreme cases

Platform positions itself as support, not replacement

The system must never pretend to be therapy.

4️⃣ Power Imbalance & Retaliation Risks
Threat: Retaliation Against Students

Examples

Faculty guessing student identity

Institutional pressure

Punitive actions after public complaints

Impact

Fear

Silence

Platform abandonment

System Guarantee

No identity visibility to staff

No tracing via UI or metadata

Collective disagreement is NOT grounds for investigation

5️⃣ Public Query System Risks
Threat: Mob Dynamics

Examples

Pile-on behavior

Shaming disguised as agreement

Popularity bias

Impact

Toxic environment

Minority voices suppressed

System Guarantee

No downvotes

No public identity

Moderation for targeted attacks

Likes = agreement, not judgment

Threat: False or Misleading Claims

Examples

Exaggerated accusations

Misinterpretation of policies

Impact

Panic

Misinformation

System Guarantee

Staff can respond publicly

Admin can add clarifications

Content removal only with justification

6️⃣ Private Threaded Conversation Risks
Threat: Emotional Dependency

Examples

Student relies on one counsellor

Expectation of instant responses

Impact

Burnout

Boundary violations

System Guarantee

Asynchronous communication

No “online” indicators

No instant messaging pressure

Clear professional boundaries

Threat: Hidden Abuse in Private Threads

Examples

Threats or manipulation in private replies

Impact

Unseen harm

System Guarantee

Admin escalation path

Abuse reporting inside private threads

Logged conversation access for admin (only if escalated)

7️⃣ Technical Failure Scenarios
Threat: Partial System Outage

Examples

Database down

Notification failure

Impact

Lost messages

User frustration

System Guarantee

Graceful failure

Clear user messaging

No silent data loss

Threat: Data Loss or Corruption

Examples

Accidental deletion

Migration errors

Impact

Irrecoverable trust damage

System Guarantee

Backups

Soft deletes

Auditable actions

8️⃣ Governance & Misuse by Admins (Hard Truth)
Threat: Admin Abuse of Power

Examples

Over-moderation

Silencing protest

Unjustified de-anonymization

Impact

Platform becomes surveillance tool

System Guarantee

Minimal admin access

Immutable audit logs

Clear internal governance rules

Admin actions are reviewable

9️⃣ Failure Acceptance (Important)

The system accepts that:

Some misuse will happen

Some posts will be uncomfortable

Not all issues can be solved

The system does not accept:

Silent identity leaks

Unchecked power

Ignored crisis signals

🔑 Core Safety Principle

Anonymity protects vulnerability, not harm.
Power must always be logged.
Failure must be visible, not hidden.

✅ Enforcement Rule

Any design, feature, or code change that:

Weakens anonymity

Removes accountability

Increases hidden power

Silences collective voice

Must be rejected, even if technically convenient.
