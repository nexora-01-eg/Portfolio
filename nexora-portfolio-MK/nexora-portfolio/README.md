# NEXORA — Full Industry Portfolio

38 standalone, dependency-free HTML demos spanning healthcare and beyond — enterprise dashboards, mobile apps, marketing sites, a marketplace, and personal VIP doctor portals. `index.html` is the gallery hub — open it first.

## Contents

### Medical — Enterprise & Platforms
- `nexora-medical-os.html`, `medcore-hospital-dashboard.html`, `auravita-patient-portal.html`, `vitalis-telemedicine-room.html`, `meridian-diagnostics.html`, `falcon-ems-dispatch.html`, `pulse-icu-monitoring.html`, `nilecare-claims-portal.html`, `apotheca-pharmacy-pos.html`, `wren-clinic-landing.html`, `froui-clinic-saas.html`, `mu3eenak-equipment-rental.html`, `doktorak-booking.html`

### Medical — Mobile Companions (Arabic/RTL)
- `rafiq-app.html`, `warsha-app.html`, `ibtisama-app.html`, `coach-app.html`, `tawazun-nutrition-app.html`, `lamha-optician-app.html`, `alief-vet-clinic.html`, `haraka-physio-app.html`, `nuboogh-tutor-app.html`

### VIP Doctor Portals (personal branded sites)
- `dr-ahmed-elmasry-cardiology.html`, `dr-nour-elhoda-dermatology.html`, `dr-youssef-elsherif-orthodontics.html`, `dr-salma-fouad-psychiatry.html`, `dr-rania-tawfik-fertility.html`, `dr-kareem-elgendy-sports-medicine.html`

### Non-Medical Industries
- `tabaq-restaurant-app.html` (restaurant), `sakan-real-estate.html` (real estate), `motor-garage-app.html` (auto garage), `qumasha-boutique-app.html` (fashion), `freim-photography-studio.html` (photography), `tashteeb-contractor-app.html` (contractor), `adl-law-firm.html` (law firm), `qors-bakery-app.html` (bakery), `el-osta-barbershop-app.html` (barbershop), `wasalha-logistics-dashboard.html` (delivery/logistics)

Every file is self-contained (inline CSS + vanilla JS, Google Fonts via CDN, no build step, no backend). Open any file directly in a browser — no server required.

## Deploy — GitHub Pages
1. Push this folder's contents to a new repository (root, or a `/docs` folder).
2. Go to **Settings → Pages**.
3. Under **Source**, select the branch and folder.
4. Save. Site goes live at `https://<username>.github.io/<repo-name>/`. `index.html` loads automatically.

## Deploy — Netlify
**Drag and drop:** go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this folder in — instant live URL.
**Git-connected:** push to a repo, then in Netlify choose **Add new site → Import an existing project**, leave build command empty, publish directory `.`.

## Notes
- All data (patients, orders, doctors, clients, etc.) is fictional, generated for demonstration only.
- No project is connected to a backend, database, or real API — everything is frontend-only, fully interactive demo screens.
- Arabic/RTL projects render best on mobile viewport widths but are responsive across devices.
