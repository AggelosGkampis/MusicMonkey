﻿var SiteHelper = (function () {
    'use strict';

    var AjaxHelper = {};

    AjaxHelper.ajaxObject = function (url, type = 'GET', dataType = 'json', contentType = 'application/json') {
        this.type = type;
        this.url = url;
        this.dataType = dataType;
        this.contentType = contentType;
    };

    AjaxHelper.contentLoader = function (dataContainerId, dataTemplate, onSuccessFinallyFunc = null, ajaxObject) {
        let sectionBuilder = function (dataContainerId, dataTemplate, onSuccessFinallyFunc = null, ajaxObject) {
            this.dataContainerId = dataContainerId;
            this.dataTemplate = dataTemplate;
            this.ajaxObject = ajaxObject;
            this.onSuccessFinallyFunc = onSuccessFinallyFunc;

            this.start = function () {
                this.load();

                ((t) => {
                    $.ajax({
                        type: t.ajaxObject.type, url: t.ajaxObject.url, dataType: t.ajaxObject.dataType, contentType: t.ajaxObject.contentType,
                        success: function (data) { t.build(data); },
                        error: function () { t.error(); }
                    });
                })(this);
            };

            this.build = function (data) {
                if (data.length > 50) data.length = 50; // Prosoxh gia debug edo perno mono 50 items; kanonika prepei na fugei auth h grammh.
                setTimeout(() => {
                    $(`#${dataContainerId}`).html(data.map((o, i) => this.dataTemplate(o, i)));
                    if (this.onSuccessFinallyFunc) this.onSuccessFinallyFunc();
                }, 800);
            };
            this.load = function () {
                $(`#${dataContainerId}`).html(
                    `<div class='spinnerContainer'>
                    <div class="spinner-grow" style="width: 5rem; height: 5rem;" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                <div>`
                );
            };
            this.error = function () {
                $(`#${dataContainerId}`).html(
                    `<div class="errorContainer">
                    <div class="single_player_container">
                        <h4>No data found</h4>
                        <h6>Please refresh the page</h6>
                    </div>
                </div>`
                );
            };
        };
        return new sectionBuilder(dataContainerId, dataTemplate, onSuccessFinallyFunc, ajaxObject);
    };

    var Converter = {};

    Converter.csDateStrToJsDateStr = function (cSharpDateStr, format = 'dd/mm/yyyy') {
        let f = format.toLowerCase();
        let date = new Date(Date.parse(cSharpDateStr));
        let ar = [{ n: 'y', v: -1 }, { n: 'm', v: -1 }, { n: 'd', v: -1 }].sort((a, b) => f.indexOf(a.n) - f.indexOf(b.n));

        ar.forEach(o => {
            o.v = f.split(o.n).length - 1;
            if (o.v < 1) return;
            switch (o.n) {
                case 'y': f = f.replace(o.n.repeat(o.v), o.v == 2 ? date.getFullYear().toString().slice(2) : date.getFullYear().toString()); break;
                case 'm': f = f.replace(o.n.repeat(o.v), o.v == 1 ? (date.getMonth() + 1).toString() : `0${date.getMonth() + 1}`.slice(-2)); break;
                case 'd': f = f.replace(o.n.repeat(o.v), o.v == 1 ? date.getDate().toString() : `0${date.getDate()}`.slice(-2)); break;
            }
        });

        return f;
    };

    var Window = {};

    Window.getQueryString = function () {
        let href = window.location.href;

        if (!href.includes('?') || (href.split('?')[1].trim() == '')) return null;

        let vars = [], hash;
        let hashes = href.slice(href.indexOf('?') + 1).split('&');



        //for (let hash = hash.split('=') of hashes) {



        //    vars[hash[0]] = hash[1];
        //}

        for (let i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            //vars.push({ key:hash[0], value:hash[1] });

            vars[hash[0]] = hash[1];

            //vars.push(hash[0]);
            //vars[hash[0]] = hash[1];
        }
        return vars;
    };

    return { AjaxHelper, Converter, Window };
})();










