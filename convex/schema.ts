import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    ownerId: v.string(),
    title: v.string(),
    status: v.string(),
    priority: v.string(),
  }),
  clients: defineTable({
    ownerId: v.string(),
    name: v.string(),
    email: v.string(),
    type: v.string(),
    status: v.string(),
  }),
  authentications: defineTable({
    token: v.any(),
    expired: v.boolean(),
    node: v.string(),
    name: v.string(),
    accountName: v.string(),
    ownerId: v.string(),
  }),
  workflows: defineTable({
    ownerId: v.string(),
    title: v.string(),
    active: v.boolean(),
    nodes: v.optional(v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        position: v.object({ x: v.number(), y: v.number() }),
        height: v.optional(v.number()),
        width: v.optional(v.number()),
        data: v.object({
          label: v.string(),
          description: v.optional(v.string()),
          api: v.optional(v.string()),
          event: v.optional(v.string()),
          authenticationId: v.optional(v.union(v.string(), v.null())),
          params: v.optional(v.any()),
        }),
      })
    )),
    connections: v.optional(
      v.array(
        v.object({
          id: v.string(),
          source: v.string(),
          target: v.string(),
        })
      )
    ),
  }),
});
