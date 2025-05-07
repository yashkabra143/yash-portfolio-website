# Yash Kabra - QA Engineer Portfolio

A modern, responsive professional portfolio website built with React, TypeScript, and Express. This portfolio showcases my experience, skills, and projects as a Senior QA Engineer.

## 🚀 Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Dark/Light Theme**: Toggle between light and dark modes
- **Interactive Sections**: Including experience timeline, skill bars, and project showcases
- **Contact Form**: Built-in form for visitor communication
- **Resource Downloads**: Downloadable QA templates and materials
- **Testimonials**: Showcases client and colleague feedback
- **Advanced SEO**: Meta tags, structured data, sitemap, and robots.txt
- **Analytics**: Basic visitor tracking without third-party dependencies
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Social Sharing**: Easy social media integration
- **PWA Support**: Install as a native-like app on mobile devices

## 🛠️ Technologies Used

- **Frontend**:
  - React.js with TypeScript
  - Tailwind CSS for styling
  - Shadcn UI components
  - Framer Motion for animations
  - Vite for development and building

- **Backend**:
  - Express.js
  - Drizzle ORM with PostgreSQL
  - SendGrid for email functionality

- **AI Integration**:
  - Google Gemini AI API

## 🏗️ Project Structure

```
├── client/               # Frontend code
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   └── services/     # API service functions
├── db/                   # Database configuration
├── public/               # Static assets
├── server/               # Backend code
│   ├── services/         # Backend services
│   └── routes.ts         # API routes
└── shared/               # Shared code between frontend and backend
    └── schema.ts         # Database schema definitions
```

## 🔧 Setup and Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/yash-kabra-portfolio.git
   cd yash-kabra-portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio
   SENDGRID_API_KEY=your_sendgrid_api_key
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

4. Initialize the database
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. Start development server
   ```bash
   npm run dev
   ```

## 📊 Database Configuration

### Why a Database in a Static Portfolio?

While most of the portfolio content is static, the website includes interactive features that require data persistence:

1. **Contact Form**: Stores messages from visitors
2. **Analytics**: Tracks page views and section visits without third-party services

### Database Architecture

- **Technology**: PostgreSQL with Drizzle ORM
- **Connection**: Configured in `db/index.ts` using environment variables
- **Schema**: Defined in `shared/schema.ts`

### Database Tables

1. **contact_messages**: Stores visitor inquiries
   - `id`: Unique identifier (primary key)
   - `name`: Visitor's name
   - `email`: Visitor's email address
   - `subject`: Message subject
   - `message`: Full message content
   - `createdAt`: Timestamp when message was received

### Database Flow in the Application

1. **Contact Form Submission**:
   - User submits the contact form on the frontend
   - Frontend sends data to `/api/contact` endpoint
   - Backend validates data using Zod schema
   - Valid data is saved to the database
   - Email notification is sent if SendGrid is configured
   - Success response is returned to the frontend

2. **Database Operations**:
   - Database operations are handled in `server/storage.ts`
   - Contact messages are saved using `storage.saveContactMessage()`
   - Messages can be retrieved using `storage.getContactMessages()`

### Email Notification System

The contact form integrates with SendGrid to send email notifications when new messages are received:

1. When a contact form is submitted, the data is first saved to the database
2. Then an email notification is sent to your email address
3. The email notification includes all the form fields
4. This functionality requires a SendGrid API key in the environment variables

### Accessing Saved Messages

Currently, there's no admin interface to view messages. You can access them through:

1. **Direct Database Access**: Connect to your PostgreSQL database and query the `contact_messages` table
2. **API Extension**: You could extend the API to add a secure endpoint to retrieve messages

### Local Development

For local development:

1. Install PostgreSQL locally or use a Docker container
2. Create a database for the project
3. Update your `.env` file with the correct connection string
4. Run `npm run db:push` to set up the schema

## 📝 Adding Content

Most content can be modified in the `client/src/lib/data.ts` file, including:

- Experience data
- Skills data
- Projects data
- Testimonials
- Certifications

## 🚀 Deployment

This project can be deployed to any hosting platform that supports Node.js applications, including:

- Replit
- Vercel
- Netlify
- Heroku
- Railway

## 🔒 Security Features

- API keys stored in environment variables
- Form validation and sanitization
- Database query parameterization
- CORS protection

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/yash-kabra-portfolio/issues).

## 📃 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

## 👨‍💻 Author

**Yash Kabra**

- LinkedIn: [yashkabra143](https://www.linkedin.com/in/yashkabra143/)
- GitHub: [yashkabra143](https://github.com/yashkabra143)
- Upwork: [Yash Kabra](https://www.upwork.com/freelancers/~01125d841102f61285)
