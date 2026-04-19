# 🎯 Goal Tracker Pro - Personal Achievement System

Goal Tracker Pro is a comprehensive web application designed to help users define, track, and complete their personal goals. The app features a gamified experience with XP rewards and activity streaks to keep users engaged and motivated.

## 🚀 Key Features

* **Full CRUD Operations:** Create, view, edit, and delete goals seamlessly.
* **Progress Persistence:** Uses `localStorage` to ensure your data and streaks are saved even after closing the browser.
* **Gamification System:**
    * **XP System:** Earn points for updating progress and completing goals.
    * **Streak Tracking:** Monitors consecutive days of activity to build long-term habits.
* **Advanced UI/UX:**
    * **Multi-language Support:** Full English and Persian (Farsi) localization.
    * **Dynamic Layout (RTL/LTR):** The interface automatically flips between Right-to-Left and Left-to-Right based on the selected language.
    * **Dark/Light Mode:** A custom theme toggle for a personalized viewing experience.
    * **Responsive Design:** Fully optimized for desktop, tablet, and mobile screens.
* **Data Export:** Allows users to export their goal data as a JSON file for backup.

## 🛠️ Technical Stack

* **Framework:** React 18 (Vite)
* **UI Library:** Material UI (MUI)
* **Routing:** React Router DOM v6
* **State Management:** Context API
* **Form Validation:** React Hook Form with Yup

## 📈 XP & Streak Logic

* **Updating Progress:** +50 XP per update.
* **Completing a Goal:** +500 XP.
* **Streak:** Incremented every 24 hours if at least one goal is updated.

---

## 📸 Screenshots Gallery

### 1. Authentication & Onboarding
| Login Form |
| :---: |
| ![Login Form](./src/screenshots/login%20form.png) |

### 2. Main Dashboard (Stats & Highlights)
| Dashboard - Light Mode | Dashboard - Dark Mode |
| :---: | :---: |
| ![Dashboard Light](./src/screenshots/Dashbord%20page.png) | ![Dashboard Dark](./src/screenshots/Dashbord-dark%20theme.png) |

### 3. Goal Management & Categories
| Active Goals List | Categories Overview |
| :---: | :---: |
| ![Active Goals](./src/screenshots/Active%20goals-All%20goals.png) | ![Categories](./src/screenshots/Categories%20page.png) |

### 4. Creating New Goals
| New Goal Interface |
| :---: |
| ![New Goal](./src/screenshots/New%20goal%20page.png) |

### 5. Customization & Settings
| Settings (Theme & Language) |
| :---: |
| ![Settings](./src/screenshots/Settings%20page.png) |

### 6. Localization & RTL Support (Persian)
| Persian - Light Theme | Persian - Dark Theme |
| :---: | :---: |
| ![Persian Light](./src/screenshots/Dashboard-persian%20lang-light%20theme.png) | ![Persian Dark](./src/screenshots/Dashboard-dark%20theme-persian%20lang.png) |

### 7. Mobile Experience (Fully Responsive)
| Dashboard (Mobile) | New Goal (Mobile) | Settings (Mobile) |
| :---: | :---: | :---: |
| ![Mobile Dashboard](./src/screenshots/mobile%20version%200.png) | ![Mobile New Goal](./src/screenshots/mobile%20version.png) | ![Mobile Settings](./src/screenshots/mobile%20version%201.png) |

---

## 🛠️ Installation & Getting Started

Follow these steps to get the project up and running on your local machine:

### 1. Prerequisites
Make sure you have **Node.js** (v16 or higher) and **npm** installed.

### 2. Installation
Clone the repository and install the necessary dependencies:

```bash
# Install dependencies
npm install
````

### 3\. Running the App

To start the development server:

```bash
# Start Vite development server
npm run dev
```

Once started, open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) in your browser.

-----

## 📁 Project Highlights

  * **State Management:** Uses **Context API** to maintain user XP, goals, and UI settings globally.
  * **Persistence Layer:** Every change is automatically synced to `localStorage`, preserving streaks and progress.
  * **Export Feature:** A dedicated "Export JSON" button is available in the "All Goals" section.

-----

**Developed by Zahra with ❤️ as a React Final Project.**
