# CMPV - CSEAN Membership Portal Verification

A modern web application for verifying and searching CSEAN (Cyber Security Experts Association of Nigeria) members. This platform provides transparency in membership status and allows the general public to confirm the authenticity of CSEAN members.

## Features

- **Member Search**: Search for CSEAN members by name, membership number, or organization
- **Member Verification**: Display detailed member information including public credentials and status
- **Transparent Information**: Show membership status, join date, expiry date, and specializations
- **Responsive Design**: Modern, mobile-friendly interface built with Chakra UI
- **Real-time Search**: Instant search results with loading states

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Chakra UI**: Modern component library for beautiful UI
- **Tailwind CSS**: Utility-first CSS framework (for additional styling if needed)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cmvp-lookup
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── search-form.tsx      # Search form component
│   │   └── member-card.tsx      # Member display card
│   ├── data/
│   │   └── mock-data.ts         # Mock member data
│   ├── layout.tsx               # Root layout with Chakra UI provider
│   ├── page.tsx                 # Main application page
│   └── providers.tsx            # Chakra UI theme provider
```

## Mock Data

The application currently uses mock data to demonstrate functionality. The mock data includes:

- 8 sample CSEAN members with realistic information
- Various membership statuses (Active, Inactive, Pending, Expired)
- Different member types (Individual, Corporate, Student)
- Professional specializations and contact information

## Search Functionality

Users can search for members using:
- **Name**: Full name or partial name matches
- **Membership Number**: CSEAN membership ID
- **Email**: Member's email address
- **Organization**: Company or institution name

## Member Information Display

Each member card displays:
- Personal information (name, contact details)
- Professional information (organization, position)
- Membership details (status, type, dates)
- Specializations and expertise areas
- Verification status

## Future Enhancements

- [ ] Backend API integration
- [ ] Advanced search filters
- [ ] Member photo uploads
- [ ] Export functionality
- [ ] Admin panel for member management
- [ ] Email verification system
- [ ] QR code generation for member cards

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## About CSEAN

The Cyber Security Experts Association of Nigeria (CSEAN) is a professional body dedicated to promoting cybersecurity awareness, education, and best practices across Nigeria. Our members include cybersecurity professionals, researchers, educators, and organizations committed to securing Nigeria's digital infrastructure.

---

Built with ❤️ for the Nigerian cybersecurity community
