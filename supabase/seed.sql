
insert into policies (policy_number, entity_type, entity_name, contact_person, contact_email, contact_phone, municipal_manager, council_resolution_ref, mfma_tag, vehicles, documents) values
('POL-MUN-4401','Municipality','City of Tshwane Metropolitan Municipality','Lerato Nkosi','lerato.nkosi@tshwane.gov.za','012 358 1234',
 '{"name":"Ms Lerato Nkosi - Municipal Manager","phone":"012 358 1234","email":"mm@tshwane.gov.za"}'::jsonb,
 'CM-2026/11-09','MFMA Sec 110 Compliant - 2024/25',
 '[{"reg":"HM 45 GP GP","make":"Toyota","model":"Hilux 2.8 GD-6","vin":"AHTFR8CD123456789","engine":"1GD-123456","dept":"Water & Sanitation"},{"reg":"HM 46 GP GP","make":"Toyota","model":"Corolla 1.8","vin":"AHTFR8CD987654321","engine":"1ZR-654321","dept":"Electricity"},{"reg":"HM 47 GP GP","make":"Nissan","model":"NP200","vin":"ADNCPUD22Z1234567","engine":"K9K-789","dept":"Roads"}]'::jsonb,
 '[{"id":"schedule","label":"Policy Schedule","type":"pdf"},{"id":"wording","label":"Policy Wording","type":"pdf"},{"id":"council_res","label":"Council Resolution CM-2026/11-09","type":"pdf"},{"id":"mfma_cert","label":"MFMA Compliance Certificate","type":"pdf"},{"id":"premium_receipt","label":"Premium Receipt 2024/25","type":"pdf"}]'::jsonb
),
('POL-MUN-4402','Municipality','Mogale City Local Municipality','Thabo Dlamini','thabo@mogalecity.gov.za','011 951 1234',
 '{"name":"Mr Thabo Dlamini - MM","phone":"011 951 1234"}'::jsonb,
 'MC-2025/08-12','MFMA Sec 110 - 2025',
 '[{"reg":"GP 12 AB GP","make":"Ford","model":"Ranger","vin":"AFARXX123456","engine":"2.2-111"}]'::jsonb,
 '[]'::jsonb
),
('POL-BIZ-7723','Business','Blue Crane Logistics (Pty) Ltd','Nico Brits','nico@bluecrane.co.za','082 539 6224',
 null, null, null,
 '[{"reg":"ND 123-456","make":"Toyota","model":"Corolla","vin":"VIN123"}]'::jsonb,
 '[]'::jsonb
);

insert into claims (policy_number, claim_type, claim_type_label, status, limited_status, incident_date, location, lat, lng, description, saps_case, documents, uploaded_files, internal_notes, audit_log) values
('POL-MUN-4401','motor_collision','Motor Fleet - Collision + Third Party','With Assessor','Under Review','2026-11-15T14:20:00+02:00','Cnr Madiba & Paul Kruger St, Pretoria Central',-25.7461,28.1881,
 'Municipal Hilux HM 45 GP GP - taxi Toyota Quantum veered from lane, collided with municipal vehicle. Front left damage, bumper, fender, headlight. Driver tested sober. Third party reg ND 123-456.',
 'CAS 412/11/2026',
 '[{"id":"drivers_license","label":"Drivers License","required":true,"confirmed":true},{"id":"id_doc","label":"ID Document","required":true,"confirmed":true},{"id":"saps_ar","label":"SAPS AR Number - AR 2026/11/0012","required":true,"confirmed":true},{"id":"natis","label":"NaTIS / Registration","required":true,"confirmed":false},{"id":"damage_photos","label":"Photos of Damage (min 4)","required":true,"confirmed":true},{"id":"third_party_license","label":"Third Party License","required":false,"confirmed":false},{"id":"incident_desc","label":"Incident Description","required":true,"confirmed":true}]'::jsonb,
 '[{"name":"license.pdf","url":"/mock/license.pdf","docId":"drivers_license"},{"name":"saps_ar.pdf","url":"/mock/saps_ar.pdf","docId":"saps_ar"}]'::jsonb,
 '[{"by":"Broker Admin","at":"2026-11-16T09:00:00Z","text":"Called SAPS for AR verification - confirmed AR 2026/11/0012. Taxi driver unlicensed."},{"by":"Broker Admin","at":"2026-11-17T10:00:00Z","text":"Municipal Manager notified per MFMA Sec 32. Council resolution attached."}]'::jsonb,
 '[{"at":"2026-11-15T14:30:00Z","action":"Claim logged by client via portal"},{"at":"2026-11-16T09:00:00Z","action":"Broker validated SAPS AR"}]'::jsonb
);
