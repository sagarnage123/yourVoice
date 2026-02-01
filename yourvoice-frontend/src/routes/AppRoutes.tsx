import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppShell } from "@/components/layout/AppShell";
import { RequestOtp } from "@/pages/auth/RequestOtp";
import { VerifyOtp } from "@/pages/auth/VerifyOtp";
import { StudentConversation } from "@/pages/student/StudentConversation";
import { StudentInbox } from "@/pages/student/StudentInbox";
import { StaffInbox } from "@/pages/staff/StaffInbox";
import { StaffConversation } from "@/pages/staff/StaffConversation";
import StaffSelectionPage from "@/pages/student/StaffSelectionPage";
import CreateQueryPage from "@/pages/student/CreateQueryPage";
import { AllowedIdentitiesPage } from "@/pages/admin/AllowedIdentitiesPage";
import { AllAllowedIdentitiesPage } from "@/pages/admin/AllAllowedIdentitiesPage";
import { PublicQueries } from "@/pages/student/PublicQueries";
import { FlaggedQueriesPage } from "@/pages/admin/FlaggedQueriesPage";
import { FlaggedQueryDetails } from "@/pages/admin/FlaggedQueryDetails";
import { PublicQueriesStaff } from "@/pages/staff/PublicQueriesStaff";
import { CreatePublicQuery } from "@/pages/student/CreatePublicQuery";
import { AuthLayout } from "@/components/layout/AuthLayout";
import  AdminAuditLogsPage  from "@/pages/admin/AdminAuditLogsPage";

export function AppRoutes() {
    return (
        <Routes>
           
            <Route path="/auth" element={<AuthLayout />}>
                <Route index element={<RequestOtp />} />
                <Route path="verify" element={<VerifyOtp />} />
            </Route>


           
            <Route
                path="/student"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <AppShell>
                            <PublicQueries/>
                        </AppShell>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/student/new"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <AppShell>
                            <CreatePublicQuery />
                        </AppShell>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/student/new-query"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <AppShell>
                            <StaffSelectionPage />
                        </AppShell>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/student/new-query/:staffId"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <AppShell>
                            <CreateQueryPage />
                        </AppShell>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/student/inbox"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <AppShell>
                            <StudentInbox />
                        </AppShell>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/inbox/:queryId"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <AppShell>
                            <StudentConversation />
                        </AppShell>
                    </ProtectedRoute>
                }
            />


            <Route
                path="/staff"
                element={
                    <ProtectedRoute allowedRoles={["teacher", "counselor"]}>
                        <AppShell>
                            <PublicQueriesStaff />
                        </AppShell>
                    </ProtectedRoute>
                }
            />
            
            <Route
                path="/staff/inbox"
                element={
                    <ProtectedRoute allowedRoles={["teacher", "counselor"]}>
                        <AppShell>
                            <StaffInbox />
                        </AppShell>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/staff/inbox/:queryId"
                element={
                    <ProtectedRoute allowedRoles={["teacher", "counselor"]}>
                        <AppShell>
                            <StaffConversation />
                        </AppShell>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AppShell>
                        <AllowedIdentitiesPage />
                        </AppShell>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/audit-logs"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AppShell>
                            <AdminAuditLogsPage />
                        </AppShell>
                    </ProtectedRoute>
                }
            />
            
            <Route
                path="/admin/allowed-identities/all"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AppShell>
                        <AllAllowedIdentitiesPage />
                        </AppShell>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/flagged-queries"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AppShell>
                        <FlaggedQueriesPage />
                        </AppShell>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/flagged-queries/:queryId"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AppShell>
                        <FlaggedQueryDetails />
                        </AppShell>
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}
