import mongoose from "mongoose";
const date = new Date();
const currentYear = date.getFullYear();
let batch = `${currentYear - 1}-${currentYear.toString().substring(2, 4)}`;
const schema = mongoose.Schema;

const studentSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    roll_no: {
      type: String,
      required: true,
    },
    father_name: {
      type: String,
      default: "",
    },
    qualification: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      default: "",
    },
    cv: {
      type: String,
      default: "",
    },
    batch: {
      type: String,
      default: batch,
    },
    // is_walkin_user: {
    //   type: Number,
    //   default: 0,
    // },
    // job_profile: {
    //   type: String,
    //   default: "",
    // },
    // experience: {
    //   type: Number,
    //   default: 0,
    // },
    email: {
      type: String,
      match: /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    }, // 0-inactive,1-active
    // password: {
    //   type: String,
    // },
    phone_no: {
      type: String,
      default: "",
      required: true,
    },
    // profile_pic: {
    //   type: String,
    //   default: "",
    // },
    // latest_token: {
    //   type: String,
    // },
    dob: {
      type: String,
      required: true,
    },
    temp_email: {
      type: String,
    },
    //    test_status: {type: Number, default: 0}, //user not allowed to login when test begin
    otp_code: {
      type: String,
      default: "",
    },
    otp_expiry: Date, // otp expiry is 30 min
    institute_id: {
      type: mongoose.Types.ObjectId,
      ref: "institutes",
    },
   
    push_notification: { type: Number, default: 1 },
    cgpa: { type: String, default: "" },
    device_token: {
      type: String,
      default: "",
    },
    organisation_id: {
      type: mongoose.Types.ObjectId,
      ref: "organisations",
    },
    is_email_verified: {
      type: Number,
      default: 0,
    },
    is_deleted: {
      type: Number,
      default: 0,
    }, //1-deleted by user
    last_login: {
      type: Number,
    },
    device_type: {
      type: Number,
    }, //1- android , 2-IOS,
    device_id: {
      type: String,
      default: "",
    },
    app_version: {
      type: String,
    },
    // theme: {
    //   type: Number,
    //   default: 1,
    // },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

studentSchema.index({ email: 1 });

export const students = mongoose.model("student", studentSchema);
