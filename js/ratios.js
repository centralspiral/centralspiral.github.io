function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function executeScriptIfVisible() {
var canvas = document.getElementById('compressionChart');
    if (canvas && isElementInViewport(canvas)) {

var ctx = document.getElementById('compressionChart').getContext('2d');
        var compressionChart;

        var labels = ['Snappy', 'LZ4', 'Zstd', 'Brotli', 'LZMA', 'SPIRAL-BOX'];
        var data = [1.5, 2, 2.8, 3, 3.7, 3200];
        var backgroundColors = [
            'rgba(0, 0, 0, 0.6)',
            'rgba(0, 0, 0, 0.6)',
            'rgba(0, 0, 0, 0.6)',
            'rgba(0, 0, 0, 0.6)',
            'rgba(0, 0, 0, 0.6)',
            'rgba(0, 141, 236, 1)'
        ];

        var currentIndex = 0;
        var maxCompressionRatio = Math.max(...data);

        function drawNextBar() {
            if (currentIndex < labels.length) {
                if (!compressionChart) {
                    compressionChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: [],
                            datasets: [{
                                label: 'Classic Compression Algorithms',
                                data: [],
                                backgroundColor: [],
                            }]
                        },
                        options: {
                    
                           scales: {
                        y: {
                            beginAtZero: true,
                            type: 'logarithmic',
                            title: {
                                display: true,
                                text: 'Comp. Ratio',
                                font: {
                                    size: 15
                                }
                            },
				

                        },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Lossless Compression',
                                        font: {
                                            size: 15
                                        }
                                    }
                                }
                            },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            if (tooltipItem.label === "SPIRAL-BOX") {
                                                return 'Compression Ratio Over 3000:1';
                                            }
                                            return 'Average Compression Ratio: ' + tooltipItem.raw + ':1';
                                        }
                                    }
                                },
                                legend: {
                                    display: false
                                },
                                datalabels: {
                                    anchor: 'end',
                                    align: 'top',
                                    formatter: function (value, context) {
                                        return value + ':1';
                                    },
                                    display: true
                                }
                            },
                            onClick: function(e) {
                                var activePoints = compressionChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
                                if (activePoints.length > 0) {
                                    var selectedIndex = activePoints[0].index;
                                    var label = compressionChart.data.labels[selectedIndex];
                                    switch (label) {
                                        case 'Snappy':
                                            window.open('https://github.com/google/snappy', '_blank');
                                            break;
                                        case 'LZ4':
                                            window.open('https://lz4.github.io/lz4/', '_blank'); 
                                            break;
                                        case 'Zstd':
                                            window.open('https://facebook.github.io/zstd/', '_blank');
                                            break;
                                        case 'Brotli':
                                            window.open('https://github.com/google/brotli', '_blank');
                                            break;
                                        case 'LZMA':
                                            window.open('https://www.7-zip.org/sdk.html', '_blank');
                                            break;
                                    }
                                }
                            }
                        }
                    });
                }
                compressionChart.data.labels.push(labels[currentIndex]);
                compressionChart.data.datasets[0].data.push(data[currentIndex]);
                compressionChart.data.datasets[0].backgroundColor.push(backgroundColors[currentIndex]);
                compressionChart.update();
                
                currentIndex++;
                setTimeout(drawNextBar, 1250);
            }
        }

        drawNextBar();
        
    }
}

// Ejecutar la función al cargar la página
executeScriptIfVisible();

// Escuchar eventos de desplazamiento y redimensionamiento
window.addEventListener('scroll', executeScriptIfVisible);
window.addEventListener('resize', executeScriptIfVisible);
