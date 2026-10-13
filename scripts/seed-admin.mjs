import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Parse .env.local manually if not in process.env
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...vals] = trimmed.split("=");
      if (key && vals.length > 0) {
        process.env[key.trim()] = vals.join("=").trim().replace(/^["']|["']$/g, "");
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const ADMIN_EMAIL = process.argv[2] || "admin@ethixweb.com";
const ADMIN_PASSWORD = process.argv[3] || "AdminPassword123!";

async function seedAdmin() {
  console.log(`Checking admin credentials for: ${ADMIN_EMAIL}...`);

  // 1. Check if user already exists in auth.users
  const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error("Failed to list users:", listError.message);
    process.exit(1);
  }

  let user = listData.users.find((u) => u.email === ADMIN_EMAIL);

  if (!user) {
    console.log(`Creating new Supabase Auth user: ${ADMIN_EMAIL}...`);
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { name: "System Administrator" },
    });

    if (createError) {
      console.error("Failed to create admin user:", createError.message);
      process.exit(1);
    }
    user = createData.user;
    console.log(`✅ Supabase Auth user created with ID: ${user.id}`);
  } else {
    console.log(`User already exists with ID: ${user.id}. Updating password...`);
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });
    if (updateError) {
      console.error("Failed to update password:", updateError.message);
    } else {
      console.log(`✅ Password updated to: ${ADMIN_PASSWORD}`);
    }
  }

  // 2. Ensure user is in public.admins table
  const { data: adminRecord, error: adminQueryError } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminQueryError) {
    console.error("Error querying admins table:", adminQueryError.message);
  }

  if (!adminRecord) {
    console.log(`Inserting user ${user.id} into public.admins table...`);
    const { error: insertError } = await supabase.from("admins").insert({
      user_id: user.id,
      role: "admin",
    });

    if (insertError) {
      console.error("Failed to insert into admins table:", insertError.message);
      process.exit(1);
    }
    console.log(`✅ Added to public.admins table!`);
  } else {
    console.log(`✅ User is already present in public.admins table.`);
  }

  console.log(`\n==================================================`);
  console.log(`🎉 Admin User Ready!`);
  console.log(`Email:    ${ADMIN_EMAIL}`);
  console.log(`Password: ${ADMIN_PASSWORD}`);
  console.log(`URL:      http://localhost:3000/admin/login`);
  console.log(`==================================================\n`);
}

seedAdmin();
