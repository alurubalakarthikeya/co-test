export class UIController {
    constructor() {
        this.elements = {
            lastUpdated: document.getElementById('lastUpdated'),
            solarFlareStatus: document.getElementById('solarFlareStatus'),
            solarFlareLevel: document.getElementById('solarFlareLevel'),
            solarFlarePeak: document.getElementById('solarFlarePeak'),
            kpIndex: document.getElementById('kpIndex'),
            stormLevel: document.getElementById('stormLevel'),
            auroraChance: document.getElementById('auroraChance'),
            auroraLocations: document.getElementById('auroraLocations'),
            auroraPeakTime: document.getElementById('auroraPeakTime'),
            dataStatus: document.getElementById('dataStatus')
        };
    }

    showLoadingState() {
        // Add loading class to cards
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('loading');
        });
    }

    hideLoadingState() {
        // Remove loading class from cards
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('loading');
        });
    }

    updateSolarFlareStatus(data) {
        if (!data) return;

        // Update status indicator
        const statusElement = this.elements.solarFlareStatus;
        const statusDot = statusElement.querySelector('.status-dot');
        const statusText = statusElement.querySelector('.status-text');

        // Remove existing status classes
        statusDot.classList.remove('warning', 'danger');
        
        // Set status based on data
        switch (data.status) {
            case 'warning':
                statusDot.classList.add('warning');
                statusText.textContent = 'Elevated Activity';
                break;
            case 'danger':
                statusDot.classList.add('danger');
                statusText.textContent = 'High Activity';
                break;
            default:
                statusText.textContent = 'Normal Activity';
        }

        // Update current level
        if (this.elements.solarFlareLevel) {
            this.elements.solarFlareLevel.textContent = data.currentLevel;
        }

        // Update peak level
        if (this.elements.solarFlarePeak) {
            this.elements.solarFlarePeak.textContent = data.peakLevel;
        }

        console.log('🌟 Updated solar flare status:', data);
    }

    updateGeomagneticStatus(data) {
        if (!data) return;

        // Update Kp index display
        const kpElement = this.elements.kpIndex;
        if (kpElement) {
            const kpValue = kpElement.querySelector('.kp-value');
            if (kpValue) {
                kpValue.textContent = data.currentKp.toFixed(1);
            }
        }

        // Update storm level
        const stormElement = this.elements.stormLevel;
        if (stormElement) {
            const indicator = stormElement.querySelector('.level-indicator');
            const text = stormElement.querySelector('.level-text');
            
            if (indicator && text) {
                // Remove existing classes
                indicator.classList.remove('minor', 'moderate', 'strong', 'severe');
                
                // Add appropriate class
                if (data.stormLevel.class !== 'normal') {
                    indicator.classList.add(data.stormLevel.class);
                }
                
                text.textContent = data.stormLevel.level;
            }
        }

        console.log('🧲 Updated geomagnetic status:', data);
    }

    updateAuroraForecast(data) {
        if (!data) return;

        // Update aurora chance
        const chanceElement = this.elements.auroraChance;
        if (chanceElement) {
            const chanceValue = chanceElement.querySelector('.chance-value');
            if (chanceValue) {
                chanceValue.textContent = `${data.chance}%`;
            }

            // Update background color based on chance
            if (data.chance > 70) {
                chanceElement.style.background = 'linear-gradient(135deg, #4caf50, #8bc34a)';
            } else if (data.chance > 40) {
                chanceElement.style.background = 'linear-gradient(135deg, #ff9800, #ffc107)';
            } else {
                chanceElement.style.background = 'linear-gradient(135deg, #757575, #9e9e9e)';
            }
        }

        // Update aurora locations
        const locationsElement = this.elements.auroraLocations;
        if (locationsElement && data.locations) {
            locationsElement.innerHTML = '';
            data.locations.forEach(location => {
                const li = document.createElement('li');
                li.textContent = location;
                locationsElement.appendChild(li);
            });
        }

        // Update peak time
        if (this.elements.auroraPeakTime) {
            this.elements.auroraPeakTime.textContent = data.peakTime;
        }

        console.log('🌌 Updated aurora forecast:', data);
    }

    updateLastUpdated() {
        if (this.elements.lastUpdated) {
            const now = new Date();
            this.elements.lastUpdated.textContent = now.toLocaleString();
        }
        
        // Hide loading state after update
        this.hideLoadingState();
    }

    updateDataStatus(status) {
        if (!this.elements.dataStatus || !status) return;

        const indicator = this.elements.dataStatus.querySelector('.status-indicator');
        if (indicator) {
            // Remove existing classes
            indicator.classList.remove('live', 'cached');
            
            if (status.isLive) {
                indicator.classList.add('live');
                indicator.textContent = `Live Data (${status.source})`;
            } else {
                indicator.classList.add('cached');
                indicator.textContent = 'Cached Data';
            }
        }

        console.log('📊 Updated data status:', status);
    }

    showError(message) {
        console.error('❌ UI Error:', message);
        
        // Create or update error notification
        let errorElement = document.querySelector('.error-notification');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-notification';
            errorElement.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(244, 67, 54, 0.9);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                max-width: 300px;
                font-size: 0.9rem;
                animation: slideInRight 0.3s ease;
            `;
            document.body.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorElement && errorElement.parentNode) {
                errorElement.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (errorElement.parentNode) {
                        errorElement.parentNode.removeChild(errorElement);
                    }
                }, 300);
            }
        }, 5000);
        
        // Hide loading state even on error
        this.hideLoadingState();
    }

    // Utility method to format numbers with appropriate precision
    formatNumber(value, decimals = 1) {
        if (typeof value !== 'number') return '--';
        return value.toFixed(decimals);
    }

    // Utility method to format timestamps
    formatTime(timestamp) {
        if (!timestamp) return '--:--';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Method to create smooth transitions between data updates
    animateValueChange(element, newValue, duration = 500) {
        if (!element) return;
        
        const oldValue = parseFloat(element.textContent) || 0;
        const difference = newValue - oldValue;
        const startTime = Date.now();
        
        const updateValue = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easing function for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = oldValue + (difference * easeProgress);
            
            element.textContent = this.formatNumber(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            } else {
                element.textContent = this.formatNumber(newValue);
            }
        };
        
        requestAnimationFrame(updateValue);
    }
}

// Add CSS animations for notifications
if (!document.querySelector('#ui-animations')) {
    const style = document.createElement('style');
    style.id = 'ui-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}