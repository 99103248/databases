(function() {
'use strict';

angular.module("config", [])

.constant("ConStore", {
	"version": "v0.0.0",
	"showVersion": true,
	"baseUrl": "http://localhost:9019",
	"apiServer": "http://192.168.10.68:8081"
})

;})();