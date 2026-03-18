const express = require('express');
const router = express.Router();
const { getPageContent, getPageMeta, getSettings, getImage, getAllImages } = require('../lib/content');
const { getThemeVars } = require('../lib/theme');

function buildViewData(page) {
  const content = getPageContent(page);
  const meta = getPageMeta(page);
  const settings = getSettings();
  const images = {};
  const allImgs = getAllImages();
  for (const img of allImgs) {
    images[img.slot] = img;
  }
  return { content, meta, settings, images, page, currentYear: new Date().getFullYear() };
}

router.get('/', (req, res) => {
  res.render('pages/index', buildViewData('index'));
});

router.get('/products', (req, res) => {
  res.render('pages/products', buildViewData('products'));
});

router.get('/services', (req, res) => {
  res.render('pages/services', buildViewData('services'));
});

router.get('/about', (req, res) => {
  res.render('pages/about', buildViewData('about'));
});

router.get('/contact', (req, res) => {
  res.render('pages/contact', buildViewData('contact'));
});

router.get('/quote', (req, res) => {
  res.render('pages/quote', buildViewData('quote'));
});

const validCities = ['dublin', 'cork', 'galway', 'limerick', 'waterford'];

router.get('/locations/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  if (!validCities.includes(city)) {
    return res.status(404).send('Location not found');
  }
  const data = buildViewData(`locations/${city}`);
  data.city = city;
  data.cityName = city.charAt(0).toUpperCase() + city.slice(1);
  data.otherCities = validCities.filter(c => c !== city);
  res.render('locations/location', data);
});

module.exports = router;
