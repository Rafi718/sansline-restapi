/**
* Template Name: Aubertify
* Updated: Okt 22 2023 with Bootstrap v5.3.2
* Author: Clayza Aubert
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

 // Copyright1
 $(document).ready(function () {
  // Simpan teks awal dalam variabel
  var currentYear = new Date().getFullYear();
  var companyName = '<a href="https://sanslinedev.tech" target="_blank" title="css templates">Sansline Rest Api</a>';
  var author = '<a href="https://sanslinedev.tech" target="_blank" title="css templates">Sansline</a>';
  var initialCopyrightText = 'Copyright © ' + currentYear + ' ' + companyName + '. All Rights Reserved';
  var initialProjectText = 'Project By ' + author;

  // Set teks awal
  $("#copyright11").html(initialCopyrightText);
  $("#project").html(initialProjectText); // Menggunakan .html() untuk tautan

  // Event handler ketika teks di dalam elemen diubah
  $("#project").on("click", function () {
    // Periksa apakah teks telah berubah
    if ($(this).html() !== initialProjectText) {
      // Gantikan teks dengan teks awal jika diubah
      $(this).html(initialProjectText);

      // Redirect ke tautan tertentu
      window.location.href = "https://clayzaaubert.my.id";
    }
  });

  // Cek apakah elemen "copyright" ada
  if ($("#copyright11").length === 0) {
    // Jika tidak ada, tambahkan elemen dengan id "copyright" ke dalam div "copyright"
    $(".copyright").append('<span id="copyright11">' + initialCopyrightText + '</span>');
  }

  // Cek apakah elemen "project" ada
  if ($("#project").length === 0) {
    // Jika tidak ada, tambahkan elemen dengan id "project" ke dalam div "credits"
    $(".credits").append('<span id="project">' + initialProjectText + '</span>');
  }
});