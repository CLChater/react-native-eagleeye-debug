package com.coolook.eagleye;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.sc.hawkeye.HawkeyeModule;
import com.sc.hawkeye.OnInitDone;

import java.util.concurrent.CountDownLatch;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class EagleEyeModule extends ReactContextBaseJavaModule {
    private final HawkeyeModule hawkeyeModule;

    public EagleEyeModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        hawkeyeModule = new HawkeyeModule(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "Hawkeye";
    }

    @Override
    public void initialize() {
        super.initialize();
        hawkeyeModule.initialize();
    }


    /**
     * 用户属性
     */
    @ReactMethod
    public void userProperty(String key, String value) {
        hawkeyeModule.userProperty(key, value);
    }

    /**
     * 删除用户属性
     */
    @ReactMethod
    public void cleanAllUserProperties() {
        hawkeyeModule.cleanAllUserProperties();
    }

    /**
     * 删除用户属性
     */
    @ReactMethod
    public void cleanUserProperty(String key) {
        hawkeyeModule.cleanUserProperty(key);
    }

    /**
     * 初始化
     */
    @ReactMethod
    public void init(String applyKey, Promise promise) {
        try {
            hawkeyeModule.initT(applyKey, new OnInitDone() {
                @Override
                public void onInitDone(boolean b, String s) {
                    WritableMap resultMap = Arguments.createMap();
                    resultMap.putBoolean("suc", b);
                    resultMap.putString("msg", s);
                    promise.resolve(resultMap);
                }
            });
        }catch (Throwable e){
            promise.reject("NATIVE_ERROR_CODE", e); // 失败时返回错误
        }
    }

    /**
     * 自定义设备事件
     *
     * @param trackJson Json字符串
     */
    @ReactMethod
    public void trackEvent(String eventName, String trackJson) {
        hawkeyeModule.trackEvent(eventName, trackJson);
    }

    /**
     * rn点击事件
     *
     * @param viewId
     */
    @ReactMethod
    public void trackViewClick(int viewId) {
        hawkeyeModule.trackViewClick(viewId);
    }

    /**
     * 缓存原生view
     *
     * @param viewId
     * @param clickable
     * @param viewProperties
     */
    @ReactMethod
    public void saveViewProperties(int viewId, boolean clickable, ReadableMap viewProperties) {
        hawkeyeModule.saveViewProperties(viewId, clickable, viewProperties);
    }

    /**
     * rn页面跳转
     *
     * @param params
     */
    @ReactMethod
    public void trackViewScreen(ReadableMap params) {
        hawkeyeModule.trackViewScreen(params);
    }

    /**
     * 获取设备唯一ID
     */
    @ReactMethod
    public void getId(Promise promise) {
        try {
            promise.resolve(hawkeyeModule.getId());
        }catch (Throwable e){
            promise.reject("NATIVE_ERROR_CODE", e);
        }
    }

}
