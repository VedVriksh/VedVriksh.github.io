# Vedवृक्ष Website

This folder contains a simple, responsive pre-launch website for Vedवृक्ष, starting as home-based tuition with online and offline classes.

## Files

- `index.html` - complete website with sections, animations, dark/light mode, portal previews and contact form
- `assets/hero-campus.jpg` - generated education hero visual used in the design
- `assets/logo-vv.jpg` - Vedवृक्ष logo used in the header and footer
- `site-config.js` - GitHub-editable cover photo setting
- `people.js` - GitHub-editable Sonal message/About Me and faculty list
- `videos.js` - GitHub-editable YouTube video and Shorts links
- `faqs.js` - GitHub-editable question and answer list
- `admin-videos.html` - helper page to prepare video link entries before updating GitHub
- `admin-faqs.html` - helper page to prepare FAQ entries before updating GitHub
- `careers.html` - open positions page
- `job.html` - position detail page
- `apply.html` - application form with login/sign-up preview
- `careers-data.js` - GitHub-editable jobs, form questions and application statuses

## How to Open

Open `index.html` directly in a browser.

## Logo

The website uses `assets/logo-vv.jpg` in the header and footer.

## Replace Cover Photo

Open `site-config.js` in GitHub and update `coverImage`.

Recommended cover photo: teacher facing the board while a student is writing.

Example:

```js
window.VEDVRIKSH_SITE = {
  coverImage: "assets/cover-classroom.jpg"
};
```

## Add Sonal Message and Faculty

Open `people.js` in GitHub to update:

- Sonal's photo
- Message from Sonal
- About Me
- Faculty photo, name, education, qualification and message

Example:

```js
window.VEDVRIKSH_PEOPLE = {
  owner: {
    name: "Sonal",
    photo: "assets/sonal.jpg",
    message: "Your message here.",
    about: "About Me content here."
  },
  faculty: [
    {
      name: "Faculty Name",
      photo: "assets/faculty-name.jpg",
      education: "M.Sc Mathematics",
      qualification: "5 years teaching experience",
      message: "Faculty message here."
    }
  ]
};
```

## Add YouTube Videos or Shorts

Open `videos.js` in GitHub and add links inside `window.VEDVRIKSH_VIDEOS`.

You can also open `admin-videos.html`, add the links there, copy the generated code, and paste it into `videos.js` on GitHub.

Example:

```js
window.VEDVRIKSH_VIDEOS = [
  {
    title: "Welcome to Vedvriksh",
    url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
    type: "video"
  },
  {
    title: "Quick study tip",
    url: "https://www.youtube.com/shorts/YOUR_SHORT_ID",
    type: "short"
  }
];
```

## Add Questions and Answers

Open `faqs.js` in GitHub and add as many questions as needed.

You can also open `admin-faqs.html`, add questions there, copy the generated code, and paste it into `faqs.js` on GitHub.

Example:

```js
window.VEDVRIKSH_FAQS = [
  {
    question: "When will classes start?",
    answer: "Class timing and start date will be updated soon."
  }
];
```

## Add Career Openings

Open `careers-data.js` in GitHub to add jobs, application questions and manual statuses.

Each job should have a unique ID like `SN-1001`.

The current website is static, so account verification email, OTP email, resume storage and admin email delivery need backend/email integration for production. The pages and flow are ready as a front-end preview.

## Production Build Roadmap

To turn this preview into the full requested product:

1. Create a Next.js 15 + TypeScript app.
2. Move sections into reusable React components.
3. Add Tailwind CSS, Framer Motion and ShadCN UI.
4. Add Express or Next API routes for admissions, resources, results and dashboards.
5. Add PostgreSQL with Prisma models for users, students, parents, faculty, courses, attendance, fees, tests, assignments, leads, blogs and notifications.
6. Add NextAuth with student, parent, faculty and admin roles.
7. Integrate Cloudinary for gallery, faculty and testimonial media.
8. Integrate Razorpay for fee payment.
9. Add sitemap, dynamic metadata and structured schema for SEO.

The current preview is intentionally self-contained because this local session could not run Node/npm.
