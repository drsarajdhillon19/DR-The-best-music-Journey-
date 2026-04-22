// Buy.js - place this file in same folder and DO NOT put this script in Products page
const products = {
  samplepack: {
    title: "DR Complete Sample Pack",
    price: "₹39",
    image: "certificates/DR SAMPLE PACK.png",
    description: "Get the ultimate DR Complete Sample Pack featuring high-quality samples, loops, one-shots, and FX for your next hit track.",
    file: "downloads/DR_COMPLETE_SAMPLE_PACK.zip" // optional: add actual download file path if you have one
  },
  soundpack: {
    title: "DR Sound Pack | FL Presets",
    price: "₹49",
    image: "DR css/DR SOUND PACK.png",
    description: "Premium FL Studio preset pack by DR with rich sounds, synths, and customizable tones for professional music production.",
    file: "downloads/DR_SOUND_PACK.zip"
  },
  demand: {
    title: "DR Beat | Demand |",
    price: "₹0",
    image: "certificates/DEMAND [DR Beat 1].png",
    description: "Free DR Beat 'Demand' — a creative rhythm and beat idea to inspire your next production.",
    file: "downloads/DR_BEAT_DEMAND.mp3"
  }
};

// read query param
const urlParams = new URLSearchParams(window.location.search);
const productKey = urlParams.get('product');

function showNotFound() {
  const sec = document.querySelector("#buy-section");
  sec.innerHTML = `<h2 style="text-align:center; width:100%;">Product not found</h2>`;
}

if (!productKey || !products[productKey]) {
  showNotFound();
} else {
  const product = products[productKey];

  // set DOM
  const titleEl = document.getElementById("product-title");
  const descEl = document.getElementById("product-description");
  const priceEl = document.getElementById("product-price");
  const imgEl = document.getElementById("product-image");
  const buyBtn = document.getElementById("buy-btn");
  const dlLink = document.getElementById("download-link");

  titleEl.innerText = product.title;
  descEl.innerText = product.description;
  priceEl.innerText = product.price;

  // check image exists in path — just set src (browser will show broken image if path wrong)
  imgEl.src = product.image;
  imgEl.alt = product.title;

  // if product file exists (optional), show download link for free items or redirect buy button
  if (product.file) {
    // show download link (user can click to download)
    dlLink.style.display = "inline-block";
    dlLink.href = product.file;
    dlLink.innerText = (product.price === "₹0") ? "Download" : "Preview / Download";
  } else {
    dlLink.style.display = "none";
  }

  // buy button behaviour
  buyBtn.addEventListener("click", () => {
    if (product.price === "₹0") {
      // if free, just give link or show message
      if (product.file) {
        // redirect to direct download
        window.location.href = product.file;
      } else {
        alert("This is a free product. No download file provided yet.");
      }
    } else {
      // placeholder: you can integrate payment here (Razorpay, PayPal, etc.)
      alert("Proceeding to checkout for: " + product.title + " (" + product.price + ")");
      // example: window.location.href = "checkout.html?product=" + productKey;
    }
  });
}
