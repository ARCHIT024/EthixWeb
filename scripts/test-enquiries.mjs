/**
 * Integration Test Script for POST /api/enquiries
 * Tests valid, invalid, honeypot spam, fast-submit spam, and rate-limiting payloads.
 * Run with: node scripts/test-enquiries.mjs
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

async function postEnquiry(payload, testName, mockIp = "198.51.100.1") {
  console.log(`\n==================================================`);
  console.log(`Running: ${testName}`);
  console.log(`==================================================`);

  try {
    const res = await fetch(`${BASE_URL}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": mockIp,
      },
      body: JSON.stringify(payload),
    });

    const status = res.status;
    const body = await res.json();

    console.log(`HTTP Status: ${status}`);
    console.log(`Response JSON:`, JSON.stringify(body, null, 2));

    return { status, body };
  } catch (err) {
    console.error(`Request failed for ${testName}:`, err.message);
    return { status: 0, error: err.message };
  }
}

async function runTests() {
  console.log(`Starting POST /api/enquiries Test Suite against ${BASE_URL}...`);

  let passed = 0;
  let total = 0;

  // Test 1: Valid Indian Business Payload
  total++;
  const validPayload = {
    name: "Devendra Patel",
    business_name: "Patel Textiles Pvt Ltd",
    phone: "+91 98250 12345",
    email: "devendra@pateltextiles.in",
    city: "Surat, Gujarat",
    service: "Websites & High-Speed Portals",
    budget_range: "₹50,000 – ₹1,00,000",
    preferred_contact: "whatsapp",
    message: "We need a high-speed Next.js product catalog and multi-currency inquiry system for textile buyers.",
    form_loaded_at: Date.now() - 6000, // 6 seconds ago (human duration)
    turnstile_token: "dev_bypass",
    source: "test_suite",
  };

  const res1 = await postEnquiry(validPayload, "Test 1: Valid Business Payload", "198.51.100.10");
  if (res1.status === 201 && res1.body.ok === true && res1.body.data?.id) {
    console.log("✅ PASS: Correctly created lead (201 Created) with UUID: " + res1.body.data.id);
    passed++;
  } else {
    console.log("❌ FAIL: Expected 201 Created with ok: true");
  }

  // Test 2: Invalid Payload (Fails Zod Schema Validation)
  total++;
  const invalidPayload = {
    name: "A", // too short (min 2)
    phone: "123456", // invalid Indian mobile
    email: "not-an-email", // invalid email
    service: "Unknown Nonexistent Service",
    budget_range: "Free",
    message: "short", // less than 10 chars
    form_loaded_at: Date.now() - 5000,
    turnstile_token: "dev_bypass",
  };

  const res2 = await postEnquiry(invalidPayload, "Test 2: Invalid Payload (Zod Validation Failure)", "198.51.100.20");
  if (res2.status === 422 && res2.body.ok === false && res2.body.fieldErrors) {
    console.log("✅ PASS: Correctly rejected with 422 Unprocessable Entity and fieldErrors: ", Object.keys(res2.body.fieldErrors));
    passed++;
  } else {
    console.log("❌ FAIL: Expected 422 with fieldErrors");
  }

  // Test 3: Spam Payload (Honeypot Triggered)
  total++;
  const honeypotPayload = {
    ...validPayload,
    name: "Spam Bot",
    honeypot: "http://bot-automated-spammer.com", // Honeypot populated!
    form_loaded_at: Date.now() - 5000,
  };

  const res3 = await postEnquiry(honeypotPayload, "Test 3: Spam Payload (Honeypot Field Populated)", "198.51.100.30");
  if (res3.status === 400 && res3.body.ok === false && res3.body.error?.includes("honeypot")) {
    console.log("✅ PASS: Correctly caught honeypot spam with 400 Bad Request");
    passed++;
  } else {
    console.log("❌ FAIL: Expected 400 Bad Request on honeypot");
  }

  // Test 4: Bot Speed Payload (Time-To-Submit Under 2 Seconds)
  total++;
  const fastBotPayload = {
    ...validPayload,
    name: "Instant Script Bot",
    form_loaded_at: Date.now() - 300, // Submitted in 300 milliseconds!
  };

  const res4 = await postEnquiry(fastBotPayload, "Test 4: Bot Fast-Submission (< 2.0s Time-To-Submit)", "198.51.100.40");
  if (res4.status === 400 && res4.body.ok === false && res4.body.error?.includes("fast")) {
    console.log("✅ PASS: Correctly rejected instantaneous bot submission with 400 Bad Request");
    passed++;
  } else {
    console.log("❌ FAIL: Expected 400 Bad Request for fast submission");
  }

  // Test 5: Per-IP Rate Limiting (Flood IP with multiple rapid requests)
  total++;
  const floodIp = "198.51.100.99";
  let rateLimited = false;
  console.log(`\n==================================================`);
  console.log(`Running: Test 5: Per-IP Rate Limiting (5 allowed, 6th blocked)`);
  console.log(`==================================================`);

  for (let i = 1; i <= 6; i++) {
    const res = await fetch(`${BASE_URL}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": floodIp,
      },
      body: JSON.stringify({
        ...validPayload,
        name: `Test Flood ${i}`,
        email: `flood${i}@test.com`,
      }),
    });
    const data = await res.json();
    if (res.status === 429) {
      console.log(`Request #${i}: HTTP 429 - ${data.error}`);
      rateLimited = true;
      break;
    } else {
      console.log(`Request #${i}: HTTP ${res.status}`);
    }
  }

  if (rateLimited) {
    console.log("✅ PASS: Rate limiter successfully blocked rapid flood with 429 Too Many Requests");
    passed++;
  } else {
    console.log("❌ FAIL: Expected request to be rate-limited with 429");
  }

  console.log(`\n==================================================`);
  console.log(`Test Suite Summary: ${passed}/${total} Tests Passed`);
  console.log(`==================================================\n`);

  process.exitCode = passed === total ? 0 : 1;
}

runTests();
