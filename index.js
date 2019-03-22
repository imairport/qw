/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.	See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.	The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.	You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.	See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var db;
var currver; var cloudversion; var lastCheck; var currDate;
var online;
var storedList = [];
//var countries = {};
var countries = {"Afghanistan":"AF","Albania":"AL","Algeria":"DZ","Andorra":"AD","Angola":"AO","Anguilla":"AI","Antigua &amp; Barbuda":"AG","Argentina":"AR","Armenia":"AM","Aruba":"AW","Australia":"AU","Austria":"AT","Azerbaijan":"AZ",
				"Bahamas":"BS","Bahrain":"BH","Bangladesh":"BD","Barbados":"BB","Belarus":"BY","Belgium":"BE","Belize":"BZ","Benin":"BJ","Bermuda":"BM","Bhutan":"BT","Bolivia Plurinational State Of":"BO","Bosnia &amp; Herzegovina":"BA","Botswana":"BW","Brazil":"BR","British Virgin Islands":"VG","Brunei":"BN","Bulgaria":"BG","Burkina Faso":"BF","Burundi":"BI",
				"Cambodia":"KH","Cameroon":"CM","Canada":"CA","Cape Verde":"CV","Cayman Islands":"KY","Central Arfrican Republic":"CF","Chad":"TD","Chile":"CL","China":"CN","Colombia":"CO","Congo":"CG","Cook Islands":"CK","Costa Rica":"CR","Cote D Ivoire":"CI","Croatia":"HR","Cuba":"CU","Curacao":"CW","Cyprus":"CY","Czech Republic":"CZ",
				"Denmark":"DK","Djibouti":"DJ","Dominica":"DM","Dominican Republic":"DO",
				"Ecuador":"EC","Egypt":"EG","El Salvador":"SV","Equatorial Guinea":"GQ","Eritrea":"ER","Estonia":"EE","Ethiopia":"ET",
				"Falkland Islands":"FK","Faroe Islands":"FO","Fiji":"FJ","Finland":"FI","France":"FR","French Polynesia":"PF",
				"Gabon":"GA","Gambia":"GM","Georgia":"GE","Germany":"DE","Ghana":"GH","Gibraltar":"GI","Great Britain":"GB","Greece":"GR","Greenland":"GL","Grenada":"GD","Guam":"GU","Guatemala":"GT","Guernsey":"GG","Guinea":"GN","Guinea Bissau":"GW","Guyana":"GY",
				"Haiti":"HT","Honduras":"HN","Hong Kong":"HK","Hungary":"HU",
				"Iceland":"IS","India":"IN","Indonesia":"ID","Iran":"IR","Iraq":"IQ","Ireland":"IE","Isle of Man":"IM","Israel":"IL","Italy":"IT",
				"Jamaica":"JM","Japan":"JP","Jersey":"JE","Jordan":"JO",
				"Kazakhstan":"KZ","Kenya":"KE","Kiribati":"KI","Kosovo":"YK","Kuwait":"KW","Kyrgyzstan":"KG","KOREA REPUBLIC OF":"KR",
				"Laos":"LA","Latvia":"LV","Lebanon":"LB","Lesotho":"LS","Liberia":"LR","Libya":"LY","LIBYAN ARAB JAMAHIRIYA":"LY","Liechtenstein":"LI","Lithuania":"LT","Luxembourg":"LU",
				"Macau":"MO","Macedonia":"MK","Madagascar":"MG","Malawi":"MW","Malaysia":"MY","Maldives":"MV","Mali":"ML","Malta":"MT","Marshall Islands":"MH","Mauritania":"MR","Mauritius":"MU","Mexico":"MX","Micronesia":"FM","Moldova":"MD","Monaco":"MC","Mongolia":"MN","Montenegro":"ME","Montserrat":"MS","Morocco":"MA","Mozambique":"MZ","Myanmar":"MM",
				"Namibia":"NA","Nauro":"NR","Nepal":"NP","Netherlands":"NL","Netherlands Antilles":"AN","New Caledonia":"NC","New Zealand":"NZ","Nicaragua":"NI","Niger":"NE","Nigeria":"NG","North Korea":"KP","Norway":"NO",
				"Oman":"OM","Pakistan":"PK","Palau":"PW","Palestine":"PS","THE STATE OF PALESTINE":"PS","Panama":"PA","Papua New Guinea":"PG","Paraguay":"PY","Peru":"PE","Philippines":"PH","Poland":"PL","Portugal":"PT","Puerto Rico":"PR",
				"Qatar":"QA","Reunion":"RE","Romania":"RO","Russia":"RU","Rwanda":"RW","Saint Pierre &amp; Miquelon":"PM","Samoa":"WS","San Marino":"SM","Sao Tome and Principe":"ST","Saudi Arabia":"SA","Senegal":"SN","Serbia":"RS","Seychelles":"SC","Sierra Leone":"SL","Singapore":"SG","Slovakia":"SK","Slovenia":"SI","Solomon Islands":"SB","Somalia":"SO","South Africa":"ZA","South Korea":"KR","South Sudan":"SS","Spain":"ES","Sri Lanka":"LK","St Kitts &amp; Nevis":"KN","St Lucia":"LC","St Vincent":"VC","Sudan":"SD","Suriname":"SR","Swaziland":"SZ","Sweden":"SE","Switzerland":"CH","Syria":"SY",
				"Taiwan":"TW","Tajikistan":"TJ","Tanzania":"TZ","Thailand":"TH","Timor L'Este":"TL","Togo":"TG","Tonga":"TO","Trinidad &amp; Tobago":"TT","Tunisia":"TN","Turkey":"TR","Turkmenistan":"TM","Turks &amp; Caicos":"TC","Tuvalu":"TV",
				"Uganda":"UG","Ukraine":"UA","United Arab Emirates":"AE","United Kingdom":"GB","United States":"US","Uruguay":"UY","Uzbekistan":"UZ",
				"Vanuatu":"VU","Vatican City":"VA","HOLY SEE VATICAN CITY STATE":"VA","Venezuela":"VE","Vietnam":"VN","Virgin Islands (US)":"VI","Yemen":"YE","Zambia":"ZM","Zimbabwe":"ZW"};
var postal_cnty= ["Australia","China","Indonesia","India","Malaysia","Vietnam"];

var today=new Date();
currDate = today.getFullYear()+ "-" + (today.getMonth()+1) + "-" + today.getDate()
//alert(currDate);

var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) {
	admobid = { // for Android
		banner: 'ca-app-pub-4992669744869009/4384794657',
		interstitial: 'ca-app-pub-4992669744869009/1786551475',
		//banner: 'ca-app-pub-7452504265224874/2205169120',
		//interstitial: 'ca-app-pub-7452504265224874/7586430260',
		rewardvideo: 'ca-app-pub-3940256099942544/5224354917',
	};
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
	admobid = { // for iOS
		banner: 'ca-app-pub-3940256099942544/4480807092',
		interstitial: 'ca-app-pub-3940256099942544/4411468910',
		rewardvideo: 'ca-app-pub-3940256099942544/1712485313',
	};
} else {
	admobid = { // for Windows Phone
		banner: 'ca-app-pub-6869992474017983/8878394753',
		interstitial: 'ca-app-pub-6869992474017983/1355127956',
		rewardvideo: '',
	};
}

showModal();
fb_sign_in();

function fb_sign_in() {
	firebase.auth().signInWithEmailAndPassword("raymond.chan@tnt.com", "Time2005@tnthk").catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		console.log(errorMessage);
	});
	//console.log(firebase);
}

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	// User is signed in.
	console.log("Firebase logged in");
	localStorage.setItem("fb_signed_in", 1);
	fb_signed_in	= 1;
	app_init();
	} else {
	// No user is signed in.
	console.log("No user is signed in");
	localStorage.setItem("fb_signed_in", 0);
	fb_signed_in	= 0;
	}
});


function initAd() {

	// this will create a banner on startup
	/*admob.interstitial.config({
		id: admobid.interstitial,
		isTesting: false,
		autoShow: false,
	});
	admob.interstitial.prepare();*/
	
	admob.banner.config({
		id: admobid.banner,
		isTesting: false,
		autoShow: true,
	});
	admob.banner.prepare();

}

var app = {
	// Application Constructor
	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},

	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.
	onDeviceReady: function() {
		this.receivedEvent('deviceready');
		
	},
	

	// Update DOM on a Received Event
	receivedEvent: function(id) {
		document.addEventListener("resume", onResume, false);
		document.addEventListener("offline", onOffline, false);
		document.addEventListener("online", onOnline, false);
		// display a banner at startup
		online = checkConnection();
		//alert(online);
		initAd();
		
		var starCountRef = firebase.database().ref('stations');
		
		starCountRef.on('value', function(snapshot) {
			//console.log(snapshot.val()['HHPA1']);
			//console.log(Date(snapshot.val()['HHPA1'].uplTime));
		}, function (error) {
			console.log("Error: " + error.code);
		});
	
		//alert(navigator.vibrate);
		$(document).ready(function() {
			$.fn.numpad.defaults.gridTpl = '<table style=" padding: 0px 10px"></table>';
			$.fn.numpad.defaults.displayTpl = '<input type="text" style="height:50px; font-size:22pt" READONLY />';
			$.fn.numpad.defaults.buttonNumberTpl =  '<ons-button style="width:100%; height: 50px; font-size:18pt; text-align:center; line-height: 50px;"></ons-button>';
			$.fn.numpad.defaults.buttonFunctionTpl = '<ons-button modifier="cta" style="width:100%; height: 50px; font-size:18pt; text-align:center; line-height: 50px;"></ons-button>';
			$.fn.numpad.defaults.onKeypadCreate = function(){$(this).find('.done').css({'background-color':'orange'});};
			
			showModal();
	
			if (localStorage.lastCheck) {
				lastCheck	= localStorage.lastCheck;
			}
	
			ons.setDefaultDeviceBackButtonListener(function(event) {
				ons.notification.confirm('Do you want to close the app?') // Ask for confirmation
					.then(function(index) {
						if (index === 1) { // OK button
							navigator.app.exitApp(); // Close the app
						}
				});
			});
			
			
			if (localStorage.dbversion) {
				currver		= localStorage.dbversion;
				currdbtime	= localStorage.dbtime;
			} else {
				currver		= 0;
				currdbtime	= "";
				
				var DBDeleteRequest = window.indexedDB.deleteDatabase("QWHotColdDB");

				DBDeleteRequest.onerror = function(event) {
					//console.log("Error deleting database.");
					//alert('Error deleting database.');
				};
				 
				DBDeleteRequest.onsuccess = function(event) {
					//alert("Database deleted successfully");
					
				 // console.log(event.result); // should be undefined
				};
			}
			//alert(currver);
			
			jquery_init();
			
			/*document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
				//console.log(event)
				
				admob.interstitial.prepare();
			})*/
			
		});
		
	}
};

app.initialize();

function onResume() {
	online = checkConnection();
	//alert('Resume');
	//alert(event.tabItem.getAttribute("label"));
	var activeTab	= document.querySelector('ons-tabbar').getActiveTabIndex();
	if (activeTab==0 || activeTab==1) {
		//admob.interstitial.show();
		
		showModal();
		checkDB();
	}
}
function onOffline() {
    // Handle the offline event
	ons.notification.toast('己離線', { timeout: 2000, animation: 'fall' });
	online = 0;
}
function onOnline() {
    // Handle the offline event
	initAd();	
	ons.notification.toast('己上線', { timeout: 2000, animation: 'fall' });
	online = 1;
	//alert('online');
}

function jquery_init() {
	
	/*var firebase = new Firebase("https://hotshipment-58244.firebaseio.com/Raymond");
	firebase.child("ticket").on("value", function(snapshot) {			
		//$("#varCurrBatch").text(snapshot.val());
		alert(snapshot.val());
		$("#currQueue").html(snapshot.val());
	});*/
	checkDB();
	var model	= device.model;
	var platform= device.platform;
	var uuid	= device.uuid;
	var pVersion= device.version;
	//alert(model+platform+pVersion+uuid);
	
	autocomplete(document.getElementById("cnty_code"), countries);
	
	$(document).on('prechange', function(e) {
		var tbrTitle	= event.tabItem.getAttribute("label");
		
		if (tbrTitle.toUpperCase() == "設定") {
			//admob.interstitial.show();
			
			if (localStorage.scan_station) {
				$("#scan_station").val(localStorage.scan_station);
			}
			//alert(localStorage.dbtime);
			var hkTime = Date.parse(localStorage.dbtime);
			var hkTime = new Date(hkTime);
			$("#dbVer").html(localStorage.dbversion);
			$("#dbTime").html(hkTime);
			$("#lastCheck").html(localStorage.lastCheck);
			if (localStorage.fb_signed_in) {
				$("#cloudDB").html('Signed In');
			} else {
				$("#cloudDB").html('Not Signed In');
			}
		}
		if (tbrTitle.toUpperCase()=="掃瞄") {
			
			/*$("#vibrator").click(function() {
				DF = window.plugins.deviceFeedback;
				DF.haptic(DF.VIRTUAL_KEY);
			});*/
			
			$("#stationID").html("");
			$("#scan_list").val("");
			
			var storedList	= [];
			
			if (localStorage.scan_station) {
				console.log(localStorage.scan_station);
				//$("#scan_item").focus();
				$("#stationID").html(localStorage.scan_station);

				if (localStorage.scannedList) {
					storedList = JSON.parse(localStorage.getItem("scannedList"));
					console.log(storedList);
					var htmlStoredList = "";
					
					for (i=0; i<storedList.length; i++){
						htmlStoredList += storedList[i] + "\n";
					}
					//htmlStoredList = storedList.replace(",", "\n");
					$("#scan_list").val(htmlStoredList);
				}

				var barcode = "";
				$(document).bind("keydown.scan", function(e){
					var key = String.fromCharCode(e.which);
					//alert(e.which);
					if (e.which=="13") {
						//alert(barcode);
						if (barcode.length==9 || barcode.length==13) {
							//alert(barcode.substring(2,11));
							if ((barcode.length==9 && !isNaN(barcode)) || (barcode.length==13 && !isNaN(barcode.substring(2,11)) && isNaN(parseInt(barcode.substring(0,2))))) {
								var bartxt = barcode;
								//$("#scan_item").val("");
								if (barcode.length==13) {
									bartxt = barcode.substring(2,11);
								}
								
								storedList = [];
									
								if (localStorage.scannedList) {
									storedList = JSON.parse(localStorage.getItem("scannedList"));
								}
								storedList.unshift(bartxt);
								htmlStoredList = "";
								for (i=0; i<storedList.length; i++){
									htmlStoredList += storedList[i] + "\n";
								}
								$("#scan_list").val(htmlStoredList);
								localStorage.setItem("scannedList", JSON.stringify(storedList));
							}
						}
						barcode = ""; bartxt = "";
					} else {
						if (e.which>=32 && e.which<=126){
							barcode = barcode + key;
						}
					}
				});
			} else {
				ons.notification.alert('請先在 "SETTINGS" 頁面設定 Station ID');
			}
		} else {
			$(document).unbind("keydown.scan");
			//$("#scan_item").unbind("keydown.scan");
		}
		
		if (online) {
			admob.banner.remove();
			admob.banner.prepare();
			admob.banner.show();
		}
	});
	
	$('.form-input').focus(function(){
		$(this).parents('.form-group').addClass('focused');
	});

	$('.form-input').blur(function(){
		var inputValue = $(this).val();
		if ( inputValue == "" ) {
			$(this).removeClass('filled');
			$(this).parents('.form-group').removeClass('focused');	
		} else {
			$(this).addClass('filled');
		}
	});
	
	$("#prod_code").click(function() {
		onsen.showService();
	});
	$("#rdy_time").click(function() {
		onsen.showRdyTime();
	});
	
	$('#btn_search').click(function() {
		var canvas	= document.getElementById('Shape_Result');
		var context = canvas.getContext('2d');
		context.clearRect(0,0, canvas.width, canvas.height);
		$("#handover_time").html("");
		
		var cnty_code	= $("#cnty_code").val();
		str = cnty_code.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			return letter.toUpperCase();
		});
		//alert(str);
		//console.log(str);
		if (!(str in countries)) {
			alert('Country cannot be found!');
			return false;
		}
		
		var cnty_code	= countries[str].toUpperCase();
		
		if ($("#post_code").prop('disabled')) {
			var post_code	= '-';
		} else {
			var post_code	= $("#post_code").val();
		}
		//var post_code	= $("#post_code").val();
		var prod_code	= $("#prod_code").val();
		var rdy_time	= $("#rdy_time").val();
		//var prod_code	= $( 'input[name=product]:checked' );
		//var rdy_time	= $( 'input[name=rdy_time]:checked' );
		
		if (cnty_code.length==0) {
			ons.notification.alert('Country cannot be empty!');
			return false;
		} else if (post_code.length==0) {
			ons.notification.alert('Postal Code cannot be empty!');
			return false;
		} else if (prod_code.length==0) {
			ons.notification.alert('Please select Product');
			return false;
		} else if (rdy_time.length==0) {
			ons.notification.alert('Please select Ready Time');
			return false;
		}
		
		if (prod_code=="Econ Exp") {
			prod_code 	= "IE";
		} else {
			prod_code 	= "IP";
		}
		
		getByTag(cnty_code, post_code, prod_code, rdy_time);
	});
	
	/*$("#btn_input").click(function() {
		ons
		.notification.prompt({ message: '請輸入提單號' })
		.then(function(name) {
			ons.notification.alert(name);
		});
	});*/
	$("#btn_type").click(function() {
		alert('click');
	});
	
	
	$("#scan_type").on("change", function(e) {
		//alert("change");
		//alert($("#scan_type").prop("checked"));
		if ($("#scan_type").prop("checked")==true) {
			ons.notification.confirm({
				message: 'Scan AWB?',
				callback: function(answer) {
				// Do something here.
					if (answer==1) {
						if ($("#scan_type").prop("checked")==true) {
							$("#scan_list").css({"background-color": "orange"});
							$("#lbl_scan_type").text(" **AWB** ");
						} else {
							$("#scan_list").css({"background-color": "white"});
							$("#lbl_scan_type").text("Package");
						}
					} else {
						$("#scan_type").prop("checked", false);
					}
				}
			});
		} else {
			ons.notification.confirm({
				message: 'Scan Package?',
				callback: function(answer) {
				// Do something here.
					if (answer==1) {
						if ($("#scan_type").prop("checked")==false) {
							$("#scan_list").css({"background-color": "white"});
							$("#lbl_scan_type").text("Package");
						} else {
							$("#scan_list").css({"background-color": "orange"});
							$("#lbl_scan_type").text(" **AWB** ");
						}
					} else {
						$("#scan_type").prop("checked", true);
					}
				}
			});
		}
	});
	$('#btn_input').numpad({
		target: $('#temp'),
		positionY: 'bottom',
		hidePlusMinusButton: true,
		hideDecimalButton: true,
		textDone: '輸入',
		textDelete: '退格',
		textClear: '清除',
		textCancel: '取消',
		onKeypadOpen: function() {
			$(this).find('.nmpd-display').val("");
		},
		onKeypadClose: function(){
			var barcode = $(this).find('.nmpd-display').val();
			
			/*if (inputVal) {
				storedList = [];
									
				if (localStorage.scannedList) {
					storedList = JSON.parse(localStorage.getItem("scannedList"));
				}
				storedList.unshift(inputVal);
				htmlStoredList = "";
				for (i=0; i<storedList.length; i++){
					htmlStoredList += storedList[i] + "\n";
				}
				
				$("#scan_list").val(htmlStoredList);
				localStorage.setItem("scannedList", JSON.stringify(storedList));
			}*/
			if (barcode.length==9 || barcode.length==13) {
				//alert(barcode.substring(2,11));
				if ((barcode.length==9 && !isNaN(barcode)) || (barcode.length==13 && !isNaN(barcode.substring(2,11)) && isNaN(parseInt(barcode.substring(0,2))))) {
					var bartxt = barcode;
					//$("#scan_item").val("");
					if (barcode.length==13) {
						bartxt = barcode.substring(2,11);
					}
					
					storedList = [];
						
					if (localStorage.scannedList) {
						storedList = JSON.parse(localStorage.getItem("scannedList"));
					}
					storedList.unshift(bartxt);
					htmlStoredList = "";
					for (i=0; i<storedList.length; i++){
						htmlStoredList += storedList[i] + "\n";
					}
					$("#scan_list").val(htmlStoredList);
					localStorage.setItem("scannedList", JSON.stringify(storedList));
				}
			}
		}
	});
	$('#btn_clear').click(function() {
		$("#cnty_code").val('');
		$("#post_code").val('');
		$("#post_code").prop('disabled', false);
		$("#cnty_code").removeClass('filled');
		$("#post_code").removeClass('filled');
		$("#prod_code").val('');
		$("#rdy_time").val('');
		$("#prod_code").removeClass('filled');
		$("#rdy_time").removeClass('filled');
		$(".form-group").removeClass('focused');
		$("#handover_time").html("");
		
		//$("input[type=radio]").prop('checked', false);
		
		var canvas	= document.getElementById('Shape_Result');
		var context = canvas.getContext('2d');
		
		context.clearRect(0,0, canvas.width, canvas.height);
	});
	
	$('#btn_scan_clear').click(function() {
		$("#scan_list").val("");
		scannedList = [];
		//scan_val = "";
		localStorage.setItem("scannedList","");
		ons.notification.alert("Scan List cleared!!!");
		//$("#scan_item").val("").focus();
	});
	$('#btn_scan_complete').click(function(e) {
		e.preventDefault();
		var user = firebase.auth().currentUser;
		scannedList	= localStorage.scannedList;
		
		if (scannedList.length) {
			ons.notification.confirm({
				message: 'Confirm to upload Scan Data?',
				callback: function(answer) {
				// Do something here.
					if (answer==1) {
						console.log(localStorage.scannedList);
						var stationID	= $("#stationID").html();		
						var batching	= $("#scan_type").prop("checked");
						if (batching==true) {
							batching	= 1;
						} else {
							batching	= 0;
						}
						writeScanData(stationID, scannedList, batching);
						
						$("#scan_list").val("");
						scannedList = [];
						//scan_val = "";
						localStorage.setItem("scannedList","");
						//ons.notification.toast('Scan Data Uploaded', { timeout: 2000, animation: 'fall' })
						ons.notification.alert("Scan List Uploaded!!!");
					}
				}
			});
		} else {
			ons.notification.alert('Scan List is empty!!!');
		}
		//$("#scan_item").val("").focus();
	});
	
	$('#btn_scan').click(function() {
		ons.disableDeviceBackButtonHandler();
		scanBarcode();
	});
	
}

function writeScanData(stationID, scannedList, batching) {
	data = {
		scannedList: scannedList,
		uplTime:firebase.database.ServerValue.TIMESTAMP
	};
	
	//firebase.database().ref('stations/' + stationID).childByAutoId().setValue(data);
	if (batching==1) {
		firebase.database().ref('batching/' + stationID).push().set(data);
	} else {
		firebase.database().ref('stations/' + stationID).push().set(data);
	}
}

function checkDB() {
	//alert(lastCheck + currDate + online);
	if (lastCheck != currDate && online==1) {
		//alert('first Check of Day');
		$.getJSON( "https://firebasestorage.googleapis.com/v0/b/hotshipment-58244.appspot.com/o/dbVersion.json", function( d ) {
			//alert(d.downloadTokens + " " + d.updated);
			
			$.getJSON( "https://firebasestorage.googleapis.com/v0/b/hotshipment-58244.appspot.com/o/dbVersion.json?alt=media&token="+d.downloadTokens, function( ver ) {
				cloudversion = ver.version;
				//alert('Cloud: '+cloudversion + ' Local: ' + currver);
				//alert(currver);
				
				if ((cloudversion-currver)==0) {
					loadDB();
					
				} else {
					
					$.getJSON( "https://firebasestorage.googleapis.com/v0/b/hotshipment-58244.appspot.com/o/masterdata.json", function( mdata ) {
						//alert(mdata.downloadTokens + " " + mdata.updated);
						var currdbtime	= mdata.updated;
						
						$.getJSON( "https://firebasestorage.googleapis.com/v0/b/hotshipment-58244.appspot.com/o/masterdata.json?alt=media&token="+mdata.downloadTokens, function( data ) {
							var hotColdData = data;
							var version = cloudversion;
							//alert(hotColdData[0]['k'] + " version:"+cloudversion);
							//var version = 10;
							
							try {
								//prefixes of implementation that we want to test
								window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
								
								//prefixes of window.IDB objects
								window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
								window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
								
								if (!window.indexedDB) {
									window.alert("Your browser doesn't support a stable version of IndexedDB.")
								}
								
								var request = window.indexedDB.open("QWHotColdDB", version);
								
								request.onerror = function(event) {
									//console.log("error: ");
									alert("error: "+request.error);
								};
								request.onsuccess = function(event) {
									db = request.result;
									localStorage.setItem("dbversion", cloudversion);
									localStorage.setItem("dbtime", currdbtime);
									localStorage.setItem("lastCheck", currDate);
									lastCheck	= currDate;
									currver		= cloudversion;
									
									hideModal();
									
									ons.notification.toast('數據更新完成', { timeout: 2000, animation: 'fall' })
								};	
								
								
								request.onupgradeneeded = function(event) {
									
									db = event.target.result;
									
									// Delete the old datastore.
									if (db.objectStoreNames.contains('QWHotColdMaster')) {
										db.deleteObjectStore('QWHotColdMaster');
									}
									
									var objectStore = db.createObjectStore("QWHotColdMaster", {keyPath: "i"});
									//objectStore.createIndex("country","country", {unique:false});
									//objectStore.createIndex("postal","postal", {unique:false,multiEntry:true});
									//objectStore.createIndex("product","product", {unique:false});
									objectStore.createIndex("combine","k", {unique:false,multiEntry:false});

									for (var i in hotColdData) {
										objectStore.add(hotColdData[i]);
									}
								};
								
							} catch(err) {
								//alert(err);
							}
						});
					});
				}
			});
		});
	} else {
		//alert('same day, no need to check');
		loadDB();
	}
}
function loadDB() {
	var version = localStorage.dbversion;
	
	try {
		//prefixes of implementation that we want to test
		window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		
		//prefixes of window.IDB objects
		window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
		window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
		
		if (!window.indexedDB) {
			window.alert("Your browser doesn't support a stable version of IndexedDB.")
		}
		
		
		var request = window.indexedDB.open("QWHotColdDB", version);
		
		
		request.onerror = function(event) {
			console.log("error: ");
		};
		request.onsuccess = function(event) {
			db = request.result;
			
			localStorage.setItem("lastCheck", currDate);
			lastCheck	= currDate;
			
			hideModal();
			
			ons.notification.toast('資料庫載入完成', { timeout: 2000, animation: 'fall' })
		};		
		
	} catch(err) {
		
	}
}

function getByTag(cnty_code, post_code, prod_code, rdy_time) {
	//e.preventDefault();
	var d = new Date();
	var weekday = new Array(7);
	weekday[0] = "sun";
	weekday[1] = "mon";
	weekday[2] = "tue";
	weekday[3] = "wed";
	weekday[4] = "thu";
	weekday[5] = "fri";
	weekday[6] = "sat";

	var dayWave = {"mon1230":"A","mon1730":"B","mon1930":"C","tue1230":"D","tue1730":"E","tue1930":"F",
					 "wed1230":"G","wed1730":"H","wed1930":"I","thu1230":"J","thu1730":"K","thu1930":"L",
					 "fri1230":"M","fri1730":"N","fri1930":"O","sat1230":"P","sat1730":"Q","sat1930":"R"};
	
	var combineKey = cnty_code + post_code + prod_code.substring(1,2);
	
	var dayWeek = weekday[d.getDay()];

	var transaction = db.transaction(["QWHotColdMaster"], "readonly");
	var objectStore = transaction.objectStore("QWHotColdMaster");
	var index = objectStore.index("combine");
	
	var counter = 0;
	
	var rangeTest = IDBKeyRange.only(combineKey);
	index.openCursor(rangeTest).onsuccess = function(e) {
		var cursor = e.target.result;
		
		if (cursor == null) {
			console.log('no match');
			var combineKey = cnty_code + post_code.substring(0,3) + prod_code.substring(1,2);
			console.log(combineKey);
			
			var transaction = db.transaction(["QWHotColdMaster"], "readonly");
			var objectStore = transaction.objectStore("QWHotColdMaster");
			var index = objectStore.index("combine");
			
			var counter = 0;
			
			var rangeTest = IDBKeyRange.only(combineKey);
			index.openCursor(rangeTest).onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor == null) {
						console.log('prefix3 no match');
						var combineKey = cnty_code + '-' + prod_code.substring(1,2);
						console.log(combineKey);
						
						var transaction = db.transaction(["QWHotColdMaster"], "readonly");
						var objectStore = transaction.objectStore("QWHotColdMaster");
						var index = objectStore.index("combine");
						
						var counter = 0;
						
						var rangeTest = IDBKeyRange.only(combineKey);
						index.openCursor(rangeTest).onsuccess = function(e) {
							var cursor = e.target.result;
							console.log(cursor);
							if (cursor == null) {
								ons.notification.alert('No this Postal Code in DB');
							} else {
								if (cursor) {
									console.log(dayWave[dayWeek+rdy_time]);
									console.log(cursor.value[dayWave[dayWeek+rdy_time]]);
									result = cursor.value[dayWave[dayWeek+rdy_time]];
									
									show_result(result);
								}
							}
						}
				} else {
					if (cursor) {
						result = cursor.value[dayWave[dayWeek+rdy_time]];
						
						show_result(result);
					}
				}
			}
		} else {
			if (cursor) {
				result = cursor.value[dayWave[dayWeek+rdy_time]];
				
				show_result(result);
			}
		}
	}
}


function clearData() {
	console.log('clear all start');
	// open a read/write db transaction, ready for clearing the data
	var transaction = db.transaction(["QWHotColdMaster"], "readwrite");

	// report on the success of the transaction completing, when everything is done
	transaction.onsuccess = function(event) {
		console.log('Transaction completed.');
	};

	transaction.onerror = function(event) {
		console.log('Transaction not opened due to error: ' + transaction.error);
	};

	// create an object store on the transaction
	var objectStore = transaction.objectStore("QWHotColdMaster");

	// Make a request to clear all the data out of the object store
	var objectStoreRequest = objectStore.clear();

	objectStoreRequest.onsuccess = function(event) {
		// report the success of our request
		console.log('Request successful.');
	};
}

function show_result(result) {
	//alert(result);
	var shape	= result.substring(0,1);
	var wave	= result.substring(1,2);
	//alert(wave);
	
	var shapeStore = new Array(3);
	shapeStore['R'] = "red";
	shapeStore['Y'] = "yellow";
	shapeStore['B'] = "blue";
	shapeStore['G'] = "green";
	if (wave=="n") {
		wave = "";
	}
	
	var canvas	= document.getElementById('Shape_Result');
	var context = canvas.getContext('2d');
	
	if (shape=="N") {
		context.fillStyle = "red";
		context.textAlign = "center";
		context.fillText("沒有服務",canvas.width/2,canvas.height/2);
	} else {
		context.clearRect(0,0, canvas.width, canvas.height);
		var centerX = canvas.width / 2;
		var centerY = canvas.height / 2;
		var radius	= 35;
		
		context.beginPath();
		
		if (shape=="R") {
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			$("#handover_time").html("請於今天 22:30 前交貨件到(Hub)");
		} else if (shape=="B" && !isNaN(wave)) {			
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			$("#handover_time").html("請於今天 14:30 前交貨件到(Hub)");
		} else if (shape=="G") {
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			$("#handover_time").html("請於今天 20:30 前交貨件到(Hub)");
		} else if (shape=="Y") {
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			$("#handover_time").html("請於今天 20:30 前交貨件到(Hub)");
		} else if (shape=="B" && wave=="k") {
			context.fillStyle = "blue";
			context.font = "40px Arial";
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText("不用貼",canvas.width/2,canvas.height/2);
			$("#handover_time").html("請於今天 22:30 前交貨件到(Hub)");
			/*context.moveTo(centerX-40, 4);
			context.lineTo(centerX+40, 4);
			context.lineTo(centerX+40, 80);
			context.lineTo(centerX-40, 80);
			context.closePath();*/
		} else {
			$("#handover_time").html("請於今天 22:30 前交貨件到(Hub)");			
		}
		context.fillStyle = shapeStore[shape];
		context.fill();
			if (wave=="1" || wave=="2" || wave=="3") {
				context.fillStyle = 'black';
				context.font = "40px Arial";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText(wave,canvas.width/2,canvas.height/2);
			}
		context.lineWidth = 5;
		context.strokeStyle = '#003300';
		context.stroke();
	}
	
}
	

function scanBarcode() {
	cordova.plugins.barcodeScanner.scan(
		function(result) {
			var barcode = result.text;
			
			if (barcode.length) {
				//navigator.notification.beep(1);
				//$("#vibrator").click();
				
				DF = window.plugins.deviceFeedback;
				DF.haptic(DF.VIRTUAL_KEY);

				/*storedList = [];
									
				if (localStorage.scannedList) {
					storedList = JSON.parse(localStorage.getItem("scannedList"));
				}
				storedList.unshift(result.text);
				htmlStoredList = "";
				for (i=0; i<storedList.length; i++){
					htmlStoredList += storedList[i] + "\n";
				}
				
				$("#scan_list").val(htmlStoredList);
				localStorage.setItem("scannedList", JSON.stringify(storedList));*/
				
				if (barcode.length==9 || barcode.length==13) {
					//alert(barcode.substring(1,2));
					//alert(isNaN(parseInt(barcode.substring(1,2))));
					if ((barcode.length==9 && !isNaN(barcode)) || (barcode.length==13 && !isNaN(barcode.substring(2,11)) && isNaN(parseInt(barcode.substring(0,2))))) {
						var bartxt = barcode;
						//$("#scan_item").val("");
						if (barcode.length==13) {
							bartxt = barcode.substring(2,11);
						}
						
						storedList = [];
							
						if (localStorage.scannedList) {
							storedList = JSON.parse(localStorage.getItem("scannedList"));
						}
						storedList.unshift(bartxt);
						htmlStoredList = "";
						for (i=0; i<storedList.length; i++){
							htmlStoredList += storedList[i] + "\n";
						}
						$("#scan_list").val(htmlStoredList);
						localStorage.setItem("scannedList", JSON.stringify(storedList));
					}
				}
				
				
				
				
				/*if (localStorage.scannedList) {
					storedList = JSON.parse(localStorage.getItem("scannedList"));
				}
				storedList.push(result.text);
				console.log(storedList);
				localStorage.setItem("scannedList", JSON.stringify(storedList));
				
				$("#scan_list").append(result.text+"<br>");*/
			}
			
			if( !result.cancelled ) {
				scanBarcode();
			} else {
				ons.enableDeviceBackButtonHandler();
			}
		},
		function(error) {
			alert("Scanning failed: " + error);
		},
		{
			resultDisplayDuration: 0,
			torchOn: false
			//showTorchButton : true
		}
	);
}

function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function(e) {
		
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		
		/*for each item in the array...*/
		for (var i in arr) {
			//for (i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (i.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + i.substr(0, val.length) + "</strong>";
				b.innerHTML += i.substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				//b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "' data-val='"+ i +"'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
					/*insert the value for the autocomplete text field:*/
					//inp.value = this.getElementsByTagName("input")[0].value;
					inp.value = this.getElementsByTagName("input")[0].getAttribute('data-val');
					/*close the list of autocompleted values,
					(or any other open lists of autocompleted values:*/
					closeAllLists();
					
					var canvas	= document.getElementById('Shape_Result');
					var context = canvas.getContext('2d');
					
					context.clearRect(0,0, canvas.width, canvas.height);
					
					$("#handover_time").html("");
		
					if(!postal_cnty.includes(inp.value)) {
						$("#post_code").val("");
						$("#post_code").prop('disabled', true);
					} else {
						$("#post_code").val("");
						$("#post_code").prop('disabled', false);
					}
				});
				a.appendChild(b);
			}
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
			increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) { //up
			/*If the arrow UP key is pressed,
			decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (x) x[currentFocus].click();
			}
		}
	});
	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}
function showModal() {
	var modal = document.querySelector('ons-modal');
	modal.show();
}
function hideModal() {
	var modal = document.querySelector('ons-modal');
	modal.hide();
}

function save_settings(target, value) {
	localStorage.setItem(target, value);
	
	ons.notification.toast('設定儲存成功', { timeout: 2000, animation: 'fall' })
}

var onsen = {};
onsen.showService = function () {
	ons.openActionSheet({
		title: 'Service',
		cancelable: true,
		buttons: [
			'Special Express',
			'9:00 Express (09:00 AM)',
			'10:00 Express (10:00 AM)',
			'12:00 Express (Noon)',
			'Express (15D, 15N)',
			'Economy Express (EE, ND)',
			'Others',
			{
				label: 'Cancel',
				icon: 'md-close'
			}
		]
	}).then(function (index) {
		if (index==0) {
			$("#prod_code").parent().addClass('focused');
			$("#prod_code").val('Sp Exp');
			$("#prod_code").addClass('filled');

		} else if (index==1) {
			$("#prod_code").parent().addClass('focused');
			$("#prod_code").val('9AM');
			$("#prod_code").addClass('filled');
		} else if (index==2) {
			$("#prod_code").parent().addClass('focused');
			$("#prod_code").val('10AM');
			$("#prod_code").addClass('filled');
		} else if (index==3) {
			$("#prod_code").parent().addClass('focused');
			$("#prod_code").val('Noon');
			$("#prod_code").addClass('filled');
		} else if (index==4) {
			$("#prod_code").parent().addClass('focused');
			$("#prod_code").val('15D/N');
			$("#prod_code").addClass('filled');
		} else if (index==5) {
			$("#prod_code").parent().addClass('focused');
			$("#prod_code").val('Econ Exp');
			$("#prod_code").addClass('filled');
		} else if (index==6) {
			$("#prod_code").parent().addClass('focused');
			$("#prod_code").val('Others');
			$("#prod_code").addClass('filled');
		}
	});
};
onsen.showRdyTime = function () {
	ons.openActionSheet({
		title: 'Ready Time',
		cancelable: true,
		buttons: [
			'1230',
			'1730',
			'1930',
			{
				label: 'Cancel',
				icon: 'md-close'
			}
		]
	}).then(function (index) {
		if (index==0) {
			$("#rdy_time").parent().addClass('focused');
			$("#rdy_time").val('1230');
			$("#rdy_time").addClass('filled');

		} else if (index==1) {
			$("#rdy_time").parent().addClass('focused');
			$("#rdy_time").val('1730');
			$("#rdy_time").addClass('filled');
		} else if (index==2) {
			$("#rdy_time").parent().addClass('focused');
			$("#rdy_time").val('1930');
			$("#rdy_time").addClass('filled');
		}
	});
};

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
	
	if (states[networkState]=='No network connection') {
		return 0;
	} else {
		return 1;
	}
    //alert('Connection type: ' + states[networkState]);
}
	 
