const PAINTINGS = [
  {
    id: "untitled-01",
    title: "Untitled I",
    year: "2023",
    medium: "Oil on canvas",
    image: "painting-01.jpg",
    category: "painting",
    gallery: true,
    span2: true,
    original: { available: true, price: 1200, size: "18x24" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "69defba9454192" },
      { label: "11x14", price: 50,  printfulVariantId: "69defba9454071" },
      { label: "18x24", price: 80,  printfulVariantId: "69defba94540f1" },
      { label: "24x36", price: 100, printfulVariantId: "69defba9454147" }
    ]
  },
  {
    id: "untitled-02",
    title: "Untitled II",
    year: "2023",
    medium: "Oil on canvas",
    image: "painting-02.jpg",
    category: "painting",
    gallery: true,
    span2: false,
    original: { available: true, price: 1500, size: "16x20" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "69defe70ebd441" },
      { label: "11x14", price: 50,  printfulVariantId: "69defe70ebd282" },
      { label: "18x24", price: 80,  printfulVariantId: "69defe70ebd336" },
      { label: "24x36", price: 100, printfulVariantId: "69defe70ebd3b2" }
    ]
  },
  {
    id: "untitled-03",
    title: "Untitled III",
    year: "2024",
    medium: "Oil on canvas",
    image: "painting-03.jpg",
    category: "painting",
    gallery: true,
    span2: false,
    original: { available: true, price: 1800, size: "20x24" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "69deff29bb1014" },
      { label: "11x14", price: 50,  printfulVariantId: "69deff29bb0f17" },
      { label: "18x24", price: 80,  printfulVariantId: "69deff29bb0f79" },
      { label: "24x36", price: 100, printfulVariantId: "69deff29bb0fc1" }
    ]
  },
  {
    id: "untitled-04",
    title: "Untitled IV",
    year: "2024",
    medium: "Oil on canvas",
    image: "painting-04.jpg",
    category: "painting",
    gallery: true,
    span2: false,
    original: { available: true, price: 2200, size: "24x30" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "69deffdb150cb5" },
      { label: "11x14", price: 50,  printfulVariantId: "69deffdb150bb3" },
      { label: "18x24", price: 80,  printfulVariantId: "69deffdb150c29" },
      { label: "24x36", price: 100, printfulVariantId: "69deffdb150c71" }
    ]
  },
  {
    id: "untitled-05",
    title: "Untitled V",
    year: "2024",
    medium: "Oil on canvas",
    image: "painting-05.jpg",
    category: "painting",
    gallery: true,
    span2: false,
    original: { available: true, price: 1600, size: "18x24" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "69df0091a149a4" },
      { label: "11x14", price: 50,  printfulVariantId: "69df0091a147d7" },
      { label: "18x24", price: 80,  printfulVariantId: "69df0091a14882" },
      { label: "24x36", price: 100, printfulVariantId: "69df0091a14919" }
    ]
  },
  {
    id: "untitled-06",
    title: "Untitled VI",
    year: "2024",
    medium: "Oil on canvas",
    image: "painting-06.jpg",
    category: "painting",
    gallery: true,
    span2: false,
    original: { available: true, price: 1400, size: "16x20" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "69df0103a88334" },
      { label: "11x14", price: 50,  printfulVariantId: "69df0103a88236" },
      { label: "18x24", price: 80,  printfulVariantId: "69df0103a882a8" },
      { label: "24x36", price: 100, printfulVariantId: "69df0103a882e4" }
    ]
  },
  {
    id: "untitled-07",
    title: "Untitled VII",
    year: "2024",
    medium: "Oil on canvas",
    image: "painting-07.jpg",
    category: "painting",
    gallery: true,
    span2: false,
    original: { available: true, price: 1900, size: "20x24" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "69df01677eb196" },
      { label: "11x14", price: 50,  printfulVariantId: "69df01677eb071" },
      { label: "18x24", price: 80,  printfulVariantId: "69df01677eb0e9" },
      { label: "24x36", price: 100, printfulVariantId: "69df01677eb147" }
    ]
  },
  {
    id: "untitled-08",
    title: "Untitled VIII",
    year: "2024",
    medium: "Oil on canvas",
    image: "painting-08.jpg",
    category: "painting",
    gallery: true,
    span2: false,
    original: { available: true, price: 2000, size: "24x30" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "69df023f945017" },
      { label: "11x14", price: 50,  printfulVariantId: "69df023f944ee8" },
      { label: "18x24", price: 80,  printfulVariantId: "69df023f944f45" },
      { label: "24x36", price: 100, printfulVariantId: "69df023f944fd6" }
    ]
  },
  {
    id: "untitled-09",
    title: "Untitled IX",
    year: "2024",
    medium: "Oil on canvas",
    image: "painting-09.jpg",
    category: "painting",
    gallery: true,
    span2: false,
    original: { available: true, price: 1700, size: "18x24" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "69df01d697a7d8" },
      { label: "11x14", price: 50,  printfulVariantId: "69df01d697a6b5" },
      { label: "18x24", price: 80,  printfulVariantId: "69df01d697a736" },
      { label: "24x36", price: 100, printfulVariantId: "69df01d697a784" }
    ]
  },
  {
    id: "drawing-01",
    title: "Drawing I",
    year: "2024",
    medium: "Ink on paper",
    image: "drawing-01.jpg",
    category: "drawing",
    gallery: true,
    span2: false,
    original: { available: true, price: 300, size: "9x12" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "" },
      { label: "11x14", price: 50,  printfulVariantId: "" },
      { label: "18x24", price: 80,  printfulVariantId: "" },
      { label: "24x36", price: 100, printfulVariantId: "" }
    ]
  },
  {
    id: "drawing-02",
    title: "Drawing II",
    year: "2024",
    medium: "Ink on paper",
    image: "drawing-02.jpg",
    category: "drawing",
    gallery: true,
    span2: false,
    original: { available: true, price: 300, size: "9x12" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "" },
      { label: "11x14", price: 50,  printfulVariantId: "" },
      { label: "18x24", price: 80,  printfulVariantId: "" },
      { label: "24x36", price: 100, printfulVariantId: "" }
    ]
  },
  {
    id: "drawing-03",
    title: "Drawing III",
    year: "2024",
    medium: "Ink on paper",
    image: "drawing-03.jpg",
    category: "drawing",
    gallery: true,
    span2: false,
    original: { available: true, price: 300, size: "9x12" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "" },
      { label: "11x14", price: 50,  printfulVariantId: "" },
      { label: "18x24", price: 80,  printfulVariantId: "" },
      { label: "24x36", price: 100, printfulVariantId: "" }
    ]
  },
  {
    id: "drawing-04",
    title: "Drawing IV",
    year: "2024",
    medium: "Ink on paper",
    image: "drawing-04.jpg",
    category: "drawing",
    gallery: true,
    span2: false,
    original: { available: true, price: 300, size: "9x12" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "" },
      { label: "11x14", price: 50,  printfulVariantId: "" },
      { label: "18x24", price: 80,  printfulVariantId: "" },
      { label: "24x36", price: 100, printfulVariantId: "" }
    ]
  },
  {
    id: "drawing-05",
    title: "Drawing V",
    year: "2024",
    medium: "Ink on paper",
    image: "drawing-05.jpg",
    category: "drawing",
    gallery: true,
    span2: false,
    original: { available: true, price: 300, size: "9x12" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "" },
      { label: "11x14", price: 50,  printfulVariantId: "" },
      { label: "18x24", price: 80,  printfulVariantId: "" },
      { label: "24x36", price: 100, printfulVariantId: "" }
    ]
  },
  {
    id: "drawing-06",
    title: "Drawing VI",
    year: "2024",
    medium: "Ink on paper",
    image: "drawing-06.jpg",
    category: "drawing",
    gallery: true,
    span2: false,
    original: { available: true, price: 300, size: "9x12" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "" },
      { label: "11x14", price: 50,  printfulVariantId: "" },
      { label: "18x24", price: 80,  printfulVariantId: "" },
      { label: "24x36", price: 100, printfulVariantId: "" }
    ]
  },
  {
    id: "drawing-07",
    title: "Drawing VII",
    year: "2024",
    medium: "Ink on paper",
    image: "drawing-07.jpg",
    category: "drawing",
    gallery: true,
    span2: false,
    original: { available: true, price: 300, size: "9x12" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "" },
      { label: "11x14", price: 50,  printfulVariantId: "" },
      { label: "18x24", price: 80,  printfulVariantId: "" },
      { label: "24x36", price: 100, printfulVariantId: "" }
    ]
  },
  {
    id: "drawing-08",
    title: "Drawing VIII",
    year: "2024",
    medium: "Ink on paper",
    image: "drawing-08.jpg",
    category: "drawing",
    gallery: true,
    span2: false,
    original: { available: true, price: 300, size: "9x12" },
    prints: [
      { label: "8x10",  price: 30,  printfulVariantId: "" },
      { label: "11x14", price: 50,  printfulVariantId: "" },
      { label: "18x24", price: 80,  printfulVariantId: "" },
      { label: "24x36", price: 100, printfulVariantId: "" }
    ]
  }
];
