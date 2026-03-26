import { AllowedIdentity } from "./allowedIdentity.model";
import { AuditLog } from "./auditLog.model";
import { AppError } from "../../errors/AppError";
import { AuditLog as AuditLogModel } from "./auditLog.model";
interface ListAuditLogsParams {
    page?: number;
    limit?: number;
    action?: string;
    actorId?: string;
    startDate?: string;
    endDate?: string;
}

export class AdminService {
    static async addAllowedIdentity(
        identifier: string,
        role: "student" | "Academician" | "counsellor" | "admin",
        adminId: string,
        adminRole: string,
        fullName:string | undefined,
        areaOfExpertise?: string[],
        about?: string
    ) {
       
        const existing = await AllowedIdentity.findOne({
            identifier,
            role,
        });

        if (existing) {
            
            throw new AppError("Identity already exists", 409);
        }
        
        const identity = await AllowedIdentity.create({
            identifier,
            role,
            fullName,
            areaOfExpertise: areaOfExpertise ?? [],
            about: about ?? "",
            addedBy: adminId,
        });

       
        await AuditLog.create({
            actorId: adminId,
            actorRole: adminRole,
            action: "ADD_ALLOWED_IDENTITY",
            targetType: "AllowedIdentity",
            targetId: identity._id.toString(),
            metadata: {
                identifier,
                role,
            },
        });

        return identity;
    }
    static async updateAllowedIdentityProfile(
        identityId: string,
        adminId: string,
        fullName?: string,
        adminRole?: string,
        areaOfExpertise?: string[],
        about?: string
    ) {
        
        const identity = await AllowedIdentity.findById(identityId);

        if (!identity) {
            throw new AppError("Allowed identity not found", 404);
        }       
        if (areaOfExpertise) {
            identity.areaOfExpertise = areaOfExpertise;
        }
        if (about) {
            identity.about = about;
        }
        if (areaOfExpertise && areaOfExpertise.length > 10) {
            throw new AppError("Too many expertise areas", 400);
        }

        if (about && about.length > 500) {
            throw new AppError("About section too long", 400);
        }
        await identity.save();
       
        await AuditLog.create({
            actorId: adminId,
            action: "UPDATE_ALLOWED_IDENTITY_PROFILE",
            actorRole: adminRole,
            targetType: "AllowedIdentity",
            targetId: identity._id.toString(),
            metadata: {
                identifier: identity.identifier,
                role: identity.role,
                updatedFields: {
                    areaOfExpertise,
                    about,
                },
            },
        }); 

        return identity;
    }

    static async listAllowedIdentities(
        adminId: string,
        adminRole: string
    ) {
        
        await AuditLog.create({
            actorId: adminId,
            actorRole: adminRole,
            action: "VIEW_ALLOWED_IDENTITIES",
            targetType: "AllowedIdentity",
        });

        return AllowedIdentity.find({
            role: { $in: ["admin", "Academician", "counsellor"] },
        }).sort({ createdAt: -1 });

    }

    static async toggleAllowedIdentity(
        id: string,
        adminId: string,
        adminRole: string
    ) {
        const identity = await AllowedIdentity.findById(id);

        if (!identity) {
            throw new AppError("Allowed identity not found", 404);
        }

        identity.isActive = !identity.isActive;
        await identity.save();

       
        await AuditLog.create({
            actorId: adminId,
            actorRole: adminRole,
            action: "TOGGLE_ALLOWED_IDENTITY",
            targetType: "AllowedIdentity",
            targetId: identity._id.toString(),
            metadata: {
                identifier: identity.identifier,
                role: identity.role,
                newStatus: identity.isActive,
            },
        });

        return identity;
    }


      static  async listAuditLogs(
            params: ListAuditLogsParams,
            actor: { id: string; role: string }
        ) {
            const {
                page = 1,
                limit = 20,
                action,
                actorId,
                startDate,
                endDate,
            } = params;

            const query: Record<string, any> = {};

            if (action) query.action = action;
            if (actorId) query.actorId = actorId;

            if (startDate || endDate) {
                query.createdAt = {};
                if (startDate) query.createdAt.$gte = new Date(startDate);
                if (endDate) query.createdAt.$lte = new Date(endDate);
            }

            const skip = (page - 1) * limit;

            const [logs, total] = await Promise.all([
                AuditLogModel.find(query)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                AuditLogModel.countDocuments(query),
            ]);

            await AuditLogModel.create({
                actorId: actor.id,
                actorRole: actor.role,
                action: "VIEW_AUDIT_LOGS",
                targetType: "AUDIT_LOG",
                metadata: {
                    filters: params,
                },
            });

            return {
                logs,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            };
        }
    };

