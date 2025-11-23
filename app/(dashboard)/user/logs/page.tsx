import {DataTable} from "@/components/ui/data-table";
import {columns, LogAction, LogRow, LogStatus} from "./_components/logs.column";

export function getMockLogs(): LogRow[] {
    const actions: LogAction[] = ["CREATE", "UPDATE", "DELETE", "LOGIN", "LOGOUT", "VIEW", "ACCESS", "FAILED_LOGIN"];

    const statuses: LogStatus[] = ["SUCCESS", "FAILED"];
    const modules = ["Auth", "Student", "Teacher", "School", "User"];
    const entities = ["student", "teacher", "school", "user"];
    const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
    const userAgents = [
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Mozilla/5.0 (Linux; Android 13)",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)",
    ];

    const out: LogRow[] = [];
    for (let i = 1; i <= 100; i++) {
        const action = actions[Math.floor(Math.random() * actions.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const moduleName = modules[Math.floor(Math.random() * modules.length)];
        const entity = entities[Math.floor(Math.random() * entities.length)];
        const method = methods[Math.floor(Math.random() * methods.length)];
        const ip_address = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        const user_agent = userAgents[Math.floor(Math.random() * userAgents.length)];
        const user_id = Math.random() > 0.1 ? `USR-${String(i % 50).padStart(4, "0")}` : null;
        const entity_id = Math.random() > 0.3 ? `${entity?.toUpperCase()}-${1000 + i}` : null;
        const performed_by = user_id ? `User ${i % 50}` : null;
        const created_at = new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 90)).toISOString();

        out.push({
            id: `LOG-${String(i).padStart(5, "0")}`,
            user_id,
            action,
            entity,
            entity_id,
            module: moduleName,
            description: `${performed_by ?? "System"} performed ${action} on ${entity ?? "system"}`,
            old_data: action === "UPDATE" ? {name: "Old Name", status: "inactive"} : null,
            new_data: action === "UPDATE" ? {name: "New Name", status: "active"} : null,
            method,
            endpoint: `/api/v1/${entity ?? "system"}`,
            ip_address,
            user_agent,
            status,
            performed_by,
            created_at,
        });
    }

    return out;
}

export default async function LogsPage() {
    const data = getMockLogs();

    return (
        <main className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Daftar Logs</h1>
            </div>
            <DataTable columns={columns} data={data} searchableColumn="action" pageSize={10} />
        </main>
    );
}
