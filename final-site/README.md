# EscapeArc — Website

**Adventure & Lifestyle Travel Company | Founded 2017, Buldhana, Maharashtra**

> Where every journey becomes a Chapter in your Life.

---

## Repository Structure

```
escapearc-site/
├── index.html                          # Static site (all pages, SPA)
├── css/
│   └── style.css                       # All styles
├── js/
│   ├── data.js                         # Perfumes, hotels, policies, constants
│   ├── main.js                         # All app logic (routing, booking, bot)
│   └── tours-data.js                   # Tour inventory (55 tours, generated from xlsx)
├── assets/
│   └── media/
│       ├── brand-mark.png              # EscapeArc logo
│       └── logo-loader.gif             # Animated loader logo
└── wp-content/
    └── themes/escapearc-theme/         # WordPress theme (parallel build)
        ├── functions.php               # Theme bootstrap, CPTs, booking handler
        ├── front-page.php              # Homepage template
        ├── single-expedition.php       # Tour detail template
        ├── archive-expedition.php      # Tours listing
        ├── archive-stay.php            # Hotels/stays listing
        ├── template-parts/
        │   └── booking-modal.php       # Booking modal partial
        ├── assets/
        │   ├── css/site.css
        │   └── js/
        │       ├── data.js             # WP-compatible data
        │       ├── main.js             # WP-compatible interactions
        │       └── theme.js            # WP-specific: booking form, loader, bot
        └── style.css                   # WP theme declaration + overrides
```

---

## Static Site

The static site (`index.html`) is a **single-page application** with 10 views:

| Page | Description |
|------|-------------|
| Home | Hero, stats, marquee |
| Tours | 55 national + international tours, search + category filter |
| Spiti Itinerary | Full 9N/10D ride itinerary |
| Checklist | Gear, documents, medications |
| Hotels | 1,450-property Spiti/Ladakh database |
| Perfumes | 4-fragrance Extrait collection |
| About | Brand story, credentials |
| Policies | Booking, cancellation, conduct (accordion) |
| Contact | WhatsApp, email, address |
| Admin | Booking management + CSV export (localStorage) |

### Running locally

No build step needed. Just open `index.html` in a browser, or:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## WordPress Theme

The WP theme lives in `wp-content/themes/escapearc-theme/` and registers three custom post types:

- **expedition** — Tour/ride products
- **stay** — Hotel/homestay database entries  
- **booking_inquiry** — Private CPT for form submissions (stored in WP admin)

**Requirements:** WordPress 6.4+, PHP 7.4+. ACF optional (gracefully degrades to `get_post_meta`).

---

## Key Data Files

| File | Contents |
|------|----------|
| `js/data.js` | `WHATSAPP`, `EMAIL` constants; `perfumeData` (4 fragrances); `hotelData` (sample 30, full 1,450 in production); `policies` (9 sections) |
| `js/tours-data.js` | `tours` array — 55 tours with id, name, route, duration, price, category, type, seats |

---

## Brand

- **Colors:** Gold `#F5A623`, Dark `#0c110d`, Accent green `#2D5016`
- **Contact:** escapearcofficial@gmail.com | +91 94228 81098
- **WhatsApp:** [wa.me/919422881098](https://wa.me/919422881098)
- **Website:** [escapearc.in](https://escapearc.in)

---

## Perfume Collection

| Fragrance | Mood | Longevity | Price (10ml / Bottle) |
|-----------|------|-----------|-----------------------|
| First Mile | Fresh · Clean · Optimistic | 8–10 hrs | ₹349 / ₹749 |
| Detour | Green · Raw · Adventurous | 8–10 hrs | ₹349 / ₹749 |
| After Journey | Warm · Woody · Reflective | 10–12 hrs | ₹399 / ₹899 |
| Last Stop | Deep · Grounded · Enduring | 12–16 hrs | ₹399 / ₹899 |
