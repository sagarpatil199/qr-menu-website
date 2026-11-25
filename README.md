# Digital QR Menu — Scroll-Storytelling Website

A premium, 2D animated storytelling website for a Digital QR Menu business, built with **React + Vite + Framer Motion**. Visitors follow Rahul, a restaurant owner, through eight chapters: his restaurant, the printed-menu problem, discovering a digital menu, guests scanning a QR code, exploring the menu on a phone, the transformation, the product and pricing, and finally the call to action.

Everything is static. There's no backend, database or paid service, and it runs on **GitHub Pages for free**.

---

## 1. Quick start

You need **Node.js 18+** (20 recommended).

```bash
npm install
npm run dev        # local dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

---

## 2. Add your contact details (important)

All business details live in **one file**: `src/config/business.js`.

| Key | What to put | Example format |
|---|---|---|
| `businessName` | Your brand name | `'Your Brand'` |
| `whatsappNumber` | Country code + number, digits only | `'91XXXXXXXXXX'` |
| `instagramUrl` | Full profile URL | `'https://www.instagram.com/your_handle/'` |
| `instagramLabel` | Text shown on the button | `'@your_handle'` |
| `emailAddress` | Your email | `'you@yourdomain.com'` |
| `defaultWhatsappMessage` | The prefilled WhatsApp message | — |

Any value that still starts with `REPLACE_` counts as **not configured**. Every button keeps working with a safe fallback:

- **WhatsApp** opens WhatsApp's chat picker with the message prefilled (no number attached yet)
- **Instagram** opens instagram.com
- **Email** opens a blank email with the subject and body prefilled

### Live client menus
The **"Live client menus"** section (`#clients`) shows real menus you've built, with a screenshot and a "View live menu" button for each. Edit `src/config/clients.js` to add or change clients:

1. Save a phone screenshot of the client's menu (about 280×620) into `src/assets/images/clients/`.
2. Import it at the top of `clients.js` and add an entry with `name`, `type`, `highlights`, `url` and `image`.

The final section's line "Already live at …" updates automatically from the same list.

Other files you may want to edit:

- `src/config/pricing.js`: package names, prices, features, and which package is `recommended`
- `src/config/sampleMenu.js`: the sample restaurant shown in the phone demo (name, dishes, prices, categories)
- `src/config/story.js`: all story headlines and narration text

---

## 3. Deploy to GitHub Pages

1. Create a new GitHub repository (any name, e.g. `qr-menu`) and push this project to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-user>/<your-repo>.git
   git push -u origin main
   ```
2. On GitHub, open **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and deploys automatically on every push to `main`. You can also run it by hand from the **Actions** tab.
4. Your site will be live at `https://<your-user>.github.io/<your-repo>/`.

### How the base path works
- `vite.config.js` uses a **relative base (`./`) by default**, so the site works under any repository name without changes.
- If you prefer absolute paths, build with `BASE_PATH=/<your-repo>/ npm run build`.
- The site is a single page with `#section` links (no client-side router), so refreshing and the nav links always work on GitHub Pages.
- `SITE_URL` is filled in automatically by the workflow. It gives WhatsApp and Instagram link previews an absolute URL for `og-image.png`. If you build somewhere else, set `SITE_URL=https://<your-user>.github.io/<your-repo>/`.

### Custom domain (optional)
Add your domain under **Settings → Pages → Custom domain**. No code changes are needed.

---

## 4. Project structure

```
src/
  assets/illustrations/
    characters.jsx     Rahul, Priya, Arjun, Ramesh the waiter (one shared, pose-able SVG rig)
    backdrops.jsx      Restaurant exterior, interior, street, string lights
    props.jsx          QR code, phone, menus, counter, table, plants, food illustrations
  components/
    Navbar.jsx  StoryProgress.jsx  Story.jsx  SmartphoneMockup.jsx
    Clients.jsx  Pricing.jsx  Contact.jsx  DemoModal.jsx  Footer.jsx  FloatingWhatsApp.jsx  Logo.jsx
  scenes/
    Scene01.jsx … Scene08.jsx   SceneCanvas.jsx
  config/
    business.js  pricing.js  sampleMenu.js  story.js  clients.js
  hooks/
    useStoryProgress.js
  styles/
    global.css  animations.css
  App.jsx  main.jsx
public/
  favicon.svg  apple-touch-icon.png  og-image.png
.github/workflows/deploy.yml
```

---

## 5. How the animation engine works

- **Desktop (≥ 900px wide):** scenes 1–6 play on a **sticky stage**. `useScroll` tracks progress through a tall section, smoothed with `useSpring`. Each scene gets its own local progress (0 → 1) and a cross-fade, worked out with `useTransform` in `useSceneWindow()`. The interior backdrop is shared across scenes 2–6 and pans slowly for parallax, so it feels like one continuous world.
- **No per-frame React re-renders:** everything continuous is a `MotionValue`. Character joints (arms, walking legs) are driven by MotionValues that write SVG `transform` attributes directly (`AttrG`). React state only changes when something actually switches, such as the navbar background or the active chapter.
- **Chapter indicator:** this uses `IntersectionObserver`, not scroll listeners.
- **Mobile / tablet portrait:** a simpler stacked layout. Each chapter animates as it scrolls into view, with normal touch scrolling and no tall sticky elements.
- **`prefers-reduced-motion`:** the story switches to the stacked layout with each scene shown in a meaningful still frame, and CSS animations are turned off.

### Consistent characters
Rahul is one reusable component (`<Rahul pose expression />`) built from shared parts (`Head`, `Arm`, `Legs`). His face, hair, beard, green Nehru vest and kurta never change. Only his pose and expression do.

---

## 6. Honest product claims
The demo shows a menu website with categories, photos, descriptions, prices and contact buttons. It does **not** claim online ordering, payments or restaurant management. The action buttons in the demo phone show an explanatory "Demo:" note instead of contacting a real restaurant.

Rahul, Priya, Arjun, Ramesh and "Rahul's Rasoi" are fictional. The food images are original SVG illustrations.
