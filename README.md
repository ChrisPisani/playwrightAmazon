# Amazon.com E2E Testing Project

This project implements automated end-to-end (E2E) testing of Amazon.com’s search and filtering features, as well as category navigation flows, using the Playwright testing framework. It applies input domain modeling and graph-based testing techniques to ensure robust coverage of key user interactions.

---

## Features

- Parameterized testing of Amazon search filters (e.g., sort options, price range, age range, delivery options).
- Modular test architecture with reusable components for interacting with filters, navigation, and product pages.
- Graph-based navigation tests covering category browsing and product checkout flows.
- Dynamic configuration-driven tests using JSON files for easy maintenance and expansion.
- Playwright-based browser automation with support for Chromium, Firefox, and WebKit.

---

## Prerequisites

- **Node.js** (v16 or higher recommended)  
- **npm** (comes with Node.js)  
- Internet connection for accessing Amazon.com

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://gitlab.com/your-username/playwrightAmazon.git
cd playwrightAmazon
npm install
npx playwright install

Open up your preferred IDE or code editor and within the testRunner.js,
modify the testFiles path to point towards the test you want to run and modify the 
configFiles to run the specific config files

within a terminal, or another tool, run testRunner.js

tests will run back to back based on how many configs are inputted in testRunner.js, video artifacts are produced
and saved off in the videos/ directory named appropriately
