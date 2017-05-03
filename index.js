// =============================================================================
// DEPENDENCIES
// =============================================================================
const through = require('through2');
const PluginError = require('gulp-util').PluginError;
const util = require('util');
const css = require('css');

// =============================================================================
// CONSTANTS
// =============================================================================
const PLUGIN_NAME = 'gulp-css-remove-attributes';

// =============================================================================
// MODULE
// =============================================================================
module.exports = function (attributesToRemove) {

    // =========================================================================
    // INPUT VALIDATION
    // =========================================================================
    if (attributesToRemove === undefined || attributesToRemove === null) {
        throw new PluginError(PLUGIN_NAME, 'Missing attributes to remove.');
    }
    if (!Array.isArray(attributesToRemove)) {
        throw new PluginError(PLUGIN_NAME, 'The attributes to remove shoud be an array. The passed argument is a "' + typeof attributesToRemove + '".');
    }

    // =========================================================================
    // FUNCTIONS
    // =========================================================================
    // INPUT
    function parseInputCss(inputFile, encoding) {
        let fileContent = inputFile.contents.toString(encoding);
        let parsedCss = css.parse(fileContent);
        return parsedCss;
    }

    // PARSING
    function removeCssAttributes(parsedCss, attributesToRemove) {
        parsedCss.stylesheet.rules = parsedCss.stylesheet.rules
            .map(rule => {
                // only filter rules, the other types are just kept
                if (rule.type === 'rule') {
                    rule.declarations = rule.declarations.filter(declaration => !attributesToRemove.includes(declaration.property));
                }
                return rule;
            })
        return parsedCss;
    }

    // OUTPUT
    function outputFinalCss(modifiedCss) {
        return css.stringify(modifiedCss);
    }

    // MAIN
    let transform = function (file, encoding, callback) {
        let parsedCss = parseInputCss(file, encoding);
        let modifiedCss = removeCssAttributes(parsedCss, attributesToRemove)
        let finalCss = outputFinalCss(modifiedCss)
        file.contents = new Buffer(finalCss);

        // success
        callback(null, file);
    }

    //
    return through.obj(transform);
};
