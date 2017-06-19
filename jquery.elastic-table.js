! function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser
        factory(root.jQuery);
    }
}(this, function ($) {

    "use strict";

    var slice = Array.prototype.slice;

    $.fn.elastic_table = function (options) {

        if (!arguments.length) {
            throw new Error('options is null')
        }

        if (typeof options === 'string') {

            var handle,
                method = options;

            if (!method) {
                throw new Error('method is null')
            }
            if (this.length > 1) {
                handle = this.first().data('handle')
                console.warn('mutil dom inst,use first default')
            } else {
                handle = this.data('handle')
            }

            return handle[method].call(handle, slice.call(arguments, 1))
        }

        if (this.length > 1) {
            return this.each(function () {
                $(this).elastic_table(options)
            });
        }

        options = $.extend({
            data:{
                head:[
                    {text:'字段1'},
                    {text:'字段2'},
                    {text:'字段3'},
                    {text:'字段4'}
                ]
            }
        }, options || {})

        var $this = this,
            instance = {
                init:function(){
                    this.createHead()
                    this.createBody()
                },
                getHead:function(){
                    return this.getdata().head || []
                },
                getBody:function(){
                    return this.getdata().body || []
                },
                getData:function(){
                    return options.data  || {}
                },
                createHead:function(){

                },
                createBody:function(){

                }
            };

        options.data && instance.init()

        $this.data('handle', instance)

        return $this

    }
    $('#table').elastic_table({});

    $('#table').elastic_table("get",1,2,3,4);
});