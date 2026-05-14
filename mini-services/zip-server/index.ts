import { createServer } from "http";
import { createReadStream, statSync } from "fs";
import path from "path";

const PORT = 3031;
const ZIP_PATH = path.join("/home/z", "my-project.zip");

const server = createServer((req, res) => {
  if (req.url === "/api/download") {
    try {
      const stat = statSync(ZIP_PATH);
      res.writeHead(200, {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="edge-connect-project.zip"',
        "Content-Length": stat.size.toString(),
        "Access-Control-Allow-Origin": "*",
      });
      createReadStream(ZIP_PATH).pipe(res);
    } catch (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "File not found" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Zip download server running on port ${PORT}`);
});
