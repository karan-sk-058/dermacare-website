/* ============================================================
   DermaCare — SITE SETTINGS FILE
   ============================================================
   
   HOW TO USE THIS FILE:
   - This file controls your website content WITHOUT any coding.
   - Just find the setting you want to change, edit the text,
     save the file, and re-upload to Netlify.
   - Use true to turn something ON, false to turn it OFF.
   - Keep all text inside the quote marks " "
   
   ============================================================ */

const SITE_CONFIG = {

  // ──────────────────────────────────────────
  //  📢 ANNOUNCEMENT BANNER
  //  The colored bar at the very top of every page
  // ──────────────────────────────────────────
  announcement: {
    show: true,                      // true = show banner | false = hide it
    text: "🎉 SALE ON NOW — Flat 10% OFF on all orders above ₹500! Use code: DERMA10",
    backgroundColor: "#D81B76",      // Pink = "#D81B76" | Green = "#1A5C22" | Dark = "#18181B"
    textColor: "#FFFFFF"
  },

  // ──────────────────────────────────────────
  //  📞 CONTACT INFO
  //  Updates across all pages automatically
  // ──────────────────────────────────────────
  contact: {
    whatsappNumber: "919867254230",   // Your WhatsApp number (with country code, no + sign)
    displayPhone: "+91-98672-54230",  // How phone appears on the website
    email: "orders@dermacare.in",
    address: "Indchemie Health Specialities Pvt. Ltd., Mumbai, Maharashtra",
    supportHours: "Mon–Sat, 9AM–6PM IST"
  },

  // ──────────────────────────────────────────
  //  🚚 DELIVERY SETTINGS
  // ──────────────────────────────────────────
  delivery: {
    freeDeliveryAbove: 500,           // Orders above this amount get free delivery
    deliveryCharge: 80,               // Charge in ₹ for orders below the threshold
    topBarMessage: "🚚 Free delivery on orders above ₹500 | Pan-India shipping"
  },

  // ──────────────────────────────────────────
  //  💥 SALE / DISCOUNT
  //  Turn on a sitewide sale with % off
  // ──────────────────────────────────────────
  sale: {
    active: false,                    // true = sale is ON | false = sale is OFF
    discountPercent: 10,              // How much % off (e.g. 10 = 10% off)
    saleLabel: "SALE",               // Text shown on product badge during sale
    saleBannerText: "🔥 Limited Time: {percent}% OFF Sitewide! Hurry, ends soon."
                                      // {percent} will be replaced automatically
  },

  // ──────────────────────────────────────────
  //  🏷️ FEATURED PRODUCTS
  //  Control which products show in the HOME PAGE carousel
  //  Use exact product names from the list below
  // ──────────────────────────────────────────
  featuredProducts: [
    "DISPEL GOLD SERUM (20ML)",
    "CELIDAC CERA LOTION",
    "DISPEL SPF SUNSCREEN",
    "DISPEL GOLD",
    "CELIDAC MAX",
    "TUFTINA 200 MG"
  ],
  // Full product list for reference:
  // TUFTINA 100 MG, TUFTINA 200 MG, TUFTINA KT, TUFTINA CT, TUFTINA SB-65 CAP
  // CELIDAC CREAM, CELIDAC LOTION, CELIDAC MAX, CELIDAC FACE WASH, CELIDAC-LP LOTION, CELIDAC CERA LOTION
  // LUDEMOLD CREAM, LUDEMOLD LOTION
  // DISPEL CREAM, DISPEL GOLD, DISPEL SPF SUNSCREEN, DISPEL GOLD SERUM (20ML)
  // REZISORT 10MG, REZISORT 20MG
  // FINIDE 120MG, FINIDE 180MG
  // MOSOVIRA CREAM, MOSOVIRA - F CREAM, MOSOVIRA - S OINTMENT 15GM
  // MBROCK OINTMENT, CLIVAZIT GEL, CLIVAZIT LOTION
  // SUVATAM TAB, CHEMIBIL 20 TAB 10 T, CHEMIBIL 40 TAB 10 T

  // ──────────────────────────────────────────
  //  🎟️ COUPON CODES
  //  Add or remove coupon codes here — no coding needed!
  //  type: 'percent' = percentage off | 'flat' = flat ₹ off
  // ──────────────────────────────────────────
  coupons: [
    { code: "DERMA10", type: "percent", value: 10, description: "10% off on all orders" },
    { code: "WELCOME50", type: "flat", value: 50, description: "₹50 off on first order" },
    { code: "INDCHEMIE20", type: "percent", value: 20, description: "20% off — Staff coupon" }
  ],

  // ──────────────────────────────────────────
  //  🌐 BRAND INFO
  // ──────────────────────────────────────────
  brand: {
    name: "DermaCare",
    tagline: "Clinical Skincare. Botanical Elegance.",
    footerText: "DermaCare is a division of Indchemie Health Specialities Pvt. Ltd. Pioneering clinical skincare solutions backed by pharmaceutical research."
  },

  // ──────────────────────────────────────────
  //  👔 JOB OPENINGS (Careers Page)
  //  Add or remove job listings here — no coding needed!
  //
  //  To ADD a job:   Copy one { ... } block and fill it in
  //  To REMOVE a job: Delete the { ... } block
  //  To PAUSE a job: Add   active: false   to that block
  //
  //  Fields:
  //    title         — Job title (required)
  //    department    — e.g. "Sales", "Marketing", "Operations"
  //    type          — "Full-Time", "Part-Time", "Contract", "Internship"
  //    location      — e.g. "Mumbai, MH" or "Remote"
  //    overview      — 1-2 sentence description of the role
  //    responsibilities — bullet points (list of strings)
  //    qualifications   — bullet points (list of strings)
  // ──────────────────────────────────────────
  jobs: [
    {
      title: "Medical Sales Representative",
      department: "Sales",
      type: "Full-Time",
      location: "Mumbai, MH",
      overview: "Drive growth of DermaCare products across clinics, hospitals and pharmacies in your assigned territory. Build strong relationships with dermatologists and healthcare providers.",
      responsibilities: [
        "Promote and sell DermaCare products to dermatologists, skin clinics, and pharmacies",
        "Achieve monthly and quarterly sales targets for your territory",
        "Build and maintain strong relationships with doctors and chemists",
        "Provide product demonstrations and clinical information to HCPs",
        "Submit daily call reports and market feedback",
        "Participate in CMEs, conferences, and product launch events"
      ],
      qualifications: [
        "B.Sc. / B.Pharma or any Life Sciences graduate",
        "1–3 years of pharma/derma field sales experience preferred",
        "Excellent communication and interpersonal skills",
        "Two-wheeler with valid driving licence (mandatory)",
        "Willingness to travel within assigned territory",
        "Proficiency in local language + basic English"
      ]
    },
    {
      title: "Digital Marketing Executive",
      department: "Marketing",
      type: "Full-Time",
      location: "Mumbai, MH / Remote",
      overview: "Own DermaCare's digital presence across social media, e-commerce, and performance marketing to drive brand awareness and online sales.",
      responsibilities: [
        "Manage and grow DermaCare's Instagram, Facebook, and WhatsApp channels",
        "Plan and execute performance marketing campaigns (Meta Ads, Google Ads)",
        "Create compelling product content — reels, posts, stories, emailers",
        "Coordinate with design team for creatives and product photography",
        "Track analytics and report on campaign ROI",
        "Manage the DermaCare website content and product updates"
      ],
      qualifications: [
        "Bachelor's degree in Marketing, Mass Media, or related field",
        "1–2 years of digital marketing experience",
        "Hands-on experience with Meta Business Suite and Google Ads",
        "Basic Canva / Adobe skills for content creation",
        "Strong written communication skills in English and Hindi",
        "Knowledge of skincare/pharma industry is a plus"
      ]
    },
    {
      title: "Warehouse & Dispatch Executive",
      department: "Operations",
      type: "Full-Time",
      location: "Navi Mumbai, MH",
      overview: "Manage day-to-day warehouse operations including stock management, order picking, packing, and coordination with logistics partners for timely dispatch.",
      responsibilities: [
        "Receive, verify, and store incoming product inventory",
        "Pick, pack, and dispatch orders accurately and on time",
        "Maintain stock registers and conduct regular stock audits",
        "Coordinate with courier/logistics partners for shipment tracking",
        "Ensure warehouse is clean, organized, and compliant with standards",
        "Report low stock and expiry alerts to the purchasing team"
      ],
      qualifications: [
        "12th Pass / Graduate in any stream",
        "1+ year experience in warehouse, logistics, or pharma distribution",
        "Basic computer skills for inventory software entry",
        "Physically fit and able to handle packaging material",
        "Attention to detail and good organizational skills",
        "Willingness to work in shifts if required"
      ]
    }
  ]

};
