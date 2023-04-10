import mongoose from "mongoose";

const schema = mongoose.Schema;

const universitySchema = new schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },

    isDeleted: { type: Number, default: 0 },
    status: { type: Number, default: 1 },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
universitySchema.index({ name: 1 })



export const university = mongoose.model("universities", universitySchema);
