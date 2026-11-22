
export const CLAIM_TYPES = [
  { id: 'motor_collision', label: 'Motor Accident', icon: 'Car', docs: [
    {id:'drivers_license', label: "Driver's License", required:true, hint:'Valid SA license, PrDP if applicable', source:'SA Insurance Standard'},
    {id:'id_doc', label:'ID Document', required:true, source:'FAIS'},
    {id:'saps_ar', label:'SAPS AR Number (Accident Report)', required:true, hint:'Get from SAPS within 24h', source:'SA Insurance Standard'},
    {id:'natis', label:'Vehicle Registration (NaTIS)', required:true, hint:'Registration + VIN/Engine confirmation', source:'SA Insurance Standard'},
    {id:'damage_photos', label:'Photos of Damage (min 4)', required:true, hint:'Overall, close-up, VIN plate, licence disc', source:'SA Insurance Standard'},
    {id:'incident_desc', label:'Incident Description / Affidavit', required:true, source:'SA Insurance Standard'},
    {id:'third_party_license', label:'Third Party Details & License', required:false, hint:'If third party involved', source:'SA Insurance Standard'}
  ]},
  { id: 'motor_theft', label: 'Motor Theft / Hijack', icon: 'ShieldAlert', docs: [
    {id:'saps_case', label:'SAPS Case Number (CAS)', required:true, hint:'Within 24h', source:'SA Insurance Standard'},
    {id:'id_doc', label:'ID + Driver License', required:true, source:'SA Insurance Standard'},
    {id:'natis', label:'Registration + VIN/Engine + Keys', required:true, source:'SA Insurance Standard'},
    {id:'tracker', label:'Tracker Report & Deactivation', required:true, source:'SA Insurance Standard'},
    {id:'service_history', label:'Service History / Proof Ownership', required:true, source:'SA Insurance Standard'}
  ]},
  { id: 'home_building', label: 'Building / Property Damage', icon: 'Building', docs: [
    {id:'saps_case', label:'SAPS Case if applicable', required:false, source:'SA Insurance Standard'},
    {id:'damage_report', label:'Damage Report + Photos', required:true, source:'SA Insurance Standard'},
    {id:'quote', label:'Repair Quote (2 quotes > R25k)', required:true, source:'SA Insurance Standard'},
    {id:'proof_ownership', label:'Proof of Ownership / Title', required:true, source:'SA Insurance Standard'}
  ]},
  { id: 'home_theft', label: 'Theft / Burglary', icon: 'Home', docs: [
    {id:'saps_case', label:'SAPS Case within 48h', required:true, source:'SA Insurance Standard'},
    {id:'alarm', label:'Alarm Activation Report', required:true, source:'SA Insurance Standard'},
    {id:'inventory', label:'List of Items + Values + Age', required:true, source:'SA Insurance Standard'},
    {id:'proof', label:'Proof of Ownership (receipts/photos)', required:true, source:'SA Insurance Standard'},
    {id:'photos', label:'Photos of Forced Entry', required:true, source:'SA Insurance Standard'}
  ]},
  { id: 'fire_storm', label: 'Fire / Flood / Storm', icon: 'Flame', docs: [
    {id:'saps_case', label:'SAPS / Fire Dept Report', required:true, source:'SA Insurance Standard'},
    {id:'weather_report', label:'SAWS Weather Report if storm', required:false, source:'SA Insurance Standard'},
    {id:'damage_photos', label:'Photos / Video', required:true, source:'SA Insurance Standard'},
    {id:'quote', label:'Repair / Replacement Quote', required:true, source:'SA Insurance Standard'}
  ]},
  { id: 'all_risks', label: 'All Risks (Cellphone / Laptop)', icon: 'Smartphone', docs: [
    {id:'saps_case', label:'SAPS Case within 48h', required:true, source:'SA Insurance Standard'},
    {id:'proof', label:'Proof of Purchase + IMEI/Serial', required:true, source:'SA Insurance Standard'},
    {id:'blacklist', label:'Blacklisting Confirmation', required:true, source:'SA Insurance Standard'}
  ]},
  { id: 'liability', label: 'Liability / Public', icon: 'Scale', docs: [
    {id:'incident_report', label:'Incident Report + Witnesses', required:true, source:'SA Insurance Standard'},
    {id:'photos', label:'Photos of Area / Hazard', required:true, source:'SA Insurance Standard'},
    {id:'demand_letter', label:'Letter of Demand if received', required:false, source:'SA Insurance Standard'}
  ]}
]
