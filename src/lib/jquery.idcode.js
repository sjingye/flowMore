/**
 * idcode 1.0 - validate user.
 * Version 1.0
 * @requires jQuery v1.2
 * author ehong[idehong@gmail.com]
 **/

/**
 * @example: $.idcode.setCode();	
 * @desc: Make a validate code append to the element that id is idcode.
 *
 * @example $.idcode.validateCode();	
 * @desc return true if user input value equal idcode. 
 **/
 
(function($){
	var settings = {
			e	 		: 'idcode',
			codeType 	: { name : 'follow', len: 4},
			codeTip		: '',
			inputID		: 'Txtidcode'
		};
	
	var _set = {
		storeLable  : 'codeval',
		store		: '#ehong-code-input',
		codeval		: '#ehong-code'
	}
	$.idcode = {
		getCode:function(option){
			_commSetting(option);
			return _storeData(_set.storeLable, null);
		},
		setCode:function(option){
			_commSetting(option);
			_setCodeStyle("#"+settings.e, settings.codeType.name, settings.codeType.len);
			
		},
		validateCode:function(option){
			_commSetting(option);
			var inputV;
			if(settings.inputID){
				inputV=$('#' + settings.inputID).val();
			}else{
				inputV=$(_set.store).val();
			}
			
			if(inputV.toLowerCase() == _storeData(_set.storeLable, null).toLowerCase()){
				return true;
			}else{
				_setCodeStyle("#"+settings.e, settings.codeType.name, settings.codeType.len);				
				return false;
			}
		}
	};
	
	function _commSetting(option){
		$.extend(settings, option);		
	}
	
	function _storeData(dataLabel, data){
		var store = $(_set.codeval).get(0);			
		if(data){
			$.data(store, dataLabel, data);			
		}else{
			return $.data(store, dataLabel);			
		}
	}
	
	function _setCodeStyle(eid, codeType, codeLength){
		var codeObj = _createCode(settings.codeType.name, settings.codeType.len);		
		var randNum = Math.floor(Math.random()*6);
		var htmlCode=''
		if(!settings.inputID){
			 var language = $("#language").val();
			 if (language == "en") {
				 htmlCode='<input id="ehong-code-input" class ="logup-inp-phone-code logup-inp-1 form-control" name="ehong-code-input" type="text" placeholder="vertificationCode" maxlength="4" onchange="checkidcode();" />';
			   } else {
				 htmlCode='<input id="ehong-code-input" class ="logup-inp-phone-code logup-inp-1 form-control" name="ehong-code-input" type="text" placeholder="请输入验证码" maxlength="4" onchange="checkidcode();" />';
			   }
		}
		htmlCode+='<div id="ehong-code" class="form-button" style="font-size:35px"';
		htmlCode+=String(randNum);
		htmlCode+='" href="#" onblur="return false" onfocus="return false" oncontextmenu="return false" onclick="$.idcode.setCode()">' + _setStyle(codeObj) + '</div>';
		$(eid).html(htmlCode);
		_storeData(_set.storeLable, codeObj);		
	}
	
	function _setStyle(codeObj){
		var fnCodeObj = new Array();
		var col = new Array('#BF0C43', '#E69A2A','#707F02','#18975F','#BC3087','#73C841','#780320','#90719B','#1F72D8','#D6A03C','#6B486E','#243F5F','#16BDB5');
		var charIndex;
	   	for(var i=0;i<codeObj.length;i++){		
			charIndex = Math.floor(Math.random()*col.length);
			var stylev =
				"display:inline-block;color:" + col[charIndex] + ";transform:rotate(" + randint(-50, 50) + "deg);" +
				"-ms-transform:rotate(" + randint(-50, 50) + "deg);" +
				"-moz-transform:rotate(" + randint(-50, 50) + "deg);" +
				"-webkit-transform:rotate(" + randint(-50, 50) + "deg);" +
				"-o-transform:rotate(" + randint(-50, 50) + "deg);" +
				"font-weight:" + randint(400, 900) + ";";
			var stylevb = "position:absolute;width:" + randint(0, 50) + "%;height:1px;" +
				"left:" + randint(0, 50) + "%;" +
				"top:" + randint(30, 70) + "%;" +
				"display:inline-block;background:" + col[randint(0, col.length - 1)] + ";" +
				"transform:rotate(" + randint(-50, 50) + "deg);" +
				"-ms-transform:rotate(" + randint(-50, 50) + "deg);" +
				"-moz-transform:rotate(" + randint(-50, 50) + "deg);" +
				"-webkit-transform:rotate(" + randint(-50, 50) + "deg);" +
				"-o-transform:rotate(" + randint(-50, 50) + "deg);";
			fnCodeObj.push('<font style="' + stylev + '" >' + codeObj.charAt(i) + '</font>');
			fnCodeObj.push('<div style="' + stylevb + '" ></div>');
		}
		return fnCodeObj.join('');		
	}
	function _createCode(codeType, codeLength){
	   var codeObj;
	   if(codeType=='follow'){
		   codeObj = _createCodeFollow(codeLength);
	   }else if(codeType=='calc'){
		   codeObj = _createCodeCalc(codeLength);
	   }else{
		   codeObj="";
	   }
	   return codeObj;   
	 }
	
	function randint(n, m) {
		var c = m - n + 1;
		var num = Math.random() * c + n;
		return Math.floor(num);
	}
	 
	 function _createCodeCalc(codeLength){
	   var code1, code2, codeResult;
	   var selectChar = new Array('0','1','2','3','4','5','6','7','8','9');	
	   var charIndex;
	   for(var i=0;i<codeLength;i++){		
		   charIndex = Math.floor(Math.random()*selectChar.length);
		   code1 +=selectChar[charIndex];
		   
		   charIndex = Math.floor(Math.random()*selectChar.length);
		   code2 +=selectChar[charIndex];		   
	   }
	   return [parseInt(code1), parseInt(code2) , parseInt(code1) + parseInt(code2)] ;
	 }
	 
	 function _createCodeFollow(codeLength){
	   var code = "";
	   var selectChar = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
		
	   for(var i=0;i<codeLength;i++){		
		   var charIndex = Math.floor(Math.random()*selectChar.length);
		   if(charIndex % 2 == 0){
			   code+=selectChar[charIndex].toLowerCase();
		   }else{
			   code +=selectChar[charIndex];
		   }	   
	   }
	   return code;
	 }
   
})(jQuery);