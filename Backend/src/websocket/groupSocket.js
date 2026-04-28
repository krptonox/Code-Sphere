import { WebSocketServer } from "ws";

let groupWss;

const toJson = (data) => {
    try {
        return JSON.stringify(data);
    } catch {
        return "";
    }
};

const initGroupSocket = (server) => {
    groupWss = new WebSocketServer({ server, path: "/ws/groups" });

    groupWss.on("connection", (ws, req) => {
        const requestUrl = new URL(req.url, "http://localhost");
        ws.groupId = requestUrl.searchParams.get("groupId") || "";

        ws.send(toJson({ type: "connected", groupId: ws.groupId }));
    });
};

const broadcastGroupMessage = (payload) => {
    if (!groupWss) {
        return;
    }

    const message = toJson({ type: "group_message", payload });
    if (!message) {
        return;
    }

    groupWss.clients.forEach((client) => {
        if (client.readyState !== 1) {
            return;
        }

        if (String(client.groupId) !== String(payload.group_id)) {
            return;
        }

        client.send(message);
    });
};

export { initGroupSocket, broadcastGroupMessage };
