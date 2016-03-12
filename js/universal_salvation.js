function Config() {
            var config = {
                altCol: {
                    '': {
                        'state': {
                            'click': 0,
                            'keyup': 0
                        },
                        '_config': null,
                        'src': "ppt_rwd_media/image1.png",
                        'width': '55%',
                        'enlargeToWidth': 50,
                        'left': 20
                    }
                },
                getter: function(alt, _config, src, width, enlargeToWidth, left) {
                    if (_config && alt) {
                        return config.altCol[alt] && config.altCol[alt]['_config'] ? config.altCol[alt]['_config'] : null;
                    } else if (!_config && alt && !src && !width && !enlargeToWidth && !left) {
                        if (config.altCol[alt]) {
                            return config.altCol[alt] && config.altCol[alt]['state'] ? config.altCol[alt]['state'] : null;
                        } else {
                            return false;
                        }
                    } else if (!arguments.length) {
                        return Object.keys(config.altCol);
                    } else if (alt && src) {
                        return config.altCol[alt] && config.altCol[alt]['src'] ? config.altCol[alt]['src'] : null;
                    } else if (alt && width) {
                        return config.altCol[alt] && config.altCol[alt]['width'] ? config.altCol[alt]['width'] : null;
                    } else if (alt && enlargeToWidth) {
                        return config.altCol[alt] && config.altCol[alt]['enlargeToWidth'] ? config.altCol[alt]['enlargeToWidth'] : null;
                    } else if (alt && left) {
                        return config.altCol[alt] && config.altCol[alt]['left'] ? config.altCol[alt]['left'] : null;
                    }
                },

                setter: function(alt, val, _config) {
                    if (_config && alt) {
                        !config.altCol[alt]['_config'] ? config.altCol[alt]['_config'] = _config : '';
                    } else if (alt && val) {
                        if (({}).toString.call(val) === '[object Object]') {
                            for (var i in val) {
                                config.altCol[alt]['state'][i] = val[i];
                            }
                        }
                    }
                },

                domReady: function(callback) {
                    config.eventsBinder(document, 'DOMContentLoaded', function() {
                        callback();
                        callback = function() {};
                    });
					
					config.eventsBinder(document, 'readystatechange', function() {
                        if (document.readyState === 'complete') {
                            callback();
                            callback = function() {};
                        }
                    });
					                    
                },
				
                eventsBinder: function(El, event, handler) {
				
						if (El && El.addEventListener) {
							El.addEventListener(event, handler);
						} else if (El && El.attachEvent) {
							El.attachEvent('on' + event, handler);
						}
                },

                eventsUnbinder: function(El, event, handler) {
                    if (El && El.removeEventListener) {
                        El.removeEventListener(event, handler);
                    }

                    if (El && El.detachEvent) {
                        El.detachEvent('on' + event, handler);
                    }
                },

                constructor: function(targetEl, _e, _g, s, _u) {
                    var _config = {
                        documentCreateElement: function(El, id, style, text) {
                            var returnable;
                            if (El) {
                                returnable = document.createElement(El);
                                id ? returnable.id = id : '';
                                if (style && ({}).toString.call(style) === '[object Array]') {
                                    for (var i = style.length; i--;) {
                                        if (({}).toString.call(style[i]) === '[object Object]') {
                                            for (var j in style[i]) {
                                                returnable.style[j] = style[i][j];
                                            }
                                        }
                                    }
                                }
                                if (text && ({}).toString.call(text) === '[object String]') {
                                    returnable['innerText' in returnable ? 'innerText' : 'innerHTML'] = text;
                                }
                            }
                            return returnable;
                        },
                        appendOpacityDivToBody: function() {

                            document.body.appendChild(_config.documentCreateElement('div', 'OpacityDivToBody', [{
                                'backgroundColor': '#000'
                            }, {
                                'bottom': '0'
                            }, {
                                'left': '0'
                            }, {
                                'opacity': '0.7'
                            }, {
                                'position': 'fixed'
                            }, {
                                'right': '0'
                            }, {
                                'top': '0'
                            }, {
                                'zIndex': '9999'
                            }]));
                        },

                        scroller: function(e) {
                            var event = window.event || e,
                                delta = event.detail ? event.detail * (-120) : event.wheelDelta,
                                subRoutine = function(d) {
                                    var handledImageContainer = document.querySelector('#handledImageContainer');
                                    if (d >= 120 && handledImageContainer) {
                                        handledImageContainer.style.width = parseInt(handledImageContainer.style.width.match(/\d+/)) + 1 + '%';
                                    }
                                    if (d <= -120 && handledImageContainer) {
                                        handledImageContainer.style.width = parseInt(handledImageContainer.style.width.match(/\d+/)) - 1 + '%';
                                    }
                                };
                            if (delta && event.ctrlKey) {
                                subRoutine(delta);
                            }
                            return false;
                        },

                        arrowPress: function(e) {
                            var event = e || window.event,
                                handledImageContainer = document.querySelector('#handledImageContainer'),
                                leftDefaultValue = handledImageContainer ? _g(handledImageContainer.querySelector('img').alt, '', '', '', '', 1) : null,
                                imageParentNodeEnlargedWidth = handledImageContainer ? _g(handledImageContainer.querySelector('img').alt, '', '', '', 1) : null;

                            switch (event.keyCode.toString()) {

                                case '38':
                                    {
                                        handledImageContainer ? handledImageContainer.style.top =
                                            parseInt(handledImageContainer.style.top.match(/[-]?\d+/)) - 1 + '%' : null;
                                        break;
                                    }

                                case '40':
                                    {
                                        handledImageContainer ? handledImageContainer.style.top =
                                            parseInt(handledImageContainer.style.top.match(/[-]?\d+/)) + 1 + '%' : null;
                                        break;
                                    }
                                case '37' || '':
                                    {
                                        if (handledImageContainer) {
                                            !handledImageContainer.style.left ||
                                                parseInt(handledImageContainer.style.left.match(/[-]?\d+/)) > leftDefaultValue ?
                                                handledImageContainer.style.left = leftDefaultValue + '%' : handledImageContainer.style.left;
                                            handledImageContainer.style.left = parseInt(handledImageContainer.style.left.match(/[-]?\d+/)) - 1 + '%';
                                        }


                                        break;
                                    }

                                case '39':
                                    {
                                        if (handledImageContainer) {
                                            !handledImageContainer.style.left ||
                                                parseInt(handledImageContainer.style.left.match(/[-]?\d+/)) < leftDefaultValue ?
                                                handledImageContainer.style.left = leftDefaultValue + '%' : handledImageContainer.style.left;
                                            handledImageContainer.style.left =
                                                parseInt(handledImageContainer.style.left.match(/[-]?\d+/)) + 1 + '%';

                                        }


                                        break;
                                    }
                                case '48':
                                    {
                                        if (handledImageContainer && event.ctrlKey) {
                                            parseInt(handledImageContainer.style.width.match(/[-]?\d+/)) > imageParentNodeEnlargedWidth ||
                                                parseInt(handledImageContainer.style.width.match(/[-]?\d+/)) < imageParentNodeEnlargedWidth ?
                                                handledImageContainer.style.width = imageParentNodeEnlargedWidth + '%' : '';
                                            parseInt(handledImageContainer.style.left.match(/[-]?\d+/)) !== leftDefaultValue ?
                                                handledImageContainer.style.left = leftDefaultValue + '%' : '';
                                        }
                                        break;
                                    }
                                case '187':
                                    {
                                        if (handledImageContainer && event.ctrlKey) {
                                            handledImageContainer.style.width = parseInt(handledImageContainer.style.width.match(/\d+/)) + 1 + '%';
                                        }
                                        break;
                                    }

                                case '189':
                                    {
                                        if (handledImageContainer && event.ctrlKey) {
                                            handledImageContainer.style.width = parseInt(handledImageContainer.style.width.match(/\d+/)) - 1 + '%';
                                        }
                                        break;
                                    }
                            }
                        },

                        handler: function(e) {
                            var _e = e || event,
                                executable,
                                _ex = e.target,
                                subRoutine = function(eventType) {

                                    var OpacityDivToBody = document.getElementById('OpacityDivToBody');
                                    if (OpacityDivToBody) {
                                        OpacityDivToBody.parentNode.removeChild(OpacityDivToBody);
                                    }
                                    if (document.querySelector('#wrapper') && document.querySelector('#handledImageContainer')) {
                                        document.querySelector('#wrapper').removeChild(document.querySelector('#handledImageContainer'));
                                    }
                                    _u(_ex, eventType, _config.handler);
                                    _u(document, event.type, _config.scroller);
                                    _u(window, eventType, _config.handler);

                                    var a = {};
                                    a[eventType.toString()] = 0;
                                    s(targetEl.alt, a);
                                };

                            if (_e.type === 'keyup' | 'onkeyup') {
                                executable = function() {
                                    if (_e.keyCode.toString() === '27') {
                                        subRoutine(_e.type);
                                    }
                                };
                            } else if (_e.type === 'click' | 'onclick') {
                                executable = function() {
                                    subRoutine(_e.type);
                                };
                            }
                            executable();
                        },

                        handleImageContainer: function() {
                            if (targetEl) {
                                if (!document.getElementById('handledImageContainer')) {

                                    var _el = _config.documentCreateElement('div', 'handledImageContainer', [{
                                            'display': 'block'
                                        }, {
                                            'width': _g(targetEl.alt, '', '', '', 1) + '%'
                                        }, {
                                            'position': 'fixed'
                                        }, {
                                            'zIndex': '10001'
                                        }, {
                                            'top': '5%'
                                        }, {
                                            'background': '#FFF'
                                        }, {
                                            'text-align': 'center'
                                        }, {
                                            'left': (_g(targetEl.alt, '', '', '', '', 1) + '%') ? (_g(targetEl.alt, '', '', '', '', 1) + '%') : 0
                                        }]),
                                        _ex = _config.documentCreateElement('div', '', [{
                                            'background-image': "url('ppt_rwd_media/close.png')"
                                        }, {
                                            'position': 'absolute'
                                        }, {
                                            'display': 'inline-block'
                                        }, {
                                            'background-repeat': 'no-repeat'
                                        }, {
                                            'cursor': 'pointer'
                                        }, {
                                            'height': '45px'
                                        }, {
                                            'width': '40px'
                                        }, {
                                            'top': '-20px'
                                        }, {
                                            'max-width': '50px'
                                        }, {
                                            'right': '-25px'
                                        }, {
                                            'padding-left': '4px'
                                        }, {
                                            'background-size': '40px 40px'
                                        }], ''),
                                        imgClone,
                                        mousewheelEvt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";

                                    imgClone = targetEl.cloneNode();
                                    imgClone.style.width = '95%';
                                    imgClone.style.marginLeft = '0';
                                    imgClone.style.paddingTop = '8px';

                                    document.getElementById('wrapper').appendChild(_el);
                                    _el.appendChild(imgClone);
                                    _el.appendChild(_ex);

                                    if (!_g(targetEl.alt)['mousewheelEvt']) {
                                        s(targetEl.alt, {
                                            'mousewheelEvt': 1
                                        });
                                        _e(document, mousewheelEvt, _config.scroller);
                                    }

                                    s(targetEl.alt, {
                                        'click': 1
                                    });

                                    _e(_ex, 'click', function(e) {
                                        _config.handler(e);
                                    });

                                    if (!_g(targetEl.alt)['keyup']) {
                                        s(targetEl.alt, {
                                            'keyup': 1
                                        });
                                        _e(window, 'keyup', function(e) {
                                            _config.handler(e);
                                        });
                                    }

                                    if (!_g(targetEl.alt)['arrowPress']) {
                                        s(targetEl.alt, {
                                            'arrowPress': 1
                                        });
                                        _e(window, 'keydown', _config.arrowPress);
                                    }

                                    if (!document.querySelector('#OpacityDivToBody')) {
                                        _config.appendOpacityDivToBody();
                                    }
                                }
                            }
                        },
                        onclickHandler: function() {
                            _config.handleImageContainer();
                        }
                    };

                    return {
                        o: _config.onclickHandler
                    }
                }
            };

            return {
                d: config.domReady,
                e: config.eventsBinder,
                u: config.eventsUnbinder,
                s: config.setter,
                g: config.getter,
                F: config.constructor
            }
        };
        var config,
			instance;
			if(!config) {
				config = new Config();
				config.e(document, 'scroll', function(e) {
					clearInterval(menu.auto_interval);
					clearTimeout(menu.automateSlidingTimeout);
					menu.slide(100);
				});
			}
		config.d(function() {
            config.g().forEach(function(i) {
				debugger;
                var img = new Image(),
                    parent = i ? document.querySelector('#' + i) : '';
                if (parent.children && !parent.children.length) {
                    img.alt = i;
                    img.src = config.g(i, '', 1);
                    img.style.cursor = 'pointer';
                    img.style.width = config.g(i, '', '', 1);
                    parent ? parent.appendChild(img) : null;
                }
            });
        });
        config.e(document, 'click', function(e) {
            var event = e || event,
                target = event.target || event.srcElement;
            if ((target.tagName === 'IMG' && config.g(target.alt))) {
                if (!config.g(target.alt, 1)) {
                    var _config = new config.F(target, config.e, config.g, config.s, config.u);
                    config.s(target.alt, '', _config);
                }
                if (config.g(target.alt, 1)) {
                    config.g(target.alt, 1).o();
                }
            }
        });
		
		var menu = {
            addClass: function(el, className) {
                return el.className = className;
            },
            headings: function() {
                var el = document.createElement('div');
                menu.addClass(el, 'headingGroup');
                return el;
            },
            a: function(el, h, n) {
                var _a = document.createElement('a');
                _a['innerHTML' ? 'innerHTML' : 'innerText'] = h ? h : '';
                n ? (n.match(new RegExp('#', 'g')) ? _a.setAttribute('href', n) : _a.setAttribute('name', n)) : '';
                return _a;
            },
            buildMenu: function() {
                var leftbar = document.querySelector('#leftbar'),
                    h2Col = document.querySelectorAll('h2'),
                    h,
					headingGroup1stAnchor,
                    recur = function(el, j) {
                        if (el.nextElementSibling && el.nextElementSibling !== h2Col[j + 1]) {
                            if (el.nextElementSibling.tagName == 'H3') {
                                var _h = el.nextElementSibling['innerHTML' ? 'innerHTML' : 'innerText'],
                                    _name = _h.replace(/\s+/g, '');
                                el.nextElementSibling['innerHTML' ? 'innerHTML' : 'innerText'] = '';
                                el.nextElementSibling.appendChild(menu.a(el.nextElementSibling, _h, _name));
                                h.appendChild(menu.a(el.nextElementSibling, _h, '#' + _name));
                            }
                        } else {
                            return;
                        }
                        recur(el.nextElementSibling, j);
                    };
                Array.prototype.forEach.call(h2Col, function(i, j) {
					i.setAttribute('name', i['innerHTML'].replace(/\s+/g,''));
                    h = menu.headings();
					headingGroup1stAnchor = menu.a(i, i.innerHTML);
					i.innerHTML = '';
					i.appendChild(headingGroup1stAnchor.cloneNode(true));
					i.firstChild.setAttribute('name', i['innerHTML'].match(/[^<a>].*[^</a>]/g)[0].replace(/\s+/g, ''));
					headingGroup1stAnchor.setAttribute('href', '#' + i.firstChild.name);
                    h.appendChild(headingGroup1stAnchor);
                    recur(i, j);
                    leftbar.appendChild(h);
                });
				Array.prototype.forEach.call(document.querySelectorAll('.headingGroup:not(:first-child) a:not(:first-child)'), function(i, j) {
					i.style.display = "none";
				});
            },
            slide: function(ms) {
                var slide_itemizely = {
					scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
                    firstHeadingCol: document.querySelectorAll('.firstHeading'),
                    map: {},
                    mapper: function() {
                        Array.prototype.forEach.call(this.firstHeadingCol, function(i, j) {
                            slide_itemizely.map[j] = i.offsetTop;
                        });
                    },
                    getter: function(key) {
                        return this.firstHeadingCol[Object.keys(this.map)[key]]
                    },
                    item2Show: '',
					targetedElSiblings : [],
					counterPartNamesEls : {},
                    router: function() {
                        Object.keys(this.map).forEach(function(i, j) {
                            slide_itemizely.item2Show = slide_itemizely.scrollTop >= slide_itemizely.map[i] ? i : slide_itemizely.item2Show;
                        });
						
                        var elCol = document.querySelectorAll('.headingGroup :first-child'),
                            targetedEl;
                        Array.prototype.forEach.call(elCol, function(i, j) {
                            if (i && slide_itemizely.item2Show && i.innerHTML && 
							i.innerHTML == slide_itemizely.firstHeadingCol[slide_itemizely.item2Show].innerText) {
                                targetedEl = i;
								while (targetedEl.nextElementSibling) {
                                    slide_itemizely.targetedElSiblings.push(targetedEl.nextElementSibling);
                                    targetedEl = targetedEl.nextElementSibling;
                                }
								slide_itemizely.targetedElSiblings.forEach(function(i, j) {
										var href = i.getAttribute("href");
											href = href.replace(/#/, ''), 
											lookUpStr = 'a[name*="' + href + '"' + ']', 
											el = document.querySelector(lookUpStr); 
											
											if(slide_itemizely.scrollTop >= el.offsetTop && slide_itemizely.scrollTop) {
												
											   Array.prototype.forEach.call(document.querySelectorAll('a[style*=color]'), function(i, j){
													i.style.color = '#0066FF';
													i.style.fontWeight = '';
											   });
											   
											   i.style.color = '#000000';
											   i.style.fontWeight = 'bold';
											}
								});
								Array.prototype.forEach.call(document.querySelectorAll('.headingGroup a:not(:first-child)'), 
								function(i, j) {
                                    i.style.display = 'none';
                                });
								
								slide_itemizely.targetedElSiblings.forEach(function(i, j) {
									i.style.display = 'block';
								});
								      
                            }
                        });
						slide_itemizely.targetedElSiblings = [];
                    }
                };

                if (!Object.keys(slide_itemizely.map).length) {
                    slide_itemizely.mapper();
                }
                slide_itemizely.router();
            }
        };
        config.d(function() {
            menu.buildMenu();
            menu.buildMenu = function() {};
		});