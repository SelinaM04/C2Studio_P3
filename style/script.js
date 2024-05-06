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

        // Update the bars for each year
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

document.querySelectorAll('.buttons div').forEach(button => {
    button.addEventListener('click', function() {
        updateChart(this.textContent);
    });
});

