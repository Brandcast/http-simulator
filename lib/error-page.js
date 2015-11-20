var h = require('hyperscript');

module.exports = function (code) {

    var page = h('html',
        h('head',
            h('link', {
                rel:"stylesheet", type:"text/css", href:"style.css"
            })
        ),
        h('body',
            h('div.container',
                h('div.content.pad-top-54',
                    h('h1', code)
                )
            )
        )
    );

    return page.outerHTML;
};