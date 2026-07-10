const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const revealElements = document.querySelectorAll(".reveal");
const year = document.querySelector("#year");
const demoDialog = document.querySelector("[data-demo-dialog]");
const demoOpenButtons = document.querySelectorAll("[data-demo-open]");
const demoCloseButton = document.querySelector("[data-demo-close]");
const videoWrap = document.querySelector("[data-video-wrap]");
const processRail = document.querySelector(".process-rail");
const processSteps = processRail ? Array.from(processRail.querySelectorAll("[data-process-step]")) : [];
const controlTabs = document.querySelectorAll("[data-control-tab]");
const controlPanel = document.querySelector("[data-control-panel]");
const controlTitle = document.querySelector("[data-control-title]");
const controlEyebrow = document.querySelector("[data-control-eyebrow]");
const workforceTeamPanel = document.querySelector("[data-workforce-team]");
const workforceTaskPanel = document.querySelector("[data-workforce-tasks]");
const workforceApprovalPanel = document.querySelector("[data-workforce-approval]");
const workforceTeamFeed = document.querySelector("[data-team-feed]");
const workforceTeamList = document.querySelector("[data-team-list]");
const workforceWorkTitle = document.querySelector("[data-work-title]");
const workforceLiveLabel = document.querySelector("[data-live-label]");
const workforceWorkList = document.querySelector("[data-work-list]");
const workforceApprovalTitle = document.querySelector("[data-approval-title]");
const workforceApprovalCopy = document.querySelector("[data-approval-copy]");
const workforceApprovalActions = document.querySelector("[data-approval-actions]");
const previewSurface = document.querySelector("[data-preview-surface]");
const previewStatus = document.querySelector("[data-preview-status]");
const compactAgentVideos = document.querySelectorAll(".hero-agent-card--compact .hero-agent-card__video");

const CONTROL_COPY = {
  workspaces: ["Workspace operations", "Everything in motion"],
  agents: ["Workforce directory", "Every role, clearly owned"],
  tasks: ["Task operations", "Real work, moving forward"],
  context: ["Knowledge layer", "The context agents work from"],
  accounts: ["Connected accounts", "Tools ready for action"],
  approvals: ["Human review", "Control at critical moments"],
  runtime: ["Live runtime", "Execution you can actually see"],
  models: ["Model management", "Route intelligence by job"],
};

const CONTROL_VIEWS = {
  workspaces: () => `
    <div class="control-view control-view--workspaces">
      <div class="control-hero">
        <div>
          <span class="ui-kicker">Workspace overview</span>
          <h4>Northstar operating room</h4>
          <p>One workspace with guardrails, approvals, and live routing across every active team.</p>
        </div>
        <div class="control-hero-stack">
          <span>12 live tasks</span>
          <span>3 approvals</span>
          <span>$428 spend</span>
        </div>
      </div>
      <div class="control-grid">
        <div class="control-card">
          <div class="control-card__head">
            <span class="ui-kicker">Workspace health</span>
            <b>Live</b>
          </div>
          <div class="control-bars">
            <span style="--bar: 84%"></span>
            <span style="--bar: 68%"></span>
            <span style="--bar: 93%"></span>
            <span style="--bar: 77%"></span>
          </div>
          <div class="control-card__foot">
            <span>Automation coverage</span><strong>78%</strong>
          </div>
        </div>
        <div class="control-card">
          <div class="control-card__head">
            <span class="ui-kicker">Workspace rules</span>
            <b>Guarded</b>
          </div>
          <div class="control-list">
            <div class="control-list-item"><span>High risk actions</span><strong>Approval required</strong></div>
            <div class="control-list-item"><span>Connected tools</span><strong>14 active</strong></div>
            <div class="control-list-item"><span>Policy breaches</span><strong>0 today</strong></div>
          </div>
        </div>
      </div>
    </div>
  `,
  agents: () => `
    <div class="control-view control-view--agents">
      <div class="control-hero">
        <div>
          <span class="ui-kicker">Agent roster</span>
          <h4>Specialists with clear ownership</h4>
          <p>Each agent carries a role, model, and live assignment so the workforce reads like a real team.</p>
        </div>
        <div class="control-hero-stack">
          <span>5 departments</span>
          <span>4 active models</span>
          <span>8 on task</span>
        </div>
      </div>
      <div class="control-grid control-grid--cards">
        <article class="agent-card-mini"><span>R</span><div><strong>Research</strong><small>OpenAI / GPT-5.5</small></div><b>Finding signals</b></article>
        <article class="agent-card-mini"><span>G</span><div><strong>Growth</strong><small>Claude / 3.5 Sonnet</small></div><b>Launching demand</b></article>
        <article class="agent-card-mini"><span>S</span><div><strong>Support</strong><small>OpenAI / o4-mini</small></div><b>Clearing queues</b></article>
        <article class="agent-card-mini"><span>B</span><div><strong>Builder</strong><small>OpenAI / GPT-4.1</small></div><b>Shipping flows</b></article>
      </div>
    </div>
  `,
  tasks: () => `
    <div class="control-view control-view--tasks">
      <div class="control-hero">
        <div>
          <span class="ui-kicker">Task board</span>
          <h4>Work moves from queue to completion</h4>
          <p>Active work streams, review gates, and completion states stay visible for the whole company.</p>
        </div>
        <div class="control-hero-stack">
          <span>4 running</span>
          <span>1 review</span>
          <span>2 done</span>
        </div>
      </div>
      <div class="control-grid">
        <div class="control-card control-card--stacked">
          <div class="control-card__head"><span class="ui-kicker">Task queue</span><b>Live</b></div>
          <div class="control-task"><span>Research market shifts</span><strong>68%</strong></div>
          <div class="control-task is-review"><span>Approve launch campaign</span><strong>Review</strong></div>
          <div class="control-task"><span>Resolve priority tickets</span><strong>41%</strong></div>
          <div class="control-task is-done"><span>Draft executive summary</span><strong>Done</strong></div>
        </div>
        <div class="control-card">
          <div class="control-card__head"><span class="ui-kicker">Approvals</span><b>Queued</b></div>
          <div class="control-list">
            <div class="control-list-item"><span>Launch campaign</span><strong>Approve</strong></div>
            <div class="control-list-item"><span>Support macros</span><strong>Review</strong></div>
            <div class="control-list-item"><span>Automation deploy</span><strong>Inspect</strong></div>
          </div>
        </div>
      </div>
    </div>
  `,
  context: () => `
    <div class="control-view control-view--context">
      <div class="control-hero">
        <div>
          <span class="ui-kicker">Context layer</span>
          <h4>Knowledge arrives with the task</h4>
          <p>Briefs, policies, and tool context stay attached so agents do the right thing faster.</p>
        </div>
        <div class="control-hero-stack">
          <span>19 briefs</span>
          <span>7 policies</span>
          <span>11 sources</span>
        </div>
      </div>
      <div class="control-grid control-grid--cards">
        <article class="control-note-card"><span>Market briefs</span><strong>4 live sources</strong><p>Fresh signals are routed into the research queue.</p></article>
        <article class="control-note-card"><span>Policy layer</span><strong>Human guardrails</strong><p>Approval rules are attached to risk-sensitive work.</p></article>
        <article class="control-note-card"><span>Task memory</span><strong>Cross-agent handoff</strong><p>Completed work becomes reusable context for the next run.</p></article>
        <article class="control-note-card"><span>Tool context</span><strong>Connected accounts</strong><p>Account credentials and scopes stay visible and auditable.</p></article>
      </div>
    </div>
  `,
  accounts: () => `
    <div class="control-view control-view--accounts">
      <div class="control-hero">
        <div>
          <span class="ui-kicker">Connected accounts</span>
          <h4>Tools that agents can actually use</h4>
          <p>Every connection shows ownership, scope, and what is live right now.</p>
        </div>
        <div class="control-hero-stack">
          <span>14 integrations</span>
          <span>3 pending</span>
          <span>0 broken</span>
        </div>
      </div>
      <div class="control-grid control-grid--cards">
        <article class="integration-card"><span>Slack</span><small>Messages, alerts</small><b>Connected</b></article>
        <article class="integration-card"><span>Notion</span><small>Briefs, docs</small><b>Connected</b></article>
        <article class="integration-card"><span>GitHub</span><small>Repos, issues</small><b>Connected</b></article>
        <article class="integration-card"><span>Stripe</span><small>Billing, spend</small><b>Scoped</b></article>
      </div>
    </div>
  `,
  approvals: () => `
    <div class="control-view control-view--approvals">
      <div class="control-hero">
        <div>
          <span class="ui-kicker">Approval queue</span>
          <h4>Human review sits on top</h4>
          <p>High-impact actions pause for review, while safe work keeps moving.</p>
        </div>
        <div class="control-hero-stack">
          <span>3 awaiting</span>
          <span>2 approved</span>
          <span>1 blocked</span>
        </div>
      </div>
      <div class="control-grid">
        <div class="control-card control-card--stacked">
          <div class="control-card__head"><span class="ui-kicker">Pending</span><b>Needs review</b></div>
          <div class="control-task is-review"><span>Publish launch campaign</span><strong>Approve</strong></div>
          <div class="control-task is-review"><span>Deploy automation update</span><strong>Inspect</strong></div>
          <div class="control-task is-done"><span>Close support macros</span><strong>Done</strong></div>
        </div>
        <div class="control-card">
          <div class="control-card__head"><span class="ui-kicker">Risk controls</span><b>Live</b></div>
          <div class="control-list">
            <div class="control-list-item"><span>Spend threshold</span><strong>$250</strong></div>
            <div class="control-list-item"><span>Model swap</span><strong>Manual</strong></div>
            <div class="control-list-item"><span>External publish</span><strong>Always review</strong></div>
          </div>
        </div>
      </div>
    </div>
  `,
  runtime: () => `
    <div class="control-view control-view--runtime">
      <div class="control-hero">
        <div>
          <span class="ui-kicker">Runtime visibility</span>
          <h4>See execution in real time</h4>
          <p>Latency, spend, and session health stay visible as work moves across the workforce.</p>
        </div>
        <div class="control-hero-stack">
          <span>98.7% health</span>
          <span>02:14 avg run</span>
          <span>$428 MTD</span>
        </div>
      </div>
      <div class="control-grid">
        <div class="control-card">
          <div class="control-card__head"><span class="ui-kicker">Runtime chart</span><b>Stable</b></div>
          <div class="control-bars control-bars--runtime">
            <span style="--bar: 42%"></span>
            <span style="--bar: 58%"></span>
            <span style="--bar: 76%"></span>
            <span style="--bar: 64%"></span>
            <span style="--bar: 83%"></span>
          </div>
        </div>
        <div class="control-card">
          <div class="control-card__head"><span class="ui-kicker">Sessions</span><b>Healthy</b></div>
          <div class="control-list">
            <div class="control-list-item"><span>Research run</span><strong>02:14</strong></div>
            <div class="control-list-item"><span>Growth run</span><strong>Running</strong></div>
            <div class="control-list-item"><span>Ops run</span><strong>92%</strong></div>
          </div>
        </div>
      </div>
    </div>
  `,
  models: () => `
    <div class="control-view control-view--models">
      <div class="control-hero">
        <div>
          <span class="ui-kicker">Model routing</span>
          <h4>Route intelligence by job</h4>
          <p>Pick the right model for the right workload, then keep routing transparent.</p>
        </div>
        <div class="control-hero-stack">
          <span>3 active</span>
          <span>2 queued</span>
          <span>1 fallback</span>
        </div>
      </div>
      <div class="control-grid control-grid--cards">
        <article class="routing-card"><span>OpenAI / GPT-5.5</span><strong>Research and analysis</strong><small>Fast decisions, high precision</small></article>
        <article class="routing-card"><span>Claude / 3.5 Sonnet</span><strong>Planning and campaigns</strong><small>Reasoning-heavy workflows</small></article>
        <article class="routing-card"><span>OpenAI / o4-mini</span><strong>Support and quick replies</strong><small>Low-latency operations</small></article>
        <article class="routing-card"><span>Fallback routing</span><strong>Safe re-run path</strong><small>Transparent and controlled</small></article>
      </div>
    </div>
  `,
};

const renderControlView = (key) => {
  if (!controlPanel) {
    return;
  }

  const render = CONTROL_VIEWS[key] || CONTROL_VIEWS.workspaces;
  controlPanel.innerHTML = render();
};

const PROCESS_LOAD_MS = 1600;
const PROCESS_SETTLE_MS = 320;
let processStepIndex = 0;
let processStepFrameId;
let processStepTimeoutId;

const updateProcessRail = (activeIndex, progress = 0) => {
  if (!processSteps.length) {
    return;
  }

  processSteps.forEach((step, index) => {
    const count = step.querySelector("[data-process-count]");
    const state = step.querySelector("[data-process-state]");
    const progressTrack = step.querySelector(".process-progress");
    const isComplete = index < activeIndex;
    const isActive = index === activeIndex;
    const isNext = index === activeIndex + 1;
    const isLoading = isActive;

    step.classList.toggle("is-complete", isComplete);
    step.classList.toggle("is-loading", isLoading);
    step.classList.toggle("is-next", isNext);

    if (count) {
      count.textContent = String(index + 1).padStart(2, "0");
    }

    if (state) {
      if (isComplete) {
        state.textContent = "Completed";
      } else if (isLoading) {
        state.textContent = "Loading";
      } else if (isNext) {
        state.textContent = "Next";
      } else {
        state.textContent = "Queued";
      }
    }

    if (progressTrack) {
      step.style.setProperty("--process-progress", `${isLoading ? progress : 0}%`);
      if (isLoading) {
        progressTrack.setAttribute("data-state", "loading");
      } else {
        progressTrack.removeAttribute("data-state");
      }
    }
  });
};

const clearProcessTimers = () => {
  window.cancelAnimationFrame(processStepFrameId);
  window.clearTimeout(processStepTimeoutId);
};

const easeInOutCubic = (value) => (value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2);

const queueNextProcessStep = () => {
  if (!processSteps.length) {
    return;
  }

  clearProcessTimers();

  const stepStart = performance.now();
  const animate = (now) => {
    const elapsed = now - stepStart;
    const eased = easeInOutCubic(Math.min(elapsed / PROCESS_LOAD_MS, 1));
    const progress = eased * 100;

    updateProcessRail(processStepIndex, progress);

    if (elapsed < PROCESS_LOAD_MS) {
      processStepFrameId = window.requestAnimationFrame(animate);
    } else {
      updateProcessRail(processStepIndex + 1, 100);
      processStepTimeoutId = window.setTimeout(() => {
        processStepIndex = (processStepIndex + 1) % processSteps.length;
        updateProcessRail(processStepIndex, 0);
        queueNextProcessStep();
      }, PROCESS_SETTLE_MS);
    }
  };

  updateProcessRail(processStepIndex, 0);
  processStepFrameId = window.requestAnimationFrame(animate);
};

const WORKFORCE_STATES = [
  {
    feed: "Research Agent is briefing the room.",
    workTitle: "Live work",
    liveLabel: "Live",
    departments: [
      { icon: "R", name: "Research", detail: "Market intelligence", status: "Active", incoming: true },
      { icon: "G", name: "Growth", detail: "Demand & campaigns", status: "Active" },
      { icon: "S", name: "Support", detail: "Customer operations", status: "Active" },
      { icon: "B", name: "Builder", detail: "Product & automation", status: "Working" },
      { icon: "O", name: "Ops", detail: "Runtime & budget", status: "Watching" },
    ],
    tasks: [
      { title: "Research Q3 market shifts", meta: "Research Agent · 2m ago", status: "is-running", value: "68%", active: true },
      { title: "Approve launch campaign", meta: "Growth Agent · awaiting you", status: "is-review", value: "Review" },
      { title: "Resolve priority tickets", meta: "Support Agent · 5m ago", status: "is-running", value: "41%" },
      { title: "Draft executive summary", meta: "Research Agent · incoming", status: "is-running", value: "18%", incoming: true },
    ],
    approval: {
      title: "Publish launch campaign?",
      copy: "Growth Agent is ready to publish across 3 connected accounts.",
      actions: ["Review", "Approve"],
    },
  },
  {
    feed: "Growth Agent has pulled a new campaign into review.",
    workTitle: "Campaign control",
    liveLabel: "Syncing",
    departments: [
      { icon: "G", name: "Growth", detail: "Demand & campaigns", status: "Working", incoming: true },
      { icon: "R", name: "Research", detail: "Market intelligence", status: "Active" },
      { icon: "S", name: "Support", detail: "Customer operations", status: "Active" },
      { icon: "B", name: "Builder", detail: "Product & automation", status: "Active" },
      { icon: "O", name: "Ops", detail: "Runtime & budget", status: "Watching" },
    ],
    tasks: [
      { title: "Refine campaign copy", meta: "Growth Agent · now", status: "is-review", value: "Ready", active: true },
      { title: "Audit paid channels", meta: "Ops Agent · 3m ago", status: "is-running", value: "52%" },
      { title: "Pull audience segments", meta: "Research Agent · 7m ago", status: "is-running", value: "31%" },
      { title: "Archive stale variants", meta: "Growth Agent · completed", status: "is-done", value: "Done", incoming: true },
    ],
    approval: {
      title: "Approve budget shift?",
      copy: "Growth Agent wants to move spend toward the best-performing channel.",
      actions: ["Hold", "Approve"],
    },
  },
  {
    feed: "Support Agent just cleared a priority queue.",
    workTitle: "Customer care",
    liveLabel: "Live",
    departments: [
      { icon: "S", name: "Support", detail: "Customer operations", status: "Active", incoming: true },
      { icon: "R", name: "Research", detail: "Market intelligence", status: "Active" },
      { icon: "G", name: "Growth", detail: "Demand & campaigns", status: "Active" },
      { icon: "B", name: "Builder", detail: "Product & automation", status: "Working" },
      { icon: "O", name: "Ops", detail: "Runtime & budget", status: "Watching" },
    ],
    tasks: [
      { title: "Close priority tickets", meta: "Support Agent · just now", status: "is-running", value: "88%", active: true },
      { title: "Send escalation summary", meta: "Support Agent · waiting review", status: "is-review", value: "Review" },
      { title: "Update help center draft", meta: "Builder Agent · 8m ago", status: "is-running", value: "64%" },
      { title: "Resolve refund thread", meta: "Support Agent · completed", status: "is-done", value: "Done", incoming: true },
    ],
    approval: {
      title: "Publish support macros?",
      copy: "Support Agent is ready to roll the new reply set across the queue.",
      actions: ["Review", "Deploy"],
    },
  },
  {
    feed: "Builder Agent pushed a fresh automation update.",
    workTitle: "Product shipping",
    liveLabel: "Working",
    departments: [
      { icon: "B", name: "Builder", detail: "Product & automation", status: "Working", incoming: true },
      { icon: "R", name: "Research", detail: "Market intelligence", status: "Active" },
      { icon: "G", name: "Growth", detail: "Demand & campaigns", status: "Active" },
      { icon: "S", name: "Support", detail: "Customer operations", status: "Active" },
      { icon: "O", name: "Ops", detail: "Runtime & budget", status: "Watching" },
    ],
    tasks: [
      { title: "Ship onboarding flow", meta: "Builder Agent · now", status: "is-running", value: "74%", active: true },
      { title: "Merge workflow fixes", meta: "Builder Agent · 4m ago", status: "is-running", value: "57%" },
      { title: "Confirm QA checklist", meta: "Ops Agent · awaiting you", status: "is-review", value: "Review" },
      { title: "Release layout patch", meta: "Builder Agent · completed", status: "is-done", value: "Done", incoming: true },
    ],
    approval: {
      title: "Deploy automation update?",
      copy: "Builder Agent has a clean release candidate ready for one click deploy.",
      actions: ["Inspect", "Deploy"],
    },
  },
  {
    feed: "Ops Agent is tuning routing and runtime cost.",
    workTitle: "Operations watch",
    liveLabel: "Monitoring",
    departments: [
      { icon: "O", name: "Ops", detail: "Runtime & budget", status: "Watching", incoming: true },
      { icon: "R", name: "Research", detail: "Market intelligence", status: "Active" },
      { icon: "G", name: "Growth", detail: "Demand & campaigns", status: "Active" },
      { icon: "S", name: "Support", detail: "Customer operations", status: "Active" },
      { icon: "B", name: "Builder", detail: "Product & automation", status: "Working" },
    ],
    tasks: [
      { title: "Tune model routing", meta: "Ops Agent · now", status: "is-running", value: "89%", active: true },
      { title: "Check spend ceilings", meta: "Ops Agent · 2m ago", status: "is-review", value: "Review" },
      { title: "Confirm session health", meta: "Runtime · 6m ago", status: "is-running", value: "47%" },
      { title: "Lock cost policy", meta: "Ops Agent · completed", status: "is-done", value: "Done", incoming: true },
    ],
    approval: {
      title: "Confirm safe model swap?",
      copy: "Ops Agent wants approval before moving traffic to the lower-cost route.",
      actions: ["Review", "Confirm"],
    },
  },
  {
    feed: "Research Agent has queued a new market brief.",
    workTitle: "Briefing queue",
    liveLabel: "Live",
    departments: [
      { icon: "R", name: "Research", detail: "Market intelligence", status: "Active", incoming: true },
      { icon: "G", name: "Growth", detail: "Demand & campaigns", status: "Working" },
      { icon: "S", name: "Support", detail: "Customer operations", status: "Active" },
      { icon: "B", name: "Builder", detail: "Product & automation", status: "Active" },
      { icon: "O", name: "Ops", detail: "Runtime & budget", status: "Watching" },
    ],
    tasks: [
      { title: "Publish market brief", meta: "Research Agent · now", status: "is-review", value: "Ready", active: true },
      { title: "Score competitor signals", meta: "Research Agent · 3m ago", status: "is-running", value: "76%" },
      { title: "Close prior briefing", meta: "Research Agent · completed", status: "is-done", value: "Done" },
      { title: "Add next cohort query", meta: "Research Agent · incoming", status: "is-running", value: "12%", incoming: true },
    ],
    approval: {
      title: "Ship research summary?",
      copy: "Research Agent can publish the brief once the review passes.",
      actions: ["Hold", "Ship"],
    },
  },
  {
    feed: "Growth Agent is launching the next run.",
    workTitle: "Launch queue",
    liveLabel: "Syncing",
    departments: [
      { icon: "G", name: "Growth", detail: "Demand & campaigns", status: "Working", incoming: true },
      { icon: "R", name: "Research", detail: "Market intelligence", status: "Active" },
      { icon: "S", name: "Support", detail: "Customer operations", status: "Active" },
      { icon: "B", name: "Builder", detail: "Product & automation", status: "Active" },
      { icon: "O", name: "Ops", detail: "Runtime & budget", status: "Watching" },
    ],
    tasks: [
      { title: "Launch new channel test", meta: "Growth Agent · now", status: "is-running", value: "91%", active: true },
      { title: "Review budget split", meta: "Growth Agent · 1m ago", status: "is-review", value: "Review" },
      { title: "Archive old variants", meta: "Growth Agent · completed", status: "is-done", value: "Done" },
      { title: "Route fresh leads", meta: "Growth Agent · incoming", status: "is-running", value: "24%", incoming: true },
    ],
    approval: {
      title: "Push launch to live?",
      copy: "Growth Agent is waiting on a final approval to move spend live.",
      actions: ["Review", "Go live"],
    },
  },
];

const updateDepartmentRows = (teamList, departments) => {
  if (!teamList) {
    return;
  }

  const rows = Array.from(teamList.querySelectorAll("[data-team-row]"));

  departments.forEach((department, index) => {
    let row = rows[index];
    if (!row) {
      row = document.createElement("div");
      row.className = "agent-row";
      row.dataset.teamRow = String(index);
      row.innerHTML = '<span class="agent-icon"></span><span><strong></strong><small></small></span><i></i><b></b>';
      teamList.appendChild(row);
      rows[index] = row;
    }

    const signature = `${department.icon}|${department.name}|${department.detail}|${department.status}`;
    const wasSignature = row.dataset.teamSignature || "";
    const changed = wasSignature !== signature;

    row.classList.toggle("is-active", Boolean(department.active));

    const icon = row.querySelector(".agent-icon");
    const title = row.querySelector("strong");
    const meta = row.querySelector("small");
    const status = row.querySelector("b");

    if (icon) {
      icon.textContent = department.icon;
    }

    if (title) {
      title.textContent = department.name;
    }

    if (meta) {
      meta.textContent = department.detail;
    }

    if (status) {
      status.textContent = department.status;
    }

    if (changed) {
      row.dataset.teamSignature = signature;
      row.classList.remove("is-incoming");
      void row.offsetWidth;
      row.classList.add("is-incoming");
    }
  });
};

const updateTaskRows = (taskList, tasks) => {
  if (!taskList) {
    return;
  }

  const rows = Array.from(taskList.querySelectorAll("[data-task-row]"));
  tasks.forEach((task, index) => {
    let row = rows[index];
    if (!row) {
      row = document.createElement("div");
      row.className = "task-row";
      row.dataset.taskRow = String(index);
      row.innerHTML = '<span class="task-status"></span><span><strong></strong><small></small></span><b></b>';
      taskList.appendChild(row);
      rows[index] = row;
    }

    const signature = `${task.title}|${task.meta}|${task.status}|${task.value}`;
    const wasSignature = row.dataset.taskSignature || "";
    const changed = wasSignature !== signature;

    row.classList.toggle("is-highlighted", Boolean(task.active));
    row.classList.toggle("is-done", task.status === "is-done");

    const status = row.querySelector(".task-status");
    const title = row.querySelector("strong");
    const meta = row.querySelector("small");
    const value = row.querySelector("b");

    if (status) {
      status.className = `task-status ${task.status}`;
    }

    if (title) {
      title.textContent = task.title;
    }

    if (meta) {
      meta.textContent = task.meta;
    }

    if (value) {
      value.textContent = task.value;
    }

    if (changed) {
      row.dataset.taskSignature = signature;
      row.classList.remove("is-moving");
      void row.offsetWidth;
      row.classList.add("is-moving");

      if (task.incoming) {
        row.classList.remove("is-incoming");
        void row.offsetWidth;
        row.classList.add("is-incoming");
      } else {
        row.classList.remove("is-incoming");
      }

      if (task.status === "is-done") {
        row.setAttribute("aria-label", `${task.title}, done`);
      } else if (task.value === "Review") {
        row.setAttribute("aria-label", `${task.title}, review`);
      } else {
        row.setAttribute("aria-label", `${task.title}, ${task.value}`);
      }
    }
  });
};

const updateApprovalPanel = (state) => {
  const approvalTitle = workforceApprovalPanel?.querySelector("[data-approval-title]");
  const approvalCopy = workforceApprovalPanel?.querySelector("[data-approval-copy]");
  const approvalActions = workforceApprovalPanel?.querySelector("[data-approval-actions]");

  if (approvalTitle) {
    approvalTitle.textContent = state.approval.title;
  }

  if (approvalCopy) {
    approvalCopy.textContent = state.approval.copy;
  }

  if (approvalActions) {
    approvalActions.innerHTML = `
      <button type="button" data-preview-action="${state.approval.actions[0]} opened in the sample workspace.">${state.approval.actions[0]}</button>
      <button type="button" data-preview-action="${state.approval.actions[1]} confirmed in the sample workspace.">${state.approval.actions[1]}</button>
    `;
  }

  if (workforceApprovalPanel) {
    workforceApprovalPanel.classList.remove("is-updating");
    void workforceApprovalPanel.offsetWidth;
    workforceApprovalPanel.classList.add("is-updating");
  }
};

const closeMenu = () => {
  menuToggle?.classList.remove("is-active");
  menuToggle?.setAttribute("aria-expanded", "false");
  siteNav?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

let previewFeedbackTimerId;

const showPreviewFeedback = (message) => {
  if (!previewStatus) {
    return;
  }

  previewStatus.textContent = message;
  previewSurface?.classList.remove("is-preview-active");
  void previewSurface?.offsetWidth;
  previewSurface?.classList.add("is-preview-active");

  window.clearTimeout(previewFeedbackTimerId);
  previewFeedbackTimerId = window.setTimeout(() => {
    previewSurface?.classList.remove("is-preview-active");
  }, 1300);
};

previewSurface?.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const action = event.target.closest("[data-preview-action]");

  if (!(action instanceof HTMLButtonElement)) {
    return;
  }

  showPreviewFeedback(action.dataset.previewAction || "Sample workspace updated.");
});

if (compactAgentVideos.length) {
  compactAgentVideos.forEach((video) => video.pause());

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (!(video instanceof HTMLVideoElement)) {
            return;
          }

          if (entry.isIntersecting) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "180px 0px", threshold: 0.05 }
    );

    compactAgentVideos.forEach((video) => videoObserver.observe(video));
  }
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.classList.toggle("is-active", !isOpen);
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

siteNav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    closeMenu();
  }
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const openDemo = () => {
  if (!demoDialog || !videoWrap) {
    window.open("https://www.youtube.com/watch?v=MP8-CB2wjWk", "_blank", "noopener,noreferrer");
    return;
  }

  videoWrap.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/MP8-CB2wjWk?autoplay=1&rel=0&modestbranding=1"
      title="AgentOS product demo"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  `;
  demoDialog.showModal();
  document.body.classList.add("dialog-open");
};

const closeDemo = () => {
  if (!demoDialog) {
    return;
  }

  demoDialog.close();
  document.body.classList.remove("dialog-open");
  if (videoWrap) {
    videoWrap.innerHTML = "";
  }
};

demoOpenButtons.forEach((button) => button.addEventListener("click", openDemo));
demoCloseButton?.addEventListener("click", closeDemo);
demoDialog?.addEventListener("click", (event) => {
  if (event.target === demoDialog) {
    closeDemo();
  }
});
demoDialog?.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDemo();
});

controlTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.controlTab;
    const copy = CONTROL_COPY[key];

    controlTabs.forEach((candidate) => {
      const isSelected = candidate === tab;
      candidate.classList.toggle("is-active", isSelected);
      candidate.setAttribute("aria-selected", String(isSelected));
    });

    if (copy && controlEyebrow && controlTitle) {
      controlEyebrow.textContent = copy[0];
      controlTitle.textContent = copy[1];
    }

    renderControlView(key);
  });
});

if (controlTabs.length) {
  const activeTab = Array.from(controlTabs).find((tab) => tab.classList.contains("is-active"));
  renderControlView(activeTab?.dataset.controlTab || "workspaces");
}

const renderWorkforceState = (state) => {
  if (!workforceTeamPanel || !workforceTaskPanel || !workforceApprovalPanel) {
    return;
  }

  if (workforceTeamFeed) {
    workforceTeamFeed.textContent = state.feed;
  }

  if (workforceWorkTitle) {
    workforceWorkTitle.textContent = state.workTitle;
  }

  if (workforceLiveLabel) {
    const liveCopy = workforceLiveLabel.querySelector("[data-live-copy]");
    if (liveCopy) {
      liveCopy.textContent = state.liveLabel;
    }
  }

  updateDepartmentRows(workforceTeamList, state.departments);
  updateTaskRows(workforceWorkList, state.tasks);
  updateApprovalPanel(state);
};

let workforceTeamStateIndex = 0;
let workforceTaskStateIndex = 0;
let workforceTeamTimerId;
let workforceTaskTimerId;
const WORKFORCE_TEAM_ROTATE_MS = 3400;
const WORKFORCE_TASK_ROTATE_MS = 2200;

const advanceTeamState = () => {
  workforceTeamStateIndex = (workforceTeamStateIndex + 1) % WORKFORCE_STATES.length;
  const state = WORKFORCE_STATES[workforceTeamStateIndex];
  if (workforceTeamFeed) {
    workforceTeamFeed.textContent = state.feed;
  }
  updateDepartmentRows(workforceTeamList, state.departments);
};

const advanceTaskState = () => {
  workforceTaskStateIndex = (workforceTaskStateIndex + 1) % WORKFORCE_STATES.length;
  const state = WORKFORCE_STATES[workforceTaskStateIndex];
  if (workforceWorkTitle) {
    workforceWorkTitle.textContent = state.workTitle;
  }
  if (workforceLiveLabel) {
    const liveCopy = workforceLiveLabel.querySelector("[data-live-copy]");
    if (liveCopy) {
      liveCopy.textContent = state.liveLabel;
    }
  }
  updateTaskRows(workforceWorkList, state.tasks);
  updateApprovalPanel(state);
};

if (workforceTeamPanel && workforceTaskPanel && workforceApprovalPanel) {
  renderWorkforceState(WORKFORCE_STATES[0]);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    workforceTeamTimerId = window.setInterval(advanceTeamState, WORKFORCE_TEAM_ROTATE_MS);
    workforceTaskTimerId = window.setInterval(advanceTaskState, WORKFORCE_TASK_ROTATE_MS);
  }
}

if (processSteps.length) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    processSteps.forEach((step, index) => {
      step.classList.toggle("is-complete", index < 0);
      step.classList.toggle("is-loading", index === 0);
      step.classList.toggle("is-next", index === 1);
      const count = step.querySelector("[data-process-count]");
      const state = step.querySelector("[data-process-state]");
      if (count) {
        count.textContent = String(index + 1).padStart(2, "0");
      }
      if (state) {
        state.textContent = index === 0 ? "Loading" : index === 1 ? "Next" : "Queued";
      }
      step.style.setProperty("--process-progress", index === 0 ? "72%" : "0%");
    });
  } else {
    processStepIndex = 0;
    queueNextProcessStep();
  }
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}
