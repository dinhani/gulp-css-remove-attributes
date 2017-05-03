# gulp-css-remove-attributes

Remove CSS attributes from stylesheets that you do not have full control.

It is useful to completly remove styles from libraries like Bootstrap and Semantic UI instead of having to overwrite them with custom CSS.

## Install

```
$ npm install --save-dev gulp-css-remove-attributes
```


## Usage

```js
var gulp = require('gulp');
var removeAttributes = require('gulp-css-remove-attributes')

// in this example the box-shadow and text-transform attributes will not be
// present in the generated CSS file
gulp.task('default', function () {
    return gulp.src('src/*.css')
        .pipe(removeAttributes(['box-shadow', 'text-transform'], {compress: true}))
        .pipe(gulp.dest('dist'));
});
```


## Documentation

> ### removeAttributes(attributes, [options])

> #### attributes
>
> Type: `array`
>
> CSS attributes that should be removed from the input files.


> #### options
>
> Type: `object`
>
> Options that are forwarded to [css](https://github.com/reworkcss/css#api) library.
>
>  Probably only `compress` and `indent` options will be useful in the context of this plugin.
