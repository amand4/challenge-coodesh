// ** Vite Imports
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// ** Developer Config Imports

export default () => {
  const plugins = [react(), tsconfigPaths()];
  const chunkSizeWarningLimit = 1600;

  return defineConfig({
    plugins,
    build: {
      chunkSizeWarningLimit,
    },
  });
};
