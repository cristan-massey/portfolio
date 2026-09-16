// Main site JavaScript
// Kept intentionally minimal and dependency-free.

console.log("Site scripts loaded.");

/* ==========================================================================
   EXPERIENCE TIMELINE (arrow-navigated carousel)
   Only runs on pages that contain a [data-timeline] element (i.e. experience.html).
   If this script fails to load, the CSS .no-js fallback shows every role
   stacked instead, so no content is ever hidden.
   ========================================================================== */

(function () {

  var timeline = document.querySelector("[data-timeline]");
  if (!timeline) {
    return; // Not on a page with a timeline, nothing to do.
  }

  var panels = Array.prototype.slice.call(
    timeline.querySelectorAll("[data-timeline-panel]")
  );
  var prevButton = timeline.querySelector("[data-timeline-prev]");
  var nextButton = timeline.querySelector("[data-timeline-next]");
  var positionLabel = timeline.querySelector("[data-timeline-position]");

  var currentIndex = 0;

  function showPanel(index) {
    panels.forEach(function (panel, i) {
      panel.hidden = i !== index;
    });

    if (positionLabel) {
      positionLabel.textContent = "Role " + (index + 1) + " of " + panels.length;
    }

    if (prevButton) {
      prevButton.disabled = index === 0;
    }

    if (nextButton) {
      nextButton.disabled = index === panels.length - 1;
    }
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex -= 1;
        showPanel(currentIndex);
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      if (currentIndex < panels.length - 1) {
        currentIndex += 1;
        showPanel(currentIndex);
      }
    });
  }

  showPanel(currentIndex);

})();

/ Main site JavaScript
// Kept intentionally minimal and dependency-free.
// This file REPLACES the entire contents of js/main.js

/* ==========================================================================
   EXPERIENCE TIMELINE (arrow-navigated career carousel)
   Only runs on pages containing [data-timeline] (experience.html).
   ========================================================================== */

(function () {
  var timeline = document.querySelector("[data-timeline]");
  if (!timeline) {
    return;
  }

  var panels = Array.prototype.slice.call(
    timeline.querySelectorAll("[data-timeline-panel]")
  );
  var prevButton = timeline.querySelector("[data-timeline-prev]");
  var nextButton = timeline.querySelector("[data-timeline-next]");
  var positionLabel = timeline.querySelector("[data-timeline-position]");

  var currentIndex = 0;

  function showPanel(index) {
    panels.forEach(function (panel, i) {
      panel.hidden = i !== index;
    });

    if (positionLabel) {
      positionLabel.textContent = "Role " + (index + 1) + " of " + panels.length;
    }

    if (prevButton) {
      prevButton.disabled = index === 0;
    }

    if (nextButton) {
      nextButton.disabled = index === panels.length - 1;
    }
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex -= 1;
        showPanel(currentIndex);
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      if (currentIndex < panels.length - 1) {
        currentIndex += 1;
        showPanel(currentIndex);
      }
    });
  }

  showPanel(currentIndex);
})();

// Main site JavaScript
// Kept intentionally minimal and dependency-free.
// This file REPLACES the entire contents of js/main.js

(function () {
  "use strict";

  // Run setup once the DOM is ready, regardless of where this script is loaded.
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  /* ========================================================================
     EXPERIENCE TIMELINE (arrow-navigated career carousel)
     Only runs on pages containing [data-timeline] (experience.html).
     ======================================================================== */

  function initTimeline() {
    var timeline = document.querySelector("[data-timeline]");
    if (!timeline) {
      return;
    }

    var panels = Array.prototype.slice.call(
      timeline.querySelectorAll("[data-timeline-panel]")
    );
    if (panels.length === 0) {
      return;
    }

    var prevButton = timeline.querySelector("[data-timeline-prev]");
    var nextButton = timeline.querySelector("[data-timeline-next]");
    var positionLabel = timeline.querySelector("[data-timeline-position]");

    var currentIndex = 0;

    function showPanel(index) {
      panels.forEach(function (panel, i) {
        panel.hidden = i !== index;
      });

      if (positionLabel) {
        positionLabel.textContent =
          "Role " + (index + 1) + " of " + panels.length;
      }

      if (prevButton) {
        prevButton.disabled = index === 0;
      }

      if (nextButton) {
        nextButton.disabled = index === panels.length - 1;
      }
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
          currentIndex -= 1;
          showPanel(currentIndex);
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        if (currentIndex < panels.length - 1) {
          currentIndex += 1;
          showPanel(currentIndex);
        }
      });
    }

    showPanel(currentIndex);
  }

  /* ========================================================================
     SPEAKER CAROUSEL (Thinking & Speaking page)
     Shows one image at a time and cross-fades between them.
     Auto-rotates every 6 seconds. Arrows allow manual control.
     Auto-rotation pauses on hover and stops once the arrows are used.
     ======================================================================== */

  function initSpeakerCarousel() {
    var carousel = document.querySelector("[data-speaker-carousel]");
    if (!carousel) {
      console.log("[carousel] No [data-speaker-carousel] element found.");
      return;
    }

    var slides = Array.prototype.slice.call(
      carousel.querySelectorAll(".speaker-slide")
    );

    console.log("[carousel] Found " + slides.length + " slides.");

    if (slides.length < 2) {
      return;
    }

    var prevButton = carousel.querySelector("[data-speaker-prev]");
    var nextButton = carousel.querySelector("[data-speaker-next]");
    var status = carousel.querySelector("[data-speaker-status]");

    var current = 0;
    var timer = null;
    var userTookControl = false;

    function show(index) {
      slides.forEach(function (slide, i) {
        if (i === index) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });

      if (status) {
        status.textContent = "Image " + (index + 1) + " of " + slides.length;
      }
    }

    function next() {
      current = (current + 1) % slides.length;
      show(current);
    }

    function previous() {
      current = (current - 1 + slides.length) % slides.length;
      show(current);
    }

    function startAuto() {
      if (timer === null && !userTookControl) {
        timer = window.setInterval(next, 6000);
      }
    }

    function pauseAuto() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function stopAutoPermanently() {
      pauseAuto();
      userTookControl = true;
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        stopAutoPermanently();
        next();
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        stopAutoPermanently();
        previous();
      });
    }

    // Pause while the visitor is hovering, so they can look at an image.
    carousel.addEventListener("mouseenter", pauseAuto);
    carousel.addEventListener("mouseleave", startAuto);

    show(current);
    startAuto();

    console.log("[carousel] Auto-rotation started.");
  }

  ready(function () {
    initTimeline();
    initSpeakerCarousel();
  });
})();


  show(current);
})();

