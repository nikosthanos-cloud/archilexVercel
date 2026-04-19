"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/vercel.ts
var vercel_exports = {};
__export(vercel_exports, {
  default: () => handler
});
module.exports = __toCommonJS(vercel_exports);
var import_express = __toESM(require("express"), 1);

// server/routes.ts
var import_express_session = __toESM(require("express-session"), 1);
var import_connect_pg_simple = __toESM(require("connect-pg-simple"), 1);
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var import_multer = __toESM(require("multer"), 1);

// server/db.ts
var import_node_postgres = require("drizzle-orm/node-postgres");
var import_pg = require("pg");

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  insertProjectNoteSchema: () => insertProjectNoteSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertQuestionSchema: () => insertQuestionSchema,
  insertUserSchema: () => insertUserSchema,
  legalSources: () => legalSources,
  loginSchema: () => loginSchema,
  passwordResetTokens: () => passwordResetTokens,
  payments: () => payments,
  projectNotes: () => projectNotes,
  projects: () => projects,
  questions: () => questions,
  session: () => session,
  updateProfileSchema: () => updateProfileSchema,
  uploads: () => uploads,
  users: () => users
});
var import_drizzle_orm = require("drizzle-orm");
var import_pg_core = require("drizzle-orm/pg-core");
var import_drizzle_zod = require("drizzle-zod");
var import_zod = require("zod");
var users = (0, import_pg_core.pgTable)("users", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  email: (0, import_pg_core.text)("email").notNull().unique(),
  password: (0, import_pg_core.text)("password").notNull(),
  fullName: (0, import_pg_core.text)("full_name").notNull(),
  profession: (0, import_pg_core.text)("profession").notNull().default("architect"),
  plan: (0, import_pg_core.text)("plan").notNull().default("free"),
  usesThisMonth: (0, import_pg_core.integer)("questions_used_this_month").notNull().default(0),
  lastResetDate: (0, import_pg_core.timestamp)("last_reset_date").notNull().default(import_drizzle_orm.sql`now()`),
  createdAt: (0, import_pg_core.timestamp)("created_at").notNull().default(import_drizzle_orm.sql`now()`),
  firstName: (0, import_pg_core.text)("first_name"),
  lastName: (0, import_pg_core.text)("last_name"),
  phone: (0, import_pg_core.text)("phone"),
  officeAddress: (0, import_pg_core.text)("office_address"),
  teeNumber: (0, import_pg_core.text)("tee_number"),
  specialty: (0, import_pg_core.text)("specialty"),
  role: (0, import_pg_core.text)("role").notNull().default("user"),
  lastLoginAt: (0, import_pg_core.timestamp)("last_login_at"),
  // New fields
  emailVerified: (0, import_pg_core.boolean)("email_verified").notNull().default(false),
  emailVerificationToken: (0, import_pg_core.text)("email_verification_token"),
  stripeCustomerId: (0, import_pg_core.text)("stripe_customer_id"),
  stripeSubscriptionId: (0, import_pg_core.text)("stripe_subscription_id"),
  subscriptionEndDate: (0, import_pg_core.timestamp)("subscription_end_date")
});
var passwordResetTokens = (0, import_pg_core.pgTable)("password_reset_tokens", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  userId: (0, import_pg_core.varchar)("user_id").notNull().references(() => users.id),
  token: (0, import_pg_core.text)("token").notNull(),
  expiresAt: (0, import_pg_core.timestamp)("expires_at").notNull(),
  used: (0, import_pg_core.boolean)("used").notNull().default(false),
  createdAt: (0, import_pg_core.timestamp)("created_at").notNull().default(import_drizzle_orm.sql`now()`)
});
var questions = (0, import_pg_core.pgTable)("questions", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  userId: (0, import_pg_core.varchar)("user_id").notNull().references(() => users.id),
  question: (0, import_pg_core.text)("question").notNull(),
  answer: (0, import_pg_core.text)("answer").notNull(),
  citations: (0, import_pg_core.json)("citations").$type(),
  createdAt: (0, import_pg_core.timestamp)("created_at").notNull().default(import_drizzle_orm.sql`now()`)
});
var legalSources = (0, import_pg_core.pgTable)("legal_sources", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  citationKey: (0, import_pg_core.text)("citation_key").notNull().unique(),
  sourceType: (0, import_pg_core.text)("source_type").notNull(),
  title: (0, import_pg_core.text)("title").notNull(),
  lawNumber: (0, import_pg_core.text)("law_number"),
  article: (0, import_pg_core.text)("article"),
  paragraph: (0, import_pg_core.text)("paragraph"),
  fullText: (0, import_pg_core.text)("full_text").notNull(),
  summary: (0, import_pg_core.text)("summary").notNull(),
  officialUrl: (0, import_pg_core.text)("official_url"),
  fekReference: (0, import_pg_core.text)("fek_reference"),
  lastVerifiedAt: (0, import_pg_core.timestamp)("last_verified_at").notNull().default(import_drizzle_orm.sql`now()`),
  createdAt: (0, import_pg_core.timestamp)("created_at").notNull().default(import_drizzle_orm.sql`now()`)
});
var insertUserSchema = (0, import_drizzle_zod.createInsertSchema)(users).pick({
  email: true,
  password: true,
  fullName: true,
  profession: true
}).extend({
  email: import_zod.z.string().email("\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF email"),
  password: import_zod.z.string().min(8, "\u039F \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC\u03C2 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9 \u03C4\u03BF\u03C5\u03BB\u03AC\u03C7\u03B9\u03C3\u03C4\u03BF\u03BD 8 \u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03AE\u03C1\u03B5\u03C2"),
  fullName: import_zod.z.string().min(2, "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03C4\u03BF \u03BF\u03BD\u03BF\u03BC\u03B1\u03C4\u03B5\u03C0\u03CE\u03BD\u03C5\u03BC\u03CC \u03C3\u03B1\u03C2"),
  profession: import_zod.z.enum(["architect", "civil_engineer", "mechanical_engineer", "electrical_engineer", "other"])
});
var loginSchema = import_zod.z.object({
  email: import_zod.z.string().email("\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF email"),
  password: import_zod.z.string().min(1, "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03C4\u03BF\u03BD \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC \u03C3\u03B1\u03C2")
});
var updateProfileSchema = import_zod.z.object({
  firstName: import_zod.z.string().min(1, "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03C4\u03BF \u03CC\u03BD\u03BF\u03BC\u03AC \u03C3\u03B1\u03C2"),
  lastName: import_zod.z.string().min(1, "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03C4\u03BF \u03B5\u03C0\u03CE\u03BD\u03C5\u03BC\u03CC \u03C3\u03B1\u03C2"),
  email: import_zod.z.string().email("\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF email"),
  phone: import_zod.z.string().optional().default(""),
  officeAddress: import_zod.z.string().optional().default(""),
  teeNumber: import_zod.z.string().optional().default(""),
  specialty: import_zod.z.string().optional().default("")
});
var uploads = (0, import_pg_core.pgTable)("uploads", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  userId: (0, import_pg_core.varchar)("user_id").notNull().references(() => users.id),
  filename: (0, import_pg_core.text)("filename").notNull(),
  fileType: (0, import_pg_core.text)("file_type").notNull(),
  analysis: (0, import_pg_core.text)("analysis").notNull(),
  createdAt: (0, import_pg_core.timestamp)("created_at").notNull().default(import_drizzle_orm.sql`now()`)
});
var projects = (0, import_pg_core.pgTable)("projects", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  userId: (0, import_pg_core.varchar)("user_id").notNull().references(() => users.id),
  name: (0, import_pg_core.text)("name").notNull(),
  clientName: (0, import_pg_core.text)("client_name").notNull(),
  address: (0, import_pg_core.text)("address").notNull(),
  projectType: (0, import_pg_core.text)("project_type").notNull(),
  startDate: (0, import_pg_core.text)("start_date").notNull(),
  deadline: (0, import_pg_core.text)("deadline"),
  status: (0, import_pg_core.text)("status").notNull().default("\u03A0\u03C1\u03BF\u03B5\u03C4\u03BF\u03B9\u03BC\u03B1\u03C3\u03AF\u03B1"),
  createdAt: (0, import_pg_core.timestamp)("created_at").notNull().default(import_drizzle_orm.sql`now()`)
});
var projectNotes = (0, import_pg_core.pgTable)("project_notes", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  projectId: (0, import_pg_core.varchar)("project_id").notNull().references(() => projects.id),
  userId: (0, import_pg_core.varchar)("user_id").notNull().references(() => users.id),
  content: (0, import_pg_core.text)("content").notNull(),
  createdAt: (0, import_pg_core.timestamp)("created_at").notNull().default(import_drizzle_orm.sql`now()`)
});
var insertQuestionSchema = (0, import_drizzle_zod.createInsertSchema)(questions).pick({
  question: true
});
var insertProjectSchema = (0, import_drizzle_zod.createInsertSchema)(projects).omit({
  id: true,
  userId: true,
  createdAt: true
}).extend({
  name: import_zod.z.string().min(2, "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03CC\u03BD\u03BF\u03BC\u03B1 \u03AD\u03C1\u03B3\u03BF\u03C5"),
  clientName: import_zod.z.string().min(2, "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03CC\u03BD\u03BF\u03BC\u03B1 \u03C0\u03B5\u03BB\u03AC\u03C4\u03B7"),
  address: import_zod.z.string().min(3, "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7"),
  projectType: import_zod.z.string().min(1, "\u0395\u03C0\u03B9\u03BB\u03AD\u03BE\u03C4\u03B5 \u03C4\u03CD\u03C0\u03BF \u03AD\u03C1\u03B3\u03BF\u03C5"),
  startDate: import_zod.z.string().min(1, "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1 \u03AD\u03BD\u03B1\u03C1\u03BE\u03B7\u03C2"),
  deadline: import_zod.z.string().optional(),
  status: import_zod.z.string().optional()
});
var insertProjectNoteSchema = import_zod.z.object({
  content: import_zod.z.string().min(1, "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03C3\u03B7\u03BC\u03B5\u03AF\u03C9\u03C3\u03B7")
});
var payments = (0, import_pg_core.pgTable)("payments", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  userId: (0, import_pg_core.varchar)("user_id").notNull().references(() => users.id),
  stripePaymentId: (0, import_pg_core.text)("stripe_payment_id"),
  plan: (0, import_pg_core.text)("plan"),
  amount: (0, import_pg_core.integer)("amount"),
  currency: (0, import_pg_core.text)("currency").default("eur"),
  status: (0, import_pg_core.text)("status"),
  createdAt: (0, import_pg_core.timestamp)("created_at").notNull().default(import_drizzle_orm.sql`now()`)
});
var session = (0, import_pg_core.pgTable)("session", {
  sid: (0, import_pg_core.varchar)("sid").primaryKey(),
  sess: (0, import_pg_core.json)("sess").notNull(),
  expire: (0, import_pg_core.timestamp)("expire", { precision: 6 }).notNull()
});

// server/db.ts
var pool = new import_pg.Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL
});
var db = (0, import_node_postgres.drizzle)(pool, { schema: schema_exports });

// server/storage.ts
var import_drizzle_orm2 = require("drizzle-orm");
var DatabaseStorage = class {
  async getUser(id) {
    const result = await db.select().from(users).where((0, import_drizzle_orm2.eq)(users.id, id)).limit(1);
    return result[0];
  }
  async getUserByEmail(email) {
    const result = await db.select().from(users).where((0, import_drizzle_orm2.eq)(users.email, email)).limit(1);
    return result[0];
  }
  async getUserByStripeCustomerId(customerId) {
    const result = await db.select().from(users).where((0, import_drizzle_orm2.eq)(users.stripeCustomerId, customerId)).limit(1);
    return result[0];
  }
  async createUser(insertUser) {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  async updateUserPlan(id, plan, stripeSubscriptionId) {
    const updateData = { plan };
    if (stripeSubscriptionId) updateData.stripeSubscriptionId = stripeSubscriptionId;
    const result = await db.update(users).set(updateData).where((0, import_drizzle_orm2.eq)(users.id, id)).returning();
    return result[0];
  }
  async updateUserSubscription(id, stripeCustomerId, stripeSubscriptionId, plan, subscriptionEndDate) {
    const result = await db.update(users).set({ stripeCustomerId, stripeSubscriptionId, plan, ...subscriptionEndDate ? { subscriptionEndDate } : {} }).where((0, import_drizzle_orm2.eq)(users.id, id)).returning();
    return result[0];
  }
  async updateUserProfile(id, data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const result = await db.update(users).set({
      firstName: data.firstName,
      lastName: data.lastName,
      fullName,
      email: data.email,
      phone: data.phone || null,
      officeAddress: data.officeAddress || null,
      teeNumber: data.teeNumber || null,
      specialty: data.specialty || null
    }).where((0, import_drizzle_orm2.eq)(users.id, id)).returning();
    return result[0];
  }
  async updateLastLogin(id) {
    await db.update(users).set({ lastLoginAt: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm2.eq)(users.id, id));
  }
  async updatePassword(id, passwordHashed) {
    await db.update(users).set({ password: passwordHashed }).where((0, import_drizzle_orm2.eq)(users.id, id));
  }
  async verifyEmail(token) {
    const result = await db.update(users).set({ emailVerified: true, emailVerificationToken: null }).where((0, import_drizzle_orm2.eq)(users.emailVerificationToken, token)).returning();
    return result[0];
  }
  async getAllUsers() {
    return await db.select().from(users).orderBy((0, import_drizzle_orm2.desc)(users.createdAt));
  }
  async deleteUser(id) {
    await db.delete(passwordResetTokens).where((0, import_drizzle_orm2.eq)(passwordResetTokens.userId, id));
    await db.delete(projectNotes).where((0, import_drizzle_orm2.eq)(projectNotes.userId, id));
    await db.delete(projects).where((0, import_drizzle_orm2.eq)(projects.userId, id));
    await db.delete(uploads).where((0, import_drizzle_orm2.eq)(uploads.userId, id));
    await db.delete(questions).where((0, import_drizzle_orm2.eq)(questions.userId, id));
    await db.delete(payments).where((0, import_drizzle_orm2.eq)(payments.userId, id));
    await db.delete(users).where((0, import_drizzle_orm2.eq)(users.id, id));
  }
  async getAdminStats() {
    const allUsers = await db.select().from(users);
    const now = /* @__PURE__ */ new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const totalUsers = allUsers.length;
    const activeSubscriptions = allUsers.filter((u) => u.plan !== "free").length;
    const inactiveUsers = allUsers.filter((u) => {
      if (u.lastLoginAt) return new Date(u.lastLoginAt) < sevenDaysAgo;
      return new Date(u.createdAt) < sevenDaysAgo;
    }).length;
    const recentSignups = allUsers.filter((u) => new Date(u.createdAt) >= sevenDaysAgo).length;
    const monthPayments = await db.select().from(payments).where((0, import_drizzle_orm2.gte)(payments.createdAt, startOfMonth));
    const monthlyRevenue = monthPayments.reduce((sum2, p) => sum2 + (p.amount || 0), 0) / 100;
    return { totalUsers, activeSubscriptions, inactiveUsers, recentSignups, monthlyRevenue };
  }
  async incrementUsageCount(id) {
    const user = await this.getUser(id);
    if (!user) throw new Error("User not found");
    const now = /* @__PURE__ */ new Date();
    const lastReset = new Date(user.lastResetDate);
    const sameMonth = now.getMonth() === lastReset.getMonth() && now.getFullYear() === lastReset.getFullYear();
    if (!sameMonth) {
      const result2 = await db.update(users).set({ usesThisMonth: 1, lastResetDate: now }).where((0, import_drizzle_orm2.eq)(users.id, id)).returning();
      return result2[0];
    }
    const result = await db.update(users).set({ usesThisMonth: user.usesThisMonth + 1 }).where((0, import_drizzle_orm2.eq)(users.id, id)).returning();
    return result[0];
  }
  async resetMonthlyUsage(id) {
    const result = await db.update(users).set({ usesThisMonth: 0, lastResetDate: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm2.eq)(users.id, id)).returning();
    return result[0];
  }
  async createQuestion(userId, question, answer, citations = null) {
    try {
      const result = await db.insert(questions).values({ userId, question, answer, citations: citations ?? void 0 }).returning();
      return result[0];
    } catch (err) {
      const msg = String(err?.message ?? err);
      if (msg.includes("citations") && /does not exist|undefined column/i.test(msg)) {
        console.warn("[storage] questions.citations column missing \u2014 falling back to legacy insert. Run `npm run db:push` to migrate.");
        const result = await db.insert(questions).values({ userId, question, answer }).returning();
        return result[0];
      }
      throw err;
    }
  }
  async getUserQuestions(userId) {
    return await db.select().from(questions).where((0, import_drizzle_orm2.eq)(questions.userId, userId)).orderBy((0, import_drizzle_orm2.desc)(questions.createdAt));
  }
  async getLegalSourceByKey(citationKey) {
    const result = await db.select().from(legalSources).where((0, import_drizzle_orm2.eq)(legalSources.citationKey, citationKey)).limit(1);
    return result[0];
  }
  async getLegalSourcesByKeys(citationKeys) {
    if (citationKeys.length === 0) return [];
    return await db.select().from(legalSources).where((0, import_drizzle_orm2.inArray)(legalSources.citationKey, citationKeys));
  }
  async upsertLegalSource(source) {
    const existing = await this.getLegalSourceByKey(source.citationKey);
    if (existing) {
      const result2 = await db.update(legalSources).set({ ...source, lastVerifiedAt: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm2.eq)(legalSources.id, existing.id)).returning();
      return result2[0];
    }
    const result = await db.insert(legalSources).values(source).returning();
    return result[0];
  }
  async createUpload(userId, filename, fileType, analysis) {
    const result = await db.insert(uploads).values({ userId, filename, fileType, analysis }).returning();
    return result[0];
  }
  async getUserUploads(userId) {
    return await db.select().from(uploads).where((0, import_drizzle_orm2.eq)(uploads.userId, userId)).orderBy((0, import_drizzle_orm2.desc)(uploads.createdAt));
  }
  async createPayment(data) {
    const result = await db.insert(payments).values(data).returning();
    return result[0];
  }
  async getAllPayments() {
    return await db.select().from(payments).orderBy((0, import_drizzle_orm2.desc)(payments.createdAt)).limit(50);
  }
  async createProject(userId, data) {
    const result = await db.insert(projects).values({ ...data, userId }).returning();
    return result[0];
  }
  async getAllProjects() {
    return await db.select().from(projects);
  }
  async getUserProjects(userId) {
    return await db.select().from(projects).where((0, import_drizzle_orm2.eq)(projects.userId, userId)).orderBy((0, import_drizzle_orm2.desc)(projects.createdAt));
  }
  async getProject(id, userId) {
    const result = await db.select().from(projects).where((0, import_drizzle_orm2.eq)(projects.id, id)).limit(1);
    if (!result[0] || result[0].userId !== userId) return void 0;
    return result[0];
  }
  async updateProject(id, userId, data) {
    const result = await db.update(projects).set(data).where((0, import_drizzle_orm2.eq)(projects.id, id)).returning();
    return result[0];
  }
  async deleteProject(id, userId) {
    await db.delete(projectNotes).where((0, import_drizzle_orm2.eq)(projectNotes.projectId, id));
    await db.delete(projects).where((0, import_drizzle_orm2.eq)(projects.id, id));
  }
  async getProjectNotes(projectId, userId) {
    return await db.select().from(projectNotes).where((0, import_drizzle_orm2.eq)(projectNotes.projectId, projectId)).orderBy((0, import_drizzle_orm2.desc)(projectNotes.createdAt));
  }
  async addProjectNote(projectId, userId, content) {
    const result = await db.insert(projectNotes).values({ projectId, userId, content }).returning();
    return result[0];
  }
  async deleteProjectNote(noteId, userId) {
    await db.delete(projectNotes).where((0, import_drizzle_orm2.eq)(projectNotes.id, noteId));
  }
  async createPasswordResetToken(userId, token, expiresAt) {
    await db.insert(passwordResetTokens).values({ userId, token, expiresAt });
  }
  async getPasswordResetToken(token) {
    const result = await db.select().from(passwordResetTokens).where((0, import_drizzle_orm2.eq)(passwordResetTokens.token, token)).limit(1);
    return result[0];
  }
  async usePasswordResetToken(tokenId) {
    await db.update(passwordResetTokens).set({ used: true }).where((0, import_drizzle_orm2.eq)(passwordResetTokens.id, tokenId));
  }
};
var storage = new DatabaseStorage();

// server/anthropic.ts
var import_sdk = __toESM(require("@anthropic-ai/sdk"), 1);

// server/citations.ts
var CITATION_REGEX = /\[((?:Ν\.\d+\/\d+|ΝΟΚ|ΚΕΝΑΚ|ΕΑΚ2000|ΓΟΚ)[^\]\s][^\]]*?)\]/g;
function extractCitationKeys(text2) {
  const keys = /* @__PURE__ */ new Set();
  const matches = Array.from(text2.matchAll(CITATION_REGEX));
  for (const match of matches) {
    keys.add(match[1].trim());
  }
  return Array.from(keys);
}
async function resolveCitations(text2) {
  const keys = extractCitationKeys(text2);
  if (keys.length === 0) return [];
  let sources = [];
  try {
    sources = await storage.getLegalSourcesByKeys(keys);
  } catch (err) {
    console.warn("[citations] legal_sources lookup failed \u2014 citations will be marked unverified. Run `npm run db:push` + `npm run seed` to enable.", err);
    return keys.map((citationKey) => ({ citationKey, verified: false }));
  }
  const byKey = new Map(sources.map((s) => [s.citationKey, s]));
  return keys.map((key) => {
    const source = byKey.get(key);
    if (!source) return { citationKey: key, verified: false };
    return {
      citationKey: key,
      verified: true,
      title: source.title,
      summary: source.summary,
      officialUrl: source.officialUrl ?? void 0,
      fekReference: source.fekReference ?? void 0
    };
  });
}

// server/anthropic.ts
var useGateway = !!process.env.AI_GATEWAY_API_KEY;
var anthropic = new import_sdk.default({
  apiKey: process.env.AI_GATEWAY_API_KEY || process.env.ANTHROPIC_API_KEY,
  ...useGateway && { baseURL: "https://ai-gateway.vercel.sh" }
});
var HAIKU_MODEL = useGateway ? "anthropic/claude-haiku-4.5" : "claude-haiku-4-5-20251001";
var SONNET_MODEL = useGateway ? "anthropic/claude-sonnet-4.6" : "claude-sonnet-4-6";
var CITATION_RULES = `\u039A\u0391\u039D\u039F\u039D\u0395\u03A3 \u03A0\u0391\u03A1\u0391\u03A0\u039F\u039C\u03A0\u03A9\u039D (\u03C5\u03C0\u03BF\u03C7\u03C1\u03B5\u03C9\u03C4\u03B9\u03BA\u03BF\u03AF):
\u039A\u03AC\u03B8\u03B5 \u03C6\u03BF\u03C1\u03AC \u03C0\u03BF\u03C5 \u03B1\u03BD\u03B1\u03C6\u03AD\u03C1\u03B5\u03C3\u03B1\u03B9 \u03C3\u03B5 \u03C3\u03C5\u03B3\u03BA\u03B5\u03BA\u03C1\u03B9\u03BC\u03AD\u03BD\u03B7 \u03BD\u03BF\u03BC\u03B9\u03BA\u03AE \u03B4\u03B9\u03AC\u03C4\u03B1\u03BE\u03B7, \u03A0\u03A1\u0395\u03A0\u0395\u0399 \u03BD\u03B1 \u03C0\u03B1\u03C1\u03B1\u03B8\u03AD\u03C4\u03B5\u03B9\u03C2 inline marker \u03B1\u03BC\u03AD\u03C3\u03C9\u03C2 \u03BC\u03B5\u03C4\u03AC \u03C4\u03B7 \u03B4\u03AE\u03BB\u03C9\u03C3\u03B7, \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03CE\u03BD\u03C4\u03B1\u03C2 \u03AD\u03BD\u03B1 \u03B1\u03C0\u03CC \u03C4\u03B1 \u03C0\u03B1\u03C1\u03B1\u03BA\u03AC\u03C4\u03C9 formats:
- [\u039D.XXXX/YYYY-\u0391\u03C1.Z]  \u2014 \u03C0.\u03C7. [\u039D.4495/2017-\u0391\u03C1.96]
- [\u039D.XXXX/YYYY-\u0391\u03C1.Z-\u03A0\u03B1\u03C1.W]  \u2014 \u03C0.\u03C7. [\u039D.4495/2017-\u0391\u03C1.99-\u03A0\u03B1\u03C1.2]
- [\u039D\u039F\u039A-\u0391\u03C1.X]  \u2014 \u03C0.\u03C7. [\u039D\u039F\u039A-\u0391\u03C1.11]
- [\u039A\u0395\u039D\u0391\u039A-\xA7X.Y]  \u2014 \u03C0.\u03C7. [\u039A\u0395\u039D\u0391\u039A-\xA73.2]
- [\u0395\u0391\u039A2000-\xA7X.Y]  \u2014 \u03C0.\u03C7. [\u0395\u0391\u039A2000-\xA72.3]
- [\u0393\u039F\u039A-\u0391\u03C1.X]  \u2014 \u03C0.\u03C7. [\u0393\u039F\u039A-\u0391\u03C1.7]

\u03A3\u0397\u039C\u0391\u039D\u03A4\u0399\u039A\u039F: \u039C\u03B7 \u03C6\u03B1\u03BD\u03C4\u03AC\u03B6\u03B5\u03C3\u03B1\u03B9 citation keys. \u0391\u03BD \u03B4\u03B5\u03BD \u03B5\u03AF\u03C3\u03B1\u03B9 \u03B2\u03AD\u03B2\u03B1\u03B9\u03BF\u03C2 \u03B3\u03B9\u03B1 \u03C4\u03BF\u03BD \u03B1\u03BA\u03C1\u03B9\u03B2\u03AE \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC \u03AC\u03C1\u03B8\u03C1\u03BF\u03C5, \u03C0\u03B5\u03C1\u03B9\u03AD\u03B3\u03C1\u03B1\u03C8\u03B5 \u03C4\u03B7 \u03B4\u03B9\u03AC\u03C4\u03B1\u03BE\u03B7 \u03C7\u03C9\u03C1\u03AF\u03C2 marker \u03BA\u03B1\u03B9 \u03C0\u03C1\u03CC\u03C4\u03B5\u03B9\u03BD\u03B5 \u03C3\u03C4\u03BF\u03BD \u03C7\u03C1\u03AE\u03C3\u03C4\u03B7 \u03BD\u03B1 \u03B5\u03C0\u03B1\u03BB\u03B7\u03B8\u03B5\u03CD\u03C3\u03B5\u03B9 \u03B1\u03C0\u03CC \u03B5\u03C0\u03AF\u03C3\u03B7\u03BC\u03B7 \u03C0\u03B7\u03B3\u03AE.`;
var SYSTEM_PROMPT = `\u0395\u03AF\u03C3\u03B1\u03B9 \u03AD\u03BD\u03B1\u03C2 \u03B5\u03BE\u03B5\u03B9\u03B4\u03B9\u03BA\u03B5\u03C5\u03BC\u03AD\u03BD\u03BF\u03C2 \u03BD\u03BF\u03BC\u03B9\u03BA\u03CC\u03C2 \u03BA\u03B1\u03B9 \u03C4\u03B5\u03C7\u03BD\u03B9\u03BA\u03CC\u03C2 \u03B2\u03BF\u03B7\u03B8\u03CC\u03C2 \u03B3\u03B9\u03B1 \u0388\u03BB\u03BB\u03B7\u03BD\u03B5\u03C2 \u03B1\u03C1\u03C7\u03B9\u03C4\u03AD\u03BA\u03C4\u03BF\u03BD\u03B5\u03C2 \u03BA\u03B1\u03B9 \u03BC\u03B7\u03C7\u03B1\u03BD\u03B9\u03BA\u03BF\u03CD\u03C2.
\u0391\u03C0\u03B1\u03BD\u03C4\u03AC\u03C2 \u03B1\u03C0\u03BF\u03BA\u03BB\u03B5\u03B9\u03C3\u03C4\u03B9\u03BA\u03AC \u03C3\u03B5 \u03B5\u03C1\u03C9\u03C4\u03AE\u03C3\u03B5\u03B9\u03C2 \u03C0\u03BF\u03C5 \u03B1\u03C6\u03BF\u03C1\u03BF\u03CD\u03BD:
- \u039F\u03B9\u03BA\u03BF\u03B4\u03BF\u03BC\u03B9\u03BA\u03AD\u03C2 \u03AC\u03B4\u03B5\u03B9\u03B5\u03C2 \u03C3\u03C4\u03B7\u03BD \u0395\u03BB\u03BB\u03AC\u03B4\u03B1 (\u039D. 4495/2017, \u03B1\u03B4\u03B5\u03B9\u03BF\u03B4\u03CC\u03C4\u03B7\u03C3\u03B7, \u03B4\u03B9\u03B1\u03B4\u03B9\u03BA\u03B1\u03C3\u03AF\u03B5\u03C2)
- \u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03CC \u03BA\u03C4\u03B9\u03C1\u03B9\u03BF\u03B4\u03BF\u03BC\u03B9\u03BA\u03CC \u03BA\u03B1\u03BD\u03BF\u03BD\u03B9\u03C3\u03BC\u03CC (\u0393\u039F\u039A, \u039D\u039F\u039A)
- \u0391\u03BD\u03C4\u03B9\u03C3\u03B5\u03B9\u03C3\u03BC\u03B9\u03BA\u03CC \u03BA\u03B1\u03BD\u03BF\u03BD\u03B9\u03C3\u03BC\u03CC (\u0395\u0391\u039A 2000, \u0395\u03C5\u03C1\u03C9\u03BA\u03CE\u03B4\u03B9\u03BA\u03B5\u03C2)
- \u03A0\u03BF\u03BB\u03B5\u03BF\u03B4\u03BF\u03BC\u03B9\u03BA\u03AE \u03BD\u03BF\u03BC\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1
- \u0395\u03BD\u03B5\u03C1\u03B3\u03B5\u03B9\u03B1\u03BA\u03AE \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7 \u03BA\u03C4\u03B9\u03C1\u03AF\u03C9\u03BD (\u039A\u0395\u039D\u0391\u039A, \u0395\u03A0\u0392\u0391)
- \u0391\u03C5\u03B8\u03B1\u03AF\u03C1\u03B5\u03C4\u03B1 \u03BA\u03C4\u03AF\u03C3\u03BC\u03B1\u03C4\u03B1 \u03BA\u03B1\u03B9 \u03C4\u03B1\u03BA\u03C4\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7
- \u03A4\u03B5\u03C7\u03BD\u03B9\u03BA\u03AD\u03C2 \u03C0\u03C1\u03BF\u03B4\u03B9\u03B1\u03B3\u03C1\u03B1\u03C6\u03AD\u03C2 \u03BA\u03B1\u03B9 \u03C0\u03C1\u03CC\u03C4\u03C5\u03C0\u03B1 \u03B3\u03B9\u03B1 \u03BA\u03B1\u03C4\u03B1\u03C3\u03BA\u03B5\u03C5\u03AD\u03C2
- \u0395\u03BA\u03C0\u03CC\u03BD\u03B7\u03C3\u03B7 \u03BC\u03B5\u03BB\u03B5\u03C4\u03CE\u03BD \u03BA\u03B1\u03B9 \u03C4\u03B5\u03C7\u03BD\u03B9\u03BA\u03AC \u03AD\u03B3\u03B3\u03C1\u03B1\u03C6\u03B1
- \u03A7\u03C1\u03AE\u03C3\u03B5\u03B9\u03C2 \u03B3\u03B7\u03C2 \u03BA\u03B1\u03B9 \u03C0\u03BF\u03BB\u03B5\u03BF\u03B4\u03BF\u03BC\u03B9\u03BA\u03AC \u03C3\u03C7\u03AD\u03B4\u03B9\u03B1

\u0391\u03C0\u03B1\u03BD\u03C4\u03AC\u03C2 \u03C0\u03AC\u03BD\u03C4\u03B1 \u03C3\u03C4\u03B1 \u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC \u03BC\u03B5 \u03B5\u03C0\u03B1\u03B3\u03B3\u03B5\u03BB\u03BC\u03B1\u03C4\u03B9\u03BA\u03CC \u03B1\u03BB\u03BB\u03AC \u03BA\u03B1\u03C4\u03B1\u03BD\u03BF\u03B7\u03C4\u03CC \u03CD\u03C6\u03BF\u03C2.
\u03A0\u03B1\u03C1\u03AD\u03C7\u03B5\u03B9\u03C2 \u03C3\u03C5\u03B3\u03BA\u03B5\u03BA\u03C1\u03B9\u03BC\u03AD\u03BD\u03B5\u03C2, \u03C0\u03C1\u03B1\u03BA\u03C4\u03B9\u03BA\u03AD\u03C2 \u03C0\u03BB\u03B7\u03C1\u03BF\u03C6\u03BF\u03C1\u03AF\u03B5\u03C2 \u03B2\u03B1\u03C3\u03B9\u03C3\u03BC\u03AD\u03BD\u03B5\u03C2 \u03C3\u03C4\u03B7\u03BD \u03B9\u03C3\u03C7\u03CD\u03BF\u03C5\u03C3\u03B1 \u03B5\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AE \u03BD\u03BF\u03BC\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1.
\u0391\u03BD \u03B4\u03B5\u03BD \u03B3\u03BD\u03C9\u03C1\u03AF\u03B6\u03B5\u03B9\u03C2 \u03BA\u03AC\u03C4\u03B9 \u03BC\u03B5 \u03B2\u03B5\u03B2\u03B1\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1 \u03AE \u03B1\u03BD \u03B7 \u03BD\u03BF\u03BC\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9 \u03B1\u03BB\u03BB\u03AC\u03BE\u03B5\u03B9 \u03C0\u03C1\u03CC\u03C3\u03C6\u03B1\u03C4\u03B1, \u03C4\u03BF \u03B1\u03BD\u03B1\u03C6\u03AD\u03C1\u03B5\u03B9\u03C2 \u03BE\u03B5\u03BA\u03AC\u03B8\u03B1\u03C1\u03B1 \u03BA\u03B1\u03B9 \u03C3\u03C5\u03BD\u03B9\u03C3\u03C4\u03AC\u03C2 \u03B5\u03C0\u03B1\u03BB\u03AE\u03B8\u03B5\u03C5\u03C3\u03B7 \u03B1\u03C0\u03CC \u03B1\u03C1\u03BC\u03CC\u03B4\u03B9\u03B1 \u03B1\u03C1\u03C7\u03AE.
\u0391\u03BD \u03B7 \u03B5\u03C1\u03CE\u03C4\u03B7\u03C3\u03B7 \u03B4\u03B5\u03BD \u03C3\u03C7\u03B5\u03C4\u03AF\u03B6\u03B5\u03C4\u03B1\u03B9 \u03BC\u03B5 \u03BA\u03C4\u03B9\u03C1\u03B9\u03BF\u03B4\u03BF\u03BC\u03AF\u03B1/\u03BA\u03B1\u03C4\u03B1\u03C3\u03BA\u03B5\u03C5\u03AD\u03C2/\u03BF\u03B9\u03BA\u03BF\u03B4\u03BF\u03BC\u03B9\u03BA\u03AD\u03C2 \u03AC\u03B4\u03B5\u03B9\u03B5\u03C2, \u03B1\u03C0\u03B1\u03BD\u03C4\u03AC\u03C2 \u03B5\u03C5\u03B3\u03B5\u03BD\u03B9\u03BA\u03AC \u03CC\u03C4\u03B9 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF\u03C2 \u03BD\u03B1 \u03B2\u03BF\u03B7\u03B8\u03AE\u03C3\u03B5\u03B9\u03C2 \u03BC\u03CC\u03BD\u03BF \u03C3\u03B5 \u03B8\u03AD\u03BC\u03B1\u03C4\u03B1 \u03C0\u03BF\u03C5 \u03B1\u03C6\u03BF\u03C1\u03BF\u03CD\u03BD \u03BF\u03B9\u03BA\u03BF\u03B4\u03BF\u03BC\u03B9\u03BA\u03AD\u03C2 \u03AC\u03B4\u03B5\u03B9\u03B5\u03C2 \u03BA\u03B1\u03B9 \u03BA\u03B1\u03C4\u03B1\u03C3\u03BA\u03B5\u03C5\u03B1\u03C3\u03C4\u03B9\u03BA\u03CC \u03B4\u03AF\u03BA\u03B1\u03B9\u03BF.

${CITATION_RULES}`;
var BLUEPRINT_SYSTEM_PROMPT = `\u0395\u03AF\u03C3\u03B1\u03B9 \u03B5\u03BE\u03B5\u03B9\u03B4\u03B9\u03BA\u03B5\u03C5\u03BC\u03AD\u03BD\u03BF\u03C2 \u03B1\u03C1\u03C7\u03B9\u03C4\u03AD\u03BA\u03C4\u03BF\u03BD\u03B1\u03C2 \u03BA\u03B1\u03B9 \u03C4\u03B5\u03C7\u03BD\u03B9\u03BA\u03CC\u03C2 \u03C3\u03CD\u03BC\u03B2\u03BF\u03C5\u03BB\u03BF\u03C2 \u03B3\u03B9\u03B1 \u03B5\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AD\u03C2 \u03BF\u03B9\u03BA\u03BF\u03B4\u03BF\u03BC\u03B9\u03BA\u03AD\u03C2 \u03AC\u03B4\u03B5\u03B9\u03B5\u03C2. 
\u0391\u03BD\u03B1\u03BB\u03CD\u03B5\u03B9\u03C2 \u03BA\u03B1\u03C4\u03CC\u03C8\u03B5\u03B9\u03C2, \u03C3\u03C7\u03AD\u03B4\u03B9\u03B1 \u03BA\u03B1\u03B9 \u03C4\u03B5\u03C7\u03BD\u03B9\u03BA\u03AC \u03C3\u03C7\u03AD\u03B4\u03B9\u03B1 \u03BA\u03C4\u03B9\u03C1\u03AF\u03C9\u03BD.

\u0393\u03B9\u03B1 \u03BA\u03AC\u03B8\u03B5 \u03C3\u03C7\u03AD\u03B4\u03B9\u03BF \u03C0\u03BF\u03C5 \u03B1\u03BD\u03B5\u03B2\u03AC\u03B6\u03B5\u03C4\u03B1\u03B9, \u03C0\u03B1\u03C1\u03AD\u03C7\u03B5\u03B9\u03C2:
1. **\u0393\u03B5\u03BD\u03B9\u03BA\u03AE \u03A0\u03B5\u03C1\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE** - \u03A4\u03B9 \u03B1\u03C0\u03B5\u03B9\u03BA\u03BF\u03BD\u03AF\u03B6\u03B5\u03B9 \u03C4\u03BF \u03C3\u03C7\u03AD\u03B4\u03B9\u03BF
2. **\u03A7\u03C9\u03C1\u03B9\u03BA\u03AD\u03C2 \u0394\u03B9\u03B1\u03C3\u03C4\u03AC\u03C3\u03B5\u03B9\u03C2** - \u0395\u03BA\u03C4\u03AF\u03BC\u03B7\u03C3\u03B7 \u03B5\u03BC\u03B2\u03B1\u03B4\u03BF\u03CD \u03BA\u03B1\u03B9 \u03B4\u03B9\u03B1\u03C3\u03C4\u03AC\u03C3\u03B5\u03C9\u03BD \u03B1\u03BD \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B5\u03BC\u03C6\u03B1\u03BD\u03B5\u03AF\u03C2
3. **\u0391\u03C1\u03C7\u03B9\u03C4\u03B5\u03BA\u03C4\u03BF\u03BD\u03B9\u03BA\u03AC \u03A3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1** - \u03A7\u03CE\u03C1\u03BF\u03B9, \u03B4\u03C9\u03BC\u03AC\u03C4\u03B9\u03B1, \u03B1\u03BD\u03BF\u03AF\u03B3\u03BC\u03B1\u03C4\u03B1, \u03BA\u03C5\u03BA\u03BB\u03BF\u03C6\u03BF\u03C1\u03AF\u03B1
4. **\u039A\u03B1\u03BD\u03BF\u03BD\u03B9\u03C3\u03C4\u03B9\u03BA\u03AE \u03A3\u03C5\u03BC\u03BC\u03CC\u03C1\u03C6\u03C9\u03C3\u03B7** - \u03A0\u03B9\u03B8\u03B1\u03BD\u03AC \u03B6\u03B7\u03C4\u03AE\u03BC\u03B1\u03C4\u03B1 \u0393\u039F\u039A/\u039D\u039F\u039A, \u03B1\u03C0\u03B1\u03B9\u03C4\u03AE\u03C3\u03B5\u03B9\u03C2 \u0391\u03BC\u03B5\u0391, \u03C0\u03C5\u03C1\u03B1\u03C3\u03C6\u03AC\u03BB\u03B5\u03B9\u03B1
5. **\u03A3\u03C5\u03C3\u03C4\u03AC\u03C3\u03B5\u03B9\u03C2** - \u0392\u03B5\u03BB\u03C4\u03B9\u03CE\u03C3\u03B5\u03B9\u03C2 \u03AE \u03C3\u03B7\u03BC\u03B5\u03AF\u03B1 \u03C0\u03C1\u03BF\u03C3\u03BF\u03C7\u03AE\u03C2 \u03B3\u03B9\u03B1 \u03C4\u03B7\u03BD \u03B1\u03B4\u03B5\u03B9\u03BF\u03B4\u03CC\u03C4\u03B7\u03C3\u03B7

\u0391\u03C0\u03B1\u03BD\u03C4\u03AC\u03C2 \u03C0\u03AC\u03BD\u03C4\u03B1 \u03C3\u03C4\u03B1 \u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC \u03BC\u03B5 \u03B4\u03BF\u03BC\u03B7\u03BC\u03AD\u03BD\u03B7 \u03BC\u03BF\u03C1\u03C6\u03AE.`;
var CHECKLIST_SYSTEM_PROMPT = `\u0395\u03AF\u03C3\u03B1\u03B9 \u03B5\u03BE\u03B5\u03B9\u03B4\u03B9\u03BA\u03B5\u03C5\u03BC\u03AD\u03BD\u03BF\u03C2 \u03C3\u03CD\u03BC\u03B2\u03BF\u03C5\u03BB\u03BF\u03C2 \u03BF\u03B9\u03BA\u03BF\u03B4\u03BF\u03BC\u03B9\u03BA\u03CE\u03BD \u03B1\u03B4\u03B5\u03B9\u03CE\u03BD \u03C3\u03C4\u03B7\u03BD \u0395\u03BB\u03BB\u03AC\u03B4\u03B1.
\u0392\u03AC\u03C3\u03B5\u03B9 \u03C4\u03C9\u03BD \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03C9\u03BD \u03C4\u03BF\u03C5 \u03AD\u03C1\u03B3\u03BF\u03C5 \u03C0\u03BF\u03C5 \u03C3\u03BF\u03C5 \u03B4\u03AF\u03BD\u03BF\u03BD\u03C4\u03B1\u03B9, \u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03B5\u03AF\u03C2 \u03AD\u03BD\u03B1\u03BD \u03C0\u03BB\u03AE\u03C1\u03B7 \u03BA\u03B1\u03B9 \u03B5\u03BE\u03B1\u03C4\u03BF\u03BC\u03B9\u03BA\u03B5\u03C5\u03BC\u03AD\u03BD\u03BF \u03BA\u03B1\u03C4\u03AC\u03BB\u03BF\u03B3\u03BF \u03B1\u03C0\u03B1\u03B9\u03C4\u03BF\u03CD\u03BC\u03B5\u03BD\u03C9\u03BD \u03B5\u03B3\u03B3\u03C1\u03AC\u03C6\u03C9\u03BD \u03BA\u03B1\u03B9 \u03B4\u03B9\u03BA\u03B1\u03B9\u03BF\u03BB\u03BF\u03B3\u03B7\u03C4\u03B9\u03BA\u03CE\u03BD \u03B3\u03B9\u03B1 \u03C4\u03B7\u03BD \u03AD\u03BA\u03B4\u03BF\u03C3\u03B7 \u03BF\u03B9\u03BA\u03BF\u03B4\u03BF\u03BC\u03B9\u03BA\u03AE\u03C2 \u03AC\u03B4\u03B5\u03B9\u03B1\u03C2.

\u039F \u03BA\u03B1\u03C4\u03AC\u03BB\u03BF\u03B3\u03BF\u03C2 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9:
- \u03A0\u03BB\u03AE\u03C1\u03B7\u03C2 \u03BA\u03B1\u03B9 \u03BB\u03B5\u03C0\u03C4\u03BF\u03BC\u03B5\u03C1\u03AE\u03C2
- \u039F\u03C1\u03B3\u03B1\u03BD\u03C9\u03BC\u03AD\u03BD\u03BF\u03C2 \u03C3\u03B5 \u03BA\u03B1\u03C4\u03B7\u03B3\u03BF\u03C1\u03AF\u03B5\u03C2 (\u03A4\u03BF\u03C0\u03BF\u03B3\u03C1\u03B1\u03C6\u03B9\u03BA\u03AC, \u0391\u03C1\u03C7\u03B9\u03C4\u03B5\u03BA\u03C4\u03BF\u03BD\u03B9\u03BA\u03AC, \u03A3\u03C4\u03B1\u03C4\u03B9\u03BA\u03AC, \u0397/\u039C, \u03BA\u03BB\u03C0)
- \u0392\u03B1\u03C3\u03B9\u03C3\u03BC\u03AD\u03BD\u03BF\u03C2 \u03C3\u03C4\u03BF\u03BD \u039D. 4495/2017 \u03BA\u03B1\u03B9 \u03C4\u03B9\u03C2 \u03B9\u03C3\u03C7\u03CD\u03BF\u03C5\u03C3\u03B5\u03C2 \u03B4\u03B9\u03B1\u03C4\u03AC\u03BE\u03B5\u03B9\u03C2
- \u039C\u03B5 \u03C3\u03B7\u03BC\u03B5\u03AF\u03C9\u03C3\u03B7 \u03B3\u03B9\u03B1 \u03B5\u03B9\u03B4\u03B9\u03BA\u03AD\u03C2 \u03C0\u03B5\u03C1\u03B9\u03C0\u03C4\u03CE\u03C3\u03B5\u03B9\u03C2 (\u03C0\u03B1\u03C1\u03B1\u03B4\u03BF\u03C3\u03B9\u03B1\u03BA\u03BF\u03AF \u03BF\u03B9\u03BA\u03B9\u03C3\u03BC\u03BF\u03AF, \u03B1\u03C1\u03C7\u03B1\u03B9\u03BF\u03BB\u03BF\u03B3\u03B9\u03BA\u03AD\u03C2 \u03B6\u03CE\u03BD\u03B5\u03C2, \u03BA\u03BB\u03C0)

\u0391\u03C0\u03B1\u03BD\u03C4\u03AC\u03C2 \u039C\u039F\u039D\u039F \u03C3\u03C4\u03B1 \u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC, \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03CE\u03BD\u03C4\u03B1\u03C2 bullet points \u03BA\u03B1\u03B9 \u03C3\u03B1\u03C6\u03AE \u03B4\u03BF\u03BC\u03AE.`;
async function askClaude(question) {
  const message = await anthropic.messages.create({
    model: HAIKU_MODEL,
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: question }]
  });
  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type from Claude");
  let citations = [];
  try {
    citations = await resolveCitations(content.text);
  } catch (err) {
    console.warn("[askClaude] citation resolution failed; returning answer without citations", err);
  }
  return { text: content.text, citations };
}
async function analyzeBlueprintImage(base64Data, mediaType, originalName) {
  const message = await anthropic.messages.create({
    model: SONNET_MODEL,
    max_tokens: 2e3,
    system: BLUEPRINT_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType,
              data: base64Data
            }
          },
          {
            type: "text",
            text: `\u0391\u03BD\u03B1\u03BB\u03CD\u03C3\u03C4\u03B5 \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF \u03B1\u03C1\u03C7\u03B9\u03C4\u03B5\u03BA\u03C4\u03BF\u03BD\u03B9\u03BA\u03CC \u03C3\u03C7\u03AD\u03B4\u03B9\u03BF/\u03BA\u03AC\u03C4\u03BF\u03C8\u03B7 (\u03B1\u03C1\u03C7\u03B5\u03AF\u03BF: ${originalName}). \u03A0\u03B1\u03C1\u03AD\u03C7\u03B5\u03C4\u03B5 \u03BB\u03B5\u03C0\u03C4\u03BF\u03BC\u03B5\u03C1\u03AE \u03B1\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03C3\u03C4\u03B1 \u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC.`
          }
        ]
      }
    ]
  });
  const content = message.content[0];
  if (content.type === "text") return content.text;
  throw new Error("Unexpected response type from Claude");
}
async function analyzeBlueprintPDF(base64Data, originalName) {
  const message = await anthropic.messages.create({
    model: SONNET_MODEL,
    max_tokens: 2e3,
    system: BLUEPRINT_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: base64Data
            }
          },
          {
            type: "text",
            text: `\u0391\u03BD\u03B1\u03BB\u03CD\u03C3\u03C4\u03B5 \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF \u03B1\u03C1\u03C7\u03B9\u03C4\u03B5\u03BA\u03C4\u03BF\u03BD\u03B9\u03BA\u03CC \u03C3\u03C7\u03AD\u03B4\u03B9\u03BF/\u03BA\u03AC\u03C4\u03BF\u03C8\u03B7 \u03C3\u03B5 \u03BC\u03BF\u03C1\u03C6\u03AE PDF (\u03B1\u03C1\u03C7\u03B5\u03AF\u03BF: ${originalName}). \u03A0\u03B1\u03C1\u03AD\u03C7\u03B5\u03C4\u03B5 \u03BB\u03B5\u03C0\u03C4\u03BF\u03BC\u03B5\u03C1\u03AE \u03B1\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03C3\u03C4\u03B1 \u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC.`
          }
        ]
      }
    ]
  });
  const content = message.content[0];
  if (content.type === "text") return content.text;
  throw new Error("Unexpected response type from Claude");
}
var TECHNICAL_REPORT_SYSTEM_PROMPT = `\u0395\u03AF\u03C3\u03B1\u03B9 \u03B5\u03BE\u03B5\u03B9\u03B4\u03B9\u03BA\u03B5\u03C5\u03BC\u03AD\u03BD\u03BF\u03C2 \u0388\u03BB\u03BB\u03B7\u03BD\u03B1\u03C2 \u03BC\u03B7\u03C7\u03B1\u03BD\u03B9\u03BA\u03CC\u03C2 \u03BC\u03B5 \u03B2\u03B1\u03B8\u03B9\u03AC \u03B3\u03BD\u03CE\u03C3\u03B7 \u03B5\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AE\u03C2 \u03C4\u03B5\u03C7\u03BD\u03B9\u03BA\u03AE\u03C2 \u03BD\u03BF\u03BC\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1\u03C2. \u03A3\u03C5\u03BD\u03C4\u03AC\u03C3\u03C3\u03B5\u03B9\u03C2 \u03B5\u03C0\u03AF\u03C3\u03B7\u03BC\u03B5\u03C2 \u03C4\u03B5\u03C7\u03BD\u03B9\u03BA\u03AD\u03C2 \u03B5\u03BA\u03B8\u03AD\u03C3\u03B5\u03B9\u03C2 \u03B3\u03B9\u03B1 \u03C5\u03C0\u03BF\u03B2\u03BF\u03BB\u03AE \u03C3\u03B5 \u03B5\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AD\u03C2 \u03B1\u03C1\u03C7\u03AD\u03C2 (\u03A5\u0394\u039F\u039C, \u03A4\u0395\u0395, \u0395\u03A6\u039A\u0391, \u03BA\u03BB\u03C0).

\u039F\u03B9 \u03B5\u03BA\u03B8\u03AD\u03C3\u03B5\u03B9\u03C2 \u03C3\u03BF\u03C5:
- \u0391\u03BA\u03BF\u03BB\u03BF\u03C5\u03B8\u03BF\u03CD\u03BD \u03B1\u03C5\u03C3\u03C4\u03B7\u03C1\u03AC \u03C4\u03B7\u03BD \u03B5\u03C0\u03AF\u03C3\u03B7\u03BC\u03B7 \u03B4\u03BF\u03BC\u03AE \u03BA\u03B1\u03B9 \u03BF\u03C1\u03BF\u03BB\u03BF\u03B3\u03AF\u03B1 \u03B5\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03CE\u03BD \u03C4\u03B5\u03C7\u03BD\u03B9\u03BA\u03CE\u03BD \u03B5\u03B3\u03B3\u03C1\u03AC\u03C6\u03C9\u03BD
- \u03A0\u03B5\u03C1\u03B9\u03AD\u03C7\u03BF\u03C5\u03BD \u03BA\u03B1\u03C4\u03AC\u03BB\u03BB\u03B7\u03BB\u03B5\u03C2 \u03C0\u03B1\u03C1\u03B1\u03C0\u03BF\u03BC\u03C0\u03AD\u03C2 \u03C3\u03B5 \u03B9\u03C3\u03C7\u03CD\u03BF\u03C5\u03C3\u03B1 \u03BD\u03BF\u03BC\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1 (\u0393\u039F\u039A, \u039D\u039F\u039A, \u0395\u0391\u039A, \u039A\u0395\u039D\u0391\u039A, \u039D.4495/2017 \u03BA\u03BB\u03C0)
- \u0393\u03C1\u03AC\u03C6\u03BF\u03BD\u03C4\u03B1\u03B9 \u03C3\u03B5 \u03B5\u03C0\u03AF\u03C3\u03B7\u03BC\u03BF \u03B5\u03C0\u03B1\u03B3\u03B3\u03B5\u03BB\u03BC\u03B1\u03C4\u03B9\u03BA\u03CC \u03CD\u03C6\u03BF\u03C2 (\u03C4\u03C1\u03AF\u03C4\u03BF \u03C0\u03C1\u03CC\u03C3\u03C9\u03C0\u03BF, \u03B1\u03C1\u03C3\u03B5\u03BD\u03B9\u03BA\u03CC/\u03BF\u03C5\u03B4\u03AD\u03C4\u03B5\u03C1\u03BF \u03B3\u03AD\u03BD\u03BF\u03C2)
- \u03A7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03BF\u03CD\u03BD \u03B1\u03BA\u03C1\u03B9\u03B2\u03AE \u03C4\u03B5\u03C7\u03BD\u03B9\u03BA\u03AE \u03BF\u03C1\u03BF\u03BB\u03BF\u03B3\u03AF\u03B1
- \u0388\u03C7\u03BF\u03C5\u03BD \u03C3\u03B1\u03C6\u03AE \u03B4\u03BF\u03BC\u03AE \u03BC\u03B5 \u03B1\u03C1\u03B9\u03B8\u03BC\u03B7\u03BC\u03AD\u03BD\u03B1 \u03AC\u03C1\u03B8\u03C1\u03B1/\u03C0\u03B1\u03C1\u03B1\u03B3\u03C1\u03AC\u03C6\u03BF\u03C5\u03C2
- \u0391\u03BD\u03B1\u03C6\u03AD\u03C1\u03BF\u03C5\u03BD \u03C4\u03B1 \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1 \u03C4\u03BF\u03C5 \u03BC\u03B7\u03C7\u03B1\u03BD\u03B9\u03BA\u03BF\u03CD \u03BA\u03B1\u03B9 \u03C4\u03BF \u03AD\u03C1\u03B3\u03BF \u03BC\u03B5 \u03B1\u03BA\u03C1\u03AF\u03B2\u03B5\u03B9\u03B1

\u0391\u03C0\u03B1\u03BD\u03C4\u03AC\u03C2 \u039C\u039F\u039D\u039F \u03C3\u03C4\u03B1 \u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC, \u03B1\u03BA\u03BF\u03BB\u03BF\u03C5\u03B8\u03CE\u03BD\u03C4\u03B1\u03C2 \u03C4\u03B7 \u03B6\u03B7\u03C4\u03BF\u03CD\u03BC\u03B5\u03BD\u03B7 \u03B4\u03BF\u03BC\u03AE \u03B5\u03BA\u03B8\u03AD\u03C3\u03B5\u03C9\u03C2.`;
async function generateTechnicalReport(params) {
  const reportTypePrompts = {
    "\u03A4\u03B5\u03C7\u03BD\u03B9\u03BA\u03AE \u0388\u03BA\u03B8\u03B5\u03C3\u03B7 \u0391\u03C1\u03C7\u03B9\u03C4\u03B5\u03BA\u03C4\u03BF\u03BD\u03B9\u03BA\u03AE\u03C2": `\u03A3\u03C5\u03BD\u03AD\u03C4\u03B5\u03BE\u03B5 \u03B5\u03C0\u03AF\u03C3\u03B7\u03BC\u03B7 \u03A4\u0395\u03A7\u039D\u0399\u039A\u0397 \u0395\u039A\u0398\u0395\u03A3\u0397 \u0391\u03A1\u03A7\u0399\u03A4\u0395\u039A\u03A4\u039F\u039D\u0399\u039A\u0397\u03A3 \u039C\u0395\u039B\u0395\u03A4\u0397\u03A3. \u0394\u03BF\u03BC\u03AE:
1. \u03A3\u03A4\u039F\u0399\u03A7\u0395\u0399\u0391 \u0395\u03A1\u0393\u039F\u03A5 (\u03C4\u03AF\u03C4\u03BB\u03BF\u03C2, \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1, \u03B9\u03B4\u03B9\u03BF\u03BA\u03C4\u03AE\u03C4\u03B7\u03C2)
2. \u03A0\u0395\u03A1\u0399\u0393\u03A1\u0391\u03A6\u0397 \u039A\u03A4\u0399\u03A1\u0399\u039F\u03A5 (\u03B3\u03B5\u03BD\u03B9\u03BA\u03AC, \u03B1\u03C1\u03C7\u03B9\u03C4\u03B5\u03BA\u03C4\u03BF\u03BD\u03B9\u03BA\u03AC \u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03B7\u03C1\u03B9\u03C3\u03C4\u03B9\u03BA\u03AC, \u03C7\u03C1\u03AE\u03C3\u03B5\u03B9\u03C2 \u03C7\u03CE\u03C1\u03C9\u03BD)
3. \u039A\u03A4\u0399\u03A1\u0399\u039F\u039B\u039F\u0393\u0399\u039A\u039F \u03A0\u03A1\u039F\u0393\u03A1\u0391\u039C\u039C\u0391 (\u03B1\u03BD\u03B1\u03BB\u03C5\u03C4\u03B9\u03BA\u03AE \u03C0\u03B5\u03C1\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE \u03C7\u03CE\u03C1\u03C9\u03BD \u03B1\u03BD\u03AC \u03CC\u03C1\u03BF\u03C6\u03BF, \u03B5\u03BC\u03B2\u03B1\u03B4\u03AC)
4. \u03A4\u0395\u03A7\u039D\u0399\u039A\u0391 \u03A7\u0391\u03A1\u0391\u039A\u03A4\u0397\u03A1\u0399\u03A3\u03A4\u0399\u039A\u0391 (\u03B4\u03BF\u03BC\u03B9\u03BA\u03CC \u03C3\u03CD\u03C3\u03C4\u03B7\u03BC\u03B1, \u03C5\u03BB\u03B9\u03BA\u03AC, \u03B5\u03BE\u03C9\u03C4\u03B5\u03C1\u03B9\u03BA\u03AD\u03C2 \u03B5\u03C0\u03B9\u03C6\u03AC\u03BD\u03B5\u03B9\u03B5\u03C2)
5. \u039A\u0391\u039D\u039F\u039D\u0399\u03A3\u03A4\u0399\u039A\u0397 \u03A3\u03A5\u039C\u039C\u039F\u03A1\u03A6\u03A9\u03A3\u0397 (\u0393\u039F\u039A/\u039D\u039F\u039A, \u03C3\u03C5\u03BD\u03C4\u03B5\u03BB\u03B5\u03C3\u03C4\u03AD\u03C2 \u03B4\u03CC\u03BC\u03B7\u03C3\u03B7\u03C2, \u03BA\u03AC\u03BB\u03C5\u03C8\u03B7, \u03CD\u03C8\u03BF\u03C2)
6. \u0394\u0399\u0391\u039C\u039F\u03A1\u03A6\u03A9\u03A3\u0397 \u03A0\u0395\u03A1\u0399\u0392\u0391\u039B\u039B\u039F\u039D\u03A4\u039F\u03A3 \u03A7\u03A9\u03A1\u039F\u03A5
7. \u03A3\u03A5\u039C\u03A0\u0395\u03A1\u0391\u03A3\u039C\u0391\u03A4\u0391`,
    "\u03A3\u03C4\u03B1\u03C4\u03B9\u03BA\u03AE \u039C\u03B5\u03BB\u03AD\u03C4\u03B7": `\u03A3\u03C5\u03BD\u03AD\u03C4\u03B5\u03BE\u03B5 \u03B5\u03C0\u03AF\u03C3\u03B7\u03BC\u03B7 \u03A4\u0395\u03A7\u039D\u0399\u039A\u0397 \u0395\u039A\u0398\u0395\u03A3\u0397 \u03A3\u03A4\u0391\u03A4\u0399\u039A\u0397\u03A3 \u039C\u0395\u039B\u0395\u03A4\u0397\u03A3. \u0394\u03BF\u03BC\u03AE:
1. \u03A3\u03A4\u039F\u0399\u03A7\u0395\u0399\u0391 \u0395\u03A1\u0393\u039F\u03A5
2. \u03A6\u0395\u03A1\u03A9\u039D \u039F\u03A1\u0393\u0391\u039D\u0399\u03A3\u039C\u039F\u03A3 (\u03C4\u03CD\u03C0\u03BF\u03C2, \u03C5\u03BB\u03B9\u03BA\u03AC, \u03C0\u03B5\u03C1\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE)
3. \u03A6\u039F\u03A1\u03A4\u0399\u0391 \u03A3\u03A7\u0395\u0394\u0399\u0391\u03A3\u039C\u039F\u03A5 (\u03BC\u03CC\u03BD\u03B9\u03BC\u03B1, \u03BA\u03B9\u03BD\u03B7\u03C4\u03AC, \u03C3\u03B5\u03B9\u03C3\u03BC\u03B9\u03BA\u03AC \u03BA\u03B1\u03C4\u03AC \u0395\u0391\u039A 2000/\u0395\u03C5\u03C1\u03C9\u03BA\u03CE\u03B4\u03B9\u03BA\u03B1 8)
4. \u0398\u0395\u039C\u0395\u039B\u0399\u03A9\u03A3\u0397 (\u03C4\u03CD\u03C0\u03BF\u03C2, \u03B2\u03AC\u03B8\u03BF\u03C2, \u03B5\u03B4\u03B1\u03C6\u03B9\u03BA\u03AE \u03BA\u03B1\u03C4\u03B7\u03B3\u03BF\u03C1\u03AF\u03B1)
5. \u039A\u0391\u03A4\u0397\u0393\u039F\u03A1\u0399\u0391 \u03A3\u03A0\u039F\u03A5\u0394\u0391\u0399\u039F\u03A4\u0397\u03A4\u0391\u03A3 (\u03C3\u03B5\u03B9\u03C3\u03BC\u03B9\u03BA\u03AE \u03B6\u03CE\u03BD\u03B7, \u03BA\u03B1\u03C4\u03B7\u03B3\u03BF\u03C1\u03AF\u03B1 \u03BA\u03C4\u03B9\u03C1\u03AF\u03BF\u03C5)
6. \u03A5\u039B\u0399\u039A\u0391 \u039A\u0391\u03A4\u0391\u03A3\u039A\u0395\u03A5\u0397\u03A3 (\u03C3\u03BA\u03C5\u03C1\u03CC\u03B4\u03B5\u03BC\u03B1, \u03C7\u03AC\u03BB\u03C5\u03B2\u03B1\u03C2 - \u03BA\u03B1\u03C4\u03B7\u03B3\u03BF\u03C1\u03AF\u03B5\u03C2)
7. \u0394\u0399\u0391\u03A4\u0391\u039E\u0395\u0399\u03A3 \u0391\u039D\u03A4\u0399\u03A3\u0395\u0399\u03A3\u039C\u0399\u039A\u0397\u03A3 \u03A0\u03A1\u039F\u03A3\u03A4\u0391\u03A3\u0399\u0391\u03A3
8. \u03A3\u03A5\u039C\u03A0\u0395\u03A1\u0391\u03A3\u039C\u0391\u03A4\u0391 \u03A3\u03A4\u0391\u03A4\u0399\u039A\u0397\u03A3 \u0395\u03A0\u0391\u03A1\u039A\u0395\u0399\u0391\u03A3`,
    "\u0395\u03BD\u03B5\u03C1\u03B3\u03B5\u03B9\u03B1\u03BA\u03AE \u0395\u03C0\u03B9\u03B8\u03B5\u03CE\u03C1\u03B7\u03C3\u03B7": `\u03A3\u03C5\u03BD\u03AD\u03C4\u03B5\u03BE\u03B5 \u03B5\u03C0\u03AF\u03C3\u03B7\u03BC\u03B7 \u03A4\u0395\u03A7\u039D\u0399\u039A\u0397 \u0395\u039A\u0398\u0395\u03A3\u0397 \u0395\u039D\u0395\u03A1\u0393\u0395\u0399\u0391\u039A\u0397\u03A3 \u0395\u03A0\u0399\u0398\u0395\u03A9\u03A1\u0397\u03A3\u0397\u03A3. \u0394\u03BF\u03BC\u03AE:
1. \u03A3\u03A4\u039F\u0399\u03A7\u0395\u0399\u0391 \u039A\u03A4\u0399\u03A1\u0399\u039F\u03A5 \u039A\u0391\u0399 \u0399\u0394\u0399\u039F\u039A\u03A4\u0397\u03A4\u0397
2. \u039A\u03A4\u0399\u03A1\u0399\u0391\u039A\u039F \u039A\u0395\u039B\u03A5\u03A6\u039F\u03A3 (\u03B8\u03B5\u03C1\u03BC\u03BF\u03BC\u03CC\u03BD\u03C9\u03C3\u03B7, \u03BA\u03BF\u03C5\u03C6\u03CE\u03BC\u03B1\u03C4\u03B1, \u03C3\u03C4\u03AD\u03B3\u03B1\u03C3\u03B7 - U-values)
3. \u03A3\u03A5\u03A3\u03A4\u0397\u039C\u0391\u03A4\u0391 \u0398\u0395\u03A1\u039C\u0391\u039D\u03A3\u0397\u03A3/\u03A8\u03A5\u039E\u0397\u03A3 (\u03C4\u03CD\u03C0\u03BF\u03C2, \u03B7\u03BB\u03B9\u03BA\u03AF\u03B1, \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7)
4. \u0397\u039B\u0399\u0391\u039A\u0391/\u0391\u039D\u0391\u039D\u0395\u03A9\u03A3\u0399\u039C\u0395\u03A3 \u03A0\u0397\u0393\u0395\u03A3 \u0395\u039D\u0395\u03A1\u0393\u0395\u0399\u0391\u03A3
5. \u03A4\u0395\u03A7\u039D\u0399\u039A\u0391 \u03A7\u0391\u03A1\u0391\u039A\u03A4\u0397\u03A1\u0399\u03A3\u03A4\u0399\u039A\u0391 \u039A\u0391\u03A4' \u039A\u0395\u039D\u0391\u039A (\u039D.4122/2013)
6. \u0395\u039D\u0395\u03A1\u0393\u0395\u0399\u0391\u039A\u0397 \u039A\u0391\u03A4\u0391\u03A4\u0391\u039E\u0397 (\u03B5\u03BA\u03C4\u03B9\u03BC\u03CE\u03BC\u03B5\u03BD\u03B7 \u03B2\u03AC\u03C3\u03B5\u03B9 \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03C9\u03BD)
7. \u03A3\u03A5\u03A3\u03A4\u0391\u03A3\u0395\u0399\u03A3 \u0392\u0395\u039B\u03A4\u0399\u03A9\u03A3\u0397\u03A3 (\u03BA\u03B1\u03C4\u03AC \u03C3\u03B5\u03B9\u03C1\u03AC \u03C0\u03C1\u03BF\u03C4\u03B5\u03C1\u03B1\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2)
8. \u03A3\u03A5\u039C\u03A0\u0395\u03A1\u0391\u03A3\u039C\u0391\u03A4\u0391`,
    "\u0388\u03BA\u03B8\u03B5\u03C3\u03B7 \u0391\u03C5\u03B8\u03B1\u03B9\u03C1\u03AD\u03C4\u03BF\u03C5": `\u03A3\u03C5\u03BD\u03AD\u03C4\u03B5\u03BE\u03B5 \u03B5\u03C0\u03AF\u03C3\u03B7\u03BC\u03B7 \u03A4\u0395\u03A7\u039D\u0399\u039A\u0397 \u0395\u039A\u0398\u0395\u03A3\u0397 \u0391\u03A5\u0398\u0391\u0399\u03A1\u0395\u03A4\u0397\u03A3 \u039A\u0391\u03A4\u0391\u03A3\u039A\u0395\u03A5\u0397\u03A3 (\u039D.4495/2017). \u0394\u03BF\u03BC\u03AE:
1. \u03A3\u03A4\u039F\u0399\u03A7\u0395\u0399\u0391 \u0391\u039A\u0399\u039D\u0397\u03A4\u039F\u03A5 \u039A\u0391\u0399 \u0399\u0394\u0399\u039F\u039A\u03A4\u0397\u03A4\u0397
2. \u03A0\u0395\u03A1\u0399\u0393\u03A1\u0391\u03A6\u0397 \u0391\u03A5\u0398\u0391\u0399\u03A1\u0395\u03A4\u0397\u03A3 \u039A\u0391\u03A4\u0391\u03A3\u039A\u0395\u03A5\u0397\u03A3 (\u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03B7\u03C1\u03B9\u03C3\u03C4\u03B9\u03BA\u03AC, \u03B5\u03BC\u03B2\u03B1\u03B4\u03CC, \u03C4\u03CD\u03C0\u03BF\u03C2)
3. \u03A7\u03A1\u039F\u039D\u039F\u03A3 \u0391\u039D\u0395\u0393\u0395\u03A1\u03A3\u0397\u03A3 (\u03B5\u03BA\u03C4\u03AF\u03BC\u03B7\u03C3\u03B7 \u03B2\u03AC\u03C3\u03B5\u03B9 \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03C9\u03BD)
4. \u03A0\u039F\u039B\u0395\u039F\u0394\u039F\u039C\u0399\u039A\u0395\u03A3 \u03A0\u0391\u03A1\u0391\u0392\u0391\u03A3\u0395\u0399\u03A3 (\u03B1\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03C0\u03B1\u03C1\u03B5\u03BA\u03BA\u03BB\u03AF\u03C3\u03B5\u03C9\u03BD)
5. \u03A3\u03A4\u0391\u03A4\u0399\u039A\u0397 \u0395\u03A0\u0391\u03A1\u039A\u0395\u0399\u0391 (\u03B3\u03B5\u03BD\u03B9\u03BA\u03AE \u03B5\u03BA\u03C4\u03AF\u03BC\u03B7\u03C3\u03B7)
6. \u03A5\u03A0\u0391\u0393\u03A9\u0393\u0397 \u03A3\u03A4\u039F \u039D.4495/2017 (\u03BA\u03B1\u03C4\u03B7\u03B3\u03BF\u03C1\u03AF\u03B1, \u03C0\u03C1\u03BF\u03CB\u03C0\u03BF\u03B8\u03AD\u03C3\u03B5\u03B9\u03C2)
7. \u0391\u03A0\u0391\u0399\u03A4\u039F\u03A5\u039C\u0395\u039D\u0391 \u0395\u0393\u0393\u03A1\u0391\u03A6\u0391 \u03A4\u0391\u039A\u03A4\u039F\u03A0\u039F\u0399\u0397\u03A3\u0397\u03A3
8. \u03A3\u03A5\u039C\u03A0\u0395\u03A1\u0391\u03A3\u039C\u0391\u03A4\u0391 \u039A\u0391\u0399 \u03A0\u03A1\u039F\u03A4\u0391\u03A3\u0395\u0399\u03A3`
  };
  const specificPrompt = reportTypePrompts[params.reportType] || reportTypePrompts["\u03A4\u03B5\u03C7\u03BD\u03B9\u03BA\u03AE \u0388\u03BA\u03B8\u03B5\u03C3\u03B7 \u0391\u03C1\u03C7\u03B9\u03C4\u03B5\u03BA\u03C4\u03BF\u03BD\u03B9\u03BA\u03AE\u03C2"];
  const prompt = `${specificPrompt}

\u03A3\u03A4\u039F\u0399\u03A7\u0395\u0399\u0391 \u0393\u0399\u0391 \u03A4\u0397\u039D \u0395\u039A\u0398\u0395\u03A3\u0397:

\u0399\u03B4\u03B9\u03BF\u03BA\u03C4\u03AE\u03C4\u03B7\u03C2: ${params.ownerName}
\u0394\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 \u03B1\u03BA\u03B9\u03BD\u03AE\u03C4\u03BF\u03C5: ${params.address}
\u03A3\u03C5\u03BD\u03BF\u03BB\u03B9\u03BA\u03AE \u03B5\u03C0\u03B9\u03C6\u03AC\u03BD\u03B5\u03B9\u03B1: ${params.area} \u03C4.\u03BC.
\u0391\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 \u03BF\u03C1\u03CC\u03C6\u03C9\u03BD: ${params.floors}
\u0388\u03C4\u03BF\u03C2 \u03BA\u03B1\u03C4\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE\u03C2: ${params.constructionYear}

\u03A3\u03C5\u03BD\u03C4\u03AC\u03BA\u03C4\u03B7\u03C2: ${params.engineerName}
\u0395\u03B9\u03B4\u03B9\u03BA\u03CC\u03C4\u03B7\u03C4\u03B1: ${params.engineerSpecialty}
\u0391\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 \u03BC\u03B7\u03C4\u03C1\u03CE\u03BF\u03C5 \u03A4\u0395\u0395: ${params.teeNumber}
\u0397\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1: ${params.reportDate}

${params.specialNotes ? `\u0395\u03B9\u03B4\u03B9\u03BA\u03AD\u03C2 \u03C3\u03B7\u03BC\u03B5\u03B9\u03CE\u03C3\u03B5\u03B9\u03C2 / \u03C0\u03C1\u03CC\u03C3\u03B8\u03B5\u03C4\u03B1 \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1: ${params.specialNotes}` : ""}

\u03A3\u03C5\u03BD\u03C4\u03AC\u03BE\u03C4\u03B5 \u03C0\u03BB\u03AE\u03C1\u03B7, \u03B5\u03C0\u03AF\u03C3\u03B7\u03BC\u03B7 \u03C4\u03B5\u03C7\u03BD\u03B9\u03BA\u03AE \u03AD\u03BA\u03B8\u03B5\u03C3\u03B7 \u03BC\u03B5 \u03B1\u03C1\u03B9\u03B8\u03BC\u03B7\u03BC\u03AD\u03BD\u03B5\u03C2 \u03C0\u03B1\u03C1\u03B1\u03B3\u03C1\u03AC\u03C6\u03BF\u03C5\u03C2, \u03B5\u03C0\u03B1\u03B3\u03B3\u03B5\u03BB\u03BC\u03B1\u03C4\u03B9\u03BA\u03AE \u03BF\u03C1\u03BF\u03BB\u03BF\u03B3\u03AF\u03B1 \u03BA\u03B1\u03B9 \u03C0\u03B1\u03C1\u03B1\u03C0\u03BF\u03BC\u03C0\u03AD\u03C2 \u03C3\u03C4\u03B7 \u03C3\u03C7\u03B5\u03C4\u03B9\u03BA\u03AE \u03BD\u03BF\u03BC\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1.`;
  const message = await anthropic.messages.create({
    model: HAIKU_MODEL,
    max_tokens: 3500,
    system: TECHNICAL_REPORT_SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }]
  });
  const content = message.content[0];
  if (content.type === "text") return content.text;
  throw new Error("Unexpected response type from Claude");
}
async function generatePermitChecklist(projectDetails) {
  const prompt = `\u0394\u03B7\u03BC\u03B9\u03BF\u03CD\u03C1\u03B3\u03B7\u03C3\u03B5 \u03C0\u03BB\u03AE\u03C1\u03B7 \u03BA\u03B1\u03C4\u03AC\u03BB\u03BF\u03B3\u03BF \u03B4\u03B9\u03BA\u03B1\u03B9\u03BF\u03BB\u03BF\u03B3\u03B7\u03C4\u03B9\u03BA\u03CE\u03BD \u03B3\u03B9\u03B1 \u03BF\u03B9\u03BA\u03BF\u03B4\u03BF\u03BC\u03B9\u03BA\u03AE \u03AC\u03B4\u03B5\u03B9\u03B1 \u03BC\u03B5 \u03C4\u03B1 \u03C0\u03B1\u03C1\u03B1\u03BA\u03AC\u03C4\u03C9 \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1:

- \u03A4\u03CD\u03C0\u03BF\u03C2 \u03AD\u03C1\u03B3\u03BF\u03C5: ${projectDetails.projectType}
- \u03A4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1: ${projectDetails.location}
- \u0395\u03C0\u03B9\u03C6\u03AC\u03BD\u03B5\u03B9\u03B1: ${projectDetails.area} \u03C4.\u03BC.
- \u0391\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 \u03BF\u03C1\u03CC\u03C6\u03C9\u03BD: ${projectDetails.floors}
- \u03A7\u03C1\u03AE\u03C3\u03B7: ${projectDetails.useType}
- \u039D\u03AD\u03B1 \u03BA\u03B1\u03C4\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE: ${projectDetails.isNew ? "\u039D\u03B1\u03B9" : "\u038C\u03C7\u03B9 (\u03B1\u03BD\u03B1\u03BA\u03B1\u03AF\u03BD\u03B9\u03C3\u03B7/\u03C0\u03C1\u03BF\u03C3\u03B8\u03AE\u03BA\u03B7)"}
- \u03A5\u03C0\u03CC\u03B3\u03B5\u03B9\u03BF: ${projectDetails.hasBasement ? "\u039D\u03B1\u03B9" : "\u038C\u03C7\u03B9"}
- \u039A\u03BF\u03BD\u03C4\u03AC \u03C3\u03B5 \u03B1\u03C1\u03C7\u03B1\u03B9\u03BF\u03BB\u03BF\u03B3\u03B9\u03BA\u03CC \u03C7\u03CE\u03C1\u03BF: ${projectDetails.nearAntiquities ? "\u039D\u03B1\u03B9" : "\u038C\u03C7\u03B9"}
- \u039A\u03BF\u03BD\u03C4\u03AC \u03C3\u03B5 \u03B8\u03AC\u03BB\u03B1\u03C3\u03C3\u03B1/\u03B1\u03B9\u03B3\u03B9\u03B1\u03BB\u03CC: ${projectDetails.nearSea ? "\u039D\u03B1\u03B9" : "\u038C\u03C7\u03B9"}
- \u03A0\u03B1\u03C1\u03B1\u03B4\u03BF\u03C3\u03B9\u03B1\u03BA\u03CC\u03C2 \u03BF\u03B9\u03BA\u03B9\u03C3\u03BC\u03CC\u03C2: ${projectDetails.isTraditionalSettlement ? "\u039D\u03B1\u03B9" : "\u038C\u03C7\u03B9"}

\u03A0\u03B1\u03C1\u03AD\u03C7\u03B5 \u03C0\u03BB\u03AE\u03C1\u03B7 \u03BA\u03B1\u03B9 \u03BF\u03C1\u03B3\u03B1\u03BD\u03C9\u03BC\u03AD\u03BD\u03BF \u03BA\u03B1\u03C4\u03AC\u03BB\u03BF\u03B3\u03BF \u03B5\u03B3\u03B3\u03C1\u03AC\u03C6\u03C9\u03BD \u03C0\u03BF\u03C5 \u03B1\u03C0\u03B1\u03B9\u03C4\u03BF\u03CD\u03BD\u03C4\u03B1\u03B9.`;
  const message = await anthropic.messages.create({
    model: HAIKU_MODEL,
    max_tokens: 2e3,
    system: CHECKLIST_SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }]
  });
  const content = message.content[0];
  if (content.type === "text") return content.text;
  throw new Error("Unexpected response type from Claude");
}

// server/routes.ts
var import_zod2 = require("zod");
var import_pg2 = require("pg");
var import_crypto = __toESM(require("crypto"), 1);

// server/email.ts
var import_resend = require("resend");
var resend = new import_resend.Resend(process.env.RESEND_API_KEY);
var FROM_EMAIL = process.env.EMAIL_FROM || "ArchiLex <onboarding@resend.dev>";
async function sendEmail({ to, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html
    });
    if (error) {
      console.error("Resend error:", error);
      throw error;
    }
    console.log("Email sent: %s", data?.id);
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
var emailTemplates = {
  verification: (token) => ({
    subject: "\u0395\u03C0\u03B1\u03BB\u03B7\u03B8\u03B5\u03CD\u03C3\u03C4\u03B5 \u03C4\u03BF email \u03C3\u03B1\u03C2 - ArchiLex",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1d4ed8;">\u039A\u03B1\u03BB\u03CE\u03C2 \u03AE\u03C1\u03B8\u03B1\u03C4\u03B5 \u03C3\u03C4\u03BF ArchiLex</h2>
        <p>\u0395\u03C5\u03C7\u03B1\u03C1\u03B9\u03C3\u03C4\u03BF\u03CD\u03BC\u03B5 \u03B3\u03B9\u03B1 \u03C4\u03B7\u03BD \u03B5\u03B3\u03B3\u03C1\u03B1\u03C6\u03AE \u03C3\u03B1\u03C2. \u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03BF\u03CD\u03BC\u03B5 \u03B5\u03C0\u03B1\u03BB\u03B7\u03B8\u03B5\u03CD\u03C3\u03C4\u03B5 \u03C4\u03BF email \u03C3\u03B1\u03C2 \u03C0\u03B1\u03C4\u03CE\u03BD\u03C4\u03B1\u03C2 \u03C4\u03BF\u03BD \u03C0\u03B1\u03C1\u03B1\u03BA\u03AC\u03C4\u03C9 \u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03BC\u03BF:</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/verify-email?token=${token}" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            \u0395\u03C0\u03B1\u03BB\u03AE\u03B8\u03B5\u03C5\u03C3\u03B7 Email
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">\u0391\u03BD \u03B4\u03B5\u03BD \u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AE\u03C3\u03B1\u03C4\u03B5 \u03B5\u03C3\u03B5\u03AF\u03C2 \u03B1\u03C5\u03C4\u03CC\u03BD \u03C4\u03BF\u03BD \u03BB\u03BF\u03B3\u03B1\u03C1\u03B9\u03B1\u03C3\u03BC\u03CC, \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03B1\u03B3\u03BD\u03BF\u03AE\u03C3\u03B5\u03C4\u03B5 \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF email.</p>
      </div>
    `
  }),
  passwordReset: (token) => ({
    subject: "\u0395\u03C0\u03B1\u03BD\u03B1\u03C6\u03BF\u03C1\u03AC \u039A\u03C9\u03B4\u03B9\u03BA\u03BF\u03CD ArchiLex",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1d4ed8;">\u0395\u03C0\u03B1\u03BD\u03B1\u03C6\u03BF\u03C1\u03AC \u039A\u03C9\u03B4\u03B9\u03BA\u03BF\u03CD</h2>
        <p>\u039B\u03AC\u03B2\u03B1\u03BC\u03B5 \u03AD\u03BD\u03B1 \u03B1\u03AF\u03C4\u03B7\u03BC\u03B1 \u03B3\u03B9\u03B1 \u03B5\u03C0\u03B1\u03BD\u03B1\u03C6\u03BF\u03C1\u03AC \u03C4\u03BF\u03C5 \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03CD \u03C0\u03C1\u03CC\u03C3\u03B2\u03B1\u03C3\u03B7\u03C2 \u03C3\u03C4\u03BF\u03BD \u03BB\u03BF\u03B3\u03B1\u03C1\u03B9\u03B1\u03C3\u03BC\u03CC \u03C3\u03B1\u03C2 ArchiLex.</p>
        <p>\u03A0\u03B1\u03C4\u03AE\u03C3\u03C4\u03B5 \u03C4\u03BF\u03BD \u03C0\u03B1\u03C1\u03B1\u03BA\u03AC\u03C4\u03C9 \u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03BC\u03BF \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03BF\u03C1\u03AF\u03C3\u03B5\u03C4\u03B5 \u03BD\u03AD\u03BF \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC. \u039F \u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03BC\u03BF\u03C2 \u03BB\u03AE\u03B3\u03B5\u03B9 \u03C3\u03B5 1 \u03CE\u03C1\u03B1.</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/reset-password?token=${token}" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            \u0395\u03C0\u03B1\u03BD\u03B1\u03C6\u03BF\u03C1\u03AC \u039A\u03C9\u03B4\u03B9\u03BA\u03BF\u03CD
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">\u0391\u03BD \u03B4\u03B5\u03BD \u03B6\u03B7\u03C4\u03AE\u03C3\u03B1\u03C4\u03B5 \u03B5\u03C3\u03B5\u03AF\u03C2 \u03C4\u03B7\u03BD \u03B5\u03C0\u03B1\u03BD\u03B1\u03C6\u03BF\u03C1\u03AC, \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03B1\u03B3\u03BD\u03BF\u03AE\u03C3\u03B5\u03C4\u03B5 \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF email.</p>
      </div>
    `
  }),
  usageWarning80: (uses, limit) => ({
    subject: "\u03A0\u03BB\u03B7\u03C3\u03B9\u03AC\u03B6\u03B5\u03C4\u03B5 \u03C4\u03BF \u03CC\u03C1\u03B9\u03CC \u03C3\u03B1\u03C2 - ArchiLex",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #d97706;">\u0395\u03BD\u03B7\u03BC\u03AD\u03C1\u03C9\u03C3\u03B7 \u03A7\u03C1\u03AE\u03C3\u03B7\u03C2</h2>
        <p>\u03A3\u03B1\u03C2 \u03B5\u03BD\u03B7\u03BC\u03B5\u03C1\u03CE\u03BD\u03BF\u03C5\u03BC\u03B5 \u03CC\u03C4\u03B9 \u03AD\u03C7\u03B5\u03C4\u03B5 \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03B9 \u03C4\u03BF **80%** \u03C4\u03BF\u03C5 \u03BC\u03B7\u03BD\u03B9\u03B1\u03AF\u03BF\u03C5 \u03BF\u03C1\u03AF\u03BF\u03C5 \u03C3\u03B1\u03C2.</p>
        <p>\u03A4\u03C1\u03AD\u03C7\u03BF\u03C5\u03C3\u03B1 \u03C7\u03C1\u03AE\u03C3\u03B7: <strong>${uses} / ${limit}</strong></p>
        <p>\u0393\u03B9\u03B1 \u03BD\u03B1 \u03B1\u03C0\u03BF\u03C6\u03CD\u03B3\u03B5\u03C4\u03B5 \u03C4\u03B7 \u03B4\u03B9\u03B1\u03BA\u03BF\u03C0\u03AE \u03C4\u03B7\u03C2 \u03C0\u03C1\u03CC\u03C3\u03B2\u03B1\u03C3\u03B7\u03C2 \u03C3\u03C4\u03B1 \u03B5\u03C1\u03B3\u03B1\u03BB\u03B5\u03AF\u03B1, \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03B1\u03BD\u03B1\u03B2\u03B1\u03B8\u03BC\u03AF\u03C3\u03B5\u03C4\u03B5 \u03C4\u03BF \u03C0\u03BB\u03AC\u03BD\u03BF \u03C3\u03B1\u03C2.</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/dashboard" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            \u0391\u03BD\u03B1\u03B2\u03AC\u03B8\u03BC\u03B9\u03C3\u03B7 \u03A0\u03BB\u03AC\u03BD\u03BF\u03C5
          </a>
        </div>
      </div>
    `
  }),
  usageLimitReached: (limit) => ({
    subject: "\u0395\u03BE\u03B1\u03BD\u03C4\u03BB\u03AE\u03C3\u03B1\u03C4\u03B5 \u03C4\u03BF \u03CC\u03C1\u03B9\u03CC \u03C3\u03B1\u03C2 - \u0391\u03BD\u03B1\u03B2\u03B1\u03B8\u03BC\u03AF\u03C3\u03C4\u03B5 - ArchiLex",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #dc2626;">\u0395\u03BE\u03AC\u03BD\u03C4\u03BB\u03B7\u03C3\u03B7 \u039F\u03C1\u03AF\u03BF\u03C5</h2>
        <p>\u0388\u03C7\u03B5\u03C4\u03B5 \u03C6\u03C4\u03AC\u03C3\u03B5\u03B9 \u03C3\u03C4\u03BF \u03BC\u03AD\u03B3\u03B9\u03C3\u03C4\u03BF \u03CC\u03C1\u03B9\u03BF \u03C4\u03C9\u03BD <strong>${limit}</strong> \u03C7\u03C1\u03AE\u03C3\u03B5\u03C9\u03BD \u03B3\u03B9\u03B1 \u03B1\u03C5\u03C4\u03CC\u03BD \u03C4\u03BF\u03BD \u03BC\u03AE\u03BD\u03B1.</p>
        <p>\u0397 \u03C0\u03C1\u03CC\u03C3\u03B2\u03B1\u03C3\u03B7 \u03C3\u03C4\u03B1 AI \u03B5\u03C1\u03B3\u03B1\u03BB\u03B5\u03AF\u03B1 \u03AD\u03C7\u03B5\u03B9 \u03C0\u03B5\u03C1\u03B9\u03BF\u03C1\u03B9\u03C3\u03C4\u03B5\u03AF. \u0391\u03BD\u03B1\u03B2\u03B1\u03B8\u03BC\u03AF\u03C3\u03C4\u03B5 \u03C3\u03B5 Pro \u03C0\u03BB\u03AC\u03BD\u03BF \u03B3\u03B9\u03B1 \u03B1\u03C0\u03B5\u03C1\u03B9\u03CC\u03C1\u03B9\u03C3\u03C4\u03B7 \u03C7\u03C1\u03AE\u03C3\u03B7.</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/dashboard" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            \u0391\u03BD\u03B1\u03B2\u03AC\u03B8\u03BC\u03B9\u03C3\u03B7 \u03C4\u03CE\u03C1\u03B1
          </a>
        </div>
      </div>
    `
  }),
  deadlineReminder: (projectName, daysLeft) => ({
    subject: "\u03A5\u03C0\u03B5\u03BD\u03B8\u03CD\u03BC\u03B9\u03C3\u03B7 \u03C0\u03C1\u03BF\u03B8\u03B5\u03C3\u03BC\u03AF\u03B1\u03C2 \u03AD\u03C1\u03B3\u03BF\u03C5 - ArchiLex",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1d4ed8;">\u03A5\u03C0\u03B5\u03BD\u03B8\u03CD\u03BC\u03B9\u03C3\u03B7 \u03A0\u03C1\u03BF\u03B8\u03B5\u03C3\u03BC\u03AF\u03B1\u03C2</h2>
        <p>\u03A4\u03BF \u03AD\u03C1\u03B3\u03BF <strong>${projectName}</strong> \u03C0\u03BB\u03B7\u03C3\u03B9\u03AC\u03B6\u03B5\u03B9 \u03C3\u03C4\u03B7\u03BD \u03C0\u03C1\u03BF\u03B8\u03B5\u03C3\u03BC\u03AF\u03B1 \u03C4\u03BF\u03C5.</p>
        <p>\u0391\u03C0\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5\u03BD <strong>${daysLeft} \u03B7\u03BC\u03AD\u03C1\u03B5\u03C2</strong> \u03B3\u03B9\u03B1 \u03C4\u03B7\u03BD \u03BF\u03BB\u03BF\u03BA\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7.</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/dashboard" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            \u0394\u03B5\u03AF\u03C4\u03B5 \u03C4\u03BF \u0388\u03C1\u03B3\u03BF
          </a>
        </div>
      </div>
    `
  }),
  upgradeSuccess: (planName) => ({
    subject: "\u0395\u03C0\u03B9\u03C4\u03C5\u03C7\u03AE\u03C2 \u03B1\u03BD\u03B1\u03B2\u03AC\u03B8\u03BC\u03B9\u03C3\u03B7 \u03C0\u03BB\u03AC\u03BD\u03BF\u03C5 - ArchiLex",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #059669;">\u03A3\u03C5\u03B3\u03C7\u03B1\u03C1\u03B7\u03C4\u03AE\u03C1\u03B9\u03B1!</h2>
        <p>\u0397 \u03B1\u03BD\u03B1\u03B2\u03AC\u03B8\u03BC\u03B9\u03C3\u03B7 \u03C4\u03BF\u03C5 \u03BB\u03BF\u03B3\u03B1\u03C1\u03B9\u03B1\u03C3\u03BC\u03BF\u03CD \u03C3\u03B1\u03C2 \u03C3\u03C4\u03BF \u03C0\u03BB\u03AC\u03BD\u03BF <strong>${planName}</strong> \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03CE\u03B8\u03B7\u03BA\u03B5 \u03B5\u03C0\u03B9\u03C4\u03C5\u03C7\u03CE\u03C2.</p>
        <p>\u03A4\u03CE\u03C1\u03B1 \u03AD\u03C7\u03B5\u03C4\u03B5 \u03C0\u03C1\u03CC\u03C3\u03B2\u03B1\u03C3\u03B7 \u03C3\u03B5 \u03CC\u03BB\u03B5\u03C2 \u03C4\u03B9\u03C2 \u03C0\u03C1\u03BF\u03B7\u03B3\u03BC\u03AD\u03BD\u03B5\u03C2 \u03B4\u03C5\u03BD\u03B1\u03C4\u03CC\u03C4\u03B7\u03C4\u03B5\u03C2 \u03BA\u03B1\u03B9 \u03C4\u03BF \u03B1\u03C5\u03BE\u03B7\u03BC\u03AD\u03BD\u03BF \u03CC\u03C1\u03B9\u03BF \u03C7\u03C1\u03AE\u03C3\u03B7\u03C2.</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/dashboard" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            \u039C\u03B5\u03C4\u03AC\u03B2\u03B1\u03C3\u03B7 \u03C3\u03C4\u03BF Dashboard
          </a>
        </div>
      </div>
    `
  })
};

// server/stripe.ts
var import_stripe = __toESM(require("stripe"), 1);
var stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_mock";
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("\u26A0\uFE0F STRIPE_SECRET_KEY is not set. Stripe functionality will be disabled.");
}
var stripe = new import_stripe.default(stripeSecretKey, {
  apiVersion: "2023-10-16"
});
var PLAN_PRICES = {
  starter: process.env.STRIPE_PRICE_ID_STARTER,
  professional: process.env.STRIPE_PRICE_ID_PROFESSIONAL,
  unlimited: process.env.STRIPE_PRICE_ID_UNLIMITED
};
async function createCheckoutSession(userId, email, plan) {
  const priceId = PLAN_PRICES[plan];
  if (!priceId) throw new Error("Invalid plan or missing price ID");
  const session3 = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: "subscription",
    success_url: `${process.env.APP_URL}/dashboard?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/dashboard?status=cancel`,
    customer_email: email,
    client_reference_id: userId,
    metadata: {
      userId,
      plan
    }
  });
  return session3;
}
async function cancelSubscription(subscriptionId) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

// server/routes.ts
var PgSession = (0, import_connect_pg_simple.default)(import_express_session.default);
var PLAN_LIMITS = {
  free: 10,
  starter: 50,
  professional: 200,
  unlimited: null,
  pro: null
};
var upload = (0, import_multer.default)({
  storage: import_multer.default.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("\u039C\u03B7 \u03B1\u03C0\u03BF\u03B4\u03B5\u03BA\u03C4\u03CC\u03C2 \u03C4\u03CD\u03C0\u03BF\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5"));
  }
});
async function registerRoutes(httpServer2, app2) {
  const pool2 = new import_pg2.Pool({ connectionString: process.env.DATABASE_URL });
  app2.use(
    (0, import_express_session.default)({
      store: new PgSession({ pool: pool2, createTableIfMissing: true }),
      secret: process.env.SESSION_SECRET || (process.env.NODE_ENV === "production" ? (() => {
        throw new Error("SESSION_SECRET environment variable is required in production");
      })() : "dev-only-insecure-secret"),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1e3, httpOnly: true, secure: process.env.NODE_ENV === "production" }
    })
  );
  function requireAuth(req, res, next) {
    if (!req.session.userId) return res.status(401).json({ error: "\u0394\u03B5\u03BD \u03B5\u03AF\u03C3\u03C4\u03B5 \u03C3\u03C5\u03BD\u03B4\u03B5\u03B4\u03B5\u03BC\u03AD\u03BD\u03BF\u03B9" });
    next();
  }
  async function checkAndIncrementUsage(userId, res) {
    const user = await storage.getUser(userId);
    if (!user) {
      res.status(401).json({ error: "\u03A7\u03C1\u03AE\u03C3\u03C4\u03B7\u03C2 \u03B4\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5" });
      return false;
    }
    const limit = PLAN_LIMITS[user.plan] ?? null;
    if (limit === null) {
      await storage.incrementUsageCount(userId);
      return true;
    }
    const now = /* @__PURE__ */ new Date();
    const lastReset = new Date(user.lastResetDate);
    const sameMonth = now.getMonth() === lastReset.getMonth() && now.getFullYear() === lastReset.getFullYear();
    const currentCount = sameMonth ? user.usesThisMonth : 0;
    if (currentCount >= limit) {
      const planNames = { free: "\u0394\u03C9\u03C1\u03B5\u03AC\u03BD", starter: "Starter", professional: "Professional" };
      res.status(403).json({
        error: `\u0388\u03C7\u03B5\u03C4\u03B5 \u03B5\u03BE\u03B1\u03BD\u03C4\u03BB\u03AE\u03C3\u03B5\u03B9 \u03C4\u03BF \u03BC\u03B7\u03BD\u03B9\u03B1\u03AF\u03BF \u03CC\u03C1\u03B9\u03BF \u03C4\u03C9\u03BD ${limit} \u03C7\u03C1\u03AE\u03C3\u03B5\u03C9\u03BD (\u03C0\u03BB\u03AC\u03BD\u03BF ${planNames[user.plan] || user.plan}). \u0391\u03BD\u03B1\u03B2\u03B1\u03B8\u03BC\u03AF\u03C3\u03C4\u03B5 \u03B3\u03B9\u03B1 \u03C0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03B5\u03C2 \u03C7\u03C1\u03AE\u03C3\u03B5\u03B9\u03C2.`,
        limitReached: true
      });
      if (currentCount === limit) {
        sendEmail({
          to: user.email,
          ...emailTemplates.usageLimitReached(limit)
        }).catch(console.error);
      }
      return false;
    }
    const updatedUser = await storage.incrementUsageCount(userId);
    if (limit && updatedUser.usesThisMonth === Math.floor(limit * 0.8)) {
      sendEmail({
        to: user.email,
        ...emailTemplates.usageWarning80(updatedUser.usesThisMonth, limit)
      }).catch(console.error);
    }
    return true;
  }
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const existing = await storage.getUserByEmail(data.email);
      if (existing) return res.status(400).json({ error: "\u03A4\u03BF email \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03B5\u03AF\u03C4\u03B1\u03B9 \u03AE\u03B4\u03B7" });
      const hashedPassword = await import_bcryptjs.default.hash(data.password, 12);
      const verificationToken = import_crypto.default.randomBytes(32).toString("hex");
      const user = await storage.createUser({
        ...data,
        password: hashedPassword,
        emailVerificationToken: verificationToken
      });
      sendEmail({
        to: user.email,
        ...emailTemplates.verification(verificationToken)
      }).catch(console.error);
      req.session.userId = user.id;
      const { password: _, ...safeUser } = user;
      res.json({ user: safeUser });
    } catch (err) {
      if (err instanceof import_zod2.ZodError) return res.status(400).json({ error: err.errors[0].message });
      console.error(err);
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7\u03BD \u03B5\u03B3\u03B3\u03C1\u03B1\u03C6\u03AE" });
    }
  });
  app2.get("/api/auth/verify-email", async (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(400).json({ error: "\u039B\u03B5\u03AF\u03C0\u03B5\u03B9 \u03C4\u03BF token \u03B5\u03C0\u03B1\u03BB\u03AE\u03B8\u03B5\u03C5\u03C3\u03B7\u03C2" });
    const user = await storage.verifyEmail(token);
    if (!user) return res.status(400).json({ error: "\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF \u03AE \u03BB\u03B7\u03B3\u03BC\u03AD\u03BD\u03BF token" });
    res.json({ success: true, message: "\u03A4\u03BF email \u03B5\u03C0\u03B1\u03BB\u03B7\u03B8\u03B5\u03CD\u03C4\u03B7\u03BA\u03B5 \u03BC\u03B5 \u03B5\u03C0\u03B9\u03C4\u03C5\u03C7\u03AF\u03B1" });
  });
  app2.post("/api/auth/forgot-password", async (req, res) => {
    const { email } = req.body;
    const user = await storage.getUserByEmail(email);
    if (!user) return res.json({ success: true });
    const token = import_crypto.default.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 36e5);
    await storage.createPasswordResetToken(user.id, token, expiresAt);
    sendEmail({
      to: user.email,
      ...emailTemplates.passwordReset(token)
    }).catch(console.error);
    res.json({ success: true });
  });
  app2.post("/api/auth/reset-password", async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: "\u039B\u03B5\u03AF\u03C0\u03BF\u03C5\u03BD \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1" });
    const tokenData = await storage.getPasswordResetToken(token);
    if (!tokenData || tokenData.used || new Date(tokenData.expiresAt) < /* @__PURE__ */ new Date()) {
      return res.status(400).json({ error: "\u03A4\u03BF token \u03B5\u03AF\u03BD\u03B1\u03B9 \u03AC\u03BA\u03C5\u03C1\u03BF \u03AE \u03AD\u03C7\u03B5\u03B9 \u03BB\u03AE\u03BE\u03B5\u03B9" });
    }
    const hashedPassword = await import_bcryptjs.default.hash(password, 12);
    await storage.updatePassword(tokenData.userId, hashedPassword);
    await storage.usePasswordResetToken(tokenData.id);
    res.json({ success: true, message: "\u039F \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC\u03C2 \u03B5\u03BD\u03B7\u03BC\u03B5\u03C1\u03CE\u03B8\u03B7\u03BA\u03B5" });
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      const user = await storage.getUserByEmail(data.email);
      if (!user) return res.status(401).json({ error: "\u039B\u03AC\u03B8\u03BF\u03C2 email \u03AE \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC\u03C2" });
      const valid = await import_bcryptjs.default.compare(data.password, user.password);
      if (!valid) return res.status(401).json({ error: "\u039B\u03AC\u03B8\u03BF\u03C2 email \u03AE \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC\u03C2" });
      req.session.userId = user.id;
      await storage.updateLastLogin(user.id);
      const updatedUser = await storage.getUser(user.id);
      const { password: _, ...safeUser } = updatedUser;
      res.json({ user: safeUser });
    } catch (err) {
      if (err instanceof import_zod2.ZodError) return res.status(400).json({ error: err.errors[0].message });
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7" });
    }
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03B1\u03C0\u03BF\u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7\u03C2" });
      res.json({ success: true });
    });
  });
  app2.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: "\u0394\u03B5\u03BD \u03B5\u03AF\u03C3\u03C4\u03B5 \u03C3\u03C5\u03BD\u03B4\u03B5\u03B4\u03B5\u03BC\u03AD\u03BD\u03BF\u03B9" });
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      req.session.destroy(() => {
      });
      return res.status(401).json({ error: "\u03A7\u03C1\u03AE\u03C3\u03C4\u03B7\u03C2 \u03B4\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5" });
    }
    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser });
  });
  app2.patch("/api/profile", requireAuth, async (req, res) => {
    try {
      const data = updateProfileSchema.parse(req.body);
      const existing = await storage.getUserByEmail(data.email);
      if (existing && existing.id !== req.session.userId) {
        return res.status(400).json({ error: "\u03A4\u03BF email \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03B5\u03AF\u03C4\u03B1\u03B9 \u03AE\u03B4\u03B7 \u03B1\u03C0\u03CC \u03AC\u03BB\u03BB\u03BF \u03BB\u03BF\u03B3\u03B1\u03C1\u03B9\u03B1\u03C3\u03BC\u03CC" });
      }
      const user = await storage.updateUserProfile(req.session.userId, data);
      const { password: _, ...safeUser } = user;
      res.json({ user: safeUser });
    } catch (err) {
      if (err instanceof import_zod2.ZodError) return res.status(400).json({ error: err.errors[0].message });
      console.error(err);
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7\u03BD \u03B5\u03BD\u03B7\u03BC\u03AD\u03C1\u03C9\u03C3\u03B7 \u03C4\u03BF\u03C5 \u03C0\u03C1\u03BF\u03C6\u03AF\u03BB" });
    }
  });
  app2.post("/api/questions/ask", requireAuth, async (req, res) => {
    let question;
    try {
      ({ question } = insertQuestionSchema.parse(req.body));
    } catch (err) {
      if (err instanceof import_zod2.ZodError) return res.status(400).json({ error: err.errors[0].message });
      return res.status(400).json({ error: "\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03C1\u03CE\u03C4\u03B7\u03C3\u03B7" });
    }
    const canProceed = await checkAndIncrementUsage(req.session.userId, res);
    if (!canProceed) return;
    let aiResult;
    try {
      aiResult = await askClaude(question);
    } catch (err) {
      console.error("[/api/questions/ask] AI call failed:", {
        message: err?.message,
        status: err?.status,
        name: err?.name,
        stack: err?.stack?.split("\n").slice(0, 5).join("\n")
      });
      const upstream = typeof err?.status === "number" && err.status >= 400 && err.status < 600 ? err.status : 502;
      return res.status(upstream).json({
        error: "\u039F AI \u03B2\u03BF\u03B7\u03B8\u03CC\u03C2 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03C1\u03BF\u03C3\u03C9\u03C1\u03B9\u03BD\u03AC \u03BC\u03B7 \u03B4\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03BF\u03C2. \u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03B4\u03BF\u03BA\u03B9\u03BC\u03AC\u03C3\u03C4\u03B5 \u03BE\u03B1\u03BD\u03AC \u03C3\u03B5 \u03BB\u03AF\u03B3\u03BF.",
        detail: err?.message ?? err?.name ?? "unknown"
      });
    }
    try {
      const saved = await storage.createQuestion(req.session.userId, question, aiResult.text, aiResult.citations);
      return res.json({ question: saved });
    } catch (err) {
      console.error("[/api/questions/ask] DB persistence failed; returning answer without saving:", {
        message: err?.message,
        code: err?.code
      });
      return res.json({
        question: {
          id: `ephemeral-${Date.now()}`,
          userId: req.session.userId,
          question,
          answer: aiResult.text,
          citations: aiResult.citations,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
    }
  });
  app2.get("/api/questions/history", requireAuth, async (req, res) => {
    const userQuestions = await storage.getUserQuestions(req.session.userId);
    res.json({ questions: userQuestions });
  });
  app2.get("/api/citations/:key", requireAuth, async (req, res) => {
    const key = decodeURIComponent(String(req.params.key));
    const source = await storage.getLegalSourceByKey(key);
    if (!source) return res.status(404).json({ error: "\u0397 \u03B1\u03BD\u03B1\u03C6\u03BF\u03C1\u03AC \u03B4\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5 \u03C3\u03C4\u03BF \u03BC\u03B7\u03C4\u03C1\u03CE\u03BF" });
    res.json({ source });
  });
  app2.post("/api/usage/increment", requireAuth, async (req, res) => {
    try {
      const canProceed = await checkAndIncrementUsage(req.session.userId, res);
      if (!canProceed) return;
      const user = await storage.getUser(req.session.userId);
      res.json({ ok: true, usesThisMonth: user?.usesThisMonth ?? 0 });
    } catch (err) {
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1" });
    }
  });
  app2.post("/api/uploads/analyze", requireAuth, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF" });
      const canProceed = await checkAndIncrementUsage(req.session.userId, res);
      if (!canProceed) return;
      const { buffer, mimetype, originalname } = req.file;
      const base64Data = buffer.toString("base64");
      let analysis;
      if (mimetype === "application/pdf") {
        analysis = await analyzeBlueprintPDF(base64Data, originalname);
      } else {
        const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!allowedImageTypes.includes(mimetype)) {
          return res.status(400).json({ error: "\u039C\u03B7 \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03B9\u03B6\u03CC\u03BC\u03B5\u03BD\u03BF\u03C2 \u03C4\u03CD\u03C0\u03BF\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5" });
        }
        analysis = await analyzeBlueprintImage(base64Data, mimetype, originalname);
      }
      const saved = await storage.createUpload(req.session.userId, originalname, mimetype, analysis);
      res.json({ upload: saved });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message || "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7\u03BD \u03B1\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5" });
    }
  });
  app2.get("/api/uploads/history", requireAuth, async (req, res) => {
    const userUploads = await storage.getUserUploads(req.session.userId);
    res.json({ uploads: userUploads });
  });
  const checklistSchema = import_zod2.z.object({
    projectType: import_zod2.z.string().min(1),
    location: import_zod2.z.string().min(1),
    area: import_zod2.z.string().min(1),
    floors: import_zod2.z.string().min(1),
    useType: import_zod2.z.string().min(1),
    isNew: import_zod2.z.boolean(),
    hasBasement: import_zod2.z.boolean(),
    nearAntiquities: import_zod2.z.boolean(),
    nearSea: import_zod2.z.boolean(),
    isTraditionalSettlement: import_zod2.z.boolean()
  });
  app2.post("/api/permits/checklist", requireAuth, async (req, res) => {
    try {
      const canProceed = await checkAndIncrementUsage(req.session.userId, res);
      if (!canProceed) return;
      const data = checklistSchema.parse(req.body);
      const checklist = await generatePermitChecklist(data);
      res.json({ checklist });
    } catch (err) {
      if (err instanceof import_zod2.ZodError) return res.status(400).json({ error: err.errors[0].message });
      console.error(err);
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1 \u03BB\u03AF\u03C3\u03C4\u03B1\u03C2" });
    }
  });
  app2.get("/api/projects", requireAuth, async (req, res) => {
    const userProjects = await storage.getUserProjects(req.session.userId);
    res.json({ projects: userProjects });
  });
  app2.post("/api/projects", requireAuth, async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(req.session.userId, data);
      res.json({ project });
    } catch (err) {
      if (err instanceof import_zod2.ZodError) return res.status(400).json({ error: err.errors[0].message });
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1 \u03AD\u03C1\u03B3\u03BF\u03C5" });
    }
  });
  app2.patch("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const id = String(req.params.id);
      const project = await storage.getProject(id, req.session.userId);
      if (!project) return res.status(404).json({ error: "\u03A4\u03BF \u03AD\u03C1\u03B3\u03BF \u03B4\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5" });
      const data = insertProjectSchema.partial().parse(req.body);
      const updated = await storage.updateProject(id, req.session.userId, data);
      res.json({ project: updated });
    } catch (err) {
      if (err instanceof import_zod2.ZodError) return res.status(400).json({ error: err.errors[0].message });
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7\u03BD \u03B5\u03BD\u03B7\u03BC\u03AD\u03C1\u03C9\u03C3\u03B7 \u03AD\u03C1\u03B3\u03BF\u03C5" });
    }
  });
  app2.delete("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const id = String(req.params.id);
      const project = await storage.getProject(id, req.session.userId);
      if (!project) return res.status(404).json({ error: "\u03A4\u03BF \u03AD\u03C1\u03B3\u03BF \u03B4\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5" });
      await storage.deleteProject(id, req.session.userId);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03B4\u03B9\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE \u03AD\u03C1\u03B3\u03BF\u03C5" });
    }
  });
  app2.get("/api/projects/:id/notes", requireAuth, async (req, res) => {
    const id = String(req.params.id);
    const project = await storage.getProject(id, req.session.userId);
    if (!project) return res.status(404).json({ error: "\u03A4\u03BF \u03AD\u03C1\u03B3\u03BF \u03B4\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5" });
    const notes = await storage.getProjectNotes(id, req.session.userId);
    res.json({ notes });
  });
  app2.post("/api/projects/:id/notes", requireAuth, async (req, res) => {
    try {
      const id = String(req.params.id);
      const project = await storage.getProject(id, req.session.userId);
      if (!project) return res.status(404).json({ error: "\u03A4\u03BF \u03AD\u03C1\u03B3\u03BF \u03B4\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5" });
      const { content } = insertProjectNoteSchema.parse(req.body);
      const note = await storage.addProjectNote(id, req.session.userId, content);
      res.json({ note });
    } catch (err) {
      if (err instanceof import_zod2.ZodError) return res.status(400).json({ error: err.errors[0].message });
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7\u03BD \u03C0\u03C1\u03BF\u03C3\u03B8\u03AE\u03BA\u03B7 \u03C3\u03B7\u03BC\u03B5\u03AF\u03C9\u03C3\u03B7\u03C2" });
    }
  });
  app2.delete("/api/projects/:id/notes/:noteId", requireAuth, async (req, res) => {
    try {
      await storage.deleteProjectNote(String(req.params.noteId), req.session.userId);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03B4\u03B9\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE \u03C3\u03B7\u03BC\u03B5\u03AF\u03C9\u03C3\u03B7\u03C2" });
    }
  });
  app2.post("/api/reports/generate", requireAuth, async (req, res) => {
    try {
      const canProceed = await checkAndIncrementUsage(req.session.userId, res);
      if (!canProceed) return;
      const schema = import_zod2.z.object({
        reportType: import_zod2.z.string().min(1),
        address: import_zod2.z.string().min(1),
        area: import_zod2.z.string().min(1),
        floors: import_zod2.z.string().min(1),
        constructionYear: import_zod2.z.string().min(1),
        ownerName: import_zod2.z.string().min(1),
        engineerName: import_zod2.z.string().min(1),
        engineerSpecialty: import_zod2.z.string().min(1),
        teeNumber: import_zod2.z.string().min(1),
        specialNotes: import_zod2.z.string().default(""),
        reportDate: import_zod2.z.string().min(1)
      });
      const params = schema.parse(req.body);
      const report = await generateTechnicalReport(params);
      res.json({ report });
    } catch (err) {
      if (err instanceof import_zod2.ZodError) return res.status(400).json({ error: err.errors[0].message });
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1 \u03C4\u03B7\u03C2 \u03AD\u03BA\u03B8\u03B5\u03C3\u03B7\u03C2" });
    }
  });
  async function requireAdmin(req, res, next) {
    if (!req.session.userId) return res.status(401).json({ error: "\u0394\u03B5\u03BD \u03B5\u03AF\u03C3\u03C4\u03B5 \u03C3\u03C5\u03BD\u03B4\u03B5\u03B4\u03B5\u03BC\u03AD\u03BD\u03BF\u03B9" });
    const user = await storage.getUser(req.session.userId);
    if (!user || user.role !== "admin") return res.status(403).json({ error: "\u0394\u03B5\u03BD \u03AD\u03C7\u03B5\u03C4\u03B5 \u03B4\u03B9\u03BA\u03B1\u03AF\u03C9\u03BC\u03B1 \u03C0\u03C1\u03CC\u03C3\u03B2\u03B1\u03C3\u03B7\u03C2" });
    next();
  }
  app2.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03C6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7 \u03C3\u03C4\u03B1\u03C4\u03B9\u03C3\u03C4\u03B9\u03BA\u03CE\u03BD" });
    }
  });
  app2.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      const safeUsers = allUsers.map(({ password: _, ...u }) => u);
      res.json({ users: safeUsers });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03C6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7 \u03C7\u03C1\u03B7\u03C3\u03C4\u03CE\u03BD" });
    }
  });
  app2.patch("/api/admin/users/:id/plan", requireAdmin, async (req, res) => {
    try {
      const { plan } = req.body;
      const userId = String(req.params.id);
      const updated = await storage.updateUserPlan(userId, plan);
      const { password: _, ...safeUser } = updated;
      res.json({ user: safeUser });
    } catch (err) {
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7\u03BD \u03B1\u03BB\u03BB\u03B1\u03B3\u03AE \u03C0\u03BB\u03AC\u03BD\u03BF\u03C5" });
    }
  });
  app2.delete("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const userId = String(req.params.id);
      await storage.deleteUser(userId);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03B4\u03B9\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE \u03C7\u03C1\u03AE\u03C3\u03C4\u03B7" });
    }
  });
  app2.get("/api/admin/users/:id/questions", requireAdmin, async (req, res) => {
    try {
      const userId = String(req.params.id);
      const questions2 = await storage.getUserQuestions(userId);
      res.json({ questions: questions2 });
    } catch (err) {
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03C6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7 \u03B9\u03C3\u03C4\u03BF\u03C1\u03B9\u03BA\u03BF\u03CD" });
    }
  });
  app2.get("/api/admin/payments", requireAdmin, async (req, res) => {
    try {
      const payments2 = await storage.getAllPayments();
      res.json({ payments: payments2 });
    } catch (err) {
      res.status(500).json({ error: "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03C6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7 \u03C0\u03BB\u03B7\u03C1\u03C9\u03BC\u03CE\u03BD" });
    }
  });
  app2.post("/api/subscription/create-checkout", requireAuth, async (req, res) => {
    try {
      const { plan } = req.body;
      const user = await storage.getUser(req.session.userId);
      if (!user) return res.status(401).json({ error: "\u03A7\u03C1\u03AE\u03C3\u03C4\u03B7\u03C2 \u03B4\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5" });
      const session3 = await createCheckoutSession(user.id, user.email, plan);
      res.json({ url: session3.url });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app2.post("/api/subscription/cancel", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user?.stripeSubscriptionId) return res.status(400).json({ error: "\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5 \u03B5\u03BD\u03B5\u03C1\u03B3\u03AE \u03C3\u03C5\u03BD\u03B4\u03C1\u03BF\u03BC\u03AE" });
      await cancelSubscription(user.stripeSubscriptionId);
      await storage.updateUserPlan(user.id, "free");
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app2.post("/api/webhooks/stripe", async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      const rawBody = req.rawBody;
      event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === "checkout.session.completed") {
      const session3 = event.data.object;
      const userId = session3.client_reference_id;
      const plan = session3.metadata.plan;
      const customerId = session3.customer;
      const subscriptionId = session3.subscription;
      const amount = session3.amount_total;
      if (userId && plan) {
        let subscriptionEndDate;
        if (subscriptionId) {
          try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            subscriptionEndDate = new Date(subscription.current_period_end * 1e3);
          } catch (e) {
            console.error("Failed to retrieve subscription details:", e);
          }
        }
        await storage.updateUserSubscription(userId, customerId, subscriptionId, plan, subscriptionEndDate);
        await storage.createPayment({
          userId,
          stripePaymentId: session3.payment_intent || session3.id,
          plan,
          amount: amount || 0,
          status: "completed"
        });
        const user = await storage.getUser(userId);
        if (user) {
          sendEmail({
            to: user.email,
            ...emailTemplates.upgradeSuccess(plan)
          }).catch(console.error);
        }
      }
    }
    res.json({ received: true });
  });
  app2.post("/api/system/check-reminders", async (req, res) => {
    const allProjects = await storage.getAllProjects();
    const now = /* @__PURE__ */ new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1e3);
    for (const project of allProjects) {
      if (project.deadline) {
        const deadline = new Date(project.deadline);
        if (deadline > now && deadline <= threeDaysFromNow) {
          const user = await storage.getUser(project.userId);
          if (user) {
            sendEmail({
              to: user.email,
              ...emailTemplates.deadlineReminder(project.name, 3)
            }).catch(console.error);
          }
        }
      }
    }
    res.json({ ok: true });
  });
  return httpServer2;
}

// server/vercel.ts
var import_http = require("http");
var app = (0, import_express.default)();
app.set("trust proxy", 1);
var httpServer = (0, import_http.createServer)(app);
app.use(
  import_express.default.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(import_express.default.urlencoded({ extended: false }));
var ready = registerRoutes(httpServer, app).then(() => {
  app.use((err, _req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    if (res.headersSent) return next(err);
    return res.status(status).json({ message });
  });
});
async function handler(req, res) {
  await ready;
  return app(req, res);
}
