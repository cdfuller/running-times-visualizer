const ctx = document.getElementById('runningChart').getContext('2d');
const tooltip = document.getElementById('tooltip');

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.from({ length: 661 }, (_, i) => 4 + i * 0.0167), // Pace from 4:00 to 15:00 in increments
        datasets: [
            {
                label: '5k',
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                data: Array.from({ length: 661 }, (_, i) => paceToTime(4 + i * 0.0167, 3.1))
            },
            {
                label: '10k',
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: false,
                data: Array.from({ length: 661 }, (_, i) => paceToTime(4 + i * 0.0167, 6.2))
            },
            {
                label: 'Half Marathon',
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                fill: false,
                data: Array.from({ length: 661 }, (_, i) => paceToTime(4 + i * 0.0167, 13.1))
            },
            {
                label: 'Full Marathon',
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
                data: Array.from({ length: 661 }, (_, i) => paceToTime(4 + i * 0.0167, 26.2))
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: false // Disable the default tooltip
            },
            crosshair: {
                line: {
                    color: 'rgba(0, 0, 0, 0.5)',
                    width: 1
                },
                sync: {
                    enabled: false
                },
                zoom: {
                    enabled: false
                },
                snap: {
                    enabled: true
                },
                callbacks: {
                    beforeZoom: () => false
                }
            }
        },
        hover: {
            intersect: false,
            mode: 'nearest'
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Pace (MM:SS)'
                },
                ticks: {
                    min: 4,
                    max: 15,
                    stepSize: 0.5, // 30-second intervals
                    callback: function (value) {
                        return minutesToMmss(value);
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Time (H:MM:SS)'
                },
                ticks: {
                    stepSize: 30, // 30-minute intervals
                    callback: function (value) {
                        return minutesToHMMSS(value);
                    }
                }
            }
        },
        interaction: {
            mode: null // Disable interaction mode to prevent the default tooltip
        },
        onHover: (event, chartElements) => {
            if (chartElements.length) {
                const chartElement = chartElements[0];
                const index = chartElement.index;
                const pace = 4 + index * 0.0167;
                const times = {
                    '5k': chart.data.datasets[0].data[index],
                    '10k': chart.data.datasets[1].data[index],
                    'Half': chart.data.datasets[2].data[index],
                    'Full': chart.data.datasets[3].data[index]
                };
                tooltip.innerHTML = `
                    <span class="pace">${minutesToMmss(pace)}/mi</span>
                    <table>
                        <tr><th>5k</th><td>${minutesToHMMSS(times['5k'])}</td></tr>
                        <tr><th>10k</th><td>${minutesToHMMSS(times['10k'])}</td></tr>
                        <tr><th>Half</th><td>${minutesToHMMSS(times['Half'])}</td></tr>
                        <tr><th>Full</th><td>${minutesToHMMSS(times['Full'])}</td></tr>
                    </table>
                `;
            } else {
                tooltip.style.display = 'none';
            }
        }
    }
});