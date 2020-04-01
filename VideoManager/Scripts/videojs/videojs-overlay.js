(function (factory) {
    if (typeof define === 'function' && define['amd']) {
        define('videojs-titleoverlay', ['video.js'], function (videojs) { factory(window, document, videojs) });
    } else if (typeof exports === 'object' && typeof module === 'object') {
        var vjs = require('video.js');
        factory(window, document, vjs);
    } else {
        factory(window, document, videojs);
    }
})(function (window, document, videojs) {
    "use strict";

    // support es6 style import
    videojs = videojs.default || videojs;

    var title_defaults = {
        debug: false,
        title: 'Title Overlay',
        floatPosition: 'right',
        margin: '10px',
        fontSize: '1em'
    }

    var init = function (options) {
        this.titleoverlay = new TitleOverlayPlugin(this, options);
    }

    var TitleOverlayPlugin = function (player, options) {
        this.logger = options.logger;
        if (this.logger == undefined) {
            this.logger = {
                log: function (msg) {
                    if (options.debug || title_defaults.debug) {
                        console.debug('[Title Overlay] - ' + msg);
                    }
                }
            }
        }

        this.logger.log('Initializing Title Overlay plugin');

        this.player = player;

        this.controlPrefix = player.id() + '-';


        this.updateTitle = function (titleText) {
            updateTitle_(titleText);
        };

        /**
         * Show the title overlay
         */
        this.showOverlay = function () {
            showOverlay_();
        };

        /**
         * Hide the title overlay
         */
        this.hideOverlay = function () {
            hideOverlay_();
        }

        var assignControlAttributes_ = function (element, controlName) {
            element.id = this.controlPrefix + controlName;
            element.className = this.controlPrefix + controlName + ' ' + controlName;
        }.bind(this);

        var createOverlayContainer_ = function () {
            this.logger.log('Creating overlay container');
            this.playerEl = player.el();
            this.titleOverlayContainer = this.playerEl.appendChild(document.createElement('div'));
            assignControlAttributes_(this.titleOverlayContainer, 'title-overlay-container');
            this.titleOverlayTextContainer = this.titleOverlayContainer.appendChild(document.createElement('span'));
            this.titleOverlayTextContainer.textContent = options.title || title_defaults.title;
            this.titleOverlayTextContainer.style.position = 'relative';
            this.titleOverlayTextContainer.style.float = options.floatPosition || title_defaults.floatPosition;
            this.titleOverlayTextContainer.style.margin = options.margin || title_defaults.margin;
            this.titleOverlayTextContainer.style.fontSize = options.fontSize || title_defaults.fontSize;
            this.titleOverlayTextContainer.style.textShadow = '0 0 5px #000';
            showOverlay_();
        }.bind(this);

        var updateTitle_ = function (titleText) {
            this.logger.log('Updating title from ' + this.titleOverlayTextContainer.textContent + ' to ' + titleText);
            this.titleOverlayTextContainer.textContent = titleText;
        }.bind(this);

        var showOverlay_ = function () {
            this.logger.log('Showing title overlay');
            this.titleOverlayContainer.style.visibility = 'visible';
            this.titleOverlayContainer.style.opacity = '1';
            this.titleOverlayContainer.style.transition = 'opacity 0.5s linear';
        }.bind(this);

        var hideOverlay_ = function () {
            this.logger.log('Hiding title overlay');
            this.titleOverlayContainer.style.visibility = 'hidden';
            this.titleOverlayContainer.style.opacity = '0';
            this.titleOverlayContainer.style.transition = 'visibility 0s 0.5s, opacity 0.5s linear';
        }.bind(this);

        createOverlayContainer_();

        this.player.on('pause', function () {
            this.titleoverlay.logger.log('Pause event detected.');
            showOverlay_();
        });

        this.player.on('play', function () {
            this.titleoverlay.logger.log('Play event detected.');
            hideOverlay_();
        });

        this.player.on('ended', function () {
            this.titleoverlay.logger.log('Ended event detected.')
            hideOverlay_();
        })

        this.logger.log('Finished initializing Title Overlay plugin');
    }

    // Cross-compatibility for Video.js 5 and 6.
    var registerPlugin = videojs.registerPlugin || videojs.plugin;
    registerPlugin('titleoverlay', init);
});