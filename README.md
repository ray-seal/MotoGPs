# MotoGPs - Motorcycle GPS Navigation

A mobile-optimized motorcycle GPS navigation app with real-time tracking and turn-by-turn directions for safe riding.

## Features

- **Real-time GPS Tracking** - High-accuracy positioning with speed monitoring
- **Interactive Maps** - Leaflet-powered mapping with current location display
- **Turn-by-turn Navigation** - Visual instruction cards with maneuver icons
- **Route Planning** - Destination search and route optimization
- **Speed Dashboard** - Current speed, trip distance, and time tracking
- **Emergency Features** - Quick access emergency call button
- **Mobile Optimized** - Responsive design for motorcycle use
- **Settings Panel** - Voice navigation, speed alerts, and night mode

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Leaflet Maps
- **Backend**: Express.js, Node.js
- **Database**: In-memory storage with Drizzle ORM schema
- **Routing**: Custom routing service with mock directions API
- **UI Components**: Shadcn/ui component library
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd motogps
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

### GPS Permissions

The app requires GPS permissions to function properly. When first visiting the site, allow location access when prompted by your browser.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── pages/          # Application pages
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage layer
├── shared/                 # Shared TypeScript schemas
└── components.json         # UI component configuration
```

## API Endpoints

### Routes
- `GET /api/routes` - Get all saved routes
- `POST /api/routes` - Create a new route
- `GET /api/routes/:id` - Get specific route
- `DELETE /api/routes/:id` - Delete a route

### Trips
- `GET /api/trips` - Get all trips
- `POST /api/trips` - Start a new trip
- `GET /api/trips/:id` - Get specific trip
- `PATCH /api/trips/:id` - Update trip details

### Navigation
- `POST /api/directions` - Get turn-by-turn directions

## Usage

1. **Grant GPS permissions** when prompted
2. **Plan a route** by tapping the Search button and entering a destination
3. **Start navigation** to begin turn-by-turn guidance
4. **Monitor speed** and trip statistics in the dashboard
5. **Use emergency button** for quick access to emergency services
6. **Customize settings** via the menu button

## Development

### Adding New Features

1. Update the database schema in `shared/schema.ts`
2. Add storage methods in `server/storage.ts`
3. Create API routes in `server/routes.ts`
4. Build frontend components in `client/src/components/`
5. Add pages to `client/src/pages/`

### Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this project for your own motorcycle navigation needs.

## Safety Notice

This app is designed for motorcycle use but should not replace proper safety equipment and awareness. Always prioritize road safety over navigation convenience.