import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";

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
  compilerOptions: {
    noImplicitAny: false
  },
  package: {
    // package.json properties
    name: "haskellian",
    version: Deno.args[0],
    private: false,
    description: "The functional programming library you need.",
    exports: {
      ".": "./esm/src/mod.ts",
      "./promise": "./esm/src/promise/mod.ts",
      "./either": "./esm/src/either/mod.ts",
      "./iter": "./esm/src/iter/mod.ts",
      "./asyn_iter": "./esm/src/asyn_iter/mod.ts",
      "./util": "./esm/src/util/mod.ts",
    }
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("README.md", "dist/README.md");
  },
});