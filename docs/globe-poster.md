# The Trackside globe still

`/trackside` shows `public/trackside/globe-poster.webp`, a still of the globe at its
opening view, until the visitor moves, taps, scrolls or presses a key. Then the live
globe (globe.gl, about 2 MB) loads and fades in over it in exactly the same place.
This keeps the first load fast. Lighthouse on mobile went from 68 to 90+.

The still has no dots; they fade in with the live globe, so adding or moving a
circuit needs no new still. Rebuild it only when the earth texture or the opening view
changes (a change to `pointOfView({ lat: 30, lng: 15, altitude: 2.4 })` in
`src/pages/trackside.astro`):

1. `npm run build && npm run preview`
2. Open `http://localhost:4321/trackside/` in Chrome with the window at 1600 x 1600 and
   reduced motion turned on (DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`),
   so the globe holds still at its opening view.
3. In DevTools, hide everything but the globe (dots included: they fade in with the live globe) and make the page see-through:

   ```css
   .topbar, .ts-intro, .ts-foot, .ts-poster, .skip-link, .ts-dot { display: none !important }
   html, body, .ts { background: transparent !important }
   .ts { height: 100vh !important }
   .ts-stage { position: fixed !important; inset: 0 !important }
   ```

4. Move the mouse once so the live globe loads, wait a few seconds, then run
   **Capture full size screenshot** (it keeps the transparency).
5. Save it as a WebP (quality 80) at `public/trackside/globe-poster.webp`, 1600 x 1600.

The image must stay square and centred, with the globe at the same size as in the
capture. The page shows it at the stage's full height, which is also how the live
globe sizes itself, so the two line up at every width.
