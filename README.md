# 🪙 Cryptoverse — Explore the World of Cryptocurrency

A modern cryptocurrency tracking web app built with **React**, **Redux Toolkit**, and **Ant Design**. Browse the top 100 cryptocurrencies, view detailed stats and price history charts, check global exchanges, and stay up to date with the latest crypto news — all in one place.

![Cryptoverse Preview](https://i.ibb.co/8gh5Jc8/image.png)

---

## ✨ Features

- 📊 **Live market data** for the top 100 cryptocurrencies
- 🔍 **Detailed coin pages** with stats, descriptions, and links
- 📈 **Interactive price history charts** powered by Chart.js
- 📰 **Real-time crypto news** from across the web
- 🏦 **Exchange listings** (premium plan required)
- 🎨 **Clean, responsive UI** built with Ant Design

---

## 🛠️ Tech Stack

| Category       | Technologies                              |
| -------------- | ----------------------------------------- |
| Frontend       | React 17, React Router DOM 5              |
| State          | Redux Toolkit, RTK Query                  |
| UI             | Ant Design, Ant Design Icons              |
| Charts         | Chart.js, react-chartjs-2                 |
| HTTP           | Axios, RTK Query (`fetchBaseQuery`)       |
| Utilities      | Millify, Moment.js, html-react-parser     |
| Data Source    | [RapidAPI](https://rapidapi.com)          |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** or **yarn**
- A free **[RapidAPI](https://rapidapi.com)** account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/Crypto-React-Redux.git
   cd Crypto-React-Redux
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example env file and fill in your own RapidAPI credentials:
   ```bash
   cp .env.example .env
   ```

   You'll need to subscribe to these two free APIs on RapidAPI:
   - [Coinranking API](https://rapidapi.com/Coinranking/api/coinranking1)
   - [Bing News Search](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1)

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
Crypto-React-Redux/
├── public/
│   ├── index.html
│   ├── _redirects              # Netlify SPA routing config
│   └── cryptocurrency.png
├── src/
│   ├── app/
│   │   └── store.js            # Redux store configuration
│   ├── components/
│   │   ├── Cryptocurrencies.jsx
│   │   ├── CryptoDetails.jsx
│   │   ├── Exchanges.jsx
│   │   ├── Homepage.jsx
│   │   ├── LineChart.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── News.jsx
│   │   └── index.js
│   ├── services/
│   │   ├── cryptoApi.js        # Coinranking RTK Query slice
│   │   └── cryptoNewsApi.js    # Bing News RTK Query slice
│   ├── images/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .env.example
├── .gitignore
└── package.json
```

---

## 📜 Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm start`     | Run the app in development mode          |
| `npm run build` | Build for production into the `build` folder |
| `npm test`      | Launch the test runner                   |
| `npm run eject` | Eject Create React App configuration     |

---

## 🌐 Deployment

This project is configured to deploy automatically to **AWS S3 + CloudFront** via **GitHub Actions** — every push to `main` triggers a new deployment.

📖 **See [`DEPLOY_TO_AWS.md`](./DEPLOY_TO_AWS.md)** for a complete step-by-step guide (beginner-friendly).

💰 **See [`AWS_COST_SAFETY.md`](./AWS_COST_SAFETY.md)** to keep your AWS bill at $0.

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) handles:
- Installing dependencies
- Building the React app
- Syncing files to S3
- Invalidating CloudFront cache

Want to use Netlify or Vercel instead? A `public/_redirects` file is already included for SPA routing on those platforms.

---

## 📝 Notes

- The **Exchanges** endpoint requires a premium Coinranking subscription on RapidAPI.
- If the Coinranking API returns errors, you may need to switch endpoints from `v1` to `v2` (see comments in `src/services/cryptoApi.js`).

---

## 📄 License

This project is open source and available for personal and educational use.
