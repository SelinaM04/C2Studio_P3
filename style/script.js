var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
})

document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const introHeading = document.querySelector('.intro h2');
    
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          introHeading.style.opacity = 1;
          introHeading.style.transform = 'translateX(0)';
          introHeading.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
        } else {
          introHeading.style.opacity = 0;
          introHeading.style.transform = 'translateX(100%)';
        }
      });
    }, { threshold: [1] }); 
  
    observer.observe(document.querySelector(".intro"));
  });
  
const chartData = {
    "American": [
        { "C": 6.3, "B": 3.5, "A": 88 },
        { "C": 3.6, "B": 4.4, "A": 90.4 },
        { "C": 4.5, "B": 8.6, "A": 84.4 },
        { "C": 2.4, "B": 6.8, "A": 60.4 }
    ],
    "Chinese": [
        { "C": 11.2, "B": 8.6, "A": 79.7 },
        { "C": 3.6, "B": 15.7, "A": 77.6 },
        { "C": 8.6, "B": 17.4, "A": 69.6 },
        { "C": 6.8, "B": 8.5, "A": 42.5 }
    ],
  
    "Mexican": [
        { "C": 8.18, "B": 5.91, "A": 82.73 },
        { "C": 11.33, "B": 17.97, "A": 67.03 },
        { "C": 10.56, "B": 20.38, "A": 55 },
        { "C": 5.65, "B": 6.96, "A": 47.68 }
    ],
    "Caribbean": [
        { "C": 9, "B": 11.7, "A": 74 },
        { "C": 15, "B": 17.7, "A": 62.7 },
        { "C": 13.1, "B": 18.6, "A": 55.2 },
        { "C": 6.3, "B": 7.5, "A": 44.1 }
    ],
    "Japanese": [
        { "C": 0, "B": 7.82, "A": 87.71 },
        { "C": 7.52, "B": 14.41, "A": 73.65 },
        { "C": 6.57, "B": 19.29, "A": 54.37 },
        { "C": 4.47, "B": 5.82, "A": 40.73 }
    ],
    
};

function updateChart(area) {
    const dataSets = chartData[area];
    dataSets.forEach((data, index) => {
        const total = data.C + data.B + data.A;
        const cHeight = (data.C / total) * 100;
        const bHeight = (data.B / total) * 100;
        const aHeight = (data.A / total) * 100;

        const cBar = document.querySelectorAll('.c-grade')[index];
        const bBar = document.querySelectorAll('.b-grade')[index];
        const aBar = document.querySelectorAll('.a-grade')[index];

        cBar.style.height = `${cHeight}%`;
        bBar.style.height = `${bHeight}%`;
        aBar.style.height = `${aHeight}%`;

        cBar.textContent = `C - ${data.C}%`;
        bBar.textContent = `B - ${data.B}%`;
        aBar.textContent = `A - ${data.A}%`;
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buttons div a');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active')); 
            this.classList.add('active'); 
            updateChart(this.textContent.trim());
        });
    });
});


document.querySelectorAll('.buttons div a').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.buttons div a').forEach(b => b.classList.remove('active')); 
        this.classList.add('active'); 
        const area = this.textContent.trim();
        const dataSets = chartData[area];
        dataSets.forEach((data, index) => {
            const total = data.C + data.B + data.A;
            const cHeight = (data.C / total) * 100;
            const bHeight = (data.B / total) * 100;
            const aHeight = (data.A / total) * 100;

            const cBar = document.querySelectorAll('.c-grade')[index];
            const bBar = document.querySelectorAll('.b-grade')[index];
            const aBar = document.querySelectorAll('.a-grade')[index];

            animateHeightChange(cBar, cHeight);
            animateHeightChange(bBar, bHeight);
            animateHeightChange(aBar, aHeight);

            cBar.textContent = `C - ${data.C}%`;
            bBar.textContent = `B - ${data.B}%`;
            aBar.textContent = `A - ${data.A}%`;
        });
    });
});

function animateHeightChange(element, newHeight) {
    const currentHeight = parseFloat(element.style.height) || 0;
    const frameRate = 25;
    const frame = (newHeight - currentHeight) / frameRate;
    let currentFrame = 0;

    const intervalId = setInterval(() => {
        if (currentFrame < frameRate) {
            element.style.height = `${parseFloat(element.style.height) + frame}%`;
            currentFrame++;
        } else {
            clearInterval(intervalId);
            element.style.height = `${newHeight}%`; 
        }
    }, 25);
}

document.addEventListener("DOMContentLoaded", function() {
    const recommandHeading = document.querySelector('.recommand h2');
    
    var recommandObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          recommandHeading.style.opacity = 1;
          recommandHeading.style.transform = 'translateX(0)';
          recommandHeading.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
        } else {
   
          recommandHeading.style.opacity = 0;
          recommandHeading.style.transform = 'translateX(-100%)';
        }
      });
    }, { threshold: [0.5] }); 
  
    recommandObserver.observe(document.querySelector(".recommand"));
  });
  



  const APP_TOKEN = 'I6P0LofetlBLmwW5IbfTd2iye';  
  const DATASET_IDENTIFIER = '43nn-pn8j';  
  const LIMIT = 10; 
  
  function searchByZipCode() {
      const zipInput = document.querySelector('.search input');
      const zipCode = zipInput.value.trim();
      if (!zipCode) {
          alert("Please enter a ZIP code.");
          return;
      }
  
      const url = `https://data.cityofnewyork.us/resource/${DATASET_IDENTIFIER}.json?$$app_token=${APP_TOKEN}&$limit=${LIMIT}&zipcode=${zipCode}`;
  
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              displayResults(data);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              alert(`Failed to fetch data: ${error.message}`);
          });
  }
  
  function displayResults(data) {
    const resultsContainer = document.getElementById('resultsContainer'); 
    let resultsHTML = '';

    if (data.length === 0) {
        resultsHTML += '<p>No results found for this ZIP code.</p>';
    } else {
        resultsHTML += '<div style="text-align: left;">';
        data.forEach((restaurant, index) => {
            if (['A', 'B', 'C'].includes(restaurant.grade)) {
                resultsHTML += `<div>
                    <h5>- ${restaurant.dba} (Grade: ${restaurant.grade})</h5>
                    <p>Address: ${restaurant.building} ${restaurant.street}, ${restaurant.boro}</p>
                    <p>Cuisine: ${restaurant.cuisine_description}</p>
                    <p>Last Inspection Date: ${restaurant.inspection_date}</p>
                    <p>Violations: ${restaurant.violation_description || 'No violations reported'}</p>
                </div>`;
            }
        });
        resultsHTML += '</div>';
    }

    resultsContainer.innerHTML = resultsHTML; 
}

document.querySelector('.search input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchByZipCode();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const icon = document.querySelector('.zip-code-icon');
    const zipCodeSection = document.querySelector('.search'); // Assuming '.search' is the container for the zip code section
  
    function slideInElement(element) {
      let start = null;
      const initialPosition = -100; // Start off-screen to the left
      const endPosition = 0; // End position at the initial spot
  
      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const currentPosition = Math.min(initialPosition + progress / 10, endPosition);
  
        element.style.transform = `translateX(${currentPosition}px)`;
  
        if (currentPosition < endPosition) {
          window.requestAnimationFrame(step);
        }
      }
  
      window.requestAnimationFrame(step);
    }
  
    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          slideInElement(icon);  
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.5  
    });
  
    observer.observe(zipCodeSection);  
  });
  
  
  
document.addEventListener("DOMContentLoaded", function() {
    const summaryHeadingSpans = document.querySelectorAll('.summary h2 span');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                summaryHeadingSpans.forEach((span, index) => {
                    span.style.animation = `dropIn 0.5s ease-out ${index * 0.1}s forwards`;
                });
            } else {
                summaryHeadingSpans.forEach(span => {
                  
                    span.style.opacity = "0";
                    span.style.transform = "translateY(-50px)";
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.summary'));
});
