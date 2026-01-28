import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../utils/apiResponse";
import { AppError } from "../../errors/AppError";
import { auditLogPresenter } from "./auditLog.presenter";

export const addAllowedIdentity = asyncHandler(
    async (req: Request, res: Response) => {
        const { identifier, role } = req.body;
        const { userId, role: adminRole } = req.user!;

        const identity = await AdminService.addAllowedIdentity(
            identifier.toLowerCase(),
            role,
            userId,
            adminRole
        );

        return sendResponse(res, {
            statusCode: 201,
            message: "Identity added successfully",
            data: identity,
        });
    }
);

export const listAllowedIdentities = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId, role } = req.user!;

        const identities = await AdminService.listAllowedIdentities(
            userId,
            role
        );

        return sendResponse(res, {
            message: "Allowed identities fetched",
            data: identities,
        });
    }
);
export const toggleAllowedIdentity = asyncHandler(
    async (req: Request, res: Response) => {
        const rawId = req.params.id;

        if (Array.isArray(rawId)) {
            throw new AppError("Invalid identity id", 400);
        }

        const id = rawId;
        const { userId, role } = req.user!;

        const identity = await AdminService.toggleAllowedIdentity(
            id,
            userId,
            role
        );

        return sendResponse(res, {
            message: "Identity status updated",
            data: identity,
        });
    }
);

export const listAuditLogs = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await AdminService.listAuditLogs(
            {
                page: Number(req.query.page),
                limit: Number(req.query.limit),
                action: req.query.action as string,
                actorId: req.query.actorId as string,
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
            },
            {
                id: req.user!.userId,
                role: req.user!.role,
            }
        );

        return sendResponse(res, {
            statusCode: 200,
            message: "Audit logs fetched",
            data: {
            logs: result.logs.map(auditLogPresenter),
            pagination: result.pagination,
            }
        });
    }
);

