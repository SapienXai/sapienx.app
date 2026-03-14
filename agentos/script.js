const revealElements = document.querySelectorAll(".reveal");
const quickstartTabs = document.querySelectorAll("[data-tab-target]");
const quickstartPanels = document.querySelectorAll("[data-tab-panel]");
const copyButtons = document.querySelectorAll("[data-copy-target]");
const heroVideoFrame = document.querySelector(".hero-video-frame");
const year = document.querySelector("#year");
const mouseGlow = document.getElementById("mouse-glow");
const auras = document.querySelectorAll(".page-aura");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const pageTrafficSvg = document.getElementById("page-traffic-svg");
const pageTrafficRoutes = pageTrafficSvg?.querySelector(".page-traffic__routes");
const pageTrafficNodes = pageTrafficSvg?.querySelector(".page-traffic__nodes");
const pageTrafficPackets = pageTrafficSvg?.querySelector(".page-traffic__packets");
const pageTrafficLabels = pageTrafficSvg?.querySelector(".page-traffic__labels");
const githubButton = document.querySelector(".button--github");
const githubButtonSparkles = githubButton?.querySelector(".button__sparkles");
const githubButtonStars = githubButton
  ? Array.from(githubButton.querySelectorAll(".button__spark"))
  : [];
const reducedMotionQuery =
  typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;
const integrationCatalog = Array.isArray(window.AGENTOS_INTEGRATION_CATALOG)
  ? window.AGENTOS_INTEGRATION_CATALOG
      .map((entry) => {
        if (!Array.isArray(entry) || entry.length < 3) {
          return null;
        }

        const [name, accent, svg] = entry;
        return { name, accent, svg };
      })
      .filter(Boolean)
  : [];

const integrationCatalogRows = [[], []];
const SVG_NS = "http://www.w3.org/2000/svg";
const TRAFFIC_GRID_SIZE = 40;
const TRAFFIC_LABEL_MIN_WIDTH = 1080;
const TRAFFIC_LABEL_HOLD_RANGE = [860, 1180];
const GITHUB_STAR_PADDING_X = 12;
const GITHUB_STAR_PADDING_Y = 7;
const GITHUB_STAR_MIN_SPEED = 40;
const GITHUB_STAR_MAX_SPEED = 164;
const TRAFFIC_ROUTE_BLUEPRINTS = [
  {
    color: "103 232 249",
    signalDuration: "18s",
    signalDelay: "-3s",
    holds: [{ pointIndex: 4, messages: ["routing", "handoff"] }],
    points: [
      [0.08, 0.14],
      [0.22, 0.14],
      [0.22, 0.3],
      [0.38, 0.3],
      [0.38, 0.18],
      [0.58, 0.18],
    ],
    packets: [
      { color: "103 232 249", duration: 11000, delay: 0, radius: 3.1 },
      { color: "96 165 250", duration: 15200, delay: 2600, radius: 1.45 },
    ],
  },
  {
    color: "96 165 250",
    signalDuration: "20s",
    signalDelay: "-7s",
    holds: [{ pointIndex: 2, messages: ["queued", "verifying"] }],
    points: [
      [0.48, 0.08],
      [0.48, 0.24],
      [0.66, 0.24],
      [0.66, 0.12],
      [0.88, 0.12],
      [0.88, 0.32],
    ],
    packets: [{ color: "96 165 250", duration: 12600, delay: 1400, radius: 2.35 }],
  },
  {
    color: "45 212 191",
    signalDuration: "22s",
    signalDelay: "-11s",
    points: [
      [0.12, 0.4],
      [0.28, 0.4],
      [0.28, 0.56],
      [0.44, 0.56],
      [0.44, 0.44],
      [0.62, 0.44],
      [0.62, 0.62],
    ],
    packets: [{ color: "45 212 191", duration: 13800, delay: 2300, radius: 1.6 }],
  },
  {
    color: "251 191 36",
    signalDuration: "24s",
    signalDelay: "-15s",
    holds: [{ pointIndex: 3, messages: ["dispatching", "approved"] }],
    points: [
      [0.74, 0.2],
      [0.74, 0.36],
      [0.56, 0.36],
      [0.56, 0.52],
      [0.76, 0.52],
      [0.76, 0.72],
    ],
    packets: [
      { color: "251 191 36", duration: 14200, delay: 1800, radius: 3.4 },
      { color: "103 232 249", duration: 9800, delay: 5200, radius: 1.25 },
    ],
  },
  {
    color: "103 232 249",
    signalDuration: "19s",
    signalDelay: "-5s",
    holds: [{ pointIndex: 3, messages: ["syncing", "watching"] }],
    points: [
      [0.08, 0.64],
      [0.24, 0.64],
      [0.24, 0.8],
      [0.5, 0.8],
      [0.5, 0.66],
      [0.68, 0.66],
    ],
    packets: [{ color: "103 232 249", duration: 13000, delay: 3200, radius: 2.7 }],
  },
  {
    color: "96 165 250",
    signalDuration: "23s",
    signalDelay: "-13s",
    points: [
      [0.82, 0.48],
      [0.82, 0.72],
      [0.92, 0.72],
      [0.92, 0.88],
    ],
    packets: [{ color: "96 165 250", duration: 9000, delay: 800, radius: 1.35 }],
  },
  {
    color: "244 114 182",
    signalDuration: "26s",
    signalDelay: "-17s",
    points: [
      [0.36, 0.06],
      [0.36, 0.18],
      [0.52, 0.18],
      [0.52, 0.34],
      [0.74, 0.34],
    ],
    packets: [{ color: "244 114 182", duration: 14800, delay: 4200, radius: 2.9 }],
  },
  {
    color: "103 232 249",
    signalDuration: "21s",
    signalDelay: "-9s",
    points: [
      [0.16, 0.88],
      [0.34, 0.88],
      [0.34, 0.72],
      [0.58, 0.72],
      [0.58, 0.9],
      [0.82, 0.9],
    ],
    packets: [{ color: "103 232 249", duration: 15600, delay: 2800, radius: 1.5 }],
  },
];

const trafficState = {
  frameId: 0,
  resizeTimeout: 0,
  packets: [],
  nodes: [],
  activeLabelPacketId: null,
  label: null,
  labelsEnabled: false,
};

const githubStarState = {
  frameId: 0,
  lastTime: 0,
  resizeTimeout: 0,
  stars: [],
  bounds: null,
};

integrationCatalog.forEach((entry, index) => {
  integrationCatalogRows[index % integrationCatalogRows.length].push(entry);
});

const createSvgElement = (tag, attributes = {}) => {
  const element = document.createElementNS(SVG_NS, tag);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });

  return element;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const snapToTrafficGrid = (value, limit) =>
  clamp(
    Math.round(value / TRAFFIC_GRID_SIZE) * TRAFFIC_GRID_SIZE,
    TRAFFIC_GRID_SIZE,
    Math.max(TRAFFIC_GRID_SIZE, limit - TRAFFIC_GRID_SIZE)
  );

const buildTrafficPath = (points) =>
  points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

const randomBetween = (min, max) => min + Math.random() * (max - min);

const renderGithubStars = () => {
  githubStarState.stars.forEach((star) => {
    star.impact *= 0.86;

    const translateX = star.x - star.width / 2;
    const translateY = star.y - star.height / 2;
    const stretch = 1 + star.impact;
    const squash = Math.max(0.82, 1 - star.impact * 0.62);

    star.element.style.transform =
      `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) ` +
      `rotate(${star.rotation.toFixed(2)}deg) scale(${stretch.toFixed(3)}, ${squash.toFixed(3)})`;
  });
};

const placeGithubStars = (stars, bounds) => {
  const seededStars = [];

  stars.forEach((star, index) => {
    let attempts = 0;

    while (attempts < 240) {
      const x = randomBetween(
        GITHUB_STAR_PADDING_X + star.radius,
        bounds.width - GITHUB_STAR_PADDING_X - star.radius
      );
      const y = randomBetween(
        GITHUB_STAR_PADDING_Y + star.radius,
        bounds.height - GITHUB_STAR_PADDING_Y - star.radius
      );

      const overlaps = seededStars.some((otherStar) => {
        const dx = x - otherStar.x;
        const dy = y - otherStar.y;
        const minDistance = star.radius + otherStar.radius + 4;
        return dx * dx + dy * dy < minDistance * minDistance;
      });

      if (!overlaps) {
        star.x = x;
        star.y = y;
        seededStars.push(star);
        return;
      }

      attempts += 1;
    }

    const angle = (Math.PI * 2 * index) / Math.max(1, stars.length);
    const orbitX = Math.max(0, bounds.width * 0.2 - star.radius * 1.4);
    const orbitY = Math.max(0, bounds.height * 0.15 - star.radius);
    star.x = bounds.width / 2 + Math.cos(angle) * orbitX;
    star.y = bounds.height / 2 + Math.sin(angle) * orbitY;
    seededStars.push(star);
  });
};

const resolveGithubWallCollisions = () => {
  if (!githubStarState.bounds) {
    return;
  }

  githubStarState.stars.forEach((star) => {
    const minX = GITHUB_STAR_PADDING_X + star.radius;
    const maxX = githubStarState.bounds.width - GITHUB_STAR_PADDING_X - star.radius;
    const minY = GITHUB_STAR_PADDING_Y + star.radius;
    const maxY = githubStarState.bounds.height - GITHUB_STAR_PADDING_Y - star.radius;

    if (star.x < minX) {
      star.x = minX;
      star.vx = Math.abs(star.vx) * 0.99;
      star.spin += randomBetween(12, 22);
      star.impact = Math.max(star.impact, 0.09);
    } else if (star.x > maxX) {
      star.x = maxX;
      star.vx = -Math.abs(star.vx) * 0.99;
      star.spin -= randomBetween(12, 22);
      star.impact = Math.max(star.impact, 0.09);
    }

    if (star.y < minY) {
      star.y = minY;
      star.vy = Math.abs(star.vy) * 0.99;
      star.spin += randomBetween(10, 18);
      star.impact = Math.max(star.impact, 0.08);
    } else if (star.y > maxY) {
      star.y = maxY;
      star.vy = -Math.abs(star.vy) * 0.99;
      star.spin -= randomBetween(10, 18);
      star.impact = Math.max(star.impact, 0.08);
    }
  });
};

const resolveGithubStarCollisions = () => {
  const { stars } = githubStarState;

  for (let index = 0; index < stars.length; index += 1) {
    const star = stars[index];

    for (let otherIndex = index + 1; otherIndex < stars.length; otherIndex += 1) {
      const otherStar = stars[otherIndex];
      const dx = otherStar.x - star.x;
      const dy = otherStar.y - star.y;
      const minDistance = star.radius + otherStar.radius + 2;
      const distanceSquared = dx * dx + dy * dy;

      if (distanceSquared >= minDistance * minDistance) {
        continue;
      }

      const distance = Math.sqrt(distanceSquared) || 0.001;
      const normalX = dx / distance;
      const normalY = dy / distance;
      const overlap = minDistance - distance;
      const totalMass = star.mass + otherStar.mass;

      star.x -= normalX * overlap * (otherStar.mass / totalMass);
      star.y -= normalY * overlap * (otherStar.mass / totalMass);
      otherStar.x += normalX * overlap * (star.mass / totalMass);
      otherStar.y += normalY * overlap * (star.mass / totalMass);

      const relativeVelocityX = otherStar.vx - star.vx;
      const relativeVelocityY = otherStar.vy - star.vy;
      const velocityAlongNormal = relativeVelocityX * normalX + relativeVelocityY * normalY;

      if (velocityAlongNormal < 0) {
        const restitution = 0.985;
        const impulse =
          (-(1 + restitution) * velocityAlongNormal) /
          (1 / star.mass + 1 / otherStar.mass);
        const impulseX = impulse * normalX;
        const impulseY = impulse * normalY;

        star.vx -= impulseX / star.mass;
        star.vy -= impulseY / star.mass;
        otherStar.vx += impulseX / otherStar.mass;
        otherStar.vy += impulseY / otherStar.mass;
      }

      const tangentX = -normalY;
      const tangentY = normalX;
      const tangentialVelocity = relativeVelocityX * tangentX + relativeVelocityY * tangentY;
      const impact = clamp(Math.abs(velocityAlongNormal) * 0.0045, 0.07, 0.24);

      star.spin -= tangentialVelocity * 0.55 / star.mass;
      otherStar.spin += tangentialVelocity * 0.55 / otherStar.mass;
      star.impact = Math.max(star.impact, impact);
      otherStar.impact = Math.max(otherStar.impact, impact);
    }
  }
};

const animateGithubStars = (timestamp) => {
  if (!githubStarState.stars.length) {
    return;
  }

  const delta = timestamp - (githubStarState.lastTime || timestamp - 16.67);
  const deltaSeconds = Math.min(0.032, Math.max(0.01, delta / 1000));
  const hoverBoost = githubButton?.matches(":hover, :focus-visible") ? 1.18 : 1;

  githubStarState.lastTime = timestamp;

  githubStarState.stars.forEach((star, index) => {
    const driftTime = timestamp * 0.001 * star.driftSpeed + star.driftPhase;
    star.vx += Math.cos(driftTime + index * 0.32) * star.driftStrength * deltaSeconds * hoverBoost;
    star.vy +=
      Math.sin(driftTime * 1.18 + index * 0.41) * star.driftStrength * deltaSeconds * hoverBoost;

    const speed = Math.hypot(star.vx, star.vy);
    const clampedSpeed = clamp(speed, GITHUB_STAR_MIN_SPEED, GITHUB_STAR_MAX_SPEED * hoverBoost);

    if (speed > 0.001 && speed !== clampedSpeed) {
      const scale = clampedSpeed / speed;
      star.vx *= scale;
      star.vy *= scale;
    }

    star.x += star.vx * deltaSeconds;
    star.y += star.vy * deltaSeconds;
    star.rotation += star.spin * deltaSeconds;
    star.spin *= 0.998;

    if (Math.abs(star.spin) < 14) {
      star.spin += randomBetween(-6, 6);
    }
  });

  resolveGithubWallCollisions();
  resolveGithubStarCollisions();
  resolveGithubWallCollisions();
  renderGithubStars();

  githubStarState.frameId = window.requestAnimationFrame(animateGithubStars);
};

const buildGithubStarPhysics = () => {
  window.cancelAnimationFrame(githubStarState.frameId);
  githubStarState.frameId = 0;
  githubStarState.lastTime = 0;

  if (!githubButtonSparkles || !githubButtonStars.length) {
    return;
  }

  const bounds = githubButtonSparkles.getBoundingClientRect();

  if (!bounds.width || !bounds.height) {
    return;
  }

  githubStarState.bounds = {
    width: bounds.width,
    height: bounds.height,
  };

  githubStarState.stars = githubButtonStars.map((element) => {
    element.style.transform = "translate3d(-999px, -999px, 0)";

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const mass = clamp(size / 10.5, 0.94, 2.25);
    const speedBias = clamp(1.55 - mass * 0.36, 0.72, 1.38);
    const launchAngle = randomBetween(0, Math.PI * 2);
    const launchSpeed = randomBetween(78, 134) * speedBias;

    return {
      element,
      width: rect.width,
      height: rect.height,
      radius: Math.max(4.8, size * 0.3),
      mass,
      x: 0,
      y: 0,
      vx: Math.cos(launchAngle) * launchSpeed,
      vy: Math.sin(launchAngle) * launchSpeed,
      rotation: randomBetween(-24, 24),
      spin: randomBetween(-54, 54) / mass,
      driftPhase: randomBetween(0, Math.PI * 2),
      driftSpeed: randomBetween(0.78, 1.52),
      driftStrength: randomBetween(18, 34) / mass,
      impact: 0,
    };
  });

  placeGithubStars(githubStarState.stars, githubStarState.bounds);
  renderGithubStars();

  if (!reducedMotionQuery?.matches) {
    githubStarState.lastTime = window.performance.now();
    githubStarState.frameId = window.requestAnimationFrame(animateGithubStars);
  }
};

const scheduleGithubStarBuild = () => {
  window.clearTimeout(githubStarState.resizeTimeout);
  githubStarState.resizeTimeout = window.setTimeout(buildGithubStarPhysics, 90);
};

const hideTrafficLabel = () => {
  if (!trafficState.label) {
    return;
  }

  trafficState.label.group.classList.remove("is-visible");
};

const ensureTrafficLabel = () => {
  if (!pageTrafficLabels) {
    return null;
  }

  if (trafficState.label) {
    return trafficState.label;
  }

  const group = createSvgElement("g", {
    class: "page-traffic__label",
  });
  const tail = createSvgElement("line", {
    class: "page-traffic__label-tail",
    x1: 0,
    y1: -8,
    x2: 0,
    y2: -2.5,
  });
  const dot = createSvgElement("circle", {
    class: "page-traffic__label-dot",
    cx: 0,
    cy: 0,
    r: 1.8,
  });
  const bubble = createSvgElement("rect", {
    class: "page-traffic__label-bubble",
    x: -28,
    y: -34,
    width: 56,
    height: 16,
    rx: 8,
    ry: 8,
  });
  const text = createSvgElement("text", {
    class: "page-traffic__label-text",
    x: 0,
    y: -22,
  });

  group.append(tail, dot, bubble, text);
  pageTrafficLabels.append(group);
  trafficState.label = { group, bubble, text };
  return trafficState.label;
};

const showTrafficLabel = (node, message) => {
  const label = ensureTrafficLabel();

  if (!label) {
    return;
  }

  label.group.style.setProperty("--label-color", node.color);
  label.text.textContent = message;
  label.group.setAttribute("transform", `translate(${node.x} ${node.y - 8})`);

  const bubbleWidth = clamp(18 + message.length * 6.4, 62, 112);
  const bubbleHeight = 16;

  label.bubble.setAttribute("x", (-bubbleWidth / 2).toFixed(2));
  label.bubble.setAttribute("y", "-31");
  label.bubble.setAttribute("width", bubbleWidth.toFixed(2));
  label.bubble.setAttribute("height", String(bubbleHeight));
  label.bubble.setAttribute("rx", "8");
  label.bubble.setAttribute("ry", "8");

  label.group.classList.add("is-visible");
};

const getTrafficHoldDuration = () =>
  TRAFFIC_LABEL_HOLD_RANGE[0] + Math.random() * (TRAFFIC_LABEL_HOLD_RANGE[1] - TRAFFIC_LABEL_HOLD_RANGE[0]);

const updatePacketTransform = (packet, distance) => {
  const point = packet.path.getPointAtLength(distance);
  const previousPoint = packet.path.getPointAtLength(Math.max(0, distance - 10));
  const angle = Math.atan2(point.y - previousPoint.y, point.x - previousPoint.x) * (180 / Math.PI);

  packet.x = point.x;
  packet.y = point.y;
  packet.element.setAttribute(
    "transform",
    `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)}) rotate(${angle.toFixed(2)})`
  );
};

const maybeTriggerTrafficHold = (packet, time, nextDistance) => {
  if (!trafficState.labelsEnabled || trafficState.activeLabelPacketId !== null) {
    return null;
  }

  const wrapped = nextDistance < packet.lastDistance;

  for (const hold of packet.holds) {
    if (packet.triggeredHolds.get(hold.id) === packet.cycle) {
      continue;
    }

    const passed =
      (!wrapped && hold.distance >= packet.lastDistance && hold.distance <= nextDistance) ||
      (wrapped && (hold.distance >= packet.lastDistance || hold.distance <= nextDistance));

    if (!passed) {
      continue;
    }

    packet.state = "holding";
    packet.holdStartedAt = time;
    packet.holdUntil = time + getTrafficHoldDuration();
    packet.holdDistance = hold.distance;
    packet.triggeredHolds.set(hold.id, packet.cycle);
    const message = hold.messages[Math.floor(Math.random() * hold.messages.length)];

    try {
      trafficState.activeLabelPacketId = packet.id;
      showTrafficLabel(hold.node, message);
    } catch (_error) {
      packet.state = "moving";
      packet.holdStartedAt = 0;
      packet.holdUntil = 0;
      packet.holdDistance = 0;
      trafficState.activeLabelPacketId = null;
      hideTrafficLabel();
      return null;
    }

    return hold.distance;
  }

  return null;
};

const stopTrafficAnimation = () => {
  if (trafficState.frameId) {
    window.cancelAnimationFrame(trafficState.frameId);
    trafficState.frameId = 0;
  }

  trafficState.activeLabelPacketId = null;
  hideTrafficLabel();
};

const animateTraffic = (time) => {
  trafficState.packets.forEach((packet) => {
    if (packet.state === "holding") {
      if (time >= packet.holdUntil) {
        packet.pauseOffsetMs += packet.holdUntil - packet.holdStartedAt;
        packet.state = "moving";
        packet.holdStartedAt = 0;
        packet.holdUntil = 0;
        trafficState.activeLabelPacketId = null;
        hideTrafficLabel();
      } else {
        updatePacketTransform(packet, packet.holdDistance);
        packet.lastDistance = packet.holdDistance;
        return;
      }
    }

    const effectiveTime = time + packet.delay - packet.pauseOffsetMs;
    const normalizedTime = ((effectiveTime % packet.duration) + packet.duration) % packet.duration;
    const distance = (normalizedTime / packet.duration) * packet.length;

    if (distance < packet.lastDistance) {
      packet.cycle += 1;
    }

    const holdDistance = maybeTriggerTrafficHold(packet, time, distance);

    if (holdDistance !== null) {
      updatePacketTransform(packet, holdDistance);
      packet.lastDistance = holdDistance;
      return;
    }

    updatePacketTransform(packet, distance);
    packet.lastDistance = distance;
  });

  trafficState.nodes.forEach((node) => {
    let nextEnergy = node.energy * 0.88;

    for (const packet of trafficState.packets) {
      const dx = packet.x - node.x;
      const dy = packet.y - node.y;

      if (dx * dx + dy * dy <= node.thresholdSq) {
        nextEnergy = 1;
        break;
      }
    }

    node.energy = nextEnergy;
    node.pulse.setAttribute("r", (2.2 + nextEnergy * 6.2).toFixed(2));
    node.pulse.style.opacity = (0.08 + nextEnergy * 0.38).toFixed(3);
    node.core.setAttribute("r", (1.45 + nextEnergy * 0.9).toFixed(2));
    node.core.style.opacity = (0.2 + nextEnergy * 0.62).toFixed(3);
  });

  trafficState.frameId = window.requestAnimationFrame(animateTraffic);
};

const buildTrafficLayer = () => {
  if (!pageTrafficSvg || !pageTrafficRoutes || !pageTrafficNodes || !pageTrafficPackets) {
    return;
  }

  stopTrafficAnimation();

  pageTrafficRoutes.textContent = "";
  pageTrafficNodes.textContent = "";
  pageTrafficPackets.textContent = "";
  trafficState.packets = [];
  trafficState.nodes = [];

  const width = window.innerWidth;
  const height = window.innerHeight;
  const reducedMotion = reducedMotionQuery?.matches;
  const labelsEnabled = !reducedMotion && width > TRAFFIC_LABEL_MIN_WIDTH;
  const routeLimit = width <= 560 ? 4 : width <= 720 ? 5 : width <= 1080 ? 6 : TRAFFIC_ROUTE_BLUEPRINTS.length;
  const routeBlueprints = TRAFFIC_ROUTE_BLUEPRINTS.slice(0, routeLimit);
  const nodeMap = new Map();
  trafficState.labelsEnabled = labelsEnabled;

  pageTrafficSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  if (pageTrafficLabels) {
    pageTrafficLabels.textContent = "";
    trafficState.label = null;
  }

  routeBlueprints.forEach((route, routeIndex) => {
    const points = route.points.map(([x, y]) => ({
      x: snapToTrafficGrid(width * x, width),
      y: snapToTrafficGrid(height * y, height),
    }));
    const pointDistances = [0];

    for (let index = 1; index < points.length; index += 1) {
      const dx = points[index].x - points[index - 1].x;
      const dy = points[index].y - points[index - 1].y;
      pointDistances[index] = pointDistances[index - 1] + Math.hypot(dx, dy);
    }

    const d = buildTrafficPath(points);
    const holdMap = new Map(
      Array.isArray(route.holds)
        ? route.holds.map((hold, holdIndex) => [
            hold.pointIndex,
            { ...hold, id: `${routeIndex}-${holdIndex}` },
          ])
        : []
    );

    const routePath = createSvgElement("path", {
      class: "page-traffic__route",
      d,
    });
    routePath.style.setProperty("--route-color", route.color);

    const signalPath = createSvgElement("path", {
      class: "page-traffic__route-signal",
      d,
    });
    signalPath.style.setProperty("--route-color", route.color);
    signalPath.style.setProperty("--route-duration", route.signalDuration);
    signalPath.style.setProperty("--route-delay", route.signalDelay);

    pageTrafficRoutes.append(routePath, signalPath);

    points.forEach((point, pointIndex) => {
      const key = `${point.x},${point.y}`;

      if (nodeMap.has(key)) {
        return;
      }

      const nodeGroup = createSvgElement("g", {
        transform: `translate(${point.x} ${point.y})`,
      });
      nodeGroup.style.setProperty("--node-color", route.color);

      const pulse = createSvgElement("circle", {
        class: "page-traffic__node-pulse",
        r: 2.2,
        filter: "url(#page-traffic-glow)",
      });
      const core = createSvgElement("circle", {
        class: "page-traffic__node-core",
        r: 1.45,
      });

      nodeGroup.append(pulse, core);
      pageTrafficNodes.append(nodeGroup);
      nodeMap.set(key, {
        key,
        x: point.x,
        y: point.y,
        color: route.color,
        pulse,
        core,
        energy: 0,
        thresholdSq: 256,
        hold: holdMap.get(pointIndex) || null,
      });
    });

    if (reducedMotion) {
      return;
    }

    route.packets.forEach((packetConfig, packetIndex) => {
      const packetDelay = packetConfig.delay + routeIndex * 420 + packetIndex * 680;
      const initialDistance = (((packetDelay % packetConfig.duration) + packetConfig.duration) % packetConfig.duration / packetConfig.duration) * routePath.getTotalLength();
      const packetGroup = createSvgElement("g", {
        class: "page-traffic__packet",
      });
      packetGroup.style.setProperty("--packet-color", packetConfig.color || route.color);

      const tail = createSvgElement("ellipse", {
        class: "page-traffic__packet-tail",
        cx: -(packetConfig.radius * 2.6),
        cy: 0,
        rx: packetConfig.radius * 2.5,
        ry: packetConfig.radius * 0.82,
        filter: "url(#page-traffic-glow)",
      });
      const glow = createSvgElement("circle", {
        class: "page-traffic__packet-glow",
        r: packetConfig.radius * 2.25,
        filter: "url(#page-traffic-glow)",
      });
      const core = createSvgElement("circle", {
        class: "page-traffic__packet-core",
        r: packetConfig.radius,
      });

      packetGroup.append(tail, glow, core);
      pageTrafficPackets.append(packetGroup);

      trafficState.packets.push({
        id: `${routeIndex}-${packetIndex}`,
        element: packetGroup,
        path: routePath,
        length: routePath.getTotalLength(),
        duration: packetConfig.duration,
        delay: packetDelay,
        pauseOffsetMs: 0,
        state: "moving",
        holdStartedAt: 0,
        holdUntil: 0,
        holdDistance: 0,
        cycle: 0,
        lastDistance: initialDistance,
        triggeredHolds: new Map(),
        holds: labelsEnabled
          ? Array.from(holdMap.values())
              .map((hold) => {
                const node = nodeMap.get(`${points[hold.pointIndex].x},${points[hold.pointIndex].y}`);

                if (!node) {
                  return null;
                }

                return {
                  id: hold.id,
                  distance: pointDistances[hold.pointIndex],
                  messages: hold.messages,
                  node,
                };
              })
              .filter(Boolean)
          : [],
        x: 0,
        y: 0,
      });
    });
  });

  trafficState.nodes = Array.from(nodeMap.values());

  if (!reducedMotion && trafficState.packets.length) {
    trafficState.frameId = window.requestAnimationFrame(animateTraffic);
  }
};

const scheduleTrafficBuild = () => {
  window.clearTimeout(trafficState.resizeTimeout);
  trafficState.resizeTimeout = window.setTimeout(buildTrafficLayer, 140);
};

// Mobile menu toggle
if (mobileMenuToggle && siteNav && siteHeader) {
  const setMobileMenuState = (isOpen) => {
    siteHeader.classList.toggle("is-menu-open", isOpen);
    mobileMenuToggle.classList.toggle("is-active", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  const closeMobileMenu = () => {
    setMobileMenuState(false);
  };

  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = !siteHeader.classList.contains("is-menu-open");
    setMobileMenuState(isOpen);
  });

  // Close menu when clicking a link
  siteHeader.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 940) {
        closeMobileMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 940) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target) && siteHeader.classList.contains("is-menu-open")) {
      closeMobileMenu();
    }
  });
}

// Mouse glow and card effects
document.addEventListener("mousemove", (e) => {
  if (mouseGlow) {
    mouseGlow.style.opacity = "1";
    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY}px`;
  }

  // Subtle aura parallax
  auras.forEach((aura, index) => {
    const speed = (index + 1) * 20;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    aura.style.transform = `translate(${x}px, ${y}px)`;
  });
});

document.addEventListener("mouseleave", () => {
  if (mouseGlow) {
    mouseGlow.style.opacity = "0";
  }
});

const createIntegrationPill = ({ name, accent, svg }) => {
  const pill = document.createElement("span");
  pill.className = "hero-integration-pill";
  pill.style.setProperty("--pill-accent", accent);

  const icon = document.createElement("span");
  icon.className = "hero-integration-pill__icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = svg;

  const label = document.createElement("span");
  label.className = "hero-integration-pill__label";
  label.textContent = name;

  pill.append(icon, label);
  return pill;
};

integrationCatalogRows.forEach((items, rowIndex) => {
  const track = document.querySelector(`[data-integration-row="${rowIndex}"]`);
  const clone = document.querySelector(`[data-integration-row-clone="${rowIndex}"]`);

  if (!track || !clone) {
    return;
  }

  items.forEach((item) => {
    track.append(createIntegrationPill(item));
    clone.append(createIntegrationPill(item));
  });
});

buildTrafficLayer();
window.requestAnimationFrame(buildGithubStarPhysics);
window.addEventListener("resize", scheduleTrafficBuild);
window.addEventListener("resize", scheduleGithubStarBuild);

if (typeof window.ResizeObserver === "function" && githubButton) {
  const githubButtonResizeObserver = new window.ResizeObserver(() => {
    scheduleGithubStarBuild();
  });

  githubButtonResizeObserver.observe(githubButton);
}

window.addEventListener("load", scheduleGithubStarBuild, { once: true });

const handleReducedMotionChange = () => {
  buildTrafficLayer();
  buildGithubStarPhysics();
};

if (typeof reducedMotionQuery?.addEventListener === "function") {
  reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
} else if (typeof reducedMotionQuery?.addListener === "function") {
  reducedMotionQuery.addListener(handleReducedMotionChange);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0,
    rootMargin: "0px 0px 24% 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const setActiveTab = (target) => {
  quickstartTabs.forEach((tab) => {
    const isActive = tab.dataset.tabTarget === target;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  quickstartPanels.forEach((panel) => {
    const isActive = panel.dataset.tabPanel === target;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
};

quickstartTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveTab(tab.dataset.tabTarget);
  });
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.dataset.copyTarget;
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      const previousText = button.textContent;
      button.textContent = "Copied";
      button.classList.add("is-copied");

      window.setTimeout(() => {
        button.textContent = previousText;
        button.classList.remove("is-copied");
      }, 1400);
    } catch (_error) {
      button.textContent = "Failed";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1400);
    }
  });
});

if (heroVideoFrame && window.location.protocol !== "file:") {
  const baseSrc = heroVideoFrame.dataset.baseSrc?.trim();

  if (baseSrc) {
    const separator = baseSrc.includes("?") ? "&" : "?";
    heroVideoFrame.src = `${baseSrc}${separator}origin=${encodeURIComponent(window.location.origin)}`;
  }
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}
