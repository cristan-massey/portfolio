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
/* ==========================================================
   SPEAKER CAROUSEL
   ========================================================== */

const speakerSlides = document.querySelectorAll('.speaker-slide');

let currentSpeakerSlide = 0;

if (speakerSlides.length > 0) {

    setInterval(() => {

        speakerSlides[currentSpeakerSlide]
            .classList.remove('active');

        currentSpeakerSlide++;

        if (currentSpeakerSlide >= speakerSlides.length) {
            currentSpeakerSlide = 0;
        }

        speakerSlides[currentSpeakerSlide]
            .classList.add('active');

    }, 5000);

}
