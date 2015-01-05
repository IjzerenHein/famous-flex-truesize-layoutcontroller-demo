/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*global define, Please, console*/
/*eslint no-console:0 no-use-before-define:0*/

define(function(require) {

    //<webpack>
    require('famous-polyfills');
    require('famous/core/famous.css');
    require('./styles.css');
    require('./index.html');
    //</webpack>

    // please-js
    require('pleasejs/Please');

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var FlexScrollView = require('famous-flex/FlexScrollView');
    var LayoutController = require('famous-flex/LayoutController');
    var ListLayout = require('famous-flex/layouts/ListLayout');

    // Initialize
    var mainContext = Engine.createContext();
    mainContext.add(_createScrollView());
    _fillWithTestData();

    //
    // Create scrollview
    //
    var scrollView;
    function _createScrollView() {
        scrollView = new FlexScrollView({
            autoPipeEvents: true,
            flow: false,
            mouseMove: true
        });
        scrollView.on('layoutend', function() {
            //console.log('FlexScrollView::Layout...');
        });
        return scrollView;
    }

    //
    // Create true-sized layout-controller
    //
    function _createLC(data) {
        var lc = new LayoutController({
            layout: ListLayout,
            autoPipeEvents: true,
            size: [undefined, true],
            dataSource: data
        });
        lc.on('layoutend', function() {
            //console.log('LayoutController::Layout...');
        });
        return lc;
    }

    //
    // Create a surface
    //
    function _createSurface(content) {
        return new Surface({
            size: [undefined, true],
            classes: ['surface'],
            content: content,
            properties: {
                backgroundColor: window.Please.make_color()
            }
        });
    }

    function _fillWithTestData() {
        for (var i = 0; i < 10; i++) {
            scrollView.push(_createLC([
                _createSurface('This examples demonstrates the use of LayoutController and ListLayout to calculate the height of multiple true-size surfaces. When the size of the LayoutController is set to [undefined, true], you can add it to a FlexScrollView which will then use the calculated height from the LayoutController.'),
                _createSurface('<pre>var lc = new LayoutController({<br>    size: [undefined, true], // use the cumulative size of the child-renderables<br>    dataSource: [...]<br>});</pre>'),
                _createSurface('Lorem ipsum dolor sit amet, aperiri adolescens vituperatoribus ne per, everti audire an qui, an mea agam explicari molestiae. Choro detracto vix no. Eu sea sint legimus, cu mazim intellegam mel, id omnes omnium volutpat duo. Habeo elaboraret te eum. An pri idque apeirian, sea commune abhorreant no. Idque fabellas indoctum sed an, an cum duis civibus, ea platonem contentiones eos.'),
                _createSurface('-----------------------------')
            ]));
        }
    }
});
