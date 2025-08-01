
# OptiDesk VDI Management System

A professional Virtual Desktop Infrastructure (VDI) management system built with modern web technologies.

## Features

- **Real-time VM Monitoring** - Monitor CPU, RAM, and system performance
- **Virtual Machine Control** - Start, stop, and restart virtual machines
- **User Authentication** - Secure login with Supabase authentication
- **Cost Calculator** - Calculate and optimize VDI deployment costs
- **Analytics Dashboard** - Comprehensive system analytics and reporting
- **User Profile Management** - Complete user account management
- **System Settings** - Configurable system preferences

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Tailwind CSS with Shadcn/UI components
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **State Management**: React Query (TanStack Query)
- **Build Tool**: Vite
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or bun

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd optidesk-vdi-management
```

2. Install dependencies
```bash
npm i
```

3. Set up environment variables
Create a `.env.local` file and configure your Supabase credentials if needed.

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Shadcn)
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── Profile.tsx     # User profile management
│   ├── Settings.tsx    # System settings
│   └── ...
├── pages/              # Page components
│   ├── Index.tsx       # Main application page
│   ├── Auth.tsx        # Authentication page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── integrations/       # External service integrations
│   └── supabase/       # Supabase configuration
└── styles/             # Global styles and CSS
```

## Key Features

### Virtual Machine Management
- Real-time monitoring of VM status, CPU, and memory usage
- One-click start, stop, and restart functionality
- Visual status indicators and progress tracking

### User Authentication
- Secure user registration and login
- Profile management with editable user information
- Password change functionality

### System Analytics
- Live system performance metrics
- Historical data visualization
- Resource utilization tracking

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase
- React Router

## Deployment

### Deploy to Vercel

This project is configured for easy deployment to Vercel:

1. **Push to GitHub**: First, push your code to a GitHub repository
2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project" and import your repository
3. **Environment Variables**: Set up the following environment variables in Vercel:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
4. **Deploy**: Vercel will automatically build and deploy your project

The `vercel.json` configuration file is already set up for optimal deployment.

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in this repository.
