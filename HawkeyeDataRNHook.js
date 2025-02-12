#! node option
// 系统变量
// 系统变量
var path = require('path'),
  fs = require('fs'),
  dir = path.resolve(__dirname, '..');
var userPackageJson = require('../../package.json');
var ignoreScreen = false;
if (userPackageJson && userPackageJson['eagleEyaData'] && userPackageJson['eagleEyaData']['ignoreScreen']) {
  ignoreScreen = true;
}
var reactNavigationPath5X = dir + '/@react-navigation/core/src/BaseNavigationContainer.tsx';
// 自定义变量

var RNClickFilePath = dir + '/react-native/Libraries/Components/Touchable/Touchable.js';
var RNClickPressabilityFilePath = dir + '/react-native/Libraries/Pressability/Pressability.js';
var RNClickableFiles = [
  dir + '/react-native/Libraries/Renderer/src/renderers/native/ReactNativeFiber.js',
  dir + '/react-native/Libraries/Renderer/src/renderers/native/ReactNativeFiber-dev.js',
  dir + '/react-native/Libraries/Renderer/src/renderers/native/ReactNativeFiber-prod.js',
  dir + '/react-native/Libraries/Renderer/src/renderers/native/ReactNativeFiber-profiling.js',
  dir + '/react-native/Libraries/Renderer/ReactNativeFiber-dev.js',
  dir + '/react-native/Libraries/Renderer/ReactNativeFiber-prod.js',
  dir + '/react-native/Libraries/Renderer/oss/ReactNativeRenderer-dev.js',
  dir + '/react-native/Libraries/Renderer/oss/ReactNativeRenderer-prod.js',
  dir + '/react-native/Libraries/Renderer/ReactNativeStack-dev.js',
  dir + '/react-native/Libraries/Renderer/ReactNativeStack-prod.js',
  dir + '/react-native/Libraries/Renderer/oss/ReactNativeRenderer-profiling.js',
  dir + '/react-native/Libraries/Renderer/ReactNativeRenderer-dev.js',
  dir + '/react-native/Libraries/Renderer/ReactNativeRenderer-prod.js',
  dir + '/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-profiling.js',
  dir + '/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-dev.js',
  dir + '/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js',
];
// RN 控制 slider 的文件
var RNSliderFiles = [
  dir + '/react-native/Libraries/Components/Slider/Slider.js',
  dir + '/react-native/Libraries/Components/Slider/Slider.js',
  dir + '/@react-native-community/slider/js/Slider.js',
  dir + '/@react-native-community/slider/dist/Slider.js',
  dir + '/@react-native-community/js/Slider.js',
  dir + '/@react-native-community/src/js/Slider.js',
];
// RN 控制 switch 的文件
var RNSwitchFiles = [dir + '/react-native/Libraries/Components/Switch/Switch.js'];
// RN 控制 SegmentedControl 的文件
var RNSegmentedControlFilePath = [
  dir + '/react-native/Libraries/Components/SegmentedControlIOS/SegmentedControlIOS.ios.js',
  dir + '/@react-native-community/segmented-control/js/SegmentedControl.ios.js',
];
// RN 控制 GestureButtons 的文件
var RNGestureButtonsFilePaths = [
  dir + '/react-native-gesture-handler/GestureButtons.js',
  dir + '/react-native-gesture-handler/src/components/GestureButtons.tsx',
];
// click 需 hook 的自执行代码
var eagleeyadataClickHookCode =
  '(function(thatThis){ \n' +
  '  try {\n' +
  "    var ReactNative = require('react-native');\n" +
  '    var dataModule = ReactNative.NativeModules.Hawkeye;\n' +
  '    thatThis.props.onPress && dataModule && dataModule.trackViewClick && dataModule.trackViewClick(ReactNative.findNodeHandle(thatThis))\n' +
  "  } catch (error) { throw new Error('EagleEyaData RN Hook Code 调用异常: ' + error);}\n" +
  '})(this); /* EAGLEEYADATA HOOK */ ';
var eagleeyadataClickHookPressabilityCode =
  ' var tag = event.currentTarget && event.currentTarget._nativeTag?event.currentTarget._nativeTag:event.currentTarget;+\n' +
  '(function(thatThis){\n' +
  '  if(thatThis){\n' +
  '    try {\n' +
  "      var ReactNative = require('react-native');\n" +
  '      var dataModule = ReactNative.NativeModules.Hawkeye;\n' +
  '      dataModule && dataModule.trackViewClick && dataModule.trackViewClick(thatThis);\n' +
  '    }catch (error){\n' +
  "      throw new Error('EagleEyaData RN Hook Code 调用异常: ' + error);}}}\n" +
  ')(tag); /* EAGLEEYADATA HOOK */ ';
var eagleeyadataSliderHookCode =
  '(function(thatThis){\n' +
  '  try {\n' +
  "    var ReactNative = require('react-native');\n" +
  '    var dataModule = ReactNative.NativeModules.Hawkeye;\n' +
  '    dataModule && dataModule.trackViewClick && dataModule.trackViewClick(event.nativeEvent.target);\n' +
  '  } catch (error) { \n' +
  "      throw new Error('EagleEyaData RN Hook Code 调用异常: ' + error);\n" +
  '  }\n' +
  '})(this); /* EAGLEEYADATA HOOK */';
var eagleeyadataSegmentedControlHookCode =
  'if(this.props.onChange != null || this.props.onValueChange != null){\n' +
  '(function(thatThis){\n' +
  '  try {\n' +
  "    var ReactNative = require('react-native');\n" +
  '    var dataModule = ReactNative.NativeModules.Hawkeye;\n' +
  '    dataModule && dataModule.trackViewClick && dataModule.trackViewClick(event.nativeEvent.target);\n' +
  '  } catch (error) { \n' +
  "      throw new Error('EagleEyaData RN Hook Code 调用异常: ' + error);}\n" +
  '})(this); /* EAGLEEYADATA HOOK */}';
var eagleeyadataSwitchHookCode =
  'if(this.props.onChange != null || this.props.onValueChange != null){\n' +
  '  (function(thatThis){ \n' +
  '    try {\n' +
  "      var ReactNative = require('react-native');\n" +
  '      var dataModule = ReactNative.NativeModules.Hawkeye;\n' +
  '      dataModule && dataModule.trackViewClick && dataModule.trackViewClick(ReactNative.findNodeHandle(thatThis));\n' +
  "    } catch (error) { throw new Error('EagleEyaData RN Hook Code 调用异常: ' + error);}\n" +
  '  })(this); /* EAGLEEYADATA HOOK */}';
var eagleeyadataSwitchHookCode66 =
  'if(nativeSwitchRef.current && onValueChange){\n' +
  '  (function(thatThis){ \n' +
  '    try {\n' +
  "      var ReactNative = require('react-native');\n" +
  '      var dataModule = ReactNative.NativeModules.Hawkeye;\n' +
  '      dataModule && dataModule.trackViewClick && dataModule.trackViewClick(ReactNative.findNodeHandle(nativeSwitchRef.current));\n' +
  "    } catch (error) { throw new Error('EagleEyaData RN Hook Code 调用异常: ' + error);}\n" +
  '  })(this); /* EAGLEEYADATA HOOK */}';
var eagleeyadataImportReactNativeHookCode = "import ReactNative from 'react-native';\n";
var eagleeyadataNavigation5HookCode = `

	  function getCurrentRouteName(){
        let state = getRootState();
          if (state === undefined) {
            return undefined;
          }
        while (state.routes[state.index].state !== undefined) {
            state = state.routes[state.index].state as NavigationState;
          }                                                                                                                                                                                                                                                              
          return state.routes[state.index].name;
      }
	function getParams(state:any):any{
		if(!state){
		   return null;
		 }
		 var route = state.routes[state.index];
		 var params = route.params;
		 if(route.state){
		   var p = getParams(route.state);
		   if(p){
		     params = p;
		   }
		 }
		return params;
	}
	function trackViewScreen(state: any): void {
		if (!state) {
		  return;
		}
		var route = state.routes[state.index];
		if (route.name === 'Root') {
		  trackViewScreen(route.state);
		  return;
		}
		var screenName = getCurrentRouteName();
		var params = getParams(state);
		var saProperties = {};
		if (params) {
		  if (!params.hawkeyedataurl) {
		    saProperties.hawkeyedataurl = screenName;
		  }else{
		    saProperties.hawkeyedataurl = params.hawkeyedataurl;
		  }
		  if(params.hawkeyedataparams){
		    saProperties.hawkeyedataparams = JSON.parse(JSON.stringify(params.hawkeyedataparams));
		  }
		} else {
		    saProperties.hawkeyedataurl = screenName;
		}
	    if(${ignoreScreen}){
          if(saProperties.hawkeyedataparams){
            saProperties.hawkeyedataparams.SAIgnoreViewScreen = true;
          }else{
            saProperties.hawkeyedataparams = {SAIgnoreViewScreen : true};
          }
        }
		var dataModule = ReactNative?.NativeModules?.Hawkeye;
		dataModule?.trackViewScreen && dataModule.trackViewScreen(saProperties);
	}
	trackViewScreen(getRootState());
	/* EAGLEEYADATA HOOK */ `;

// hook click
eagleeyadataHookClickRN = function () {
  if (fs.existsSync(RNClickFilePath)) {
    // 读取文件内容
    var fileContent = fs.readFileSync(RNClickFilePath, 'utf8');
    // 已经 hook 过了，不需要再次 hook
    if (fileContent.indexOf('EAGLEEYADATA HOOK') > -1) {
      return;
    }
    console.log(`found Touchable.js: ${RNClickFilePath}`);
    // 获取 hook 的代码插入的位置
    var hookIndex = fileContent.indexOf('this.touchableHandlePress(');
    // 判断文件是否异常，不存在 touchableHandlePress 方法，导致无法 hook 点击事件
    if (hookIndex == -1) {
      throw "Can't not find touchableHandlePress function";
    }
    // 插入 hook 代码
    var hookedContent = `${fileContent.substring(0, hookIndex)}\n${eagleeyadataClickHookCode}\n${fileContent.substring(hookIndex)}`;
    // 备份 Touchable.js 源文件
    fs.renameSync(RNClickFilePath, `${RNClickFilePath}_eagleeyadata_backup`);
    // 重写 Touchable.js 文件
    fs.writeFileSync(RNClickFilePath, hookedContent, 'utf8');
    console.log(`modify Touchable.js succeed`);
  }
};

// hook 0.62 0.63 click
eagleeyadataHookPressabilityClickRN = function () {
  if (fs.existsSync(RNClickPressabilityFilePath)) {
    // 读取文件内容
    var fileContent = fs.readFileSync(RNClickPressabilityFilePath, 'utf8');
    // 已经 hook 过了，不需要再次 hook
    if (fileContent.indexOf('EAGLEEYADATA HOOK') > -1) {
      return;
    }
    console.log(`found Pressability.js: ${RNClickPressabilityFilePath}`);
    // 获取 hook 的代码插入的位置
    var scriptStr = 'onPress(event);';
    var hookIndex = fileContent.lastIndexOf(scriptStr);
    // 判断文件是否异常，不存在 touchableHandlePress 方法，导致无法 hook 点击事件
    if (hookIndex == -1) {
      throw "Can't not find onPress(event); code";
    }
    // 插入 hook 代码
    var hookedContent = `${fileContent.substring(
      0,
      hookIndex,
    )}\n${eagleeyadataClickHookPressabilityCode}\n${fileContent.substring(hookIndex)}`;
    // 备份 Pressability.js 源文件
    fs.renameSync(RNClickPressabilityFilePath, `${RNClickPressabilityFilePath}_eagleeyadata_backup`);
    // 重写 Pressability.js 文件
    fs.writeFileSync(RNClickPressabilityFilePath, hookedContent, 'utf8');
    console.log(`modify Pressability.js succeed`);
  }
};

// hook navigation 5.x
eagleeyadataHookNavigation5 = function () {
  if (fs.existsSync(reactNavigationPath5X)) {
    // 读取文件内容
    var fileContent = fs.readFileSync(reactNavigationPath5X, 'utf8');
    // 已经 hook 过了，不需要再次 hook
    if (fileContent.indexOf('EAGLEEYADATA HOOK') > -1) {
      return;
    }
    console.log(`found BaseNavigationContainer.tsx: ${reactNavigationPath5X}`);
    // 获取 hook 的代码插入的位置
    var scriptStr = 'isFirstMountRef.current = false;';
    var hookIndex = fileContent.lastIndexOf(scriptStr);
    // 判断文件是否异常，不存在代码，导致无法 hook 点击事件
    if (hookIndex == -1) {
      throw "navigation Can't not find `isFirstMountRef.current = false;` code";
    }

    // 插入 hook 代码
    var hookedContent = `${fileContent.substring(
      0,
      hookIndex,
    )}\n${eagleeyadataNavigation5HookCode}\n${fileContent.substring(hookIndex)}`;
    // BaseNavigationContainer.tsx
    fs.renameSync(reactNavigationPath5X, `${reactNavigationPath5X}_eagleeyadata_backup`);
    hookedContent = eagleeyadataImportReactNativeHookCode + hookedContent;
    // BaseNavigationContainer.tsx
    fs.writeFileSync(reactNavigationPath5X, hookedContent, 'utf8');
    console.log(`modify BaseNavigationContainer.tsx succeed`);
  }
};

// hook slider
eagleeyadataHookSliderRN = function (reset = false) {
  RNSliderFiles.forEach(function (onefile) {
    if (fs.existsSync(onefile)) {
      // 读取文件内容
      var fileContent = fs.readFileSync(onefile, 'utf8');
      if (reset) {
        // 未被 hook 过代码，不需要处理
        if (fileContent.indexOf('EAGLEEYADATA HOOK') == -1) {
          return;
        }
        // 检查备份文件是否存在
        var backFilePath = `${onefile}_eagleeyadata_backup`;
        if (!fs.existsSync(backFilePath)) {
          throw `File: ${backFilePath} not found, Please rm -rf node_modules and npm install again`;
        }
        // 将备份文件重命名恢复 + 自动覆盖被 hook 过的同名文件
        fs.renameSync(backFilePath, onefile);
        console.log(`found and reset Slider.js: ${onefile}`);
      } else {
        // 已经 hook 过了，不需要再次 hook
        if (fileContent.indexOf('EAGLEEYADATA HOOK') > -1) {
          return;
        }
        console.log(`found Slider.js: ${onefile}`);
        // 获取 hook 的代码插入的位置
        var scriptStr = 'onSlidingComplete(event.nativeEvent.value);';
        var hookIndex = fileContent.indexOf(scriptStr);
        // 判断文件是否异常，不存在 touchableHandlePress 方法，导致无法 hook 点击事件
        if (hookIndex == -1) {
          throw "Can't not find onSlidingComplete function";
        }
        // 插入 hook 代码
        var hookedContent = `${fileContent.substring(
          0,
          hookIndex + scriptStr.length,
        )}\n${eagleeyadataSliderHookCode}\n${fileContent.substring(hookIndex + scriptStr.length)}`;
        // 备份源文件
        fs.renameSync(onefile, `${onefile}_eagleeyadata_backup`);
        // 重写文件
        fs.writeFileSync(onefile, hookedContent, 'utf8');
        console.log(`modify Slider.js succeed`);
      }
    }
  });
};
// hook switch
eagleeyadataHookSwitchRN = function (reset = false) {
  RNSwitchFiles.forEach(function (onefile) {
    if (fs.existsSync(onefile)) {
      // 读取文件内容
      var fileContent = fs.readFileSync(onefile, 'utf8');
      if (reset) {
        // 未被 hook 过代码，不需要处理
        if (fileContent.indexOf('EAGLEEYADATA HOOK') == -1) {
          return;
        }
        // 检查备份文件是否存在
        var backFilePath = `${onefile}_eagleeyadata_backup`;
        if (!fs.existsSync(backFilePath)) {
          throw `File: ${backFilePath} not found, Please rm -rf node_modules and npm install again`;
        }
        // 将备份文件重命名恢复 + 自动覆盖被 hook 过的同名文件
        fs.renameSync(backFilePath, onefile);
        console.log(`found and reset Switch.js: ${onefile}`);
      } else {
        // 已经 hook 过了，不需要再次 hook
        if (fileContent.indexOf('EAGLEEYADATA HOOK') > -1) {
          return;
        }
        console.log(`found Switch.js: ${onefile}`);
        // 特殊情况的单独插入
        // if (this.props.onValueChange != null) {
        var scriptStr = 'if (this.props.onValueChange != null) {';
        var hookIndex = fileContent.indexOf(scriptStr);
        if (hookIndex > -1) {
          // 插入 hook 代码
          var hookedContent = `${fileContent.substring(
            0,
            hookIndex,
          )}\n${eagleeyadataSwitchHookCode}\n${fileContent.substring(hookIndex)}`;
          // 备份源文件
          fs.renameSync(onefile, `${onefile}_eagleeyadata_backup`);
          // 重写文件
          fs.writeFileSync(onefile, hookedContent, 'utf8');
          console.log(`modify Switch.js: ${onefile}`);
        } else {
          // 获取 hook 的代码插入的位置
          scriptStr = 'this.props.onValueChange(event.nativeEvent.value);';
          hookIndex = fileContent.indexOf(scriptStr);
          var hookcontent;
          if (hookIndex == -1) {
            scriptStr = 'onValueChange?.(event.nativeEvent.value);';
            hookIndex = fileContent.indexOf(scriptStr);
            hookcontent = eagleeyadataSwitchHookCode66;
          } else {
            hookcontent = eagleeyadataSwitchHookCode;
          }
          // 判断文件是否异常，不存在 touchableHandlePress 方法，导致无法 hook 点击事件
          if (hookIndex == -1) {
            throw "Can't not find onValueChange function";
          }
          // 插入 hook 代码
          var hookedContent = `${fileContent.substring(
            0,
            hookIndex + scriptStr.length,
          )}\n${hookcontent}\n${fileContent.substring(hookIndex + scriptStr.length)}`;
          // 备份源文件
          fs.renameSync(onefile, `${onefile}_eagleeyadata_backup`);
          // 重写文件
          fs.writeFileSync(onefile, hookedContent, 'utf8');
          console.log(`modify Switch.js succeed`);
        }
      }
    }
  });
};
// hook SegmentedControl
eagleeyadataHookSegmentedControlRN = function (reset = false) {
  RNSegmentedControlFilePath.forEach(function (onefile) {
    if (fs.existsSync(onefile)) {
      // 读取文件内容
      var fileContent = fs.readFileSync(onefile, 'utf8');
      if (reset) {
        // 未被 hook 过代码，不需要处理
        if (fileContent.indexOf('EAGLEEYADATA HOOK') == -1) {
          return;
        }
        // 检查备份文件是否存在
        var backFilePath = `${onefile}_eagleeyadata_backup`;
        if (!fs.existsSync(backFilePath)) {
          throw `File: ${backFilePath} not found, Please rm -rf node_modules and npm install again`;
        }
        // 将备份文件重命名恢复 + 自动覆盖被 hook 过的同名文件
        fs.renameSync(backFilePath, onefile);
        console.log(`found and reset SegmentedControl.js: ${onefile}`);
      } else {
        // 已经 hook 过了，不需要再次 hook
        if (fileContent.indexOf('EAGLEEYADATA HOOK') > -1) {
          return;
        }
        console.log(`found SegmentedControl.js: ${onefile}`);
        // 获取 hook 的代码插入的位置
        var scriptStr = 'this.props.onValueChange(event.nativeEvent.value);';
        var hookIndex = fileContent.indexOf(scriptStr);
        // 判断文件是否异常，不存在 touchableHandlePress 方法，导致无法 hook 点击事件
        if (hookIndex == -1) {
          throw "Can't not find onValueChange function";
        }
        // 插入 hook 代码
        var hookedContent = `${fileContent.substring(
          0,
          hookIndex + scriptStr.length,
        )}\n${eagleeyadataSegmentedControlHookCode}\n${fileContent.substring(hookIndex + scriptStr.length)}`;
        // 备份 Touchable.js 源文件
        fs.renameSync(onefile, `${onefile}_eagleeyadata_backup`);
        // 重写 Touchable.js 文件
        fs.writeFileSync(onefile, hookedContent, 'utf8');
        console.log(`modify SegmentedControl.js succeed`);
      }
    }
  });
};
// hook GestureButtons
eagleeyadataHookGestureButtonsRN = function (reset = false) {
  RNGestureButtonsFilePaths.forEach(function (onefile) {
    if (fs.existsSync(onefile)) {
      // 读取文件内容
      var fileContent = fs.readFileSync(onefile, 'utf8');
      if (reset) {
        // 未被 hook 过代码，不需要处理
        if (fileContent.indexOf('EAGLEEYADATA HOOK') == -1) {
          return;
        }
        // 检查备份文件是否存在
        var backFilePath = `${onefile}_eagleeyadata_backup`;
        if (!fs.existsSync(backFilePath)) {
          throw `File: ${backFilePath} not found, Please rm -rf node_modules and npm install again`;
        }
        // 将备份文件重命名恢复 + 自动覆盖被 hook 过的同名文件
        fs.renameSync(backFilePath, onefile);
        console.log(`found and reset GestureButtons: ${onefile}`);
      } else {
        // 已经 hook 过了，不需要再次 hook
        if (fileContent.indexOf('EAGLEEYADATA HOOK') > -1) {
          return;
        }
        console.log(`found GestureButtons: ${onefile}`);
        // 获取 hook 的代码插入的位置
        var scriptStr = 'this.props.onPress(active);';
        var hookIndex = fileContent.indexOf(scriptStr);
        // 判断文件是否异常，不存在 this.props.onPress(active); 导致无法 hook 点击事件
        if (hookIndex == -1) {
          throw "Can't not find this.props.onPress(active); ";
        }
        // 插入 hook 代码
        var hookedContent = `${fileContent.substring(
          0,
          hookIndex + scriptStr.length,
        )}\n${eagleeyadataClickHookCode}\n${fileContent.substring(hookIndex + scriptStr.length)}`;
        // 备份目标源文件
        fs.renameSync(onefile, `${onefile}_eagleeyadata_backup`);
        // 重写修改后的文件
        fs.writeFileSync(onefile, hookedContent, 'utf8');
        console.log(`modify GestureButtons succeed`);
      }
    }
  });
};

// hook clickable
eagleeyadataHookClickableRN = function (reset = false) {
  RNClickableFiles.forEach(function (onefile) {
    if (fs.existsSync(onefile)) {
      if (reset) {
        // 读取文件内容
        var fileContent = fs.readFileSync(onefile, 'utf8');
        // 未被 hook 过代码，不需要处理
        if (fileContent.indexOf('EAGLEEYADATA HOOK') == -1) {
          return;
        }
        // 检查备份文件是否存在
        var backFilePath = `${onefile}_eagleeyadata_backup`;
        if (!fs.existsSync(backFilePath)) {
          throw `File: ${backFilePath} not found, Please rm -rf node_modules and npm install again`;
        }
        // 将备份文件重命名恢复 + 自动覆盖被 hook 过的同名文件
        fs.renameSync(backFilePath, onefile);
        console.log(`found and reset clickable: ${onefile}`);
      } else {
        // 读取文件内容
        var content = fs.readFileSync(onefile, 'utf8');
        // 已经 hook 过了，不需要再次 hook
        if (content.indexOf('EAGLEEYADATA HOOK') > -1) {
          return;
        }
        console.log(`found clickable.js: ${onefile}`);
        // 获取 hook 的代码插入的位置
        var objRe = /ReactNativePrivateInterface\.UIManager\.createView\([\s\S]{1,60}\.uiViewClassName,[\s\S]*?\)[,;]/;
        var match = objRe.exec(content);
        if (!match) {
          objRe = /UIManager\.createView\([\s\S]{1,60}\.uiViewClassName,[\s\S]*?\)[,;]/;
          match = objRe.exec(content);
        }
        if (!match) {
          throw "can't inject clickable js";
        }
        var lastParentheses = content.lastIndexOf(')', match.index);
        var nextCommaIndex = content.indexOf(',', match.index);
        if (nextCommaIndex == -1) throw "can't inject clickable js, and nextCommaIndex is -1";
        var tagName = lastArgumentName(content, nextCommaIndex).trim();
        var functionBody = `
         var saElement;
         if(typeof internalInstanceHandle !== 'undefined'){
             saElement = internalInstanceHandle;
         }else if(typeof workInProgress !== 'undefined'){
             saElement = workInProgress;
         }else if(typeof thatThis._currentElement !== 'undefined'){
             saElement = thatThis._currentElement;
         }
         var eachProgress = function (workInProgress){
           if(workInProgress == null){
             return;
           }
           var props;
           if(workInProgress.memoizedProps){
             props = workInProgress.memoizedProps;
           }else if(workInProgress.props){
             props = workInProgress.props;
           }
           if(props && props.hawkeyedataparams){
             return props.hawkeyedataparams;
           }else {
             if(!props ||
                !workInProgress.type ||
                workInProgress.type.displayName === 'TouchableOpacity' ||
                workInProgress.type.displayName === 'TouchableHighlight' ||
                workInProgress.type.displayName === 'TouchableWithoutFeedback'||
                workInProgress.type.displayName === 'TouchableNativeFeedback'||
                workInProgress.type.displayName === 'Pressable'||
                workInProgress.type.name === 'TouchableOpacity' ||
                workInProgress.type.name === 'TouchableHighlight' ||
                workInProgress.type.name === 'TouchableNativeFeedback'||
                workInProgress.type.name === 'TouchableWithoutFeedback'||
                workInProgress.type.displayName === undefined||
                workInProgress.type.name === undefined ||
                !props.onPress){
	                 if(workInProgress.return){
	                   return eachProgress(workInProgress.return);
	                 }else{
	                   if(workInProgress._owner && workInProgress._owner._currentElement){
	                     return eachProgress(workInProgress._owner._currentElement);
	                   }else{
	                     return eachProgress(workInProgress._owner);
	                   }
	                 }
	              }
           }
         };
         var elementProps;
         if(saElement && saElement.memoizedProps){
	        elementProps = saElement.memoizedProps;
	     }else if(saElement && saElement.props){
	        elementProps = saElement.props;
	     }
	     if(elementProps){
	         // iOS 兼容 SegmentedControl 逻辑
	        var isSegmentedControl = (saElement &&
	                                    (saElement.type === 'RNCSegmentedControl' ||
	                                    saElement.type === 'RCTSegmentedControl' ||
	                                    saElement.type.name === 'RNCSegmentedControl' ||
	                                    saElement.type.name === 'RCTSegmentedControl' ||
	                                    saElement.type.displayName === 'RNCSegmentedControl' ||
	                                    saElement.type.displayName === 'RCTSegmentedControl'));
	         if(elementProps.onStartShouldSetResponder || isSegmentedControl) {
		         var saProps = eachProgress(saElement);
		         var ReactNative = require('react-native');
		         var dataModule = ReactNative.NativeModules.Hawkeye;

             if(dataModule && dataModule.saveRootViewProperties) {
               var saRootTag;
               if(typeof nativeTopRootTag !== 'undefined') {
                 saRootTag = nativeTopRootTag;
               } else if(typeof rootContainerInstance !== 'undefined') {
                 saRootTag = rootContainerInstance;
               } else if(typeof renderExpirationTime !== 'undefined') {
                 saRootTag = renderExpirationTime;
               } else if(typeof renderLanes !== 'undefined') {
                 saRootTag = renderLanes;
               }
               if (saRootTag && (typeof saRootTag === 'number')) {
                 dataModule.saveRootViewProperties(${tagName}, true , saProps, saRootTag);
                 return;
               }
             }  
             dataModule && dataModule.saveViewProperties && dataModule.saveViewProperties(${tagName}, true , saProps);
	     }
     }`;
        var call = addTryCatch(functionBody);
        var lastReturn = content.lastIndexOf('return', match.index);
        var splitIndex = match.index;
        if (lastReturn > lastParentheses) {
          splitIndex = lastReturn;
        }
        var hookedContent = `${content.substring(0, splitIndex)}\n${call}\n${content.substring(splitIndex)}`;

        // 备份源文件
        fs.renameSync(onefile, `${onefile}_eagleeyadata_backup`);
        // 重写文件
        fs.writeFileSync(onefile, hookedContent, 'utf8');
        console.log(`modify clickable.js succeed`);
      }
    }
  });
};
// 恢复被 hook 过的代码
eagleeyadataResetRN = function (resetFilePath) {
  // 判断需要被恢复的文件是否存在
  if (!fs.existsSync(resetFilePath)) {
    return;
  }
  var fileContent = fs.readFileSync(resetFilePath, 'utf8');
  // 未被 hook 过代码，不需要处理
  if (fileContent.indexOf('EAGLEEYADATA HOOK') == -1) {
    return;
  }
  // 检查备份文件是否存在
  var backFilePath = `${resetFilePath}_eagleeyadata_backup`;
  if (!fs.existsSync(backFilePath)) {
    throw `File: ${backFilePath} not found, Please rm -rf node_modules and npm install again`;
  }
  // 将备份文件重命名恢复 + 自动覆盖被 hook 过的同名 Touchable.js 文件
  fs.renameSync(backFilePath, resetFilePath);
  console.log(`found and reset file: ${resetFilePath}`);
};

// 工具函数- add try catch
addTryCatch = function (functionBody) {
  functionBody = functionBody.replace(/this/g, 'thatThis');
  return (
    '(function(thatThis){\n' +
    '    try{\n        ' +
    functionBody +
    "    \n    } catch (error) { throw new Error('EagleEyaData RN Hook Code 调用异常: ' + error);}\n" +
    '})(this); /* EAGLEEYADATA HOOK */'
  );
};

// 工具函数 - 计算位置
function lastArgumentName(content, index) {
  --index;
  var lastComma = content.lastIndexOf(',', index);
  var lastParentheses = content.lastIndexOf('(', index);
  var start = Math.max(lastComma, lastParentheses);
  return content.substring(start + 1, index + 1);
}

// 全部 hook 文件恢复
resetAlleagleeyadataHookRN = function () {
  eagleeyadataResetRN(RNClickFilePath);
  eagleeyadataHookClickableRN(true);
  // 2 期
  eagleeyadataHookSliderRN(true);
  eagleeyadataHookSwitchRN(true);
  eagleeyadataHookSegmentedControlRN(true);
  eagleeyadataHookGestureButtonsRN(true);
  // 3 期
  eagleeyadataResetRN(RNClickPressabilityFilePath);
  eagleeyadataResetRN(reactNavigationPath5X);
};
// 全部 hook 文件
alleagleeyadataHookRN = function () {
  if (ignoreScreen) {
    console.log('ignore screen');
  }
  if (userPackageJson && userPackageJson['eagleEyaData']) {
    var eagleEyaData = userPackageJson['eagleEyaData'];
    if (eagleEyaData['ignoreClick']) {
      console.log('ignore click');
    } else {
      eagleeyadataHookClickRN(RNClickFilePath);
      eagleeyadataHookClickableRN();
      // 2 期
      eagleeyadataHookSliderRN();
      eagleeyadataHookSwitchRN();
      eagleeyadataHookSegmentedControlRN();
      eagleeyadataHookGestureButtonsRN(false);
      // 3 期
      eagleeyadataHookPressabilityClickRN(RNClickPressabilityFilePath);
    }
  } else {
    eagleeyadataHookClickRN(RNClickFilePath);
    eagleeyadataHookClickableRN();
    // 2 期
    eagleeyadataHookSliderRN();
    eagleeyadataHookSwitchRN();
    eagleeyadataHookSegmentedControlRN();
    eagleeyadataHookGestureButtonsRN(false);
    // 3 期
    eagleeyadataHookPressabilityClickRN(RNClickPressabilityFilePath);
  }
  eagleeyadataHookNavigation5();
};
// 命令行
switch (process.argv[2]) {
  case '-run':
    resetAlleagleeyadataHookRN();
    alleagleeyadataHookRN();
    break;
  case '-reset':
    resetAlleagleeyadataHookRN();
    break;
  default:
    console.log('can not find this options: ' + process.argv[2]);
}
