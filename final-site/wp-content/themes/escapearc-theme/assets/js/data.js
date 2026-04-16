/* EscapeArc data */
const WHATSAPP = "919422881098";
const EMAIL = "escapearcofficial@gmail.com";

const tours = [
  {id:"spiti-malangman",name:"Spiti Valley — Malang Man Collab",type:"national",duration:"9N/10D",price:27999,totalSeats:50,bookedSeats:0,difficulty:"Challenging",route:"Chandigarh → Narkanda → Chitkul → Nako → Tabo → Kaza → Chandrataal → Manali → Chandigarh",category:"Bike"},
  {id:"leh-car-7",name:"Leh–Ladakh Car Tour",type:"national",duration:"6N/7D",price:49999,totalSeats:12,bookedSeats:4,difficulty:"Moderate",route:"Leh / Nubra / Pangong / Monasteries / Khardung La",category:"Car"},
  {id:"leh-car-5",name:"Leh–Ladakh Car Tour",type:"national",duration:"4N/5D",price:44999,totalSeats:12,bookedSeats:3,difficulty:"Moderate",route:"Leh / Sham Valley / Pangong / Khardung La",category:"Car"},
  {id:"leh-bike-1",name:"Leh–Ladakh Bike Expedition",type:"national",duration:"12D",price:45000,totalSeats:20,bookedSeats:9,difficulty:"Challenging",route:"Manali → Leh → Srinagar",category:"Bike"},
  {id:"leh-bike-2",name:"Leh–Ladakh Bike Expedition",type:"national",duration:"14D",price:48000,totalSeats:20,bookedSeats:7,difficulty:"Challenging",route:"Delhi → Manali → Leh → Umling La → Srinagar",category:"Bike"},
  {id:"leh-bike-3",name:"Leh–Ladakh Bike Expedition",type:"national",duration:"16D",price:52000,totalSeats:20,bookedSeats:6,difficulty:"Expert",route:"Srinagar → Leh → Umling La → Manali → Delhi",category:"Bike"},
  {id:"kerala-fam-9",name:"Kerala Family Tour",type:"national",duration:"9N/10D",price:34999,totalSeats:18,bookedSeats:6,difficulty:"Easy",route:"Akola → Trivandrum → Kovalam → Kanyakumari → Alleppey → Thekkady → Munnar → Cochin",category:"Family"},
  {id:"kerala-fam-6",name:"Kerala Family Tour",type:"national",duration:"6N/7D",price:26999,totalSeats:20,bookedSeats:10,difficulty:"Easy",route:"Cochin / Munnar / Alleppey / Thekkady / Kovalam",category:"Family"},
  {id:"kerala-fam-5",name:"Kerala Family Tour",type:"national",duration:"5N/6D",price:23999,totalSeats:20,bookedSeats:9,difficulty:"Easy",route:"Cochin / Munnar / Alleppey",category:"Family"},
  {id:"kerala-hon-6",name:"Kerala Honeymoon Tour",type:"national",duration:"6D",price:27999,totalSeats:12,bookedSeats:5,difficulty:"Easy",route:"Munnar / Alleppey / Kovalam / Trivandrum",category:"Honeymoon"},
  {id:"kerala-hon-12",name:"Kerala Honeymoon Tour (Grand)",type:"national",duration:"12D",price:49999,totalSeats:10,bookedSeats:2,difficulty:"Easy",route:"Cochin / Munnar / Alleppey / Thekkady / Madurai",category:"Honeymoon"},
  {id:"shimla-manali",name:"Shimla–Manali Himachal",type:"national",duration:"5N/6D",price:21999,totalSeats:18,bookedSeats:8,difficulty:"Easy",route:"Delhi → Shimla → Kufri → Manali → Solang → Delhi",category:"Hill"},
  {id:"himachal-7",name:"Himachal Grand Tour",type:"national",duration:"7D",price:20999,totalSeats:18,bookedSeats:7,difficulty:"Easy",route:"Manali / Rohtang Pass / Kullu / Manikaran / Delhi / Agra",category:"Hill"},
  {id:"himachal-4",name:"Himachal Premium Tour",type:"national",duration:"4N/5D",price:19999,totalSeats:18,bookedSeats:8,difficulty:"Easy",route:"Shimla / Manali / Rohtang Pass / Naggar / Solang Valley",category:"Hill"},
  {id:"dharamshala",name:"Dharamshala–Dalhousie Tour",type:"national",duration:"5N/6D",price:21999,totalSeats:18,bookedSeats:7,difficulty:"Easy",route:"Delhi → Dharamshala → Dalhousie → Khajjiar → Chamba → Delhi",category:"Hill"},
  {id:"nainital",name:"Nainital–Mussoorie–Corbett",type:"national",duration:"7N/8D",price:24999,totalSeats:18,bookedSeats:5,difficulty:"Easy",route:"Mussoorie → Nainital → Jim Corbett → Delhi",category:"Hill"},
  {id:"sikkim-9",name:"Sikkim–Darjeeling Grand",type:"national",duration:"9D",price:28999,totalSeats:16,bookedSeats:4,difficulty:"Moderate",route:"Gangtok / Tsomgo / Lachung / Yumthang / Pelling / Darjeeling",category:"Hill"},
  {id:"sikkim-6",name:"Sikkim–Darjeeling Short",type:"national",duration:"6D",price:22999,totalSeats:16,bookedSeats:5,difficulty:"Easy",route:"Gangtok / Tsomgo Lake / Baba Mandir / Pelling",category:"Hill"},
  {id:"andaman-fam",name:"Andaman Family Tour",type:"national",duration:"6N/7D",price:55999,totalSeats:18,bookedSeats:5,difficulty:"Easy",route:"Port Blair / Havelock / Elephant Beach / Ross & Smith",category:"Island"},
  {id:"andaman-hon",name:"Andaman Honeymoon Tour",type:"national",duration:"5N/6D",price:52999,totalSeats:12,bookedSeats:4,difficulty:"Easy",route:"Havelock / Neil Island / Port Blair",category:"Honeymoon"},
  {id:"andaman-5",name:"Andaman Island Tour",type:"national",duration:"5N/6D",price:49999,totalSeats:18,bookedSeats:6,difficulty:"Easy",route:"Port Blair (3N) + Havelock (2N)",category:"Island"},
  {id:"rajasthan",name:"Rajasthan Royal Tour",type:"national",duration:"8N/9D",price:34999,totalSeats:20,bookedSeats:7,difficulty:"Easy",route:"Mumbai → Jaipur → Ajmer → Pushkar → Jaisalmer → Jodhpur → Udaipur → Mount Abu → Mumbai",category:"Culture"},
  {id:"goa",name:"Goa Beach Tour",type:"national",duration:"3N/4D",price:14999,totalSeats:25,bookedSeats:12,difficulty:"Easy",route:"North Goa + South Goa sightseeing",category:"Leisure"},
  {id:"coorg",name:"Coorg (Kodagu) Tour",type:"national",duration:"2N/3D",price:12999,totalSeats:20,bookedSeats:8,difficulty:"Easy",route:"Bangalore → Coorg → Madikeri → Bangalore",category:"Leisure"},
  {id:"tarkarli",name:"Tarkarli Beach Tour",type:"national",duration:"5N/6D",price:18999,totalSeats:16,bookedSeats:5,difficulty:"Easy",route:"Akola → Pune → Tarkarli → Pune → Akola",category:"Beach"},
  {id:"dwarka",name:"Dwarka–Somnath Pilgrimage",type:"national",duration:"6N/7D",price:25999,totalSeats:20,bookedSeats:8,difficulty:"Easy",route:"Akola → Ahmedabad → Jamnagar → Dwarka → Somnath → Rajkot → Ahmedabad → Akola",category:"Pilgrimage"},
  {id:"jaipur-udaipur-student",name:"Jaipur–Udaipur Industrial Visit",type:"national",duration:"7N/8D",price:27999,totalSeats:30,bookedSeats:12,difficulty:"Easy",route:"Badnera → Mount Abu → Udaipur → Jaipur → Delhi → Amravati",category:"Student"},
  {id:"hyderabad-student",name:"Hyderabad Student Tour",type:"national",duration:"4N/5D",price:15999,totalSeats:40,bookedSeats:18,difficulty:"Easy",route:"Badnera → Hyderabad → Ramoji Film City → Return",category:"Student"},
  {id:"blr-ooty",name:"Bangalore–Mysore–Ooty–Kodaikanal",type:"national",duration:"7D",price:24999,totalSeats:18,bookedSeats:6,difficulty:"Easy",route:"Bangalore → Mysore → Ooty → Kodaikanal → Return",category:"Hill"},
  {id:"singapore-6",name:"Singapore City Tour",type:"international",duration:"5N/6D",price:79999,totalSeats:15,bookedSeats:5,difficulty:"Easy",route:"Akola → Mumbai → Singapore → Return",category:"City"},
  {id:"thailand",name:"Thailand Beach & City Tour",type:"international",duration:"7D",price:84999,totalSeats:15,bookedSeats:6,difficulty:"Easy",route:"Phuket → Krabi → Bangkok",category:"Beach"},
  {id:"bali",name:"Bali Island Experience",type:"international",duration:"6N/7D",price:89999,totalSeats:15,bookedSeats:5,difficulty:"Easy",route:"Kuta / Bali sightseeing package",category:"Island"},
  {id:"europe",name:"Europe Grand Tour",type:"international",duration:"15N/16D",price:219000,totalSeats:12,bookedSeats:3,difficulty:"Easy",route:"England → France → Belgium → Netherlands → Germany → Switzerland → Austria → Italy → Vatican",category:"Premium"},
  {id:"switzerland",name:"Switzerland Alpine Tour",type:"international",duration:"6N/7D",price:129999,totalSeats:12,bookedSeats:4,difficulty:"Easy",route:"Zurich → Interlaken → Lucerne → Zurich",category:"Premium"},
  {id:"usa-east",name:"USA East Coast Tour",type:"international",duration:"12D",price:139999,totalSeats:10,bookedSeats:2,difficulty:"Easy",route:"New York → Philadelphia → Washington DC → Niagara Falls → Boston",category:"Premium"}
];

const perfumeData = [
  {name:"First Mile",mood:"Fresh · Clean · Optimistic",notes:["Bergamot","Petitgrain","Clean Musk","Iso E Super"],desc:"The energy of beginnings. The morning before the trip — crisp air, clean skin, possibility. 8–10 hour longevity."},
  {name:"Detour",mood:"Green · Raw · Adventurous",notes:["Galbanum","Vetiver","Petrichor","Patchouli"],desc:"What happens when you go off-script. Soil after rain, crushed leaves, raw vetiver, mountain wind. 8–10 hours."},
  {name:"After Journey",mood:"Warm · Woody · Reflective",notes:["Oud Accord","Sandalwood","Rose","Amber"],desc:"The scent of arrival. Warm wood, amber spice — the satisfaction of having gone somewhere real. 10–12 hours."},
  {name:"Last Stop",mood:"Deep · Grounded · Enduring",notes:["Frankincense","Oud","Leather","Dark Amber"],desc:"The point of no return. Frankincense, aged oud, dark amber. The scent of someone who has arrived. 12–16 hours."}
];

const hotelData = [
  {name:"Blue Mountain Hotel & Cafe",addr:"NH505, Kaza, Kaza Khas, HP 172114",phone:"7814805588",type:"Hotel",rating:4.7,reviews:351,loc:"Kaza",url:"bluemountainhotel.co.in"},
  {name:"Hotel Deyzor & Restaurant",addr:"Behind BSNL Office, Kaza, HP 172114",phone:"9530570649",type:"Hotel",rating:4.7,reviews:836,loc:"Kaza",url:"hoteldeyzor.com"},
  {name:"Green Tara Homestay",addr:"NH505, Tabo, HP 172113",phone:"7018136673",type:"Home Stay",rating:4.9,reviews:225,loc:"Tabo",url:""},
  {name:"Amar Home Stay (Mud House)",addr:"Near UCO Bank, Nako, HP 172112",phone:"7876467085",type:"Home Stay",rating:4.9,reviews:126,loc:"Nako",url:""},
  {name:"Hotel Kamru Sangla",addr:"Kamru Road, Sangla, HP 172106",phone:"7018393603",type:"Hotel",rating:4.9,reviews:192,loc:"Sangla",url:"hotelkamru.com"},
  {name:"Heavens Camp",addr:"Near ITBP Check-post, Chitkul, HP 172106",phone:"9317097618",type:"Campground",rating:4.9,reviews:187,loc:"Chitkul",url:""},
  {name:"Baspa Valley Adventure Camp",addr:"Rakchham, Kharogla, HP 172106",phone:"7807562439",type:"Campground",rating:5.0,reviews:258,loc:"Rakchham",url:"baspavalley.com"},
  {name:"Eskape Camps Rakcham",addr:"Opposite Rakcham Distt Kinnaur, HP 172106",phone:"8448048862",type:"Resort hotel",rating:4.5,reviews:344,loc:"Rakchham",url:"eskapecamps.com"},
  {name:"Apple Orchard Farm & Camping",addr:"Sangla-Chitkul Rd, Batseri, HP 172106",phone:"9805609739",type:"Camping farm",rating:4.6,reviews:143,loc:"Sangla",url:"applecamping.com"},
  {name:"Hotel Batseri",addr:"Sangla-Chitkul Rd, Batseri, HP 172106",phone:"8091280668",type:"Hotel",rating:4.4,reviews:132,loc:"Sangla",url:"hotelbatseri.com"},
  {name:"CAFE EILISH AND RETREAT",addr:"In Front of View Point, Sangla, HP 172106",phone:"9888885077",type:"Hotel",rating:4.7,reviews:143,loc:"Sangla",url:"eilish.co.in"},
  {name:"Exotic Hotel Kalpa",addr:"Kalpa, HP 172108",phone:"9882760000",type:"Hotel",rating:4.6,reviews:828,loc:"Kalpa",url:""},
  {name:"Fayul Retreat",addr:"G6RX+M56, Kalpa, HP 172108",phone:"7807411180",type:"Camping farm",rating:4.8,reviews:95,loc:"Kalpa",url:""},
  {name:"Himalayan Vulture",addr:"Roghi Road, Kalpa, HP 172108",phone:"9999465612",type:"Hotel",rating:4.8,reviews:75,loc:"Kalpa",url:"himalayanvulture.com"},
  {name:"Fort View Home Stay",addr:"Near Kalpa Monastery, HP 172108",phone:"9736428448",type:"Home Stay",rating:4.5,reviews:124,loc:"Kalpa",url:"fortviewhomestay.com"},
  {name:"Banjara Retreat Sangla",addr:"Sangla Road, Kinnaur, HP 172106",phone:"9816881936",type:"Resort hotel",rating:4.5,reviews:199,loc:"Sangla",url:"banjaracamps.com"},
  {name:"Cold Desert Camps Chandratal",addr:"Near Police Checkpost, Chandratal, HP 172114",phone:"",type:"Campground",rating:4.0,reviews:15,loc:"Chandratal",url:"travellingbee.in"},
  {name:"Delek Camp Chandratal",addr:"CJX6+PGW, HP 175140",phone:"",type:"Campground",rating:5.0,reviews:2,loc:"Chandratal",url:"delekcampchandratal.com"},
  {name:"Echor Mud Huts Tabo",addr:"Gompa Main Road, Near Tabo Helipad, HP 172113",phone:"9501221122",type:"Resort hotel",rating:4.5,reviews:33,loc:"Tabo",url:"echor.in"},
  {name:"Hotel Gangchen Tabo",addr:"NH505, Tabo, HP 172113",phone:"",type:"Hotel",rating:4.9,reviews:9,loc:"Tabo",url:""},
  {name:"Himalayan Paradise — Nako",addr:"V.P.O, Nako, HP 172111",phone:"8988962522",type:"Hotel",rating:4.6,reviews:51,loc:"Nako",url:"himalayanparadisenako.com"},
  {name:"Chitkul Cold Queen Camp",addr:"Near Zostal, Chitkul, HP 172109",phone:"7651068558",type:"Campground",rating:4.9,reviews:25,loc:"Chitkul",url:""},
  {name:"Baspa River Camp Chitkul",addr:"Baspa River Camp, Sangla-Chitkul Rd, HP 172109",phone:"9418701460",type:"Camp",rating:4.4,reviews:343,loc:"Chitkul",url:""},
  {name:"Grease Moto Club Kaza",addr:"Kaza Khas, HP 172114",phone:"8580603108",type:"Hotel",rating:4.7,reviews:38,loc:"Kaza",url:"greasemotoclub.com"},
  {name:"Himalayan Drifters Camp Kaza",addr:"638G+P9G, Kaza Khas, HP 172114",phone:"",type:"Hotel",rating:5.0,reviews:4,loc:"Kaza",url:""},
  {name:"Buddha Homestay Kaza",addr:"63G9+FMV, Kaza Khas, HP 172114",phone:"",type:"Home Stay",rating:4.9,reviews:10,loc:"Kaza",url:""},
  {name:"Grand Shamba-La Kalpa",addr:"Roghi Road, Kalpa, HP 172108",phone:"",type:"Hotel",rating:3.9,reviews:186,loc:"Kalpa",url:"grandshambala.com"},
  {name:"Aucktong Hotel Kalpa",addr:"Kalpa-Pangi Rd, Saryo, Kalpa, HP 172108",phone:"9816179457",type:"Hotel",rating:4.6,reviews:400,loc:"Kalpa",url:""},
  {name:"Hotel Kalpa",addr:"Kalpa-Pangi Rd, Kalpa, HP 172108",phone:"9811559496",type:"Hotel",rating:4.4,reviews:124,loc:"Kalpa",url:"hotelkalpa.in"},
  {name:"Himalayan Paradise Hotel Nako",addr:"VPO, Nako, HP 172111",phone:"8988962522",type:"Hotel",rating:4.6,reviews:51,loc:"Nako",url:"himalayanparadisenako.com"}
];

let shownHotels = 12;

const policies = [
  {q:"Booking & Payment",a:`<ul>
    <li>40% advance required to confirm your seat on any EscapeArc tour</li>
    <li>Balance 60% due 10–15 days before departure</li>
    <li>Seat is confirmed only after advance reaches our bank account</li>
    <li>Spiti Valley payments are <strong>Cash Only</strong></li>
    <li>All bank charges for international transfers are paid by client</li>
    <li>Payment via company bank account (shared by email) or PayPal</li>
    <li>Balance not received by due date = booking auto-cancelled, advance forfeited</li>
  </ul>`},
  {q:"Cancellation Policy",a:`<ul>
    <li><strong>Fixed departures:</strong> Booking amount is non-refundable in all cases</li>
    <li><strong>Private/customised tours:</strong> Confirmation amount is non-refundable</li>
    <li>GST is <strong>never refunded</strong> under any circumstance</li>
    <li>No-show to starting point = 100% forfeiture, no refund</li>
    <li>Tour cancelled by EscapeArc (insufficient participants) = full refund</li>
    <li>Refund processed in <strong>30 working days</strong> after eligibility confirmed</li>
    <li>30+ days prior: 25% of advance deducted</li>
    <li>30–15 days prior: 40% of advance deducted</li>
    <li>14–7 days prior: 80% of advance deducted</li>
    <li>6–3 days prior: 90% of advance deducted</li>
    <li>2–0 days prior: 100% forfeited</li>
  </ul>`},
  {q:"Inclusions & Exclusions",a:`<strong>Included:</strong><ul>
    <li>Accommodation on MAP basis (Breakfast + Dinner)</li>
    <li>Triple/Double sharing accommodation</li>
    <li>Backup support vehicle</li>
    <li>Backup mechanic throughout the tour</li>
  </ul><br/><strong>Excluded:</strong><ul>
    <li>Fuel for your bike</li>
    <li>Entry tickets, permits, camera charges, state fees</li>
    <li>Room heaters</li>
    <li>Taxes on package</li>
    <li>Personal expenses, drinks (alcohol, aerated, water)</li>
    <li>Meals not in itinerary</li>
    <li>Riding gear rental</li>
    <li>Bike accessories (ropes, bungee cords, jerry cans)</li>
  </ul>`},
  {q:"Child Policy",a:`<ul>
    <li>Children under 5 years: <strong>Complimentary</strong></li>
    <li>Children 5–8 years: <strong>30% of package cost</strong></li>
    <li>Children 8–12 years: <strong>Extra bed basis</strong></li>
    <li>Children 12+ years: <strong>Treated as adult</strong></li>
  </ul>`},
  {q:"Luggage & Group Rules",a:`<ul>
    <li>Minimum 25 riders required per group — tour may cancel below threshold</li>
    <li>Max luggage on motorcycle: <strong>10 kg per person</strong></li>
    <li>Extra luggage: ₹500 per kg</li>
    <li>Backpacking/Budget tours: Max 15 kg total. Excess = ₹1,000/kg</li>
    <li><strong>No trolley bags</strong> on any EscapeArc tour — no exceptions</li>
    <li>Foreign nationals: USD 50 extra charge on all bookings</li>
    <li>Valid ID required at check-in: Voter ID / Passport / Aadhaar / Driving Licence</li>
    <li><strong>PAN card is NOT accepted</strong> as valid identity proof</li>
  </ul>`},
  {q:"Safety, Conduct & Liability",a:`<ul>
    <li>Road Captain / Tour Manager is final authority — always</li>
    <li>No rider may start or solo-ride without Road Captain's permission</li>
    <li>Harassment of female travelers = immediate removal, zero refund</li>
    <li>Reckless behaviour = removal without refund</li>
    <li>EscapeArc is not liable for personal loss, injury, accidents, delays, or bike damage</li>
    <li>All participants accept inherent risks of motorcycle travel in high-altitude terrain</li>
    <li>High altitude fitness medical certificate is mandatory</li>
    <li>If you leave the tour mid-way, bike transport costs to endpoint are your responsibility</li>
  </ul>`},
  {q:"Force Majeure & Weather",a:`<ul>
    <li>In landslide, heavy snowfall, avalanche, political disturbance, or natural disaster: EscapeArc may cancel, reschedule, or alter the tour</li>
    <li>No compensation for monetary loss in such unforeseen situations</li>
    <li>4-wheelers arranged if motorcycle travel becomes unsafe — extra cost split equally by all riders</li>
    <li>Full advance is forfeited if the rider cancels due to natural disaster (not EscapeArc-initiated cancellation)</li>
    <li>EscapeArc is not responsible for missed flights or rescheduling costs arising from tour extension</li>
  </ul>`},
  {q:"Destination-Specific Notes",a:`<strong>Ladakh / Leh:</strong><ul>
    <li>Do NOT roam on Day 1 — allow body to acclimatize to altitude</li>
    <li>Avoid alcohol and smoking on arrival day at Leh</li>
    <li>Book return flight from Srinagar with at least 3 hours buffer</li>
    <li>Pre-existing heart or lung conditions: consult a doctor before booking</li>
  </ul><br/><strong>Spiti Valley:</strong><ul>
    <li>Confirm check-in/out time with Chandigarh hotel team</li>
    <li>Rain gear and winter clothes mandatory — weather can change fast</li>
    <li>All payments in Spiti are Cash Only — carry enough</li>
  </ul><br/><strong>Bhutan:</strong><ul>
    <li>Reach Siliguri (Bagdogra) on the specified time — strict group departure</li>
    <li>Share visa documents with EscapeArc team in advance</li>
    <li>Carry original documents + copies</li>
  </ul>`},
  {q:"Privacy Policy",a:`<ul>
    <li>EscapeArc collects: email, name, usage data, device/IP info</li>
    <li>Data used for: service delivery, account management, marketing, support</li>
    <li>Cookies used: session (essential), persistent (functionality, acceptance)</li>
    <li>Data shared only with service providers, affiliates, or as legally required</li>
    <li>Children under 13: no data collected</li>
    <li>You may request deletion/correction of your data at any time</li>
    <li>Contact: <strong>escapearcofficial@gmail.com</strong></li>
    <li>Last updated: August 14, 2024</li>
  </ul>`}
];
