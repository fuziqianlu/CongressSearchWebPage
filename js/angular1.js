var app = angular.module("myApp", ['angularUtils.directives.dirPagination', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('ctrlLegis', function ($scope, $http) {
    $scope.dynamic=50;
    $scope.committeeMap = new Map();
    $scope.saved=false;
    $scope.billsaved=false;

    $http({
        method:"GET",
        url : "http://sample-env.5p7uahjtiv.us-west-2.elasticbeanstalk.com/csci571hw8/LoadPHP.php",
        params:{
            'chamber':'all',
            'part' : 'Legislators',
            'key': 'legis'
        }
    }).then(function successCallBack(response){
        $scope.allrecords = response.data.results;
        $scope.records = response.data.results;
        $scope.senaterecords = response.data.results;
    }, function errorCallback(response){
        $scope.errorHandler="no response";
    });
    $http({
        method:"GET",
        url : "http://sample-env.5p7uahjtiv.us-west-2.elasticbeanstalk.com/csci571hw8/LoadPHP.php",
        params:{
            'key': 'activeBill'
        }
    }).then(function successCallBack(response){
        $scope.activeBills = response.data.results;
    }, function errorCallback(response){
        $scope.errorHandler="no activeBills response";
    });
    $http({
        method:"GET",
        url : "http://sample-env.5p7uahjtiv.us-west-2.elasticbeanstalk.com/csci571hw8/LoadPHP.php",
        params:{
            'key': 'newBill'
        }
    }).then(function successCallBack(response){
        $scope.newBills = response.data.results;
    }, function errorCallback(response){
        $scope.errorHandler="no newBills response";
    });
    $http({
        method:"GET",
        url : "http://sample-env.5p7uahjtiv.us-west-2.elasticbeanstalk.com/csci571hw8/LoadPHP.php",
        params:{
            'key': 'allCommittee'
        }
    }).then(function successCallBack(response){
        $scope.houseCommittees = response.data.results;
        $scope.senateCommittees = response.data.results;
        $scope.jointCommittees = response.data.results;
    }, function errorCallback(response){
        $scope.errorHandler="no Committees response";
    });

    $scope.getHouseDetail=function (bioId){
        $http({
            method:"GET",
            url:"http://sample-env.5p7uahjtiv.us-west-2.elasticbeanstalk.com/csci571hw8/LoadPHP.php",
            params:{
                'bioguideId': bioId,
                'key' : 'legisDetail'
            }
        }).then(function successDetail(response){
            $scope.personInfo = response.data.results[0];
        },function errorDetail(response){
            alert("No details return");
        });
        
        $http({
            method:"GET",
            url:"http://sample-env.5p7uahjtiv.us-west-2.elasticbeanstalk.com/csci571hw8/LoadPHP.php",
            params:{
                'bioguideId': bioId,
                'key' : 'legisCommitteeDetail'
            }
        }).then(function successDetail(response){
            $scope.personCommitteeInfo = response.data.results;
        },function errorDetail(response){
            alert("No committee details return");
        });
        
        $http({
            method:"GET",
            url:"http://sample-env.5p7uahjtiv.us-west-2.elasticbeanstalk.com/csci571hw8/LoadPHP.php",
            params:{
                'bioguideId': bioId,
                'key' : 'legisBillDetail'
            }
        }).then(function successDetail(response){
            $scope.personBillInfo = response.data.results;
        },function errorDetail(response){
            alert("No bill details return");
        });
        
        var localList=JSON.parse(localStorage.getItem("favorite_legis"));
        if(localList==null){
            $scope.saved=false;
        }
        else{
            var index=localList.findIndex(function(e){
                return e.bioguide_id===bioId;
            });
            if(index>-1){
                $scope.saved=true;
            }
            else{
                $scope.saved=false;
            }
        }
    };
//    $scope.favorLegislators=JSON.parse(localStorage.getItem("favorite_legis"));
    $scope.generateFavor=function(){
        $scope.favorLegislators=JSON.parse(localStorage.getItem("favorite_legis"));
        $scope.favorBills=JSON.parse(localStorage.getItem("favorite_bills"));
        $scope.favorCommittees=JSON.parse(localStorage.getItem("favorite_committees"));
    }
//    $scope.generateFavorCommittee(){
//        
//    }
    $scope.getBillDetail=function (billObj){
        $scope.billDetail=billObj;
        var localList=JSON.parse(localStorage.getItem("favorite_bills"));
        if(localList==null){
            $scope.billsaved=false;
        }
        else{
            var index=localList.findIndex(function(e){
                return e.bill_id===billObj.bill_id;
            });
            if(index>-1){
                $scope.billsaved=true;
            }
            else{
                $scope.billsaved=false;
            }
        }
    }


    $scope.calculateTerm = function (startStr, endStr) {
        var  startDate, endDate;
        var now=new Date();
        startDate = new Date(startStr);
        endDate = new Date(endStr);
        
       
       ston = parseInt((Date.now()-startDate)  /  1000  /  60  /  60  /24);
       stoe =  parseInt((endDate-startDate)  /  1000  /  60  /  60  /24); //把相差的毫秒数转换为天数  
       $scope.dynamic = Math.floor(ston/stoe*100);
        return $scope.dynamic;
    }
//get favorite legislators 
    $scope.saveFavoriteItem = function (kind, theitem){
        var favor_list=[];
        var index=-1;
        var tmpList=JSON.parse(localStorage.getItem("favorite_legis"));

        if(tmpList!=null){
            favor_list=JSON.parse(localStorage.getItem("favorite_legis"));
            index=favor_list.findIndex(function(e){
                return e.bioguide_id===theitem.bioguide_id;
            });
        }
        
        if(index<0){
            favor_list.push(theitem);
        }
        localStorage.setItem("favorite_legis", JSON.stringify(favor_list));
        $scope.saved=true;
        
    }
    $scope.getFavoriteItem = function(kind, thekey){
        var favor_list=[];
        var tmpList=JSON.parse(localStorage.getItem("favorite_legis"));
        if(tmpList==null)
        favor_list=JSON.parse(localStorage.getItem("favorite_legis"));
        if(favor_list==null) return null;
        var obj=favor_list.find(function(e){
            return e.bioguide_id===thekey;
        });
        return obj;
    }
    $scope.removeFavoriteItem = function(kind, thekey){
        var favor_list=[];
        favor_list=JSON.parse(localStorage.getItem("favorite_legis"));
        if(favor_list==null) return null;
        var index=favor_list.findIndex(function(e){
            return e.bioguide_id===thekey;
        });
        if(index>-1){
            favor_list.splice(index, 1);
        }
        localStorage.setItem("favorite_legis", JSON.stringify(favor_list));
        $scope.saved=false;
    }
//Bill Detail Functions
    $scope.saveFavoriteBill = function (theitem){
        var favor_list=[];
        var index=-1;
        var tmpList=JSON.parse(localStorage.getItem("favorite_bills"));

        if(tmpList!=null){
            favor_list=JSON.parse(localStorage.getItem("favorite_bills"));
            index=favor_list.findIndex(function(e){
                return e.bill_id===theitem.bill_id;
            });
        }
        
        if(index<0){
            favor_list.push(theitem);
        }
        localStorage.setItem("favorite_bills", JSON.stringify(favor_list));
        $scope.billsaved=true;
        
    }
    $scope.getFavoriteBill = function(thekey){
        var favor_list=[];
        var tmpList=JSON.parse(localStorage.getItem("favorite_bills"));
        if(tmpList==null)
        favor_list=JSON.parse(localStorage.getItem("favorite_bills"));
        if(favor_list==null) return null;
        var obj=favor_list.find(function(e){
            return e.bill_id===thekey;
        });
        return obj;
    }
    $scope.removeFavoriteBill = function(thekey){
        var favor_list=[];
        favor_list=JSON.parse(localStorage.getItem("favorite_bills"));
        if(favor_list==null) return null;
        var index=favor_list.findIndex(function(e){
            return e.bill_id===thekey;
        });
        if(index>-1){
            favor_list.splice(index, 1);
        }
        localStorage.setItem("favorite_bills", JSON.stringify(favor_list));
        $scope.billsaved=false;
    }
//get favorite committee
    $scope.saveFavoriteCommittee = function (theitem){
        var favor_list=[];
        var index=-1;
        var tmpList=JSON.parse(localStorage.getItem("favorite_committees"));

        if(tmpList!=null){
            favor_list=JSON.parse(localStorage.getItem("favorite_committees"));
            index=favor_list.findIndex(function(e){
                return e.committee_id===theitem.committee_id;
            });
        }
        
        if(index<0){
            favor_list.push(theitem);
        }
        localStorage.setItem("favorite_committees", JSON.stringify(favor_list));
        $scope.committeeMap.set(theitem.committee_id, true);
        
    }
    $scope.getFavoriteCommittee = function(thekey){
        var favor_list=[];
        var tmpList=JSON.parse(localStorage.getItem("favorite_committees"));
        if(tmpList==null)
        favor_list=JSON.parse(localStorage.getItem("favorite_committees"));
        if(favor_list==null) return null;
        var obj=favor_list.find(function(e){
            return e.committee_id===thekey;
        });
        return obj;
    }
    $scope.removeFavoriteCommittee = function(thekey){
        var favor_list=[];
        favor_list=JSON.parse(localStorage.getItem("favorite_committees"));
        if(favor_list==null) return null;
        var index=favor_list.findIndex(function(e){
            return e.committee_id===thekey;
        });
        if(index>-1){
            favor_list.splice(index, 1);
        }
        localStorage.setItem("favorite_committees", JSON.stringify(favor_list));
        $scope.committeeMap.delete(thekey);
    }

//helper functions
    $scope.switchButton = function(){
        $(this).hide();
        $(this).siblings("button").show();
    }
    $scope.getFavorLegisDetails = function(bioId){
        $('#homePills a[href="#homeLegislators"]').tab('show');
        $scope.getHouseDetail(bioId);
        setTimeout(function(){$('#att').carousel(1);}, 200);
        
    }
    $scope.getFavorBillsDetails = function(bill){
        $('#homePills a[href="#homeBills"]').tab('show');
        $scope.getBillDetail(bill);
        setTimeout(function(){$('#btt').carousel(1);}, 200);
    }
});


//JQuerys

$(document).ready(function(){
    $("#hideBtn").click(function(){
        if($("#mainContents").attr("class")=="col-md-10 col-sm-10 col-xs-10"){
            $("#mainContents").attr("class", "col-md-12 col-sm-12 col-xs-12");
        }
        else if($("#mainContents").attr("class")=="col-md-12 col-sm-12 col-xs-12"){
            $("#mainContents").attr("class", "col-md-10 col-sm-10 col-xs-10");
        }
        $("#navigation").toggle();
    });
});


function findByKey(element, biokey){
    return element.bioguide_id==biokey;
}