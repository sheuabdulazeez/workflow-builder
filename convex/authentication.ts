import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAuthenticationsByNode = query({
  args: { ownerId: v.string(), node: v.string() },
  handler: async (ctx, { ownerId, node}) => {
    const authentications = await ctx.db
      .query("authentications")
      .filter((q) => q.eq(q.field("ownerId"), ownerId))
      .filter((q) => q.eq(q.field("node"), node))
      .collect();
    return authentications;
  },
});