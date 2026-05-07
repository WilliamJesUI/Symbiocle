export const RECYCLER_DATA = [
  {
    id: "R001",
    company_name: "PlastiCycle Nusantara",
    location: "Bekasi, Jawa Barat",
    waste_category: "plastic",
    accepted_materials: ["PET", "HDPE", "PP"],
    capacity: "3000 tons/month",
    description: "Large-scale PET recycling facility processing millions of bottles monthly into raw material flakes for packaging industries",
    accepts_b3: false
  },
  {
    id: "R002",
    company_name: "GreenFlake Industries",
    location: "Tangerang, Banten",
    waste_category: "plastic",
    accepted_materials: ["PET", "PP", "HDPE", "LDPE"],
    capacity: "2500 tons/month",
    description: "Specialized recycled PET flakes (RPET) producer with over a decade of experience in plastic innovation",
    accepts_b3: false
  },
  {
    id: "R003",
    company_name: "EcoPlastik Mandiri",
    location: "Tangerang, Banten",
    waste_category: "plastic",
    accepted_materials: ["PET", "HDPE"],
    capacity: "1800 tons/month",
    description: "Modern plastic recycling facility focused on PET and HDPE bottle waste recovery",
    accepts_b3: false
  },
  {
    id: "R004",
    company_name: "Pellet Hijau Sentosa",
    location: "Surabaya, Jawa Timur",
    waste_category: "plastic",
    accepted_materials: ["PET", "PP", "HDPE", "LDPE"],
    capacity: "2200 tons/month",
    description: "Producer of recycled plastic pellets and derivative products including geotextile and industrial bags",
    accepts_b3: false
  },
  {
    id: "R005",
    company_name: "Pesisir Daur Ulang Bali",
    location: "Denpasar, Bali",
    waste_category: "plastic",
    accepted_materials: ["PET", "HDPE", "PP", "mixed_plastic"],
    capacity: "800 tons/month",
    description: "Integrated plastic recycler focused on coastal and remote area waste collection across Eastern Indonesia",
    accepts_b3: false
  },
  {
    id: "R006",
    company_name: "LimbahPro Industri",
    location: "Bogor, Jawa Barat",
    waste_category: "hazardous",
    accepted_materials: ["chemical", "solvent", "used_oil", "heavy_metal", "B3_general"],
    capacity: "5000 tons/month",
    description: "Comprehensive B3 and non-B3 industrial waste management from collection to final treatment",
    accepts_b3: true
  },
  {
    id: "R007",
    company_name: "Tata Limbah Persada",
    location: "Cilegon, Banten",
    waste_category: "hazardous",
    accepted_materials: ["chemical", "B3_general", "sludge", "used_oil"],
    capacity: "3500 tons/month",
    description: "Fully licensed B3 and non-B3 waste processing facility with KLHK certification",
    accepts_b3: true
  },
  {
    id: "R008",
    company_name: "Reciklus Indonesia",
    location: "Banyuwangi, Jawa Timur",
    waste_category: "mixed",
    accepted_materials: ["plastic", "paper", "metal", "organic"],
    capacity: "1500 tons/month",
    description: "Material Recovery Facility operator focused on reducing waste sent to landfills nationwide",
    accepts_b3: false
  },
  {
    id: "R009",
    company_name: "SiklusBumi",
    location: "Bekasi, Jawa Barat",
    waste_category: "mixed",
    accepted_materials: ["plastic", "paper", "metal", "organic", "e_waste"],
    capacity: "1200 tons/month",
    description: "Responsible waste management services for corporations and manufacturing facilities",
    accepts_b3: false
  },
  {
    id: "R010",
    company_name: "Biomassa Energi Cilacap",
    location: "Cilacap, Jawa Tengah",
    waste_category: "organic",
    accepted_materials: ["palm_shell", "rice_husk", "wood_chip", "biomass"],
    capacity: "4000 tons/month",
    description: "Biomass power plant accepting agricultural and palm oil byproducts as alternative fuel",
    accepts_b3: false
  },
  {
    id: "R011",
    company_name: "Pupuk Lestari Nusantara",
    location: "Malang, Jawa Timur",
    waste_category: "organic",
    accepted_materials: ["food_waste", "fruit_peel", "vegetable_waste", "agricultural"],
    capacity: "1000 tons/month",
    description: "Organic compost and fertilizer manufacturer using agroindustrial waste streams",
    accepts_b3: false
  },
  {
    id: "R012",
    company_name: "Sinar Logam Daur",
    location: "Surabaya, Jawa Timur",
    waste_category: "metal",
    accepted_materials: ["steel", "aluminum", "copper", "scrap_metal"],
    capacity: "2800 tons/month",
    description: "Metal scrap processor producing raw material for steel and aluminum manufacturers",
    accepts_b3: false
  },
  {
    id: "R013",
    company_name: "Karya Logam Mandiri",
    location: "Bandung, Jawa Barat",
    waste_category: "metal",
    accepted_materials: ["steel", "aluminum", "iron", "scrap_metal"],
    capacity: "1600 tons/month",
    description: "Regional metal recycling for West Java industrial estates",
    accepts_b3: false
  },
  {
    id: "R014",
    company_name: "Kertas Hijau Indonesia",
    location: "Mojokerto, Jawa Timur",
    waste_category: "paper",
    accepted_materials: ["cardboard", "office_paper", "newsprint", "mixed_paper"],
    capacity: "2000 tons/month",
    description: "Paper recycling mill producing recycled pulp for the packaging industry",
    accepts_b3: false
  },
  {
    id: "R015",
    company_name: "PulpCycle Sidoarjo",
    location: "Sidoarjo, Jawa Timur",
    waste_category: "paper",
    accepted_materials: ["cardboard", "kraft", "mixed_paper"],
    capacity: "3500 tons/month",
    description: "Large-scale paper recycling integrated with pulp manufacturing operations",
    accepts_b3: false
  },
  {
    id: "R016",
    company_name: "Semen Hijau Gresik",
    location: "Gresik, Jawa Timur",
    waste_category: "industrial_byproduct",
    accepted_materials: ["fly_ash", "bottom_ash", "slag", "gypsum"],
    capacity: "6000 tons/month",
    description: "Cement manufacturer accepting industrial byproducts as raw material substitute",
    accepts_b3: false
  },
  {
    id: "R017",
    company_name: "EcoCement Narogong",
    location: "Narogong, Jawa Barat",
    waste_category: "industrial_byproduct",
    accepted_materials: ["fly_ash", "used_tire", "solvent", "sludge"],
    capacity: "4500 tons/month",
    description: "Co-processing facility using industrial waste as alternative fuel and raw material",
    accepts_b3: true
  },
  {
    id: "R018",
    company_name: "Tekstil Daur Ulang Bandung",
    location: "Bandung, Jawa Barat",
    waste_category: "textile",
    accepted_materials: ["cotton_scrap", "polyester_scrap", "fabric_waste"],
    capacity: "600 tons/month",
    description: "Textile waste recycler producing recycled yarn and non-woven materials",
    accepts_b3: false
  },
  {
    id: "R019",
    company_name: "Serat Hijau Indonesia",
    location: "Bandung, Jawa Barat",
    waste_category: "textile",
    accepted_materials: ["cotton_scrap", "fabric_waste", "denim"],
    capacity: "450 tons/month",
    description: "Specialized in denim and cotton textile waste regeneration into new fibers",
    accepts_b3: false
  },
  {
    id: "R020",
    company_name: "Kaca Daur Nusantara",
    location: "Jakarta, DKI Jakarta",
    waste_category: "glass",
    accepted_materials: ["clear_glass", "colored_glass", "bottle_glass"],
    capacity: "1100 tons/month",
    description: "Glass cullet processor for bottle and container manufacturers",
    accepts_b3: false
  },
  {
    id: "R021",
    company_name: "E-Limbah Recovery",
    location: "Tangerang, Banten",
    waste_category: "electronic",
    accepted_materials: ["circuit_board", "battery", "electronic_component"],
    capacity: "300 tons/month",
    description: "Certified e-waste processor recovering precious metals from electronic devices",
    accepts_b3: true
  },
  {
    id: "R022",
    company_name: "Elektronik Hijau Indo",
    location: "Jakarta, DKI Jakarta",
    waste_category: "electronic",
    accepted_materials: ["e_waste", "circuit_board", "cable"],
    capacity: "250 tons/month",
    description: "Electronic waste management specialist with material recovery focus",
    accepts_b3: true
  },
  {
    id: "R023",
    company_name: "Karet Daur Palembang",
    location: "Palembang, Sumatera Selatan",
    waste_category: "rubber",
    accepted_materials: ["tire", "rubber_scrap", "latex_waste"],
    capacity: "900 tons/month",
    description: "Rubber and tire recycling for road construction and rubber goods manufacturing",
    accepts_b3: false
  },
  {
    id: "R024",
    company_name: "KopiCycle Bandung",
    location: "Bandung, Jawa Barat",
    waste_category: "organic",
    accepted_materials: ["coffee_grounds", "tea_waste", "food_waste"],
    capacity: "200 tons/month",
    description: "Specialty processor turning coffee grounds into fertilizer and bio-products",
    accepts_b3: false
  },
  {
    id: "R025",
    company_name: "Sawit Berkah Riau",
    location: "Pekanbaru, Riau",
    waste_category: "organic",
    accepted_materials: ["palm_shell", "palm_fiber", "POME", "empty_fruit_bunch"],
    capacity: "5500 tons/month",
    description: "Palm oil waste specialist producing biomass fuel and organic fertilizer",
    accepts_b3: false
  },
  {
    id: "R026",
    company_name: "Plastik Lestari Yogya",
    location: "Yogyakarta, DI Yogyakarta",
    waste_category: "plastic",
    accepted_materials: ["PET", "HDPE", "PP", "plastic_film"],
    capacity: "700 tons/month",
    description: "Community-based plastic recycling cooperative serving Central Java",
    accepts_b3: false
  },
  {
    id: "R027",
    company_name: "Logam Cycle Surabaya",
    location: "Surabaya, Jawa Timur",
    waste_category: "metal",
    accepted_materials: ["copper", "brass", "aluminum", "steel"],
    capacity: "2100 tons/month",
    description: "Non-ferrous metal recycler for electrical and manufacturing industries",
    accepts_b3: false
  },
  {
    id: "R028",
    company_name: "MediCare Limbah Indo",
    location: "Jakarta, DKI Jakarta",
    waste_category: "hazardous",
    accepted_materials: ["medical_waste", "pharmaceutical_waste", "B3_general"],
    capacity: "800 tons/month",
    description: "Medical and pharmaceutical hazardous waste specialist with full compliance",
    accepts_b3: true
  },
  {
    id: "R029",
    company_name: "Bandung Kompos Center",
    location: "Bandung, Jawa Barat",
    waste_category: "organic",
    accepted_materials: ["food_waste", "green_waste", "agricultural"],
    capacity: "350 tons/month",
    description: "Urban composting facility serving West Java food and beverage industries",
    accepts_b3: false
  },
  {
    id: "R030",
    company_name: "Limbah Borneo Lestari",
    location: "Balikpapan, Kalimantan Timur",
    waste_category: "hazardous",
    accepted_materials: ["used_oil", "sludge", "chemical", "B3_general"],
    capacity: "2700 tons/month",
    description: "Eastern Indonesia industrial hazardous waste processing facility",
    accepts_b3: true
  }
];