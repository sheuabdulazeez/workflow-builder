import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTasks = query({
  args: { ownerId: v.string() },
  handler: async (ctx, { ownerId }) => {
    const tasks = await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("ownerId"), ownerId))
      .collect();
    return tasks;
  },
});

export const addTask = mutation({
  args: {
    title: v.string(),
    status: v.string(),
    priority: v.string(),
    ownerId: v.string(),
  },
  async handler(ctx, { title, status, ownerId, priority }) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Not authenticated");
    const task = await ctx.db.insert("tasks", {
      title,
      status,
      ownerId,
      priority,
    });
    return task;
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id("tasks")
  },
  async handler(ctx, { id }) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Not authenticated");
    const deletedTask = await ctx.db.delete(id)
    return deletedTask
  },
});