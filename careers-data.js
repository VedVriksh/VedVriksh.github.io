window.VEDVRIKSH_CAREERS = {
  adminEmail: "vedvriksh.sn@gmail.com",
  passwordRules: {
    minLength: 8,
    maxLength: 16,
    allowedSpecials: "!@#$&"
  },
  jobs: [
    /*
      Add open positions here. Job IDs must start with SN- and 4 numbers.

      Example:
      {
        id: "SN-1001",
        position: "Maths Faculty",
        postedOn: "2026-06-14",
        applyTill: "2026-07-15",
        jobDescription: "Teach Maths for foundation batches.",
        responsibilities: [
          "Conduct online and offline classes",
          "Prepare worksheets",
          "Track student progress"
        ],
        qualification: "Graduate/Postgraduate in Mathematics with teaching interest",
        timing: "Evening batches"
      }
    */
  ],
  applicationQuestions: [
    /*
      Admin can add as many application questions as needed.

      Supported types: "text", "email", "tel", "textarea", "select"
      For select, add options: ["Option 1", "Option 2"]
    */
    { id: "fullName", label: "Full Name", type: "text", required: true },
    { id: "email", label: "Email ID", type: "email", required: true },
    { id: "phone", label: "Phone Number", type: "tel", required: true },
    { id: "experience", label: "Teaching Experience", type: "text", required: false },
    { id: "whyApply", label: "Why do you want to join Vedvriksh?", type: "textarea", required: true }
  ],
  applicationStatuses: {
    /*
      Admin can update status manually by applicant email and job ID.
      Allowed statuses: Submitted, Under Consideration, Not Considered, Shortlisted
    */
    /*
    "candidate@email.com|SN-1001": "Under Consideration"
    */
  }
};
