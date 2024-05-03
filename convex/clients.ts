import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getClients = query({
  args: { ownerId: v.string() },
  handler: async (ctx, { ownerId }) => {
    const clients = await ctx.db
      .query("clients")
      .filter((q) => q.eq(q.field("ownerId"), ownerId))
      .collect();
    return clients;
  },
});

export const addClient = mutation({
  args: {
    name: v.string(),
    status: v.string(),
    type: v.string(),
    email: v.string(),
    ownerId: v.string(),
  },
  async handler(ctx, { name, email, status, type, ownerId }) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Not authenticated");

    const client = await ctx.db.insert("clients", {
      name,
      email,
      status,
      type,
      ownerId,
    });
    return client;
  },
});

export const deleteClient = mutation({
  args: {
    id: v.id("clients")
  },
  async handler(ctx, { id }) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Not authenticated");
    const deletedClient = await ctx.db.delete(id)
    return deletedClient
  },
});