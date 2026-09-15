/* ------------------------------------------------------------------ */
/*  T2B Command — Day One MVP · in-memory demo dataset (no database)  */
/* ------------------------------------------------------------------ */

export const IMG = {
  hero: "https://images.pexels.com/photos/28145541/pexels-photo-28145541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  lobby: "https://images.pexels.com/photos/7750095/pexels-photo-7750095.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  atrium: "https://images.pexels.com/photos/36286291/pexels-photo-36286291.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  corridor: "https://images.pexels.com/photos/7511744/pexels-photo-7511744.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  team: "https://images.pexels.com/photos/6197121/pexels-photo-6197121.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  cart: "https://images.pexels.com/photos/36303748/pexels-photo-36303748.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  housekeeping: "https://images.pexels.com/photos/9462786/pexels-photo-9462786.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  window: "https://images.pexels.com/photos/34023076/pexels-photo-34023076.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  pressure: "https://images.pexels.com/photos/12919779/pexels-photo-12919779.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  fountain: "https://images.pexels.com/photos/31620041/pexels-photo-31620041.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  apartment: "https://images.pexels.com/photos/35410014/pexels-photo-35410014.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  apartment2: "https://images.pexels.com/photos/5674684/pexels-photo-5674684.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  lobbyArt: "https://images.pexels.com/photos/31904285/pexels-photo-31904285.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  woodLobby: "https://images.pexels.com/photos/32674962/pexels-photo-32674962.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  hotel: "https://images.pexels.com/photos/12387992/pexels-photo-12387992.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  escalator: "https://images.pexels.com/photos/6644710/pexels-photo-6644710.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  glassRoof: "https://images.pexels.com/photos/28145541/pexels-photo-28145541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

export const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const fmt2 = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/* ------------------------------ users ------------------------------ */
export type Role =
  | "Executive / CEO"
  | "System Administrator"
  | "Sales"
  | "Operations Manager"
  | "Vendor Manager"
  | "Inspector (QA)"
  | "Finance / Accounting"
  | "Client User"
  | "Vendor / Subcontractor"
  | "Consulting User";

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  mfa: boolean;
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
}

export const users: User[] = [
  { id: "U-01", name: "Danielle Carter", role: "Executive / CEO", email: "danielle@top2bottom.com", mfa: true, status: "Active", lastActive: "now" },
  { id: "U-02", name: "Marcus Reid", role: "System Administrator", email: "marcus@top2bottom.com", mfa: true, status: "Active", lastActive: "4m ago" },
  { id: "U-03", name: "Sofia Alvarez", role: "Sales", email: "sofia@top2bottom.com", mfa: true, status: "Active", lastActive: "18m ago" },
  { id: "U-04", name: "James Okafor", role: "Operations Manager", email: "james@top2bottom.com", mfa: true, status: "Active", lastActive: "2m ago" },
  { id: "U-05", name: "Priya Nair", role: "Vendor Manager", email: "priya@top2bottom.com", mfa: true, status: "Active", lastActive: "31m ago" },
  { id: "U-06", name: "Tom Weller", role: "Inspector (QA)", email: "tom@top2bottom.com", mfa: true, status: "Active", lastActive: "1h ago" },
  { id: "U-07", name: "Grace Kim", role: "Finance / Accounting", email: "grace@top2bottom.com", mfa: true, status: "Active", lastActive: "9m ago" },
  { id: "U-08", name: "Lena Brooks", role: "Consulting User", email: "lena@top2bottom.com", mfa: false, status: "Invited", lastActive: "—" },
];

/* ------------------------------ leads ------------------------------ */
export type LeadStage = "New" | "Qualified" | "Assessment" | "Proposal" | "Negotiation" | "Won" | "Lost";
export const LEAD_STAGES: LeadStage[] = ["New", "Qualified", "Assessment", "Proposal", "Negotiation", "Won"];

export interface Lead {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  source: string;
  campaign: string;
  propertyType: string;
  sqft: number;
  services: string[];
  frequency: string;
  stage: LeadStage;
  value: number;
  owner: string;
  created: string;
  division: "Facility Solutions" | "Consulting";
  smsConsent: boolean;
  lastActivity: string;
}

export const leads: Lead[] = [
  { id: "LD-1042", company: "Crescent Point Offices", contact: "Dana Whitfield", email: "dana@crescentpoint.com", phone: "(404) 555-0182", source: "Google Ads", campaign: "atl-janitorial-q4", propertyType: "Commercial Office", sqft: 48000, services: ["Commercial Janitorial", "Day Porter"], frequency: "5× weekly", stage: "New", value: 9600, owner: "Sofia Alvarez", created: "Sep 12", division: "Facility Solutions", smsConsent: false, lastActivity: "Form submitted 2h ago" },
  { id: "LD-1041", company: "Harbor & Vine STR", contact: "Milo Tran", email: "milo@harborvine.com", phone: "(912) 555-0148", source: "Website", campaign: "organic", propertyType: "Short-Term Rental", sqft: 12000, services: ["Turnover Cleaning"], frequency: "Per booking", stage: "New", value: 3200, owner: "Sofia Alvarez", created: "Sep 12", division: "Facility Solutions", smsConsent: true, lastActivity: "AI-qualified via chat" },
  { id: "LD-1039", company: "Meridian Financial Plaza", contact: "Rita Calloway", email: "rita@meridianfp.com", phone: "(404) 555-0116", source: "Referral", campaign: "partner-program", propertyType: "Financial Institution", sqft: 86000, services: ["Commercial Janitorial", "Floor Care", "Window Cleaning"], frequency: "Daily", stage: "Qualified", value: 24000, owner: "Sofia Alvarez", created: "Sep 10", division: "Facility Solutions", smsConsent: true, lastActivity: "Discovery call logged" },
  { id: "LD-1036", company: "Brightpath Medical Group", contact: "Dr. Alan Cho", email: "acho@brightpathmed.com", phone: "(678) 555-0177", source: "Google Ads", campaign: "medical-cleaning", propertyType: "Medical Facility", sqft: 22000, services: ["Medical Facilities", "Disinfection Services"], frequency: "6× weekly", stage: "Assessment", value: 11800, owner: "Sofia Alvarez", created: "Sep 8", division: "Facility Solutions", smsConsent: false, lastActivity: "Onsite walk scheduled Fri 9:00" },
  { id: "LD-1034", company: "Summit Retail Partners", contact: "Jordan Blake", email: "jblake@summitretail.com", phone: "(770) 555-0103", source: "Meta Ads", campaign: "retail-q3", propertyType: "Retail", sqft: 34000, services: ["Retail Cleaning", "Pressure Washing"], frequency: "3× weekly", stage: "Assessment", value: 7200, owner: "Sofia Alvarez", created: "Sep 6", division: "Facility Solutions", smsConsent: true, lastActivity: "Photos received (12)" },
  { id: "LD-1031", company: "Apex Construction Co.", contact: "Sam Duarte", email: "sam@apexbuilds.com", phone: "(470) 555-0139", source: "Website", campaign: "organic", propertyType: "Construction", sqft: 120000, services: ["Post-Construction Cleaning"], frequency: "One-time", stage: "Proposal", value: 18500, owner: "Sofia Alvarez", created: "Sep 4", division: "Facility Solutions", smsConsent: false, lastActivity: "Proposal v2 sent" },
  { id: "LD-1029", company: "Lakeshore Apartments", contact: "Erin Moss", email: "erin@lakeshoreapts.com", phone: "(404) 555-0164", source: "Google Business", campaign: "gmb", propertyType: "Apartment Community", sqft: 64000, services: ["Apartment Turnovers", "Common Area Maintenance"], frequency: "Weekly", stage: "Proposal", value: 14200, owner: "Sofia Alvarez", created: "Sep 2", division: "Facility Solutions", smsConsent: true, lastActivity: "Proposal viewed 3×" },
  { id: "LD-1025", company: "Foundry Coworking", contact: "Thea Lindqvist", email: "thea@foundryco.com", phone: "(404) 555-0128", source: "LinkedIn", campaign: "cowork-atl", propertyType: "Commercial Office", sqft: 18000, services: ["Office Cleaning", "High Dusting"], frequency: "5× weekly", stage: "Negotiation", value: 6800, owner: "Sofia Alvarez", created: "Aug 28", division: "Facility Solutions", smsConsent: true, lastActivity: "Terms redline returned" },
  { id: "LD-1022", company: "Northgate Charter School", contact: "Bill Andrews", email: "bandrews@northgatecharter.org", phone: "(678) 555-0155", source: "Referral", campaign: "partner-program", propertyType: "Education", sqft: 52000, services: ["Commercial Janitorial", "Floor Care"], frequency: "Daily", stage: "Negotiation", value: 16500, owner: "Sofia Alvarez", created: "Aug 25", division: "Facility Solutions", smsConsent: false, lastActivity: "Board review pending" },
  { id: "LD-1018", company: "Vantage Property Group", contact: "Carla Nguyen", email: "carla@vantagepg.com", phone: "(404) 555-0191", source: "Website", campaign: "organic", propertyType: "Property Management", sqft: 210000, services: ["Commercial Janitorial", "Preventative Maintenance", "Hauling & Junk Removal"], frequency: "Monthly", stage: "Won", value: 42000, owner: "Sofia Alvarez", created: "Aug 20", division: "Facility Solutions", smsConsent: true, lastActivity: "Agreement signed — onboarding" },
  { id: "LD-2011", company: "Sterling & Rowe LLP", contact: "Howard Sterling", email: "hsterling@sterlingrowe.com", phone: "(404) 555-0170", source: "Website", campaign: "consulting-lp", propertyType: "Consulting", sqft: 0, services: ["Facility Program Audit"], frequency: "Engagement", stage: "Qualified", value: 15000, owner: "Lena Brooks", created: "Sep 9", division: "Consulting", smsConsent: false, lastActivity: "Consultation booked" },
  { id: "LD-2009", company: "BlueOrbit Hotels", contact: "Nadia Reyes", email: "nadia@blueorbit.com", phone: "(305) 555-0112", source: "Referral", campaign: "consulting", propertyType: "Consulting", sqft: 0, services: ["Vendor Network Design"], frequency: "Engagement", stage: "Assessment", value: 28000, owner: "Lena Brooks", created: "Sep 5", division: "Consulting", smsConsent: false, lastActivity: "Intake form complete" },
];

/* --------------------------- clients ------------------------------- */
export interface Building { name: string; floors: number; sqft: number; type: string }
export interface Site { id: string; name: string; city: string; address: string; buildings: Building[] }
export interface ClientAccount {
  id: string;
  name: string;
  industry: string;
  tier: "Signature" | "Premier" | "Standard";
  since: string;
  health: number;
  mrr: number;
  balance: number;
  pm: string;
  contacts: { name: string; role: string; email: string; phone: string }[];
  sites: Site[];
  services: string[];
  photo: string;
}

export const clients: ClientAccount[] = [
  {
    id: "CL-001", name: "Meridian Property Group", industry: "Property Management", tier: "Signature", since: "2021", health: 96, mrr: 38500, balance: 0, pm: "James Okafor",
    contacts: [ { name: "Carla Nguyen", role: "Director of Facilities", email: "carla@meridianpg.com", phone: "(404) 555-0191" }, { name: "Dev Patel", role: "Billing", email: "ap@meridianpg.com", phone: "(404) 555-0130" } ],
    sites: [
      { id: "ST-101", name: "Meridian Tower One", city: "Atlanta, GA", address: "1200 Peachtree St NE", buildings: [ { name: "Tower A", floors: 22, sqft: 310000, type: "Class A Office" }, { name: "Plaza Pavilion", floors: 3, sqft: 45000, type: "Retail" } ] },
      { id: "ST-102", name: "Meridian West Commons", city: "Marietta, GA", address: "800 Whitlock Ave", buildings: [ { name: "Building 1", floors: 4, sqft: 68000, type: "Office" }, { name: "Building 2", floors: 4, sqft: 68000, type: "Office" } ] },
    ],
    services: ["Commercial Janitorial", "Day Porter", "Floor Care", "Window Cleaning"], photo: IMG.atrium,
  },
  {
    id: "CL-002", name: "Harborview Apartments", industry: "Apartment Community", tier: "Premier", since: "2022", health: 88, mrr: 12900, balance: 2450, pm: "James Okafor",
    contacts: [ { name: "Erin Moss", role: "Community Manager", email: "erin@harborviewapts.com", phone: "(912) 555-0122" } ],
    sites: [ { id: "ST-201", name: "Harborview Residences", city: "Savannah, GA", address: "44 Riverwalk Pkwy", buildings: [ { name: "Building A", floors: 5, sqft: 82000, type: "Residential" }, { name: "Building B", floors: 5, sqft: 82000, type: "Residential" }, { name: "Clubhouse", floors: 1, sqft: 9000, type: "Amenity" } ] } ],
    services: ["Apartment Turnovers", "Common Area Maintenance", "Clubhouse Cleaning"], photo: IMG.apartment,
  },
  {
    id: "CL-003", name: "Brightpath Medical Group", industry: "Healthcare", tier: "Premier", since: "2023", health: 92, mrr: 17400, balance: 0, pm: "James Okafor",
    contacts: [ { name: "Dr. Alan Cho", role: "Practice Administrator", email: "acho@brightpathmed.com", phone: "(678) 555-0177" } ],
    sites: [ { id: "ST-301", name: "Brightpath Buckhead Clinic", city: "Atlanta, GA", address: "3390 Piedmont Rd", buildings: [ { name: "Main Clinic", floors: 2, sqft: 22000, type: "Medical Office" } ] }, { id: "ST-302", name: "Brightpath Decatur", city: "Decatur, GA", address: "255 W Ponce de Leon", buildings: [ { name: "Clinic", floors: 1, sqft: 9500, type: "Medical Office" } ] } ],
    services: ["Medical Facilities", "Disinfection Services"], photo: IMG.corridor,
  },
  {
    id: "CL-004", name: "Summit Retail Partners", industry: "Retail", tier: "Standard", since: "2023", health: 81, mrr: 8600, balance: 1200, pm: "James Okafor",
    contacts: [ { name: "Jordan Blake", role: "Regional Manager", email: "jblake@summitretail.com", phone: "(770) 555-0103" } ],
    sites: [ { id: "ST-401", name: "Summit Plaza East", city: "Alpharetta, GA", address: "5000 Windward Pkwy", buildings: [ { name: "Plaza", floors: 1, sqft: 34000, type: "Retail Center" } ] } ],
    services: ["Retail Cleaning", "Pressure Washing"], photo: IMG.escalator,
  },
  {
    id: "CL-005", name: "First Harbor Bank", industry: "Financial Institution", tier: "Signature", since: "2020", health: 98, mrr: 22300, balance: 0, pm: "James Okafor",
    contacts: [ { name: "Rita Calloway", role: "VP Corporate Services", email: "rita@firstharbor.com", phone: "(404) 555-0116" } ],
    sites: [ { id: "ST-501", name: "First Harbor HQ", city: "Atlanta, GA", address: "55 Ivan Allen Jr Blvd", buildings: [ { name: "HQ Tower", floors: 12, sqft: 145000, type: "Office" } ] }, { id: "ST-502", name: "Buckhead Branch", city: "Atlanta, GA", address: "3344 Peachtree Rd", buildings: [ { name: "Branch", floors: 1, sqft: 4800, type: "Retail Bank" } ] } ],
    services: ["Commercial Janitorial", "Floor Care", "High Dusting"], photo: IMG.woodLobby,
  },
  {
    id: "CL-006", name: "Apex Construction Co.", industry: "Construction", tier: "Standard", since: "2024", health: 77, mrr: 0, balance: 9400, pm: "James Okafor",
    contacts: [ { name: "Sam Duarte", role: "Project Executive", email: "sam@apexbuilds.com", phone: "(470) 555-0139" } ],
    sites: [ { id: "ST-601", name: "The Foundry District", city: "Atlanta, GA", address: "1201 Howell Mill Rd", buildings: [ { name: "North Lofts", floors: 7, sqft: 120000, type: "New Construction" } ] } ],
    services: ["Post-Construction Cleaning"], photo: IMG.apartment2,
  },
];

/* ---------------------------- vendors ------------------------------ */
export interface Vendor {
  id: string;
  name: string;
  owner: string;
  city: string;
  services: string[];
  radius: number;
  crew: number;
  rating: number;
  jobsDone: number;
  onTime: number;
  status: "Approved" | "Pending Review" | "Probation" | "Applicant";
  coiExpiry: string;
  coiStatus: "Valid" | "Expiring" | "Expired";
  w9: boolean;
  payoutTerms: string;
  capacity: number;
  pendingPay: number;
}

export const vendors: Vendor[] = [
  { id: "VN-101", name: "CrystalClean Crew LLC", owner: "Marisol Vega", city: "Atlanta, GA", services: ["Commercial Janitorial", "Day Porter"], radius: 35, crew: 14, rating: 4.9, jobsDone: 842, onTime: 98, status: "Approved", coiExpiry: "Mar 2027", coiStatus: "Valid", w9: true, payoutTerms: "Net 15", capacity: 78, pendingPay: 4280 },
  { id: "VN-102", name: "ProShine Floor Care", owner: "Derek Wilson", city: "Marietta, GA", services: ["Floor Care", "Carpet Care"], radius: 45, crew: 6, rating: 4.8, jobsDone: 512, onTime: 97, status: "Approved", coiExpiry: "Oct 2026", coiStatus: "Expiring", w9: true, payoutTerms: "Net 7", capacity: 62, pendingPay: 1890 },
  { id: "VN-103", name: "Metro Facility Pros", owner: "Andre Baptiste", city: "Decatur, GA", services: ["Commercial Janitorial", "Disinfection"], radius: 30, crew: 10, rating: 4.7, jobsDone: 689, onTime: 95, status: "Approved", coiExpiry: "Jan 2027", coiStatus: "Valid", w9: true, payoutTerms: "Net 15", capacity: 84, pendingPay: 3120 },
  { id: "VN-104", name: "SwiftHaul Removal Co.", owner: "Casey Lowery", city: "Atlanta, GA", services: ["Hauling & Junk Removal"], radius: 50, crew: 4, rating: 4.6, jobsDone: 234, onTime: 93, status: "Approved", coiExpiry: "Jun 2027", coiStatus: "Valid", w9: true, payoutTerms: "Net 7", capacity: 41, pendingPay: 640 },
  { id: "VN-105", name: "ClearView Window Works", owner: "Nina Petrova", city: "Roswell, GA", services: ["Window Cleaning", "Pressure Washing"], radius: 40, crew: 5, rating: 4.9, jobsDone: 301, onTime: 99, status: "Approved", coiExpiry: "Sep 2026", coiStatus: "Expiring", w9: true, payoutTerms: "Net 15", capacity: 55, pendingPay: 0 },
  { id: "VN-106", name: "EliteTurn Services", owner: "Bobby Sinclair", city: "Savannah, GA", services: ["Apartment Turnovers", "Clubhouse Cleaning"], radius: 40, crew: 8, rating: 4.5, jobsDone: 178, onTime: 91, status: "Probation", coiExpiry: "Nov 2026", coiStatus: "Valid", w9: true, payoutTerms: "Net 15", capacity: 66, pendingPay: 2340 },
  { id: "VN-107", name: "GreenLeaf Day Services", owner: "Tanya Rose", city: "Atlanta, GA", services: ["Day Porter", "Common Area Maintenance"], radius: 25, crew: 3, rating: 0, jobsDone: 0, onTime: 0, status: "Applicant", coiExpiry: "—", coiStatus: "Expired", w9: false, payoutTerms: "—", capacity: 0, pendingPay: 0 },
  { id: "VN-108", name: "PrimeTime Medical Clean", owner: "Felix Adeyemi", city: "Sandy Springs, GA", services: ["Medical Facilities", "Disinfection"], radius: 30, crew: 7, rating: 0, jobsDone: 0, onTime: 0, status: "Pending Review", coiExpiry: "Dec 2026", coiStatus: "Valid", w9: true, payoutTerms: "Net 15", capacity: 0, pendingPay: 0 },
];

/* -------------------------- work orders ---------------------------- */
export type WOStatus = "Unassigned" | "Assigned" | "Accepted" | "En Route" | "In Progress" | "Completed" | "QA Review" | "Corrective Action" | "Verified" | "Invoiced";
export interface WorkOrder {
  id: string;
  title: string;
  client: string;
  site: string;
  building?: string;
  service: string;
  priority: "Low" | "Standard" | "High" | "Emergency";
  status: WOStatus;
  date: string;
  day: string;
  window: string;
  vendor?: string;
  vendorId?: string;
  estimate: number;
  cost: number;
  checklist: { item: string; done: boolean }[];
  photos: number;
  source: "Recurring" | "One-time" | "Client Request";
  agreement?: string;
}

export const workOrders: WorkOrder[] = [
  { id: "WO-2381", title: "Nightly janitorial — Tower A", client: "Meridian Property Group", site: "Meridian Tower One", building: "Tower A", service: "Commercial Janitorial", priority: "Standard", status: "Verified", date: "Mon Sep 15", day: "Mon", window: "6:00 PM – 10:00 PM", vendor: "CrystalClean Crew LLC", vendorId: "VN-101", estimate: 1180, cost: 760, source: "Recurring", agreement: "AGR-2011", photos: 9, checklist: [ { item: "Lobby glass & entry detail", done: true }, { item: "Restrooms sanitize + restock (floors 1–22)", done: true }, { item: "Breakroom degrease", done: true }, { item: "Trash & recycling pull", done: true }, { item: "Vacuum common corridors", done: true } ] },
  { id: "WO-2384", title: "Quarterly floor refinish — lobby", client: "First Harbor Bank", site: "First Harbor HQ", building: "HQ Tower", service: "Floor Care", priority: "High", status: "QA Review", date: "Mon Sep 15", day: "Mon", window: "8:00 PM – 12:00 AM", vendor: "ProShine Floor Care", vendorId: "VN-102", estimate: 3400, cost: 2100, source: "Recurring", agreement: "AGR-1989", photos: 14, checklist: [ { item: "Strip & neutralize terrazzo", done: true }, { item: "Apply 4 coats finish", done: true }, { item: "Burnish to gloss", done: true }, { item: "Before/after photos", done: true } ] },
  { id: "WO-2390", title: "Unit 4B turnover clean", client: "Harborview Apartments", site: "Harborview Residences", building: "Building A", service: "Apartment Turnovers", priority: "High", status: "In Progress", date: "Tue Sep 16", day: "Tue", window: "9:00 AM – 1:00 PM", vendor: "EliteTurn Services", vendorId: "VN-106", estimate: 420, cost: 265, source: "Client Request", photos: 6, checklist: [ { item: "Kitchen deep clean + appliances", done: true }, { item: "Bathroom sanitize + grout", done: true }, { item: "Carpet clean all rooms", done: false }, { item: "Patio sweep + wipe rails", done: false }, { item: "Final walkthrough photos", done: false } ] },
  { id: "WO-2392", title: "Terminal disinfection fogging", client: "Brightpath Medical Group", site: "Brightpath Buckhead Clinic", building: "Main Clinic", service: "Disinfection Services", priority: "Standard", status: "Accepted", date: "Tue Sep 16", day: "Tue", window: "7:00 PM – 9:00 PM", vendor: "Metro Facility Pros", vendorId: "VN-103", estimate: 690, cost: 410, source: "Recurring", agreement: "AGR-2201", photos: 0, checklist: [ { item: "EPA List-N disinfectant fog", done: false }, { item: "High-touch point wipe-down", done: false }, { item: "Exam rooms terminal clean", done: false }, { item: "Log dwell times", done: false } ] },
  { id: "WO-2395", title: "Pressure wash storefront + walkways", client: "Summit Retail Partners", site: "Summit Plaza East", building: "Plaza", service: "Pressure Washing", priority: "Standard", status: "Assigned", date: "Wed Sep 17", day: "Wed", window: "5:00 AM – 8:00 AM", vendor: "ClearView Window Works", vendorId: "VN-105", estimate: 1150, cost: 700, source: "Recurring", agreement: "AGR-2230", photos: 0, checklist: [ { item: "Pre-treat oil spots", done: false }, { item: "Surface-clean 12,000 sqft", done: false }, { item: "Rinse + detail entries", done: false } ] },
  { id: "WO-2396", title: "Post-construction rough clean — L3", client: "Apex Construction Co.", site: "The Foundry District", building: "North Lofts", service: "Post-Construction Cleaning", priority: "Standard", status: "Assigned", date: "Wed Sep 17", day: "Wed", window: "7:00 AM – 4:00 PM", vendor: "CrystalClean Crew LLC", vendorId: "VN-101", estimate: 4850, cost: 2980, source: "One-time", photos: 0, checklist: [ { item: "Debris removal 24 units", done: false }, { item: "Dust walls + vents", done: false }, { item: "Window scrape + wash", done: false } ] },
  { id: "WO-2399", title: "Glass canopy detail — atrium", client: "Meridian Property Group", site: "Meridian West Commons", building: "Building 1", service: "Window Cleaning", priority: "Low", status: "Unassigned", date: "Thu Sep 18", day: "Thu", window: "6:00 AM – 10:00 AM", estimate: 980, cost: 0, source: "Client Request", photos: 0, checklist: [ { item: "Interior canopy glass", done: false }, { item: "Exterior canopy glass", done: false }, { item: "Frame + track detail", done: false } ] },
  { id: "WO-2402", title: "Day porter — plaza pavilion", client: "Meridian Property Group", site: "Meridian Tower One", building: "Plaza Pavilion", service: "Day Porter", priority: "Standard", status: "Unassigned", date: "Thu Sep 18", day: "Thu", window: "10:00 AM – 2:00 PM", estimate: 260, cost: 0, source: "Recurring", agreement: "AGR-2011", photos: 0, checklist: [ { item: "Restroom checks hourly", done: false }, { item: "Trash patrol + lobby touchups", done: false } ] },
  { id: "WO-2405", title: "Clubhouse event reset", client: "Harborview Apartments", site: "Harborview Residences", building: "Clubhouse", service: "Clubhouse Cleaning", priority: "Standard", status: "Accepted", date: "Fri Sep 19", day: "Fri", window: "8:00 AM – 11:00 AM", vendor: "EliteTurn Services", vendorId: "VN-106", estimate: 310, cost: 190, source: "Client Request", photos: 0, checklist: [ { item: "Furniture reset", done: false }, { item: "Kitchen detail", done: false }, { item: "Floor machine scrub", done: false } ] },
  { id: "WO-2407", title: "Emergency water extraction — suite 410", client: "First Harbor Bank", site: "First Harbor HQ", building: "HQ Tower", service: "Emergency Cleanup", priority: "Emergency", status: "Corrective Action", date: "Fri Sep 19", day: "Fri", window: "ASAP", vendor: "Metro Facility Pros", vendorId: "VN-103", estimate: 2750, cost: 1900, source: "Client Request", photos: 11, checklist: [ { item: "Extract standing water", done: true }, { item: "Set air movers + dehus", done: true }, { item: "Moisture map log", done: true }, { item: "QA re-inspection", done: false } ] },
  { id: "WO-2410", title: "Junk removal — garage level B2", client: "Meridian Property Group", site: "Meridian Tower One", building: "Tower A", service: "Hauling & Junk Removal", priority: "Low", status: "Completed", date: "Sat Sep 20", day: "Sat", window: "7:00 AM – 10:00 AM", vendor: "SwiftHaul Removal Co.", vendorId: "VN-104", estimate: 890, cost: 560, source: "Client Request", photos: 4, checklist: [ { item: "Load + haul 3 bays", done: true }, { item: "Sweep bay area", done: true }, { item: "Disposal ticket upload", done: true } ] },
  { id: "WO-2412", title: "High dusting — trading floor", client: "First Harbor Bank", site: "First Harbor HQ", building: "HQ Tower", service: "High Dusting", priority: "Standard", status: "Invoiced", date: "Sat Sep 13", day: "Sat", window: "6:00 AM – 11:00 AM", vendor: "CrystalClean Crew LLC", vendorId: "VN-101", estimate: 1450, cost: 900, source: "Recurring", agreement: "AGR-1989", photos: 8, checklist: [ { item: "Vents + diffusers", done: true }, { item: "Beam + ledge dusting", done: true }, { item: "HEPA vacuum drapery", done: true } ] },
];

/* --------------------------- proposals ----------------------------- */
export interface Proposal {
  id: string;
  client: string;
  title: string;
  version: number;
  status: "Draft" | "Sent" | "Viewed" | "Accepted" | "Declined" | "Revised";
  value: number;
  cost: number;
  margin: number;
  sent: string;
  lines: { label: string; qty: string; amount: number }[];
  owner: string;
}
export const proposals: Proposal[] = [
  { id: "EST-0912", client: "Apex Construction Co.", title: "The Foundry District — final clean program", version: 2, status: "Sent", value: 18500, cost: 11300, margin: 38.9, sent: "Sep 11", owner: "Sofia Alvarez", lines: [ { label: "Rough clean — 24 loft units", qty: "24 units", amount: 6200 }, { label: "Final clean — units + amenities", qty: "24 units", amount: 7800 }, { label: "Exterior window wash", qty: "1 visit", amount: 2400 }, { label: "Garage pressure wash", qty: "2 levels", amount: 2100 } ] },
  { id: "EST-0908", client: "Lakeshore Apartments", title: "Turnover + common area program", version: 1, status: "Viewed", value: 14200, cost: 9200, margin: 35.2, sent: "Sep 8", owner: "Sofia Alvarez", lines: [ { label: "Unit turns (est. 14/mo)", qty: "14 units", amount: 5880 }, { label: "Common area 5× weekly", qty: "Monthly", amount: 6400 }, { label: "Clubhouse detail", qty: "2× monthly", amount: 780 }, { label: "Supply program", qty: "Monthly", amount: 1140 } ] },
  { id: "EST-0901", client: "Foundry Coworking", title: "5× weekly office cleaning + supplies", version: 3, status: "Revised", value: 6800, cost: 4300, margin: 36.8, sent: "Sep 5", owner: "Sofia Alvarez", lines: [ { label: "Nightly clean 5× weekly", qty: "Monthly", amount: 5200 }, { label: "Day porter 2× weekly", qty: "Monthly", amount: 1200 }, { label: "Consumables program", qty: "Monthly", amount: 400 } ] },
  { id: "EST-0889", client: "Vantage Property Group", title: "Portfolio janitorial + PM agreement", version: 2, status: "Accepted", value: 42000, cost: 27100, margin: 35.5, sent: "Aug 28", owner: "Sofia Alvarez", lines: [ { label: "Portfolio janitorial (6 assets)", qty: "Monthly", amount: 31500 }, { label: "Preventative maintenance", qty: "Monthly", amount: 7200 }, { label: "Hauling on-call", qty: "Monthly", amount: 3300 } ] },
  { id: "EST-0895", client: "Northgate Charter School", title: "Daily school janitorial program", version: 1, status: "Sent", value: 16500, cost: 11800, margin: 28.5, sent: "Sep 3", owner: "Sofia Alvarez", lines: [ { label: "Daily janitorial 5× weekly", qty: "Monthly", amount: 13800 }, { label: "Floor care quarterly", qty: "Quarterly", amount: 1900 }, { label: "Summer deep clean", qty: "Annual", amount: 800 } ] },
];

/* ----------------------------- QA ---------------------------------- */
export interface Inspection {
  id: string;
  wo: string;
  client: string;
  site: string;
  inspector: string;
  date: string;
  score: number;
  result: "Pass" | "Fail" | "Pending";
  type: "Evidence Review" | "Onsite Inspection" | "Client Escort";
  issues: { area: string; note: string; severity: "Low" | "Medium" | "High"; status: "Open" | "Corrected" }[];
  photos: string[];
}
export const inspections: Inspection[] = [
  { id: "QA-1187", wo: "WO-2384", client: "First Harbor Bank", site: "HQ Tower — Lobby", inspector: "Tom Weller", date: "Sep 16 · 7:30 AM", score: 98, result: "Pending", type: "Onsite Inspection", issues: [], photos: [IMG.woodLobby, IMG.lobby] },
  { id: "QA-1184", wo: "WO-2381", client: "Meridian Property Group", site: "Tower A — Nightly", inspector: "Tom Weller", date: "Sep 16 · 6:00 AM", score: 96, result: "Pass", type: "Evidence Review", issues: [], photos: [IMG.atrium, IMG.corridor] },
  { id: "QA-1181", wo: "WO-2407", client: "First Harbor Bank", site: "HQ Tower — Suite 410", inspector: "Tom Weller", date: "Sep 15 · 4:15 PM", score: 64, result: "Fail", type: "Onsite Inspection", issues: [ { area: "Suite 410 — East wall", note: "Moisture reading 18% above threshold after drying cycle", severity: "High", status: "Open" }, { area: "Baseboards", note: "Swelling on 2 boards — replacement recommended", severity: "Medium", status: "Corrected" } ], photos: [IMG.cart] },
  { id: "QA-1176", wo: "WO-2410", client: "Meridian Property Group", site: "Garage B2", inspector: "Tom Weller", date: "Sep 14 · 11:00 AM", score: 99, result: "Pass", type: "Evidence Review", issues: [], photos: [IMG.pressure] },
  { id: "QA-1170", wo: "WO-2366", client: "Harborview Apartments", site: "Clubhouse", inspector: "Tom Weller", date: "Sep 12 · 10:30 AM", score: 91, result: "Pass", type: "Client Escort", issues: [ { area: "Kitchen", note: "Microwave interior missed — corrected same visit", severity: "Low", status: "Corrected" } ], photos: [IMG.lobby] },
];

/* ---------------------------- finance ------------------------------ */
export interface Invoice {
  id: string;
  client: string;
  amount: number;
  issued: string;
  due: string;
  status: "Paid" | "Sent" | "Overdue" | "Draft";
  qbo: boolean;
  aging?: number;
}
export const invoices: Invoice[] = [
  { id: "INV-4482", client: "Meridian Property Group", amount: 38500, issued: "Sep 1", due: "Oct 1", status: "Sent", qbo: true },
  { id: "INV-4481", client: "First Harbor Bank", amount: 22300, issued: "Sep 1", due: "Oct 1", status: "Sent", qbo: true },
  { id: "INV-4478", client: "Brightpath Medical Group", amount: 17400, issued: "Sep 1", due: "Oct 1", status: "Paid", qbo: true },
  { id: "INV-4477", client: "Harborview Apartments", amount: 12900, issued: "Sep 1", due: "Oct 1", status: "Sent", qbo: true },
  { id: "INV-4470", client: "Apex Construction Co.", amount: 9400, issued: "Aug 20", due: "Sep 4", status: "Overdue", qbo: true, aging: 11 },
  { id: "INV-4466", client: "Harborview Apartments", amount: 2450, issued: "Aug 18", due: "Sep 2", status: "Overdue", qbo: true, aging: 13 },
  { id: "INV-4461", client: "Summit Retail Partners", amount: 8600, issued: "Aug 15", due: "Sep 14", status: "Overdue", qbo: true, aging: 1 },
  { id: "INV-4440", client: "First Harbor Bank", amount: 22300, issued: "Aug 1", due: "Sep 1", status: "Paid", qbo: true },
  { id: "INV-4439", client: "Meridian Property Group", amount: 38500, issued: "Aug 1", due: "Sep 1", status: "Paid", qbo: true },
  { id: "INV-4490", client: "Apex Construction Co.", amount: 4850, issued: "Sep 17", due: "Oct 17", status: "Draft", qbo: false },
];
export interface VendorBill {
  id: string;
  vendor: string;
  wo: string;
  amount: number;
  status: "Approved" | "Pending Review" | "Scheduled" | "Paid";
  due: string;
}
export const vendorBills: VendorBill[] = [
  { id: "VB-3301", vendor: "CrystalClean Crew LLC", wo: "WO-2381", amount: 760, status: "Approved", due: "Sep 30" },
  { id: "VB-3298", vendor: "ProShine Floor Care", wo: "WO-2384", amount: 2100, status: "Pending Review", due: "—" },
  { id: "VB-3295", vendor: "Metro Facility Pros", wo: "WO-2407", amount: 1900, status: "Pending Review", due: "—" },
  { id: "VB-3288", vendor: "CrystalClean Crew LLC", wo: "WO-2412", amount: 900, status: "Scheduled", due: "Sep 22" },
  { id: "VB-3282", vendor: "SwiftHaul Removal Co.", wo: "WO-2410", amount: 560, status: "Scheduled", due: "Sep 21" },
  { id: "VB-3270", vendor: "Metro Facility Pros", wo: "WO-2362", amount: 2620, status: "Paid", due: "Sep 12" },
  { id: "VB-3266", vendor: "EliteTurn Services", wo: "WO-2355", amount: 1100, status: "Paid", due: "Sep 10" },
];

/* --------------------------- documents ----------------------------- */
export interface Doc {
  id: string;
  name: string;
  type: "Agreement" | "SOP" | "Policy" | "COI" | "W-9" | "Template" | "Report";
  owner: string;
  version: string;
  updated: string;
  expires?: string;
  access: string;
}
export const documents: Doc[] = [
  { id: "DOC-501", name: "Master Service Agreement — Meridian PG", type: "Agreement", owner: "Sales", version: "v3.2", updated: "Sep 2", expires: "Sep 2027", access: "Internal + Client" },
  { id: "DOC-502", name: "Recurring Service Agreement — First Harbor Bank", type: "Agreement", owner: "Sales", version: "v2.0", updated: "Aug 12", expires: "Aug 2026", access: "Internal + Client" },
  { id: "DOC-510", name: "COI — ProShine Floor Care", type: "COI", owner: "Vendor Mgmt", version: "2026", updated: "Oct 2025", expires: "Oct 2026", access: "Internal" },
  { id: "DOC-511", name: "COI — ClearView Window Works", type: "COI", owner: "Vendor Mgmt", version: "2026", updated: "Sep 2025", expires: "Sep 2026", access: "Internal" },
  { id: "DOC-515", name: "Vendor Agreement — Metro Facility Pros", type: "Agreement", owner: "Vendor Mgmt", version: "v1.4", updated: "Jun 3", access: "Internal + Vendor" },
  { id: "DOC-520", name: "SOP — Medical Terminal Cleaning", type: "SOP", owner: "Operations", version: "v4.1", updated: "Jul 19", access: "Internal + Vendor" },
  { id: "DOC-521", name: "SOP — High-Rise Glass Canopy", type: "SOP", owner: "Operations", version: "v2.3", updated: "May 30", access: "Internal" },
  { id: "DOC-525", name: "Safety Policy — Chemical Handling", type: "Policy", owner: "HR", version: "v1.9", updated: "Apr 2", access: "All Staff" },
  { id: "DOC-530", name: "Proposal Template — Commercial Portfolio", type: "Template", owner: "Sales", version: "v3.0", updated: "Aug 22", access: "Internal" },
  { id: "DOC-533", name: "Q3 Client Performance Report — Meridian", type: "Report", owner: "Operations", version: "Q3-26", updated: "Sep 5", access: "Internal + Client" },
];

/* ------------------------- notifications --------------------------- */
export interface Note {
  id: string;
  icon: "alert" | "check" | "bell" | "doc" | "msg";
  title: string;
  detail: string;
  time: string;
  unread: boolean;
}
export const notifications: Note[] = [
  { id: "N-1", icon: "alert", title: "Corrective action opened", detail: "WO-2407 moisture re-check failed — dispatch updated", time: "12m", unread: true },
  { id: "N-2", icon: "check", title: "WO-2381 verified", detail: "QA passed nightly janitorial at Meridian Tower One", time: "38m", unread: true },
  { id: "N-3", icon: "msg", title: "New lead — Crescent Point Offices", detail: "Google Ads · atl-janitorial-q4 · 48,000 sqft", time: "2h", unread: true },
  { id: "N-4", icon: "doc", title: "COI expiring — ProShine Floor Care", detail: "Certificate expires Oct 2026 · renewal requested", time: "5h", unread: false },
  { id: "N-5", icon: "bell", title: "Invoice overdue", detail: "INV-4470 · Apex Construction · $9,400 · 11 days", time: "1d", unread: false },
];

/* ---------------------------- schedule ----------------------------- */
export const weekDays = ["Mon 15", "Tue 16", "Wed 17", "Thu 18", "Fri 19", "Sat 20"];

/* ----------------------------- KPIs -------------------------------- */
export const revenueSeries = [68, 74, 71, 82, 88, 84, 96, 104, 99, 112, 118, 126];
export const revenueMonths = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
export const woVolumeSeries = [38, 44, 41, 52, 58, 55, 63, 71, 68, 77, 82, 91];
export const qaSeries = [93, 94, 92, 95, 96, 94, 97, 96, 98, 97, 98, 97.4];
export const leadSources = [
  { label: "Google Ads", value: 34, color: "#a6802f" },
  { label: "Organic / SEO", value: 26, color: "#101a2c" },
  { label: "Referral", value: 18, color: "#17745c" },
  { label: "Meta Ads", value: 12, color: "#2d6da3" },
  { label: "Google Business", value: 10, color: "#c9a24b" },
];
export const serviceMix = [
  { label: "Janitorial", value: 46, color: "#101a2c" },
  { label: "Turnovers", value: 18, color: "#a6802f" },
  { label: "Floor Care", value: 12, color: "#17745c" },
  { label: "Specialty", value: 14, color: "#2d6da3" },
  { label: "Maintenance", value: 10, color: "#c9a24b" },
];

/* --------------------------- activity ------------------------------ */
export const activity = [
  { who: "CrystalClean Crew", what: "submitted completion + 9 photos", on: "WO-2381", time: "7:42 AM" },
  { who: "Tom Weller", what: "opened corrective action — moisture fail", on: "WO-2407", time: "7:15 AM" },
  { who: "Sofia Alvarez", what: "sent proposal v2 ($18.5k)", on: "EST-0912", time: "Yesterday" },
  { who: "Grace Kim", what: "synced 4 invoices to QuickBooks", on: "Finance", time: "Yesterday" },
  { who: "EliteTurn Services", what: "accepted assignment", on: "WO-2405", time: "Yesterday" },
  { who: "System", what: "generated 12 recurring work orders", on: "AGR-2011 · AGR-1989", time: "Sun 11:00 PM" },
  { who: "Carla Nguyen (client)", what: "approved quarterly floor program", on: "Meridian Tower One", time: "Sat" },
];

/* -------------------------- integrations --------------------------- */
export interface Integration {
  name: string;
  category: string;
  status: "Connected" | "Configured" | "Ready" | "Future Phase";
  detail: string;
  lastSync?: string;
}
export const integrations: Integration[] = [
  { name: "QuickBooks Online", category: "Accounting", status: "Connected", detail: "Customers, invoices & payment status · system of record: QBO for GL", lastSync: "11 min ago" },
  { name: "Microsoft 365", category: "Identity & Collaboration", status: "Connected", detail: "SSO, Outlook email, calendar, Teams notifications", lastSync: "2 min ago" },
  { name: "Stripe", category: "Payments", status: "Connected", detail: "Tokenized cards & ACH · hosted checkout · no raw PAN storage", lastSync: "Live" },
  { name: "Twilio SMS", category: "Messaging", status: "Configured", detail: "Optional marketing consent · STOP/HELP handled · A2P registered", lastSync: "—" },
  { name: "SendGrid", category: "Email", status: "Connected", detail: "Transactional confirmations, reminders, failure alerts", lastSync: "Live" },
  { name: "Google Maps Platform", category: "Geodata", status: "Connected", detail: "Geocoding, territory & travel-radius matching, navigation", lastSync: "Live" },
  { name: "Dropbox Sign", category: "E-Signature", status: "Configured", detail: "Proposals, agreements, acknowledgment status flow", lastSync: "—" },
  { name: "Power BI", category: "Analytics", status: "Configured", detail: "Executive dataset feed · workspace: T2B-Exec", lastSync: "Hourly" },
  { name: "BookingKoala Migration", category: "Cutover", status: "Ready", detail: "Contacts, locations, schedules, pricing — mapped & reconciled", lastSync: "Dry-run ✓" },
  { name: "AI Receptionist & Agents", category: "Automation", status: "Future Phase", detail: "Voice/chat intake, predictive dispatch — separate approval", lastSync: "—" },
];

/* ---------------------- roles & permissions ------------------------ */
export const permissionMatrix: { role: string; perms: Record<string, string> }[] = [
  { role: "Executive / CEO", perms: { CRM: "Full", WorkOrders: "Full", Vendors: "Full", Finance: "Full", QA: "Full", Reports: "Full", Admin: "View" } },
  { role: "System Administrator", perms: { CRM: "Full", WorkOrders: "Full", Vendors: "Full", Finance: "View", QA: "Full", Reports: "Full", Admin: "Full" } },
  { role: "Sales", perms: { CRM: "Full", WorkOrders: "View", Vendors: "—", Finance: "—", QA: "View", Reports: "Own", Admin: "—" } },
  { role: "Operations Manager", perms: { CRM: "View", WorkOrders: "Full", Vendors: "Assign", Finance: "View", QA: "Full", Reports: "Full", Admin: "—" } },
  { role: "Vendor Manager", perms: { CRM: "—", WorkOrders: "Assign", Vendors: "Full", Finance: "Pay Status", QA: "View", Reports: "Vendors", Admin: "—" } },
  { role: "Inspector (QA)", perms: { CRM: "—", WorkOrders: "Assigned", Vendors: "—", Finance: "—", QA: "Full", Reports: "—", Admin: "—" } },
  { role: "Finance / Accounting", perms: { CRM: "View", WorkOrders: "View", Vendors: "Pay Status", Finance: "Full", QA: "—", Reports: "Finance", Admin: "—" } },
  { role: "Client User", perms: { CRM: "—", WorkOrders: "Own Org", Vendors: "—", Finance: "Own Invoices", QA: "Own Evidence", Reports: "Own", Admin: "—" } },
  { role: "Vendor / Subcontractor", perms: { CRM: "—", WorkOrders: "Assigned", Vendors: "Own Profile", Finance: "Own Pay", QA: "Own Evidence", Reports: "—", Admin: "—" } },
  { role: "Consulting User", perms: { CRM: "Consulting", WorkOrders: "—", Vendors: "—", Finance: "—", QA: "—", Reports: "Consulting", Admin: "—" } },
];

/* ---------------------- status → style maps ------------------------ */
export const tone: Record<string, string> = {
  gold: "bg-[#f4ead2] text-[#8f6a22]",
  ink: "bg-[#e8ebf2] text-[#2a3852]",
  mint: "bg-[#dff0e9] text-[#17745c]",
  sky: "bg-[#e1ecf6] text-[#2d6da3]",
  amber: "bg-[#f8e8d8] text-[#b4640a]",
  rouge: "bg-[#f8e1de] text-[#b3382e]",
  gray: "bg-[#eceee8] text-[#66718a]",
};
export const woTone: Record<WOStatus, string> = {
  Unassigned: "gray", Assigned: "sky", Accepted: "sky", "En Route": "sky",
  "In Progress": "amber", Completed: "ink", "QA Review": "gold",
  "Corrective Action": "rouge", Verified: "mint", Invoiced: "mint",
};
export const leadTone: Record<LeadStage, string> = {
  New: "sky", Qualified: "ink", Assessment: "amber", Proposal: "gold", Negotiation: "rouge", Won: "mint", Lost: "gray",
};
