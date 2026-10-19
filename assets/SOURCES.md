# Fonts and brand assets

Assets are stored locally; the website makes no runtime requests to font or logo CDNs.
Brand marks identify the actual organisations and contact destinations in this portfolio. Brand rights remain with their respective owners.

- **Golos Text variable font, Cyrillic and Latin:** `@fontsource-variable/golos-text@5.2.8`, downloaded from jsDelivr. SIL Open Font License is included in `fonts/OFL.txt`. https://github.com/fontsource/fontsource
- **Telegram, LinkedIn, GitHub:** original SVG paths from `simple-icons@11`, via https://cdn.jsdelivr.net/npm/simple-icons@11/icons/. Library license included in `logos/SIMPLE-ICONS-LICENSE.md`. Displayed in white using CSS on the dark background; paths are unmodified.
- **CloudPayments:** image from the official CloudPayments SDK repository, revision `5ffbaa20337bcff970f506cdf3b4535f1cdc78f7`, `demo/demo/Resources/Assets/Assets.xcassets/Logo/Logo.imageset/Logo 1.png`. https://github.com/cloudpayments/CloudPayments-SDK-iOS
- **Сбер:** current circle/checkmark SVG from the official Salute developers Plasma library, revision `d335a3bb78b758a1d23b684f5e54176fc368b087`, `packages/plasma-icons/src/scalable/Icon.svg.24/Sber.svg`. License included in `logos/SBER-LICENSE.txt`. https://github.com/salute-developers/plasma
- **МГУ:** existing main-building silhouette `gzlogo.png` from the MSU thesis template, revision `dea5350bd0c4cac6f72e1554421e31d9cb66787d`. This is a building mark, not a claim that the file is the university's official seal. https://github.com/SweetVishnya/msu-thesis

## Portfolio media and current changes

- `photos/maria-portrait.png`: background removed from the user's supplied portrait with the image editing tool. Transparent PNG; original generated output is retained outside the repository.
- `projects/documentation.png` and `projects/demo-shop.png`: browser screenshots of the user's actual repositories served locally. They are not reproductions of the attached screenshots. Repository links: https://github.com/novmar03/CloudPayments_documentation and https://github.com/novmar03/demo-shop.
- `logos/cloudpayments.svg`: unmodified circular brand SVG from `CloudPayments_documentation/static/favicon.svg`. Replaces the older full wordmark in the experience section.
- `favicon.svg`: custom vector monogram combining the Cyrillic initials М and Н, designed for this portfolio.

## Pending original photographs

The chat shows the supplied photographs but did not expose their original files to the execution workspace. Sports images and the graduation image must be copied from an uploaded archive; do not generate replacements for them.

The carousel is hidden in the published page until the original files are available. Remove its `hidden` attribute after adding the photographs. It has seven prepared figures, identified by `data-photo`: `running-city`, `rowing`, `snowboarding`, `running-half`, `running-night`, `team-podium`, `team-msu`. Replace each `.sports-photo-pending` with the corresponding original image. Preserve whole frames for rowing and group photos. `object-fit: contain` avoids cropping people. Native scroll snapping supports touch and no-JavaScript use; buttons and keyboard controls are implemented.

Add the supplied diploma photograph in the education section using `.education-photo`. The original markup has not yet been replaced with a broken image reference.
