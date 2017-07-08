(function () {
  'use strict';

  var PortalController = function (PortalService, ConStore) {
    var self = this;

    this.getAbout = function () {
      PortalService.getAbout().then(function (response) {
        self.about = response;
      }, function (error) {
        console.error(error);
      });
    };

    this.cellClick = function (index) {
      self.selectedTab = index;
    };

    self.universities = [ {name:"test1", id:1}, {name:"test2", id:2}, {name:"test3", id:3} ];

    self.createRSO = function () {
      var university = document.getElementById("new-rso").selectedIndex;
      if (university && self.members.length > 4) {
        delete self.newRSO.uniError;
        PortalService.createRSO(self.newRSO.name, university, self.members);
      } else {
        self.newRSO.uniError = true;
      }
    };

    self.members = [];
    this.add = function(){
      var parts = self.newmember.split('@');
      if (parts[1] === undefined) return;

      if (!self.memberDomain)
        self.memberDomain = parts[1];
      if (parts[1] === self.memberDomain) {
        self.members.push(self.newmember);
        self.newmember = "";
      }
    };
    this.del = function(i){
      self.members.splice(i,1);
      if (!self.members.length)
        self.memberDomain = undefined;
    };

    this.init = function () {
      //self.getAbout();

      self.tabs = [
        {
          url: '/users',
          route: 'portal.users',
          name: 'Users',
          template: 'component/users/users.html'
        },{
          url: '/rso',
          route: 'portal.rso',
          name: 'Rso',
          template: 'component/rso/rso.html'
        },{
          url: '/university',
          route: 'portal.university',
          name: 'Universities',
          template: 'component/university/university.html'
        },{
          url: '/events',
          route: 'portal.events({university: undefined, rso: undefined})',
          name: 'Events',
          template: 'component/events/events.html'
        },{
          url: '/template',
          route: 'portal.template',
          name: 'Settings',
          template: 'component/template/template.html'
        }];
      self.feVersion = ConStore.version;
    };

    this.init();
  };

  var PortalService = function (WebService) {
    this.getAbout = function () {
      return WebService.doGet({
        url: 'about'
      });
    };

    this.createRSO = function (name, university, emails) {
      return WebService.doPost({
        url: 'rso',
        params: {
          name: name,
          university: university,
          emails: emails
        }
      });
    }
  };

  angular
    .module('Databases')
    .service('PortalService', [
      'WebService',
      PortalService
    ])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('portal', {
          url: '',
          templateUrl: 'component/portal/portal.html',
          controllerAs: 'portal',
          controller: 'PortalController'
        });
    }])
    .controller('PortalController', [
      'PortalService',
      'ConStore',
      PortalController
    ]);
})();
