import mongoose from "mongoose";
const schema = mongoose.Schema;
const date = new Date();

const currentYear = date.getFullYear();
let batch = `${currentYear - 1}-${currentYear.toString().substring(2, 4)}`;
const institutesSchema = new schema(
  {
    university: { type: schema.Types.ObjectId, ref: "universities" },
    institute: { type: String, required: true },
    tpo_name: { type: String, required: true },
    tpo_email: { type: String, required: true },
    tpo_phone_number: { type: String, required: true },
    qualification: [{ type: String, default: "" }],
    status: { type: Number, default: 1 },
    isDeleted: { type: Number, default: 0 },
    batch: { type: String, default: batch }, // to save the current year in the institute.
    studentCount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
institutesSchema.index({ institute: 1 });

const organisationSchema = new schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    is_deleted: {
      type: Number,
      default: 0,
    }, //1-deleted
    status: {
      type: Number,
      default: 1,
    }, //1 for active,0 for disable
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
export const organisation = mongoose.model("organisation", organisationSchema);
export const institute = mongoose.model("institute", institutesSchema);
