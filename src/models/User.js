import mongoose from 'mongoose';

const { Schema } = mongoose;

const TierLevel = {
  HighS: 1,
  MidS: 2,
  LowS: 3,
  HighA: 4,
  MidA: 5,
  LowA: 6,
  HighB: 7,
  MidB: 8,
  LowB: 9,
  HighC: 10,
  MidC: 11,
  LowC: 12,
  HighD: 13,
  MidD: 14,
  LowD: 15,
};

const userSchema = new Schema(
  {
    discord: { type: String, required: true, unique: true },
    ign: { type: String, required: false },
    tiers: {
      type: Map,
      of: Number,
      enum: Object.values(TierLevel),
      required: true,
      default: {},
    },
  },
  {
    // Note: 'indexes' is not a valid option here, use schema.index() instead
  }
);

// Define indexes separately
userSchema.index({ "tiers.pvp": 1 });
userSchema.index({ "tiers.bedwars": 1 });
userSchema.index({ "tiers.skywars": 1 });
userSchema.index({ "tiers.duels": 1 });
userSchema.index({ "tiers.survival": 1 });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
