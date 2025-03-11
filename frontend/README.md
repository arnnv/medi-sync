# MediSync Frontend

A modern, responsive web application for medical image analysis and reporting, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- Modern UI with Radix UI components
- Responsive design with Tailwind CSS
- Type-safe development with TypeScript
- Real-time medical image analysis
- Interactive report generation
- Markdown support for reports
- Toast notifications for user feedback

## 🛠️ Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Radix UI
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/arnnv/medi-sync.git
   cd medi-sync/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   - Create a `.env` file in the frontend directory
   - Add the following variables:
     ```env
     VITE_API_URL=your_backend_api_url
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🏗️ Project Structure

```
frontend/
├── src/               # Source files
│   ├── components/    # React components
│   ├── pages/        # Page components
│   ├── lib/          # Utility functions
│   ├── styles/       # Global styles
│   └── types/        # TypeScript types
├── public/           # Static files
├── index.html        # Entry HTML file
└── vite.config.ts    # Vite configuration
```

## 🎨 Styling

- Tailwind CSS for utility-first styling
- Custom theme configuration in `tailwind.config.js`
- Component-specific styles in respective component files

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop browsers
- Tablets
- Mobile devices

## 🔐 Environment Variables

Required environment variables:

- `VITE_API_URL`: Backend API URL

## 🚀 Deployment

The frontend is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy using the Vercel dashboard or CLI

## 🐛 Troubleshooting

Common issues and solutions:

1. Build errors:

   - Clear `node_modules` and reinstall dependencies
   - Check TypeScript version compatibility
   - Verify environment variables

2. Development server issues:
   - Check port availability
   - Clear Vite cache
   - Verify Node.js version
