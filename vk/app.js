var app = angular.module("App", []);
app.controller("AppCtrl", function ($scope) {
    $scope.a = function () {
        alert("ass")
    };
    $scope.nav = [
        {class: "current_nav", url: "img/gallery.png", title: "gallery", alt: "gallery"}
    ]
    $scope.vk = {
            data: {},
            appID: 6085608,
            appPermissions: 7,
            init: function(){
                VK.Auth.login($scope.authInfo, $scope.vk.appPermissions);
            }
        };
    $scope.authInfo = function(response){
        if(response.session){ // Авторизация успешна
            show();
            function show() {
                $scope.vk.data.user = response.session.user;
                $(".current_user").text($scope.vk.data.user.first_name);
                console.log($scope.vk.data.user)
                $(".current_file").slideDown("slow", function () {
                    $(".current_file").css("display","flex")
                })
            }
        }else alert("Авторизоваться не удалось!");
        VK.Api.call('photos.get', {owner_id: $scope.vk.data.user.id, album_id: "wall", count: 10}, function (r) {
            if (r.response) {
                $scope.vk.data.wall_photos = r.response;
                console.log($scope.vk.data.wall_photos)
            }
            
        })
    }
    $scope.currentNav = function (event) {
        $(".nav div").removeClass("current_nav").addClass("not_current_nav")
        event.currentTarget.setAttribute("class", "current_nav")
    }
})
