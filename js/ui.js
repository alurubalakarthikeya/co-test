// ui.js - UI rendering and interaction functions

import { 
  getFlareSeverity, 
  getKpSeverity, 
  getAuroraChance, 
  formatDateTime,
  generateKpHistory,
  calculateLocalEffects
} from './utils.js';

/**
 * Update the header time display
 */
export function updateHeaderTime() {
  const timeElement = document.getElementById('currentTime');
  if (timeElement) {
    const now = new Date();
    const timeString = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    timeElement.textContent = timeString;
  }
}

/**
 * Show loading state on refresh button
 * @param {boolean} loading - Whether to show loading state
 */
export function setRefreshLoading(loading) {
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    if (loading) {
      refreshBtn.classList.add('loading');
      refreshBtn.setAttribute('aria-label', 'Refreshing data...');
    } else {
      refreshBtn.classList.remove('loading');
      refreshBtn.setAttribute('aria-label', 'Refresh data');
    }
  }
}

/**
 * Update solar flare card with new data
 * @param {Object} flareData - Solar flare information
 */
export function updateSolarFlareCard(flareData) {
  const card = document.getElementById('solarFlareCard');
  if (!card) return;
  
  const { class: flareClass, peakFlux, region, time } = flareData;
  const severity = getFlareSeverity(flareClass);
  
  // Update severity pill
  const severityPill = card.querySelector('#solarFlareSeverity');
  if (severityPill) {
    severityPill.textContent = severity.label;
    severityPill.className = `severity-pill ${severity.level}`;
  }
  
  // Update primary value
  const classElement = card.querySelector('#solarFlareClass');
  if (classElement) {
    classElement.textContent = flareClass || 'C1.0';
  }
  
  // Update secondary info
  const infoElement = card.querySelector('#solarFlareInfo');
  if (infoElement) {
    const fluxText = peakFlux ? `Peak flux: ${peakFlux} ×10⁻⁶ W/m²` : 'Peak flux: N/A';
    const regionText = region ? `Region ${region}` : 'Region N/A';
    infoElement.textContent = `${fluxText} • ${regionText}`;
  }
  
  // Update severity bar
  const severityBar = card.querySelector('#solarFlareBar');
  if (severityBar) {
    severityBar.className = `severity-bar ${severity.level}`;
  }
  
  // Store data for modal
  card.dataset.modalData = JSON.stringify({
    title: 'Solar Flare Details',
    data: flareData,
    severity,
    lastUpdate: time ? formatDateTime(time) : 'Unknown'
  });
}

/**
 * Update Kp index card with new data
 * @param {number} kpValue - Kp index value
 */
export function updateKpCard(kpValue) {
  const card = document.getElementById('kpCard');
  if (!card) return;
  
  const kp = Number(kpValue) || 0;
  const severity = getKpSeverity(kp);
  
  // Update severity pill
  const severityPill = card.querySelector('#kpSeverity');
  if (severityPill) {
    severityPill.textContent = severity.label;
    severityPill.className = `severity-pill ${severity.level}`;
  }
  
  // Update Kp value
  const kpValueElement = card.querySelector('#kpValue');
  if (kpValueElement) {
    kpValueElement.textContent = kp.toFixed(1);
  }
  
  // Update description
  const infoElement = card.querySelector('#kpInfo');
  if (infoElement) {
    infoElement.textContent = severity.description;
  }
  
  // Update Kp scale marker
  const marker = card.querySelector('#kpMarker');
  if (marker) {
    const position = Math.min(100, (kp / 9) * 100);
    marker.style.left = `${position}%`;
  }
  
  // Store data for modal
  card.dataset.modalData = JSON.stringify({
    title: 'Geomagnetic Activity Details',
    data: { kpIndex: kp, severity },
    kpHistory: generateKpHistory(kp)
  });
}

/**
 * Update aurora chance card with new data
 * @param {number} kpValue - Kp index value for aurora calculation
 */
export function updateAuroraCard(kpValue) {
  const card = document.getElementById('auroraCard');
  if (!card) return;
  
  const aurora = getAuroraChance(kpValue);
  
  // Update severity pill
  const severityPill = card.querySelector('#auroraSeverity');
  if (severityPill) {
    severityPill.textContent = aurora.label;
    severityPill.className = `severity-pill ${aurora.level}`;
  }
  
  // Update primary value
  const chanceElement = card.querySelector('#auroraChance');
  if (chanceElement) {
    chanceElement.textContent = aurora.label;
  }
  
  // Update description
  const infoElement = card.querySelector('#auroraInfo');
  if (infoElement) {
    infoElement.textContent = aurora.description;
  }
  
  // Store data for modal
  card.dataset.modalData = JSON.stringify({
    title: 'Aurora Visibility Details',
    data: { kpIndex: kpValue, aurora },
    visibility: getAuroraVisibilityDetails(kpValue)
  });
}

/**
 * Update data status card
 * @param {Object} statusData - Data status information
 */
export function updateStatusCard(statusData) {
  const card = document.getElementById('statusCard');
  if (!card) return;
  
  const { timestamp, source, isMock } = statusData;
  
  // Update status pill
  const statusPill = card.querySelector('#dataSeverity');
  if (statusPill) {
    if (isMock) {
      statusPill.textContent = 'Mock';
      statusPill.className = 'severity-pill mock';
    } else {
      statusPill.textContent = 'Live';
      statusPill.className = 'severity-pill calm';
    }
  }
  
  // Update timestamp
  const updatedElement = card.querySelector('#lastUpdated');
  if (updatedElement) {
    const timeText = timestamp ? formatDateTime(timestamp) : 'Unknown';
    updatedElement.textContent = `Updated: ${timeText}`;
  }
  
  // Update source link
  const sourceLink = card.querySelector('a');
  if (sourceLink && source) {
    if (isMock) {
      sourceLink.textContent = 'Mock Data';
      sourceLink.href = '#';
      sourceLink.onclick = (e) => e.preventDefault();
    } else {
      sourceLink.textContent = 'NOAA SWPC';
      sourceLink.href = 'https://www.swpc.noaa.gov/';
    }
  }
  
  // Store data for modal
  card.dataset.modalData = JSON.stringify({
    title: 'Data Source Information',
    data: statusData,
    cacheInfo: getCacheInfo()
  });
}

/**
 * Update sparkline chart
 * @param {Array} kpHistory - Array of Kp values
 */
export function updateSparkline(kpHistory) {
  const canvas = document.getElementById('sparklineChart');
  if (!canvas || !window.Chart || !kpHistory) return;
  
  try {
    // Destroy existing chart
    if (canvas.chart) {
      canvas.chart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: kpHistory.map((_, i) => i),
        datasets: [{
          data: kpHistory,
          borderColor: 'var(--sky)',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: { display: false },
          y: { 
            display: false,
            min: 0,
            max: 9
          }
        },
        elements: {
          point: { radius: 0 }
        }
      }
    });
    
    canvas.chart = chart;
  } catch (error) {
    console.warn('Failed to create sparkline chart:', error);
  }
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {number} duration - Duration in milliseconds
 */
export function showToast(message, duration = 6000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.classList.add('active');
  
  // Auto-hide after duration
  setTimeout(() => {
    toast.classList.remove('active');
  }, duration);
}

/**
 * Show modal with card details
 * @param {HTMLElement} card - Card element that was clicked
 */
export function showModal(card) {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  
  if (!modalOverlay || !modalTitle || !modalContent) return;
  
  try {
    const modalData = JSON.parse(card.dataset.modalData || '{}');
    
    // Set title
    modalTitle.textContent = modalData.title || 'Details';
    
    // Generate content
    modalContent.innerHTML = generateModalContent(modalData);
    
    // Show modal
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    
    // Focus trap
    trapFocus(modalOverlay);
    
  } catch (error) {
    console.error('Error showing modal:', error);
    modalContent.innerHTML = '<p>Error loading details</p>';
    modalOverlay.classList.add('active');
  }
}

/**
 * Hide modal
 */
export function hideModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
  }
}

/**
 * Generate modal content HTML
 * @param {Object} data - Modal data
 * @returns {string} HTML content
 */
function generateModalContent(data) {
  let html = '';
  
  if (data.data) {
    html += '<div class="modal-section">';
    html += '<h3>Current Status</h3>';
    html += `<p>${JSON.stringify(data.data, null, 2)}</p>`;
    html += '</div>';
  }
  
  if (data.severity) {
    html += '<div class="modal-section">';
    html += '<h3>Severity Information</h3>';
    html += `<p><strong>Level:</strong> ${data.severity.label}</p>`;
    html += `<p><strong>Description:</strong> ${data.severity.description || 'N/A'}</p>`;
    html += '</div>';
  }
  
  if (data.kpHistory) {
    html += '<div class="modal-section">';
    html += '<h3>24-Hour History</h3>';
    html += `<p>Recent Kp values: ${data.kpHistory.slice(-12).join(', ')}</p>`;
    html += '</div>';
  }
  
  if (data.visibility) {
    html += '<div class="modal-section">';
    html += '<h3>Visibility Information</h3>';
    html += `<p>${data.visibility}</p>`;
    html += '</div>';
  }
  
  if (data.lastUpdate) {
    html += '<div class="modal-section">';
    html += '<h3>Last Updated</h3>';
    html += `<p>${data.lastUpdate}</p>`;
    html += '</div>';
  }
  
  // Raw JSON data (collapsible)
  html += '<div class="modal-section">';
  html += '<h3>Raw Data <button type="button" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === \'none\' ? \'block\' : \'none\'">Toggle</button></h3>';
  html += `<pre class="json-data" style="display: none;">${JSON.stringify(data, null, 2)}</pre>`;
  html += '</div>';
  
  return html || '<p>No additional details available.</p>';
}

/**
 * Get aurora visibility details
 * @param {number} kpValue - Kp index value
 * @returns {string} Visibility details
 */
function getAuroraVisibilityDetails(kpValue) {
  const kp = Number(kpValue) || 0;
  
  if (kp < 3) {
    return 'Aurora activity is limited to polar regions. Visible primarily in northern Alaska, northern Canada, and northern Scandinavia.';
  } else if (kp < 5) {
    return 'Aurora visible in high latitude regions including southern Alaska, northern tier of US states, and northern UK.';
  } else if (kp < 7) {
    return 'Aurora visible in mid-latitude regions including most of Canada, northern US, and central Europe.';
  } else {
    return 'Strong aurora activity visible in lower latitudes including central US states and southern Europe.';
  }
}

/**
 * Get cache information for debugging
 * @returns {Object} Cache information
 */
function getCacheInfo() {
  const keys = Object.keys(localStorage);
  const cacheKeys = keys.filter(key => key.startsWith('stellar-stories-cache:'));
  
  return {
    cacheEntries: cacheKeys.length,
    totalSize: cacheKeys.reduce((total, key) => {
      return total + (localStorage.getItem(key)?.length || 0);
    }, 0)
  };
}

/**
 * Trap focus within modal for accessibility
 * @param {HTMLElement} element - Element to trap focus within
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  // Focus first element
  firstElement.focus();
  
  // Add keydown listener for tab navigation
  const handleKeydown = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };
  
  element.addEventListener('keydown', handleKeydown);
  
  // Clean up when modal is hidden
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && !element.classList.contains('active')) {
        element.removeEventListener('keydown', handleKeydown);
        observer.disconnect();
      }
    });
  });
  
  observer.observe(element, { attributes: true });
}

/**
 * Update all cards with new data
 * @param {Object} data - Complete space weather data
 */
export function updateAllCards(data) {
  if (!data) return;
  
  try {
    // Update individual cards
    if (data.solarFlares) {
      updateSolarFlareCard(data.solarFlares);
    }
    
    if (data.kpIndex !== undefined) {
      updateKpCard(data.kpIndex);
      updateAuroraCard(data.kpIndex);
      
      // Update sparkline
      const kpHistory = generateKpHistory(data.kpIndex);
      updateSparkline(kpHistory);
    }
    
    // Update status card
    updateStatusCard({
      timestamp: data.timestamp,
      source: data.source,
      isMock: data.source === 'mock'
    });
    
  } catch (error) {
    console.error('Error updating cards:', error);
    showToast('Error updating display - please refresh');
  }
}