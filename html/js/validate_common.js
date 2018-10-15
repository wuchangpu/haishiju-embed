
$(function () {

	$("#f_div").hide();


	var zddmQO1 = $("#zddmQO1") // ���֤����
	var yanzhm = $("#yanzhm") // ��֤��
	var yanzhmpic = $("#yanzhmpic") // ��֤��ͼƬ
	var btnQuery = $(".btnQuery") // ��ѯ��ť

	var recombine = "<ul> \
                    <li class='zddmQO1'>���֤����:</li> \
                    <li class='yanzhm'>��֤��:</li> \
                    <li class='query'>��ѯ:</li> \
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
			// ֤���ű������Է���վ���£���Ҫ���ݾ���ʵʩϸ�ڵ���
			var certTrs = $(n).find("tr");
			var certData = [];
			$.each(certTrs, function (innerI, innerN) {
				if (innerI >= 3) {
					var certTds = $(innerN).find("td");
					var d = {
						certNo: $.trim(certTds.eq(0).text()),//֤�����
						certName: $.trim(certTds.eq(2).text()),// ����
						certDate: $.trim(certTds.eq(3).text()),// ǩ������
						expireDate: $.trim(certTds.eq(4).text()),// ʧЧ����
						certStatus: $.trim(certTds.eq(5).text()),// ֤��״̬
						certOrgan: $.trim(certTds.eq(6).text())// ǩ������
					};
					certData.push(d);
				}
			});
			// ����д��ص�
			console.log(certData);
			alert(JSON.stringify(certData));
		}
	});
});




















/**
 * ɾ���ַ�������Ŀո�,���ص���ɾ������ո���ַ���
 * 
 * @param str
 *            ��������ַ���
 */
function trim(str) {
	if (str == null || str == "")
		return "";
	return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
};

/**
 * ��ָ����Ԫ��e1��eventNameָ�����¼��������¼�������
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
 * ��Ŀ���ַ���������ָ���ķָ���ֽ�Ϊ�ַ�������
 * 
 * @param targetString
 *            Ŀ���ַ���
 * @param seperator
 *            �ָ��
 * @parem return Array ���ָ���ַ�������
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
		if (singleStatement.indexOf("(") > 0) { // ������Ƕ���������в���������
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

// �����ַ���ͨ��charCodeAt(index)���������жϳ���ռ��λ�ռ�ġ������и��õĴ���ʽʱ��������
var specialCharacter = "���졤";
/**
 * �õ��ַ�����byte����
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
// //START �������ж�
// //////////////////////////////////////////////////////////////////
/**
 * �жϼ��������Ƿ����ּ�
 * 
 * @param keyCode
 *            ����ļ�ֵ
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
 * �жϼ��������Ƿ���26����ĸ
 * 
 * @param keyCode
 *            ����ļ�ֵ
 */
function isLetter(keyCode) {
	if (keyCode >= 65 && keyCode <= 90)
		return true;
	return false;
}

/**
 * �жϼ��������Ƿ�Ϊ����ƶ�����
 * 
 * @param keyCode
 *            ����ļ�ֵ
 */
function isCursorCtrl(keyCode) {
	if (keyCode >= 33 && keyCode <= 40)
		return true;
	return false;
}

/**
 * �жϼ��������Ƿ�Ϊ+��
 * 
 * @param keyCode
 *            ����ļ�ֵ
 */
function isPlusSign(keyCode) {
	if ((keyCode == 187 || keyCode == 107) && window.event.shiftKey == true)
		return true;
	return false;
}
/**
 * �жϼ��������Ƿ�Ϊ-��
 * 
 * @param keyCode
 *            ����ļ�ֵ
 */
function isSubtractionSign(keyCode) {
	if ((keyCode == 109 || keyCode == 189) && window.event.shiftKey == false)
		return true;
	return false;
}

/**
 * �жϼ��������Ƿ�Ϊ.��
 * 
 * @param keyCode
 *            ����ļ�ֵ
 */
function isDotSign(keyCode) {
	if (keyCode == 110 || keyCode == 190)
		return true;
	return false;
}
/**
 * �жϼ��������Ƿ�ΪTab��
 * 
 * @param keyCode
 *            ����ļ�ֵ
 */
function isTab(keyCode) {
	if (keyCode == 9)
		return true;
	return false;
}
/**
 * �жϼ��������Ƿ�Ϊ�س���
 * 
 * @param keyCode
 *            ����ļ�ֵ
 */
function isEnter(keyCode) {
	if (keyCode == 13)
		return true;
	return false;
}
/**
 * �жϼ��������Ƿ�Ϊ�˸��
 * 
 * @param keyCode
 *            ����ļ�ֵ
 */
function isBackspace(keyCode) {
	if (keyCode == 8)
		return true;
	return false;
}
/**
 * �жϼ��������Ƿ�Ϊɾ����
 */
function isDelete(keyCode) {
	if (keyCode == 46)
		return true;
	return false;
}
// ////////////�������������ж�

/**
 * �ѻس���ת��ΪTab��
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
 * �Ƿ�Ϊȫ�����ַ���
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
	if (this.listenersMap[listener.id] == null) { // ��ֹ�ظ�ע��
		this.listenersMap[listener.id] = listener.id;
		this.listeners.push(listener);
		listener.dependents.push(this);
	}
};

/**
 * �õ����е��ܵ�ǰ����仯˳��Ӱ������ж��� listener �ܵ�ǰ����仯˳��Ӱ������ж��� listenerMap �ܵ�ǰ����仯Ӱ������ж����ӳ��
 */
IValidator.prototype.fetchListenerCascade = function (listener, listenerMap) {
	// ��ֹ�ظ�����
	if (listenerMap[this.id] != null)
		return;

	// �ݹ�֮ǰ��¼�����Է�ֹѭ�����õ��µ���ѭ����
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
 * �õ��ö��������������е��������� validators �ö��������������������� validatorMap �ö����������������������ӳ��
 */
IValidator.prototype.fetchThisDependentCascade = function (validators,
	validatorMap) {
	// ��ֹ�ظ�����
	if (validatorMap[this.id] != null)
		return;

	// �ݹ�֮ǰ��¼�����Է�ֹѭ�����õ��µ���ѭ����
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
 * ���ô�����Ϣ
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
		if (notifier != null) { // ���ڶ�Ӧ��Validator
			notifier.addListener(this);

			var replaceString = "ValidatorGroup.getValidator('"
				+ this.validatorGroup.name + "','$1').getValue()";
			returnValue = returnValue.replace(IValidator.pattern2,
				replaceString);
		} else { // ����radio��checkbox������
			var groupObj;
			var validatorObj = this.validatorGroup.validatorMap[token[1]];
			if (validatorObj)
				groupObj = validatorObj.controller;
			else
				groupObj = document.getElementById(token[1]);

			if (groupObj == null) {
				alert("���ʽ\"" + expression + "\"�����\"" + token[1]
					+ "\"��ʾ��HtmlԪ�ز�����");
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
 * ����empty��disable���ʽ�е�Listen/notify���ƣ����б��ʽԤ����
 */
IValidator.prototype.doInitNotifier = function () {
	this.empty = this.parseAndAttachNotifiers(this.empty);
	this.disabled = this.parseAndAttachNotifiers(this.disabled);
	this.readonly = this.parseAndAttachNotifiers(this.readonly);
	this.calculateExp = this.parseAndAttachNotifiers(this.calculateExp);
};
/**
 * �¼������������ֵ�����˱仯
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

// һ���������ж��form, ÿ��form�ж����ύ��ʽ, ��ͬ���ύ��ʽ��ҪУ������ݲ�ͬ,�籣��\��ѯɾ��
// ����Validator���͵ĸ���,����empty��disabled���﷨��ʽΪ &style=value&&&styleId2=value
function Validator(id, label, empty, format, scope, disabled, readonly,
	calculateExp) {
	this.IValidator = IValidator;
	this.IValidator(id, label, empty, format, scope, disabled, readonly,
		calculateExp);
	if (id == null || id == "")
		return;
	this.controller = document.getElementById(id);

	if (this.controller != null && this.controller.validator == null) { // ��д��ص���������¼�����
		this.controller.validator = this; // �ѵ�ǰ���ƶ�����Ϊcontroller�����validator����
		this.controller.validatoronkeydownold = this.controller.onkeydown;
		this.controller.validatoronblurold = this.controller.onblur;
		this.controller.validatoronfocusold = this.controller.onfocus;
		this.controller.validatoronchangeold = this.controller.onchange;
		this.controller.validatoronpaste = this.controller.onpaste;
		this.controller.validatorondrop = this.controller.ondrop;
		this.oldValue = this.controller.value;
		this.controller.onkeydown = function () {
			var keyCode = window.event.keyCode;

			// �������ת��
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
			this.validator.onKeyDown(); // ��this��Validator�е�this��ͬ����
			// this��ʶValidator�е�this.controller
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

					if (!this.validator.validate()) { // ��������Ϸ���У��
						alert(this.validator.getErrorInfor()
							+ "\nע�⣺ͨ��ESC�����Իָ�ԭֵ.");
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
				return this.validator.onPaste(); // ��this��Validator�е�this��ͬ����
				// this��ʶValidator�е�this.controller
			}
		};
		this.controller.ondrop = function () {
			if (this.validatorondrop != null) {
				return this.validatorondrop();
			} else {
				return this.validator.onDrop(); // ��this��Validator�е�this��ͬ����
				// this��ʶValidator�е�this.controller
			}
		};
	}
}

Validator.prototype = new IValidator;
Validator.prototype.constructor = Validator;
/**
 * �ر�ָ���ؼ������뷨
 */
Validator.prototype.disableImeMode = function () {
	if (this.controller != null) {
		if (this.controller.style != null)
			this.controller.style.imeMode = "disabled";
	}
};
/**
 * �õ���ǰvalidator�����controller����
 */
Validator.prototype.getController = function () {
	return this.controller;
};

/**
 * ����target��ʶ��������ʶHtml�����Label����
 * 
 * @param target
 *            ����ֵ��&��ʼʱ���ò�����ʾhtmlԪ�ص�styleid��ʶ
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
	this.setErrorInfor("���棺\"" + this.label + "\"Ӧ����\""
		+ this.getTargetLabel(target) + "\"��");
	return false;
};
Validator.prototype.notEqual = function (target) {
	if (this.getValue() != this.getTargetValue(target))
		return true;
	this.setErrorInfor("���棺\"" + this.label + "\"Ӧ������\""
		+ this.getTargetLabel(target) + "\"��");
	return false;
};
Validator.prototype.lessThan = function (target) {
	// alert(" a value:" + this.getValue() + "lessThan:" +
	// this.getTargetValue(target));
	if (this.getValue() < this.getTargetValue(target)) {
		return true;
	}
	this.setErrorInfor("���棺\"" + this.label + "\"ӦС��\""
		+ this.getTargetLabel(target) + "\"��");
	return false;
};
Validator.prototype.lessEqual = function (target) {
	if (this.getValue() <= this.getTargetValue(target))
		return true;
	this.setErrorInfor("���棺\"" + this.label + "\"ӦС�ڵ���\""
		+ this.getTargetLabel(target) + "\"��");
	return false;
};

Validator.prototype.greaterThan = function (target) {
	if (this.getValue() > this.getTargetValue(target))
		return true;
	this.setErrorInfor("���棺\"" + this.label + "\"Ӧ����\""
		+ this.getTargetLabel(target) + "\"��");
	return false;
};

Validator.prototype.greaterEqual = function (target) {
	if (this.getValue() >= this.getTargetValue(target))
		return true;
	this.setErrorInfor("����:\"" + this.label + "\"Ӧ���ڵ���\""
		+ this.getTargetLabel(target) + "\"��");
	return false;
};
/**
 * У�����ݵ�ȡֵ��Χ
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
			this.setErrorInfor("���棺\"" + this.label + "\"�����ֵУ�鲻ͨ����");
			if (typeof (returnValue) == "boolean") {
				return returnValue;
			} else
				return false;
		}
	}
	return true;
};
/**
 * �õ�ָ��������ʶ��ֵ����ָ������Ϊnullʱ������''
 * 
 * @param target
 *            �����ı�ʶ���ñ�ʶ�����&��ʼ���ñ�ʶΪhtmlԪ�ص�styleId
 * @return ������ʶ����ֵ
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
		if (!eval(this.empty)) {// �����ҪУ��ǿ�
			this.focusController();
			return false;
		}
	}
	return true;
};

// �ı��Ƿ�����Ϊ�յ���ʾ��ʽ������ͨ�����Ǹ÷������и��Ի�
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
			alert("ָ��\"" + this.id + "\"�ķǿձ�ʶ������,���ܶ����˶����ͬ��ʶ��HtmlԪ�ض���");
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

// ����״̬�仯
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
 * ����Validator�ĵ��ö�����ͨ�������validate()��������ӵ��ã�ͬʱ����Ҳִ��ͨ�õķǿ���ʾ����empty������Ϊfalseʱ��
 */
function ValidatorGroup(name, leaveConfirm) {
	this.name = name || "0";

	ValidatorGroup.validatorGroups[this.name] = this;

	this.validators = new Array();
	this.needInitValidators = new Array();
	document.forms[name].validatorGroup = this;

	this.needEmptyValidate = true; // �ύʱ�Ƿ���ҪУ��ǿ�
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

	this.invalidInputHasBeenFocused = null; // �������Ĵ�������
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

	this.disableAllAction = function (frm) { // �ύ�������û��ٽ�����Ӧ������

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

		// ������е�û���κ������ߵ�Validator
		var orderedValidators = new Array();
		var orderedValidatorsMap = new Object();
		for (var i = 0; i < len; i++) {
			var validator = this.needInitValidators[i];
			if (validator.listeners.length == 0) {
				validator.fetchThisDependentCascade(orderedValidators,
					orderedValidatorsMap);
			} else if (validator.listeners.length == 1
				&& validator.listeners[0] == validator) {
				// ֻ���������Validator
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
				alert("��ǰҳ�������ύ�����У��������ظ��ύ��");
				return false;
			}
			var valid = this.validatorGroup.validate();
			if (valid) {
				this.validatorGroup.beforeSubmit();
			} else {// ���У�鲻�ɹ������ύ
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
				alert("��ǰҳ�������ύ�����У��������ظ��ύ��");
				return false;
			}
			document.submitting = true;
			var valid = this.validatorGroup.validate();
			if (valid) {
				this.validatorGroup.beforeSubmit();
			} else {// ���У�鲻�ɹ������ύ
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
			} else { // ����ʧ��ʱ
				document.submitting = false;
			}
			return valid;
		};
		// ����reset ����

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
			if (this.needEmptyValidate && !validator.validateEmpty()) { // ��ֵУ��
				alert("���棺������\"" + validator.label + "\"��ֵ��"
					+ "\nע�⣺ͨ��ESC�����Իָ�ԭֵ.");
				validator.focusController();
				return false;
			}
			if (validator.getStrValue().length > 0) {
				if (!validator.validate()) { // ��������Ϸ���У��
					alert(validator.getErrorInfor() + "\nע�⣺ͨ��ESC�����Իָ�ԭֵ.");
					validator.focusController();
					return false;
				}
				if (!validator.validateScope()) { // ȡֵ��Χ��Ч��У��
					alert(validator.getErrorInfor() + "\nע�⣺ͨ��ESC�����Իָ�ԭֵ.");
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
			window.event.returnValue = "�����Ѿ��������ģ�����������������!";
			return;
		}
	}
}
