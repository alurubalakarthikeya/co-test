import { DataService } from './dataService.js';
import { UIController } from './uiController.js';
import { ChartController } from './chartController.js';

class StellarStoriesApp {
    constructor() {
        this.dataService = new DataService();
        this.uiController = new UIController();
        this.chartController = new ChartController();
        this.updateInterval = null;
    }

    async init() {
        try {
            console.log('🚀 Initializing Stellar Stories Dashboard...');
            
            // Show loading state
            this.uiController.showLoadingState();
            
            // Initialize Chart.js
            this.chartController.init();
            
            // Load initial data
            await this.loadData();
            
            // Set up auto-refresh every 5 minutes
            this.startAutoRefresh();
            
            console.log('✅ Dashboard initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize dashboard:', error);
            this.uiController.showError('Failed to load space weather data');
        }
    }

    async loadData() {
        try {
            console.log('📡 Fetching space weather data...');
            
            // Fetch data from multiple sources
            const [solarData, geomagneticData, auroraData] = await Promise.all([
                this.dataService.getSolarFlareData(),
                this.dataService.getGeomagneticData(),
                this.dataService.getAuroraData()
            ]);

            // Update UI with new data
            this.uiController.updateSolarFlareStatus(solarData);
            this.uiController.updateGeomagneticStatus(geomagneticData);
            this.uiController.updateAuroraForecast(auroraData);
            
            // Update chart
            this.chartController.updateKpChart(geomagneticData.kpHistory);
            
            // Update timestamp
            this.uiController.updateLastUpdated();
            
            // Update data status
            this.uiController.updateDataStatus(this.dataService.getDataStatus());
            
            console.log('✅ Data loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load data:', error);
            this.uiController.showError('Some data may be unavailable');
        }
    }

    startAutoRefresh() {
        // Refresh every 5 minutes
        this.updateInterval = setInterval(() => {
            console.log('🔄 Auto-refreshing data...');
            this.loadData();
        }, 5 * 60 * 1000);
    }

    stopAutoRefresh() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new StellarStoriesApp();
    app.init();
    
    // Make app available globally for debugging
    window.stellarStoriesApp = app;
});

// Handle page visibility changes to pause/resume updates
document.addEventListener('visibilitychange', () => {
    if (window.stellarStoriesApp) {
        if (document.hidden) {
            window.stellarStoriesApp.stopAutoRefresh();
        } else {
            window.stellarStoriesApp.startAutoRefresh();
            // Immediately refresh when page becomes visible
            window.stellarStoriesApp.loadData();
        }
    }
});