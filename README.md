# SALOON Hair Atelier

Responsive editorial salon landing page built with HTML, CSS and JavaScript. No dependencies or build step.

Run `npm run dev` and open port 3000. Run `npm run check` for JavaScript syntax validation.

The visit form stores a personal visit plan in the browser. It does not send data or confirm an appointment. Connect a booking provider before using for real appointments. Service prices, hours and location are sample business content.

Portrait: Start Bootstrap Agency sample asset (https://github.com/StartBootstrap/startbootstrap-agency). Fonts: Google Fonts DM Sans and Italiana, with local system fallbacks.

## Experience sections

Eight sections cover the animated hero, scroll-revealed introduction, service cards with details, a draggable CSS perspective bottle concept with finish selection, horizontal lookbook with image enlargement and a digital colour-study slider, animated approach numbers, a clearly labelled space for future verified client stories, and consultation/contact actions.

The bottle is a CSS concept visualization, not a loaded 3D product model. The colour comparison uses the same portrait with a digital grade and is not a before/after client result. The approach numbers describe the page's service philosophy, not customer statistics. Motion respects `prefers-reduced-motion` and content remains accessible without animation.

Set `WHATSAPP_NUMBER` in `script.js` to a verified business number (international digits only) to enable direct WhatsApp enquiries. Until configured, those buttons explain availability and offer the local visit planner. Replace sample prices, imagery and business information with approved material before publishing; add client reviews, partner marks and performance data only when verified and permitted. No backend submission is configured.

Validated with Chromium: eight sections, bottle rotation and finish selection, horizontal navigation, colour comparison slider, image enlargement, service details, contact dialog, local visit-plan storage including hair goals, and no page overflow at 390px, 768px or 1440px.

## Publication

GitHub Actions publishes the static site to GitHub Pages on pushes to `main`, or via the workflow's manual Run workflow action. In the repository Settings → Pages, select **GitHub Actions** as the build and deployment source. The deployment job publishes only HTML, styles, JavaScript and image assets. The deployment environment reports the live URL when successful.
