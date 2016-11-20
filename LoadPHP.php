<?php 
header('Access-Control-Allow-Origin:*');

function loadLegislators($cham){
    if($cham=="all"){
        $url="http://104.198.0.197:8080/legislators?apikey=1413542962e24273a9ab0e72ea7a8032&per_page=all";
    }
    else{
        $url="http://104.198.0.197:8080/legislators?chamber=".$cham."&apikey=1413542962e24273a9ab0e72ea7a8032&per_page=all";
    }
    $options = array(
            'http' => array(
                'method' => 'GET',
                'timeout' => 15 * 60 // 超时时间（单位:s）
            )
        );
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    echo $response;
}
function loadLegisDetailPerson($bioIdd){
    $url="http://104.198.0.197:8080/legislators?bioguide_id=".$bioIdd."&apikey=1413542962e24273a9ab0e72ea7a8032";
    $options = array(
            'http' => array(
                'method' => 'GET',
                'timeout' => 15 * 60 // 超时时间（单位:s）
            )
        );
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    echo $response;
}
function loadLegisDetailCommittee($bioId){
    $url="http://104.198.0.197:8080/committees?member_ids=".$bioId."&apikey=1413542962e24273a9ab0e72ea7a8032&per_page=5";
    $response=file_get_contents($url);
    echo $response;
}
function loadLegisDetailBill($bioId){
    $url="http://104.198.0.197:8080/bills?sponsor_id=".$bioId."&apikey=1413542962e24273a9ab0e72ea7a8032&per_page=5";
    $response=file_get_contents($url);
    echo $response;
}
function loadActiveBills(){
    $url="http://104.198.0.197:8080/bills?history.active=true&apikey=1413542962e24273a9ab0e72ea7a8032&per_page=50";
    $response=file_get_contents($url);
    echo $response;
}
function loadNewBills(){
    $url="http://104.198.0.197:8080/bills?history.active=false&apikey=1413542962e24273a9ab0e72ea7a8032&per_page=50";
    $response=file_get_contents($url);
    echo $response;
}
function loadSenateCommittees(){
    $url="http://104.198.0.197:8080/committees?chamber=senate&apikey=1413542962e24273a9ab0e72ea7a8032&per_page=all";
    $response = file_get_contents($url);
    echo $response;
}
function loadHouseCommittees(){
    $url="http://104.198.0.197:8080/committees?chamber=house&apikey=1413542962e24273a9ab0e72ea7a8032&per_page=all";
    $response = file_get_contents($url);
    echo $response;
}
function loadJointCommittees(){
    $url="http://104.198.0.197:8080/committees?chamber=joint&apikey=1413542962e24273a9ab0e72ea7a8032&per_page=all";
    $response = file_get_contents($url);
    echo $response;
}
function loadAllCommittees(){
    $url="http://104.198.0.197:8080/committees?apikey=1413542962e24273a9ab0e72ea7a8032&per_page=all";
    $response = file_get_contents($url);
    echo $response;
}
if(isset($_GET['key'])){
    $key=$_GET['key'];
}

if($key=="legis"){
    $chamber=$_GET['chamber'];
    loadLegislators($chamber);
}
else if($key=="legisDetail"){
    $bioId=$_GET['bioguideId'];
    loadLegisDetailPerson($bioId);
}
else if($key=="legisCommitteeDetail"){
    $bioId=$_GET['bioguideId'];
    loadLegisDetailCommittee($bioId);
}
else if($key=="legisBillDetail"){
    $bioId=$_GET['bioguideId'];
    loadLegisDetailBill($bioId);
}
else if($key=='activeBill'){
    loadActiveBills();
}
else if($key=='newBill'){
    loadNewBills();
}
else if($key=='senateCommittee'){
    loadSenateCommittees();
}
else if($key=='houseCommittee'){
    loadHouseCommittees();
}
else if($key=='jointCommittee'){
    loadJointCommittees();
}  
else if($key=='allCommittee'){
    loadAllCommittees();
}

