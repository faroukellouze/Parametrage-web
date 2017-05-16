CORE.create_module("messages", function (sb) {
    let msgMap = [];

    return {
        objectMessages: null,
        init: function () {

            objectMessages = this;

            sb.listen({
                "showMessage": this.getMessage
            });

            objectMessages.setMessages();
        },
        destroy: function () {
            objectMessages = null;
            msgMap = [];
        },
        setMessages: function () {
            //    msgMap[0] = ["fr","en","ar"];
            msgMap[1] = ["Veuillez vérifier votre nom d'utilisateur / mot de passe ! ", "Please check your username / password ! ", "يرجى التحقق من اسم المستخدم / كلمة السر ! "];
            msgMap[2] = ["Echec ! ", "Fail ! ", "فشل ! "];
            msgMap[3] = ["Donnée incorrecte ! ", "Incorrect data ! ", "بيانات غير صحيحة ! "];
            msgMap[4] = ["Onglet déjà ouvert ! ", "Tab already open ! ", "Onglet déjà ouvert ! "];
            msgMap[5] = ["Cet objet existe déjà ! ", "This object already exists ! ", "العنصر تم إختياره مسبقا ! "];
            msgMap[6] = ["Veuillez saisir code societé ! ", "Please enter company code! ", "الرجاء إدخال رمز الجهة! "];
            msgMap[7] = ["Veuillez vérifier le code ! ", "Please check the code! ", "يرجى التحقق من رمز! "];
            msgMap[8] = ["Veuillez sélectionner le secteur d'activité ! ", "Please select the sector of activity! ", "الرجاء تحديد القطاع! "];
            msgMap[9] = ["Veuillez saisir la désignation ! ", "Please enter the designation! ", "الرجاء إدخال البيان! "];
            msgMap[10] = ["Veuillez vérifier ou saisir le seuil crédit ! ", "Please check or enter the credit threshold! ", "يرجى التحقق أو أدخل الحد الأقصى للديون! "];
            msgMap[11] = ["Veuillez vérifier ou saisir le seuil crédit alerte ! ", "Please check or enter the credit risk threshold! ", "يرجى التحقق أو قم بإدخال حجم الديون! "];
            msgMap[12] = ["Le seuil crédit alerte est inférieur à le seuil crédit ! ", "The credit risk threshold is lower than the credit threshold! ", "حجم الديون أقل من الحد الأقصى للديون! "];
            msgMap[13] = ["Veuillez vérifier ou saisir le delais facturation ! ", "Please check or enter the billing time! ", "يرجى التحقق أو قم بإدخال جدولة المطالبات! "];
            msgMap[14] = ["Veuillez vérifier ou saisir le delais règlement ! ", "Please check or enter the payment deadlines! ", "يرجى التحقق أو قم بإدخال جدولة الديون! "];
            msgMap[15] = ["Veuillez sélectionner le mode réglement ! ", "Please select the regulation mode! ", "الرجاء اختيار طريقة الدفع! "];
            msgMap[16] = ["Veuillez sélectionner la banque ! ", "Please select the bank! ", "يرجى اختيار المصرف! "];
            msgMap[17] = ["Veuillez saisir le Rib bancaire ! ", "Please enter the bank Rib! ", "الرجاء إدخال الحساب المصرفي! "];
            msgMap[18] = ["Veuillez vérifier le Rib bancaire ! ", "Please check the bank Rib! ", "يرجى التحقق من الحساب المصرفي! "];
            msgMap[19] = ["Veuillez vérifier ou saisir l'observation ! ", "Please check or enter the observation! ", "يرجى التحقق أو قم بإدخال الملاحظات! "];
            msgMap[20] = ["Veuillez sélectionner le type contact ! ", "Please select contact type! ", "الرجاء تحديد نوع الإتصال ! "];
            msgMap[21] = ["Veuillez vérifier ou saisir le contact ! ", "Please check or enter the contact! ", "يرجى التحقق أو قم بإدخال الإتصال ! "];
            msgMap[22] = ["Veuillez sélectionner la profession ! ", "Please select the profession ! ", "يرجى اختيار الوظيفة! "];
            msgMap[23] = ["Veuillez vérifier ou saisir le nom ! ", "Please check or enter the name! ", "يرجى التحقق أو أدخل المسؤول! "];
            msgMap[26] = ["Succès !", "Success", "ok"];
        },
        getMessage: function (data) {
            if (typeof (data.numMsg) === "number")
                data.msg = msgMap[data.numMsg][sb.getLanguageIndex()];
            else
                data.msg = data.numMsg;

            sb.notification(data);
        }
    };
});

CORE.start("messages");