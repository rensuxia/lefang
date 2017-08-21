// var append_word = 'sfhaitao.xyz!'
var append_word = 'net.pocrd'
var request_url = '/m.api'

var ERROR_CODE_TOKEN_ERROR = -360;
var ERROR_CODE_TOKEN_EXPIRE = -300;
var ERROR_CODE_SIGNATURE_ERROR = -180;
var ERROR_CODE_ACCESS_DENIED = -160;

var MilkT = function (api, aid) {
  this._aid = aid
  this.api = api
  this.serverTime = null;
}

MilkT.prototype = {

  /**
   * @description 对参数加密获得_sig
   */
  encrypt: function (params, word) {
    // 清除参数中的空值
    _.each(params, function (value, key, list) {
      if (_.isUndefined(value)) {
        delete params[key];
      }
    });

    // 对参数进行序列化
    var arr = [];
    _.each(params, function (value, key, list) {
      arr.push(key + '=' + value);
    });

    arr.sort();

    var str = arr.join('');
    str = str + word;

    // 对参数做md5加密之后返回
    return md5(str);
  },

  /**
   * @description 对参数做加密，获取最后上传的参数
   */
  sign: function (params, isForceUserLogin) {
    var map = {
      'None': function (data, force) {
        return _.extend(data, {
          _sig: this.encrypt(data, append_word || 'renshengjiushiyikebocai')
        });
      },

      'RegisteredDevice': function (data, force) {
        return _.extend(data, {
          _sig: this.encrypt(data, append_word || 'renshengjiushiyikebocai')
        });
      },

      'UserLogin': function (data, force) {
        var csrf = store.get('csrfToken');

        if (csrf) {
          return _.extend(data, {
            _sig: this.encrypt(data, csrf)
          });
        } else {
          // @todo 引导用户登录
          // 如果强制登录，调用redirectToLogin方法
          // this.redirectToLogin();
        }
      }
    };

    if (_.isFunction(map[this.api.SECURITY_TYPE])) {
      // 过滤所有的undefined和null的数据
      _.each(params, function (value, key, list) {
        if (_.isUndefined(value) || _.isNull(value)) {
          delete params[key];
        }
      });

      // 将参数附加上必须要传递的标记
      var required = _.extend(params, {
        _aid: this._aid,
        _sm: 'md5'
      });

      // 做加密生产_sig对象
      var sigData = map[this.api.SECURITY_TYPE].call(this, required, isForceUserLogin);

      // 返回数据可以直接做请求
      return _.extend(required, sigData);
    } else {
      return params;
    }
  },

  /**
   * @description 对返回回来的结构体做验证，判读是否获取数据成功
   */
  access: function (data, isForce) {
    if (data.stat.code === 0 && data.content[0] && data.stat.stateList[0].code === 0) {
      return true;
    } else if (data.stat.code == -180 || data.stat.code == -360) {
      if (isForce) {
        // @todo 引导用户登录
        // 引导去登录
        // this.redirectToLogin
      }
    } else {
      return false;
    }
  },

  // 纯业务动作 - 无需关注
  afterRequest: function (mt, response) {
    var map = {
      'user.webLogin': function (response) {
        store.set('csrfToken', response.csrfToken);
      },

      'user.partnerLogin': function (response) {
        store.set('csrfToken', response.csrfToken);
      },

      'user.mobileRegister': function (response) {
        store.set('csrfToken', response.csrfToken);
      }
    };

    if (_.isFunction(map[mt])) {
      map[mt].call(this, response);
    }
  },

  /**
   * @description 通过与定义的API接口和用户通过this.data传入的参数构建向服务端发起请求需要用到的数据
   * @return {Object} 向服务端提交的数据结构
   */
  buildRequestData: function () {
    if (this.api) {
      var requestData = {};

      // 添加每个请求的_mt参数
      _.extend(requestData, {
        _mt: this.api.METHOD_NAME
      });

      // 提供公共参数
      _.extend(requestData, this.api.COMMON);

      var key;
      // 添加必填参数
      for (key in this.api.REQUIRED) {
        requestData[key] = this.data[key];
      }

      // 添加选填参数
      for (key in this.api.OPTIONAL) {
        requestData[key] = this.data[key];
      }

      return requestData;
    }
  },

  /**
   * @description 发起请求，封装成deffered对象
   * @param  {Map}     data             请求参数
   * @param  {Boolean} isForceUserLogin 是否需要强制登陆
   * @return {$.Deferred}
   */
  request: function (data, isForceUserLogin) {
    var def = $.Deferred();
    var that = this;

    var redirectToLogin = function (response) {
      // -180则清空所有storage
      if (response.stat.code == ERROR_CODE_SIGNATURE_ERROR) {
        store.clear();
        // 引导去登录
      }
    }

    var successCallback = function (response) {
      if (response && response.stat) {
        that.serverTime = response.stat.systime;
      }

      if (that.access(response, isForceUserLogin)) {
        that.afterRequest(data._mt, response.content[0]);
        def.resolve(response.content[0]);
      } else {
        if (response.stat.stateList.length == 0) {
          // -180则清空所有storage
          redirectToLogin(response)
          def.reject(response.stat.code);
        } else {
          redirectToLogin(response)
          def.reject(response.stat.stateList[0].code, response.stat.stateList[0].msg);
        }
      }
    }

    var failCallback = function (error) {
      def.reject(error);
    }

    $.ajax({
      url: request_url,
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: that.sign(data),
      success: function (response) {
        successCallback(response);
      },
      fail: function (error) {
        failCallback(error);
      }
    });

    return def;
  },

  /**
   * @description 检查用户是否登陆
   * @return {Boolean} 用户是否登陆
   */
  checkUserLogin: function () {
    var csrf = store.get('csrfToken');
    return !!($.fn.cookie(this._aid + '_ct') && csrf);
  },

  /**
   * @description 根据用户SecurityType进行检验，同时也会检验比天字段是否写入
   * @returns {Error|Boolean} 错误对象|验证成功
   */
  validate: function (isForceUserLogin) {
    // 检查必填字段，如果没有必填字段直接抛错
    if (this.api) {
      if (!this.api.METHOD_NAME) {
        return '缺少_mt';
      }

      for (var key in this.api.REQUIRED) {
        if (!_.has(this.data, key)) {
          return new Error('缺少必填字段' + key);
        }
      }
    }

    //根据action校验是否登录
    if (this.api.SECURITY_TYPE === 'UserLogin') {
      if (!this.checkUserLogin()) {
        if (isForceUserLogin) {
          // @todo 引导用户登录
          // this.redirectToLogin()
        } else {
          return new Error('该请求需要在登录后发起');
        }
      }
    }

    return true;
  },

  /**
   * @description 构建请求
   * @param {boolean} isForceUserLogin 是否需要强制用户登录
   * @return {Object} can.Deferred
   */
  send: function (data, isForceUserLogin) {
    // step0 设置参数到data
    this.data = data

    //step1 调用子业务类进行数据校验
    var checkResult = this.validate(isForceUserLogin);

    if (checkResult !== true) {
      return checkResult;
    }

    //step2 构建ajax请求数据，放到baseCommon的全局变量中，可以支持多个请求一起发送
    var requestData = this.buildRequestData();

    //step3 发送请求,获得返回数据
    return this.request(requestData, isForceUserLogin);
  },
}