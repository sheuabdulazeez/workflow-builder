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
    nodes: v.array(v.object({
      id: v.string(),
      type: v.string(),
      position: v.object({ x: v.number(), y: v.number() }),
      data: v.object({
        label: v.string(),
        description: v.string(),
        api: v.string(),
        event: v.string(),
        authenticationid: v.string(),
        params: v.any()
      })
    })),
    connections: v.array(v.object({
      id: v.string(),
      source: v.string(),
      target: v.string()
    }))
  })
});