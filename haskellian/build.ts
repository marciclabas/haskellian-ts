import { build, emptyDir } from "@deno/dnt";

await emptyDir("./dist");

await build({
  scriptModule: false,
  entryPoints: ["./mod.ts"],
  outDir: "./dist",
  test: false,
  shims: {
    // see JS docs for overview and more options
    deno: false,
  },
  package: {
    // package.json properties
    name: "haskellian",
    version: Deno.args[0],
    private: false,
    description: "The functional programming library you need.",
    exports: {
      ".": "./esm/src/mod.js",
      "./promise": "./esm/src/promise/mod.js",
      "./either": "./esm/src/either/mod.js",
      "./iter": "./esm/src/iter/mod.js",
      "./asyn_iter": "./esm/src/asyn_iter/mod.js",
      "./util": "./esm/src/util/mod.js",
    }
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("README.md", "dist/README.md");
  },
});