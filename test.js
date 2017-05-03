// =============================================================================
// DEPENDENCIES
// =============================================================================
const File = require('vinyl');
const assert = require('assert');
const cssAttributeRemover = require('.');

// =============================================================================
// TESTES
// =============================================================================
describe('gulp-css-attribute-remover', function () {

    // =========================================================================
    // VALIDATIONS
    // =========================================================================
    it('fail on missing attributes', function (done) {
        try {
            let plugin = cssAttributeRemover()
        } catch (err) {
            done()
        }
    })

    it('fail on not array attributes', function (done) {
        try {
            let plugin = cssAttributeRemover('font-family')
        } catch (err) {
            done()
        }
    })

    // =========================================================================
    // SUCCESS
    // =========================================================================
    it('should remove attributes', function (done) {
        let plugin = cssAttributeRemover(['font-family', 'font-size']);
        plugin.write(cssFile());

        // wait for the file to come back out
        plugin.once('data', function (file) {
            let css = file.contents.toString();
            assert(!css.includes('font-family'))
            assert(!css.includes('font-size'))
            done();
        });
    });

});

// =============================================================================
// HELPERS
// =============================================================================
cssFile = function () {
    let css = 'h1 {font-family:Times New Roman, font-weight:bold; font-size: 24px} p { font-family: Arial; font-weight: normal; font-size:12px}';

    return new File({
        contents: new Buffer(css)
    })
}
invalidCssFile = function () {
    let css = 'invalid css';

    return new File({
        contents: new Buffer(css)
    })
}
