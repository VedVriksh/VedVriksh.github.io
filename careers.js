(function () {
  const data = window.VEDVRIKSH_CAREERS || {};
  const jobs = Array.isArray(data.jobs) ? data.jobs : [];
  const questions = Array.isArray(data.applicationQuestions) ? data.applicationQuestions : [];
  const statuses = data.applicationStatuses || {};
  const params = new URLSearchParams(location.search);
  const jobId = params.get("job");
  const job = jobs.find((item) => item.id === jobId);

  function byId(id) { return document.getElementById(id); }
  function accounts() { return JSON.parse(localStorage.getItem("vvAccounts") || "{}"); }
  function saveAccounts(value) { localStorage.setItem("vvAccounts", JSON.stringify(value)); }
  function currentUser() { return JSON.parse(localStorage.getItem("vvCurrentUser") || "null"); }
  function setCurrentUser(user) { localStorage.setItem("vvCurrentUser", JSON.stringify(user)); }
  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }
  function passwordError(password) {
    const rules = data.passwordRules || { minLength: 8, maxLength: 16, allowedSpecials: "!@#$&" };
    if (password.length < rules.minLength || password.length > rules.maxLength) return `Password must be ${rules.minLength}-${rules.maxLength} characters.`;
    if (!/[a-z]/.test(password)) return "Password needs at least 1 lowercase letter.";
    if (!/[A-Z]/.test(password)) return "Password needs at least 1 uppercase letter.";
    if (!/[0-9]/.test(password)) return "Password needs at least 1 number.";
    const specialRegex = new RegExp(`[${rules.allowedSpecials.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}]`);
    if (!specialRegex.test(password)) return `Password needs at least 1 special character from ${rules.allowedSpecials}.`;
    return "";
  }

  function renderCareersList() {
    const list = byId("jobsList");
    if (!list) return;
    if (!jobs.length) {
      list.innerHTML = `<p>No open positions right now. New positions can be added in <b>careers-data.js</b>.</p>`;
      return;
    }
    list.innerHTML = jobs.map((item) => `
      <article class="job-row">
        <div>
          <div class="job-id">${escapeHtml(item.id)}</div>
          <h2>${escapeHtml(item.position)}</h2>
          <p>Posted on: ${escapeHtml(item.postedOn)} · Apply till: ${escapeHtml(item.applyTill)}</p>
        </div>
        <a class="button" href="job.html?job=${encodeURIComponent(item.id)}">View Position</a>
      </article>
    `).join("");
  }

  function renderJobDetail() {
    const detail = byId("jobDetail");
    if (!detail) return;
    if (!job) {
      detail.innerHTML = `<h1>Position not found</h1><p>Please return to careers and select an open position.</p><p><a class="button" href="careers.html">All Positions</a></p>`;
      return;
    }
    detail.innerHTML = `
      <p class="eyebrow">${escapeHtml(job.id)}</p>
      <h1>${escapeHtml(job.position)}</h1>
      <div class="meta-grid">
        <div class="meta-box"><b>Position:</b> ${escapeHtml(job.position)}</div>
        <div class="meta-box"><b>Posted on:</b> ${escapeHtml(job.postedOn)}</div>
        <div class="meta-box"><b>Apply Till:</b> ${escapeHtml(job.applyTill)}</div>
        <div class="meta-box"><b>Timing:</b> ${escapeHtml(job.timing)}</div>
      </div>
      <h2>Job Description</h2>
      <p>${escapeHtml(job.jobDescription)}</p>
      <h2>Responsibilities</h2>
      <ul>${(job.responsibilities || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <h2>Qualification</h2>
      <p>${escapeHtml(job.qualification)}</p>
      <p><a class="button" href="apply.html?job=${encodeURIComponent(job.id)}">Apply</a></p>
    `;
  }

  function questionField(question) {
    const required = question.required ? "required" : "";
    const label = `<span>${escapeHtml(question.label)}${question.required ? " *" : ""}</span>`;
    if (question.type === "textarea") return `<label>${label}<textarea name="${escapeHtml(question.id)}" ${required}></textarea></label>`;
    if (question.type === "select") {
      return `<label>${label}<select name="${escapeHtml(question.id)}" ${required}>${(question.options || []).map((option) => `<option>${escapeHtml(option)}</option>`).join("")}</select></label>`;
    }
    return `<label>${label}<input type="${escapeHtml(question.type || "text")}" name="${escapeHtml(question.id)}" ${required} /></label>`;
  }

  function updateApplyState() {
    const title = byId("applyTitle");
    const meta = byId("applyMeta");
    if (!title) return;
    if (!job) {
      title.textContent = "Position not found";
      meta.textContent = "Please return to careers and select an open position.";
      return;
    }
    title.textContent = `Apply for ${job.position}`;
    meta.textContent = `Job ID: ${job.id}`;
    byId("dynamicQuestions").innerHTML = questions.map(questionField).join("");
    const user = currentUser();
    const form = byId("applyForm");
    const gate = byId("authGate");
    if (user && user.verified) {
      gate.classList.add("hidden");
      form.classList.remove("hidden");
    } else {
      gate.classList.remove("hidden");
      form.classList.add("hidden");
    }
    renderStatus();
  }

  function renderStatus() {
    const statusText = byId("statusText");
    if (!statusText || !job) return;
    const user = currentUser();
    if (!user) {
      statusText.textContent = "Login to check your status for this job.";
      return;
    }
    const key = `${user.email}|${job.id}`;
    const saved = JSON.parse(localStorage.getItem("vvApplications") || "{}");
    statusText.textContent = statuses[key] || saved[key]?.status || "No application submitted for this job yet.";
  }

  function openAuth(mode) {
    const dialog = byId("authDialog");
    const fields = byId("authFields");
    byId("authTitle").textContent = mode === "signup" ? "Create Account" : "Login";
    fields.innerHTML = mode === "signup"
      ? `<label>Full Name <input name="fullName" required /></label><label>Email ID <input name="email" type="email" required /></label><label>Create Password <input name="password" type="password" required /></label>`
      : `<label>Email ID <input name="email" type="email" required /></label><label>Password <input name="password" type="password" required /></label>`;
    byId("authHelper").textContent = mode === "signup" ? "Password: 8-16 characters, 1 lowercase, 1 uppercase, 1 number and 1 special character from ! @ # $ &." : "";
    dialog.dataset.mode = mode;
    dialog.showModal();
  }

  function setupAuth() {
    document.querySelectorAll("[data-auth]").forEach((button) => button.addEventListener("click", () => openAuth(button.dataset.auth)));
    const authForm = byId("authForm");
    if (!authForm) return;
    authForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const mode = byId("authDialog").dataset.mode;
      const values = Object.fromEntries(new FormData(authForm).entries());
      const all = accounts();
      const email = String(values.email || "").toLowerCase();
      if (mode === "signup") {
        const error = passwordError(values.password || "");
        if (error) return alert(error);
        all[email] = { fullName: values.fullName, email, password: values.password, verified: true };
        saveAccounts(all);
        setCurrentUser({ fullName: values.fullName, email, verified: true });
        alert("Account created and verified successfully. In production, a verification email link will be sent.");
      } else {
        if (!all[email] || all[email].password !== values.password) return alert("Invalid login details.");
        if (!all[email].verified) return alert("Please verify your account first.");
        setCurrentUser({ fullName: all[email].fullName, email, verified: true });
        alert("Logged in successfully.");
      }
      byId("authDialog").close();
      updateApplyState();
    });
  }

  function setupForgot() {
    const dialog = byId("forgotDialog");
    const step = byId("forgotStep");
    let otp = "";
    let email = "";
    function showEmailStep() {
      dialog.dataset.step = "email";
      step.innerHTML = `<label>Email ID <input name="email" type="email" required /></label>`;
    }
    byId("forgotBtn")?.addEventListener("click", () => {
      showEmailStep();
      dialog.showModal();
    });
    byId("forgotForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const all = accounts();
      if (dialog.dataset.step === "email") {
        email = String(form.get("email") || "").toLowerCase();
        if (!all[email]) return alert("No account found with this email.");
        otp = String(Math.floor(100000 + Math.random() * 900000));
        dialog.dataset.step = "otp";
        step.innerHTML = `<p class="notice">Static preview OTP: <b>${otp}</b>. In production this will be emailed.</p><label>Enter OTP <input name="otp" required /></label>`;
      } else if (dialog.dataset.step === "otp") {
        if (String(form.get("otp")) !== otp) return alert("OTP does not match.");
        dialog.dataset.step = "password";
        step.innerHTML = `<label>New Password <input name="password" type="password" required /></label>`;
      } else {
        const password = String(form.get("password") || "");
        const error = passwordError(password);
        if (error) return alert(error);
        all[email].password = password;
        saveAccounts(all);
        alert("Password changed successfully. Please login with your new password.");
        dialog.close();
        openAuth("login");
      }
    });
  }

  function setupApplyForm() {
    const form = byId("applyForm");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const user = currentUser();
      if (!user || !job) return alert("Please login before applying.");
      const values = Object.fromEntries(new FormData(form).entries());
      const resume = byId("resume").files[0];
      const key = `${user.email}|${job.id}`;
      const saved = JSON.parse(localStorage.getItem("vvApplications") || "{}");
      saved[key] = { jobId: job.id, position: job.position, email: user.email, status: "Submitted", answers: values, resumeName: resume?.name || "" };
      localStorage.setItem("vvApplications", JSON.stringify(saved));
      const body = encodeURIComponent(`New application\nJob ID: ${job.id}\nPosition: ${job.position}\nApplicant: ${user.email}\nResume file selected: ${resume?.name || "Not uploaded in static preview"}\n\nAnswers:\n${JSON.stringify(values, null, 2)}`);
      window.location.href = `mailto:${data.adminEmail || "vedvriksh.sn@gmail.com"}?subject=${encodeURIComponent(`Application ${job.id} - ${job.position}`)}&body=${body}`;
      alert(`Applied successfully for ${job.position} (${job.id}). If your resume gets shortlisted, someone will contact you.`);
      renderStatus();
    });
  }

  renderCareersList();
  renderJobDetail();
  updateApplyState();
  setupAuth();
  setupForgot();
  setupApplyForm();
})();
