module.exports = {
    root: true,
    extends: ["next/core-web-vitals"],
    plugins: ["jsx-a11y"],
    rules: {
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "react/jsx-key": "warn",
        "jsx-a11y/alt-text": "warn",
        "jsx-a11y/label-has-associated-control": "warn"
    },
    settings: {
        next: { rootDir: ["./"] }
    }
}