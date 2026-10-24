import type { ClientMessage } from "./messageTypes";

export function validateClientMessage(
    value: unknown
): ClientMessage | null {
    if (
        typeof value !== "object" ||
        value === null ||
        !("type" in value) ||
        typeof value.type !== "string"
    ) {
        return null;
    }

    if (value.type === "PING") {
        return { type: "PING" };
    }

    if (
        value.type === "SEND_REPLY" &&
        "queryId" in value &&
        typeof value.queryId === "string" &&
        value.queryId.trim() !== "" &&
        "content" in value &&
        typeof value.content === "string" &&
        value.content.trim() !== "" &&
        "clientMessageId" in value &&
        typeof value.clientMessageId === "string" &&
        value.clientMessageId.trim() !== ""
    ) {
        return {
            type: "SEND_REPLY",
            queryId: value.queryId,
            content: value.content,
            clientMessageId: value.clientMessageId,
        };
    }

    return null;
}