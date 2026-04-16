(() => {
  const byId = (id) => document.getElementById(id);
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const messages = window.escapearcTheme?.labels || {};

  const bookingModal = byId("bookingModal");
  const bookingSelect = byId("bkTour");
  const bookingName = byId("bkName");
  const bookingSourcePage = byId("bookingSourcePage");
  const bookingSourceCta = byId("bookingSourceCta");
  const bookingExpeditionLabel = byId("bookingExpeditionLabel");
  const bookingFeedback = byId("bookingFeedback");
  const nav = byId("nav");
  const menuBtn = byId("menuBtn");
  const bot = byId("aiBot");
  const botToggle = byId("botToggle");
  const botInput = byId("aiInput");
  const botMessages = byId("aiMsgs");

  const botKnowledge = {
    spiti: "Spiti expeditions are best managed as dedicated Expedition posts with repeater itinerary days, rider requirements, and high-altitude notes.",
    ladakh: "Ladakh routes can now be published as dynamic Expedition entries with price, duration, difficulty, and gallery data managed from WordPress.",
    bhutan: "Bhutan works well as an Expedition entry with route highlights, visa guidance, and enquiry-focused CTAs rather than hardcoded homepage copy.",
    booking: "Booking inquiries are stored as Booking Inquiry records so sales follow-up can happen without touching the codebase.",
    cancellation: "Policies should live on a standard Policies page so changes are editorial, versionable, and separate from route content.",
    gear: "Rider requirements belong on each expedition and can also be summarized on a standard checklist page.",
    stay: "Stays are handled in a separate archive with location and stay-type filters to avoid burying accommodation data in a homepage script.",
    contact: "Use the Contact page and the global options fields for email, WhatsApp, footer links, and office details.",
  };

  function openBooking(trigger = null) {
    if (!bookingModal) return;

    bookingModal.classList.add("open");

    if (bookingSourcePage) bookingSourcePage.value = window.location.pathname;
    if (bookingSourceCta) bookingSourceCta.value = trigger?.dataset.sourceCta || trigger?.textContent?.trim() || "site";

    const expeditionId = trigger?.dataset.expeditionId || "";
    const expeditionLabel = trigger?.dataset.expeditionLabel || "";

    if (bookingSelect && expeditionId) bookingSelect.value = expeditionId;
    if (bookingExpeditionLabel) bookingExpeditionLabel.value = expeditionLabel;

    bookingName?.focus();
  }

  function closeBooking() {
    bookingModal?.classList.remove("open");
  }

  function getBotReply(message) {
    const normalized = message.toLowerCase();
    if (normalized.includes("spiti")) return botKnowledge.spiti;
    if (normalized.includes("ladakh")) return botKnowledge.ladakh;
    if (normalized.includes("bhutan")) return botKnowledge.bhutan;
    if (normalized.includes("book") || normalized.includes("inquiry")) return botKnowledge.booking;
    if (normalized.includes("cancel") || normalized.includes("refund") || normalized.includes("policy")) return botKnowledge.cancellation;
    if (normalized.includes("gear") || normalized.includes("helmet") || normalized.includes("checklist")) return botKnowledge.gear;
    if (normalized.includes("stay") || normalized.includes("hotel") || normalized.includes("homestay")) return botKnowledge.stay;
    if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("whatsapp")) return botKnowledge.contact;
    return "I can help with expeditions, booking, stays, policies, and route structure. Ask about a destination or booking workflow.";
  }

  function addBotMessage(text, isUser = false) {
    if (!botMessages) return;

    const message = document.createElement("div");
    message.className = "ai-msg" + (isUser ? " user" : "");
    message.textContent = text;
    botMessages.appendChild(message);
    botMessages.scrollTop = botMessages.scrollHeight;
  }

  function askBot(prompt) {
    addBotMessage(prompt, true);
    window.setTimeout(() => addBotMessage(getBotReply(prompt)), 250);
  }

  function sendBot() {
    if (!botInput) return;
    const value = botInput.value.trim();
    if (!value) return;
    botInput.value = "";
    askBot(value);
  }

  function toggleBot(force) {
    if (!bot) return;
    const shouldOpen = typeof force === "boolean" ? force : !bot.classList.contains("open");
    bot.classList.toggle("open", shouldOpen);
    if (botToggle) botToggle.hidden = shouldOpen;
  }

  function renderBookingFeedback() {
    const status = window.escapearcTheme?.bookingStatus;
    if (!status || !bookingFeedback) return;

    bookingFeedback.hidden = false;
    bookingFeedback.textContent = messages[status] || messages.error || "There was a problem processing the request.";
    bookingFeedback.classList.toggle("is-error", status !== "success");
  }

  function initMotion() {
    const nodes = qsa([
      ".hero h1",
      ".hero p",
      ".hero .chip",
      ".hero .btn",
      ".hero .stat",
      ".hero-card",
      ".section-kicker",
      ".section-title",
      ".section-lead",
      ".card",
      ".panel",
      ".metric",
      ".day-card",
      ".hotel-card",
      ".check-item",
      ".footer",
    ].join(","));

    if (!nodes.length) return;

    document.body.classList.add("motion-ready");

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("motion-reveal", "is-visible"));
      return;
    }

    const observed = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });

    nodes.forEach((node, index) => {
      if (observed.has(node)) return;
      node.classList.add("motion-reveal");
      if (index < 5) node.classList.add(`delay-${Math.min(index + 1, 5)}`);
      observed.add(node);
      observer.observe(node);
    });
  }

  function initLoader() {
    const loader = byId("loader");
    const loaderFill = byId("loaderFill");
    const loadingText = byId("loadingText");
    const main = byId("main");

    if (!loader) {
      toggleBot(false);
      return;
    }

    let progress = 0;
    const timer = window.setInterval(() => {
      progress += 4;
      if (loaderFill) loaderFill.style.width = `${Math.min(progress, 100)}%`;
      if (loadingText) loadingText.textContent = progress >= 100 ? "Ready!" : `Loading route map... ${progress}%`;

      if (progress < 100) return;

      window.clearInterval(timer);
      window.setTimeout(() => {
        loader.classList.add("hidden");
        main?.classList.remove("hidden");
        toggleBot(false);
      }, 220);
    }, 24);
  }

  window.openBooking = openBooking;
  window.closeBooking = closeBooking;
  window.toggleBot = toggleBot;
  window.botAsk = askBot;
  window.botSend = sendBot;

  document.addEventListener("DOMContentLoaded", () => {
    renderBookingFeedback();
    initMotion();
    initLoader();

    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
    }

    qsa("[data-open-booking]").forEach((button) => {
      button.addEventListener("click", () => openBooking(button));
    });

    qsa("[data-close-booking]").forEach((button) => {
      button.addEventListener("click", closeBooking);
    });

    bookingModal?.addEventListener("click", (event) => {
      if (event.target === bookingModal) closeBooking();
    });

    qsa("[data-scroll-top]").forEach((button) => {
      button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    });

    qsa("[data-bot-prompt]").forEach((button) => {
      button.addEventListener("click", () => askBot(button.dataset.botPrompt || button.textContent.trim()));
    });

    qs("[data-bot-send]")?.addEventListener("click", sendBot);
    qs("[data-bot-close]")?.addEventListener("click", () => toggleBot(false));
    botToggle?.addEventListener("click", () => toggleBot(true));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeBooking();
      if (event.key === "Enter" && document.activeElement === botInput) sendBot();
    });
  });
})();
