// The design's props panel (Belli Landing Page v6.dc.html, data-props). Edit here, then rebuild.
export const config = {
  // Program Perintis
  slotsLeft: 5, // update by hand when a Perintis slot is taken
  whatsappNumber: '085726202606', // local (08…) or international (628…), both work
  // Harga
  billing: 'bulanan' as 'bulanan' | 'tahunan',
  showMulaiTier: true,
  jualanStatus: 'segera' as 'segera' | 'live',
  // Cara mulai
  showCaraMulai: true,
  // Dashboard slider
  autoplay: true,
  // Style
  showStickers: true,
  // Not in the design's panel
  email: 'iqbalhamdani27@gmail.com', // footer, Kontak, Kebijakan Privasi
  // Web3Forms access key for the Kontak form. Public by design: it only lets this site send to the inbox it was made for.
  web3formsKey: '870051e8-912f-4994-865a-3d28771a5b16',
  // Demo shop: belli.id links to admin.belli.id/login?u=…&p=…, which signs straight in (new-commerce-web PR #32).
  demo: { email: 'viewer@demo.belli.id', password: 'DKPGAK552YSXBEUPU4XWXTWG4S' },
  gaId: 'G-41WX3FX8QM', // GA4 measurement id, e.g. 'G-XXXXXXX'; empty = no analytics
};

export const slotsText = String(config.slotsLeft);
// wa.me needs the international form: 0857… becomes 62857….
export const waNumber = config.whatsappNumber.replace(/\D/g, '').replace(/^0/, '62');
// For display: 0857 2620 2606.
export const waDisplay = ('0' + waNumber.slice(2)).replace(/(\d{4})(?=\d)/g, '$1 ');
export const waHref = 'https://wa.me/' + waNumber;
export const demoHref = `https://admin.belli.id/login?u=${encodeURIComponent(config.demo.email)}&p=${encodeURIComponent(config.demo.password)}`;
export const jualanLive = config.jualanStatus === 'live';
