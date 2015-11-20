var loremIpsum = require('lorem-ipsum');
var _ = require('underscore');
var h = require('hyperscript');

var opts = {
    count: 1,
    units: 'sentences',
    sentenceLowerBound: 5,
    sentenceUpperBound: 15,
    paragraphLowerBound: 3,
    paragraphUpperBound: 7,
    format: 'plain',
    words: require('./words'),
    random: Math.random,
    suffix: '\n'
};

function ipsum (options) {
    return loremIpsum(_.defaults(options || {}, opts));
}

module.exports = function () {

    var page = h('html',
        h('head',
            h('link', {
                rel:"stylesheet", type:"text/css", href:"style.css"
            })
        ),
        h('body',
            h('div.container',
                h('div.content.pad-top-54',
                    h('h1', ipsum({
                        sentenceLowerBound: 2,
                        sentenceUpperBound: 5
                    })),
                    h('h2', ipsum())
                )
            ),
            h('div.container',
                h('div.content',
                    h('p', ipsum({units: 'paragraphs'})),
                    h('p', ipsum({units: 'paragraphs'})),
                    h('ul',
                        h('li', ipsum({units: 'sentences'})),
                        h('li', ipsum({units: 'sentences'})),
                        h('li', ipsum({units: 'sentences'}))
                    )
                )
            ),
            h('div.container',
                h('div.content.pad-bottom-54',
                    h('p', ipsum({units: 'paragraphs'})),
                    h('p', ipsum({units: 'paragraphs'})),
                    h('p', ipsum({units: 'paragraphs'}))
                )
            )
        )
    );

    return page.outerHTML;
};