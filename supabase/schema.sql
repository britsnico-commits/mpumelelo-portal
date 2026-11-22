
-- Enable UUID
create extension if not exists "uuid-ossp";

create table policies (
  id uuid primary key default uuid_generate_v4(),
  policy_number text unique not null,
  entity_type text check (entity_type in ('Private','Business','Municipality')) not null,
  entity_name text not null,
  contact_person text,
  contact_email text,
  contact_phone text,
  municipal_manager jsonb,
  council_resolution_ref text,
  mfma_tag text,
  vehicles jsonb default '[]'::jsonb,
  assets jsonb default '[]'::jsonb,
  documents jsonb default '[]'::jsonb,
  password_hash text,
  created_at timestamptz default now()
);

create table claims (
  id uuid primary key default uuid_generate_v4(),
  policy_number text references policies(policy_number) on delete cascade,
  claim_type text not null,
  claim_type_label text,
  status text check (status in ('Submitted','Under Review','Awaiting Documents','With Assessor','Approved','Rejected','Outcome Ready','Closed')) default 'Submitted',
  limited_status text default 'Submitted',
  incident_date timestamptz,
  location text,
  lat double precision,
  lng double precision,
  description text,
  saps_case text,
  third_party jsonb,
  documents jsonb default '[]'::jsonb,
  uploaded_files jsonb default '[]'::jsonb,
  internal_notes jsonb default '[]'::jsonb,
  client_notes jsonb default '[]'::jsonb,
  audit_log jsonb default '[]'::jsonb,
  risk_flags text[],
  assessor text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table roadside_requests (
  id uuid primary key default uuid_generate_v4(),
  policy_number text references policies(policy_number),
  vehicle_reg text not null,
  contact_number text,
  assistance_type text,
  notes text,
  lat double precision,
  lng double precision,
  cover_confirmed boolean default false,
  status text default 'Dispatched',
  created_at timestamptz default now()
);

-- Storage buckets (create in dashboard): claim-docs, policy-docs
