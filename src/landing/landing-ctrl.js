// To use this, comment the .coffee version and uncomment this one

angular.module('%module%.landing')
    .controller('LandingCtrl', function($scope, $http) {

        $scope.users = [];
        $scope.availableRoles = ['USER', 'EDITOR', 'ADMIN'];
        $scope.allRoles = [];

        $http.get('data/users.csv')
            .then(function(res) {
                var result = Papa.parse(res.data, {
                    header: true,
                    delimiter: ',',
                    dynamicTyping: true,
                    skipEmptyLines: true
                }).data;
                result.forEach(function (user) {

                    user.initials = user.firstname[0] + user.lastname[0];
                    user.displayedRoles = user.roles.split(';').join(', ');
                    user.roles = user.roles.split(';');
                    user.roles.forEach(function (role) {
                        if($scope.allRoles.indexOf(role) < 0) {
                            $scope.allRoles.push(role);
                        }
                    });
                    user.roles = user.roles.map(function(role) {
                        return {
                            label: role,
                            active: true
                        };
                    });
                });

                $scope.users = result;
            });

        $scope.toggleEdition = function(index) {
            $scope.users[index].isOpen = !$scope.users[index].isOpen;
        };

        $scope.isActive = function(user, role) {
            return user.roles.some(function(userRole) {
                console.log(userRole.label, role);
                return userRole.label === role;
            }.bind(this));
        };

    });
