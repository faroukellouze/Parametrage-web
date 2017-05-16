var Sandbox = {
    create: function (core, module_selector) {
        return {
            notify: function (evt) {
                if (core.is_obj(evt) && evt.type) {
                    core.triggerEvent(evt);
                }
            },
            listen: function (evts) {
                if (core.is_obj(evts)) {
                    core.registerEvents(evts, module_selector);
                }
            },
            ignore: function (evts) {
                if (core.is_arr) {
                    core.removeEvents(evts, module_selector);
                }
            },
            openXhr(data) {
                return core.open_xhr(data);
            },
            notification(data) {
                core.showNotification(data);
            },
            initTranslate: function () {
                core.initTranslate();
            },
            translate: function () {
                core.translate();
            },
            showSideBar: function (codeHTML, widthModal, title, callback) {
                core.showSideBar(codeHTML, widthModal, title, callback);
            },
            addErreur: function (el) {
                core.addErreur(el);
            },
            hideSideBar: function (traitement) {
                core.hideSideBar(traitement);
            },
            selectObject: function () {
                return core.selectObject();
            },
            dataTablesObject: function () {
                return core.dataTablesObject();
            },
            XHRObject: function (sb) {
                return core.XHRObject(sb);
            },
            getLanguageIndex: function () {
                return core.getLanguageIndex();
            },
            render_dataTables_boolean: function (data, type, edition) {
                return core.render_dataTables_boolean(data, type, edition);
            },
            render_dataTables_Select: function (data, data_Select) {
                return core.render_dataTables_Select(data, data_Select,this);
            },
            iterateObject: function (obj, search) {
                return core.iterateObject(obj, search);
            },
            checkObjectInArray: function (obj, array) {
                return core.checkObjectInArray(obj, array);
            },
            FormChanges: function (form) {
                return core.FormChanges(form);
            },
            correspondence: function (data) {
                return core.correspondence(data);
            },
            cloneElement: function (element) {
                return core.cloneElement(element);
            },
            serializeArrayForm: function (element) {
                return core.serializeArrayForm(element);
            },
            jsonSchemaValidationInit: function () {
                core.jsonSchemaValidationInit();
            },
            jsonSchemaValidation: function (obj, schema, formId) {
                return core.jsonSchemaValidation(obj, schema, formId);
            },
            afficherErreursFormulaire: function (validation, formId) {
                core.afficherErreursFormulaire(validation, formId);
            },
            renderTemplate: function (template, dataTemplate) {
                return core.renderTemplate(template, dataTemplate);
            },
            getActiveSideBar: function () {
                return core.getActiveSideBar();
            }
        };
    }
};