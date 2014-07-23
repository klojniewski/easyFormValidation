/*globals jQuery, window, document */
(function ($) {
    "use strict";
    var pluginName  =   "easyFormValidation",
        defaults    =   {
            messageRequired: 'Pole nie może być puste.',
            messagePhone: 'Podaj poprawny numer telefonu (np. 2226668888)',
            messageNip: 'Podaj poprawny numer NIP',
            messageEmail: 'Podaj poprawny adres e-mail (np. adres@email.pl)',
            messageTemplate: '<div class="{{messageClass}}">{{message}}</div>',
            messageClass: 'error-message',
            validationFailedClass: 'validation-failed'
        };
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.$element = $(this.element);
        this.settings = $.extend({}, defaults, options);
        this.settings.messageTemplate = this.settings.messageTemplate.replace('{{messageClass}}', this.settings.messageClass);
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            var that = this;
            that.$element.on('submit', function (e) {
                var formValidationFlag = true;
                that.removeErrorMessages();
                that.$element.find('.validate:visible').each(function () {
                    var $input = $(this),
                        fieldValidationFlag = true;
                    if ($input.is('.validate-required')) {
                        if (!that.validateRequired($input)) {
                            fieldValidationFlag = false;
                            that.appendMessage($input, that.settings.messageRequired);
                        }
                    }
                    if (fieldValidationFlag && $input.is('.validate-phone')) {
                        if (!that.validatePhone($input)) {
                            fieldValidationFlag = false;
                            that.appendMessage($input, that.settings.messagePhone);
                        }
                    }
                    if (fieldValidationFlag && $input.is('.validate-nip')) {
                        if (!that.validateNip($input)) {
                            fieldValidationFlag = false;
                            that.appendMessage($input, that.settings.messageNip);
                        }
                    }
                    if (fieldValidationFlag && $input.is('.validate-email')) {
                        if (!that.validateEmail($input)) {
                            fieldValidationFlag = false;
                            that.appendMessage($input, that.settings.messageEmail);
                        }
                    }
                    if (!fieldValidationFlag) {
                        formValidationFlag = false;
                        $input.addClass(that.settings.validationFailedClass);
                    }
                });
                if (!formValidationFlag) {
                    e.preventDefault();
                }
            });
        },
        removeErrorMessages: function () {
            this.$element.find('.' + this.settings.messageClass).remove();
            this.$element.find('.' + this.settings.validationFailedClass).removeClass(this.settings.validationFailedClass);
        },
        appendMessage: function ($input, message) {
            var messageHtml = this.settings.messageTemplate;
            $input.after(messageHtml.replace('{{message}}', message));
        },
        validateRequired: function ($input) {
            var fieldValidationFlag = true;
            if ($input.is(':text') && $input.val().length === 0) {
                fieldValidationFlag = false;
            } else if ($input.is('textarea') && $input.val().length === 0) {
                fieldValidationFlag = false;
            } else if ($input.is(':checkbox') && !$input.prop('checked')) {
                fieldValidationFlag = false;
            } else if ($input.is('select') && $input.val() == -1) {
                fieldValidationFlag = false;
            }
            return fieldValidationFlag;
        },
        validatePhone: function ($input) {
            return !($input.val().match(/^\d{9}$/) ==  null);
        },
        validateNip: function ($input) {
            var verificator_nip = new Array(6,5,7,2,3,4,5,6,7),
                nip = $input.val().replace(/[\ \-]/gi, ''),
                nipError = false;
            if (nip.length != 10) {
                nipError = true;
            } else {
                var n = 0;
                for (var i=0; i<9; i++) {   n += nip[i] * verificator_nip[i]; }
                n %= 11;
                if (n != nip[9]) { nipError = true; }
            }
            return !nipError;
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
}(jQuery));