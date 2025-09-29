export class ChartController {
    constructor() {
        this.chart = null;
        this.chartCanvas = null;
        this.fallbackChart = null;
        this.useChartJs = false;
    }

    async init() {
        // Try to load Chart.js if available
        if (typeof Chart !== 'undefined') {
            this.useChartJs = true;
            this.chartCanvas = document.getElementById('kpChart');
            if (this.chartCanvas) {
                this.chartCanvas.style.display = 'block';
                document.getElementById('kpChartFallback').style.display = 'none';
                this.createKpChart();
                return;
            }
        }

        // Fallback to custom chart implementation
        console.log('📊 Using fallback chart implementation');
        this.fallbackChart = document.getElementById('kpChartFallback');
        if (this.fallbackChart) {
            this.fallbackChart.style.display = 'block';
        }
    }

    createKpChart() {
        if (!this.chartCanvas) return;

        const ctx = this.chartCanvas.getContext('2d');
        
        // Create initial empty chart
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Kp Index',
                    data: [],
                    borderColor: '#64b5f6',
                    backgroundColor: 'rgba(100, 181, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#64b5f6',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#64b5f6',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                const dataPoint = context[0];
                                const time = new Date(dataPoint.label);
                                return time.toLocaleString();
                            },
                            label: function(context) {
                                const kpValue = context.parsed.y;
                                const stormLevel = getStormLevelFromKp(kpValue);
                                return `Kp: ${kpValue.toFixed(1)} (${stormLevel})`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            borderColor: 'rgba(255, 255, 255, 0.2)'
                        },
                        ticks: {
                            color: '#90a4ae',
                            maxTicksLimit: 6,
                            callback: function(value, index, values) {
                                const date = new Date(this.getLabelForValue(value));
                                return date.toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                });
                            }
                        }
                    },
                    y: {
                        display: true,
                        min: 0,
                        max: 9,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            borderColor: 'rgba(255, 255, 255, 0.2)'
                        },
                        ticks: {
                            color: '#90a4ae',
                            stepSize: 1,
                            callback: function(value) {
                                return value.toFixed(0);
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                animation: {
                    duration: 750,
                    easing: 'easeInOutQuart'
                },
                elements: {
                    point: {
                        hoverBackgroundColor: '#ffffff',
                        hoverBorderColor: '#64b5f6',
                        hoverBorderWidth: 2
                    }
                }
            }
        });

        console.log('📊 Kp Index chart initialized');
    }

    updateKpChart(kpHistory) {
        if (!kpHistory || !Array.isArray(kpHistory)) {
            console.warn('⚠️ Cannot update chart: missing data');
            return;
        }

        if (this.useChartJs && this.chart) {
            this.updateChartJsChart(kpHistory);
        } else {
            this.updateFallbackChart(kpHistory);
        }
    }

    updateChartJsChart(kpHistory) {
        try {
            // Prepare data for chart
            const labels = kpHistory.map(point => point.time);
            const data = kpHistory.map(point => parseFloat(point.kp) || 0);

            // Update chart data
            this.chart.data.labels = labels;
            this.chart.data.datasets[0].data = data;

            // Update colors based on Kp levels
            this.updateChartColors(data);

            // Animate the update
            this.chart.update('active');

            console.log('📊 Chart.js updated with', data.length, 'data points');
        } catch (error) {
            console.error('❌ Failed to update Chart.js chart:', error);
        }
    }

    updateFallbackChart(kpHistory) {
        try {
            const chartBars = document.getElementById('chartBars');
            if (!chartBars) return;

            // Clear existing bars
            chartBars.innerHTML = '';

            // Create bars for each data point
            kpHistory.forEach((point, index) => {
                const kpValue = parseFloat(point.kp) || 0;
                const time = new Date(point.time);
                
                const bar = document.createElement('div');
                bar.className = 'chart-bar';
                bar.style.height = `${Math.max(4, (kpValue / 9) * 80)}px`;
                
                // Add color based on Kp level
                if (kpValue >= 7) {
                    bar.classList.add('danger');
                } else if (kpValue >= 5) {
                    bar.classList.add('warning');
                }

                // Add tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'chart-bar-tooltip';
                tooltip.textContent = `${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}: Kp ${kpValue.toFixed(1)}`;
                bar.appendChild(tooltip);

                chartBars.appendChild(bar);
            });

            console.log('📊 Fallback chart updated with', kpHistory.length, 'data points');
        } catch (error) {
            console.error('❌ Failed to update fallback chart:', error);
        }
    }

    updateChartColors(data) {
        if (!this.chart || !data) return;

        const dataset = this.chart.data.datasets[0];
        
        // Create gradient colors based on Kp values
        const backgroundColors = [];
        const borderColors = [];
        
        data.forEach(kpValue => {
            if (kpValue >= 7) {
                // Strong to Extreme storms - Red
                backgroundColors.push('rgba(244, 67, 54, 0.2)');
                borderColors.push('#f44336');
            } else if (kpValue >= 5) {
                // Minor to Moderate storms - Orange
                backgroundColors.push('rgba(255, 152, 0, 0.2)');
                borderColors.push('#ff9800');
            } else if (kpValue >= 3) {
                // Unsettled - Yellow
                backgroundColors.push('rgba(255, 193, 7, 0.2)');
                borderColors.push('#ffc107');
            } else {
                // Quiet - Blue
                backgroundColors.push('rgba(100, 181, 246, 0.2)');
                borderColors.push('#64b5f6');
            }
        });

        // Use the highest alert level for overall chart styling
        const maxKp = Math.max(...data);
        let primaryColor = '#64b5f6';
        let backgroundColor = 'rgba(100, 181, 246, 0.1)';
        
        if (maxKp >= 7) {
            primaryColor = '#f44336';
            backgroundColor = 'rgba(244, 67, 54, 0.1)';
        } else if (maxKp >= 5) {
            primaryColor = '#ff9800';
            backgroundColor = 'rgba(255, 152, 0, 0.1)';
        } else if (maxKp >= 3) {
            primaryColor = '#ffc107';
            backgroundColor = 'rgba(255, 193, 7, 0.1)';
        }

        // Update dataset colors
        dataset.borderColor = primaryColor;
        dataset.backgroundColor = backgroundColor;
        dataset.pointBackgroundColor = primaryColor;
    }

    // Create a sparkline version for smaller displays
    createSparkline(containerId, data, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return null;

        const canvas = document.createElement('canvas');
        canvas.width = options.width || 200;
        canvas.height = options.height || 50;
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        
        const sparklineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map((_, index) => index),
                datasets: [{
                    data: data,
                    borderColor: options.color || '#64b5f6',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    tension: 0.4
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                animation: { duration: 0 }
            }
        });

        return sparklineChart;
    }

    // Method to add real-time data point
    addDataPoint(timestamp, kpValue) {
        if (!this.chart) return;

        const data = this.chart.data;
        data.labels.push(timestamp);
        data.datasets[0].data.push(kpValue);

        // Keep only last 24 hours (24 data points)
        if (data.labels.length > 24) {
            data.labels.shift();
            data.datasets[0].data.shift();
        }

        this.chart.update('none'); // Update without animation for real-time data
    }

    // Method to highlight current time on chart
    highlightCurrentTime() {
        if (!this.chart) return;

        const currentTime = new Date();
        const labels = this.chart.data.labels;
        
        // Find the closest time point
        let closestIndex = 0;
        let minDiff = Infinity;
        
        labels.forEach((label, index) => {
            const labelTime = new Date(label);
            const diff = Math.abs(currentTime - labelTime);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = index;
            }
        });

        // Update point styling to highlight current
        const dataset = this.chart.data.datasets[0];
        const pointRadii = new Array(labels.length).fill(3);
        pointRadii[closestIndex] = 6; // Larger point for current time
        
        dataset.pointRadius = pointRadii;
        this.chart.update('none');
    }

    destroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}

// Utility function to get storm level from Kp value
function getStormLevelFromKp(kp) {
    if (kp >= 9) return 'Extreme';
    if (kp >= 8) return 'Severe';
    if (kp >= 7) return 'Strong';
    if (kp >= 6) return 'Moderate';
    if (kp >= 5) return 'Minor';
    return 'Quiet';
}