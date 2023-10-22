

document.addEventListener("DOMContentLoaded", function() {
  function animateSkillPer(skillPer) {
    var percentage = parseInt(skillPer.getAttribute("percentage"), 10);
    skillPer.style.width = percentage + "%";

    var animatedValue = 0;
    var startTime = null;
    var duration = 1300;

    function animate(time) {
      if (!startTime) startTime = time;
      var progress = time - startTime;
      var percentageValue = Math.floor((progress / duration) * percentage);
      skillPer.setAttribute("percentage", percentageValue);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  function handleIntersection(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateSkillPer(entry.target);
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }

  var observer = new IntersectionObserver(handleIntersection);

  var skillPers = document.querySelectorAll(".skill-per");
  skillPers.forEach(function(skillPer) {
    observer.observe(skillPer);
  });
});