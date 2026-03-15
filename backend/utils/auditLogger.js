import { AuditLog } from "../models/AuditLog.js";

// =============> logAction function for keeping a traceable history of actions <=============
export const logAction = async ({
  userId,
  role,
  action,
  entity,
  entityId,
  metadata = {},
}) => {
  await AuditLog.create({
    userId,
    role,
    action,
    entity,
    entityId,
    metadata,
  });
};
