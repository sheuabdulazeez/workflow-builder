import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    ownerId: v.string(),
    title: v.string(),
    status: v.string(),
    priority: v.string()
  }),
  clients: defineTable({
    ownerId: v.string(),
    name: v.string(),
    email: v.string(),
    type: v.string(),
    status: v.string()
  }),
  workflows: defineTable({
    ownerId: v.string(),
    title: v.string(),
    active: v.boolean(),
  })
});