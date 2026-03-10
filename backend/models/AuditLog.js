import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      // required: true
    },
    action: {
      type: String,
      // required: true
    },
    entity: {
      type: String,
      // required: true
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true
    },
    metadata: {
      type: Object,
    },
  },
  { timestamps: true }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);
