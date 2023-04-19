import mongoose from "mongoose";
const schema = mongoose.Schema;
const date = new Date();
const currentYear = date.getFullYear();
const tpoSchema = new schema(
  {
    tpo_name: { type: String, required: true },
    batch: { type: String, default: currentYear }, // to save the currrent year in the tpo's.
    tpo_email: { type: String, required: true },
    tpo_phone_number: { type: String, required: true },
    institute_id: {
      type: mongoose.Types.ObjectId,
      ref: "institutes",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
); 
export const tpo = mongoose.model("tpos", tpoSchema);
