module.exports = {
  apps: [
    {
      name: "vithal-vision",
      cwd: "C:/vithal/vithal-vision",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};