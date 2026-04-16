/* EscapeArc interactions */
/* ═══════════════════════ LOADER ═══════════════════════ */
let progress = 0;
const fill = document.getElementById("loaderFill");
const loadingText = document.getElementById("loadingText");
const byId = (id) => document.getElementById(id);
const loaderTimer = setInterval(() => {
  progress += 2;
  if (fill) fill.style.width = progress + "%";
  if (loadingText) loadingText.textContent = progress >= 100 ? "Ready!" : "Loading route map… " + progress + "%";
  if (progress >= 100) {
    clearInterval(loaderTimer);
    setTimeout(() => {
      byId("loader")?.classList.add("hidden");
      byId("main")?.classList.remove("hidden");
      const hash = location.hash.replace("#","") || "home";
      showPage(pages.includes(hash) ? hash : "home");
      toggleBot(true);
    }, 300);
  }
}, 20);

/* ═══════════════════════ PAGES ═══════════════════════ */
const pages = ["home","tours","checklist","hotels","perfumes","merch","gallery","about","policies","contact","admin"];
function showPage(page) {
  // Redirect legacy itinerary links to tours page
  if (page === "itinerary") page = "tours";
  pages.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("hidden", id !== page);
  });
  location.hash = page;
  if (page === "admin") renderAdmin();
  if (page === "hotels") renderHotels();
  if (page === "gallery") renderGallery();
  if (page === "merch") renderMerch();
  window.scrollTo({top:0,behavior:"smooth"});
  requestAnimationFrame(() => observeMotionNodes(document));
}
window.addEventListener("hashchange", () => {
  const hash = location.hash.replace("#","") || "home";
  if (pages.includes(hash)) showPage(hash);
});

/* NAV MENU */
const nav = byId("nav");
const menuBtn = byId("menuBtn");
if (menuBtn && nav) menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

/* ═══════════════════════ TOURS ═══════════════════════ */
let currentFilter = "national";
let currentCategory = "";

function getTourPriceLabel(tour) {
  if (tour.priceLabel) return tour.priceLabel;
  if (Number.isFinite(tour.price) && tour.price > 0) return `₹${tour.price.toLocaleString("en-IN")}`;
  return "Price on request";
}

function getTourBadge(tour) {
  return tour.region || tour.category || "EscapeArc";
}

function getTourStyleLabel(tour) {
  return tour.travelType || tour.difficulty || tour.category || "Curated";
}

function getTourSummary(tour) {
  return tour.itinerarySummary || tour.audience || tour.positioning || "";
}

function filterTours(type, cat) {
  currentFilter = type;
  currentCategory = cat || "";
  renderTours();
}

function renderTours() {
  const grid = document.getElementById("tourGrid");
  if (!grid) return;
  const searchVal = (document.getElementById("tourSearch")?.value || "").toLowerCase();
  let list = tours;
  if (currentFilter !== "all") list = list.filter(t => t.type === currentFilter);
  if (currentCategory) list = list.filter(t => t.category === currentCategory);
  if (searchVal) {
    list = list.filter(t => [
      t.name,
      t.route,
      t.category,
      t.region,
      t.travelType,
      t.audience,
      t.itinerarySummary,
      t.originalItinerary
    ].filter(Boolean).some(value => value.toLowerCase().includes(searchVal)));
  }
  grid.innerHTML = list.map(t => {
    const seats = Math.max(0, t.totalSeats - t.bookedSeats);
    const summary = getTourSummary(t);
    return `<article class="card" style="min-height:280px">
      <div class="thumb" style="background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.6)),
        radial-gradient(circle at 30% 20%,rgba(244,193,74,.18),transparent 25%),
        linear-gradient(135deg,#18231c,#0c110d)"></div>
      <div class="content">
        <span class="badge">${getTourBadge(t)}</span>
        <h3 style="margin:10px 0 6px;font-size:1rem">${t.name}</h3>
        <p style="font-size:.8rem">${t.route}</p>
        ${summary ? `<p style="font-size:.78rem;margin-top:10px">${summary}</p>` : ""}
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">
          <span class="meta-chip">${t.duration}</span>
          <span class="meta-chip">${getTourStyleLabel(t)}</span>
          <span class="meta-chip price">${getTourPriceLabel(t)}</span>
          <span class="meta-chip" style="${seats<5?'color:var(--danger)':''}"> ${seats} seats left</span>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
          <button class="btn btn-primary" style="font-size:.82rem;padding:9px 14px" onclick="selectTour('${t.id}')">Book Now</button>
          <button class="btn btn-dark" style="font-size:.82rem;padding:9px 14px" onclick="sendWhatsApp('Tour enquiry: ${t.name}')">WhatsApp</button>
        </div>
      </div>
    </article>`;
  }).join("");
  if (!list.length) grid.innerHTML = `<div style="grid-column:1/-1;color:var(--muted);padding:32px;text-align:center">No tours found. Try a different search.</div>`;

  // Category filter buttons
  const catEl = document.getElementById("categoryFilter");
  if (catEl) {
    const cats = [...new Set(tours.filter(t => currentFilter === "all" || t.type === currentFilter).map(t => t.category))].sort();
    catEl.innerHTML = `<button class="btn ${!currentCategory?'btn-primary':'btn-ghost'}" style="padding:8px 14px;font-size:.8rem" onclick="currentCategory='';renderTours()">All</button>` +
      cats.map(c => `<button class="btn ${currentCategory===c?'btn-primary':'btn-ghost'}" style="padding:8px 14px;font-size:.8rem" onclick="currentCategory='${c}';renderTours()">${c}</button>`).join("");
  }

  // Tour dropdown in booking modal
  const sel = document.getElementById("bkTour");
  if (sel) {
    sel.innerHTML = tours.map(t => `<option value="${t.id}">${t.name} — ${t.duration} — ${getTourPriceLabel(t)}</option>`).join("");
  }
  updateAdminCounters();
  observeMotionNodes(document);
}

const tourToggle = byId("tourToggle");
tourToggle?.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    tourToggle.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.group;
    currentCategory = "";
    const lbl = byId("flowLabel");
    const bk = byId("bike");
    if (currentFilter === "national") {
      if (lbl) lbl.textContent = "🇮🇳 National route mode";
      if (bk) bk.className = "bike national fly";
    } else if (currentFilter === "international") {
      if (lbl) lbl.textContent = "🌍 International route mode";
      if (bk) bk.className = "bike international fly";
    } else {
      if (lbl) lbl.textContent = "🌐 All routes mode";
      if (bk) bk.className = "bike fly";
    }
    renderTours();
    if (bk) setTimeout(() => bk.classList.remove("fly"), 200);
  });
});

/* ═══════════════════════ PERFUMES ═══════════════════════ */
function renderPerfumes() {
  const grid = document.getElementById("perfumeGrid");
  if (!grid) return;
  // Use 2-col layout to showcase landscape product photography
  grid.style.gridTemplateColumns = "repeat(2,1fr)";
  grid.style.gap = "24px";
  grid.innerHTML = perfumeData.map(p => {
    const imgSrc = (typeof PERFUME_IMAGES !== "undefined" && p.imageKey && PERFUME_IMAGES[p.imageKey])
      ? PERFUME_IMAGES[p.imageKey] : null;
    const visual = imgSrc
      ? `<img src="${imgSrc}" alt="${p.name} — EscapeArc Eau de Parfum" style="width:100%;height:100%;object-fit:cover;object-position:center center;display:block;">`
      : `<div class="bottle"></div>`;
    return `
    <article class="product perfume-card motion-reveal">
      <div class="visual perfume-visual">${visual}</div>
      <div class="content" style="padding:20px 22px 22px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <span class="badge">${p.badge || "Extrait · 32%"}</span>
          <span style="font-size:.78rem;color:var(--accent);font-weight:700">⏳ Coming Soon</span>
        </div>
        <h3 style="margin:12px 0 4px;font-size:1.3rem;letter-spacing:-.02em">${p.name}</h3>
        <div style="font-size:.85rem;color:var(--accent2);margin-bottom:10px">${p.mood}${p.longevity ? ` · ${p.longevity}` : ""}</div>
        <p style="font-size:.9rem;line-height:1.7;color:var(--muted)">${p.desc}</p>
        <div class="notes" style="margin-top:14px">${p.notes.map(n => `<span class="note">${n}</span>`).join("")}</div>
        <div style="margin-top:14px;padding:10px 14px;border-radius:12px;background:rgba(244,193,74,.07);border:1px solid rgba(244,193,74,.18);display:flex;gap:16px;flex-wrap:wrap">
          <span style="font-size:.82rem;color:var(--muted)">10ml · <strong style="color:var(--text)">₹${p.price.small}</strong></span>
          <span style="font-size:.82rem;color:var(--muted)">Bottle · <strong style="color:var(--text)">₹${p.price.large}</strong></span>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">
          <button class="btn btn-primary" style="font-size:.82rem;padding:10px 16px" onclick="sendWhatsApp('Perfume waitlist: ${p.name}')">Join Waitlist</button>
          <button class="btn btn-dark" style="font-size:.82rem;padding:10px 16px" onclick="sendEmail('EscapeArc Perfume Enquiry: ${p.name}')">Email Enquiry</button>
        </div>
      </div>
    </article>`;
  }).join("");
  observeMotionNodes(document);
}

/* ═══════════════════════ POLICIES ═══════════════════════ */
function renderPolicies() {
  const wrap = document.getElementById("policyAccordion");
  if (!wrap) return;
  wrap.innerHTML = policies.map((p, i) => `
    <div class="acc-item ${i===0?"open":""}">
      <button class="acc-btn" onclick="this.parentElement.classList.toggle('open')">${p.q} <span class="caret">⌄</span></button>
      <div class="acc-panel"><div class="acc-inner">${p.a}</div></div>
    </div>
  `).join("");
  observeMotionNodes(document);
}

/* ═══════════════════════ HOTELS ═══════════════════════ */
function renderHotels() {
  const grid = document.getElementById("hotelGrid");
  const statsEl = document.getElementById("hotelStats");
  const moreEl = document.getElementById("hotelMore");
  if (!grid) return;
  const search = (document.getElementById("hotelSearch")?.value || "").toLowerCase();
  const loc = document.getElementById("hotelLocation")?.value || "";
  const type = document.getElementById("hotelType")?.value || "";
  let list = hotelData;
  if (search) list = list.filter(h => h.name.toLowerCase().includes(search) || h.addr.toLowerCase().includes(search) || h.loc.toLowerCase().includes(search));
  if (loc) list = list.filter(h => h.region === loc || h.loc === loc);
  if (type) list = list.filter(h => h.type.includes(type));
  list = list.sort((a,b) => b.rating - a.rating || b.reviews - a.reviews);
  const shown = list.slice(0, shownHotels);
  if (statsEl) statsEl.textContent = `Showing ${shown.length} of ${list.length} properties from our 1,450-hotel database`;
  grid.innerHTML = shown.map(h => `
    <div class="hotel-card">
      <div class="hotel-name">${h.name}</div>
      <div class="hotel-addr">📍 ${h.addr}</div>
      <div class="hotel-meta">
        <span class="hotel-chip">${h.type}</span>
        <span class="hotel-chip" style="color:var(--accent2)">★ ${h.rating} (${h.reviews})</span>
        ${h.phone ? `<span class="hotel-chip">📞 ${h.phone}</span>` : ""}
        ${h.url ? `<a class="hotel-chip" href="https://${h.url}" target="_blank" rel="noopener" style="text-decoration:underline">${h.url}</a>` : ""}
      </div>
    </div>
  `).join("");
  if (moreEl) {
    if (list.length > shownHotels) {
      moreEl.innerHTML = `<button class="btn btn-ghost" onclick="shownHotels+=12;renderHotels()">Load more (${list.length - shownHotels} remaining)</button>`;
    } else {
      moreEl.innerHTML = list.length > 12 ? `<span class="small">All ${list.length} results shown</span>` : "";
    }
  }
  observeMotionNodes(document);

}

/* ═══════════════════════ BOOKING ═══════════════════════ */
function openBooking() {
  const modal = byId("bookingModal");
  const nameInput = byId("bkName");
  const tourSelect = byId("bkTour");
  modal?.classList.add("open");
  nameInput?.focus();
  if (tourSelect && !tourSelect.options.length) renderTours();
}
function closeBooking() { byId("bookingModal")?.classList.remove("open"); }
function selectTour(id) {
  showPage("tours");
  openBooking();
  const tourSelect = byId("bkTour");
  if (tourSelect) tourSelect.value = id;
}

function submitBooking() {
  const name = byId("bkName")?.value.trim() || "";
  const phone = byId("bkPhone")?.value.trim() || "";
  const email = byId("bkEmail")?.value.trim() || "";
  const tourId = byId("bkTour")?.value || "";
  const month = byId("bkMonth")?.value.trim() || "";
  const group = byId("bkGroup")?.value || "1";
  const notes = byId("bkNotes")?.value.trim() || "";
  const tour = tours.find(t => t.id === tourId);
  if (!name || !phone || !month) { alert("Please fill in Name, Phone, and Travel Month."); return; }
  if (!tour) { alert("Please select a tour."); return; }
  const id = "EA-" + Math.random().toString(36).substr(2,8).toUpperCase();
  const booking = {bookingId:id,name,phone,email,tour:tour.name,tourId,month,groupSize:Number(group),notes,status:"new",paymentStatus:"partial",createdAt:new Date().toISOString()};
  const list = JSON.parse(localStorage.getItem("ea_bookings") || "[]");
  list.unshift(booking);
  localStorage.setItem("ea_bookings", JSON.stringify(list));
  tour.bookedSeats = Math.min(tour.totalSeats, tour.bookedSeats + Math.max(1, Number(group)));
  closeBooking();
  const msg = `Booking Request | EscapeArc
ID: ${id}
Name: ${name}
Phone: ${phone}
Email: ${email || "—"}
Tour: ${tour.name}
Duration: ${tour.duration}
Price: ${getTourPriceLabel(tour)}
Month: ${month}
Group Size: ${group}
Notes: ${notes || "—"}
Status: New | Payment: Partial (40% advance pending)
---
Sent via escapearc.in`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  updateAdminCounters();
}

function sendWhatsApp(subject) {
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi EscapeArc! " + subject)}`, "_blank", "noopener");
}
function sendEmail(subject) {
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
  observeMotionNodes(document);

}

byId("bookingModal")?.addEventListener("click", e => { if (e.target.id === "bookingModal") closeBooking(); });

/* ═══════════════════════ ADMIN ═══════════════════════ */
function updateAdminCounters() {
  const bookings = JSON.parse(localStorage.getItem("ea_bookings") || "[]");
  const waitlist = JSON.parse(localStorage.getItem("ea_waitlist") || "[]");
  const seats = tours.reduce((s,t) => s + Math.max(0, t.totalSeats - t.bookedSeats), 0);
  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const el = id => document.getElementById(id);
  if (el("bookingCount")) el("bookingCount").textContent = bookings.length;
  if (el("seatCount")) el("seatCount").textContent = seats;
  if (el("waitlistCount")) el("waitlistCount").textContent = waitlist.length;
  if (el("confirmedCount")) el("confirmedCount").textContent = confirmed;
}

function renderAdmin() {
  updateAdminCounters();
  const tbody = document.getElementById("adminTable");
  if (!tbody) return;
  const bookings = JSON.parse(localStorage.getItem("ea_bookings") || "[]");
  tbody.innerHTML = bookings.length ? bookings.map(b => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.07);font-family:monospace;font-size:.82rem">${b.bookingId}</td>
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.07)">${b.name}</td>
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.07)">${b.phone}</td>
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.07);max-width:180px;font-size:.85rem">${b.tour}</td>
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.07)">${b.month}</td>
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.07);text-align:center">${b.groupSize}</td>
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.07)">${b.paymentStatus}</td>
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.07)"><span style="padding:3px 8px;border-radius:8px;font-size:.78rem;background:${b.status==="confirmed"?"rgba(139,226,138,.15)":b.status==="cancelled"?"rgba(255,109,109,.15)":"rgba(255,255,255,.05)"}">${b.status}</span></td>
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.07);display:flex;gap:6px;flex-wrap:wrap">
        <button class="btn btn-primary" style="padding:6px 10px;font-size:.78rem" onclick="updateBooking('${b.bookingId}','confirmed')">Confirm</button>
        <button class="btn btn-ghost" style="padding:6px 10px;font-size:.78rem" onclick="updateBooking('${b.bookingId}','cancelled')">Cancel</button>
        <button class="btn btn-dark" style="padding:6px 10px;font-size:.78rem" onclick="sendWhatsApp('Follow up for booking ${b.bookingId} — ${b.name}')">WA</button>
      </td>
    </tr>
  `).join("") : `<tr><td colspan="9" style="padding:24px;text-align:center;color:var(--muted)">No bookings yet. They will appear here after guests submit the booking form.</td></tr>`;
  observeMotionNodes(document);

}

function updateBooking(id, status) {
  const list = JSON.parse(localStorage.getItem("ea_bookings") || "[]");
  const item = list.find(x => x.bookingId === id);
  if (item) item.status = status;
  localStorage.setItem("ea_bookings", JSON.stringify(list));
  renderAdmin();
}

function clearBookings() {
  if (confirm("Clear ALL bookings? This cannot be undone.")) {
    localStorage.removeItem("ea_bookings");
    renderAdmin();
  }
}

function exportBookings() {
  const list = JSON.parse(localStorage.getItem("ea_bookings") || "[]");
  if (!list.length) { alert("No bookings to export."); return; }
  const headers = "Booking ID,Name,Phone,Email,Tour,Month,Group Size,Status,Payment,Created";
  const rows = list.map(b => `${b.bookingId},${b.name},${b.phone},${b.email || ""},${b.tour},${b.month},${b.groupSize},${b.status},${b.paymentStatus},${b.createdAt}`);
  const csv = [headers, ...rows].join("\n");
  const link = document.createElement("a");
  link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  link.download = "escapearc_bookings.csv";
  link.click();
}

/* ═══════════════════════ AI BOT ═══════════════════════ */
const botKnowledge = {
  spiti: "Spiti Valley ride is 9 Nights / 10 Days at ₹27,999 per person. Route: Chandigarh → Narkanda → Chitkul → Nako → Tabo → Kaza → Chandrataal → Manali → Chandigarh. Collab with The Malang Man. Minimum 25 riders. Cash only in Spiti. Includes: Accommodation MAP basis, backup vehicle & mechanic.",
  ladakh: "Ladakh tours include Car Tours (4N/5D at ₹44,999 and 6N/7D at ₹49,999) and Bike Expeditions (12–16 days, ₹45,000–₹52,000). Covers Nubra Valley, Pangong Lake, Khardung La. EscapeArc holds India Book of Records for Khardung La ride alongside Indian Air Force.",
  bhutan: "Bhutan tours include cultural immersion, Tiger's Nest Monastery, ancient dzongs. Enter via Bagdogra/Siliguri. Share visa documents with EscapeArc team in advance. Enquire on WhatsApp for current pricing and dates.",
  booking: "To book: 40% advance confirms your seat. Balance 60% due 10–15 days before departure. Just fill the booking form on this website and you'll be redirected to WhatsApp with all details. Minimum 25 riders per group.",
  cancellation: "Fixed departures: Booking amount is non-refundable. Cancellation slabs: 30+ days = 25% deducted, 30-15 days = 40%, 14-7 days = 80%, 6-3 days = 90%, 2-0 days = 100% forfeited. GST is never refunded. Tour cancelled by EscapeArc = full refund.",
  gear: "Mandatory gear: ECE/DOT/ISI/SNEL certified helmet (full-face or modular only — NO half-face), CE armour riding jacket, knuckle-protection gloves, ankle-protection riding boots (no sneakers). High altitude fitness medical certificate is mandatory.",
  checklist: "Key items: High altitude fitness certificate, Voter ID/Passport/Aadhaar + DL, RC+Insurance+PUC, 3 passport photos, 60L rucksack, thermals, rain gear, altitude sickness tablets, sunscreen SPF50+. Spiti needs cash. No trolley bags.",
  contact: "Email: escapearcofficial@gmail.com | WhatsApp: +91 94228 81098 | Website: escapearc.in | Office: Near Renuka Typing, Bhadech Layout, Buldhana, Maharashtra",
  about: "EscapeArc was founded in 2017 in Buldhana, Maharashtra. 150+ destinations explored, 50+ years combined team experience. India Book of Records holder (Khardung La ride with Indian Air Force). Maharashtra Tourism recognized for promoting Chhatrapati Shivaji Maharaj's heritage.",
  perfume: "EscapeArc has a 4-fragrance line at 32% Extrait concentration: First Mile (fresh/clean), Detour (green/earthy), After Journey (warm/woody), Last Stop (deep/oud). All designed for 8–16 hour longevity. Enquire on WhatsApp for availability.",
  kerala: "Kerala tours range from 5N/6D (₹23,999) to 9N/10D (₹34,999). Family, honeymoon, and backpacking variants. Covers Cochin, Munnar, Alleppey, Thekkady, Kovalam.",
  international: "International tours: Singapore (₹79,999), Thailand (₹84,999), Bali (₹89,999), Switzerland (₹1,29,999), Europe Grand Tour (₹2,19,000), USA East Coast (₹1,39,999).",
  price: "Prices start at ₹12,999 for Coorg (2N/3D). Spiti ride is ₹27,999. Kerala family tours from ₹23,999. Ladakh bike expeditions from ₹45,000. International tours from ₹79,999.",
  merch: "EscapeArc Streetwear Drop 01 launches 2025 🧢 Three pieces: Long Way Comfort Hoodie (₹1,299 est.), Route Zero Tee (₹699 est.), and Highpass Cargo Jogger (₹1,099 est.). Colorways: Mountain Dusk, Desert Sunset, Slate Black, Army Green. Join the waitlist on WhatsApp to get early access and launch pricing!",
};

function getBotReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes("spiti") || m.includes("chitkul") || m.includes("kaza") || m.includes("malang")) return botKnowledge.spiti;
  if (m.includes("ladakh") || m.includes("leh") || m.includes("khardung") || m.includes("pangong") || m.includes("nubra")) return botKnowledge.ladakh;
  if (m.includes("bhutan") || m.includes("tiger") || m.includes("dzong")) return botKnowledge.bhutan;
  if (m.includes("book") || m.includes("reserv") || m.includes("seat") || m.includes("advance")) return botKnowledge.booking;
  if (m.includes("cancel") || m.includes("refund")) return botKnowledge.cancellation;
  if (m.includes("gear") || m.includes("helmet") || m.includes("jacket") || m.includes("boot")) return botKnowledge.gear;
  if (m.includes("checklist") || m.includes("pack") || m.includes("carry") || m.includes("bring")) return botKnowledge.checklist;
  if (m.includes("contact") || m.includes("phone") || m.includes("email") || m.includes("whatsapp")) return botKnowledge.contact;
  if (m.includes("about") || m.includes("founded") || m.includes("company") || m.includes("history")) return botKnowledge.about;
  if (m.includes("merch") || m.includes("streetwear") || m.includes("clothing") || m.includes("hoodie") || m.includes("tee") || m.includes("tshirt") || m.includes("drop")) return botKnowledge.merch;
  if (m.includes("perfume") || m.includes("fragrance") || m.includes("scent") || m.includes("first mile")) return botKnowledge.perfume;
  if (m.includes("kerala") || m.includes("munnar") || m.includes("alleppey")) return botKnowledge.kerala;
  if (m.includes("international") || m.includes("singapore") || m.includes("thailand") || m.includes("bali") || m.includes("europe") || m.includes("usa")) return botKnowledge.international;
  if (m.includes("price") || m.includes("cost") || m.includes("fee") || m.includes("charge") || m.includes("₹")) return botKnowledge.price;
  if (m.includes("hi") || m.includes("hello") || m.includes("hey")) return "Hey! Welcome to EscapeArc 🏍️ I can help you with tours, booking, gear, or policies. What are you planning?";
  return "I'm not sure about that — let me connect you directly! Tap WhatsApp below for the fastest answer from our team.";
}

function addBotMsg(text, isUser=false) {
  const container = byId("aiMsgs");
  if (!container) return;
  const div = document.createElement("div");
  div.className = "ai-msg" + (isUser ? " user" : "");
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function botAsk(question) {
  addBotMsg(question, true);
  setTimeout(() => addBotMsg(getBotReply(question)), 400);
}

function botSend() {
  const input = byId("aiInput");
  if (!input) return;
  const q = input.value.trim();
  if (!q) return;
  input.value = "";
  addBotMsg(q, true);
  setTimeout(() => addBotMsg(getBotReply(q)), 500);
}

function toggleBot(force) {
  const bot = byId("aiBot");
  const toggle = byId("botToggle");
  if (!bot) return;
  const open = typeof force === "boolean" ? force : !bot.classList.contains("open");
  bot.classList.toggle("open", open);
  if (toggle) toggle.style.display = open ? "none" : "grid";
}

const botToggle = byId("botToggle");
if (botToggle) botToggle.style.display = "grid";


/* ═══════════════════════ MOTION SYSTEM ═══════════════════════ */
const motionSelector = [
  ".hero h1",
  ".hero p",
  ".hero-tags .chip",
  ".hero .btn",
  ".hero .stat",
  ".hero-card",
  ".section-kicker",
  ".section-title",
  ".section-lead",
  ".card",
  ".panel",
  ".dest-card",
  ".product",
  ".day-card",
  ".hotel-card",
  ".acc-item",
  ".banner",
  ".metric",
  ".stat",
  ".check-item",
  ".chip"
].join(",");

const observedMotion = new WeakSet();
let motionObserver = null;

function ensureMotionObserver() {
  if (motionObserver) return motionObserver;
  motionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      motionObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
  return motionObserver;
}

function observeMotionNodes(root = document) {
  const observer = ensureMotionObserver();
  root.querySelectorAll(motionSelector).forEach((el, index) => {
    if (observedMotion.has(el)) return;
    el.classList.add("motion-reveal");
    if (index < 5) el.classList.add(`delay-${Math.min(index + 1, 5)}`);
    observer.observe(el);
    observedMotion.add(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("motion-ready");
  observeMotionNodes(document);

});



/* ═══════════════════════ MERCH ═══════════════════════ */
function renderMerch() {
  observeMotionNodes(document);
}

/* ═══════════════════════ GALLERY ═══════════════════════ */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid || typeof GALLERY_REAL === "undefined" || typeof GALLERY_ITEMS === "undefined") return;
  grid.innerHTML = GALLERY_ITEMS.map((item, i) => {
    const src = GALLERY_REAL[item.key];
    if (!src) return "";
    return `<div class="gallery-card motion-reveal" style="border-radius:18px;overflow:hidden;position:relative;cursor:none;aspect-ratio:4/3;background:#0c110d" onclick="openLightbox('${item.key}')">
      <img src="${src}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)" loading="lazy">
      <div style="position:absolute;bottom:0;left:0;right:0;padding:16px 18px;background:linear-gradient(transparent,rgba(0,0,0,.78))">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent2);padding:3px 8px;border-radius:999px;background:rgba(139,226,138,.12);border:1px solid rgba(139,226,138,.2)">${item.location}</span>
        </div>
        <div style="color:#fff;font-weight:700;font-size:.95rem">${item.title}</div>
        <div style="color:rgba(255,255,255,.6);font-size:.78rem;margin-top:3px;line-height:1.4">${item.caption}</div>
      </div>
    </div>`;
  }).join("");
  // hover zoom
  grid.querySelectorAll(".gallery-card img").forEach(img => {
    const card = img.parentElement;
    card.addEventListener("mouseenter", () => img.style.transform = "scale(1.06)");
    card.addEventListener("mouseleave", () => img.style.transform = "scale(1)");
  });
  observeMotionNodes(document);
}

function openLightbox(key) {
  if (typeof GALLERY_REAL === "undefined") return;
  const src = GALLERY_REAL[key];
  if (!src) return;
  const item = (typeof GALLERY_ITEMS !== "undefined" ? GALLERY_ITEMS : []).find(g => g.key === key) || {};
  const overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;cursor:none";
  overlay.innerHTML = `
    <img src="${src}" style="max-width:90vw;max-height:78vh;object-fit:contain;border-radius:12px;box-shadow:0 40px 80px rgba(0,0,0,.6)">
    <div style="color:#fff;font-size:1.1rem;font-weight:700;margin-top:18px">${item.title || ""}</div>
    <div style="color:rgba(255,255,255,.55);font-size:.85rem;margin-top:6px;max-width:600px;text-align:center">${item.caption || ""}</div>
    <div style="color:rgba(255,255,255,.3);font-size:.75rem;margin-top:12px;letter-spacing:.1em;text-transform:uppercase">Click anywhere to close</div>`;
  overlay.addEventListener("click", () => overlay.remove());
  document.addEventListener("keydown", function esc(e) { if(e.key==="Escape"){overlay.remove();document.removeEventListener("keydown",esc);} });
  document.body.appendChild(overlay);
}


/* ═══════════════════════ MERCH ═══════════════════════ */
function renderMerch() {
  observeMotionNodes(document);
}

/* ═══════════════════════ GALLERY ═══════════════════════ */
const galleryItems = [
  { key: "collection", title: "The Full Collection", caption: "First Mile · Detour · After Journey · Last Stop — four moments. One journey." },
  { key: "cover",      title: "Riders at Dawn",      caption: "EscapeArc expeditions begin before the sun does. Community-first, always." },
  { key: "adventure",  title: "Last Light Halt",     caption: "The pause that every rider knows. Engine off. Sky on fire." },
  { key: "roadmap",    title: "Final Halt",          caption: "Campfire, brotherhood, and the scent of Last Stop." },
];

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid || typeof GALLERY_IMAGES === "undefined") return;
  grid.innerHTML = galleryItems.map((item, i) => {
    const src = GALLERY_IMAGES[item.key];
    if (!src) return "";
    return `<div class="gallery-card motion-reveal" style="border-radius:20px;overflow:hidden;position:relative;cursor:pointer;aspect-ratio:16/9;background:#0c110d" onclick="openLightbox('${item.key}')">
      <img src="${src}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
      <div style="position:absolute;bottom:0;left:0;right:0;padding:20px 24px;background:linear-gradient(transparent,rgba(0,0,0,.75))">
        <div style="color:#fff;font-weight:700;font-size:1rem">${item.title}</div>
        <div style="color:rgba(255,255,255,.7);font-size:.82rem;margin-top:4px">${item.caption}</div>
      </div>
    </div>`;
  }).join("");
  observeMotionNodes(document);
}

function openLightbox(key) {
  if (typeof GALLERY_IMAGES === "undefined") return;
  const src = GALLERY_IMAGES[key];
  if (!src) return;
  const item = galleryItems.find(g => g.key === key) || {};
  const overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;cursor:zoom-out";
  overlay.innerHTML = `<img src="${src}" style="max-width:90vw;max-height:80vh;object-fit:contain;border-radius:12px;box-shadow:0 40px 80px rgba(0,0,0,.6)">
    <div style="color:#fff;font-size:1rem;font-weight:700;margin-top:18px">${item.title || ""}</div>
    <div style="color:rgba(255,255,255,.6);font-size:.85rem;margin-top:6px">${item.caption || ""}</div>`;
  overlay.addEventListener("click", () => overlay.remove());
  document.body.appendChild(overlay);
}

/* ═══════════════════════ INIT ═══════════════════════ */
renderTours();
renderPerfumes();
renderPolicies();
observeMotionNodes(document);
// renderGallery() called lazily via showPage

/* ═══════════════════════ CUSTOM CURSOR ═══════════════════════ */
(function() {
  const cursor = document.getElementById("ea-cursor");
  const dot    = document.getElementById("ea-cursor-dot");
  const ring   = document.getElementById("ea-cursor-ring");
  if (!cursor) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;
  let raf;

  document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    cx = lerp(cx, mx, 0.18);
    cy = lerp(cy, my, 0.18);
    cursor.style.left = mx + "px";
    cursor.style.top  = my + "px";
    ring.style.left   = cx + "px";
    ring.style.top    = cy + "px";
    ring.style.position = "fixed";
    ring.style.transform = "translate(-50%,-50%)";
    raf = requestAnimationFrame(animate);
  }
  animate();

  // hover state on interactive elements
  const hoverSel = "a,button,.btn,.glow-card,.hotel-card,.card,.product,.gallery-card,.dest-card,.banner,.acc-btn,.social-box,.floating,.aurora-btn,.btn-aurora";
  document.addEventListener("mouseover", e => {
    if (e.target.closest(hoverSel)) document.body.classList.add("cursor-hover");
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(hoverSel)) document.body.classList.remove("cursor-hover");
  });
  document.addEventListener("mousedown", () => document.body.classList.add("cursor-click"));
  document.addEventListener("mouseup",   () => document.body.classList.remove("cursor-click"));

  // hide on leave, show on enter
  document.addEventListener("mouseleave", () => cursor.style.opacity = "0");
  document.addEventListener("mouseenter", () => cursor.style.opacity = "1");
})();

