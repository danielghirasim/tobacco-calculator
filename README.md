# Tobacco Calculator

A simple, intuitive web calculator to compare the cost of rolled cigarettes versus store-bought packs. See exactly how much you can save daily, monthly, and yearly.

![Tobacco Calculator Screenshot](https://via.placeholder.com/800x450?text=Tobacco+Calculator+Preview)

## Features

- **Instant Savings Calculation** - See your daily, monthly, and yearly savings at a glance
- **Cost Comparison** - Compare rolled vs store-bought prices per cigarette and per pack
- **Multi-language Support** - Available in English, German, and Romanian
- **Multi-currency Support** - USD, EUR, GBP, RON, PLN, CZK, HUF, BGN
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Local Storage** - Your data persists between sessions
- **No Backend Required** - Runs entirely in the browser

## Live Demo

[View Live Demo](https://your-domain.netlify.app) _(Update after deployment)_

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/danielghirasim/tobacco-calculator.git

# Navigate to project directory
cd tobacco-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`
4. Deploy!

Or use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Other Platforms

The app can be deployed to any static hosting service:

- Vercel
- GitHub Pages
- Cloudflare Pages
- Firebase Hosting

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Local Storage** - Data persistence

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Language and currency selectors
│   ├── InputField.jsx      # Reusable input components
│   ├── InputSection.jsx    # Form inputs container
│   ├── ReferenceSection.jsx # Tube sizes and tobacco guide
│   └── ResultsSection.jsx  # Savings display
├── hooks/
│   └── useLocalStorage.js  # Custom hook for persistence
├── translations.js         # i18n strings and config
├── App.jsx                 # Main application component
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## How It Works

The calculator uses the following formulas:

```
Rolled Cigarette Cost = (Tobacco Price / Tobacco Size) × Tobacco per Cig + (Tubes Price / Tubes Count)

Savings per Pack = Store Pack Price - (Rolled Cig Cost × Cigs per Pack)

Monthly Savings = Daily Savings × 30 - Other Monthly Costs

Yearly Savings = Monthly Savings × 12
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)

---

**Disclaimer**: This calculator is for informational purposes only. Smoking is harmful to your health. If you smoke, consider quitting. Visit [smokefree.gov](https://smokefree.gov/) for resources.
