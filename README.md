# 🛒 ShopScore

> A modern Product Reviews and Ratings System built with React

ShopScore is a comprehensive product review platform designed to help users make informed purchasing decisions by aggregating authentic reviews and scores. Built using HTML, CSS, JavaScript, and React with GenAI assistance, this application serves as a capstone project for Web Application Programming at Newton School of Technology.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#-project-structure)
- [Key Learnings](#-key-learnings)
- [Contributing](#-contributing)
- [Contact](#-contact)

## 🚀 Features

- **📝 Review Management**: Add and view comprehensive product reviews
- **⭐ Star Rating System**: Rate products from 1 to 5 stars with intuitive interface
- **📊 Real-time Analytics**: Calculate and display average ratings dynamically
- **🔍 Advanced Filtering**: Search and filter products by rating and other criteria
- **🧾 Clean UI/UX**: Modern, responsive design for optimal user experience
- **👤 User Authentication**: Secure login and registration system
- **🛒 Shopping Cart**: Add products to cart and manage purchases
- **📱 Responsive Design**: Optimized for desktop and mobile devices

## 💡 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), React 18 |
| **UI Components** | Custom components with modern CSS |
| **State Management** | React Context API |
| **Authentication** | Firebase Authentication |
| **Deployment** | Vercel |
| **Development Tools** | Vite, ESLint, PostCSS |

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rish106-hub/ShopScore_Capstone_Sem_2.git
   cd ShopScore_Capstone_Sem_2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

3. **Build for production** (optional)
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
ShopScore/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   ├── Cart.jsx        # Shopping cart component
│   │   ├── Navbar.jsx      # Navigation component
│   │   ├── ProductCard.jsx # Product display component
│   │   └── ...
│   ├── pages/              # Application pages
│   │   ├── Home.jsx        # Landing page
│   │   ├── Products.jsx    # Product listing
│   │   ├── Login.jsx       # Authentication
│   │   └── ...
│   ├── contexts/           # React Context providers
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── CartContext.jsx # Shopping cart state
│   ├── api/                # API integration
│   ├── styles/             # CSS stylesheets
│   └── utils/              # Utility functions
├── public/                 # Static assets
└── package.json           # Project dependencies
```

## 🧠 Key Learnings

This capstone project provided valuable experience in:

- **Full-stack Architecture**: Understanding how frontend and backend components interact
- **State Management**: Implementing React Context API for global state management
- **Component Design**: Building reusable, maintainable React components
- **User Experience**: Creating intuitive interfaces for product reviews and ratings
- **Authentication**: Implementing secure user login and registration flows
- **Deployment**: Successfully deploying a production-ready application
- **Modern Development**: Working with contemporary web development tools and practices

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to ShopScore:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

**Rishav Dewan**
- Email: rishavdewan10@gmail.com
- GitHub: [@rish106-hub](https://github.com/rish106-hub)

---

Found a bug or have a feature request? Feel free to [open an issue](https://github.com/rish106-hub/ShopScore_Capstone_Sem_2/issues) or reach out via email.

---

*Built with ❤️ as part of the Web Application Programming capstone project at Newton School of Technology*