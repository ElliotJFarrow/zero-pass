
# 📘 Product Requirements Document (PRD)

## Product Name: **Zero Pass**
**Tagline**: *Zero compromise, zero storage, total password security.*

---

## 🧭 Overview

**Zero Pass** is a minimalist, mobile-first password generator web app that allows users to generate complex, secure passwords using client-side logic only. No data is stored, transmitted, or logged beyond anonymous usage statistics. Designed with accessibility, SEO, and open-source principles in mind.

---

## 🎯 Goals

- Provide a secure, customizable password generator tool
- Ensure 100% client-side generation with no password logging
- Offer flexible configuration for password complexity
- Make the app fully accessible and responsive across devices
- Optimize the site for SEO and open-source visibility

---

## 🔧 Tech Stack

- HTML5
- CSS3 (Responsive with Flexbox/Grid)
- Vanilla JavaScript
- jQuery (Optional)
- [zxcvbn.js](https://github.com/dropbox/zxcvbn) for password strength
- Google Analytics (for usage only, not passwords)

---

## 🧩 Core Features

### 1. Password Options
- [✓] Include lowercase letters `a-z`
- [✓] Include uppercase letters `A-Z`
- [✓] Include numbers `0-9`
- [✓] Include symbols `!@#$%^&*()_+-=[]{}|;:,.<>?`
- [✓] Exclude ambiguous characters (`l`, `1`, `I`, `0`, `O`, etc.)

### 2. Controls
- Password length: **8 to 256** (default: 16)
- Minimum numbers: customizable (default: 2)
- Minimum symbols: customizable (default: 2)

### 3. Validation
- Password must contain **at least one of each selected character type**
- Total minimums cannot exceed selected length
- Real-time validation and feedback for invalid configurations

### 4. Output & UX
- Readonly input showing the generated password
- “Copy to Clipboard” button with success feedback
- Password strength meter (zxcvbn)
- Theme toggle: Light/Dark mode

---

## 🧠 Functional Requirements

### Password Generation Logic
1. Build a character pool based on options
2. Pull required symbols and numbers
3. Fill remaining characters from the full pool
4. Ensure inclusion of all selected types
5. Shuffle the final result
6. Validate before displaying

### Accessibility
- Full keyboard navigation
- Proper label associations
- Screen reader support via ARIA
- Focus styles for all elements

---

## 📱 UI / UX Requirements

- **Responsive Layout**: Mobile-first, optimized for all screen sizes
- **Minimalist Design**: Clean, flat interface with no clutter
- **Dark/Light Mode**: Toggle button with instant switch
- **Visual Feedback**:
  - Disabled “Generate” button if invalid config
  - Tooltip or success message after copying password
  - Clear strength indicator (Weak → Very Strong)

---

## 📦 File Structure

```plaintext
/zero-pass
│
├── index.html
├── styles/
│   └── main.css
├── js/
│   ├── app.js
│   └── zxcvbn.js
├── assets/
│   └── favicon.ico, logo.svg, og images
├── README.md
├── LICENSE
└── .gitignore
```

---

## 🔐 Security Considerations

- Passwords never stored, logged, or sent to a server
- Fully offline/JavaScript-based generation
- Only Google Analytics for **non-sensitive** event tracking (page views, generation count)

---

## 🌍 SEO Requirements

- Descriptive `<title>`, `<meta name="description">`, and `<meta name="keywords">`
- Semantic HTML (headings, sections, article)
- OpenGraph (`og:`) and Twitter card tags
- JSON-LD structured data for `WebPage`
- In-page FAQ for keyword-rich content:
  - Why strong passwords matter
  - What are ambiguous characters?
  - How Zero Pass protects your privacy

---

## 📊 Analytics

**Tool**: Google Analytics (GA4)
**Tracked Events**:
- Page views
- Password generation count

> No tracking of password values or user inputs

---

## 🛠 Non-Functional Requirements

- **Performance**: Load under 1 second on mobile networks
- **Open Source**: MIT License, hosted on GitHub
- **Maintainability**: Pure HTML/CSS/JS; no build tools
- **Accessibility**: WCAG 2.1 AA compliance

---

## ❌ Out of Scope (MVP)

- No export to files
- No password history
- No server-side logic or APIs
- No user authentication or accounts

---

## ✅ Milestones

| Task                                  | Status       |
|---------------------------------------|--------------|
| HTML structure                        | ✅ Planned    |
| CSS layout and responsive design      | ✅ Planned    |
| JS password generation logic          | ✅ Planned    |
| Strength meter integration            | ✅ Planned    |
| Copy-to-clipboard logic               | ✅ Planned    |
| Dark/light mode toggle                | ✅ Planned    |
| SEO meta and structured data          | ✅ Planned    |
| Accessibility implementation          | ✅ Planned    |
| README and GitHub repo setup          | ✅ Planned    |

---

## 📎 GitHub Setup

**Repository Name**: `zero-pass`  
**License**: MIT  
**README**:
- Description
- Features list
- Screenshots
- Local testing guide
- Contribution guidelines
- Live demo placeholder (for future)

---

**Author**: Elliot Farrow  
**Maintainer**: @ElliotJFarrow
**Date**: April 2025  
**Version**: 1.0 MVP  
```