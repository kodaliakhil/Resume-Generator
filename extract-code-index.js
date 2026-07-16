// scripts/extract-code-index.js
 
const { Project, SyntaxKind } = require("ts-morph");
const fs = require("fs");
 
const project = new Project({
  compilerOptions:{
    allowJs:true,
    jsx:2
  }
});

// project.addSourceFileAtPathIfExists
 
project.addSourceFilesAtPaths([
//   "src/**/*.js",
//   "src/**/*.jsx",
  "Frontend/src/**/*.jsx",
  "Frontend/src/**/*.tsx",
  "Frontend/src/**/*.ts",
  "Frontend/src/**/*.js",
  // "Backend/src/**/*.jsx",
  // "Backend/src/**/*.tsx",
  // "Backend/src/**/*.ts",
  // "Backend/src/**/*.js",

 
]);
 
const result = [];
 
for (const sourceFile of project.getSourceFiles()) {
  const fileInfo = {
    file: sourceFile.getFilePath(),
    imports: [],
    exports: [],
    functions: [],
    components: [],
    hooks: [],
    apiCalls: [],
    stateSetters: [],
  };
 
  // Imports
  sourceFile.getImportDeclarations().forEach((imp) => {
    fileInfo.imports.push({
      module: imp.getModuleSpecifierValue(),
      namedImports: imp.getNamedImports().map((n) => n.getName()),
      defaultImport: imp.getDefaultImport()?.getText() || null,
    });
  });
 
  // Functions
  const functions = sourceFile.getFunctions();
 
  functions.forEach((fn) => {
    const body = fn.getBodyText() || "";
    const calls = fn
      .getDescendantsOfKind(SyntaxKind.CallExpression)
      .map((call) => call.getExpression().getText());
 
    fileInfo.functions.push({
      name: fn.getName() || "anonymous",
      startLine: fn.getStartLineNumber(),
      endLine: fn.getEndLineNumber(),
      params: fn.getParameters().map((p) => p.getName()),
      calls: [...new Set(calls)],
      length: body.split("\n").length,
    });
  });
 
  // Arrow functions / const functions
  const variableStatements = sourceFile.getVariableStatements();
 
  variableStatements.forEach((stmt) => {
    stmt.getDeclarations().forEach((decl) => {
      const initializer = decl.getInitializer();
 
      if (!initializer) return;
 
      const kind = initializer.getKindName();
 
      if (
        kind === "ArrowFunction" ||
        kind === "FunctionExpression"
      ) {
        const name = decl.getName();
        const calls = initializer
          .getDescendantsOfKind(SyntaxKind.CallExpression)
          .map((call) => call.getExpression().getText());
 
        const isHook = name.startsWith("use");
        const isComponent = /^[A-Z]/.test(name);
 
        const entry = {
          name,
          startLine: decl.getStartLineNumber(),
          endLine: decl.getEndLineNumber(),
          calls: [...new Set(calls)],
        };
 
        fileInfo.functions.push(entry);
 
        if (isHook) fileInfo.hooks.push(entry);
        if (isComponent) fileInfo.components.push(entry);
      }
    });
  });
 
  // API-ish calls
  sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
    const text = call.getText();
 
    if (
      text.includes("axios.") ||
      text.includes("fetch(") ||
      text.includes(".get(") ||
      text.includes(".post(") ||
      text.includes(".put(") ||
      text.includes(".delete(")
    ) {
      fileInfo.apiCalls.push({
        line: call.getStartLineNumber(),
        text: text.slice(0, 300),
      });
    }
  });
 
  // React state setters
  sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
    const expression = call.getExpression().getText();
 
    if (/^set[A-Z]/.test(expression)) {
      fileInfo.stateSetters.push({
        setter: expression,
        line: call.getStartLineNumber(),
        text: call.getText().slice(0, 200),
      });
    }
  });
 
  result.push(fileInfo);
}
 
fs.writeFileSync(
  "code-index-Frontend.json",
  JSON.stringify(result, null, 2)
);
 
console.log("Generated code-index.json");