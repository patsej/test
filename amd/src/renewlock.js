/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['jquery', 'core/notification','core/ajax'], function ($, notification, ajax) {

    var repeat;
    var renewLock = {
        renewLockAjax: function (idScavengerhunt,idLock) {
            var json = ajax.call([{
                    methodname: 'mod_scavengerhunt_renew_lock',
                    args: {
                        idScavengerhunt: idScavengerhunt,
                        idLock: idLock
                    }
                }]);
            json[0].done(function (response) {
                console.log(response);
                //renewLock.stopRenewLockScavengerhunt();
                //location.reload(true);
            }).fail(function (error) {
                console.log(error);
                notification.alert('Error', error.message, 'Continue');
            });
        },
        /**Renuevo de continuo el bloqueo de edicion **/
        renewLockScavengerhunt: function (idScavengerhunt,idLock) {
            repeat = setInterval(renewLock.renewLockAjax, 90000, idScavengerhunt,idLock);
        },
        stopRenewLockScavengerhunt: function () {
            clearInterval(repeat);
        },
        getIdLock: function () {
            return idLock;
        }
        
    };
    return renewLock;
});