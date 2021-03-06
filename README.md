# json2sass
> Generate SASS/SCSS vars files out of a JSON

It turns this:
```json
{
    "/*": "This is a special comment",
    "button": {
        "//": "This is a simple comment",
        "color": "green",
        "padding": "10px",
        "font": {
            "family": "'Helvetica Arial sans-serif'",
            "color": "white"
        }
    }
}
```

Into this:
```sass
/**
 * This is a special comment
 */

// This is a simple comment
$button-color: green
$button-padding: 10px
$button-font-family: 'Helvetica Arial sans-serif'
$button-font-color: white
```

## dependencies
* Nodejs

## usage
Using as a module:
```javascript
var json2sass = require('json2sass');
json2sass.toSass('path/to/existing.json', 'path/to/created.sass');
json2sass.toScss('path/to/existing.json', 'path/to/created.scss');
```

Or by cloning the repo:
```shell
node . --input path/to/existing.json --output path/to/created.sass
node . --input path/to/existing.json --output path/to/created.scss --type scss
```