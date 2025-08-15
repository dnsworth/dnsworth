# DNSWorth.com

A free, instant domain valuation website powered by the HumbleWorth API.

## Features

- **Instant Domain Valuation** - Get domain values in seconds
- **Bulk Valuation** - Check up to 20 domains at once
- **AI-Powered Results** - Accurate valuations using HumbleWorth API
- **100% Free Forever** - No subscriptions or hidden fees
- **Responsive Design** - Works perfectly on all devices

## Tech Stack

- **Frontend**: React.js + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **API Integration**: HumbleWorth API
- **Build Tool**: Vite
- **Deployment**: Vercel-ready

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key
Create a `.env` file in the root directory:
```bash
# HumbleWorth API Configuration

```

**Important**: DNSWorth uses the public HumbleWorth API - no API key required

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

## Project Structure

```
/src
  /components          # Reusable UI components
    Header.jsx        # Navigation and search
    HeroBanner.jsx    # Main hero section
    SearchBar.jsx     # Domain search input
    ValuationResults.jsx # Results display
    SectionFeatures.jsx   # Features showcase
    SectionHowItWorks.jsx # How it works steps
    SectionWhyUs.jsx      # Trust indicators
    SectionBulkSearch.jsx # Bulk valuation
    SectionCTA.jsx        # Call to action
    Footer.jsx            # Site footer
  /hooks               # Custom React hooks
    useDomainValuation.js # Domain search logic
  /utils               # Utility functions
    api.js             # API integration
  /pages               # Page components
    Home.jsx           # Main homepage
```

## API Integration

The app integrates with the HumbleWorth API for domain valuations:

- **Single Domain**: `/v1/domain/valuation`
- **Bulk Domains**: `/v1/domain/bulk-valuation` (up to 20 domains)

## Deployment

This project is configured for easy deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions about the HumbleWorth API, visit [humbleworth.com](https://humbleworth.com)
