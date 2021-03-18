module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    rules: {
        indent: ["error", 4],
        "no-cond-assign": ["error", "always"],
        quotes: ["error", "double"],
        // Disable now, but enable in the future
        "one-var": "off", // ["error", "never"]
        // Disable
        "init-declarations": "off",
        "no-console": "off",
        "no-inline-comments": "off",
    },
};
