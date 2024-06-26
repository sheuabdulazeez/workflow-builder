import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {v4} from "uuid"
import schema from "./schema";

export const getWorkflows = query({
  args: { ownerId: v.string() },
  handler: async (ctx, { ownerId }) => {
    const workflows = await ctx.db
      .query("workflows")
      .filter((q) => q.eq(q.field("ownerId"), ownerId))
      .collect();
    return workflows;
  },
});


export const getWorkflow = query({
  args: { ownerId: v.string(), id: v.id("workflows") },
  handler: async (ctx, { ownerId, id }) => {
    const workflow = await ctx.db.get(id);
    if(!workflow) throw new Error("Workflow not found");
    return workflow;
  },
});


export const addWorkflow = mutation({
  args: {
    title: v.string(),
    ownerId: v.string(),
  },
  async handler(ctx, { title, ownerId }) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Not authenticated");
    const workflow = await ctx.db.insert("workflows", {
      title,
      active: false,
      ownerId,
      nodes: [
        {
          id: `node-${v4()}`,
          position: { x: 0, y: 0 },
          data: {
            label: "Trigger",
          },
          type: "trigger",
        }
      ]
    });
    return workflow;
  },
});

export const updateWorkflow = mutation({
  args: {
    id: v.id("workflows"),
    title: v.string(),
    nodes: v.array(v.any()),
    connections: v.array(v.any()),
    active: v.boolean()
  },
  async handler(ctx, { id, title, nodes, connections, active }) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Not authenticated");
    const workflow = await ctx.db.patch(id, {nodes, connections, title, active})
    return workflow;
  },
});

export const deleteWorkflow = mutation({
  args: {
    id: v.id("workflows")
  },
  async handler(ctx, { id }) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Not authenticated");
    const deletedFlow = await ctx.db.delete(id)
    return deletedFlow
  },
});