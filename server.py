#!/usr/bin/env python3
"""
Liquid Love Heart - Local Server & Python Script Runner
Serves the web application and handles triggering the native Python Tkinter animation.
"""

import http.server
import json
import os
import subprocess
import sys
import webbrowser
from pathlib import Path

PORT = 8080
DIRECTORY = Path(__file__).parent.resolve()


class LoveHeartHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def do_POST(self):
        if self.path == "/api/run-python":
            try:
                script_path = DIRECTORY / "heart_animation.py"
                # Launch the python script as a separate process
                # On Windows, using 'py' launcher or sys.executable
                python_cmd = sys.executable if "python" in sys.executable.lower() else "py"
                proc = subprocess.Popen(
                    [python_cmd, str(script_path)],
                    cwd=str(DIRECTORY),
                    creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if sys.platform == "win32" else 0
                )
                response = {
                    "status": "success",
                    "message": "Python heart animation window launched successfully!",
                    "pid": proc.pid
                }
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps(response).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return
        
        self.send_response(404)
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


def run():
    os.chdir(str(DIRECTORY))
    server_address = ("", PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, LoveHeartHTTPRequestHandler)
    url = f"http://localhost:{PORT}"
    print(f"\n=======================================================")
    print(f"  ❤️  LIQUID LOVE HEART EXPERIENCE IS LIVE!  ❤️")
    print(f"  Open in your browser: {url}")
    print(f"  Serving files from:   {DIRECTORY}")
    print(f"  Press Ctrl+C to stop the server.")
    print(f"=======================================================\n")
    try:
        webbrowser.open(url)
    except Exception:
        pass
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()


if __name__ == "__main__":
    run()
