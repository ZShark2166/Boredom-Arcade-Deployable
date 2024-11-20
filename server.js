import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import { createBareServer } from "@nebula-services/bare-server-node";
import express from "express";

const bareServer = createBareServer("/bare/");
const app = express();
const PORT = 8080;

const __dirname = process.cwd();
const staticPath = path.join(__dirname, "build");
app.use(express.static(staticPath));

app.get("*", (req, res) => {
    const indexFile = path.join(staticPath, "index.html");
    fs.readFile(indexFile, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading index.html:", err);
            res.status(500).send("Error loading the website");
        } else {
            res.type("html").send(data);
        }
    });
});

const server = http.createServer((req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

server.on("upgrade", (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

server.listen(PORT, () => {
    console.log(`🌐 Website running on http://localhost:${PORT}`);
    console.log(`🌐 Bare server available on http://localhost:${PORT}/bare/`);
});
