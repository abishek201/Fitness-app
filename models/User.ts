import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  goal: { type: String, default: '' },
  age: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  activity: { type: String, default: '' },
  hasDisease: { type: String, default: 'no' },
  diseases: { type: [String], default: [] },
  allergens: { type: [String], default: [] },
  caloriesTarget: { type: Number, default: 0 },
  proteinTarget: { type: Number, default: 0 },
  carbsTarget: { type: Number, default: 0 },
  fatsTarget: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);