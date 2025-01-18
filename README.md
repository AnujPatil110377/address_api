# Address Comparison Tool

A modern web application that uses AI to compare addresses and determine if they refer to the same physical location. Built with Next.js and Google's Gemini AI.

## Features

- Compare any two addresses to check if they match
- Get confidence levels for the comparison
- Detailed explanations of the matching logic
- Clean, responsive UI with dark mode support
- Real-time address validation
- Error handling and feedback

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **AI**: Google Gemini AI
- **Styling**: Custom CSS with dark mode

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- A Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd address-comparison-tool
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

1. Enter the first address in the "First Address" input field
2. Enter the second address in the "Second Address" input field
3. Click "Compare Addresses"
4. View the results:
   - Match status (Yes/No)
   - Confidence level (0-100%)
   - Detailed explanation

### Example

```text
First Address: 123 Main Street, Suite 100, New York, NY 10001
Second Address: 123 Main St, #100, New York, New York 10001
```

The AI will analyze these addresses and determine if they refer to the same location, providing a confidence score and explanation.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── compare-addresses/
│   │       └── route.js       # API endpoint for address comparison
│   ├── components/
│   │   └── AddressComparer.js # Main form component
│   ├── layout.js             # Root layout
│   ├── page.js               # Home page
│   └── globals.css           # Global styles
├── .env.local                # Environment variables
└── package.json              # Project dependencies
```

## Environment Variables

Required environment variables:

- `GOOGLE_API_KEY`: Your Google Gemini API key

## API Reference

### POST /api/compare-addresses

Compare two addresses using AI.

**Request Body:**
```json
{
  "address1": "string",
  "address2": "string"
}
```

**Response:**
```json
{
  "match": boolean,
  "confidenceLevel": number,
  "explanation": "string"
}
```
## License

This project is licensed under the MIT License - see the LICENSE file for details.


