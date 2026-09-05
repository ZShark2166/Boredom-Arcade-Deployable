import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import { createBareServer } from "@nebula-services/bare-server-node";
import express from "express";
const bareServer = createBareServer("/bare/");
const app = express();
const PORT = 8080;
const __dirname = process.cwd();
const staticPath = path.join(__dirname, "dist");
app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const time = Date.now() - start;

        const ip =
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            "unknown";

        console.log(
            `[${new Date().toLocaleTimeString()}] ` +
            `${req.method} ${req.url} | ` +
            `${res.statusCode} | ` +
            `${time}ms | ` +
            `${ip} | ` +
            `${req.headers["user-agent"] || "Unknown"}`
        );
    });

    next();
});

app.get("/", (req, res, next) => {
    const userAgent = req.get("user-agent") || "";
    const isBrowser =
        /mozilla|chrome|safari|firefox|edg\//i.test(userAgent) &&
        !/curl|wget|bot|crawler|spider/i.test(userAgent);
    const entryFile = path.join(staticPath, isBrowser ? "index.html" : "education.html");

    res.sendFile(entryFile, (err) => {
        if (err) {
            next(err);
        }
    });
});

app.use(express.static(staticPath));
// Block obvious scanner / exploit paths before SPA fallback
app.use((req, res, next) => {
    const url = req.path.toLowerCase();

    const blockedPatterns = [
        "/.env",
        ".env/",
        ".env.",
        "phpinfo",
        "php-info",
        "wp-admin",
        "wp-login",
        "wp-json",
        "xmlrpc.php",
        "phpmyadmin",
        "/cgi-bin/",
        "/vendor/",
        "/.git/",
        "/debug.php",
        "/config.php",
        "/composer.json",
        "/composer.lock",
        "/webroot/",
        "/public_html/",
        "/staging/",
        "/internal/",
        "/gateway/",
    ];

    if (blockedPatterns.some(pattern => url.includes(pattern))) {
        return res.status(404).send("Not Found");
    }

    next();
});
app.get("*", (req, res) => {
    const notFoundFile = path.join(staticPath, "404.html");

    res.status(404).sendFile(notFoundFile, (err) => {
        if (err) {
            console.error("Error loading 404.html:", err);
            res.status(404).send("404 - Page Not Found");
        }
    });
});

const server = http.createServer((req, res) => {
    if (bareServer.shouldRoute(req)) {
        console.log(`🛰️ Bare Request -> ${req.method} ${req.url}`);
        bareServer.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

server.on("upgrade", (req, socket, head) => {
    console.log(
        `WebSocket Upgrade -> ${req.url} (${req.socket.remoteAddress})`
    );

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
