# Mpumelelo Services - Full Portal
Broker Backend + Client Portal - Live ready for municipalities & fleet.

## Broker can:
- View all clients (Private/Business/Municipality) with company/municipality, contact, municipal manager, council ref, MFMA tag, policy number
- See ALL documents, claim details, incident narrative, SAPS, third party, timeline, audit log
- Add client details: entity type, entity name, contact, manager, council resolution ref, MFMA, policy number, vehicles/assets (JSON)
- Update claims: status, assessor, validate docs, limited status
- Make notes: internal (broker only) vs client-visible
- Close off claims
- ONE PUSH: Chase Missing Docs / Chase Update -> sends email via Resend

## Client can:
- Login with Policy Number + Password (ID last 4)
- Request Roadside Assistance: auto-confirms cover via backend vehicle reg linked to policy (HM 45 GP GP -> POL-MUN-4401)
- Log a Claim: tells docs to upload per type, upload gallery or PDF, shows missing docs
- Open policy: policy schedule, wording, proof of cover, premium receipt, council resolution, MFMA cert
- See active claims, basic status, missing docs

## Setup
1. supabase: create project, run supabase/schema.sql + seed.sql
2. .env.local:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
RESEND_FROM=claims@mpumeleloservices.co.za
3. npm install && npm run dev

Branding: Teal #0E7A7B, dark #0F2B3C, no insurer names, just 'insurer'. 100% Black Owned Since 2006.
