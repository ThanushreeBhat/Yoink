# 🟢 Yoink – Campus Marketplace

**Yoink** is a hyper-local campus marketplace designed specifically for Gen Z students.  
It enables students to buy and sell physical items (**Loot**) and offer or hire services (**Gigs**) within their university ecosystem.

> **Tagline:** Grab it before it’s gone.

---

## 📌 Project Overview

College students frequently need to exchange items and services such as textbooks, electronics, printouts, and assignment help. Existing platforms are either too generic, unsafe, or inefficient for campus-specific needs.

**Yoink** solves this problem by providing:
- A campus-focused marketplace
- Direct peer-to-peer interaction
- Fast transactions using familiar tools like WhatsApp and UPI
- A bold Gen Z–friendly user interface

---

## 🎯 Problem Statement

- Lack of a centralized, trusted platform for campus-based buying and selling
- Dependence on unorganized WhatsApp groups
- Generic marketplaces that do not ensure locality or trust
- High friction in communication and payments

---

## 💡 Proposed Solution

Yoink provides a **dual marketplace** system that allows students to:
- Sell or buy physical items (Loot)
- Offer or hire services (Gigs)
- Communicate instantly via WhatsApp
- Complete payments using UPI QR codes

The platform removes middlemen and platform fees, making transactions fast and direct.

---

## 🚀 Features

### 🔄 Dual Marketplace
- **Loot:** Textbooks, electronics, hostel items
- **Gigs:** Printouts, tutoring, technical support
- Easy toggle between Loot and Gigs on the home page

### 🔐 Authentication
- Secure Email/Password login using Firebase Authentication

### 🧾 Onboarding Flow
- Collects essential details after signup:
  - University / College
  - WhatsApp Number
  - UPI ID (optional)

### ➕ Create Listings (“Drop a Yoink”)
- Simple form with:
  - Title
  - Description
  - Price
  - Image URL
  - Pricing models for gigs (Per Page / Per Hour / Fixed)

### 👤 Profile & Personal Listings
- Profile icon on home page
- Dropdown options:
  - **Your Yoinks** – View user’s own listings
  - **Logout**

### 💬 Direct Transactions
- **Slide into DMs** → WhatsApp redirection
- **Scan & Pay** → UPI QR code generation
- No in-app chat or platform fees

---

## 🎨 UI & UX Design

- **Gen Z Neobrutalist Design**
  - High-contrast black & white
  - Thick black borders
  - Chunky buttons
  - Bold typography
  - Lime green accent color (`#a3e635`)
- Interactive hover effects
- Mobile-first responsive design

---

## 🛠️ Technology Stack

### Frontend
- **Next.js (App Router)**
- **JavaScript (ES6+)**
- **Tailwind CSS**
- React Hooks

### Backend (Serverless)
- **Firebase Authentication**
- **Cloud Firestore (NoSQL Database)**

### Development Tools
- npm
- ESLint
- VS Code

---

