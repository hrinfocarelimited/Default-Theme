// Announcement Bar Remove on Scroll
window.onscroll = function () {
  const announcementBar = document.querySelector('.hr-announcement-bar');
  if (window.scrollY >= 60) {
    announcementBar.classList.add('d-none');
  } else {
    announcementBar.classList.remove('d-none');
  }
};

// Main Navigation Active Link Change Based on URL
document.addEventListener('DOMContentLoaded', function () {
  var currentPath = window.location.pathname.split("/").filter(Boolean).pop();
  var navItems = document.querySelectorAll('.hr-header-menu .nav-item .nav-link');

  navItems.forEach(function (navItem) {
    var navHref = navItem.getAttribute('href').split("/").filter(Boolean).pop();
    if (currentPath === navHref) {
      var parentNavItem = navItem.closest('li.nav-item');
      if (parentNavItem) {
        parentNavItem.classList.add('active');
      }
      var parentDropdown = navItem.closest('ul');
      while (parentDropdown) {
        var parentDropdownItem = parentDropdown.closest('li.nav-item');
        if (parentDropdownItem) {
          parentDropdownItem.classList.add('active');
        }
        parentDropdown = parentDropdownItem ? parentDropdownItem.closest('ul') : null;
      }
    }
  });
});

// Search Popup
document.querySelector('.hr-header .hr-search .hr-pop-search-btn').addEventListener('click', function () {
  document.querySelector('.hr-search-pop').classList.remove('d-none');
});

// Search Popup close
document.querySelector('.hr-search-pop .hr-pop-close .hr-close').addEventListener('click', function () {
  document.querySelector('.hr-search-pop').classList.add('d-none');
});

// Swiper Sliders Initialization
const heroSwiper = new Swiper(".hr-hero-slide", {
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  slidesPerView: 1,
  spaceBetween: 0,
  pagination: false,
});

document.addEventListener('DOMContentLoaded', function () {
  var effectSwiper = new Swiper('.hr-swiper-hero-effect', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 300,
    autoplay: { delay: 5000, disableOnInteraction: false },
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var awardsSwiper = new Swiper('.hr-swiper-slide-y', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 300,
    autoplay: { delay: 5000, disableOnInteraction: false },
    autoHeight: true,
  });
});

const testimonialSwiper = new Swiper('.hr-testimonial-slider', {
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 20,
  loop: true,
  pagination: false,
  autoplay: { delay: 5000 },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: {
    540: { slidesPerView: 1, slidesPerGroup: 1 },
    768: { slidesPerView: 2, slidesPerGroup: 1 },
    1200: { slidesPerView: 3, slidesPerGroup: 1 },
  }
});

const portfolioSwiper = new Swiper(".hr-portfolio-slide", {
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  slidesPerView: 1,
  spaceBetween: 0,
  pagination: false,
});

const portfolioFullSwiper = new Swiper(".hr-portfolio-full-slider", {
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  slidesPerView: 1,
  spaceBetween: 0,
  pagination: false,
});

// Marquee Swiper Slider
const marqueeSwiper = new Swiper('.hr-marquee', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  loop: true,
  autoplay: { delay: 0, disableOnInteraction: false },
  speed: 3000,
  grabCursor: true,
  allowTouchMove: true,
  mousewheel: true,
  on: {
    init: function () {
      const swiperEl = this.el;
      swiperEl.addEventListener('mouseenter', () => this.autoplay.stop());
      swiperEl.addEventListener('mouseleave', () => this.autoplay.start());
    },
  },
});

// Number Counters with and without Plus
document.addEventListener("DOMContentLoaded", function () {
  function animateCount(countElement, hasPlus) {
    const maxCount = parseInt(countElement.getAttribute('data-max'), 10);
    let currentCount = 0;
    const speed = 50;

    const counter = setInterval(function () {
      currentCount++;
      countElement.textContent = hasPlus ? `${currentCount}+` : currentCount;

      if (currentCount >= maxCount) clearInterval(counter);
    }, speed);
  }

  document.querySelectorAll('.hr-animation-count').forEach(element => animateCount(element, false));
  document.querySelectorAll('.hr-animation-count-plus').forEach(element => animateCount(element, true));
});

// Tabs Filter By Category
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.hr-filter-tabs .nav-link');
  const filterItems = document.querySelectorAll('.hr-filter-body .hr-filter');

  function initializeMasonry() {
    const masonryGallery = document.querySelector('.hr-filter-body .hr-masonry-gallery');
    if (masonryGallery) {
      const $grid = $(masonryGallery);
      $grid.imagesLoaded(function () {
        $grid.masonry();
      });
    }
  }

  function applyFilter(filterCategory) {
    filterItems.forEach(item => {
      if (item.getAttribute('data-category') === filterCategory || filterCategory === '*') {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    initializeMasonry();
  }

  function setDefaultFilter() {
    let defaultTab = document.querySelector('.hr-filter-tabs .nav-link[data-filter="*"]');
    if (!defaultTab) {
      // Check if the first tab is a dropdown
      const firstDropdown = document.querySelector('.hr-filter-tabs .hr-filter-inner-dropdown');
      if (firstDropdown) {
        // Get the first inner tab in the dropdown and set it as active
        defaultTab = firstDropdown.querySelector('.nav-link[data-filter]');
        if (defaultTab) {
          // Activate the first inner tab and the parent dropdown button
          defaultTab.classList.add('active');
          const parentDropdownButton = firstDropdown.previousElementSibling;
          if (parentDropdownButton) {
            parentDropdownButton.classList.add('active');
          }
          const defaultFilter = defaultTab.getAttribute('data-filter');
          applyFilter(defaultFilter);
          return;
        }
      }
      // If no dropdown, activate the first tab
      defaultTab = tabs[0];
      defaultTab.classList.add('active');
      const defaultFilter = defaultTab.getAttribute('data-filter');
      applyFilter(defaultFilter);
    } else {
      // If '*' tab exists, activate it
      defaultTab.classList.add('active');
      applyFilter('*');
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const filterCategory = tab.getAttribute('data-filter');

      // Clear active classes from all tabs
      tabs.forEach(t => t.classList.remove('active'));

      if (filterCategory) {
        // If an inner tab (with data-filter) is clicked, activate it and its parent
        tab.classList.add('active');

        const parentDropdown = tab.closest('.hr-filter-inner-dropdown');
        if (parentDropdown) {
          const dropdownParentButton = parentDropdown.previousElementSibling;
          if (dropdownParentButton) {
            dropdownParentButton.classList.add('active');
          }
        }

        applyFilter(filterCategory);
      } else {
        // If a parent dropdown without data-filter is clicked, just toggle its active state
        tab.classList.add('active');
      }
    });
  });

  // Set default filter on page load
  setDefaultFilter();
});

// Product Swiper With Zoom Effect
document.addEventListener('DOMContentLoaded', function () {
  // Thumbnail Swiper
  var galleryThumbs = new Swiper(".hr-product-thumb-swiper", {
    spaceBetween: 12,
    slidesPerView: 5,
    watchSlidesProgress: true,
    grabCursor: true,
    centeredSlides: false,
    allowTouchMove: true,
    a11y: false,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  });

  // Product Swiper
  var galleryTop = new Swiper(".hr-product-swiper", {
    spaceBetween: 12,
    loop: true,
    a11y: false,
    thumbs: {
      swiper: galleryThumbs,
    },
  });

  // Zoom Image Effect
  function initializeZoom() {
    $('.zoomContainer').remove();
    var activeImage = $('.hr-product-swiper .swiper-slide-active .hr-zoom-image');
    activeImage.elevateZoom({
      zoomType: "lens",
      lensShape: "square",
      lensSize: 250,
      scrollZoom: true
    });
  }
  galleryTop.on('slideChangeTransitionEnd', function () {
    initializeZoom();
  });
  initializeZoom();
});


// jQuery Start

$(document).ready(function () {
  // Magnific Popup for Images
  $('.hr-pop-images').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    gallery: { enabled: true, navigateByImgClick: true, preload: [0, 1] },
    image: { verticalFit: true },
  });

  // Magnific Popup for Video
  $('.hr-pop-Video').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  // Masonry Gallery Initialization
  var $grid = $('.hr-masonry-gallery').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });
  $grid.imagesLoaded().progress(function () {
    $grid.masonry();
  });

  // Password Visibility Toggle
  $('.hr-pass-view').click(function () {
    const inputField = $(this).siblings('.form-control-view');
    if (inputField.length) {
      inputField.attr('type', inputField.attr('type') === 'password' ? 'text' : 'password');
      const icon = $(this);
      if (inputField.attr('type') === 'text') {
        icon.removeClass('fa-eye').addClass('fa-eye-slash');
      } else {
        icon.removeClass('fa-eye-slash').addClass('fa-eye');
      }
    }
  });
  // Quantity change
  $('.hr-quantity-btn:first-of-type').click(function () {
    let $input = $(this).siblings('input');
    let value = parseInt($input.val());
    if (value > 1) {
      $input.val(value - 1);
    }
  });
  $('.hr-quantity-btn:last-of-type').click(function () {
    let $input = $(this).siblings('input');
    let value = parseInt($input.val());
    let max = $input.attr('max');
    if (value < max) {
      $input.val(value + 1);
    }
  });
  $('.hr-control-quantity').on('input', function () {
    let value = parseInt($(this).val());
    if (value < 1 || isNaN(value)) {
      $(this).val(1);
    }
  });
});

// Tooltip
document.querySelectorAll('.hr-tooltip').forEach(function (tooltip) {
  tooltip.addEventListener('click', function () {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltipElem = document.createElement('div');
    tooltipElem.classList.add('hr-tooltip-data');
    tooltipElem.textContent = tooltipText;
    const existingTooltip = this.querySelector('.hr-tooltip-data');
    if (existingTooltip) {
      existingTooltip.remove();
    }
    this.appendChild(tooltipElem);
    setTimeout(() => {
      tooltipElem.remove();
    }, 3000);
  });
  document.addEventListener('click', function (e) {
    if (!tooltip.contains(e.target)) {
      const existingTooltip = tooltip.querySelector('.hr-tooltip-data');
      if (existingTooltip) {
        existingTooltip.remove();
      }
    }
  });

});

// Price Range
const rangeInputs = document.querySelectorAll(".hr-range-input input");
const priceInputs = document.querySelectorAll(".hr-price-input input");
const progress = document.querySelector(".hr-progress");
const priceRangeContainer = document.querySelector(".hr-price-range");
let priceGap = parseInt(priceRangeContainer.getAttribute("data-price-gap"));

priceInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInputs[0].value),
      maxPrice = parseInt(priceInputs[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInputs[1].max) {
      if (e.target.className === "input-min") {
        rangeInputs[0].value = minPrice;
        progress.style.left = (minPrice / rangeInputs[0].max) * 100 + "%";
      } else {
        rangeInputs[1].value = maxPrice;
        progress.style.right = 100 - (maxPrice / rangeInputs[1].max) * 100 + "%";
      }
    }
  });
});
// Price Range With Price Box
rangeInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInputs[0].value),
      maxVal = parseInt(rangeInputs[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInputs[0].value = maxVal - priceGap;
      } else {
        rangeInputs[1].value = minVal + priceGap;
      }
    } else {
      priceInputs[0].value = minVal;
      priceInputs[1].value = maxVal;
      progress.style.left = (minVal / rangeInputs[0].max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeInputs[1].max) * 100 + "%";
    }
  });
});

// Update Copyright Year Dynamically
document.getElementById("copyrightYear").textContent = new Date().getFullYear();
