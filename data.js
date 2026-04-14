// ─────────────────────────────────────────────────────────────────
//  MOSTLY PAPER — Paintings Data
//  Edit this file to update paintings, prices, and availability.
//
//  For each painting:
//    id:        unique slug (used in URLs and order data)
//    title:     display name
//    year:      year created
//    medium:    e.g. "Acrylic on canvas"
//    image:     path to image file, e.g. "images/painting-01.jpg"
//    gallery:   true = show in gallery section
//    span2:     true = this item spans 2 columns in gallery grid (use for landscape pieces)
//
//  original:
//    available: true/false
//    price:     in dollars (integer)
//    size:      physical dimensions, e.g. "16×20\""
//    note:      optional string shown at checkout, e.g. "Contact before purchase"
//
//  prints:
//    Array of size options. Each:
//      label:   display size, e.g. "8×10\""
//      price:   in dollars (integer)
//      printfulVariantId: Printful product variant ID (fill in after Printful setup)
// ─────────────────────────────────────────────────────────────────

const PAINTINGS = [
  {
    id: "untitled-01",
    title: "Untitled I",
    year: "2023",
    medium: "Acrylic on canvas",
    image: "images/painting-01.jpg",
    gallery: true,
    span2: true,
    original: {
      available: true,
      price: 1200,
      size: "18×24\"",
    },
    prints: [
      { label: "5×7\"",   price: 25,  printfulVariantId: "" },
      { label: "8×10\"",  price: 40,  printfulVariantId: "" },
      { label: "11×14\"", price: 60,  printfulVariantId: "" },
      { label: "18×24\"", price: 95,  printfulVariantId: "" },
      { label: "24×36\"", price: 140, printfulVariantId: "" },
    ]
  },
  {
    id: "untitled-02",
    title: "Untitled II",
    year: "2023",
    medium: "Acrylic on canvas",
    image: "images/painting-02.jpg",
    gallery: true,
    span2: false,
    original: {
      available: false,
      price: 1500,
      size: "16×20\"",
    },
    prints: [
      { label: "5×7\"",   price: 25,  printfulVariantId: "" },
      { label: "8×10\"",  price: 40,  printfulVariantId: "" },
      { label: "11×14\"", price: 60,  printfulVariantId: "" },
      { label: "18×24\"", price: 95,  printfulVariantId: "" },
      { label: "24×36\"", price: 140, printfulVariantId: "" },
    ]
  },
  {
    id: "untitled-03",
    title: "Untitled III",
    year: "2024",
    medium: "Acrylic on canvas",
    image: "images/painting-03.jpg",
    gallery: true,
    span2: false,
    original: {
      available: true,
      price: 1800,
      size: "20×24\"",
    },
    prints: [
      { label: "5×7\"",   price: 25,  printfulVariantId: "" },
      { label: "8×10\"",  price: 40,  printfulVariantId: "" },
      { label: "11×14\"", price: 60,  printfulVariantId: "" },
      { label: "18×24\"", price: 95,  printfulVariantId: "" },
      { label: "24×36\"", price: 140, printfulVariantId: "" },
    ]
  },
  {
    id: "untitled-04",
    title: "Untitled IV",
    year: "2024",
    medium: "Acrylic on canvas",
    image: "images/painting-04.jpg",
    gallery: true,
    span2: false,
    original: {
      available: true,
      price: 2200,
      size: "24×30\"",
    },
    prints: [
      { label: "5×7\"",   price: 25,  printfulVariantId: "" },
      { label: "8×10\"",  price: 40,  printfulVariantId: "" },
      { label: "11×14\"", price: 60,  printfulVariantId: "" },
      { label: "18×24\"", price: 95,  printfulVariantId: "" },
      { label: "24×36\"", price: 140, printfulVariantId: "" },
    ]
  },
  {
    id: "untitled-05",
    title: "Untitled V",
    year: "2024",
    medium: "Acrylic on canvas",
    image: "images/painting-05.jpg",
    gallery: true,
    span2: false,
    original: {
      available: true,
      price: 1600,
      size: "18×24\"",
    },
    prints: [
      { label: "5×7\"",   price: 25,  printfulVariantId: "" },
      { label: "8×10\"",  price: 40,  printfulVariantId: "" },
      { label: "11×14\"", price: 60,  printfulVariantId: "" },
      { label: "18×24\"", price: 95,  printfulVariantId: "" },
      { label: "24×36\"", price: 140, printfulVariantId: "" },
    ]
  },
  {
    id: "untitled-06",
    title: "Untitled VI",
    year: "2024",
    medium: "Acrylic on canvas",
    image: "images/painting-06.jpg",
    gallery: true,
    span2: false,
    original: {
      available: true,
      price: 1400,
      size: "16×20\"",
    },
    prints: [
      { label: "5×7\"",   price: 25,  printfulVariantId: "" },
      { label: "8×10\"",  price: 40,  printfulVariantId: "" },
      { label: "11×14\"", price: 60,  printfulVariantId: "" },
      { label: "18×24\"", price: 95,  printfulVariantId: "" },
      { label: "24×36\"", price: 140, printfulVariantId: "" },
    ]
  },
  {
    id: "untitled-07",
    title: "Untitled VII",
    year: "2024",
    medium: "Acrylic on canvas",
    image: "images/painting-07.jpg",
    gallery: true,
    span2: false,
    original: {
      available: true,
      price: 1900,
      size: "20×24\"",
    },
    prints: [
      { label: "5×7\"",   price: 25,  printfulVariantId: "" },
      { label: "8×10\"",  price: 40,  printfulVariantId: "" },
      { label: "11×14\"", price: 60,  printfulVariantId: "" },
      { label: "18×24\"", price: 95,  printfulVariantId: "" },
      { label: "24×36\"", price: 140, printfulVariantId: "" },
    ]
  },
  {
    id: "untitled-08",
    title: "Untitled VIII",
    year: "2024",
    medium: "Acrylic on canvas",
    image: "images/painting-08.jpg",
    gallery: true,
    span2: false,
    original: {
      available: true,
      price: 2000,
      size: "24×30\"",
    },
    prints: [
      { label: "5×7\"",   price: 25,  printfulVariantId: "" },
      { label: "8×10\"",  price: 40,  printfulVariantId: "" },
      { label: "11×14\"", price: 60,  printfulVariantId: "" },
      { label: "18×24\"", price: 95,  printfulVariantId: "" },
      { label: "24×36\"", price: 140, printfulVariantId: "" },
    ]
  },
  {
    id: "untitled-09",
    title: "Untitled IX",
    year: "2024",
    medium: "Acrylic on canvas",
    image: "images/painting-09.jpg",
    gallery: true,
    span2: false,
    original: {
      available: true,
      price: 1700,
      size: "18×24\"",
    },
    prints: [
      { label: "5×7\"",   price: 25,  printfulVariantId: "" },
      { label: "8×10\"",  price: 40,  printfulVariantId: "" },
      { label: "11×14\"", price: 60,  printfulVariantId: "" },
      { label: "18×24\"", price: 95,  printfulVariantId: "" },
      { label: "24×36\"", price: 140, printfulVariantId: "" },
    ]
  },
];
