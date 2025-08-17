// New Relic Browser Monitoring Configuration
// This script initializes New Relic monitoring for the DNSWorth application
// Loads before any other scripts to ensure proper tracking initialization

(function() {
  'use strict';
  
  // Initialize New Relic if not already present
  if (window.NREUM) return;
  
  // Set up New Relic configuration
  window.NREUM = {
    init: {
      distributed_tracing: { enabled: true },
      privacy: { cookies_enabled: true },
      ajax: { deny_list: ["bam.nr-data.net"] }
    },
    loader_config: {
      accountID: "7019077",
      trustKey: "7019077", 
      agentID: "1589124819",
      licenseKey: "NRJS-09eb2c029cfb6ab03e2",
      applicationID: "1589124819"
    },
    info: {
      beacon: "bam.nr-data.net",
      errorBeacon: "bam.nr-data.net",
      licenseKey: "NRJS-09eb2c029cfb6ab03e2",
      applicationID: "1589124819",
      sa: 1
    }
  };

  // Load the New Relic browser agent with full monitoring capabilities
  (function() {
    var e = document.createElement('script');
    e.type = 'text/javascript';
    e.async = true;
    e.src = 'https://js-agent.newrelic.com/nr-loader-spa-1.295.0.min.js';
    var t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(e, t);
  })();

  // Additional configuration for SPA monitoring
  window.addEventListener('load', function() {
    if (window.newrelic) {
      // Set application name for better identification
      window.newrelic.setCustomAttribute('app_name', 'DNSWorth');
      window.newrelic.setCustomAttribute('app_type', 'domain_valuation_tool');
      
      // Track route changes for SPA
      if (window.history && window.history.pushState) {
        var originalPushState = window.history.pushState;
        var originalReplaceState = window.history.replaceState;
        
        window.history.pushState = function() {
          originalPushState.apply(this, arguments);
          if (window.newrelic) {
            window.newrelic.setCurrentRouteName(arguments[2] || window.location.pathname);
          }
        };
        
        window.history.replaceState = function() {
          originalReplaceState.apply(this, arguments);
          if (window.newrelic) {
            window.newrelic.setCurrentRouteName(arguments[2] || window.location.pathname);
          }
        };
      }
    }
  });
})();
