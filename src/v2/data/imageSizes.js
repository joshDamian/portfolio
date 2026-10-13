/* ---------------------------------------------------------------------------
   Intrinsic image dimensions, measured from the files with a PNG/JPEG header
   reader (not estimated). Two jobs:

     1. width/height attributes so nothing shifts as images decode. v1 sets no
        dimensions on any <img>, so every card reflows mid-scroll.
     2. Deciding which gallery figures span both columns.

   The right long-term home for this is projects.json itself (or a build step
   that emits srcset). A lookup table is the low-risk intermediate step — it
   touches no existing data shape that v1 depends on.
--------------------------------------------------------------------------- */

export const CARD_SIZES = {
  "/project-images/bench/cover-chrome.png": [3200, 2000],
  "/project-images/bench/c4-container.png": [3360, 2060],
  "/project-images/bench/c4-component.png": [3440, 2544],
  "/project-images/useazza-framed.png": [4320, 2700],
  "/project-images/globachain-merchant/cover.jpeg": [5088, 3248],
  "/project-images/globachain-ramps-widget.png": [2560, 1600],
  "/project-images/taas.png": [2150, 1598],
  "/project-images/shiga-digital/cover.png": [2880, 2414],
  "/project-images/plotpeer/cover.png": [1512, 982],
  "/project-images/mintero.png": [5120, 3200],
  "/project-images/duo-wallet-framed.png": [2617, 1771],
  "/project-images/uwazi.png": [1878, 1328],
  "/project-images/tixhive.png": [4300, 2432],
  "/project-images/avc-blue.png": [2660, 1428],
  "/project-images/solsmurfs.png": [2433, 1505],
};

export const GALLERY_SIZES = {
  "/project-images/bench/gallery/add_a_project.png": [3200, 2000],
  "/project-images/bench/gallery/open_a_folder.png": [3200, 2000],
  "/project-images/bench/gallery/project_and_tasks.png": [3200, 2000],
  "/project-images/bench/gallery/approve_an_edit.png": [3200, 2000],
  "/project-images/bench/gallery/from_your_phone.png": [3200, 2000],
  "/project-images/bench/gallery/everything_waiting_on_you.png": [3200, 2000],
  "/project-images/bench/gallery/review_the_plan.png": [3200, 2000],
  "/project-images/bench/gallery/task_finished.png": [3200, 2000],
  "/project-images/bench/gallery/review_the_changes.png": [3200, 2000],
  "/project-images/bench/gallery/pair_a_phone.png": [3200, 2000],
  "/project-images/bench/gallery/pick_a_theme.png": [3200, 2000],
  "/project-images/bench/gallery/dashboard.png": [3200, 2000],
  "/project-images/globachain-merchant/showcase/app_dashboard_full.jpeg": [2810, 2534],
  "/project-images/globachain-merchant/showcase/app_transactions_full.jpeg": [2810, 2752],
  "/project-images/globachain-merchant/showcase/app_transactions_refunds_full.jpeg": [2810, 2108],
  "/project-images/globachain-merchant/showcase/app_settings.jpeg": [5088, 3248],
  "/project-images/globachain-merchant/showcase/app_settings_withdrawal-settings.jpeg": [5088, 3248],
  "/project-images/globachain-merchant/showcase/app_withdrawals.jpeg": [5088, 3248],
  "/project-images/globachain-merchant/showcase/payments.jpeg": [5088, 3248],
  "/project-images/globachain-merchant/showcase/payments_collect.jpeg": [5088, 3248],
  "/project-images/globachain-merchant/showcase/payments_refunds_request.jpeg": [5088, 3248],
  "/project-images/shiga-digital/cover.png": [2880, 2414],
  "/project-images/shiga-digital/showcase/asset_info.png": [2880, 2372],
  "/project-images/shiga-digital/showcase/tx_history.png": [2880, 2220],
  "/project-images/shiga-digital/showcase/crypto_deposit.png": [2191, 1101],
  "/project-images/shiga-digital/showcase/fiat_bank_deposit.png": [1440, 1101],
  "/project-images/shiga-digital/showcase/withdraw_beneficiary.png": [3218, 2202],
  "/project-images/shiga-digital/showcase/withdraw_success.png": [2880, 2202],
  "/project-images/shiga-digital/showcase/beneficiaries.png": [1440, 1110],
  "/project-images/plotpeer/showcase/marketplace.png": [1512, 1408],
  "/project-images/plotpeer/showcase/marketplace_property.png": [1512, 1326],
  "/project-images/plotpeer/showcase/marketplace_property_buy.png": [1512, 1277],
  "/project-images/plotpeer/showcase/wallet_funding.png": [4102, 1964],
  "/project-images/plotpeer/showcase/property_management.png": [1512, 1274],
};

/* 16:10 is the dominant ratio in this set, so it is the safest fallback. */
const FALLBACK = [1600, 1000];

export function cardSize(path) {
  return CARD_SIZES[path] || FALLBACK;
}

export function gallerySize(path) {
  return GALLERY_SIZES[path] || FALLBACK;
}
