
$(function () {

	$("#f_div").hide();


	var zddmQO1 = $("#zddmQO1") // 身份证号码
	var yanzhm = $("#yanzhm") // 验证码
	var yanzhmpic = $("#yanzhmpic") // 验证码图片
	var btnQuery = $(".btnQuery") // 查询按钮

	var recombine = "<ul> \
                    <li class='zddmQO1'>身份证号码:</li> \
                    <li class='yanzhm'>验证码:</li> \
                    <li class='query'>查询:</li> \
                    </ul>";

	// $("form").prepend(recombine);
	// $("form .zddmQO1").append(zddmQO1);
	// $("form .yanzhm").append(yanzhm);
	// $("form .yanzhm").append(yanzhmpic);
	// $("form .query").append(btnQuery);


	var message = $("#message").text();
	message = $.trim(message);

	var childTable = $("table");
	// childTable.hide();

	if (message.length > 0) {
		console.log(message);
		return;
	}


	$.each(childTable, function (i, n) {
		if (i == 2 || i == 4) {
			$(n).hide();
		}

		console.log(n);
		if (i == 11) {
			// 证书编号表格，如果对方网站更新，需要根据具体实施细节调整
			var certTrs = $(n).find("tr");
			var certData = [];
			$.each(certTrs, function (innerI, innerN) {
				if (innerI >= 3) {
					var certTds = $(innerN).find("td");
					var d = {
						certNo: $.trim(certTds.eq(0).text()),//证书编码
						certName: $.trim(certTds.eq(2).text()),// 姓名
						certDate: $.trim(certTds.eq(3).text()),// 签发日期
						expireDate: $.trim(certTds.eq(4).text()),// 失效日期
						certStatus: $.trim(certTds.eq(5).text()),// 证书状态
						certOrgan: $.trim(certTds.eq(6).text())// 签发机构
					};
					certData.push(d);
				}
			});
			// 这里写入回调
			console.log(certData);
			alert(JSON.stringify(certData));
		}
	});
});




















/**
 * 删除字符串两侧的空格,返回的是删除两侧空格的字符串
 * 
 * @param str
 *            待处理的字符串
 */
function trim(str) {
	if (str == null || str == "")
		return "";
	return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
};

/**
 * 给指定的元素e1的eventName指定的事件，增加事件侦听器
 */
function _addEventListener(el, eventName, func) {
	// DOM2
	if (typeof el.addEventListener != "undefined")
		el.addEventListener(eventName, func, false);
	// IE
	else if (typeof el.attachEvent != "undefined")
		el.attachEvent("on" + eventName, func);
	// other
	else {
		if (el["on" + eventName] != null) {
			var old = el["on" + eventName];
			el["on" + eventName] = function (e) {
				old(e);
				func();
			};
		} else
			el["on" + eventName] = func;
	}
};

/**
 * 把目标字符串，根据指定的分割符分解为字符串数组
 * 
 * @param targetString
 *            目标字符串
 * @param seperator
 *            分割符
 * @parem return Array 被分割的字符串数组
 */
function splitString(targetString, seperator) {
	if (targetString == null || trim(targetString) == "") {
		return new Array();
	}

	var resultStrs = new Array();
	var singleStatement = "";
	var fromIndex = 0;
	var endIndex = 0;
	var breakFor = false;
	while (fromIndex < targetString.length) {
		endIndex = targetString.indexOf(seperator, fromIndex);
		if (endIndex == -1) {
			endIndex = targetString.length;
			breakFor = true;
		}
		singleStatement = targetString.substring(fromIndex, endIndex);
		if (singleStatement.indexOf("(") > 0) { // 处理内嵌函数并且有参数的问题
			var bracketClosed = 0;
			for (var i = 0; i < singleStatement.length; i++) {
				var charAtI = singleStatement.charAt(i);
				if (charAtI == '(') {
					bracketClosed++;
				} else if (charAtI == ')') {
					bracketClosed--;
				}
			}
			if (bracketClosed != 0) {
				for (var i = endIndex; i < targetString.length; i++) {
					var charAtI = targetString.charAt(i);
					if (charAtI == '(') {
						bracketClosed++;
					} else if (charAtI == ')') {
						bracketClosed--;
					}
					if (bracketClosed == 0) {
						endIndex = i + 1;
						singleStatement = targetString.substring(fromIndex,
							endIndex);
						break;
					}
				}
			}
			if (bracketClosed != 0)
				alert("TargetString '" + targetString
					+ "' inner function is invalid!");
		}
		if (singleStatement != null && !trim(singleStatement) == "") {
			resultStrs.push(singleStatement);
		}
		fromIndex = endIndex + 1;
		if (breakFor) {
			break;
		}
	}
	return resultStrs;
};

// 特殊字符，通过charCodeAt(index)方法不能判断出是占两位空间的。将来有更好的处理方式时进行完善
var specialCharacter = "×§·";
/**
 * 得到字符串的byte长度
 */
function stringCharLength(str) {
	var len = str.length;
	var num = 0;
	for (i = 0; i < len; i++) {
		var tmp = str.charCodeAt(i);
		// alert(tmp);
		if (tmp <= 255) {
			var temp = str.charAt(i);
			if (specialCharacter.indexOf(temp) >= 0) {
				num = num + 2;
			} else {
				num++;
			}
		} else
			num = num + 2;
	}
	return num;
}

// //////////////////////////////////////////////////////////////////
// //START 键盘码判断
// //////////////////////////////////////////////////////////////////
/**
 * 判断键盘输入是否数字键
 * 
 * @param keyCode
 *            输入的键值
 */
function isNumber(keyCode) {
	if (((keyCode >= 48 && keyCode <= 57) && (window.event.shiftKey == false))
		|| (keyCode >= 96 && keyCode <= 105))
		return true;
	return false;
}

function isCopy(keyCode) {
	if (window.event.ctrlKey == true && keyCode == 67)
		return true;
	return false;
}

function isPaste(keyCode) {
	if (window.event.ctrlKey == true && keyCode == 86)
		return true;
	return false;
}
/**
 * 判断键盘输入是否是26个字母
 * 
 * @param keyCode
 *            输入的键值
 */
function isLetter(keyCode) {
	if (keyCode >= 65 && keyCode <= 90)
		return true;
	return false;
}

/**
 * 判断键盘输入是否为光标移动处理
 * 
 * @param keyCode
 *            输入的键值
 */
function isCursorCtrl(keyCode) {
	if (keyCode >= 33 && keyCode <= 40)
		return true;
	return false;
}

/**
 * 判断键盘输入是否为+号
 * 
 * @param keyCode
 *            输入的键值
 */
function isPlusSign(keyCode) {
	if ((keyCode == 187 || keyCode == 107) && window.event.shiftKey == true)
		return true;
	return false;
}
/**
 * 判断键盘输入是否为-号
 * 
 * @param keyCode
 *            输入的键值
 */
function isSubtractionSign(keyCode) {
	if ((keyCode == 109 || keyCode == 189) && window.event.shiftKey == false)
		return true;
	return false;
}

/**
 * 判断键盘输入是否为.号
 * 
 * @param keyCode
 *            输入的键值
 */
function isDotSign(keyCode) {
	if (keyCode == 110 || keyCode == 190)
		return true;
	return false;
}
/**
 * 判断键盘输入是否为Tab键
 * 
 * @param keyCode
 *            输入的键值
 */
function isTab(keyCode) {
	if (keyCode == 9)
		return true;
	return false;
}
/**
 * 判断键盘输入是否为回车键
 * 
 * @param keyCode
 *            输入的键值
 */
function isEnter(keyCode) {
	if (keyCode == 13)
		return true;
	return false;
}
/**
 * 判断键盘输入是否为退格键
 * 
 * @param keyCode
 *            输入的键值
 */
function isBackspace(keyCode) {
	if (keyCode == 8)
		return true;
	return false;
}
/**
 * 判断键盘输入是否为删除键
 */
function isDelete(keyCode) {
	if (keyCode == 46)
		return true;
	return false;
}
// ////////////结束键盘输入判断

/**
 * 把回车键转换为Tab键
 */
function enterToTab() {
	if (window.event.keyCode == 13)
		window.event.keyCode = 9;
}

function isEscape(keyCode) {
	if (keyCode == 27)
		return true;
	return false;
}

/**
 * 是否为全数字字符串
 */
function isDigitStr(s) {
	var patrn = /^(\d+)$/;
	if (!patrn.exec(s))
		return false;
	return true;
};

function IValidator(id, label, emptyExp, format, scopeExp, disabledExp,
	readonlyExp, calculateExp) {
	this.errorInfor = "";
	this.id = id;
	this.label = label;
	this.format = format;

	this.emptyExp = emptyExp;
	this.empty = (emptyExp == null || emptyExp == "" || emptyExp == "true") ? "true"
		: emptyExp;

	this.disabledExp = disabledExp;
	this.disabled = (disabledExp == null || disabledExp == "" || disabledExp == "false") ? "false"
		: disabledExp;

	this.readonlyExp = readonlyExp;
	this.readonly = (readonlyExp == null || readonlyExp == "" || readonlyExp == "false") ? "false"
		: readonlyExp;

	this.calculateExp = calculateExp;

	this.scopeExp = scopeExp;
	this.scope = this.scopeExp;

	this.listeners = new Array();
	this.listenersMap = new Object();
	this.dependents = new Array();

}
IValidator.prototype.setEmpty = function (empty) {
	this.empty = (!empty || empty == "") ? "false" : empty;
	this.doNotifierChange();
};
IValidator.prototype.setDisabled = function (disabled) {
	this.disabled = (!disabled || disabled == "") ? "false" : disabled;
	this.doNotifierChange();
};
IValidator.prototype.setReadonly = function (readonly) {
	this.readonly = (!readonly || readonly == "") ? "false" : readonly;
	this.doNotifierChange();
};
IValidator.prototype.setValidatorGroup = function (validatorGroup) {
	this.validatorGroup = validatorGroup;
};

IValidator.prototype.addListener = function (listener) {
	if (this.listenersMap[listener.id] == null) { // 防止重复注册
		this.listenersMap[listener.id] = listener.id;
		this.listeners.push(listener);
		listener.dependents.push(this);
	}
};

/**
 * 得到所有的受当前对象变化顺序影响的所有对象 listener 受当前对象变化顺序影响的所有对象 listenerMap 受当前对象变化影响的所有对象的映射
 */
IValidator.prototype.fetchListenerCascade = function (listener, listenerMap) {
	// 防止重复处理。
	if (listenerMap[this.id] != null)
		return;

	// 递归之前记录，可以防止循环引用导致的死循环。
	listenerMap[this.id] = this;

	if (this.listeners.length == 0) {
		listener.push(this);
		return;
	}
	for (var i = 0; i < this.listeners.length; i++) {
		this.listeners[i].fetchListenerCascade(listener, listenerMap);
	}
	listener.push(this);
};

/**
 * 得到该对象所依赖的所有的其它对象 validators 该对象依赖的所有其它对象 validatorMap 该对象依赖的所有其它对象的映射
 */
IValidator.prototype.fetchThisDependentCascade = function (validators,
	validatorMap) {
	// 防止重复处理。
	if (validatorMap[this.id] != null)
		return;

	// 递归之前记录，可以防止循环引用导致的死循环。
	validatorMap[this.id] = this;

	if (this.dependents.length == 0) {
		validators.push(this);
		return;
	}
	var len = this.dependents.length;
	for (var i = 0; i < len; i++) {
		this.dependents[i].fetchThisDependentCascade(validators, validatorMap);
	}
	validators.push(this);
};

IValidator.prototype.notify = function () {
	if (this.listeners.length == 0)
		return;

	var listenersCascade = new Array();
	var listenersCascadeMap = new Object();
	this.fetchListenerCascade(listenersCascade, listenersCascadeMap);

	while (true) {
		var listener = listenersCascade.pop();
		if (listener == null)
			break;
		listener.doNotifierChange();
	}
};
/**
 * 设置错误信息
 */
IValidator.prototype.setErrorInfor = function (errorInfor) {
	this.errorInfor = errorInfor;
};

IValidator.pattern = /[&\$]([a-zA-Z_0-9]+)/g;
IValidator.pattern2 = /[&\$]([a-zA-Z_0-9]+)/;

IValidator.prototype.parseAndAttachNotifiers = function (expression) {
	if (expression == null || expression == "" || expression == "true"
		|| expression == "false")
		return expression;
	var returnValue = expression;

	var token = IValidator.pattern.exec(expression); // get the first match
	while (token != null) {
		var notifier = this.validatorGroup.validatorMap[token[1]];
		if (notifier != null) { // 存在对应的Validator
			notifier.addListener(this);

			var replaceString = "ValidatorGroup.getValidator('"
				+ this.validatorGroup.name + "','$1').getValue()";
			returnValue = returnValue.replace(IValidator.pattern2,
				replaceString);
		} else { // 处理radio或checkbox的侦听
			var groupObj;
			var validatorObj = this.validatorGroup.validatorMap[token[1]];
			if (validatorObj)
				groupObj = validatorObj.controller;
			else
				groupObj = document.getElementById(token[1]);

			if (groupObj == null) {
				alert("表达式\"" + expression + "\"定义的\"" + token[1]
					+ "\"标示的Html元素不存在");
			} else {
				if (groupObj.length != null) {
					groupObj[0].validator.addListener(this);
					var replaceString = "ValidatorGroup.getValidator('"
						+ this.validatorGroup.name
						+ "','$1').controller[0].value";
					returnValue = returnValue.replace(pattern2, replaceString);
				} else {
					var replaceString = "ValidatorGroup.getValidator('"
						+ this.validatorGroup.name
						+ "','$1').controller.value";
					returnValue = returnValue.replace(pattern2, replaceString);
				}
			}
		}
		token = IValidator.pattern.exec(expression); // get the next match
	}
	return returnValue;
};

IValidator.prototype.processStrIndex = function (str, index) {
	if (str == null)
		return str;
	if (index == null)
		return str;
	var replaceRegx = /(_\d+_)/g;
	str = str.replace(replaceRegx, "_" + index + "_");
	replaceRegx = /(\[\d+\])/g;
	str = str.replace(replaceRegx, "[" + index + "]");
	return str;
};

/**
 * 建立empty及disable表达式中的Listen/notify机制，进行表达式预处理
 */
IValidator.prototype.doInitNotifier = function () {
	this.empty = this.parseAndAttachNotifiers(this.empty);
	this.disabled = this.parseAndAttachNotifiers(this.disabled);
	this.readonly = this.parseAndAttachNotifiers(this.readonly);
	this.calculateExp = this.parseAndAttachNotifiers(this.calculateExp);
};
/**
 * 事件发生对象的数值发生了变化
 */
IValidator.prototype.doNotifierChange = function () {
};
IValidator.prototype.beforeSubmit = function () {
	return true;
};
IValidator.prototype.focusController = function () {
};

IValidator.prototype.getStrValue = function () {
	return "";
};
IValidator.prototype.getValue = function () {
	return this.getStrValue();
};

IValidator.prototype.validateEmpty = function () {
	return true;
};
IValidator.prototype.validate = function () {
	return true;
};

IValidator.prototype.calculate = function () {
	return eval(this.calculateExp);
};
IValidator.prototype.doFormat = function () {
	return;
};
IValidator.prototype.getErrorInfor = function () {
	return this.errorInfor;
};
IValidator.prototype.validateScope = function () {
	return true;
};
IValidator.prototype.valueChanged = function () {
	return false;
};
IValidator.prototype.doInitOldValue = function () {
};
IValidator.prototype.clear = function () {
};
IValidator.prototype.clone = function (id, index) {
	var label = this.label;
	var emptyExp = this.processStrIndex(this.emptyExp, index);
	var format = this.format;
	var scopeExp = this.processStrIndex(this.scopeExp, index);
	var disabledExp = this.processStrIndex(this.disabledExp, index);
	var readonlyExp = this.processStrIndex(this.readonlyExp, index);
	var calculateExp = this.processStrIndex(this.calculateExp, index);
	return new this.constructor(id, label, emptyExp, format, scopeExp,
		disabledExp, readonlyExp, calculateExp);
};

// 一个界面中有多个form, 每个form有多种提交方式, 不同的提交方式需要校验的内容不同,如保存\查询删除
// 所有Validator类型的父类,其中empty及disabled的语法格式为 &style=value&&&styleId2=value
function Validator(id, label, empty, format, scope, disabled, readonly,
	calculateExp) {
	this.IValidator = IValidator;
	this.IValidator(id, label, empty, format, scope, disabled, readonly,
		calculateExp);
	if (id == null || id == "")
		return;
	this.controller = document.getElementById(id);

	if (this.controller != null && this.controller.validator == null) { // 重写相关的鼠标或键盘事件处理
		this.controller.validator = this; // 把当前控制对象作为controller对象的validator属性
		this.controller.validatoronkeydownold = this.controller.onkeydown;
		this.controller.validatoronblurold = this.controller.onblur;
		this.controller.validatoronfocusold = this.controller.onfocus;
		this.controller.validatoronchangeold = this.controller.onchange;
		this.controller.validatoronpaste = this.controller.onpaste;
		this.controller.validatorondrop = this.controller.ondrop;
		this.oldValue = this.controller.value;
		this.controller.onkeydown = function () {
			var keyCode = window.event.keyCode;

			// 处理代码转换
			if (isEnter(keyCode) && this.tagName != "TEXTAREA") {
				window.event.keyCode = 9;
				return;
			}

			if (isBackspace(keyCode) || isTab(keyCode) || isCursorCtrl(keyCode)
				|| isCopy(keyCode) || isPaste(keyCode)) {
				return;
			}
			if (isDelete(keyCode)) { // tab
				return;
			}

			if (isEscape(keyCode)) {
				this.value = this.validator.oldValue;
				if (this._onchange)
					this._onchange();
				this.form.validatorGroup.invalidInputHasBeenFocused = null;
			}
			this.validator.onKeyDown(); // 该this与Validator中的this不同，该
			// this标识Validator中的this.controller
			if (this.validatoronkeydownold != null) {
				this.validatoronkeydownold();
			}
		};
		this.controller._onchange = function () {
			this.validator.doFormat();
			this.validator.notify();
			if (this.validatoronchangeold != null)
				this.validatoronchangeold();
		};
		this.controller.onblur = function () {
			this.validator.doFormat();
			this.validator.notify();

			var validatorGroup = this.form.validatorGroup;
			if (validatorGroup != null) {
				if (this.validator.getStrValue() != null
					&& trim(this.validator.getStrValue()) != "") {

					if (validatorGroup.invalidInputHasBeenFocused != null
						&& validatorGroup.invalidInputHasBeenFocused != this)
						return;

					if (!this.validator.validate()) { // 自身输入合法性校验
						alert(this.validator.getErrorInfor()
							+ "\n注意：通过ESC键可以恢复原值.");
						this.validator.focusController();
						validatorGroup.invalidInputHasBeenFocused = this;
						return false;
					}

				}
				validatorGroup.invalidInputHasBeenFocused = null;

			}

			if (this.validatoronblurold != null) {
				this.validatoronblurold();
			}
		};
		this.controller.onfocus = function () {

			if (this.validatoronfocusold != null) {
				this.validatoronfocusold();
			}
			if (this.tagName == "INPUT")
				this.select();
		};
		this.controller.onpaste = function () {
			if (this.validatoronpaste != null) {
				return this.validatoronpaste();
			} else {
				return this.validator.onPaste(); // 该this与Validator中的this不同，该
				// this标识Validator中的this.controller
			}
		};
		this.controller.ondrop = function () {
			if (this.validatorondrop != null) {
				return this.validatorondrop();
			} else {
				return this.validator.onDrop(); // 该this与Validator中的this不同，该
				// this标识Validator中的this.controller
			}
		};
	}
}

Validator.prototype = new IValidator;
Validator.prototype.constructor = Validator;
/**
 * 关闭指定控件的输入法
 */
Validator.prototype.disableImeMode = function () {
	if (this.controller != null) {
		if (this.controller.style != null)
			this.controller.style.imeMode = "disabled";
	}
};
/**
 * 得到当前validator对象的controller对象
 */
Validator.prototype.getController = function () {
	return this.controller;
};

/**
 * 根据target标识，获得其标识Html对象的Label名称
 * 
 * @param target
 *            该数值以&开始时，该参量表示html元素的styleid标识
 */
Validator.prototype.getTargetLabel = function (target) {
	if (target == null)
		return "";
	if (/^[&\$]/.test(target)) {
		var validator = this.validatorGroup.validatorMap[target.substring(1,
			target.length)];
		if (validator != null)
			return validator.label;
		return target;
	} else {
		var pattern = /[&\$]([a-zA-Z_0-9]+)/g;
		var replaceString = "ValidatorGroup.getValidator('"
			+ this.validatorGroup.name + "','$1').controller.value";
		var expression = target.replace(pattern, replaceString);

		return eval(expression);
	}
};

Validator.prototype.valueChanged = function () {
	if (this.controller.value == this.oldValue)
		return false;
	if (this.oldValue == null)
		return false;
	return true;
};

Validator.prototype.equal = function (target) {
	if (this.getTargetValue(target) == this.getValue())
		return true;
	this.setErrorInfor("警告：\"" + this.label + "\"应等于\""
		+ this.getTargetLabel(target) + "\"！");
	return false;
};
Validator.prototype.notEqual = function (target) {
	if (this.getValue() != this.getTargetValue(target))
		return true;
	this.setErrorInfor("警告：\"" + this.label + "\"应不等于\""
		+ this.getTargetLabel(target) + "\"！");
	return false;
};
Validator.prototype.lessThan = function (target) {
	// alert(" a value:" + this.getValue() + "lessThan:" +
	// this.getTargetValue(target));
	if (this.getValue() < this.getTargetValue(target)) {
		return true;
	}
	this.setErrorInfor("警告：\"" + this.label + "\"应小于\""
		+ this.getTargetLabel(target) + "\"！");
	return false;
};
Validator.prototype.lessEqual = function (target) {
	if (this.getValue() <= this.getTargetValue(target))
		return true;
	this.setErrorInfor("警告：\"" + this.label + "\"应小于等于\""
		+ this.getTargetLabel(target) + "\"！");
	return false;
};

Validator.prototype.greaterThan = function (target) {
	if (this.getValue() > this.getTargetValue(target))
		return true;
	this.setErrorInfor("警告：\"" + this.label + "\"应大于\""
		+ this.getTargetLabel(target) + "\"！");
	return false;
};

Validator.prototype.greaterEqual = function (target) {
	if (this.getValue() >= this.getTargetValue(target))
		return true;
	this.setErrorInfor("警告:\"" + this.label + "\"应大于等于\""
		+ this.getTargetLabel(target) + "\"！");
	return false;
};
/**
 * 校验数据的取值范围
 */
Validator.prototype.validateScope = function () {
	var validatorScopeArray = splitString(this.scope, ",");
	for (var i = 0; i < validatorScopeArray.length; i++) {
		if (/^=/.test(validatorScopeArray[i])) {
			if (!this.equal(validatorScopeArray[i].substring(2)))
				return false;
		}
		if (/^!=/.test(validatorScopeArray[i])) {
			if (!this.notEqual(validatorScopeArray[i].substring(2)))
				return false;
		} else if (/^>=/.test(validatorScopeArray[i])) {
			// alert('greaterEqual in ');
			if (!this.greaterEqual(validatorScopeArray[i].substring(2)))
				return false;
		} else if (/^>/.test(validatorScopeArray[i])) {
			// alert('greaterThan in ');
			if (!this.greaterThan(validatorScopeArray[i].substring(1)))
				return false;
		} else if (/^<=/.test(validatorScopeArray[i])) {
			// alert('lessEqual in ');
			if (!this.lessEqual(validatorScopeArray[i].substring(2)))
				return false;
		} else if (/^</.test(validatorScopeArray[i])) {
			// alert('lessThan in ');
			if (!this.lessThan(validatorScopeArray[i].substring(1)))
				return false;
		} else {
			var pattern = /[&\$]([a-zA-Z_0-9]+)/g;
			var replaceString = "ValidatorGroup.getValidator('"
				+ this.validatorGroup.name + "','$1').controller.value";

			var expression = validatorScopeArray[i].replace(pattern,
				replaceString);
			var returnValue = eval(expression);
			this.setErrorInfor("警告：\"" + this.label + "\"输入的值校验不通过！");
			if (typeof (returnValue) == "boolean") {
				return returnValue;
			} else
				return false;
		}
	}
	return true;
};
/**
 * 得到指定参量标识的值，当指定参量为null时，返回''
 * 
 * @param target
 *            参量的标识，该标识如果以&开始，该标识为html元素的styleId
 * @return 参量标识的数值
 */
Validator.prototype.getTargetValue = function (target) {
	if (target == null)
		return "";
	if (/^[&\$]/.test(target)) {

		return this.validatorGroup.validatorMap[target.substring(1,
			target.length)].controller.value;
	} else {
		var pattern = /[&\$]([a-zA-Z_0-9]+)/g;
		var replaceString = "ValidatorGroup.getValidator('"
			+ this.validatorGroup.name + "','$1').controller.value";
		var expression = target.replace(pattern, replaceString);
		// alert(expression);
		return eval(expression);
	}
};

Validator.prototype.getValue = function () {
	return trim(this.controller.value);
};
Validator.prototype.getStrValue = function () {
	return trim(this.controller.value);
};
Validator.prototype.validate = function () {
	return true;
};
Validator.prototype.onKeyDown = function () {
	return true;
};
Validator.prototype.onPaste = function () {
	return true;
};
Validator.prototype.onDrop = function () {
	return true;
};
Validator.prototype.doFormat = function () {
	return true;
};
Validator.prototype.doInitOldValue = function () {
	this.oldValue = this.controller.value;
};
Validator.prototype.beforeSubmit = function () {
	return true;
};
Validator.prototype.focusController = function () {
	this.controller.focus();
};
Validator.prototype.validateEmpty = function () {
	var input = this.controller;
	if (input == null)
		return true;
	var inputValue = trim(input.value);

	if (inputValue.length == 0) {
		if (!eval(this.empty)) {// 如果需要校验非空
			this.focusController();
			return false;
		}
	}
	return true;
};

// 改变是否允许为空的提示样式，可以通过覆盖该方法进行个性化
Validator.prototype.doChangeEmptyLabelStyle = function () {
	if (this.controllerEmptyLabel == null) {
		this.controllerEmptyLabel = this.controller.nextSibling;
		var labelId = this.id + "_empty";
		if (this.controllerEmptyLabel == null
			|| this.controllerEmptyLabel.id != labelId) {
			this.controllerEmptyLabel = document.getElementById(labelId);
		}
	}
	if (this.controllerEmptyLabel != null) {
		if (this.controllerEmptyLabel.style == null) {
			alert("指定\"" + this.id + "\"的非空标识不存在,可能定义了多个相同标识的Html元素对象！");
			return;
		}
		if (this.empty == "true") {
			this.controllerEmptyLabel.style.display = "none";
		} else if (this.empty == "false") {
			this.controllerEmptyLabel.style.display = "inline";
		} else if (eval(this.empty)) {
			this.controllerEmptyLabel.style.display = "none";
		} else {
			this.controllerEmptyLabel.style.display = "inline";
		}
	}
};

// 处理状态变化
Validator.prototype.doNotifierChange = function () {

	this.doChangeEmptyLabelStyle();

	if (this.disabled == "false") {
		this.controller.disabled = false;
	} else if (eval(this.disabled)) {
		this.controller.disabled = true;
	} else {
		this.controller.disabled = false;
	}

	if (this.readonly == "false") {
		this.controller.readOnly = false;
		if (this.oldClassName)
			this.controller.className = this.oldClassName;
	} else if (eval(this.readonly)) {
		this.controller.readOnly = true;
		this.oldClassName = this.controller.className;
		this.controller.className = "readOnly";
	} else {
		this.controller.readOnly = false;
		if (this.oldClassName)
			this.controller.className = this.oldClassName;
	}

	if (this.calculateExp != null && this.calculateExp != "") {
		this.controller.value = this.calculate();
		this.doFormat();
	}
};

Validator.prototype.clear = function () {
	this.controller.value = "";
	this.notify();
};

/**
 * 所有Validator的调用都必须通过此类的validate()方法来间接调用，同时此类也执行通用的非空提示（当empty参数设为false时）
 */
function ValidatorGroup(name, leaveConfirm) {
	this.name = name || "0";

	ValidatorGroup.validatorGroups[this.name] = this;

	this.validators = new Array();
	this.needInitValidators = new Array();
	document.forms[name].validatorGroup = this;

	this.needEmptyValidate = true; // 提交时是否需要校验非空
	this.needValidate = true;
	if (leaveConfirm) {
		if (window.onbeforeunload == null) {
			window.onbeforeunload = _checkValueChanged;
		} else if (window.onbeforeunload != _checkValueChanged) {
			var oldOnbeforeunload = window.onbeforeunload;
			window.onbeforeunload = function () {
				oldOnbeforeunload();
				_checkValueChanged();
			};
		}
	}

	this.invalidInputHasBeenFocused = null; // 被锁定的错误输入
	this.validatorMap = new Object();

	this.add = function (validator) {
		// alert(validator.id);
		this.validators.push(validator);
		this.needInitValidators.push(validator);
		this.validatorMap[validator.id] = validator;
		validator.setValidatorGroup(this);
	};
	this.valueChanged = function () {
		var len = this.validators.length;
		for (var i = 0; i < len; i++) {
			if (this.validators[i].valueChanged())
				return true;
		}
		return false;
	};

	this.clearAll = function () {
		var len = this.validators.length;
		for (var i = 0; i < len; i++) {
			this.validators[i].clear();
		}
	};

	this.clear = function () {
		var validators = new Array();
		var len = this.validators.length;
		for (var i = 0; i < len; i++) {
			var validator = this.validators[i];
			var controller = document.all(this.id);
			if (controller != null) {
				if (validator.controller != null) {
					if (controller == validator.controller) {
						validators.push(validator);
					}
				} else {
					validators.push(validator);
				}
			}
		}
		this.validators = validators;
	};

	this.disableAllAction = function (frm) { // 提交后不允许用户再进行相应的输入

		var i = 0;

		var inputs = document.getElementsByTagName("input");
		var len = inputs.length;
		for (i = 0; i < len; i++) {
			var inputType = inputs[i].type.toUpperCase();
			if (inputType == "SUBMIT" || inputType == "BUTTON"
				|| inputType == "RESET") {
				inputs[i].disabled = true;
			}
		}
		var links = document.links;
		len = links.length;
		for (var i = 0; i < len; i++) {
			links[i].href = "#";
			links[i].onclick = "";
			links[i].ondbclick = "";
		}

	};

	this.init = function () {
		var len = this.needInitValidators.length;
		for (var i = 0; i < len; i++) {
			this.needInitValidators[i].doInitNotifier();
		}

		// 获得所有的没有任何侦听者的Validator
		var orderedValidators = new Array();
		var orderedValidatorsMap = new Object();
		for (var i = 0; i < len; i++) {
			var validator = this.needInitValidators[i];
			if (validator.listeners.length == 0) {
				validator.fetchThisDependentCascade(orderedValidators,
					orderedValidatorsMap);
			} else if (validator.listeners.length == 1
				&& validator.listeners[0] == validator) {
				// 只侦听自身的Validator
				validator.fetchThisDependentCascade(orderedValidators,
					orderedValidatorsMap);
			}

			if (validator.dependents.length == 0)
				this.needInitValidators[i].doFormat();

		}
		var olen = orderedValidators.length;
		for (var i = 0; i < olen; i++) {
			orderedValidators[i].doNotifierChange();
			orderedValidators[i].dependents = null;
			orderedValidators[i].listenersMap = null;
		}

		for (var i = 0; i < len; i++) {
			this.needInitValidators[i].doInitOldValue();
		}

		this.needInitValidators = new Array();
		var inputs = document.getElementsByTagName("input");
		len = inputs.length;
		for (i = 0; i < len; i++) {
			var inputType = inputs[i].type.toLowerCase();
			if (inputs[i].className == "")
				inputs[i].className = inputType;

			if (inputType == "button" || inputType == "submit" || inputType == "reset") {
				if (!inputs[i].disabled) {
					_addEventListener(inputs[i], "mouseover", function () {
						this.className = inputType + "Hover";
					});
					_addEventListener(inputs[i], "mouseout", function () {
						this.className = inputType;
					});
				}
			}
		}
	};
	this.beforeSubmit = function () {
		var len = this.validators.length;
		for (var i = 0; i < len; i++) {
			this.validators[i].beforeSubmit();
		}
	};
	this.oldFormOnSubmit = null;
	this.oldFormSubmit = null;
	if (document.forms[name] != null) {
		document.forms[name].validatorGroup = this;
		document.forms[name].oldFormOnsubmit = document.forms[name].onsubmit;
		document.forms[name].oldFormSubmit = document.forms[name].submit;

		document.forms[name].submit = function () {
			if (window.onbeforeunload != "undefined"
				&& window.onbeforeunload != null) {
				window.onbeforeunload = null;
			}
			if (document.submitting) {
				alert("当前页面正在提交过程中，不允许重复提交！");
				return false;
			}
			var valid = this.validatorGroup.validate();
			if (valid) {
				this.validatorGroup.beforeSubmit();
			} else {// 如果校验不成功，则不提交
				return false;
			}
			if (this.oldFormSubmit != null)
				valid = this.oldFormSubmit();

			if (valid == "undefined" || valid == null || valid) {

				if (this.target == "" || this.target == null
					|| this.target == '_self') {
					document.submitting = true;
					this.validatorGroup.disableAllAction(this);
				}
			}
			return valid;
		};

		document.forms[name].onsubmit = function () {
			if (window.onbeforeunload != "undefined"
				&& window.onbeforeunload != null) {
				window.onbeforeunload = null;
			}
			if (document.submitting) {
				alert("当前页面正在提交过程中，不允许重复提交！");
				return false;
			}
			document.submitting = true;
			var valid = this.validatorGroup.validate();
			if (valid) {
				this.validatorGroup.beforeSubmit();
			} else {// 如果校验不成功，则不提交
				document.submitting = false;
				return false;
			}

			if (this.oldFormOnsubmit != null)
				valid = this.oldFormOnsubmit();

			if (valid == "undefined" || valid == null || valid) {
				if (this.target == "" || this.target == null
					|| this.target == '_self') {
					document.submitting = true;
					this.validatorGroup.disableAllAction(this);
				}
			} else { // 处理失败时
				document.submitting = false;
			}
			return valid;
		};
		// 处理reset 处理

		this.reset = function () {

			document.forms[this.name].reset();
			var len = this.validators.length;
			for (var i = 0; i < len; i++) {
				this.validators[i].doFormat();
				this.validators[i].doNotifierChange();
			}
		};

	}

	this.validate = function () {
		if (!this.needValidate)
			return true;

		var len = this.validators.length;
		for (var i = 0; i < len; i++) {
			var validator = this.validators[i];
			if (validator.controller != null) {
				if (validator.controller.disabled)
					continue;
			} else {
				if (validator.disabledStatus)
					continue;
			}
			if (this.needEmptyValidate && !validator.validateEmpty()) { // 空值校验
				alert("警告：请输入\"" + validator.label + "\"的值！"
					+ "\n注意：通过ESC键可以恢复原值.");
				validator.focusController();
				return false;
			}
			if (validator.getStrValue().length > 0) {
				if (!validator.validate()) { // 自身输入合法性校验
					alert(validator.getErrorInfor() + "\n注意：通过ESC键可以恢复原值.");
					validator.focusController();
					return false;
				}
				if (!validator.validateScope()) { // 取值范围有效性校验
					alert(validator.getErrorInfor() + "\n注意：通过ESC键可以恢复原值.");
					validator.focusController();
					return false;
				}
			}

		}
		return true;
	};
}
ValidatorGroup.validatorGroups = new Object();
ValidatorGroup.getValidator = function (formName, elementId) {

	var v = ValidatorGroup.validatorGroups[formName].validatorMap[elementId];
	if (!v)
		v = {
			controller: document.getElementById(elementId)
		};
	return v;
};

function _checkValueChanged() {
	var forms = document.forms;
	var len = forms.length;
	for (var i = 0; i < len; i++) {
		if (forms[i].validatorGroup.valueChanged()) {
			window.event.returnValue = "数据已经发生更改，继续将不保存数据!";
			return;
		}
	}
}
