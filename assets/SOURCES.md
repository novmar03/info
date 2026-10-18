# Fonts and brand assets

Assets are stored locally; the website makes no runtime requests to font or logo CDNs.
Brand marks identify the actual organisations and contact destinations in this portfolio. Brand rights remain with their respective owners.

- **Golos Text variable font, Cyrillic and Latin:** `@fontsource-variable/golos-text@5.2.8`, downloaded from jsDelivr. SIL Open Font License is included in `fonts/OFL.txt`. https://github.com/fontsource/fontsource
- **Telegram, LinkedIn, GitHub:** original SVG paths from `simple-icons@11`, via https://cdn.jsdelivr.net/npm/simple-icons@11/icons/. Library license included in `logos/SIMPLE-ICONS-LICENSE.md`. Displayed in white using CSS on the dark background; paths are unmodified.
- **CloudPayments:** image from the official CloudPayments SDK repository, revision `5ffbaa20337bcff970f506cdf3b4535f1cdc78f7`, `demo/demo/Resources/Assets/Assets.xcassets/Logo/Logo.imageset/Logo 1.png`. https://github.com/cloudpayments/CloudPayments-SDK-iOS
- **Сбер:** current circle/checkmark SVG from the official Salute developers Plasma library, revision `d335a3bb78b758a1d23b684f5e54176fc368b087`, `packages/plasma-icons/src/scalable/Icon.svg.24/Sber.svg`. License included in `logos/SBER-LICENSE.txt`. https://github.com/salute-developers/plasma
- **МГУ:** existing main-building silhouette `gzlogo.png` from the MSU thesis template, revision `dea5350bd0c4cac6f72e1554421e31d9cb66787d`. This is a building mark, not a claim that the file is the university's official seal. https://github.com/SweetVishnya/msu-thesis

## Pending personal content

The two `.pet-project` articles in `index.html` intentionally await the owner's screenshots, descriptions and repository links. They have no fabricated project claims or dead repository buttons.

The `.photo-gallery` in the «Вне работы» section awaits the owner's photographs. Replace its three empty slots with `<figure><img ...></figure>` elements. The grid supports a large leading photograph and smaller adjacent images, stacking on mobile. Choose `object-position` per supplied photo to preserve the subject. Do not substitute stock photographs for the owner’s life.
